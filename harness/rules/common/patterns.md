# patterns.md

Reusable patterns already in the repo. Match them first before
introducing a new one.

## Page skeleton

Every route under [`src/pages/`](../../src/pages/) follows:

```
<BaseLayout title="…" description="…">
  <Hero … />
  <Section id="…" eyebrow="…" heading="…">
    <!-- content -->
  </Section>
  <!-- more <Section> blocks -->
</BaseLayout>
```

- `BaseLayout` handles `<head>`, `<Navigation>`, `<Footer>`.
- `Section` is the canonical content band — vertical rhythm, max-width,
  and eyebrow/heading are handled once there.
- Hero is route-specific but always uses `components/Hero.astro` as the
  primitive.

## Hero

- Single `<h1>`. Never two.
- ≤ 2 actions (primary + secondary).
- One supporting metric strip ("Operating today: …") or none.
- No decorative overlays that draw the eye before the headline.

## Cards

- `components/LeadershipCard.astro` is the canonical card. Copy its
  structure for any new card kind.
- Cards are always rendered inside a CSS grid in the parent section,
  never with inline widths.

## Content loading

- All marketing copy is in [`src/data/site.ts`](../../src/data/site.ts).
- Components destructure typed slices of that data in their frontmatter.
- Never hardcode user-visible strings in an `.astro` template.

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
