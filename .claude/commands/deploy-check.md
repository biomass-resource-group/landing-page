---
description: Pre-deploy checklist — verifies live deploy matches `main`, headers are intact, and key routes respond 200.
argument-hint: "[url: https://biomassresourcegroup.com | preview URL]"
allowed-tools: Read, Grep, Glob, Bash
---

You are running a pre-deploy sanity check against `$ARGUMENTS`
(default: `https://biomassresourcegroup.com`).

## Steps

1. Resolve the target URL. If the arg is missing, use production.
2. `npm run validate:live-deploy` — runs Lighthouse + structural
   assertions against the live URL.
3. For each canonical route, `curl -sI <url><route>` and verify:
   - HTTP 200.
   - `content-type: text/html; charset=utf-8`.
   - `strict-transport-security` present.
   - `content-security-policy` present and matches the expected shape
     for that route.
   - `cache-control` has the expected max-age for HTML routes.
4. Check the deployed commit SHA matches `main`'s head (via the response
   body's `<meta name="deploy-sha">` if present, or the Cloudflare
   deployment UI).

## Output

```
## Deploy check — <url> — <date>

### Route probes
| Route       | HTTP | CT | HSTS | CSP | Cache |
| ----------- | ---- | -- | ---- | --- | ----- |
| /           | 200  | ✓  | ✓    | ✓   | ✓     |
| /about/     | 200  | ✓  | ✓    | ✓   | ✓     |
| ...         |      |    |      |     |       |

### Lighthouse (from validate:live-deploy)
Perf: X    A11y: X    BP: X    SEO: X

### SHA match
Live: <sha>    main HEAD: <sha>    match: yes / NO

### Decision
healthy | investigate
```

## Triggers

- Before confirming a deploy rolled out.
- If the user reports a regression on live.
- After a major dependency bump or Cloudflare settings change.

## Don't

- Don't hit the live site in a loop. One full sweep, then report.
- Don't modify headers / CSP from this command — that's
  `/update-docs` + a code change.
