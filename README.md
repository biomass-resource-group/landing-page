# Biomass Resource Group Website

Astro-based marketing site for `biomassresourcegroup.com`, designed for static deployment on Cloudflare Pages.

## Runtime

- Node `22.12.0` or newer is required
- `.nvmrc` pins the expected local version
- `packageManager` pins npm `10.9.0` so the lockfile stays compatible with CI

## Stack

- Astro 6
- Static output with sitemap generation
- Self-hosted variable `Manrope` and `Cormorant Garamond` via `@fontsource`

## Commands

- `npm install` installs dependencies
- `npm ci` performs a clean install against the committed lockfile
- `npm run dev` starts the local Astro dev server
- `npm run build` creates the production build in `dist/` and appends route-specific CSP headers
- `npm run check` runs Astro sync and TypeScript checks
- `npm run validate:dist` verifies the built HTML, CSP headers, sitemap, social metadata, and critical navigation/accessibility hooks
- `npm run validate:live-deploy` compares production headers and critical metadata against the repo's expected state
- `npm run preview` serves the production build locally

## AI harness (Claude Code, multi-agent)

The repository includes a multi-agent harness so future website
improvements happen via a consistent pipeline rather than ad-hoc edits.

- Read [`CLAUDE.md`](./CLAUDE.md) first — it is the operating guide.
- Subagents and slash commands live in [`.claude/`](./.claude/).
- Playbooks and the UI/UX scorecard live in [`harness/`](./harness/).
- Standard pipeline:
  ```
  /incorporate-feedback "<paste from stakeholder>"
  /improve "<short summary>"
  ```
  This runs translate → plan → (visual design) → implement → review →
  validate → ship as a single multi-agent flow.
- For a standalone audit: `/audit all`.
- For a single-route spec: `/route-spec /<route>/`.

## Content editing

- Shared page content lives in [`src/data/site.ts`](./src/data/site.ts).
- Route templates live in [`src/pages`](./src/pages).
- Legacy routes are kept aligned through [`public/_redirects`](./public/_redirects).

## Deployment notes

- The canonical site URL is set to `https://biomassresourcegroup.com`
- Cloudflare Pages should deploy the generated `dist/` directory
- Configure the Pages build environment to use Node `22.12.0`
- Baseline security headers live in `public/_headers`
- `npm run build` adds route-specific `Content-Security-Policy` entries to `dist/_headers` so the JSON-LD hashes match the generated HTML
- If any Cloudflare dashboard rule or edge config overrides headers, keep it aligned with the generated `dist/_headers`

## CI and dependency hygiene

- GitHub Actions run `npm ci`, `npm run check`, `npm run build`, and `npm run validate:dist` on pushes and pull requests
- Pull requests run dependency review when GitHub Dependency Graph is enabled for the repository
- A scheduled/manual workflow validates the live deployment against the generated header expectations and production metadata
- Dependabot is configured for npm packages and GitHub Actions
