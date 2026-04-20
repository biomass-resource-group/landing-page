# testing.md

This repo has no unit-test runner. Correctness is enforced through a
tight structural validation pass + manual + Lighthouse. Here's what
that covers and where the gaps are.

## `npm run check`

- `astro sync` — regenerates type definitions for content collections.
- `tsc --noEmit` — hard type-check against `tsconfig.json`.
- Catches: type errors, unresolvable imports, broken content-collection
  schemas, referencing a component that doesn't exist.

## `npm run build`

- `astro build` — static output to `dist/`.
- `node ./scripts/postbuild-dist.mjs` — emits route-scoped CSP headers.
- Catches: build-time failures, CSP hash drift, sitemap regeneration.

## `npm run validate:dist`

Runs [`scripts/validate-dist.mjs`](../../scripts/validate-dist.mjs).
Covers:

- Every route has a `<title>`, meta description, canonical link.
- Every `<img>` has `width` + `height` + `alt` text.
- Every route has an `<h1>` and exactly one.
- Structural / SEO / a11y assertions (landmark regions, heading order,
  anchor accessibility).
- Hard-rule enforcement: no Cody LinkedIn, Julie LinkedIn present on
  `/about/`, hero structural shape.

**Do not weaken this script to make a change pass.** If the assertion
needs to evolve, that's a separate PR with a written rationale.

## `npm run validate:live-deploy`

Runs against the live `biomassresourcegroup.com`. Use after merge to
confirm the Cloudflare Pages deploy matches intent. Catches drift
between the preview and production (CSP, cache, redirects).

## Manual smoke test

Before shipping a visible change:

- Open the Cloudflare Pages preview URL.
- Load the affected route on desktop + mobile viewport.
- Tab through the page — focus must be visible and ordered.
- Zoom to 200% — no horizontal scroll, no text clipped.

## Gaps we accept

- No Playwright / browser automation. The site is small; manual +
  Lighthouse covers it.
- No visual regression tests. Review the preview URL instead.
- No load tests. Static site + CDN — not a concern.

## When to add tests

Only when:

- A bug recurs because the existing validation missed it.
- The repo grows enough that manual smoke-testing stops scaling.

In both cases, extend `validate-dist.mjs` rather than introduce a new
test framework.
