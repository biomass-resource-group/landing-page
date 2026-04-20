---
description: Run every quality check the repo has — validation + code review + UX/a11y + perf + security — in parallel. Use before a high-stakes merge.
argument-hint: "[scope: <routes> | all | diff]"
allowed-tools: Agent, Read, Grep, Glob, Bash
---

You are running the full quality gate against `$ARGUMENTS`
(default: `diff` — the current branch vs `main`).

## Steps

1. Delegate to `dist-validator` first — if `check` / `build` /
   `validate:dist` fail, stop here and report. The rest of the gate
   assumes a buildable tree.
2. Dispatch **in parallel**:
   - `code-reviewer` on the diff.
   - `typescript-reviewer` on the diff (if `.ts` touched).
   - `security-reviewer` on the diff (if CSP / headers / deps touched).
   - `ux-reviewer` on affected routes.
   - `accessibility-auditor` on affected routes.
   - `performance-reviewer` on affected routes.
3. Collect all decisions. A single `needs revision` from any reviewer
   blocks the gate.

## Output

```
## Quality gate — <scope>

### Build gate
- npm run check:         pass | FAIL
- npm run build:         pass | FAIL
- npm run validate:dist: pass | FAIL

### Review gate
| Reviewer               | Decision          | Blockers |
| ---------------------- | ----------------- | -------- |
| code-reviewer          | approve / needs   | N        |
| typescript-reviewer    | approve / needs   | N        |
| security-reviewer      | approve / needs   | N        |
| ux-reviewer            | approve / needs   | N        |
| accessibility-auditor  | approve / needs   | N        |
| performance-reviewer   | approve / needs   | N        |

### Overall
MERGE-READY | NEEDS REVISION

### Top blockers (if any)
1. <finding> (file:line) — from <reviewer>
2. ...

### Next
- MERGE-READY → `/ship "<summary>"`
- NEEDS REVISION → fix blockers, re-run `/quality-gate`
```

## When to run

- Before any merge that touches ≥ 2 routes or a hard-rule-adjacent file.
- Before a weekly dependency-batch merge.
- When a user-visible change is shipping on a Friday or before a demo.

## When to skip

- Tiny typo fixes on copy — just `/ship`.
- Pure internal refactors with no user impact — `/refactor` runs a
  subset of this.
