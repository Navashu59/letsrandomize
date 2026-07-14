# Google Widget Shift 28-Day SEO Control Review - 2026-07-08

## Scope

Reviewed the Google widget risk shift deployed on 2026-06-10.

Source docs:

- `docs/GOOGLE_WIDGET_SHIFT_EXECUTION_2026-06-10.md`
- `docs/OPERATIONS_LOG.md`
- `/Users/bluepha/seo-revenue-system/ops/insights/letsrandomize_list_randomizer_ctr_test_review_2026-06-29.md`
- `/Users/bluepha/seo-revenue-system/ops/insights/letsrandomize_list_randomizer_ctr_test_review_2026-07-06.md`

Fresh data pulled on 2026-07-08:

- GSC Search Analytics API, property `sc-domain:letsrandomize.org`, `dataState: all`.
- Latest available GSC data ended on 2026-07-06, so the post-deploy review window is 2026-06-11 to 2026-07-06, a 26-day latest-available read rather than a complete 28-day read through 2026-07-08.
- URL Inspection API targeted checks for the comparison, random-order, and classroom team guides.

Attribution cautions:

- 2026-06-22 title/meta CTR test on `/tools/list-randomizer/` overlaps the post-deploy window.
- 2026-07-04 team/classroom/random-order deepening overlaps only the final days of available GSC data and should not be credited from this review.

## Window Definitions

| Window | Dates | Days | Use |
|---|---:|---:|---|
| Pre-change baseline | 2026-05-13 to 2026-06-09 | 28 | Baseline before 2026-06-10 deployment |
| 14-day checkpoint | 2026-06-11 to 2026-06-24 | 14 | Early post-change checkpoint |
| Latest available post-change | 2026-06-11 to 2026-07-06 | 26 | Current control review |

## Key Metrics

| Segment | Baseline | 14-day checkpoint | Latest available | Judgment |
|---|---:|---:|---:|---|
| `/tools/list-randomizer/` | 207 clicks, 21,795 imps, 0.95% CTR, pos 9.19 | 171 clicks, 21,574 imps, 0.79% CTR, pos 7.43 | 766 clicks, 64,566 imps, 1.19% CTR, pos 6.92 | Strong positive page-level result |
| Primary exact list/order queries | 81 clicks, 10,367 imps, 0.78% CTR, pos 8.50 | 59 clicks, 11,183 imps, 0.53% CTR, pos 7.07 | 118 clicks, 20,277 imps, 0.58% CTR, pos 6.94 | Position and volume positive; CTR still weak |
| Random-order related queries | 23 clicks, 4,925 imps, 0.47% CTR, pos 8.82 | 31 clicks, 2,854 imps, 1.09% CTR, pos 7.49 | 58 clicks, 5,383 imps, 1.08% CTR, pos 7.11 | Positive CTR and page-1 movement |
| List/order/shuffle cluster | 135 clicks, 18,117 imps, 0.75% CTR, pos 10.85 | 134 clicks, 19,456 imps, 0.69% CTR, pos 8.22 | 621 clicks, 57,539 imps, 1.08% CTR, pos 7.42 | Strong cluster expansion |
| Team/group pages | 102 clicks, 4,756 imps, 2.15% CTR, pos 12.87 | 74 clicks, 3,980 imps, 1.86% CTR, pos 13.51 | 164 clicks, 8,521 imps, 1.93% CTR, pos 10.75 | Page-level improvement, near page 1 |
| Team/group query cluster | 4 clicks, 1,003 imps, 0.40% CTR, pos 30.46 | 1 click, 906 imps, 0.11% CTR, pos 32.95 | 5 clicks, 1,369 imps, 0.37% CTR, pos 30.28 | Exact team queries still not page 1 |
| `/tools/random-number-generator/` | 83 clicks, 7,872 imps, 1.05% CTR, pos 20.01 | 67 clicks, 4,447 imps, 1.51% CTR, pos 13.63 | 143 clicks, 9,707 imps, 1.47% CTR, pos 11.12 | Stable to positive guardrail |
| `/guides/random-picker-vs-list-randomizer/` | 0 clicks, 0 imps | 0 clicks, 6 imps, pos 75.00 | 0 clicks, 6 imps, pos 75.00 | Indexed, but no meaningful long-tail traction |

## Indexing

Targeted URL Inspection API results on 2026-07-08:

- `/guides/random-picker-vs-list-randomizer/`: submitted and indexed, last crawled 2026-06-13, canonical self-selected.
- `/guides/random-order-generator/`: submitted and indexed, last crawled 2026-07-03, canonical self-selected.
- `/guides/random-team-generator-for-classroom/`: submitted and indexed, last crawled 2026-07-07, canonical self-selected.

The comparison guide problem is not indexation. It is either weak search demand, insufficient relevance, weak internal-query matching, or Google preferring the tool page for the adjacent list/picker terms.

## Decision

Continue observing. Do not change site content from this review.

Keep the 2026-06-22 `/tools/list-randomizer/` title/meta CTR test. The page-level and cluster-level signals are strong, and the random-number guardrail did not trip.

Do not add more list/order support pages yet. The list/order/shuffle cluster already expanded sharply, and exact primary-query CTR remains modest. More support content would risk dilution before the current broader `randomizer` query expansion stabilizes.

Do not run another list-randomizer title/meta test now. The active test is positive and still mixing with broader query expansion. A second snippet test would blur attribution.

Do not deepen team/group pages again yet. The 2026-07-04 team/classroom/order SERP-gap work is too recent for GSC evaluation. Recheck team/group on or after 2026-07-18.

No action needed on `/tools/random-number-generator/`. It is stable to positive after the homepage/list-weight shift.

## SOP Lessons Supported By Metrics

- Preserve existing widget-prone winners while shifting homepage/internal-link weight toward multi-input workflows. This is supported because `/tools/random-number-generator/` improved from 83 clicks / 7,872 impressions / pos 20.01 in the baseline to 143 clicks / 9,707 impressions / pos 11.12 in the latest available post-change window.
- Controlled title/meta tests are valid when a page has real impressions and page-one/page-two ranking. The list-randomizer CTR test has held positive through the 2026-07-06 review.
- Internal-link and intent-weight shifts can expand a defensible cluster without URL moves. List/order/shuffle moved from 18,117 impressions and pos 10.85 to 57,539 impressions and pos 7.42.

## Operational Cautions

- Do not promote comparison/support pages as a default response to adjacent intent. The picker-vs-list guide is indexed but has only 6 impressions and no clicks.
- Keep attribution windows clean. The 2026-06-22 CTR test and 2026-07-04 team/order expansion overlap the original 2026-06-10 review window, so future reviews should separate original shift, CTR test, and team-depth effects.
- Team/group exact-query movement is not yet proven. Page-level team assets are near page 1, but explicit team/group queries remain around position 30.

## Next Review

- Recheck the 2026-07-04 team/classroom/random-order deepening after 2026-07-18.
- Recheck the list-randomizer CTR test after 2026-07-20 only if generic `randomizer` query mix remains material.
- Watch the comparison guide for any new impressions after recrawl; if it remains flat, treat it as a caution against support-page expansion rather than a page to keep pushing.
