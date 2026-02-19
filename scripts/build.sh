#!/bin/bash
set -euo pipefail

top=$(git rev-parse --show-toplevel)
cd "$top" || exit 1

hugo_bin="./hugo"
command -v hugo >/dev/null 2>&1 && hugo_bin="hugo"

# Build publications data from BibTeX sources
if [ ! -d node_modules ]; then
  npm ci
fi
npm run build:publications

# Build the new version of the website
$hugo_bin --cleanDestinationDir

# Set deploy-friendly permissions in build output
find public -type d -exec chmod 755 {} +
find public -type f -exec chmod 644 {} +
