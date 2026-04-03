#!/usr/bin/env bash
# 推送到 GitHub（第二个远程，一般命名为 github，与 origin=Gitee 并存）
#
# 首次使用前在仓库根目录执行：
#   git remote add github https://github.com/lvbaoguo/fuxi.git
#
# 认证：不要用 GitHub 登录密码。用 Personal Access Token（classic，勾选 repo）：
#   https://github.com/settings/tokens
#   HTTPS 提示时 Username 填 GitHub 用户名，Password 粘贴 token。
#
# 可选：改用 SSH
#   git remote set-url github git@github.com:lvbaoguo/fuxi.git
set -euo pipefail
cd "$(dirname "$0")"
echo "=========================================="
echo "  目标: remote \"github\" -> branch master"
echo "  将执行: git push -u github master"
echo "=========================================="
git push -u github master
echo ""
echo "静态站部署二选一："
echo "  1) GitHub Pages：仓库 Settings -> Pages -> Branch 选 master，/ (root) -> Save"
echo "     地址一般为: https://<用户名>.github.io/fuxi/"
echo "  2) Vercel：用 GitHub 登录 -> Import fuxi -> Framework Other，Build 留空"
echo ""
echo "说明：localStorage 按域名分开；手机上的做题进度与本地 file:// 不互通。"
