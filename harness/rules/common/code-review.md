# code-review.md

Rubric for `code-reviewer` (and humans) reviewing any change before
merge. Reviews are separate from UX and a11y audits — this one is
about correctness and maintainability.

## Review priorities (top-down)

1. **Correctness** — the change does what the spec says. Edge cases,
   null/undefined paths, async ordering.
2. **Hard-rule compliance** — see [`CLAUDE.md`](../../../CLAUDE.md).
3. **Security** — see [`security.md`](./security.md). Any new inline
   script, new dep, new external origin triggers `security-reviewer`.
4. **Performance** — see [`performance.md`](./performance.md). Images,
   JS hydration, bundle size.
5. **Readability** — name things honestly, no dead code, no drive-by
   refactors.
6. **Tests / validation** — does the change weaken `validate-dist.mjs`?
   If so, why?

## What to flag

- **Blocker** — merge-blocking. Security hole, hard-rule violation,
  broken assertion, missing alt text on new image.
- **Major** — fix before merge unless deliberately deferred. Type
  laundering, dead code paths, perf regression > 20%.
- **Minor** — drive-by suggestion. Can be ignored without consequence.
- **Nit** — stylistic. Reviewer's preference, not required.

Reviewers should mark severity explicitly. Ambiguous comments waste
implementer time.

## Don't waste the implementer's time

- Don't ask for changes the implementer can't verify (e.g. "consider
  a different architecture" on a 10-line diff).
- Don't re-review work the last pass already signed off on.
- Don't post drive-by refactor suggestions unless they're materially
  correct — the reviewer's opinion is not a free work order.

## Auto-review bots

Copilot, Codex, and similar bots post unsolicited review comments.
Triage the same way:

- Investigate each one.
- Fix legitimate issues in a follow-up commit.
- For wrong / inapplicable suggestions, either react with 👎 or leave a
  one-line reply explaining why.
- Don't merge with unaddressed P1 bot comments. P2/P3 can merge with a
  written rationale.

## Approval bar

The PR can merge when:

- All automated checks green (`check`, `build`, `validate:dist`, Cloudflare Pages).
- No open blocker review comments.
- `ux-reviewer` category averages ≥ 4.0 (for user-visible changes).
- `accessibility-auditor` reports zero blockers.
- The author has self-smoke-tested on the Cloudflare preview.
