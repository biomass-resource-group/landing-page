# Playbook: handle CI failure

Use when a PR's CI checks fail after push.

## Steps

1. **Read the failure.** Check the GitHub Actions log via the PR's
   check-runs link, or run locally:
   ```bash
   npm run check && npm run build && npm run validate:dist
   ```

2. **Classify.**
   - Type error → delegate to `build-error-resolver`.
   - Build failure → delegate to `build-error-resolver`.
   - `validate:dist` assertion failure → read the assertion; fix the
     source, not the validator.
   - Cloudflare Pages build failure → check `postbuild-dist.mjs` and
     `_headers`.
   - Dependency review failure → `npm audit`, fix or document.

3. **Fix locally.** Re-run the full gate. Confirm green.

4. **Push a follow-up commit.** Don't amend the failing commit — CI
   re-runs on the new push automatically.

5. **Verify the PR checks go green.** Use
   `mcp__github__pull_request_read` with `get_check_runs` method.

## Common patterns

| Failure | Typical cause | Fix |
|---------|--------------|-----|
| `tsc` error after `site.ts` edit | Structural shape changed | Update consumers |
| `validate:dist` heading order | Hero removed or duplicated `<h1>` | Restore single `<h1>` |
| CSP hash mismatch | New inline script without rebuild | `npm run build` regenerates |
| Cloudflare build timeout | Large unoptimized image committed | Resize before commit |

## Don't

- Don't weaken `validate-dist.mjs` to pass.
- Don't skip CI with `--no-verify`.
- Don't close and re-open the PR to reset checks.
