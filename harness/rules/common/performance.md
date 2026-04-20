# performance.md

Marketing sites live or die on first-load performance. These are the
thresholds and habits.

## Targets

- **LCP** ≤ 2.0s on 4G mobile (lab).
- **CLS** ≤ 0.05.
- **TBT** ≤ 150ms.
- **Total transferred HTML + CSS + JS (initial route)** ≤ 150 kB gzip.
- **Per-image weight** ≤ 150 kB; use AVIF/WebP with a JPEG/PNG fallback
  only when the CDN doesn't auto-negotiate.

`performance-reviewer` checks these against a Lighthouse run.
Regressions block the merge.

## Images

- Store originals in `public/` or import through `astro:assets` so
  Astro can fingerprint + resize.
- Always set `width` + `height` (prevents CLS).
- Lazy-load below-the-fold images: `loading="lazy" decoding="async"`.
- Hero / above-the-fold images: `loading="eager" fetchpriority="high"`.
- Never ship a raw 4000×3000 hero. Resize before import.

## Fonts

- Self-host through Astro's asset pipeline. No third-party font CDN unless
  explicitly justified (then add to CSP).
- Use `font-display: swap`.
- Preload at most one weight per face in the `<head>`.

## JS

- No client-side hydration unless the component is genuinely interactive.
  Default to Astro's static-HTML output.
- If you need JS, prefer `client:visible` or `client:idle` over
  `client:load`.
- Avoid bundling utility libraries (lodash, moment). Inline the 5 lines
  you need.

## CSS

- Critical CSS is inlined in the `<head>` at build time.
- Avoid `@import` in CSS — bundles the import chain synchronously.
- Prefer `transform` / `opacity` for animation. Avoid animating `top`,
  `left`, `width`, `height`.

## Caching

- `_headers` sets long `Cache-Control` for fingerprinted assets and
  short TTL for HTML.
- Don't hand-edit the cache strategy without understanding the
  fingerprint / invalidation story.

## Measuring

- Use `npm run validate:live-deploy` for the live-URL Lighthouse pass
  before promoting a PR as ready.
- Cloudflare Pages preview deployments attach to every PR — use them
  for mobile / slow-connection checks before merge.
