#!/usr/bin/env bash
set -euo pipefail

# Deploy latest site build from the stable GitHub release URL using wget.
#
# Usage:
#   ./scripts/deploy-from-artifact.sh /absolute/path/to/web/root

web_root="${1:-}"
if [ -z "$web_root" ]; then
  echo "Usage: $0 /absolute/path/to/web/root" >&2
  exit 1
fi

release_url="https://github.com/atlas-brown/web/releases/download/site-latest/atlas-web.tar.gz"

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

echo "Downloading ${release_url}..."
if ! wget -qO "$tmp/atlas-site.tar.gz" --max-redirect=20 "$release_url"; then
  echo "Release artifact download failed." >&2
  exit 1
fi

mkdir -p "$tmp/site"
tar -xzf "$tmp/atlas-site.tar.gz" -C "$tmp/site"

if command -v rsync >/dev/null 2>&1; then
  echo "Deploying to ${web_root} with rsync..."
  rsync -a --delete "$tmp/site"/ "$web_root"/
else
  echo "Need rsync for robust deployment (with delete)." >&2
  exit 1
fi

echo "Deployment complete."
