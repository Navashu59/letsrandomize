# LetsRandomize Content Quality Remediation - 2026-07-24

## Baseline

Source: latest saved GSC export, 2026-06-20 through 2026-07-18.

| Page | Clicks | Impressions | CTR | Position | Change policy |
|---|---:|---:|---:|---:|---|
| `/tools/list-randomizer/` | 1,301 | 95,716 | 1.4% | 6.8 | Protect |
| `/tools/random-team-generator/` | 240 | 9,700 | 2.5% | 8.7 | Protect |
| `/tools/random-number-generator/` | 185 | 11,811 | 1.6% | 9.6 | Protect |
| `/tools/yes-or-no-generator/` | 161 | 9,941 | 1.6% | 6.9 | Protect |
| `/` | 128 | 7,169 | 1.8% | 12.7 | Protect |
| `/tools/random-name-generator/` | 59 | 4,333 | 1.4% | 16.3 | Protect |
| `/tools/random-question-generator/` | 1 | 6 | 16.7% | 25.2 | Rebuild |
| `/guides/random-generators-for-teachers/` | 0 | 108 | 0% | 11.5 | Rebuild |
| `/guides/how-to-use-random-name-generator/` | 0 | 1 | 0% | 6.0 | Merge or rebuild |

Site baseline: 1,320 clicks, 112,165 impressions, 1.2% CTR, average position
10.9.

## Guardrails

- Do not change protected-page URLs, canonicals, H1s, title tags, first-screen
  tools, or interaction logic.
- Sitewide objective corrections may update footer domains, privacy wording,
  broken formatting, bylines, and invalid schema.
- Low-signal pages may be rewritten only around their real tool or information
  job.
- Do not add new indexable URLs in this pass.
- Do not mass-noindex or redirect existing pages in this pass.
- Compare page and query data after 14 and 28 complete days.
- Pause further content edits if a protected page loses more than 20% of clicks
  or impressions without a query-mix or seasonal explanation.

## Execution Batches

1. Objective trust and correctness fixes. **Completed.**
2. Three release-blocking low-signal pages. **Completed.**
3. Remaining low-signal guide-template pages. **Completed.**
4. Content-quality gate and production verification. **Completed locally.**

## Changes Shipped

- Preserved title, H1, canonical, URL, and primary interaction on all protected
  pages in the baseline table.
- Replaced unsupported personal credentials with the verifiable
  `LetsRandomize Editorial Team` ownership and review model.
- Rewrote the About page around actual methods, testing, limitations,
  corrections, and contact details.
- Corrected old `.com` footer references, absolute privacy promises, dangling
  JavaScript fragments, and the invalid random-number guide modification date.
- Rebuilt the random-question, teacher, name, and randomness guides around
  their real feature set and practical limits.
- Replaced generic guide-template copy on eight low-signal generator pages.
- Added working browser-side generation to:
  - random question
  - random noun
  - random adjective
  - random card
  - random decision
  - would you rather
  - truth or dare
  - never have I ever
- Updated matching `_content` source files so a future content generation pass
  cannot restore the removed claims.
- Updated sitemap `lastmod` only for materially changed pages.
- Versioned shared CSS and JavaScript asset URLs after production verification
  found Cloudflare serving an older `app.js` from its one-year immutable cache.
  This keeps HTML, tool code, and analytics helpers on the same release.

## DeepSeek Collaboration

DeepSeek produced an evidence-constrained first draft for the random-question,
teacher, and name-guide pages. Codex checked every statement against the
interface and source code, removed unverifiable claims, rewrote the final copy,
implemented the tools, and performed release QA.

- Model: `deepseek-v4-flash`
- Prompt tokens: 478
- Completion tokens: 1,448
- Total tokens: 1,926
- Saved evidence:
  `/Users/bluepha/seo-revenue-system/ops/research/letsrandomize-remediation-drafts-2026-07-24.json`

## Quality Gate

The repository now runs `npm run check` locally and in GitHub Actions. The
release-blocking scan covers unresolved Markdown, thin main content, repeated
paragraphs, repeated non-UI headings, near-duplicate pages, and internal SEO
language.

Local verification:

- 72 indexable pages scanned
- 0 content-quality failures
- 0 near-duplicate warnings
- 0 invalid JSON-LD blocks
- 0 broken internal links
- 8 of 8 repaired tools produced a visible result in Playwright
- 0 page errors during interaction tests
- 0 horizontal overflow on the repaired tools at 390px
- List Randomizer interaction regression passed

Production verification initially caught a stale shared-script cache and was
therefore held open. The follow-up release must pass the same interaction suite
with zero `pageerror` events before this execution is considered complete.

## Observation Plan

Use complete GSC days and compare equivalent 14-day windows.

### Day 14

- Confirm protected-page clicks and impressions remain within the guardrail.
- Check whether random-question and the seven repaired tool pages gain
  impressions, query breadth, or tool-use events.
- Check teacher-guide impressions and position for classroom generator
  questions.
- Check name-guide impressions without expecting it to replace the name tool.
- Check crawl dates and indexed state for materially changed URLs.

### Day 28

- Compare page-level clicks, impressions, CTR, and query count against this
  baseline.
- Retain the remediation pattern when protected pages are stable and repaired
  pages gain crawl or impressions.
- Investigate intent mismatch, internal-link weakness, or indexing state before
  adding more copy when a repaired page remains flat.
- Stop further broad content edits if any protected page loses more than 20%
  without a seasonal or query-mix explanation.

## Reusable Rule

Do not treat “AI detection” as the operating target. The reusable release rule
is: every page must perform its promised job, make only code- or
source-verifiable claims, use headings that answer real user tasks, state
important limits, avoid duplicated template prose, and pass the content gate
before deployment.
