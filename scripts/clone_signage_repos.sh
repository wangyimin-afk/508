#!/usr/bin/env bash
set -euo pipefail

mkdir -p downloads
cd downloads

clone_or_pull () {
  local url="$1"
  local dir="$2"
  if [ -d "$dir/.git" ]; then
    echo "[update] $dir"
    git -C "$dir" pull --ff-only
  else
    echo "[clone]  $dir"
    git clone --depth 1 "$url" "$dir"
  fi
}

clone_or_pull "https://github.com/xibosignage/xibo-cms.git" "xibo-cms"
clone_or_pull "https://github.com/garlic-signage/garlic-hub.git" "garlic-hub"
clone_or_pull "https://github.com/screenlite/screenlite.git" "screenlite"
clone_or_pull "https://github.com/eerotal/LibreSignage.git" "LibreSignage"

# Screenlite 组织内 Android 相关仓库（可选）
clone_or_pull "https://github.com/screenlite/web-kiosk.git" "screenlite-web-kiosk"
clone_or_pull "https://github.com/screenlite/sdm-android.git" "screenlite-sdm-android"

echo "Done. Repositories downloaded under ./downloads"
