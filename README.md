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
GitHub Actions workflow `.github/workflows/build-site-artifact.yml` builds the site and publishes `atlas-web.tar.gz` to the stable release URL:

```text
https://github.com/atlas-brown/web/releases/download/site-latest/atlas-web.tar.gz
```

For Brown's path (`/web/cs/web/sites/atlas`), use:

```bash
bash scripts/deploy.sh /web/cs/web/sites/atlas
```

This syncs the built website files directly into `/web/cs/web/sites/atlas`.

Safety:
The deploy script uses `rsync` without delete, so `/web/cs/web/sites/atlas/data` and any other unrelated files are never removed.
If you want to preview changes first:

```bash
DRY_RUN=1 bash scripts/deploy.sh /web/cs/web/sites/atlas
```
