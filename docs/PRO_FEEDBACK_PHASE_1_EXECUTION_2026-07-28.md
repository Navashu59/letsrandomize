# Pro Feedback Phase 1 Execution - 2026-07-28

## Scope

Page:

- `/tools/list-randomizer/`

Goal:

- Validate which optional feature users care about most before building login, payment, storage, or subscription infrastructure.

## User Experience

The feedback request appears only after a successful list randomization, below the result area.

Copy:

```text
Quick question?

The randomizer stays free. Always.

Which optional feature would help you most?
```

Options:

- Save lists
- Avoid repeat picks
- Keep history of draws
- Export / share results
- Other idea

Submit confirmation:

```text
Thanks! This helps us decide what to build.
```

## Guardrails

- No email collection.
- No price question.
- No login.
- No payment.
- No server or database.
- No popup, modal, top banner, or blocking UI.
- No limit on free randomizing, copying, sharing, or repeated use.
- No changes to title, H1, canonical, JSON-LD, or main SEO content.

## Privacy

GA4 receives only anonymous event names and enum-style feature choices.

GA4 does not receive:

- User-entered list contents.
- Randomized results.
- Free-text feedback.
- Email addresses.
- Names or private list details.

## Events

All new Pro feedback events use:

- `tool_name`: `list_randomizer`
- `experiment_phase`: `premium_interest_phase_1`
- `page_path`: automatic from shared analytics helper
- `is_returning_browser`: yes/no from existing local browser marker

Events:

- `pro_feedback_viewed`
- `pro_feature_selected`
- `pro_feedback_submitted`
- `pro_feedback_dismissed`

Feature choices:

- `save_lists`
- `avoid_repeat_picks`
- `draw_history`
- `export_share_results`
- `other`

`tool_used` and `repeat_tool_use` on this page now include `experiment_phase: premium_interest_phase_1` during this phase.

## Frequency Control

- After submission, the card is suppressed in the same browser for 30 days through localStorage.
- After dismissal, the card is suppressed for the current page session.

## Validation

Completed local checks:

- `npm run check` passed with 72 indexable pages, no failures, no warnings, no similar-content pairs.
- Playwright desktop smoke test confirmed:
  - feedback card appears after successful randomization;
  - feature selection fires `pro_feature_selected`;
  - submission fires `pro_feedback_submitted`;
  - no free text or email is sent to GA4.
- Playwright mobile smoke test confirmed:
  - submitted users do not see the card again after reload and another randomization.
- Playwright dismissal smoke test confirmed:
  - closing the card fires `pro_feedback_dismissed`;
  - the card does not reappear during the same session.

## Review Plan

Run for 2 weeks before changing the prompt.

Primary metrics:

- `pro_feedback_viewed`
- `pro_feature_selected`
- `pro_feedback_submitted`
- `pro_feedback_dismissed`
- `pro_feedback_submitted / pro_feedback_viewed`
- feature-choice distribution

Guardrail metrics:

- Organic Search users.
- `/tools/list-randomizer/` active users.
- `/tools/list-randomizer/` sessions.
- `tool_used`.
- `repeat_tool_use`.
- `copy_result_clicked`.

Decision rule:

- Continue to Phase 2 only if users submit enough feedback and one or two feature choices show clear demand without traffic or tool-use degradation.

