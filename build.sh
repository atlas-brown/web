#!/bin/bash

if [ "$1" == "-s" ]; then
  echo "Setting up binaries for OS X"
  curl -L 'https://github.com/gohugoio/hugo/releases/download/v0.119.0/hugo_0.119.0_darwin-universal.tar.gz' > hugo.tar.gz
  tar -xvf hugo.tar.gz
  rm README.md LICENSE
  git checkout -- README.md
fi

# Build the new version of the website
./hugo 

# Set permissions to 755
find public -type f -exec chmod 755 {} +

# Move all the files to root directory
cp -r ./public/* .

# start the server
./hugo server
