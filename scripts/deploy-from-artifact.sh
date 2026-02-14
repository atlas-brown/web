#!/usr/bin/env bash
set -euo pipefail

# Deploy latest successful "atlas-site" GitHub Actions artifact using wget.
#
# Usage:
#   ./scripts/deploy-from-artifact.sh /absolute/path/to/web/root
#
# Optional env vars:
#   GITHUB_TOKEN   Token with actions:read (only needed for private repos)

WEB_ROOT="${1:-}"
if [ -z "$WEB_ROOT" ]; then
  echo "Usage: $0 /absolute/path/to/web/root" >&2
  exit 1
fi

GITHUB_OWNER="atlas-brown"
GITHUB_REPO="web"
WORKFLOW_FILE="build-site-artifact.yml"
ARTIFACT_NAME="atlas-site"
API_BASE="https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}"
ACCEPT_HEADER="Accept: application/vnd.github+json"
API_VERSION_HEADER="X-GitHub-Api-Version: 2022-11-28"

common_wget_args=(
  --header "$ACCEPT_HEADER"
  --header "$API_VERSION_HEADER"
)

if [ -n "${GITHUB_TOKEN:-}" ]; then
  common_wget_args+=(--header "Authorization: Bearer ${GITHUB_TOKEN}")
fi

github_get() {
  local out="$1"
  local url="$2"
  if ! wget -qO "$out" "${common_wget_args[@]}" "$url"; then
    echo "GitHub API request failed: $url" >&2
    echo "If the repo is private, set GITHUB_TOKEN with actions:read." >&2
    exit 1
  fi
}

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

echo "Fetching latest successful run for ${WORKFLOW_FILE}..."
github_get \
  "$tmp/runs.json" \
  "${API_BASE}/actions/workflows/${WORKFLOW_FILE}/runs?status=success&per_page=1"

if command -v jq >/dev/null 2>&1; then
  run_id="$(jq -r '.workflow_runs[0].id // empty' "$tmp/runs.json")"
else
  run_id="$(python3 - <<'PY' "$tmp/runs.json"
import json,sys
with open(sys.argv[1]) as f:
  d=json.load(f)
print((d.get("workflow_runs") or [{}])[0].get("id",""))
PY
)"
fi

if [ -z "$run_id" ]; then
  echo "No successful workflow run found." >&2
  exit 1
fi

echo "Fetching artifacts for run ${run_id}..."
github_get \
  "$tmp/artifacts.json" \
  "${API_BASE}/actions/runs/${run_id}/artifacts"

if command -v jq >/dev/null 2>&1; then
  download_url="$(jq -r --arg n "$ARTIFACT_NAME" '.artifacts[] | select(.name==$n and .expired==false) | .archive_download_url' "$tmp/artifacts.json" | head -n1)"
else
  download_url="$(python3 - <<'PY' "$tmp/artifacts.json" "$ARTIFACT_NAME"
import json,sys
with open(sys.argv[1]) as f:
  d=json.load(f)
name=sys.argv[2]
for a in d.get("artifacts", []):
  if a.get("name")==name and not a.get("expired", False):
    print(a.get("archive_download_url",""))
    break
PY
)"
fi

if [ -z "$download_url" ]; then
  echo "No non-expired artifact named '${ARTIFACT_NAME}' found for run ${run_id}." >&2
  exit 1
fi

echo "Downloading artifact zip..."
if ! wget -qO "$tmp/artifact.zip" \
  --max-redirect=20 \
  "${common_wget_args[@]}" \
  "$download_url"; then
  echo "Artifact download failed." >&2
  echo "If the repo is private, set GITHUB_TOKEN with actions:read." >&2
  exit 1
fi

if command -v unzip >/dev/null 2>&1; then
  unzip -q "$tmp/artifact.zip" -d "$tmp"
elif command -v bsdtar >/dev/null 2>&1; then
  bsdtar -xf "$tmp/artifact.zip" -C "$tmp"
else
  echo "Need unzip or bsdtar to extract artifact.zip." >&2
  exit 1
fi

if [ ! -f "$tmp/atlas-site.tar.gz" ]; then
  echo "atlas-site.tar.gz not found inside artifact zip." >&2
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
