---
description: Validate the working tree, commit, and push to main or a PR branch.
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
   - Push directly to `main` when that is the chosen integration path, or
     create/reuse a `claude/<kebab-summary>` branch when using a PR.
   - Commit with the conventional prefix matching repo history.
   - Push with `-u` for a new branch, or regular `git push` for `main`.
   - Open a PR against `main` when using the branch workflow.
3. Report pushed commit, PR URL if applicable, and CI status snapshot to the user.

Never force-push or delete `main`.
