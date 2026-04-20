---
description: Performance audit of one or more routes — LCP, CLS, bundle, image handling, hydration. Runs Lighthouse against live if reachable.
argument-hint: "<route(s) | all>"
allowed-tools: Agent, Read, Grep, Glob, Bash
---

You are running a performance audit on `$ARGUMENTS` (default: `all`).

## Steps

1. Ensure `dist/` is fresh — run `npm run build` if absent.
2. Dispatch `performance-reviewer` on each route in scope.
3. If the live site is reachable, run `npm run validate:live-deploy`
   and fold the Lighthouse numbers into the report.

## Output

```
## Performance audit — <scope> — <date>

### Per-route
| Route        | HTML (gzip) | Inline JS | Hydrated | Images | LCP   | CLS   |
| ------------ | ----------- | --------- | -------- | ------ | ----- | ----- |
| /            | X kB        | N         | N        | N      | X.Xs  | X.XX  |
| ...          |             |           |          |        |       |       |

### Budget violations
- [BLOCKER] <route>: <metric> over budget by X%
- [MAJOR]   ...
- [MINOR]   ...

### Lighthouse (live, if run)
| Route   | Perf | A11y | BP | SEO |
| ------- | ---- | ---- | -- | --- |
| /       | X    | X    | X  | X   |

### Top recommendations
1. <action> — expected impact: <metric> improvement of X%

### Decision
merge-ready | needs revision
```

## When to run

- Before a merge that touches a hero image, font loading, or hydration
  boundaries.
- After any dependency bump to Astro or a rendering-adjacent library.
- On a quarterly baseline cadence.
