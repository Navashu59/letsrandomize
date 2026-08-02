# LetsRandomize Main-Traffic SERP Phased Plan

Date: 2026-08-02
Owner/author lock: Sam Parker
Scope: protect existing organic traffic while improving the highest-value tool pages one controlled change at a time.

## Evidence baseline

Source: `/Users/bluepha/seo-revenue-system/ops/sites/letsrandomize/gsc_data.json`

GSC period: 2026-06-15 through 2026-07-30.

| Page | Clicks | Impressions | CTR | Position | Decision |
| --- | ---: | ---: | ---: | ---: | --- |
| `/tools/list-randomizer/` | 1,934 | 142,674 | 1.4% | 6.8 | Protect; later test meta only |
| `/tools/yes-or-no-generator/` | 369 | 17,126 | 2.2% | 6.5 | Freeze |
| `/tools/random-team-generator/` | 339 | 14,781 | 2.3% | 9.8 | First growth experiment |
| `/tools/random-number-generator/` | 279 | 15,762 | 1.8% | 10.4 | Later snippet experiment only |
| `/` | 179 | 9,946 | 1.8% | 13.3 | Keep as tool hub |
| `/tools/random-name-generator/` | 87 | 6,399 | 1.4% | 16.6 | Hold until reliable data expansion |
| `/tools/random-password-generator/` | 4 | 6,769 | 0.1% | 51.8 | Separate trust/safety repair |

SEMrush US keyword evidence gathered through the logged-in web application:

- `list randomizer`: 14.8K volume, KD 73.
- `randomize list`: 2.4K volume, KD 32.
- `random team generator`: 18.1K volume, KD 57.
- `random group generator`: 33.1K volume, KD 48.
- `yes or no generator`: 12.1K volume, KD 61.
- `random number generator`: 1.2M volume, KD 100.
- `random name generator`: 135K volume, KD 88.
- `random password generator`: 74K volume, KD 84.

The supplied direct Semrush API key returned HTTP 403 on 2026-08-02, so the logged-in web application remains the Semrush research path.

## Fixed rules

1. Sam Parker remains the sitewide author. Do not change author identity.
2. Do not change multiple major traffic pages in the same observation window.
3. One primary URL and one measurable variable per experiment.
4. Do not expand prose merely to increase word count. Existing List and Team pages are already comprehensive.
5. New claims must match implemented behavior and avoid absolute privacy or security language.
6. Use complete GSC days only. Ignore same-day and recent incomplete data.
7. Preserve the previous title, description, content, and feature behavior for rollback.

## Stop-loss rules

- Global: pause releases when rolling seven-day organic clicks are more than 15% below the comparable baseline for three consecutive observation days.
- Page: revert the latest page change when rolling seven-day clicks fall more than 20%, or average position worsens by more than 2 positions, without a matching sitewide/control-page decline.
- Controls: compare against unchanged pages including `/tools/memory-test/` and `/tools/chimp-test/` before attributing movement to an experiment.
- Never react to one partial day or a single isolated ranking observation.

## Schedule

### Through 2026-08-14: baseline and freeze

- Freeze title, H1, description, and main content on List, Team, Number, Name, and the homepage.
- Freeze Yes/No through 2026-08-17 because it was last touched on 2026-08-02.
- Pull fresh GSC and GA4 baselines by page and target query cluster.
- The Password page may receive a separate trust repair because it has negligible traffic and currently stores generated passwords in local history, exposes a Share action, and contains overconfident security wording.

### 2026-08-15: Team experiment gate

Proceed only if the global stop-loss rule is clear and 14 complete post-change days are available.

- Keep the current Team title, H1, and long-form content.
- Add one real utility improvement: generated-team manual adjustment by drag and drop.
- Keep existing Copy CSV; add only one new export option, text or image, not both.
- Update one description sentence only after the feature exists; do not add another SEO section.
- Track `random team generator`, `random group generator`, classroom/group queries, organic sessions, generation completion, adjustment use, and copy/export use.
- Safety review at 14 days; success decision at 28 days. Success is at least a 3-position target-query improvement or 15% organic-click growth with engagement decline under 10%.

### 2026-08-29: Team safety review and List test gate

If Team has not triggered stop loss, keep it deployed and start one List meta-description test. Do not change List title, H1, tool controls, or body content.

Candidate description:

> Paste names, tasks, students, or entries. Shuffle the full list into random order or pick 1-N random items. Free, no sign-up.

Track `list randomizer`, `random list generator`, and `random order generator`. Success is at least 20% relative query-cluster CTR improvement while average position stays within 1 position. If Google does not display the description consistently, end the test rather than changing the title.

### 2026-09-12: List review and Number test gate

If List passes the safety check, keep or revert based on its CTR result. Then consider one Number meta-description test; do not add decimal mode because current GSC data does not show meaningful decimal demand and the page already supports count, sorting, unique numbers, and presets.

Candidate description:

> Generate one or multiple random numbers in any range. Allow repeats or choose unique numbers, sort results, and use quick range or lottery presets.

Measure custom-range, no-repeat, multiple-number, raffle, and lottery query groups. Do not use the KD 100 head term alone as the success criterion.

### 2026-09-26: Number review and backlog decision

- Keep or revert the Number description from measured results.
- Reassess Name only if reliable name datasets and source notes are ready; do not add unsupported nationality data.
- Reassess Password passphrase mode only after the trust repair. GSC already shows word-password query impressions, but the page must be safe before growth work.
- Keep Yes/No and the homepage unchanged unless page/query evidence shows a new mismatch.

## Automation behavior

Each scheduled task must read this document first, pull current complete data, apply the stop-loss rules, record the decision in `docs/OPERATIONS_LOG.md`, run `npm run check` for any code change, and avoid deployment when evidence is insufficient. A date is a review gate, not automatic permission to edit.
