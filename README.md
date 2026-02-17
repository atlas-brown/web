> Link: [Atlas Group Website](https://atlas.cs.brown.edu)

## Installation

1. Install Hugo (extended) `0.120.3`.
2. Run `git submodule update --init --recursive`.
3. Run `npm ci`.

## Local Development

1. Edit source files in `content/`, `layouts/`, `assets/`, `data/`, and `static/`.
2. Put publication PDFs in `static/pdf/` named `<bibtex-key>.pdf`.
3. Preview locally with `hugo server`.
4. Build locally with `./build.sh` (output is only in `public/`).
5. If testing built files, serve them over HTTP:
   `./scripts/serve-public.sh public 8000`

## Deployment Model (No Compiled Files In Git)

Compiled output is not committed.  
GitHub Actions workflow `.github/workflows/build-site-artifact.yml` builds the site and publishes `atlas-site.tar.gz` to the stable release URL:

```text
https://github.com/atlas-brown/web/releases/download/site-latest/atlas-site.tar.gz
```

On the web server, deploy by extracting the tarball into your served directory:

```bash
tar -xzf atlas-site.tar.gz -C /path/to/web/root
```

Direct download example:

```bash
wget -O /tmp/atlas-site.tar.gz https://github.com/atlas-brown/web/releases/download/site-latest/atlas-site.tar.gz
tar -xzf /tmp/atlas-site.tar.gz -C /path/to/web/root
```

Or use the included deploy script:

```bash
bash scripts/deploy-from-artifact.sh /path/to/web/root
```
