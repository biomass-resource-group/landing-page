# security.md

This is a static marketing site with no user-generated content, no login,
no server state. The attack surface is small but not zero — headers,
deps, secrets, and anything that executes in the browser still matter.

## CSP

- Route-specific CSP is emitted by
  [`scripts/postbuild-dist.mjs`](../../scripts/postbuild-dist.mjs) and
  enforced at the edge via [`public/_headers`](../../public/_headers).
- `script-src` is `'self'` + documented hashes only. No `'unsafe-inline'`,
  no `'unsafe-eval'`.
- If a change adds an inline `<script>`, the hash must land in the CSP
  the same commit. Otherwise the browser blocks the script.
- If a change needs a new external origin (font CDN, analytics, etc.),
  add it to `postbuild-dist.mjs` and document the decision in the PR.

## HTTP headers

Emitted via `public/_headers`. At minimum, every route sends:

- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` limiting camera, microphone, geolocation.

Don't relax these without a written reason.

## Dependencies

- All runtime deps pinned via `package-lock.json`.
- Dependabot handles patch + minor bumps. Review the diff, confirm CI,
  merge.
- Major version bumps need a human call — pause and surface to the user.
- Before adding a new dep, ask: "is this worth the supply-chain risk?"
  For a 5-page site, the answer is usually no.

## Secrets

- No secrets in the repo. `.env*` is gitignored.
- Cloudflare tokens, analytics keys, etc. live in the Cloudflare project
  settings, never in `wrangler.toml` or `astro.config.mjs`.
- If a secret lands in a commit, rotate it first, then rewrite history
  (force-push to the branch — never to `main`).

## User input

- Contact form submissions go to a third-party (Formspree / equivalent).
  Treat the endpoint URL as public-safe.
- No raw HTML is rendered from external data. Astro escapes by default —
  don't override it (`set:html`) without a written reason.

## Review triggers

Any of these changes should invoke `security-reviewer` before merge:

- Touching `scripts/postbuild-dist.mjs` or `public/_headers`.
- Adding a new runtime dependency.
- Adding an inline `<script>` or `<style>`.
- Rendering external data without obvious escaping.
- Changing redirect / rewrite rules.
