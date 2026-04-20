---
description: Run the full multi-phase UI/UX optimization pipeline — functional fixes, visual polish, copy refinement, performance tuning, cross-route consistency — until all routes score ≥4.5 with zero blockers.
argument-hint: "<goal or 'all'>"
allowed-tools: Agent, Read, Edit, Write, Bash, Glob, Grep
---

You are running the BRG site's comprehensive optimization pipeline.
This is the highest-quality pipeline — it chains multiple improvement
strategies in sequence, then converges. Treat $ARGUMENTS as the scope
(default: `all` routes).

## Phase 0: Baseline

1. Run `npm run build` to ensure a clean starting state.
2. Run `/audit all` to get baseline scores per route per category.
3. Record baselines in `harness/.overnight-state.json`.
4. Report baseline to the user.

## Phase 1: Structural fixes

Fix any functional issues that prevent quality scoring:

1. Run `npm run check && npm run validate:dist`. Fix failures first.
2. For each route scoring < 4.0 on any category, dispatch
   `site-planner` to identify structural issues (missing sections,
   wrong heading hierarchy, broken layout).
3. Run `/improve` for each structural fix.
4. `/checkpoint "phase-1-structural"`.

## Phase 2: Visual polish

Bring every route to design-system compliance:

1. Read the `design-system` skill for token/pattern reference.
2. For each route, dispatch `visual-designer` with:
   - Current route HTML (from `dist/`)
   - Design system tokens
   - Prompt: "Audit this route against the design system. Propose
     specific CSS changes to improve spacing, typography hierarchy,
     color usage, and component consistency."
3. Dispatch `astro-implementer` with the visual proposals.
4. Re-audit affected routes. Iterate if < 4.5 on visual hierarchy.
5. `/checkpoint "phase-2-visual"`.

## Phase 3: Copy refinement

Polish every user-visible string:

1. Dispatch `copy-editor` with all content from `src/data/site.ts`.
   Ask for: brand voice compliance, sentence brevity, quantitative
   specificity, superlative removal, heading sentence case.
2. If the copy-editor suggests changes, dispatch `astro-implementer`
   to apply them in `site.ts`.
3. Run `npm run validate:dist` to confirm budgets.
4. `/checkpoint "phase-3-copy"`.

## Phase 4: Accessibility hardening

Exceed AA compliance:

1. Dispatch `accessibility-auditor` on all routes.
2. Fix all blockers and majors via `astro-implementer`.
3. Re-audit. Target: zero blockers, zero majors.
4. `/checkpoint "phase-4-a11y"`.

## Phase 5: Performance tuning

Hit aggressive budgets:

1. Dispatch `performance-reviewer` on all routes.
2. Common wins: optimize images, defer non-critical CSS, minimize
   render-blocking resources, check font loading strategy.
3. Apply fixes via `astro-implementer`.
4. Re-audit. Targets: LCP < 1.5s, CLS = 0, TBT < 100ms.
5. `/checkpoint "phase-5-perf"`.

## Phase 6: Cross-route consistency

Ensure the site feels like one cohesive product:

1. Dispatch `ux-reviewer` with ALL routes simultaneously, asking
   specifically for cross-route consistency:
   - Same section spacing on equivalent hierarchy levels
   - Same heading sizes for same-level headings
   - Same CTA style everywhere
   - Same eyebrow treatment
   - Same card patterns
   - Consistent footer/header across all routes
2. Fix inconsistencies via `astro-implementer`.
3. `/checkpoint "phase-6-consistency"`.

## Phase 7: Final convergence

1. Run `/quality-gate all`.
2. If any route < 4.5 on any category:
   a. Identify the weakest route + category.
   b. Dispatch targeted `/improve` for that specific gap.
   c. Re-run `/quality-gate` for the affected route.
3. Repeat until all routes ≥ 4.5 or circuit breaker trips.

## Circuit breakers

- **Max total iterations**: 30 across all phases.
- **Phase timeout**: If a single phase takes > 8 iterations without
  improving any score by ≥ 0.1, move to the next phase.
- **Convergence plateau**: If 2 consecutive quality-gate runs show
  no improvement, stop and report.

## Final report

```
## Optimization report — <date>

### Phase summary
| Phase | Items fixed | Time spent | Score delta |
|-------|------------|------------|-------------|
| 1. Structural | N | Xm | +Y.Y |
| 2. Visual | N | Xm | +Y.Y |
| 3. Copy | N | Xm | +Y.Y |
| 4. Accessibility | N | Xm | +Y.Y |
| 5. Performance | N | Xm | +Y.Y |
| 6. Consistency | N | Xm | +Y.Y |
| 7. Convergence | N | Xm | +Y.Y |

### Final scorecard
| Route | Clarity | Hierarchy | UX | A11y | Perf | Avg |
|-------|---------|-----------|-----|------|------|-----|
| / | X.X | X.X | X.X | X.X | X.X | X.X |
| ... | | | | | | |

### Baseline → Final delta
| Route | Before | After | Delta |
|-------|--------|-------|-------|
| / | X.X | X.X | +X.X |

### Outstanding items
- <anything that couldn't be fixed>

### Commits
<git log --oneline main..HEAD>
```

## Guardrails

All hard rules from CLAUDE.md apply. Every change goes through
the review pipeline. No shortcuts. Reference the `design-system`
skill for every visual decision.
