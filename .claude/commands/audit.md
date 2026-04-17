---
description: Run a UI/UX + accessibility audit of one or more routes against the BRG scorecard.
argument-hint: "<route(s) e.g. /, /about/, all>"
allowed-tools: Agent, Read, Bash, Grep, Glob
---

You are running a standalone UI/UX + accessibility audit. No code
changes. Treat $ARGUMENTS as the routes in scope (default: `all`).

## Steps

1. Ensure `dist/` is fresh — run `npm run build` if absent or stale.
2. Dispatch `ux-reviewer`, `accessibility-auditor`, and
   `performance-reviewer` in parallel.
3. Synthesize their reports into one combined scorecard:
   - Per-route averages
   - Overall site average
   - Top 5 prioritized blockers (severity-weighted)
   - Top 5 prioritized improvements

## Output

```
## BRG site audit — <date>

### Scores
| Route        | Clarity | Hierarchy | UX | A11y | Perf | Avg |
| ------------ | ------- | --------- | -- | ---- | ---- | --- |
| /            | x       | x         | x  | x    | x    | x.x |
| ...          |         |           |    |      |      |     |
| **Site avg** |         |           |    |      |      | x.x |

### Top blockers
1. ...

### Top improvements
1. ...

### Decision
Site is `merge-ready` / `needs revision`.
```
