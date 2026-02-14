> Link: [Atlas Group Website](https://atlas.cs.brown.edu)

## Installation

1. Install Hugo (extended) `0.120.3`.
2. Run `git submodule update --init --recursive`.
3. Run `npm ci`.

## Local Development

1. Edit source files in `content/`, `layouts/`, `assets/`, `data/`, and `static/`.
2. Preview locally with `hugo server`.
3. Build locally with `./build.sh` (output is only in `public/`).

## Deployment Model (No Compiled Files In Git)

Compiled output is not committed.  
GitHub Actions workflow `.github/workflows/build-site-artifact.yml` builds the site and uploads artifact `atlas-site` containing `atlas-site.tar.gz`.

On the web server, deploy by extracting the artifact into your served directory:

```bash
tar -xzf atlas-site.tar.gz -C /path/to/web/root
```

If you use GitHub CLI on the server:

```bash
gh run download -R <owner>/<repo> -n atlas-site -D /tmp/atlas-artifact
tar -xzf /tmp/atlas-artifact/atlas-site.tar.gz -C /path/to/web/root
```

If the server does not have `gh`, use the included `wget` deploy script:

```bash
bash scripts/deploy-from-artifact.sh /path/to/web/root
```

For private repos, also set:

```bash
export GITHUB_TOKEN=<token-with-actions-read>
```
