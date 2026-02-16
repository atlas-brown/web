#!/usr/bin/env bash
set -euo pipefail

# Deploy latest site build from the stable GitHub release URL using wget.
#
# Usage:
#   ./scripts/deploy-from-artifact.sh /absolute/path/to/web/root

WEB_ROOT="${1:-}"
if [ -z "$WEB_ROOT" ]; then
  echo "Usage: $0 /absolute/path/to/web/root" >&2
  exit 1
fi

RELEASE_URL="https://github.com/atlas-brown/web/releases/download/site-latest/atlas-site.tar.gz"

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

echo "Downloading ${RELEASE_URL}..."
if ! wget -qO "$tmp/atlas-site.tar.gz" --max-redirect=20 "$RELEASE_URL"; then
  echo "Release artifact download failed." >&2
  exit 1
fi

mkdir -p "$tmp/site"
tar -xzf "$tmp/atlas-site.tar.gz" -C "$tmp/site"

if command -v rsync >/dev/null 2>&1; then
  echo "Deploying to ${WEB_ROOT} with rsync..."
  rsync -a --delete "$tmp/site"/ "$WEB_ROOT"/
else
  echo "Need rsync for robust deployment (with delete)." >&2
  exit 1
fi

echo "Deployment complete."
