---
description: Visual polish pass — run visual-designer → astro-implementer → ux-reviewer in a tight loop on target routes until visual hierarchy scores ≥4.5.
argument-hint: "<route(s) or 'all'>"
allowed-tools: Agent, Read, Edit, Write, Bash, Glob, Grep
---

You are running a focused visual polish pass on $ARGUMENTS
(default: `all`). This is NOT a full improvement pipeline — it
targets only visual quality (spacing, typography, color, hierarchy).

## Steps

1. **Build** — ensure `dist/` is fresh.
2. **Read design system** — load the `design-system` skill for
   reference tokens and patterns.
3. **For each route in scope:**
   a. Read the route's built HTML from `dist/`.
   b. Read the route's source `.astro` file and relevant `site.ts`
      section.
   c. Dispatch `visual-designer` with:
      - The current HTML
      - Design system reference
      - Specific prompt: "Propose CSS changes to bring this route's
        visual hierarchy, spacing, and typography to design-system
        compliance. Focus on: whitespace generosity, heading size
        ratios, eyebrow consistency, card uniformity, CTA prominence,
        section rhythm."
   d. Dispatch `astro-implementer` with the visual proposal.
   e. Rebuild and dispatch `ux-reviewer` on the route.
   f. If visual hierarchy score < 4.5, iterate once more.
4. **Cross-route pass** — dispatch `ux-reviewer` across ALL routes,
   asking specifically about visual consistency.
5. Report per-route visual hierarchy scores.

## Output

```
## Visual polish — <date>

| Route   | Before | After | Changes |
|---------|--------|-------|---------|
| /       | X.X    | X.X   | N edits |
| /about/ | X.X    | X.X   | N edits |
| ...     |        |       |         |

### Cross-route consistency
- [pass/fail] Section spacing consistent
- [pass/fail] Heading sizes matched
- [pass/fail] CTA style unified
- [pass/fail] Eyebrow treatment consistent
```

## When to use

- After `/improve` or `/overnight` when functional quality is good
  but the site doesn't look polished.
- As Phase 2 of `/optimize`.
- Before a demo or investor presentation.
