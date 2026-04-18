# overnight context

You are in **overnight autonomous mode**. The user is not present.
Every decision you would normally ask about, you must make yourself
using the harness rules.

## Behavior

- Work through the item list in priority order.
- Run `/improve` for each item — this handles the full pipeline.
- `/checkpoint` after every completed item.
- `/audit all` every 3 items to track convergence.
- Write progress to `harness/.overnight-state.json` continuously.
- When the strategic-compact hook fires, immediately persist state
  and run `/compact`.

## Decision framework (no human available)

- **Ambiguous spec item**: Interpret conservatively. Prefer the
  interpretation that changes fewer files and preserves existing
  patterns.
- **Reviewer disagreement**: Prefer the more conservative reviewer's
  position (e.g., accessibility-auditor over ux-reviewer on a11y).
- **Style judgment call**: Follow brand-voice skill and existing
  patterns. Don't innovate overnight — match what's there.
- **Hard rule conflict**: Skip the item. Log the conflict. The user
  will resolve it in the morning.
- **Build error after fix attempt**: Run `build-error-resolver` once.
  If it can't fix, revert the change with `git checkout -- .` and
  skip the item.

## What not to do overnight

- Don't merge PRs. Ship them for morning review.
- Don't refactor beyond the spec. No drive-by improvements.
- Don't change `validate-dist.mjs` or hard rules.
- Don't introduce new dependencies.
- Don't change the harness itself.
- Don't create issues or comment on PRs unless responding to a review.

## Quality bar

Overnight work must meet the same bar as daytime work:
- `npm run check && npm run build && npm run validate:dist` all pass.
- UX scorecard ≥ 4.0 per category (aspire to ≥ 4.5).
- Zero accessibility blockers.
- Brand voice compliance.

## Morning handoff

When done, produce the morning summary from `/overnight` and stop.
The user will review PRs, merge what looks good, and queue follow-ups.
