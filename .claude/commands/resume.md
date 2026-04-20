---
description: Resume an interrupted overnight run or multi-step pipeline from saved state.
argument-hint: "[state file path]"
allowed-tools: Agent, Read, Edit, Write, Bash, Glob, Grep
---

You are resuming a previously interrupted pipeline run. The state file
is at `$ARGUMENTS` (default: `harness/.overnight-state.json`).

## Steps

1. **Read state** — load the state file and parse it.
2. **Report status** — tell the user what was completed, what's in
   progress, and what remains.
3. **Verify working tree** — run `git status` to check for uncommitted
   changes. If there are changes from the interrupted session, either
   commit them (if they look complete) or stash them.
4. **Verify build** — run `npm run check && npm run build` to confirm
   the tree is in a good state.
5. **Resume** — pick up from the first item with `status: "in_progress"`
   or `status: "pending"`. Run `/improve` for each remaining item.
6. **Continue convergence** — if all items are done, resume the
   convergence loop from the state file's iteration count.
7. **Update state** — write progress back to the state file after each
   step.

## When state is corrupted

If the state file is missing or unparseable:
- Check `git log --oneline main..HEAD` to understand what's been done.
- Run `/audit all` to get current scores.
- Ask the user what to do next.

## When the working tree has conflicts

If stashed changes conflict or the tree is dirty in ways that don't
match the state file:
- Report the discrepancy to the user.
- Don't force-resolve — let the user decide.
