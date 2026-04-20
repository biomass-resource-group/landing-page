# Playbook: converge to excellence

Use when the site passes validation but doesn't yet feel exceptional.
This playbook drives quality beyond "good enough" toward a polished,
professional result.

## Excellence criteria

| Dimension        | Good (≥4.0) | Excellent (≥4.5) | How to close the gap |
|-----------------|-------------|-------------------|----------------------|
| Visual clarity  | Clean layout | Every element earns its space | Remove or consolidate low-value sections |
| Information hierarchy | Scannable | Eye path is intentional | Audit heading levels, font sizes, spacing |
| Copy quality    | Accurate | Specific, quantitative, operator-grounded | Replace vague claims with numbers |
| Accessibility   | No blockers | AAA where possible | Increase contrast ratios, add skip links |
| Performance     | < 3s LCP | < 1.5s LCP, 0 CLS | Optimize images, defer non-critical CSS |
| Brand coherence | Consistent | Every touchpoint feels BRG | Audit color, typography, voice end-to-end |

## Method

1. **Baseline audit.** Run `/audit all` and record per-route,
   per-category scores.

2. **Identify the weakest dimension.** Not the weakest route — the
   weakest dimension site-wide. A site with 4.8 clarity but 3.9
   hierarchy feels worse than one with uniform 4.3s.

3. **Targeted improvement cycle.** For each weak dimension:
   a. Dispatch `site-planner` with a dimension-specific prompt:
      - Clarity: "audit visual density and whitespace"
      - Hierarchy: "audit heading levels, size ratios, spacing scale"
      - Copy: "audit every user-visible string for brand voice"
      - A11y: "full WCAG 2.1 AA audit"
      - Perf: "Lighthouse audit with budgets"
      - Brand: "compare every route's visual treatment for consistency"
   b. Run `/improve` with the planner's output.
   c. Re-audit the affected routes.

4. **Cross-route consistency pass.** After individual improvements,
   audit across routes for:
   - Consistent section spacing
   - Matching heading sizes for equivalent hierarchy
   - Same CTA style on every route
   - Identical footer/header treatment
   - Consistent metric/data presentation

5. **Final polish.** Dispatch `copy-editor` for a complete brand-voice
   pass. Fix any remaining < 4.5 scores.

6. **Sign off.** Run `/quality-gate all`. If all categories ≥ 4.5 and
   zero a11y blockers, the site is excellent.

## When excellence isn't achievable

Some constraints prevent 4.5+ scores:
- Content gaps (e.g., missing case studies) → document as future work.
- Design system limitations → note as a design-debt item.
- Third-party embeds (e.g., forms) that can't be fully styled → accept
  and document.

Report these honestly in the morning summary. A 4.3 with documented
constraints is better than a fake 4.5.

## Typical timeline

- 7 routes × 3 dimensions needing work = ~21 improvement cycles.
- At ~10 minutes per cycle = ~3.5 hours.
- Add convergence iterations: ~5 hours total.
- Well within an overnight window.
