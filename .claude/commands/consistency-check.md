---
description: Cross-route visual consistency audit — checks that all routes follow the same design system patterns and flags deviations.
argument-hint: "[routes or 'all']"
allowed-tools: Agent, Read, Bash, Glob, Grep
---

You are auditing cross-route visual consistency. No code changes —
report only. Treat $ARGUMENTS as routes in scope (default: `all`).

## Steps

1. Build the site (`npm run build`).
2. Read the `design-system` skill for reference.
3. For each route, read the built HTML from `dist/`.
4. Compare across routes for:

### Structural consistency
- [ ] Same number of heading levels used for equivalent content depth
- [ ] Section padding matches `.section` class (6rem) everywhere
- [ ] Container width matches `--container` everywhere
- [ ] Same grid patterns for equivalent layouts (e.g., all card grids
      use the same column count at same breakpoints)

### Typography consistency
- [ ] H1 always uses `--font-display` at the same size
- [ ] H2 always uses `--font-body` at 700 weight
- [ ] Eyebrows always use uppercase with letter-spacing
- [ ] Body text size consistent (1rem–1.125rem)
- [ ] Line heights consistent (1.6–1.7 for body)

### Color consistency
- [ ] Same accent colors used for same purposes across routes
- [ ] Dark sections use `--forest-deep` + `--cream` consistently
- [ ] CTA buttons use same color scheme everywhere
- [ ] Link colors consistent

### Component consistency
- [ ] PageHero structure matches across routes
- [ ] SectionIntro eyebrow/heading/body pattern identical
- [ ] Footer identical on all routes
- [ ] Header identical on all routes
- [ ] Card styles uniform (if multiple routes use cards)

### Spacing consistency
- [ ] Gap between hero and first section matches
- [ ] Gap between sections matches
- [ ] Padding inside cards matches
- [ ] CTA button sizing matches

## Output

```
## Cross-route consistency audit — <date>

### Summary
X of Y checks pass. Z deviations found.

### Deviations
1. [route] [category] <specific deviation>
   Expected: <design system standard>
   Actual: <what was found>
   Fix: <specific CSS/template change>

### Consistent (pass)
- <list of passing checks>
```

## When to use

- After `/polish` or `/optimize` Phase 6.
- Before shipping a multi-route change.
- As a periodic health check.
