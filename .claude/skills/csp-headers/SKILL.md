---
name: csp-headers
description: Managing Content-Security-Policy and HTTP headers for this repo. Triggers when editing `scripts/postbuild-dist.mjs`, `public/_headers`, or adding any inline `<script>` / `<style>` / external origin.
---

# CSP + HTTP headers

Route-specific CSP is emitted at build time by
[`scripts/postbuild-dist.mjs`](../../../scripts/postbuild-dist.mjs) and
enforced at the Cloudflare Pages edge via
[`public/_headers`](../../../public/_headers).

## Rule zero

**Never add `'unsafe-inline'` or `'unsafe-eval'`** to `script-src` /
`style-src`. If the change seems to require it, you're doing something
wrong — escalate.

## Adding an inline script

1. Write the inline `<script>`. It will be blocked by CSP at first
   load.
2. Run `npm run build`. `postbuild-dist.mjs` computes a SHA-256 hash of
   each inline script per route.
3. The hash lands in `_headers` automatically during postbuild. Commit
   both the script and the regenerated headers.
4. Verify: `curl -sI <preview-url>/<route> | grep content-security-policy`.

## Adding an external origin

For a new CDN, analytics domain, image source, font host:

1. Identify which CSP directive it belongs in: `script-src`, `img-src`,
   `font-src`, `connect-src`, `style-src`, `media-src`.
2. Edit `scripts/postbuild-dist.mjs` to add the origin to the right
   directive in the allow-list.
3. Run `npm run build` and verify the emitted headers include the new
   origin.
4. Document the addition in the PR description — why is this origin
   needed?

## Headers that must always be present

Every route sends:

- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` restricting camera, microphone, geolocation.

Don't relax without a written reason.

## Testing locally

```bash
npm run build
npx serve dist -p 8080
curl -sI http://localhost:8080/about/index.html
```

The static server won't enforce `_headers` — but Cloudflare Pages
will on the preview URL. Always verify on the preview, not just
locally.

## When `validate:live-deploy` complains about CSP

- The live deploy doesn't match `main`. Force a redeploy.
- A new origin landed in `main` without updating `_headers`. Rare but
  fixable by re-running `npm run build` and pushing.
- A third-party script is loading an inline handler that isn't in
  the CSP hash list. Find and remove the handler.

## Delegation

Any CSP / header change must go through `security-reviewer` before
merge.
