# Biomass Resource Group Website

Astro-based marketing site for `biomassresourcegroup.com`, designed for static deployment on Cloudflare Pages.

## Runtime

- Node `22.12.0` or newer is required
- `.nvmrc` pins the expected local version

## Stack

- Astro 6
- Static output with sitemap generation
- Self-hosted `Manrope` and `Cormorant Garamond` via `@fontsource`
- Markdown-backed updates in `src/content/updates/`

## Commands

- `npm install` installs dependencies
- `npm run dev` starts the local Astro dev server
- `npm run build` creates the production build in `dist/`
- `npm run check` runs Astro's project checks
- `npm run validate:dist` verifies the built HTML, sitemap, headers, and social metadata
- `npm run preview` serves the production build locally

## Content editing

The landing page content is defined in [`src/data/site.ts`](./src/data/site.ts).

News and field updates are plain Markdown files in [`src/content/updates/`](./src/content/updates/). Each file needs frontmatter with:

```md
---
title: Example update title
summary: Short summary used on cards and social metadata.
publishedAt: 2026-03-01
category: Kenya
draft: false
---
```

Each update automatically appears:

- on the homepage updates section
- in the `/updates/` archive
- on its own detail page

## Deployment notes

- The canonical site URL is set to `https://biomassresourcegroup.com`
- Cloudflare Pages should deploy the generated `dist/` directory
- Configure the Pages build environment to use Node `22.12.0`
- Security headers live in `public/_headers`; if any Cloudflare dashboard rule or edge config overrides them, keep both sources in sync

## CI and dependency hygiene

- GitHub Actions run `npm ci`, `npm run check`, `npm run build`, and `npm run validate:dist` on pushes and pull requests
- Pull requests also run dependency review
- Dependabot is configured for npm packages and GitHub Actions
