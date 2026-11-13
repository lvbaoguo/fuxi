#!/usr/bin/env bash
# 网络不稳时反复推：默认 10 分钟内、每隔 2 分钟试一次，成功即停。
#
# 用法：
#   ./push-retry.sh
#   ./push-retry.sh 10 2          # 总时长(分) 间隔(分)
#   FUXI_PUSH_BUDGET_SEC=60 ./push-retry.sh
#
set -u
cd "$(dirname "$0")"

TOTAL_MIN="${1:-10}"
GAP_MIN="${2:-2}"
TOTAL_SEC=$((TOTAL_MIN * 60))
GAP_SEC=$((GAP_MIN * 60))
START=$(date +%s)
ATTEMPT=0

log() { printf '[%s] %s\n' "$(date '+%H:%M:%S')" "$*"; }

log "开始重试推送：最长 ${TOTAL_MIN} 分钟，失败后隔 ${GAP_MIN} 分钟再试"
log "目标 commit：$(git log -1 --oneline 2>/dev/null || echo '?')"

while true; do
  NOW=$(date +%s)
  ELAPSED=$((NOW - START))
  if (( ELAPSED >= TOTAL_SEC )); then
    log "放弃：已满 ${TOTAL_MIN} 分钟仍未成功。本地 commit 还在，稍后再跑 ./push-retry.sh"
    exit 1
  fi

  ATTEMPT=$((ATTEMPT + 1))
  REMAIN=$((TOTAL_SEC - ELAPSED))
  log "第 ${ATTEMPT} 次尝试（本轮剩余约 $((REMAIN / 60)) 分 $((REMAIN % 60)) 秒）"

  if ./push-pages.sh; then
    # push-pages 在 give-up 时也可能 exit 非 0；再确认是否还 ahead
    if git rev-parse --abbrev-ref --symbolic-full-name '@{u}' >/dev/null 2>&1; then
      AHEAD=$(git rev-list --count '@{u}..HEAD' 2>/dev/null || echo 1)
    else
      AHEAD=1
    fi
    if [[ "$AHEAD" == "0" ]]; then
      log "成功：已与远程对齐（用时 $((ELAPSED))s，试了 ${ATTEMPT} 次）"
      exit 0
    fi
  fi

  # 有的版本 push 失败仍 exit 0（脚本里 give-up 可能是 exit 1/2）；再查 ahead
  if git rev-parse --abbrev-ref --symbolic-full-name '@{u}' >/dev/null 2>&1; then
    AHEAD=$(git rev-list --count '@{u}..HEAD' 2>/dev/null || echo 1)
    if [[ "$AHEAD" == "0" ]]; then
      log "成功：已与远程对齐（用时 $((ELAPSED))s，试了 ${ATTEMPT} 次）"
      exit 0
    fi
  fi

  NOW=$(date +%s)
  ELAPSED=$((NOW - START))
  LEFT=$((TOTAL_SEC - ELAPSED))
  if (( LEFT <= 0 )); then
    log "放弃：已满 ${TOTAL_MIN} 分钟仍未成功。"
    exit 1
  fi

  SLEEP=$GAP_SEC
  if (( SLEEP > LEFT )); then
    SLEEP=$LEFT
  fi
  log "未推上（仍 ahead）。${SLEEP}s 后再试…"
  sleep "$SLEEP"
done
