#!/usr/bin/env bash
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
SRC="$(python3 -c "from pathlib import Path; print(next(Path('/Users/admin/Downloads/daima/zidonghua1/tools').glob('*/管理者后台')))")"
cp "${SRC}/index.html" "${HERE}/index.html"
echo "copied → ${HERE}/index.html"
