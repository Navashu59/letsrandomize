# Sam Parker Author and Content Rebuild - 2026-07-30

## Decision

- The sitewide content author is Sam Parker.
- Do not replace Sam Parker with an editorial team, organization, or another
  author without explicit owner approval.
- Structured content authors use `Person` with the name `Sam Parker`.
- LetsRandomize remains the `Organization` publisher.

## Why This Release Was Needed

The 2026-07-24 remediation correctly removed unsupported claims, but ten pages
lost 75-87% of their visible content. The resulting pages accurately described
their tools but did not fully answer the related search intent.

No URL, canonical, H1, or core tool interaction was changed in this rebuild.
Title changes that already existed in the working tree before this release were
left intact.

## SERP Research

Google US English results were reviewed in the signed-in browser on 2026-07-30.
Observed intent patterns:

- adjective and noun tools: immediate generation, multiple-word expectations,
  writing, drawing, vocabulary, Pictionary, and adjective+noun combinations;
- card picker: standard 52-card deck, jokers, multiple draws, replacement, and
  deck-shuffler expectations;
- decision maker: custom options, weighted entries, wheel alternatives, and
  low-stakes decision use;
- random questions: friends, students, couples, conversation, writing, and
  wheel variants;
- Never Have I Ever, Truth or Dare, and Would You Rather: immediate prompts,
  audience suitability, categories, game rules, passing, and group safety;
- teacher guide: participation order, presentation order, teams, prompts, and
  situations where deliberate teacher judgment is required;
- randomness guide: physical, pseudorandom, cryptographic, quasi-random, and
  statistical meanings.

Unsupported filters, prompt counts, and features were not added to the copy.

## Rebuilt Pages

| Page | Before | After |
| --- | ---: | ---: |
| Random Generators for Teachers | 383 words | 832 words |
| Types of Randomness | 392 words | 885 words |
| Never Have I Ever Generator | 264 words | 625 words |
| Random Adjective Generator | 269 words | 606 words |
| Random Card Picker | 272 words | 625 words |
| Random Decision Maker | 269 words | 634 words |
| Random Noun Generator | 265 words | 668 words |
| Random Question Generator | 355 words | 690 words |
| Truth or Dare Generator | 276 words | 623 words |
| Would You Rather Generator | 242 words | 640 words |

Word counts are a change indicator, not a ranking target. The added content
consists of workflows, examples, probabilities where relevant, limitations,
audience checks, safety boundaries, and real internal links.

## Author Normalization

- 68 HTML files containing author or maintainer references now use Sam Parker.
- 64 structured author objects were changed from `Organization` to `Person`.
- About content explicitly states that Sam Parker writes and maintains the
  site's tool explanations, guides, and operating policies.
- `scripts/normalize-site-author.js` provides a repeatable normalization pass.
- The content audit blocks legacy editorial-team names and any structured
  author that is not `Person` / `Sam Parker`.

## Privacy Claim Normalization

Seventeen absolute privacy claims in eleven pages were replaced. The new
wording distinguishes browser processing of tool values and results from
technical request data handled by hosting, analytics, advertising, and
security providers.

The audit now blocks claims such as:

- no data is sent or stored on any server;
- never sent or transmitted to a server;
- no server requests are made;
- complete privacy protection;
- your data stays in your browser.

`scripts/normalize-privacy-claims.js` contains the reviewed replacements.

## Independent Review

DeepSeek reviewed all ten rebuilt pages. The useful findings were:

- remove a redundant recommendation block on Random Adjective Generator;
- clarify that Random Card Picker does not assign a fixed high/low value to
  the ace.

Both were applied. Other proposed blockers were rejected after direct source
verification because the pages already:

- state that browser cryptographic randomness is not physical randomness;
- require prompt preview and explain audience limits;
- provide examples and safety boundaries for low-risk dares;
- use the current date, 2026-07-30, rather than a future date.

Review artifact:

`/Users/bluepha/seo-revenue-system/ops/research/deepseek-letsrandomize-content-rebuild-review-2026-07-30.json`

## Verification

- `npm run check`: 72 indexable pages, zero failures, zero warnings.
- JSON-LD: zero parse errors.
- Internal links: zero missing local targets.
- Legacy editorial-team author occurrences: zero.
- Structured `Organization` authors: zero.
- Flagged absolute privacy claims: zero.
- Eight rebuilt generators produced a result in browser tests.
- Ten target pages had no horizontal overflow at a 390px viewport.
- Browser console errors and warnings: zero.

## Deployment

- Cloudflare Pages production deployment:
  `https://4f1f31f8.letsrandomize.pages.dev`
- Custom domain verification:
  `https://letsrandomize.org`
- The custom domain initially returned the previous edge-cached response, then
  updated successfully. Direct production browser verification confirmed Sam
  Parker, the rebuilt content, working generator output, and zero console
  errors.
- Search Console sitemap resubmission returned HTTP 204:
  `/Users/bluepha/seo-revenue-system/ops/sites/letsrandomize/gsc_sitemap_submit_2026-07-30.json`

## Monitoring

Compare these page groups separately in Search Console:

1. ten rebuilt pages;
2. protected traffic pages not content-rebuilt;
3. remaining site pages with author-only changes.

Review complete daily data at 3, 7, and 14 days. Track clicks, impressions,
CTR, average position, and query count. Do not make another broad content or
author change during the first seven complete days unless an indexing,
canonical, rendering, or functionality defect is confirmed.

Rollback is page-specific. Do not restore the previous unsupported content or
replace Sam Parker as the site author.
