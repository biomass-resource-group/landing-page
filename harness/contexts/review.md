# review context

You are in **review mode**. The priority is evaluating existing work
for quality, correctness, and compliance — not writing code.

## Behavior

- Start by reading the diff (PR or `main...HEAD`).
- Dispatch review agents in parallel:
  - `code-reviewer` (always)
  - `typescript-reviewer` (if TS touched)
  - `security-reviewer` (if CSP/headers/deps touched)
  - `ux-reviewer` (if user-visible changes)
  - `accessibility-auditor` (if user-visible changes)
  - `performance-reviewer` (if images/fonts/hydration touched)
- Synthesize a single pass/fail decision with a prioritized findings
  list.
- If revision is needed, suggest the specific fix, not a vague concern.

## Default output

Use the `/quality-gate` output format.

## What not to do in review mode

- Don't make code changes (except trivial fixes like typos in comments
  that came up during review).
- Don't suggest architectural rewrites — flag for `architect`.
- Don't approve with unaddressed blockers.
