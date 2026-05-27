# LetsRandomize Operations Plan - 2026-05-27

This document is the execution baseline for the first LetsRandomize-focused operations cycle after the project was split into `/Users/bluepha/letsrandom`.

## Current Priority

Operate the four sites in this order:

1. LetsRandomize - primary focus.
2. FancyTextPaste - secondary, light cleanup only after the first LetsRandomize cycle.
3. LocalCodeFormat - paused until the first two are complete.
4. LetsCalculator - paused until the first two are complete.

Do not split effort evenly across the four sites.

## Data Baseline

GSC window: 2026-04-27 to 2026-05-25.

- Total site performance from GSC no-dimension query: 356 clicks, 33,570 impressions, 1.06% CTR, average position 22.5.
- Query/page aggregate snapshot: 87 clicks, 11,368 impressions, average position 26.3. This is lower than the no-dimension total because GSC anonymizes and samples some query/page rows.
- Indexed pages inspected: 51.
- Indexed: 47.
- Not indexed: 4.

Primary page opportunities:

- `/tools/list-randomizer/`: 78 clicks, 9,691 impressions, average position 11.
- `/tools/random-team-generator/`: 61 clicks, 2,697 impressions, average position 11.8.
- `/tools/random-word-generator/`: 17 clicks, 1,876 impressions, average position 23.1.
- `/tools/random-letter-generator/`: 10 clicks, 1,242 impressions, average position 14.9.
- `/tools/random-name-generator/`: 12 clicks, 1,189 impressions, average position 14.2.
- `/guides/how-to-create-balanced-teams/`: 4 clicks, 622 impressions, average position 8.9.

SEMrush US data available before API units were exhausted:

- Domain rank: 1,175,429.
- Organic keywords: 626.
- Organic traffic estimate: 875.
- Organic cost estimate: 814.
- Strongest list terms: `random list generator`, `list randomizer`, `random order generator`, `randomise a list`, `random list maker`, `random name order generator`.
- Team terms are lower-ranked but relevant: `generator random team`, `team randomizer`, `team maker`, `make random teams`.
- Password and generic number terms have impressions but are not primary growth targets in this cycle.

## Execution Rules

- Use git frequently. Commit docs-only changes separately from deployed content changes where useful.
- Push production content through the GitHub-connected Cloudflare Pages project `letsrandomize`.
- Keep the old monorepo source as historical fallback until GitHub-connected deploys are verified.
- Use GSC, SEMrush, SERP checks, and live page inspection during execution.
- DeepSeek may be used for content drafting, but final page copy must match actual tool behavior.
- Do not repeatedly overhaul `/tools/list-randomizer/` during the first 7-14 days after its latest update. Treat it as the baseline page and strengthen the surrounding cluster instead.

## Phase 1 - List, Order, Shuffle Cluster

Goal: reinforce the already-winning list cluster without repeatedly changing the main list page.

Tasks:

- Establish this document as the post-change baseline.
- Strengthen internal links using natural anchors:
  - `random order generator`
  - `random list generator`
  - `list randomizer`
  - `randomise a list`
  - `random list maker`
  - `random name order generator`
- Add or adjust contextual links from related pages, especially name, team, and balanced-teams guide pages.
- Keep `/tools/list-randomizer/` changes minimal unless validation finds a technical issue.

## Phase 2 - Team and Group Cluster

Goal: move the team cluster from promising to actively competitive.

Tasks:

- Optimize `/tools/random-team-generator/` around `team randomizer`, `random group generator`, classroom teams, PE teams, and random teams.
- Strengthen `/guides/how-to-create-balanced-teams/` as an internal authority page.
- Use the guide to pass relevance and internal authority to `/tools/random-team-generator/`.
- Keep the content focused on classroom, PE, sports, and work groups. Avoid broad generic randomizer copy.

## Phase 3 - Word, Letter, Name Adjacent Opportunities

Goal: make light, targeted improvements without distracting from list and team growth.

Tasks:

- Improve `/tools/random-word-generator/` for games, writing prompts, vocabulary, and classroom usage.
- Improve `/tools/random-letter-generator/` for lowercase/count use cases, especially the observed `eight random lowercase letters` opportunity.
- Improve `/tools/random-name-generator/` by clarifying when to generate new names versus when to shuffle existing real names with the list randomizer.

## Measurement Plan

Check after 7-14 days:

- Cluster-level movement, not page count.
- List/order/shuffle impressions, clicks, CTR, and average position.
- Team/group impressions, clicks, CTR, and average position.
- Word/letter/name movement as secondary signals.
- Internal-link landing pages gaining impressions for exact or near-exact anchors.

Do not judge the cycle only by a single page's position. The operating metric is whether cluster coverage and qualified clicks improve.
