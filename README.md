> Link: [Atlas Group Website](https://atlas.cs.brown.edu)

## Installation

1. Download [Hugo v0.119.0](https://github.com/gohugoio/hugo/releases/tag/v0.119.0); this version is very important for compatibility with the chosen theme. Place the executable in the top-level directory.
2. Run `git submodule init` and `git submodule update` to get the latest theme.

## Modifying Content

After any changes, run `./build.sh` to generate HTML.

* Make changes in the `/content/` folder using Markdown.
* For image modifications, edit the files in the `/static/` folder.

To preview the changes locally, run `hugo server`.

## Content assumptions

* Images are 150x150.