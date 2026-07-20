# Premium Validation Experiment

Date: 2026-07-20

## Goal

Validate whether `/tools/list-randomizer/` has enough repeated, high-intent usage to justify a paid Premium product before building login, payments, or cloud storage.

The product hypothesis is:

> A meaningful subset of List Randomizer users will pay for saved lists, no-repeat picking, pick history, CSV import/export, and ad-free classroom/event use.

## Current Evidence

GA4 property: `527515618`

Last 30 days before this experiment:

- Site returning active users: 387, about 13.5% of classifiable active users.
- `/tools/list-randomizer/`: 1,400 active users, 1,931 sessions, 224 returning users.
- `/tools/random-team-generator/`: 321 active users, 77 returning users.

This is enough to justify a validation test, but not enough to justify building a subscription system yet.

## Phase 1: Baseline Tracking

Run for 7 days with no visible Premium CTA.

Baseline deployment preview:

- `https://9d77a2d4.letsrandomize.pages.dev`

Baseline review window:

- Primary window: 2026-07-20 through 2026-07-26.
- Scheduled review: 2026-07-27.
- Do not add a paid CTA, paywall, delay, modal, or visible pricing element during this baseline window.

Events:

| Event | Trigger | Notes |
|---|---|---|
| `tool_used` | Successful list randomization | Fires only after valid input produces a result. |
| `repeat_tool_use` | Second and later successful uses in the same browser session | Prevents inflating repeat use from first-time users. |
| `copy_result_clicked` | Result copy button click | Global event for copy buttons with a copy target. |

Event parameters:

- `tool_name`
- `mode`
- `list_size_bucket`
- `result_size_bucket`
- `use_count_bucket`
- `is_returning_browser`
- `experiment_phase`
- `page_path`

Privacy constraints:

- Do not send list contents.
- Do not send generated result text.
- Do not send names, emails, or raw user-entered values.
- Do not send a local anonymous ID to GA4.

## Phase 2: Premium Fake-Door Test

Only begin after the baseline period.

Recommended first placement: `/tools/list-randomizer/` only.

CTA must show price before click:

> Save lists & avoid repeated picks - $29/year

CTA event:

- `premium_cta_clicked`

Waitlist form event:

- `premium_waitlist_submitted`

Waitlist form fields:

- Email
- Use case: teacher/classroom, training/workshop, giveaway/event, team/club, personal, other
- Most valuable feature: saved lists, no-repeat picking, pick history, CSV import/export, advanced grouping
- Would you pay $29/year if this were available today: yes, maybe, no
- Optional comment

## Go / No-Go Criteria

Run for 4 weeks after CTA launch.

Build Premium MVP only if:

- `tool_used` / List Randomizer page users is at least 40%.
- `copy_result_clicked` / `tool_used` users is at least 10%.
- `repeat_tool_use` / `tool_used` users is at least 10%.
- Premium CTA click rate is at least 0.5%-1.5%.
- Waitlist submit rate is at least 5%-10% of Premium CTA clicks.
- At least 10 users answer yes to paying $29/year.
- At least 2-3 users complete a manual pre-sale or early-access payment.

If the test fails, avoid building subscriptions and prioritize ads, affiliate placements, templates, or a separate Event Pack test.

## Seven-Day Review Checklist

On 2026-07-27, query GA4 property `527515618`.

Use these date ranges:

- Baseline experiment: 2026-07-20 to 2026-07-26.
- Prior comparison: 2026-07-13 to 2026-07-19.
- Optional longer context: 30 days before 2026-07-20.

Keep the first review limited to `/tools/list-randomizer/`.

GA4 reports to pull:

1. Page performance for `/tools/list-randomizer/`
   - `activeUsers`
   - `sessions`
   - `engagedSessions`
   - `screenPageViews`
   - `userEngagementDuration`
   - Compare against 2026-07-13 to 2026-07-19 to confirm tracking did not coincide with a traffic/engagement drop.

2. Event totals
   - Filter event names to `tool_used`, `repeat_tool_use`, and `copy_result_clicked`.
   - Dimensions: `eventName`, `pagePath`, and custom dimensions if registered.
   - Metrics: `eventCount`, `activeUsers`.

3. Tool event segmentation
   - If custom dimensions are available, break down by:
     - `tool_name`
     - `mode`
     - `list_size_bucket`
     - `result_size_bucket`
     - `use_count_bucket`
     - `is_returning_browser`
     - `experiment_phase`

4. Data-quality checks
   - Confirm no `premium_cta_clicked` or `premium_waitlist_submitted` events exist during the baseline.
   - Confirm `tool_name` values are normalized as `list_randomizer`.
   - Confirm no event parameter contains user-entered list text, names, emails, or generated result contents.
   - Confirm `repeat_tool_use` is lower than `tool_used` and only appears after repeated successful use.

5. SEO/traffic guardrail
   - No decrease that appears related to the experiment in:
     - Organic Search users
     - `/tools/list-randomizer/` sessions
     - engagement rate proxy: `engagedSessions / sessions`
   - If available, check Search Console impressions/clicks for `/tools/list-randomizer/` against the prior 7 days.

Decision rules:

- Continue to Phase 2 only if tracking is clean and there is no clear SEO/traffic degradation.
- Phase 2 is justified if repeated-use and copy behavior show meaningful workflow intent:
  - `tool_used` / page users is at least 40%.
  - `copy_result_clicked` / `tool_used` users is at least 10%.
  - `repeat_tool_use` / `tool_used` users is at least 10%.
- If tracking is clean but usage depth is weak, do not add CTA; keep collecting data or prioritize ads/affiliate/template tests.
- If tracking appears broken or noisy, fix instrumentation and rerun the baseline before testing pricing.

## Next Planned Action After Review

If the seven-day review passes:

1. Add a restrained Premium fake-door CTA only on `/tools/list-randomizer/`.
2. Place it below the tool result area or in supporting content, not as a modal, paywall, delay, or above-the-fold interruption.
3. CTA copy must include the price before the click:
   - `Save lists & avoid repeated picks - $29/year`
4. CTA click should fire `premium_cta_clicked`.
5. CTA should lead to a waitlist form, not checkout.
6. Run Phase 2 for 4 weeks before building login, payment, or saved-list infrastructure.

## Premium MVP Scope If Validated

Build only:

- Account login
- Stripe annual plan
- Saved lists
- No-repeat picking
- Pick history
- CSV import/export
- Ad-free experience

Do not build initially:

- School/team admin
- API
- AI features
- Social comment imports
- Event Pack
- Certificates or videos
