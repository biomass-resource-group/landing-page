---
description: Monitor open PRs for CI failures and review comments. Automatically fix CI issues and respond to reviews. Designed for unattended operation.
argument-hint: "[PR number(s) or 'all']"
allowed-tools: Agent, Read, Edit, Write, Bash, Glob, Grep
---

You are monitoring PRs for the BRG site. Treat $ARGUMENTS as the PR
numbers to watch (default: all open PRs on this branch).

## Setup

1. Subscribe to PR activity using the `subscribe_pr_activity` tool
   for each target PR.
2. Confirm subscription and report what you're watching.

## Event handling loop

When a PR activity event arrives, classify and handle it:

### CI failure

1. Read the failing check's log.
2. Classify: type error, build failure, validate:dist assertion,
   Cloudflare build, dependency review.
3. Dispatch `build-error-resolver` with the failure details.
4. Apply the fix, commit, push.
5. Wait for CI to re-run. If it fails again on the same check, report
   to the user and stop retrying that check.

### Review comment (human)

1. Read the comment in full context.
2. If it's a question: answer it by posting a reply.
3. If it's a change request:
   a. If small and unambiguous (typo, naming, style): fix it, commit,
      push, reply confirming the fix.
   b. If ambiguous or architecturally significant: ask the user for
      guidance before acting.
4. If it's approval: acknowledge and report.

### Review comment (bot — Copilot / Codex)

1. Assess whether the suggestion is valid and tractable.
2. If valid and the fix is small: implement it, commit, push.
3. If valid but requires a large change: flag for the user.
4. If invalid or duplicate: skip with a brief note.

### PR merged

1. Unsubscribe from the PR.
2. Report the merge.
3. If other PRs are still being watched, continue. Otherwise, stop.

## Circuit breakers

- **Max 3 fix attempts per CI check.** After 3, stop and report.
- **Max 5 review comment responses per PR per hour.** Prevents
  infinite loops with aggressive bots.
- **Never merge a PR.** Only fix and push. Merging requires human
  approval.

## Reporting

Every 30 minutes of idle time (no events), post a brief status:

```
Still watching PR #<n>. Last event: <type> at <time>.
CI status: <passing/failing>. Unresolved comments: <n>.
```
