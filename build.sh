#!/bin/bash

# Build the new version of the website
hugo 

# Set permissions to 755
find public -type f -exec chmod 755 {} +

# Move all the files to root directory
cp -r ./public/* .
