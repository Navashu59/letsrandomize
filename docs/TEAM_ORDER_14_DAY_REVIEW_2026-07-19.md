# Team / Classroom / Random Order 14-Day Review

Date: 2026-07-19

Reviewed deployment: 2026-07-04

## Data windows

- Pre-change comparison: 2026-06-21 to 2026-07-03 (13 days; deployment day excluded).
- Post-change review: 2026-07-05 to 2026-07-17 (13 days; latest available complete GSC window).
- GSC source: Search Analytics API for `sc-domain:letsrandomize.org`, `dataState: all`.
- GA4 source: property `527515618`, Organic Search only, using the same equal-length windows.
- GSC query rows are privacy-filtered, so query-pickup totals are directional and lower than page totals.

## GSC page results

| Page | Pre-change | Post-change | Judgment |
|---|---:|---:|---|
| `/tools/random-team-generator/` | 76 clicks, 3,434 impressions, 2.21% CTR, position 8.94 | 135 clicks, 5,321 impressions, 2.54% CTR, position 8.34 | Clear positive movement: clicks +77.6%, impressions +55.0%, CTR +0.32 pp, position improved 0.59. |
| `/guides/random-team-generator-for-classroom/` | 0 clicks, 9 impressions, position 34.44 | 0 clicks, 3 impressions, position 14.67 | Too little volume to judge; the apparent position improvement is based on only 3 impressions. |
| `/guides/random-order-generator/` | 0 clicks, 9 impressions, position 22.11 | 3 clicks, 496 impressions, 0.60% CTR, position 23.80 | Strong initial query pickup, but ranking and click volume are not mature enough for another edit. |
| `/tools/list-randomizer/` guardrail | 501 clicks, 38,678 impressions, 1.30% CTR, position 6.69 | 717 clicks, 49,153 impressions, 1.46% CTR, position 6.83 | Healthy: clicks +43.1%, impressions +27.1%, CTR improved; negligible position softening. |
| `/tools/random-number-generator/` guardrail | 77 clicks, 5,744 impressions, 1.34% CTR, position 9.15 | 92 clicks, 4,974 impressions, 1.85% CTR, position 10.19 | No material traffic loss: clicks and CTR improved, although impressions fell 13.4% and position softened 1.04. Continue monitoring rather than intervene. |

## Query pickup

- On the team tool, visible query rows increased from 147 to 217. Team/group/classroom/student-related visible impressions increased from 486 to 635, while their weighted average position improved from 23.24 to 18.99. Relevant CTR was essentially flat (0.82% to 0.79%).
- None of the four specifically watched classroom/team queries produced a reportable row in either window: `random team generator classroom`, `random group generator`, `random student group generator`, and `random groups without repeats`. This does not prove zero impressions because GSC suppresses low-volume queries.
- The random-order guide moved from 9 total impressions and no visible query rows to 496 impressions, 3 clicks, and 63 visible query rows. `random order generator` appeared on the guide with 15 impressions at position 14.6, while the list tool retained the main demand: 1,828 impressions, 20 clicks, 1.09% CTR, position 7.02.
- `put names in random order` stayed on the list tool with 5 post-change impressions at position 4.2. `randomize presentation order` did not produce a reportable row. No meaningful duplicate/reroll query pickup is proven yet.

## GA4 Organic Search corroboration

| Page | Pre-change | Post-change | Read |
|---|---:|---:|---|
| `/tools/random-team-generator/` | 119 sessions, 87 users, 117 views | 216 sessions, 158 users, 214 views | Organic sessions +81.5%; engagement rate fell from 43.7% to 37.0%, and average session duration fell from 119.7s to 82.6s. Acquisition improved, but engagement quality should be watched. |
| `/guides/random-team-generator-for-classroom/` | No reportable row | No reportable row | Insufficient GA4 signal. |
| `/guides/random-order-generator/` | No reportable row | No reportable row | GSC pickup has not yet translated into a reportable GA4 row. |
| `/tools/list-randomizer/` guardrail | 637 sessions, 478 users, 697 views | 912 sessions, 689 users, 1,009 views | Strong traffic guardrail; session duration rose from 134.8s to 197.0s. |
| `/tools/random-number-generator/` guardrail | 106 sessions, 78 users, 111 views | 107 sessions, 80 users, 120 views | Stable traffic guardrail. |

## Decision

Continue observing; do not change these pages now.

There is enough signal to say the team-tool deepening is directionally successful and the random-order guide has begun acquiring queries. There is not enough signal to choose a defensible next content or snippet action: the classroom guide remains effectively unmeasured, the order guide is only beginning to rank, the watched long-tail variants are not yet reportable, and team-tool engagement softened while acquisition grew.

Recheck after a full 30-day post-change window, using 2026-07-05 onward. At that review:

- Preserve the team tool if its impressions and clicks hold and engagement stabilizes.
- Consider a targeted order-guide CTR/on-page refinement only if it has sustained impressions and reaches roughly positions 8-15 for relevant order/presentation queries.
- Do not expand classroom support content unless the classroom guide or watched classroom queries show meaningful impressions.
- Keep watching random-number impressions/position, but do not treat the current movement as a tripped guardrail while clicks, CTR, and GA4 organic sessions remain stable or positive.

## SOP-worthy lesson

Supported: evaluate adjacent-cluster work page by page and keep established winners as explicit guardrails. In this test, deepening existing team/order assets produced measurable acquisition growth without a click or session loss on the list and number winners. The data does not support a broader SOP for creating more classroom/support pages yet.
