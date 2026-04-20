# patterns.md

Reusable patterns already in the repo. Match them first before
introducing a new one.

## Page skeleton

Every route under [`src/pages/`](../../src/pages/) follows:

```
<BaseLayout title="…" description="…">
  <PageHero label="…" title="…" summary="…" />
  <SectionIntro eyebrow="…" heading="…">
    <!-- content -->
  </SectionIntro>
  <!-- more <SectionIntro> blocks -->
</BaseLayout>
```

- `BaseLayout` handles `<head>`, `<Header>`, `<Footer>`.
- `SectionIntro` is the canonical content band — vertical rhythm,
  max-width, and eyebrow/heading are handled once there.
- `PageHero` is route-specific but always uses
  `components/PageHero.astro` as the primitive.

## Hero

- Single `<h1>`. Never two.
- ≤ 2 actions (primary + secondary).
- One supporting metric strip or none.
- No decorative overlays that draw the eye before the headline.

## Cards

- Leadership bios are rendered inline on the `/about/` page. Copy the
  existing bio pattern for any new card kind.
- Cards are always rendered inside a CSS grid in the parent section,
  never with inline widths.

## Content loading

- Marketing copy is in [`src/data/site.ts`](../../src/data/site.ts),
  exported as individual constants (`hero`, `about`, `platform`, etc.).
- Components import the relevant constant in their frontmatter.
- Prefer `site.ts` for user-visible strings. Some utility/redirect
  pages may hardcode short strings — keep those minimal.

## Icons

- Inline SVG only. No icon fonts. No `<img>` icons.
- Keep SVGs ≤ 2 kB. Strip `<?xml …?>` and comments.

## Links

- External links: `target="_blank" rel="noopener noreferrer"`.
- Internal links: root-relative paths (`/about/`, not `./about`).
- Trailing slash on internal routes matches Astro's default and the
  `_headers` + sitemap expectations.

## When to introduce a new pattern

- Two existing routes need it.
- It can be expressed as a pure Astro component with typed props.
- `validate-dist.mjs` can still assert the contract.

When in doubt, inline the code twice before abstracting.
