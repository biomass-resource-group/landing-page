---
description: Review pending code changes against the repo's code-quality rubric. Use before merge or as part of `/improve` pipeline.
argument-hint: "[PR #N | main...HEAD | <file paths>]"
allowed-tools: Agent, Read, Grep, Glob, Bash
---

You are running code review on `$ARGUMENTS` (default: `main...HEAD`).

## Steps

1. Resolve the scope:
   - PR number → fetch the PR diff.
   - `main...HEAD` → use local diff against main.
   - File paths → limit review to those files.
2. Dispatch `code-reviewer` and, if the diff touches `.ts` files or
   Astro frontmatter, also `typescript-reviewer` — run in parallel.
3. If the diff touches `scripts/postbuild-dist.mjs`, `public/_headers`,
   `package.json`, `package-lock.json`, or adds inline `<script>` /
   `<style>`, also dispatch `security-reviewer` in parallel.

## Output

```
## Code review — <scope>

### Summary
- Files changed: <count>
- Blockers: <count>    Majors: <count>    Minors: <count>

### Findings
[from each reviewer, sorted by severity]

### Decision
approve | needs revision

### Next
- If approve and this is pre-merge: `/ship "<summary>"` or continue with /improve.
- If needs revision: fix the blockers, re-run `/code-review`.
```

## Merge bar

Can merge when:
- Zero BLOCKER findings across all reviewers invoked.
- `npm run check && build && validate:dist` pass (delegate to
  `dist-validator` if uncertain).
