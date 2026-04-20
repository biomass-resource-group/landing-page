---
description: Autonomous merge command — merges the PR when CI is green, quality gate passes, and no unresolved review comments remain. Designed for unattended overnight operation when authorized.
argument-hint: "[PR number]"
allowed-tools: Agent, Read, Bash, Glob, Grep
---

You are autonomously merging a PR when all quality gates have cleared.
This is only used when explicitly authorized for unattended operation
(e.g., during `/overnight` or `/optimize`). Treat $ARGUMENTS as the
PR number (default: PR for current branch).

## Pre-merge gate (ALL must pass)

1. **CI green** — fetch check-runs via `mcp__github__pull_request_read`
   with method `get_check_runs`. All required checks must be `success`.
2. **No failing reviews** — fetch reviews. No `CHANGES_REQUESTED`
   reviews unresolved.
3. **No unresolved review comments** — fetch review comments. All
   actionable comments must be addressed (replied or fixed).
4. **Local validation** — run `npm run check && npm run build &&
   npm run validate:dist`. All must pass.
5. **Branch up to date** — `git fetch origin main && git status` must
   show the branch is not behind main.

## Merge

If all gates pass:

```
mcp__github__merge_pull_request with:
  pullNumber: <PR>
  merge_method: "squash"
```

After merge:
1. Switch to main: `git checkout main && git pull origin main`
2. Confirm the merge commit landed.
3. Run `/deploy-check` to verify the live deployment.

## When to bail out

Do NOT merge if:
- Any CI check is `pending` (wait, don't bail)
- Any CI check is `failure` (escalate, fix first)
- Any reviewer requested changes (escalate)
- Local validation fails (fix first)
- Branch has diverged from main (rebase first)
- The PR has the `do-not-merge` label (skip)

## Output

```
## Auto-merge — PR #<n>

### Pre-merge gates
- CI: pass | fail (<details>)
- Reviews: pass | fail
- Review comments: pass | fail
- Local validation: pass | fail
- Branch sync: pass | fail

### Action taken
- MERGED to main with squash | DEFERRED — <reason>

### Post-merge
- Cloudflare Pages deploy: in progress | success | failed
- Live URL: <url>
- Live verification: <result>
```
