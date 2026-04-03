#!/usr/bin/env bash
# 一键推送到 Gitee（会覆盖远程与本地不一致的历史，仅适合「整站替换」）
# 远程仓库：https://gitee.com/shx750710/myck2.git
# 令牌申请：https://gitee.com/personal_access_tokens（不要用网页登录密码）
#
# HTTPS 提示输入时（密码处可粘贴，终端不显示任何字符属正常）：
#   Username：填 oauth2   （小写英文）
#   Password：粘贴「私人令牌」
#
# 若仍报错，可改用地址里带令牌（把 YOUR_TOKEN 换成你的令牌）：
#   git remote set-url origin "https://oauth2:YOUR_TOKEN@gitee.com/shx750710/myck2.git"
set -euo pipefail
cd "$(dirname "$0")"
echo "=========================================="
echo "  目标: origin -> master -> Gitee shx750710/myck2"
echo "  将执行: git push -u origin master --force"
echo "=========================================="
git push -u origin master --force
echo ""
echo "推送成功后请到仓库：服务 -> Gitee Pages -> 选分支 master、目录 / -> 更新"
echo "Pages 地址一般为: https://shx750710.gitee.io/myck2/"
