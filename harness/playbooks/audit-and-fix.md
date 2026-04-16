# Playbook: Site-wide audit and remediation

Use when there is no specific request, but the team wants to know "what
should we fix next?"

## Steps

1. **Run the audit**:
   ```text
   /audit all
   ```
   This builds the site and dispatches `ux-reviewer` and
   `accessibility-auditor` in parallel for every route. Outputs a
   per-route scorecard, top blockers, and top improvements.

2. **Triage with the user**. Group blockers and improvements into PRs.
   A good unit of work is one PR per top improvement, or one PR per
   related cluster of blockers.

3. **For each PR-sized chunk, run `/improve`** with the cluster as the
   request. The improvement pipeline takes care of planning,
   implementation, review, validation, and shipping.

4. **Re-audit after merging** to confirm the score moved.

## Cadence

- After any non-trivial PR merges to `main`.
- Weekly while large redesigns are in flight.
- Before live-deploy validation runs (`npm run validate:live-deploy`).

## What the audit will not catch

- Conversion / funnel performance (no analytics tie-in yet).
- Real-device readability — manual eyeball is still required for
  mobile screenshots.
- Brand-voice nuance on net-new copy — defer to `copy-editor`.
