---
description: Detect and fix drift between the codebase and operating docs (CLAUDE.md, README.md, AGENTS.md, RULES.md, harness docs).
argument-hint: "[focus: <specific doc path> | all]"
allowed-tools: Agent, Read, Grep, Glob, Edit, Write, Bash
---

You are bringing operating docs back in sync with the code.

## Steps

1. Delegate to `doc-updater` with the focus arg.
2. The agent returns a list of drift items with proposed edits.
3. Review the proposed edits. Apply the ones that are unambiguous;
   flag the rest for user decision.
4. Run `npm run build` — some doc-referenced assertions may involve
   examples that the build covers indirectly (rare).

## Output

```
## Doc sync — <scope>

### Applied edits
- <path> — <one-line description>

### Flagged for user
- <path> — <why not auto-fixable>

### Verification
- `npm run build`: pass
- No orphan doc references.

### Next
`/ship "docs: sync <scope> with code"`  # if edits applied
```

## When to run

- After adding / renaming / removing an agent, command, hook, or rule.
- After changing `scripts/validate-dist.mjs` assertions.
- Before a release or major review.

## Bypass

If the user just wants the drift *report* without edits, pass
`--report-only` in the arguments. The command then skips step 3 + 4.
