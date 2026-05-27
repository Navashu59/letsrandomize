# LetsRandomize

Static source for `letsrandomize.org`.

## Project

LetsRandomize is a browser-based random tools site focused on list, order, picker, team, and fair-selection workflows.

Current operating focus:

- Primary cluster: `list / order / picker / team`
- Secondary cluster: `fair selection / classroom groups`
- Deprioritized: generic password, generic number, simple coin/dice

## Structure

```text
public/        Static site published to Cloudflare Pages
docs/          Deployment and project notes
scripts/       Local deployment helpers
```

The site has no backend. Randomization runs in the browser.

## Deployment

Current Cloudflare Pages project:

```text
letsrandomize
```

Current production domains:

```text
letsrandomize.org
www.letsrandomize.org
letsrandomize.pages.dev
```

See `docs/DEPLOYMENT.md`.

