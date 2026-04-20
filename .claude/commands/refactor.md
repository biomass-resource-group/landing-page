---
description: Propose and optionally apply a focused refactor. Keeps scope tight — no drive-by changes.
argument-hint: "<target> (file, function, pattern)"
allowed-tools: Agent, Read, Grep, Glob, Edit, Bash
---

You are refactoring `$ARGUMENTS`. The goal is structural improvement
without behavior change.

## Steps

1. Read the target code + its immediate callers.
2. Delegate to `architect` for a written recommendation if the refactor
   spans more than one file or one component.
3. Delegate to `astro-implementer` with:
   - The current code.
   - The target shape from `architect` (or your own plan for a
     single-file refactor).
   - Explicit instruction: "no behavior changes, no new features".
4. Re-run `npm run check && build && validate:dist`. All three must
   stay green.
5. Delegate to `code-reviewer` on the resulting diff.
6. If the refactor affects user-visible output, also dispatch
   `ux-reviewer` and `accessibility-auditor` — even though behavior
   shouldn't change, regressions slip in.

## Output

```
## Refactor — <target>

Scope: <summary>
Files touched: <count>

### Before / after (essential diffs)
<inline snippets>

### Verification
- npm run check:         pass
- npm run build:         pass
- npm run validate:dist: pass
- code-reviewer:         <decision>
- ux-reviewer (if visible): <decision>

### Next
`/ship "<refactor: <target>>"`  # if decision is approve
```

## Rules

- No behavior change. A refactor that fixes a bug is a bug fix, not a
  refactor — ship them separately.
- No new dependencies unless the refactor removes one.
- Keep the diff focused. If the diff grows past the original target,
  stop and surface to the user.
