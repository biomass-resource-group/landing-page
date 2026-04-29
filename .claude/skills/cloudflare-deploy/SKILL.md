---
name: cloudflare-deploy
description: Deployment patterns for Cloudflare Pages. Triggers when editing deploy-adjacent config — `astro.config.mjs`, `public/_headers`, `public/_redirects`, `wrangler.toml` — or debugging a live-deploy mismatch.
---

# Cloudflare Pages deploy

The site ships via Cloudflare Pages. Every PR gets a preview URL; `main`
promotes to `biomassresourcegroup.com` automatically.

## Pipeline

1. Push to `main` for production, or push to a feature branch when a preview
   should be reviewed first.
2. For PR branches, the Cloudflare bot surfaces the preview URL +
   build logs.
3. Any push or merge to `main` runs the production build and deploys to the apex.

Build command (from Cloudflare settings): `npm ci && npm run build`.
Output directory: `dist/`.

## What lives where

- [`public/_headers`](../../../public/_headers) — HTTP headers
  applied per-route. Pattern-matched.
- [`public/_redirects`](../../../public/_redirects) — 301/302/200 rules
  for route moves + rewrites.
- [`wrangler.toml`](../../../wrangler.toml) — only relevant if Workers
  are used. Keep minimal; this is a static site.
- [`scripts/postbuild-dist.mjs`](../../../scripts/postbuild-dist.mjs) —
  emits route-specific CSP into `_headers` at build time.

## Common issues

### Preview URL shows old content

- Cloudflare is still building. Wait. The bot comment updates.
- The PR was never pushed to the remote. Check `git status` + `git log
  origin/<branch>`.

### Live URL shows different CSP than preview

- The last deploy to `main` didn't rebuild `_headers`. Force a redeploy
  by pushing an empty commit or retriggering in the Cloudflare UI.
- The preview was built from a different `main` SHA than what's live.
  Compare `git log main --oneline` to the Cloudflare deploy SHA.

### 404 on a route that exists in `src/pages/`

- Trailing-slash mismatch. Astro emits `/about/index.html`; the link
  must use `/about/` with the trailing slash.
- Route added but `dist/` cached. Force a rebuild.

## When NOT to edit Cloudflare config

- Don't change build command / output directory without approval.
- Don't change the production branch from `main`.
- Don't enable Workers / server-side features — this site is static
  by design. Moving to SSR is a major architectural decision.

## Verifying a deploy

```
/deploy-check https://biomassresourcegroup.com
```

Runs header probes + Lighthouse + deploy-SHA match.

## Rollback

- Production rollback: Cloudflare dashboard → Pages → deployments →
  "Rollback" on the previous good deploy. Instant.
- Preview rollback: N/A — previews are per-commit.
- Git rollback: revert the merge commit on `main` via a PR.
  Cloudflare redeploys automatically.
