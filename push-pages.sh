#!/usr/bin/env bash
# fuxi → GitHub Pages 稳推脚本（Mac）
#
# 用法：
#   ./push-pages.sh              # 有改动则 commit + push
#   ./push-pages.sh "commit msg" # 指定说明
#   ./push-pages.sh --check      # 只检查线上是否已含连击标记，不推
#
# 解决两类常见坑：
#   1) 443/HTTP2 卡住 → 强制 HTTP/1.1 + 最多重试 3 次
#   2) Pages 因 {{0}} 被 Jekyll 解析而 build failed → 确保有 .nojekyll
set -euo pipefail
cd "$(dirname "$0")"

REMOTE="${FUXI_REMOTE:-origin}"
BRANCH="${FUXI_BRANCH:-master}"
SITE="https://lvbaoguo.github.io/fuxi/index.html"
MARKER="history-combo-chip"
MAX_PUSH_TRY=3
VERIFY_SEC="${FUXI_VERIFY_SEC:-45}"

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
  if curl -fsSL --max-time 20 "$SITE?t=$(date +%s)" -o "$tmp"; then
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
    gh api -X POST repos/lvbaoguo/fuxi/pages/builds >/dev/null 2>&1 && log "[pages] 已请求重建" || log "[pages] 请求重建失败（可忽略，push 后一般会自动建）"
  fi
}

do_push() {
  local try=1
  export GIT_HTTP_VERSION=HTTP/1.1
  while (( try <= MAX_PUSH_TRY )); do
    log "[push] 第 ${try}/${MAX_PUSH_TRY} 次 → ${REMOTE} ${BRANCH}（HTTP/1.1）"
    if git -c http.version=HTTP/1.1 push "$REMOTE" "$BRANCH"; then
      log "[ok] push 成功"
      return 0
    fi
    log "[warn] push 失败，3 秒后重试…"
    sleep 3
    try=$((try + 1))
  done
  die "push 连续失败 ${MAX_PUSH_TRY} 次（多半是 GitHub 443）。可稍后再跑：./push-pages.sh"
}

verify_brief() {
  local deadline=$((SECONDS + VERIFY_SEC))
  log "[verify] 最多等 ${VERIFY_SEC}s 看 Pages 是否更新（到点就停）"
  while (( SECONDS < deadline )); do
    pages_status
    if check_live; then
      return 0
    fi
    sleep 8
  done
  log "[timeout] ${VERIFY_SEC}s 内线上未更新。仓库代码一般已在 master；看 Pages 状态："
  pages_status
  log "  打开: https://github.com/lvbaoguo/fuxi/settings/pages"
  return 1
}

# --- --check ---
if [[ "${1:-}" == "--check" ]]; then
  pages_status
  check_live || true
  exit 0
fi

MSG="${1:-chore(fuxi): publish pages (nojekyll + sync)}"

ensure_nojekyll

# 只暂存本脚本关心的发布文件，避免把无关未跟踪塞进去
git add .nojekyll index.html push-pages.sh 2>/dev/null || true
git add -u -- .nojekyll index.html push-pages.sh 2>/dev/null || true

if git diff --cached --quiet; then
  log "[info] 没有新的暂存改动；若只需再推已有 commit，继续 push…"
else
  git commit -m "$MSG" || die "commit 失败"
fi

do_push
trigger_pages
verify_brief || true
log ""
log "手机：强刷或清该站缓存后再看。连击要先答对 1 题才会出现橙条。"
log "错题在 localStorage，推代码本身不会清；键名 pansan2-history-wrong-v1。"
