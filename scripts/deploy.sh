#!/usr/bin/env bash
set -euo pipefail

# Deploy latest site build from the stable GitHub release URL using wget.
#
# Usage:
#   ./scripts/deploy.sh /absolute/path/to/web/root
#
# Safety model:
#   - Files are synced into <web_root> with NO DELETE.
#   - Existing unrelated files/directories in <web_root> are never removed.
#   - This is safest for co-existing paths like /data/.

web_root="${1:-}"
dry_run="${DRY_RUN:-0}"
if [ -z "$web_root" ]; then
  echo "Usage: $0 /absolute/path/to/web/root" >&2
  exit 1
fi

if [ ! -d "$web_root" ]; then
  echo "Target directory does not exist: $web_root" >&2
  exit 1
fi

release_url="https://github.com/atlas-brown/web/releases/download/site-latest/atlas-web.tar.gz"

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
artifact="$tmp/atlas-web.tar.gz"

wget -qO "$artifact" --max-redirect=20 "$release_url"

mkdir -p "$tmp/site"
tar -xzf "$artifact" -C "$tmp/site"

rsync_args=(
  -a
)
if [ "$dry_run" = "1" ]; then
  rsync_args+=(--dry-run --itemize-changes)
fi
rsync "${rsync_args[@]}" "$tmp/site"/ "$web_root"/
