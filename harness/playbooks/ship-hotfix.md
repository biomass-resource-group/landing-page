# Playbook: ship a hotfix

Use when the live site has a visible regression and speed matters.

## Steps

1. **Confirm the regression.** Run `/deploy-check` against the live
   URL. Get the deployed SHA and compare to `main` HEAD.

2. **Branch from `main`:**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b fix/<short-description>
   ```

3. **Minimal fix only.** Touch the fewest files possible. Don't bundle
   other improvements — hotfixes ship alone.

4. **Validate locally:**
   ```bash
   npm run check && npm run build && npm run validate:dist
   ```

5. **Ship:**
   ```
   /ship "fix: <description of regression>"
   ```
   This runs validation, commits, pushes, opens a PR.

6. **Merge immediately** after CI goes green. Squash-merge.

7. **Verify the deploy.** Cloudflare Pages rebuilds on merge to `main`.
   Run `/deploy-check` again to confirm the fix is live.

8. **Post-mortem (optional).** If the regression was caused by a
   missing `validate:dist` assertion, add one in a follow-up PR.

## Timeline target

Branch → merge: under 30 minutes. If the fix is taking longer, it's
not a hotfix — it's a regular fix that should go through `/improve`.

## Don't

- Don't push directly to `main`. Even hotfixes go through a PR.
- Don't bundle other changes. One fix, one PR.
- Don't skip validation. A bad hotfix is worse than the regression.
