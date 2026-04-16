# Playbook: Redesign a single route

Use when reworking a whole page (e.g. "rebuild /about/").

## Steps

1. **Spec the current state**:
   ```text
   /route-spec /about/
   ```
   This produces a baseline acceptance list for the route as it stands
   today, plus a prioritized list of improvement opportunities.

2. **Decide the scope** with the user:
   - Which improvements are in this PR?
   - Which are deferred?
   - Any hard constraints (e.g. "keep Julie's LinkedIn link")?

3. **Run `/improve`** with the agreed scope. The pipeline will run:
   - `visual-designer` for any `[layout]` or `[branding]` items
   - `astro-implementer` for the actual edits
   - `ux-reviewer` + `accessibility-auditor` in parallel
   - `dist-validator` for the structural/SEO contract
   - `git-shipper` to PR

4. **Iterate on review feedback**. PR webhook activity arrives as
   `<github-webhook-activity>` events; address them as they come.

## Tips

- Always start from `main`. Confirm `git status` is clean before
  branching.
- Update `harness/checklists/ui-ux-scorecard.md` if the redesign
  introduces a new pattern that should be enforced going forward.
- If the redesign touches the homepage hero, re-read the "Keep the
  homepage hero calm" rule in `CLAUDE.md` before proposing visuals.
