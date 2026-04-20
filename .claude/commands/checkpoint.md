---
description: Commit, push, and tag the current working state as a session checkpoint. Safe midway point during a long session; not a merge.
argument-hint: "<one-line checkpoint label>"
allowed-tools: Bash, Read, Grep
---

You are checkpointing the current session state. This is lighter-weight
than `/ship` — no PR, no full validation, just a safe save point.

## Steps

1. Verify there's something to commit:
   ```bash
   git status --short
   ```
   If clean, say "nothing to checkpoint" and exit.

2. Run `npm run check` only (skip build/validate:dist — checkpoint
   tolerates a partial state, but not broken types).

3. Stage the current working tree, commit with message:
   ```
   chore(checkpoint): $ARGUMENTS
   ```

4. Push to the current branch (create remote tracking if needed):
   ```bash
   git push -u origin <current-branch>
   ```

5. Report:
   - Commit SHA.
   - Current branch.
   - Diff summary (`git diff HEAD~1 --stat`).

## Output

```
Checkpoint committed
  Branch: <branch>
  Commit: <sha> chore(checkpoint): <label>
  Files:  N changed (+X, -Y)

Working tree now clean. Safe to continue or pause.
Next: `/ship "<summary>"` when the session is ready to PR.
```

## Don't

- Don't run the full gate — that's `/ship`.
- Don't create a PR — checkpointing is a midway save, not a merge
  request.
- Don't checkpoint on `main`. If the current branch is `main`, refuse
  and ask the user to `git checkout -b …` first.
