# LetsRandomize List / Order Controlled Scale Execution - 2026-07-20

## Why This Was Done

The June list/order shift has enough positive signal to justify controlled scaling rather than another broad rewrite:

- GA4 Organic Search improved in the recent comparison window: 1,621 sessions vs 1,164 prior.
- Recent GSC clicks improved: 764 clicks vs 595 prior.
- `/tools/list-randomizer/` remains the strongest growth surface with 95,716 impressions, 1,301 clicks, and average position near page 1.
- The risk profile is favorable because list/order/shuffle searches are harder for Google's built-in random number widget to satisfy than pure number-generation searches.

## Inputs Used

- Existing execution and SOP records:
  - `docs/GOOGLE_WIDGET_SHIFT_EXECUTION_2026-06-10.md`
  - `docs/OPERATIONS_LOG.md`
- Recent GSC and GA4 summaries recorded in the operations log.
- Live SERP gap review for list randomizer, random order generator, random list generator, shuffle list, and randomize list of names intent.
- DeepSeek deputy review:
  - `docs/deepseek-list-order-controlled-scale-2026-07-20.json`
  - Usage: 684 total tokens.

## SERP Gap Summary

Competitors commonly cover:

- Random order for names, tasks, students, speakers, chores, and raffle entries.
- Paste-list workflows with one item per line.
- Duplicate-name behavior and whether duplicates should be kept or removed.
- Copy/share/export use cases after the list is shuffled.
- CSV, Excel, and Google Sheets source lists.
- Choosing between a random picker, full random order, wheel draw, and team split.

Useful missing angle for LetsRandomize:

- Be clearer that the same tool handles names, rows from spreadsheets, class lists, meeting order, tasks, and duplicate entries.
- Explain copy/share and spreadsheet workflows in the pages that already rank, instead of creating a near-duplicate support URL.

## Actions Completed

### `/tools/list-randomizer/`

- Updated title/meta/OG/Twitter copy for stronger match to `shuffle names`, `randomize list order`, and `random list generator` intent.
- Added a practical section for `How do I randomize a list of names?`.
- Added short H3 sections for duplicate names and copy/share behavior.
- Kept the tool UI, URL, H1, canonical, and interaction model unchanged.

### `/guides/random-order-generator/`

- Updated title/meta/article headline toward `Random Order Generator: Shuffle Names and Lists Online`.
- Added sections for copying shuffled results and using Excel or Google Sheets.
- Updated visible modified date and JSON-LD `dateModified`.

### `/guides/how-to-randomize-a-list/`

- Added user-search-style H2 sections for class/meeting lists, spreadsheet/CSV input, and saving/sharing a randomized order.
- Updated visible modified date and JSON-LD `dateModified`.

### `/guides/random-picker-vs-list-randomizer/`

- Added sections clarifying when users search for a random list generator vs a random picker, and which tool is easiest to copy/share after a draw.
- Updated visible modified date and JSON-LD `dateModified`.

### Machine-Readable Updates

- Updated sitemap `lastmod` for the four changed URLs.
- Updated `llms.txt` summaries for list/order support pages.

## Guardrails

- No URL changes.
- No canonical changes.
- No noindex changes.
- No core random-number page edits.
- No new near-duplicate list/order page.
- No unsupported claims such as certified randomness, legal-grade drawings, or audited results.
- H2/H3 headings use real-search-style wording, but body copy avoids repeating FAQ text mechanically.

## Measurement Plan

Review after 14 days, then again at 30 days if movement is inconclusive.

Primary metrics:

- `/tools/list-randomizer/` impressions, clicks, CTR, and average position.
- Query cluster performance for:
  - `list randomizer`
  - `random list generator`
  - `random order generator`
  - `shuffle list`
  - `randomize list`
  - `randomize list of names`
  - `put names in random order`
- Support page indexing and impressions for:
  - `/guides/random-order-generator/`
  - `/guides/how-to-randomize-a-list/`
  - `/guides/random-picker-vs-list-randomizer/`
- GA4 Organic Search sessions and engagement for the list/order pages.

Guardrail metrics:

- `/tools/random-number-generator/` should not show a material click or impression drop.
- Sitewide clicks should not fall because of query mix changes.
- List/order pages should not cannibalize each other into lower combined clicks.

## SOP Candidates If Data Improves

- For old sites with a proven high-impression page, deepen the ranking URL and adjacent support guides before adding new URLs.
- Use live SERP gap to add missing practical workflows, not generic long-form filler.
- Use H2/H3 headings from user-search-style questions, but keep FAQ wording distinct to avoid repetitive AI-like page structure.
- Preserve page UI and URL when the page already ranks and the optimization target is CTR/depth rather than a new product experience.
