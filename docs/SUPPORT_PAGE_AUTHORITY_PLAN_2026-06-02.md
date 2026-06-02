# LetsRandomize Support Page Authority Plan

Date: 2026-06-02

## Goal

Build a focused support content layer that helps LetsRandomize's strongest tools establish topical authority without turning the site into a generic blog.

Primary tools:

- `/tools/list-randomizer/`
- `/tools/random-team-generator/`

Secondary tools:

- `/tools/spin-the-wheel/`
- `/tools/random-decision-maker/`
- `/tools/random-number-generator/`
- `/tools/random-letter-generator/`
- `/tools/random-word-generator/`

## Data Basis

GSC:

- Latest site snapshot: 400 clicks, 36,700 impressions, average position 21.7.
- Page/query snapshot shows `/tools/list-randomizer/` as the strongest page: 11,362 impressions, average position 10.7.
- `list/order/shuffle` cluster: 6,916 impressions, average position 10.7.
- `team/group/classroom` cluster has lower current GSC exposure but strong adjacency to existing pages and guide signals.

SEMrush:

- Domain ranks endpoint shows LetsRandomize has 719 US organic keywords and estimated US organic traffic of 1,784.
- `domain_organic` detail endpoint is currently blocked by zero API units.
- Phrase checks were used for candidate page validation.

## Execution Rules

- Do not create date-based blog posts.
- Use `/guides/` for how-to and explanatory pages.
- Use `/use-cases/` for scenario pages.
- Every support page must have one primary target tool and 2-4 related links.
- Every page must answer the user problem first, then explain the method.
- Avoid cannibalizing the tool page. The support page explains the situation; the tool page performs the task.
- Use FAQ schema only for questions answered visibly on the page.
- Add every indexable support page to sitemap.

## P0 Pages

| Page | Primary tool | Evidence | Status |
|---|---|---|---|
| `/guides/random-group-generator/` | `/tools/random-team-generator/` | SEMrush 33,100; team/group adjacency | QA passed |
| `/guides/team-randomizer/` | `/tools/random-team-generator/` | SEMrush 4,400; GSC team terms | QA passed |
| `/guides/random-name-order-generator/` | `/tools/list-randomizer/` | GSC position 9; SEMrush 390 | QA passed |
| `/guides/how-to-randomize-a-list/` | `/tools/list-randomizer/` | GSC list cluster strong; SEMrush 20 | QA passed |
| `/use-cases/random-presentation-order/` | `/tools/list-randomizer/` | GSC random order/list order cluster | QA passed |
| `/use-cases/classroom-randomizer/` | `/tools/random-team-generator/`, `/tools/list-randomizer/` | SEMrush 70; classroom adjacency | QA passed |
| `/use-cases/random-list-picker/` | `/tools/list-randomizer/` | SEMrush 1,000 | QA passed |
| `/guides/list-shuffler-vs-list-randomizer/` | `/tools/list-randomizer/` | SEMrush 390; GSC list shuffler | QA passed |
| `/use-cases/random-student-picker/` | `/tools/list-randomizer/`, `/tools/random-team-generator/` | SEMrush 70; classroom adjacency | QA passed |
| `/guides/how-to-run-a-random-drawing/` | `/tools/list-randomizer/`, `/tools/spin-the-wheel/` | Existing page; SEMrush random drawing 2,900 | QA passed |

## Progress Log

- 2026-06-02: Plan created from GSC page/query evidence and SEMrush phrase checks.
- 2026-06-02: Built 9 new P0 support pages, refreshed the random drawing guide, added `/use-cases/` index, and prepared sitemap updates.
- 2026-06-02: Local QA passed: 63 indexable pages, 63 sitemap URLs, 0 broken internal links, 0 schema parse errors, 0 title/meta issues.
- 2026-06-02: Deployed via GitHub Actions commit `0cca363`; live checks passed for all new support URLs and sitemap count is 63.
