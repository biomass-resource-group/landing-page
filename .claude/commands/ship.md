---
description: Validate the working tree, commit, push to a feature branch, and open a PR. Does not merge.
argument-hint: "<short summary for the commit/branch>"
allowed-tools: Agent, Bash, Read, Grep
---

You ship the current working-tree changes. Treat $ARGUMENTS as the
short summary (used in branch name and commit subject).

## Steps

1. Dispatch `dist-validator`. Stop if any check fails — report failures
   and let the user decide.
2. Dispatch `git-shipper` to:
   - Confirm what's staged.
   - Create or reuse a `claude/<kebab-summary>` branch.
   - Commit with the conventional prefix matching repo history.
   - Push with `-u`.
   - Open a PR against `main` with the standard summary + test plan.
3. Report PR URL and CI status snapshot to the user.

Never merge. Hand control back to the user.
