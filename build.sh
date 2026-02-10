#!/bin/bash

if [ "$1" == "-s" ]; then
  echo "Setting up binaries for OS X"
  curl -L 'https://github.com/gohugoio/hugo/releases/download/v0.119.0/hugo_0.119.0_darwin-universal.tar.gz' > hugo.tar.gz
  tar -xvf hugo.tar.gz
  rm README.md LICENSE
  git checkout -- README.md
fi

hugo_bin="./hugo"
command -v hugo >/dev/null 2>&1 && hugo_bin="hugo"

# Build publications data from BibTeX sources
if [ ! -d node_modules ]; then
  npm install
fi
npm run build:publications

# Build the new version of the website
$hugo_bin

# Set permissions to 755
find public -type f -exec chmod 755 {} +

# Move all the files to root directory
cp -r ./public/* .
