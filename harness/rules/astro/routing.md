# astro/routing.md

Routing conventions for this repo.

## Current routes

| File                    | Route         |
| ----------------------- | ------------- |
| `src/pages/index.astro` | `/`           |
| `src/pages/about.astro` | `/about/`     |
| `src/pages/company.astro` | `/company/` |
| `src/pages/contact.astro` | `/contact/` |
| `src/pages/markets.astro` | `/markets/` |
| `src/pages/platform.astro` | `/platform/` |
| `src/pages/404.astro`   | `/404.html`   |

Trailing slashes match Astro's default output mode and the `_headers`
file's CSP keys. Don't disable trailing slashes.

## Adding a route

1. Create `src/pages/<slug>.astro`.
2. Add the route slice to [`src/data/site.ts`](../../../src/data/site.ts).
3. Add the route to the navigation if it belongs in the primary nav.
4. Update the sitemap allowlist in `astro.config.mjs` if the route
   should be indexed.
5. Ensure `scripts/postbuild-dist.mjs` emits a CSP entry for the new
   route — by default it does, but confirm by running `npm run build`
   and grepping the generated `_headers`.
6. Add an acceptance spec via `/route-spec <slug>` before implementation
   if the route is non-trivial.

## Removing a route

Removing a route is destructive — inbound links break and SEO suffers.
Only remove when:

- The content is obsolete *and* there's no equivalent elsewhere, OR
- The content moved to another route; add a permanent redirect in
  `public/_redirects` (301).

## Redirects

- Live in [`public/_redirects`](../../../public/_redirects).
- Format: `<from> <to> <status>`.
- Use `301` for permanent, `302` for temporary, `200` for rewrites.
- Don't use redirects to paper over a fixable bug.

## 404 page

- `src/pages/404.astro` is the canonical not-found page.
- Cloudflare Pages serves it for any unmatched route automatically.
- Keep it short, branded, and with a link to `/` — no decorative junk.

## Dynamic / catch-all routes

This site is static. No dynamic routes exist today. If one is needed:

- Use `getStaticPaths` and pre-render.
- Don't adopt SSR (`output: 'server'`) without a major architectural
  discussion — it changes deploy target, CSP story, and perf budget.
