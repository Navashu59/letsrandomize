# Google Widget Risk Shift Execution - 2026-06-10

## Reason

Google can satisfy simple random-number style searches directly in SERP with its own tools. LetsRandomize should keep existing number/coin/dice pages, but shift new growth emphasis toward list, order, picker, and team workflows that require user-provided inputs and fuller outputs.

## Data and Review Used

- Prior GSC/Semrush audit:
  - `/Users/bluepha/seo-revenue-system/ops/research/letsrandomize-latest-audit-2026-06-07.md`
- Existing list/order/shuffle authority work:
  - `docs/LIST_ORDER_SHUFFLE_AUTHORITY_2026-06-07.md`
- SERP gap reviewed for:
  - `list randomizer`
  - `random order generator`
  - `random picker`
  - `random team generator classroom`
  - `reaction time scores`
- DeepSeek deputy review:
  - `docs/deepseek-google-widget-shift-2026-06-10.json`
  - usage: 1329 total tokens

## Codex Judgment

Accepted from DeepSeek:

- Reposition homepage toward list/order/picker/team.
- Strengthen list randomizer with clearer use cases and internal links.
- Remove over-strong claims around true randomness, official drawings, and security-grade usage.
- Add method comparison to random-order content.

Rejected or adjusted:

- DeepSeek said there was no standalone team generator. That was incorrect; `/tools/random-team-generator/` already exists. We did not create a duplicate team tool page.
- We did not make random number pages invisible or de-emphasized to the point of hurting existing traffic. The URL and core page remain unchanged.

## Pages Changed

- `/`
  - Repositioned title, meta, H1, intro, search placeholder, and first tool cards toward list/order/team.
- `/tools/list-randomizer/`
  - Updated title/meta.
  - Added clearer use-case section.
  - Strengthened links to random order, classroom teams, random picker, and team generator.
  - Replaced over-strong fairness/official-drawing claims with everyday-use boundaries.
- `/guides/random-order-generator/`
  - Added method trust comparison table.
  - Updated dateModified and visible date.
  - Fixed mobile table overflow.
- `/guides/random-picker-vs-list-randomizer/`
  - New support page to separate picker, list randomizer, random order, wheel, and team intent.
- `/use-cases/random-list-picker/`
  - Added link to the new comparison page.
  - Fixed author name and updated modified date.
- `/tools/random-number-generator/`
  - Kept URL and core intent.
  - Replaced "truly random/security applications" language with safer Web Crypto everyday-use wording.
- `sitemap.xml`
  - Added the new guide and updated modified dates for touched pages.
- `llms.txt`
  - Repositioned site summary toward list/order/team/picker tools.

## Verification

- JSON-LD parsed for touched pages.
- Sitemap XML parsed.
- Target pages have exactly one H1.
- Risk phrase scan passed for the touched pages.
- Local HTTP server tested at `http://127.0.0.1:8793/`.
- Playwright with system Chrome:
  - Desktop titles/H1 checked.
  - `/tools/list-randomizer/` interaction returned 4 shuffled items.
  - Mobile viewport `390px` checked for homepage, list randomizer, random picker vs list randomizer, random order, random number, and random list picker.
  - No mobile horizontal overflow after table fix.

## Next Monitoring

Watch in GSC over the next 2-4 weeks:

- CTR for `list randomizer`, `random order generator`, and `random list generator`.
- Impressions for `random picker vs list randomizer`, `pick random item from list`, and related picker queries.
- Whether existing random number traffic remains stable after safer copy changes.
