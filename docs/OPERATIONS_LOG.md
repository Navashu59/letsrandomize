# LetsRandomize Operations Log

## 2026-05-27 - First Focused Operations Cycle

Baseline:

- GSC no-dimension total for 2026-04-27 to 2026-05-25: 356 clicks, 33,570 impressions, 1.06% CTR, average position 22.5.
- Query/page snapshot showed `/tools/list-randomizer/` as the strongest growth page, with `/tools/random-team-generator/` and `/guides/how-to-create-balanced-teams/` as the next best cluster.
- SEMrush US snapshot showed list/order/shuffle terms as the strongest organic opportunity and team/group as the next cluster.
- SEMrush API units became exhausted during the full export attempt, so the full 626-keyword export was not saved in this cycle.

Actions:

- Created `docs/OPERATIONS_PLAN_2026-05-27.md` to lock the priority order, data baseline, execution rules, and three-phase plan.
- Kept `/tools/list-randomizer/` stable because it had just been updated and needs a 7-14 day observation window.
- Strengthened list/order/shuffle internal anchors from related pages instead of rewriting the list page again.
- Updated `/tools/random-team-generator/` for `team randomizer`, `random group generator`, classroom, PE, sports, and work group intent.
- Updated `/guides/how-to-create-balanced-teams/` to support the team tool and clarify team split vs. random order intent.
- Updated `/tools/random-word-generator/` for games, writing prompts, vocabulary, brainstorming, and classroom use.
- Updated `/tools/random-letter-generator/` for the observed `eight random lowercase letters` opportunity.
- Updated `/tools/random-name-generator/` to distinguish generated names from random name order, linking exact existing-name order intent back to the list randomizer.

Validation:

- JSON-LD parsed successfully for all edited pages.
- Local browser smoke test passed for:
  - `/tools/random-team-generator/`
  - `/tools/random-letter-generator/`
  - `/tools/random-word-generator/`
  - `/tools/random-name-generator/`
  - `/guides/how-to-create-balanced-teams/`
- Core interactions verified locally:
  - Team generator creates team cards.
  - Letter generator creates 8 lowercase letters when configured for lowercase count 8.
  - Word generator creates visible results.
  - Name generator creates visible results.
- GitHub Actions deployment succeeded for commit `0b50e24f695a5f44afb87c09922e45ac825b1f91`.
- Live page checks confirmed updated titles and `dateModified: 2026-05-27` on all edited pages.
- GitHub Actions reported a Node.js 20 deprecation warning for `actions/checkout@v4` and `cloudflare/wrangler-action@v3`; keep the workflow/action upgrade task open.

Next Measurement:

- Check GSC after 7-14 days.
- Compare by cluster:
  - list/order/shuffle
  - team/group
  - word/letter/name
- Do not judge the cycle by page count or a single query movement.

Follow-up Observation Checklist:

- Use this cycle as the post-change baseline for the edited pages.
- Compare GSC data against the 2026-04-27 to 2026-05-25 baseline.
- For `/tools/list-randomizer/`, do not judge only by average position. Track whether the existing high-impression queries gain clicks or CTR:
  - `list randomizer`
  - `random order generator`
  - `random list generator`
  - `randomise a list`
  - `random list maker`
  - `random name order generator`
- For `/tools/random-team-generator/`, watch whether impressions and positions improve for:
  - `team randomizer`
  - `random group generator`
  - `random team generator`
  - `classroom team generator`
  - `PE team generator`
- For `/guides/how-to-create-balanced-teams/`, watch whether it continues to rank as a support page and whether clicks or impressions grow around balanced teams, random teams, classroom groups, and PE groups.
- For `/tools/random-letter-generator/`, watch the specific opportunity around `eight random lowercase letters` and related lowercase/count queries.
- For `/tools/random-name-generator/`, watch whether the new distinction between generated names and `random name order generator` helps pass clearer intent to `/tools/list-randomizer/`.
- If impressions rise but CTR stays weak, the next action should be title/meta testing, not more body copy.
- If average position improves into positions 5-12 but clicks remain low, prioritize snippet clarity and above-the-fold copy.
- If impressions do not move after 14-21 days, revisit whether support pages or new long-tail pages are needed.

## 2026-05-27 - GSC-Driven SERP Gap Refresh Test

Target:

- Page: `/tools/random-letter-generator/`
- GSC evidence: 28-day page data showed 1,242 impressions, 10 clicks, 0.8% CTR, and average position 14.9.
- Query evidence included `random letter generator`, `eight random lowercase letters`, `random 3 letter generator`, and `a-z randomizer`.

SERP gap used:

- Current SERP competitors for random letter queries commonly expose controls or explanations for repeated vs. unique letters and excluding specific letters.
- The existing LetsRandomize page already covered lowercase/count/vowel/consonant intent, but did not offer a no-repeat draw or custom excluded-letter pool.

Actions:

- Added an `Exclude Letters` input.
- Added a `No repeated letters` checkbox.
- Updated the generator logic so unique draws remove picked letters from the available pool.
- Added empty-pool handling when exclusions remove all available letters.
- Added original content sections:
  - `Repeated vs. Unique Random Letters`
  - `How to Exclude Letters`
- Expanded FAQ and JSON-LD FAQ coverage for no-repeat and excluded-letter use cases.
- Updated meta description and SoftwareApplication description to reflect the new functional options.

Validation:

- JSON-LD parsed successfully.
- Local browser test verified:
  - 8 unique lowercase letters can be generated.
  - excluded vowels are not returned when `AEIOU` is excluded.
  - a clear message appears when all letters are excluded.

Next measurement:

- Observe 7-14 days in GSC.
- Compare query/page movement for `random letter generator`, `eight random lowercase letters`, `random 3 letter generator`, `a-z randomizer`, `random letters no repeats`, and excluded-letter variants if they appear.
- If impressions increase but CTR stays weak, test title/meta next instead of adding more body copy.
