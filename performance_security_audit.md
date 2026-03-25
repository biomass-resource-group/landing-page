# Performance and Security Audit

Date: March 25, 2026

Scope: current working tree in this repository, including uncommitted local changes.

## Executive Summary

This is a low-risk static Astro marketing site with a small production dependency surface and no runtime third-party requests observed during testing. The shipped site performs very well in its current state: local Lighthouse runs scored 99/100 on mobile and 100/100 on desktop, with 0 ms total blocking time and low layout shift.

The main security gap is missing Content Security Policy coverage. The site currently relies on framework defaults and static content hygiene rather than browser-enforced script restrictions, while still using inline scripts in the base layout. The main performance issues are smaller and structural: dead CSS from an older hero implementation is still shipped, and the layout script does scroll-linked work that is not currently consumed by any stylesheet.

## Methodology

The audit included:

- `npm run check`
- `npm run build`
- `npm run validate:dist`
- `npm audit --omit=dev --json`
- `npm audit --json`
- local browser testing against `astro preview`
- local Lighthouse runs for mobile and desktop
- source review of layout, styles, headers, content configuration, and generated assets

## Runtime Results

### Build and dependency checks

- `npm run check`: passed with 0 errors, 0 warnings, 0 hints
- `npm run build`: passed
- `npm run validate:dist`: passed
- `npm audit --omit=dev`: 0 production vulnerabilities
- `npm audit`: 5 moderate dev-only vulnerabilities, all in the `@astrojs/check` -> `@astrojs/language-server` -> `yaml-language-server` -> `yaml` chain

### Lighthouse

#### Mobile

- Performance: 99
- Accessibility: 100
- Best Practices: 100
- SEO: 100
- FCP: 1.4 s
- LCP: 1.5 s
- Speed Index: 1.4 s
- TBT: 0 ms
- CLS: 0.004

#### Desktop

- Performance: 100
- Accessibility: 100
- Best Practices: 100
- SEO: 100
- FCP: 0.4 s
- LCP: 0.4 s
- Speed Index: 0.4 s
- TBT: 0 ms
- CLS: 0.003

### Network observations

No third-party runtime requests were observed. The largest runtime transfers were first-party fonts and the shared stylesheet:

- `/` document: ~7.6 KB transferred
- `/_astro/BaseLayout.iYb3-RLI.css`: ~6.5 KB transferred
- six WOFF2 font files: ~106 KB transferred combined

## Findings

### SEC-01

- Severity: Medium
- Title: No Content Security Policy is defined
- Location:
  - `public/_headers:1`
  - `src/layouts/BaseLayout.astro:80`
  - `src/layouts/BaseLayout.astro:97`
- Evidence:
  - `public/_headers` sets `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`, and `Cross-Origin-Resource-Policy`, but no `Content-Security-Policy`.
  - `BaseLayout.astro` includes inline script blocks for `document.documentElement.classList.add('js')`, JSON-LD output, and the site UI bootstrap logic.
- Impact:
  - If a content injection path is introduced later, the browser has no CSP backstop to limit script execution. On a static site this is defense-in-depth rather than evidence of active XSS, but it is still the largest missing security control in the current build.
- Fix:
  - Move inline behavior into external assets where practical.
  - Add a CSP at the hosting layer or in `_headers` after deciding whether to use hashes or nonces for the remaining inline JSON-LD and bootstrap code.
  - Minimum baseline: restrict `default-src` and `script-src` to `'self'`, set `object-src 'none'`, `base-uri 'self'`, and `frame-ancestors 'none'`.
- Mitigation:
  - Keep all content repo-controlled and avoid introducing arbitrary HTML or third-party scripts until CSP is in place.
- False positive notes:
  - I could not verify edge/runtime headers on production from this repo alone. Astro preview does not reflect host-specific `_headers` behavior, so production should still be checked with a live `curl -I`.

### SEC-02

- Severity: Low
- Title: Dev tooling dependency chain has moderate vulnerabilities
- Location:
  - `package.json:22`
- Evidence:
  - `npm audit --json` reports 5 moderate findings in the dev-only chain rooted at `@astrojs/check`.
  - The deepest advisory is `yaml` vulnerable to stack overflow on deeply nested YAML collections (`GHSA-48c2-rrv3-qjmp`).
  - `npm audit --omit=dev` reports 0 production vulnerabilities.
- Impact:
  - This does not affect shipped browser assets, but it does leave local development, editor tooling, or CI tasks exposed to malformed YAML input until upstream packages are updated.
- Fix:
  - Track the upstream `@astrojs/check` release that pulls in patched transitive dependencies.
  - If you need earlier remediation, test an `overrides` pin for the vulnerable YAML package chain.
- Mitigation:
  - Do not treat untrusted YAML as safe input in local tooling.
- False positive notes:
  - Scope is limited to dev dependencies; I did not find a production-path vulnerability from the current package set.

### PERF-01

- Severity: Medium
- Title: Legacy hero and affiliations CSS is still shipped even though the home page now uses different selectors
- Location:
  - `src/pages/index.astro:38`
  - `src/pages/index.astro:130`
  - `src/styles/global.css:302`
- Evidence:
  - The homepage markup now uses `home-hero*` and `signal-strip*` selectors.
  - `src/styles/global.css` contains legacy `.hero*`, `.hero-visual*`, `.hero-metrics*`, and `.affiliations*` rules beginning at line 302.
  - Repo-wide search shows no `home-hero` selectors in the stylesheet and no remaining template references to `.hero*` or `.affiliations*`.
  - The legacy block between `.hero {` and `.section-intro-block {` is about 7.9 KB raw CSS before compression.
- Impact:
  - The site is shipping CSS that no current template uses, which adds download, parse, and maintenance cost. More importantly, this indicates template/style drift that can hide visual regressions and make performance scores misleading.
- Fix:
  - Remove the obsolete `.hero*` and `.affiliations*` rules if they are truly retired, or restore matching styles for the current `home-hero` and `signal-strip` markup.
  - Add a visual regression check or screenshot-based smoke test so future template/style drift is caught automatically.
- Mitigation:
  - Keep layout-specific selectors colocated or split page-specific CSS from global shared CSS.
- False positive notes:
  - This finding is based on repo-wide selector usage, not runtime CSS coverage tooling alone.

### PERF-02

- Severity: Low
- Title: Scroll handler updates a CSS variable that is not consumed anywhere
- Location:
  - `src/layouts/BaseLayout.astro:105`
  - `src/layouts/BaseLayout.astro:111`
  - `src/layouts/BaseLayout.astro:147`
- Evidence:
  - The layout script queries `[data-hero]` and writes `--hero-progress` on every scroll.
  - Repo search did not find any stylesheet usage of `--hero-progress`.
- Impact:
  - The current implementation adds scroll-linked main-thread work without visible payoff. On this small site the measured cost is low, but it is still dead work on every scroll event.
- Fix:
  - Remove `syncHero()` entirely if the effect is no longer used.
  - If the effect is intended, only keep it once matching CSS exists and consider `requestAnimationFrame` throttling.
- Mitigation:
  - Limit page-specific behavior to pages that actually use it.
- False positive notes:
  - I did not find a consumer for `--hero-progress` anywhere in the repository.

### PERF-03

- Severity: Low
- Title: Font files are the largest runtime payload
- Location:
  - `src/styles/global.css:1`
  - `src/layouts/BaseLayout.astro:62`
- Evidence:
  - The stylesheet imports four Manrope weights and two Cormorant Garamond variants.
  - Base layout preloads two WOFF2 files.
  - Lighthouse network data shows fonts account for the largest runtime transfer on both mobile and desktop, at roughly 106 KB combined.
- Impact:
  - Current real-world performance is still excellent, but fonts are the dominant user-facing payload, so future design expansion will hit font cost first.
- Fix:
  - Trim unused weights and variants.
  - Consider page-specific loading, a smaller subset, or a variable font if one fits the design system.
- Mitigation:
  - Keep preloading limited to the minimum fonts required for above-the-fold text.
- False positive notes:
  - This is an optimization finding, not a present performance failure.

## Positive Observations

- No production dependency vulnerabilities were reported.
- No runtime third-party requests were observed.
- No dangerous DOM sinks such as `innerHTML`, `eval`, `document.write`, or client-side storage usage were found in the app code reviewed.
- Accessibility and SEO signals from Lighthouse were clean.
- The site uses immutable caching for hashed Astro assets in `_headers`.

## Recommended Remediation Order

1. Add CSP support and refactor inline scripts as needed.
2. Reconcile homepage markup with stylesheet ownership, then delete dead hero/affiliations CSS.
3. Remove dead `syncHero()` scroll work.
4. Trim font variants after the design direction is stabilized.
5. Update the dev-only `@astrojs/check` dependency chain when patched upstream packages are available.

## Bottom Line

This site is already fast and low-risk from a production attack-surface perspective. The most important next step is hardening delivery with CSP. After that, the best return is cleaning up the stale hero implementation so the codebase reflects the page that is actually being shipped.
