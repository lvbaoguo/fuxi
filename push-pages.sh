#!/usr/bin/env bash
# fuxi → GitHub Pages 稳推脚本（Mac）
#
# 用法：
#   ./push-pages.sh              # 有改动则 commit + push
#   ./push-pages.sh "commit msg" # 指定说明
#   ./push-pages.sh --check      # 只检查线上，不推
#
# 代理（推 GitHub 更快/更稳）：
#   先开 Clash Party「系统代理」；脚本会自动用 127.0.0.1:7890 等本地端口给 git。
#   自定义：FUXI_HTTP_PROXY=http://127.0.0.1:端口 ./push-pages.sh
#   这和「换新加坡/日本节点」不是一回事——节点在 Clash「代理组」里选；这里是让 git 走 Clash。
#
# 硬规则：整次 push 总预算 60 秒，超时立刻放弃（不长轮询）。
set -euo pipefail
cd "$(dirname "$0")"

REMOTE="${FUXI_REMOTE:-origin}"
BRANCH="${FUXI_BRANCH:-master}"
SITE="https://lvbaoguo.github.io/fuxi/index.html"
MARKER="history-combo-chip"
PUSH_BUDGET_SEC="${FUXI_PUSH_BUDGET_SEC:-60}"
VERIFY_SEC="${FUXI_VERIFY_SEC:-20}"

log() { printf '%s\n' "$*"; }
die() { printf 'ERROR: %s\n' "$*" >&2; exit 1; }

ensure_nojekyll() {
  if [[ ! -f .nojekyll ]]; then
    : > .nojekyll
    log "[fix] 已创建 .nojekyll（关闭 Jekyll，避免 {{ }} 搞挂 Pages）"
  fi
}

check_live() {
  local tmp
  tmp="$(mktemp)"
  if curl -fsSL --max-time 15 "$SITE?t=$(date +%s)" -o "$tmp"; then
    if rg -q "$MARKER" "$tmp" 2>/dev/null || grep -q "$MARKER" "$tmp"; then
      log "[ok] 线上已包含新功能标记（$MARKER）"
      rm -f "$tmp"
      return 0
    fi
    local deploy
    deploy="$(rg -o 'gh-deploy: [^<]+' "$tmp" 2>/dev/null | head -1 || true)"
    log "[old] 线上仍是旧页 ${deploy:-（无 gh-deploy 注释）}"
    rm -f "$tmp"
    return 1
  fi
  rm -f "$tmp"
  log "[warn] 拉线上失败（网络）"
  return 2
}

pages_status() {
  if command -v gh >/dev/null 2>&1; then
    gh api repos/lvbaoguo/fuxi/pages --jq '"Pages: \(.status)  source=\(.source.branch)/\(.source.path)"' 2>/dev/null || true
  fi
}

trigger_pages() {
  if command -v gh >/dev/null 2>&1; then
    gh api -X POST repos/lvbaoguo/fuxi/pages/builds >/dev/null 2>&1 && log "[pages] 已请求重建" || log "[pages] 请求重建失败（可忽略）"
  fi
}

# 在剩余预算内跑一条命令；超时杀进程
run_with_budget() {
  local remain=$1
  shift
  if (( remain <= 0 )); then
    return 124
  fi
  "$@" &
  local pid=$!
  local waited=0
  while kill -0 "$pid" 2>/dev/null; do
    if (( waited >= remain )); then
      kill "$pid" 2>/dev/null || true
      wait "$pid" 2>/dev/null || true
      return 124
    fi
    sleep 1
    waited=$((waited + 1))
  done
  wait "$pid"
  return $?
}

# 本机 Clash / mihomo 常见本地端口；可用 FUXI_HTTP_PROXY=http://127.0.0.1:xxxx 覆盖
detect_local_proxy() {
  if [[ -n "${FUXI_HTTP_PROXY:-}" ]]; then
    printf '%s\n' "$FUXI_HTTP_PROXY"
    return 0
  fi
  local cand
  for cand in \
    "http://127.0.0.1:7890" \
    "http://127.0.0.1:7897" \
    "http://127.0.0.1:9191" \
    "http://127.0.0.1:1087"; do
    if curl -sS -o /dev/null --max-time 1 -x "$cand" https://api.github.com/ >/dev/null 2>&1; then
      printf '%s\n' "$cand"
      return 0
    fi
  done
  return 1
}

do_push() {
  export GIT_HTTP_VERSION=HTTP/1.1
  local start=$SECONDS
  local try=1
  local gitcfg=(
    -c http.version=HTTP/1.1
    -c http.lowSpeedLimit=1000
    -c http.lowSpeedTime=15
    -c http.postBuffer=524288000
  )
  local proxy=""
  if proxy="$(detect_local_proxy)"; then
    log "[proxy] git push 走本机代理 $proxy（只影响这次推送，不是换节点国家）"
    gitcfg+=(-c "http.proxy=$proxy" -c "https.proxy=$proxy")
  else
    log "[proxy] 未检测到本机代理；请开 Clash「系统代理」，或 export FUXI_HTTP_PROXY=http://127.0.0.1:7890"
  fi

  while true; do
    local used=$((SECONDS - start))
    local remain=$((PUSH_BUDGET_SEC - used))
    if (( remain <= 0 )); then
      break
    fi
    log "[push] 第 ${try} 次 → ${REMOTE} ${BRANCH}（剩余约 ${remain}s / 总预算 ${PUSH_BUDGET_SEC}s）"
    set +e
    run_with_budget "$remain" git "${gitcfg[@]}" push "$REMOTE" "$BRANCH"
    local rc=$?
    set -e
    if (( rc == 0 )); then
      log "[ok] push 成功（用时 $((SECONDS - start))s）"
      return 0
    fi
    if (( rc == 124 )); then
      log "[timeout] 单次或总预算用尽"
      break
    fi
    used=$((SECONDS - start))
    remain=$((PUSH_BUDGET_SEC - used))
    if (( remain <= 2 )); then
      break
    fi
    log "[warn] push 失败（exit $rc），稍候再试…"
    sleep 2
    try=$((try + 1))
  done

  log "[give-up] ${PUSH_BUDGET_SEC}s 内未能推上 GitHub（多为 443/网络）。"
  log "          本地 commit 还在。网络好了请再跑：./push-pages.sh"
  return 1
}

verify_brief() {
  local deadline=$((SECONDS + VERIFY_SEC))
  log "[verify] 最多等 ${VERIFY_SEC}s 看 Pages（到点就停）"
  while (( SECONDS < deadline )); do
    pages_status
    if check_live; then
      return 0
    fi
    sleep 5
  done
  log "[timeout] 短验未看到新页。仓库若已 push，可稍后再 ./push-pages.sh --check"
  pages_status
  return 1
}

if [[ "${1:-}" == "--check" ]]; then
  pages_status
  check_live || true
  exit 0
fi

MSG="${1:-chore(fuxi): publish pages (nojekyll + sync)}"

ensure_nojekyll

git add .nojekyll index.html push-pages.sh 2>/dev/null || true
git add -u -- .nojekyll index.html push-pages.sh 2>/dev/null || true

if git diff --cached --quiet; then
  log "[info] 没有新的暂存改动；继续尝试 push 已有 commit…"
else
  git commit -m "$MSG" || die "commit 失败"
fi

if ! do_push; then
  exit 2
fi
trigger_pages
verify_brief || true
log ""
log "手机：强刷后再看。连击要先答对 1 题才出橙条。"
log "错题在 localStorage；推代码不清错题（键 pansan2-history-wrong-v1）。"
