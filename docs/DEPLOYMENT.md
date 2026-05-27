# Deployment

> Updated: 2026-05-27

## Current Status

| Field | Value |
|---|---|
| Cloudflare Pages project | `letsrandomize` |
| Git Provider | `No` |
| Publish directory | `public` |
| Production domain | `letsrandomize.org` |
| Latest verified deploy | `https://7b443e2d.letsrandomize.pages.dev` |
| Verification date | 2026-05-27 |

Cloudflare currently does not use a Git provider for this project. Deployments have been made through Wrangler/CLI from the SEO Revenue System monorepo.

## Recommended Target

Connect this repository to Cloudflare Pages:

```text
GitHub: Navashu59/letsrandomize
Cloudflare project: letsrandomize
Build command: none
Publish directory: public
Production branch: main
```

## Manual Deploy

From this repository root:

```bash
bash scripts/deploy.sh
```

The script deploys `public/` to the `letsrandomize` Cloudflare Pages project.

This path was verified on 2026-05-27.

## Pre-Deploy Checks

- `public/index.html` exists
- `public/sitemap.xml` exists
- `public/robots.txt` exists
- `public/_redirects` exists
- no secrets are present
- `.env` is local-only and ignored by git
