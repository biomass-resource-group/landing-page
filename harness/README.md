# Biomass Resource Group AI Harness

This harness defines a production-oriented collaboration model for **Claude + Codex** to work safely and quickly in `biomass-resource-group/landing-page`, with a built-in quality gate for consistently high-end UI/UX.

## Objectives

1. Preserve brand and messaging integrity while shipping fast.
2. Enforce repeatable engineering and review workflows.
3. Continuously improve UI quality, accessibility, and conversion-focused UX.
4. Keep future contributors aligned through explicit, reusable instructions.

## Harness Components

- `harness/claude/system-prompt.md`  
  Strategic orchestrator prompt for architecture, planning, UX strategy, release notes, and cross-page consistency.
- `harness/codex/system-prompt.md`  
  Delivery executor prompt for implementation, validation, and code-quality discipline.
- `harness/workflows/ui-ux-release-gate.md`  
  Required release workflow with quantitative UI/UX gate.
- `harness/checklists/ui-ux-scorecard.md`  
  Scoring rubric used by both agents before merge.

## Operating Model (Recommended)

1. **Claude: plan + spec**
   - Expands a request into scope, constraints, acceptance criteria, and UX impact map.
   - Produces implementation plan and test plan.
2. **Codex: implement + verify**
   - Executes atomic change sets.
   - Runs static checks/build/validation.
   - Produces artifacts for review.
3. **Claude: polish + governance review**
   - Applies scorecard.
   - Confirms cross-route consistency, content clarity, accessibility, and conversion path quality.
4. **Codex: finalize**
   - Applies final adjustments and prepares merge-ready branch output.

## Minimum Quality Bar (Do Not Merge Below)

- Accessibility scorecard category average: **>= 4/5**
- Visual consistency category average: **>= 4/5**
- Conversion clarity category average: **>= 4/5**
- No blocking issues in keyboard navigation, semantics, or critical CTA paths.

## Execution Contract

Both agents should follow this order on each task:

1. Restate goal + impacted routes/components.
2. List assumptions and unknowns.
3. Produce or update a short plan.
4. Implement smallest safe change.
5. Run required checks.
6. Score with `harness/checklists/ui-ux-scorecard.md`.
7. Report diffs, risks, and recommended follow-up.

## Required Repo Checks

Run all applicable checks before merge:

```bash
npm run check
npm run build
npm run validate:dist
```

If a task modifies production behavior, also run:

```bash
npm run validate:live-deploy
```

## Notes on Referenced Local Files

This harness is designed so it works even when external local machine artifacts are not accessible in CI/remote agent runtimes. If local config/PDF files are available, agents should map any additional constraints into the scorecard and prompts without weakening existing quality gates.
