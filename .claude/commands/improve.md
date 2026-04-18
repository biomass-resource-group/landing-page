---
description: Run the full multi-agent improvement pipeline (translate → plan → implement → review → validate → ship) for a single request.
argument-hint: "<request>"
allowed-tools: Agent, Read, Edit, Write, Bash, Glob, Grep
---

You are running the BRG site's standard improvement pipeline. Treat the
user's request as $ARGUMENTS and orchestrate the chain below. Do **not**
edit code yourself — delegate each phase to the named subagent and
synthesize their outputs.

## Pipeline

1. **Translate feedback** — if the request includes pasted stakeholder
   commentary, dispatch the `feedback-translator` subagent. Otherwise
   reformulate the request as a one-line "Goal" and skip ahead.
2. **Plan** — dispatch `site-planner` with the translated acceptance
   list. Wait for its full spec before proceeding.
3. **Optional design proposal** — if the spec has any `[layout]` or
   `[branding]` items, dispatch `visual-designer` for those.
4. **Implement** — dispatch `astro-implementer` with the spec and any
   visual proposal. Confirm the implementer ran the validation suite.
5. **Review (parallel)** — dispatch `ux-reviewer`,
   `accessibility-auditor`, and `performance-reviewer` in a single
   message so they run in parallel. If the diff touches `.ts` files,
   also dispatch `code-reviewer` in the same parallel batch.
6. **Iterate** — if any reviewer returns `needs revision`:
   a. Merge all reviewer findings into a single prioritized list.
      Deduplicate overlapping items. Resolve contradictions by
      favoring the more conservative position.
   b. Send the merged findings back to `astro-implementer` for one
      revision pass, then re-review.
   c. Cap at **3 revision cycles** (or 4 in unattended/overnight
      mode). If still failing after the cap, escalate to the user
      or skip the item (in overnight mode).
7. **Validate** — dispatch `dist-validator` for the final pass.
8. **Ship** — dispatch `git-shipper` to commit, push, and open a PR.
   Report the PR URL to the user. Do **not** merge.

## Reporting after each phase

Produce a one-line status update to the user between phases so they can
see progress (e.g. "Plan complete, 4 acceptance criteria, 3 routes
touched. Implementing now."). Final report includes:

- The PR URL
- Acceptance criteria → file:line proof
- Scorecard averages
- Any deferred follow-ups

## Error recovery

If a stage fails:

- **Translate / Plan failure** — ask the user for clarification. Don't
  guess.
- **Implementation failure** — dispatch `build-error-resolver` to
  diagnose. Feed its fix back to `astro-implementer`.
- **Review failure** — feed reviewer findings back to
  `astro-implementer` (step 6 handles this with up to 2 cycles).
- **Validation failure** — dispatch `build-error-resolver`. If the fix
  requires a validation contract change, escalate to the user.
- **Ship failure** — usually a git issue. Retry once after 30 seconds.
  If still failing, commit locally and report — the user can push
  manually.
- **GitHub API failure** — retry once after 30 seconds. If still
  failing, fall back to local-only mode (commit without PR).
- **Network timeout** — retry the failed operation once. If the session
  has no network, work locally and defer ship to the user.

To resume from a prior stage, use `/checkpoint` to save progress
mid-pipeline, then re-run `/improve` with the narrowed request.

## When to bail out

Stop the pipeline and ask the user if:

- The plan reveals a hard-rule violation (e.g. requires Cody LinkedIn).
- The implementer hits a validation contract change.
- Reviewers disagree and revisions don't converge.
- The second revision cycle still doesn't satisfy reviewers.
