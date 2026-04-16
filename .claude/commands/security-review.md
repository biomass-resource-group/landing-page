---
description: Security review of pending changes — CSP, headers, deps, secrets, input escaping.
argument-hint: "[PR #N | main...HEAD | <file paths>]"
allowed-tools: Agent, Read, Grep, Glob, Bash
---

You are running a security review on `$ARGUMENTS` (default: `main...HEAD`).

## Steps

1. Resolve the scope (same as `/code-review`).
2. Dispatch `security-reviewer` with the diff.
3. If `package.json` or `package-lock.json` changed, also run
   `npm audit --production` and include the output in the review.
4. If `scripts/postbuild-dist.mjs` or `public/_headers` changed,
   include a before/after diff of the CSP headers in the output.

## Output

```
## Security review — <scope>

### Surface area touched
- [ ] CSP / headers
- [ ] Dependencies (new: N, updated: N)
- [ ] Secrets / env
- [ ] Input / output (external data rendered)
- [ ] Redirects / rewrites

### npm audit
<inline summary — 0 critical / 0 high / … or "no dep changes">

### Findings
[from security-reviewer]

### Decision
approve | needs revision
```

## Merge bar

- Zero BLOCKER findings.
- `npm audit --production` shows zero High or Critical advisories.
- All header / CSP changes have explicit rationale in the PR body.
