# AdSense Low-Value Content Recrawl Plan

Date: 2026-07-20

## Goal

Repair AdSense "low value content" signals without sacrificing existing Google organic traffic.

Primary objective:

- Get Google to recrawl the improved trust, methodology, hub, and core tool pages.
- Preserve current SEO traffic by avoiding URL, canonical, robots, redirect, and above-the-fold tool changes.
- Reapply to AdSense only after the new quality signals have been crawled and Search Console shows no material traffic regression.

## Changes Already Deployed

Deployment previews:

- `https://83477fea.letsrandomize.pages.dev`
- `https://7c9669ed.letsrandomize.pages.dev`

Production validation:

- `https://letsrandomize.org/contact/` returns 200 and includes the new contact page.
- `https://letsrandomize.org/methodology/` returns 200 and includes the new methodology page.
- `https://letsrandomize.org/sitemap.xml` returns 200 and includes the updated URLs.

Low-risk quality changes:

- Added `/contact/`.
- Added `/methodology/`.
- Unified author name from `Sam Park` to `Sam Parker`.
- Added methodology/contact links to homepage, About, Privacy, Terms, hubs, and key tool footers.
- Strengthened hub pages with decision tables and selection guidance:
  - `/tools/`
  - `/generators/`
  - `/decision-tools/`
  - `/use-cases/`
- Added trust, privacy, fairness, source, or appropriate-use notes to core tools:
  - `/tools/list-randomizer/`
  - `/tools/random-number-generator/`
  - `/tools/random-name-generator/`
  - `/tools/random-password-generator/`
  - `/tools/random-team-generator/`
  - `/tools/spin-the-wheel/`
  - `/tools/dice-roller/`
  - `/tools/coin-flip-simulator/`
  - `/tools/random-date-generator/`
  - `/tools/yes-or-no-generator/`
  - `/tools/random-decision-maker/`

## Guardrails

Do not do these during the observation window unless Search Console data clearly supports the move:

- Do not change existing URLs.
- Do not add `noindex` to pages with clicks or meaningful impressions.
- Do not change canonical targets.
- Do not delete pages.
- Do not merge pages with 301 redirects.
- Do not change core tool UI above the fold.
- Do not add intrusive ads, popups, interstitials, push ads, or tool-blocking ad placements.
- Do not rewrite existing ranking page titles unless there is a measured CTR test plan.

## Recrawl Tasks

Immediate:

1. Submit updated `https://letsrandomize.org/sitemap.xml` in Google Search Console.
2. Use URL Inspection / Request indexing for:
   - `https://letsrandomize.org/`
   - `https://letsrandomize.org/about/`
   - `https://letsrandomize.org/contact/`
   - `https://letsrandomize.org/methodology/`
   - `https://letsrandomize.org/tools/`
   - `https://letsrandomize.org/generators/`
   - `https://letsrandomize.org/decision-tools/`
   - `https://letsrandomize.org/tools/list-randomizer/`
   - `https://letsrandomize.org/tools/random-number-generator/`
   - `https://letsrandomize.org/tools/random-name-generator/`
   - `https://letsrandomize.org/tools/random-password-generator/`
   - `https://letsrandomize.org/tools/random-team-generator/`

Optional, if request indexing quota remains:

- `https://letsrandomize.org/tools/spin-the-wheel/`
- `https://letsrandomize.org/tools/dice-roller/`
- `https://letsrandomize.org/tools/coin-flip-simulator/`
- `https://letsrandomize.org/tools/random-date-generator/`
- `https://letsrandomize.org/tools/yes-or-no-generator/`
- `https://letsrandomize.org/tools/random-decision-maker/`

## Measurement Window

Day 0:

- 2026-07-20: changes deployed and recrawl task recorded.

First check:

- 2026-07-27: 7-day crawl and traffic sanity check.

Second check:

- 2026-08-03: 14-day Search Console comparison.

AdSense decision checkpoint:

- 2026-08-03 or later, only if no material organic traffic regression appears.

## Metrics to Monitor

Search Console:

- Page-level clicks.
- Page-level impressions.
- Average position.
- CTR.
- Indexed status for `/contact/` and `/methodology/`.
- Crawl status for updated sitemap.

Core pages to protect:

- `/tools/list-randomizer/`
- `/tools/random-number-generator/`
- `/tools/random-name-generator/`
- `/tools/random-team-generator/`
- `/tools/random-password-generator/`
- `/tools/spin-the-wheel/`

Hub pages to watch:

- `/tools/`
- `/generators/`
- `/decision-tools/`
- `/use-cases/`

Quality pages to confirm:

- `/about/`
- `/contact/`
- `/methodology/`
- `/privacy/`
- `/terms/`

Guardrail thresholds:

- If any protected page loses more than 20% clicks week-over-week without a clear seasonal explanation, pause additional SEO edits and investigate query-level changes.
- If impressions drop materially across multiple core pages, check indexing, robots, canonical, and deployment state before making content changes.
- If only CTR moves down while impressions are stable, do not revert immediately; inspect query mix first.

## Next Actions After Observation

If traffic is stable and AdSense still reports low-value content:

1. Strengthen remaining thin generator pages with data source notes, intended-use sections, and limitations.
2. Add a concise editorial standards section to `/about/` or create an `/editorial-policy/` page.
3. Build a URL risk table from 90-day GSC data:
   - `Protect`: clicks or meaningful impressions.
   - `Improve`: impressions but weak CTR.
   - `Build`: strategic but low visibility.
   - `Prune Candidate`: no visibility, thin, duplicate, and no strategic value.
4. Only consider `noindex,follow` for confirmed `Prune Candidate` pages after the risk table is reviewed.

If traffic is stable and AdSense review becomes available:

1. Reapply in AdSense after the key pages show recent crawl dates.
2. Do not add a new ad network during the review window.
3. Keep ad density low and avoid moving ads above the core tool area.

If traffic drops:

1. Do not submit AdSense re-review yet.
2. Compare changed page queries against the prior 7-14 day baseline.
3. Check live canonical, robots meta, sitemap, and response codes.
4. Revert only the content section that correlates with the drop; do not roll back the trust pages unless they cause a clear issue.
