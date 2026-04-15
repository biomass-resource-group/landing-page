# UI/UX Release Gate Workflow

Use this workflow for all feature, copy, layout, and component updates.

## Stage 1: Discovery & Spec (Claude)

- Define business objective and target audience segment.
- Identify impacted routes and user journeys.
- Produce acceptance criteria with measurable checks.

Required output:
- Goal statement
- Route/component impact map
- Acceptance criteria
- UX risk register

## Stage 2: Implementation (Codex)

- Implement in smallest coherent patch.
- Keep semantics/accessibility intact or improved.
- Include test evidence from required command suite.

Required output:
- Diff summary
- Commands + results
- Any known limitations

## Stage 3: UI/UX Scoring (Claude + Codex)

- Evaluate using `harness/checklists/ui-ux-scorecard.md`.
- Record score 1-5 for every criterion.
- Mark blockers and required remediations.

Gate logic:
- Any criterion <= 2 => block merge.
- Any category average < 4.0 => block merge.
- Any missing keyboard path for primary CTA => block merge.

## Stage 4: Finalization (Codex)

- Apply remediation if needed.
- Re-run validations.
- Prepare merge summary with risk notes.

## Required Evidence Checklist

- [ ] Acceptance criteria addressed.
- [ ] `npm run check` passed.
- [ ] `npm run build` passed.
- [ ] `npm run validate:dist` passed.
- [ ] Scorecard completed.
- [ ] No unresolved blocker.

## Cadence for Continuous Improvement

At least once per month, run a dedicated UI/UX hardening cycle:

1. Select top 3 high-traffic paths.
2. Re-score with current scorecard.
3. Ship quick wins first (navigation clarity, CTA copy, spacing/contrast, mobile ergonomics).
4. Document before/after outcomes.
