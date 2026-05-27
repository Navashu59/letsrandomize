# Deployment

> Updated: 2026-05-27

## Current Status

| Field | Value |
|---|---|
| Cloudflare Pages project | `letsrandomize` |
| Cloudflare Git Provider | `No` |
| GitHub-triggered deploy | `Yes, via GitHub Actions` |
| Publish directory | `public` |
| Production domain | `letsrandomize.org` |
| Initial GitHub Actions verified deploy | `https://6aadc505.letsrandomize.pages.dev` |
| Initial GitHub Actions run | `26499580253` |
| Verification date | 2026-05-27 |

Cloudflare currently does not use its native Git provider for this project. The project was created as a Direct Uploads Pages project, and Cloudflare API returned this restriction on 2026-05-27:

```text
You cannot update the `source` object in a Direct Uploads project.
```

To avoid changing domains or recreating the production Pages project, GitHub now deploys to the existing `letsrandomize` project through GitHub Actions and Wrangler.

## Active Deploy Path

On every push to `main`, GitHub Actions deploys this repository to Cloudflare Pages:

```text
GitHub: Navashu59/letsrandomize
Cloudflare project: letsrandomize
Publish directory: public
Production branch: main
Workflow: .github/workflows/deploy-cloudflare-pages.yml
```

Required GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Deferred Maintenance

- Upgrade GitHub Actions workflow/action versions when there is idle capacity. The initial deploy run on 2026-05-27 succeeded, but GitHub reported a Node.js 20 deprecation warning for `actions/checkout@v4` and `cloudflare/wrangler-action@v3`.

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
