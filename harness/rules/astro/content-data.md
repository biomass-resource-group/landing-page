# astro/content-data.md

[`src/data/site.ts`](../../../src/data/site.ts) is the single source of
truth for all user-visible copy and structured content on the site.

## Rule zero

**Never hardcode marketing copy in an `.astro` template.** If a template
contains user-visible strings, they belong in `site.ts` instead.

## Shape

`site.ts` exports a `site` object and related constants. Top-level keys
match page routes (`site.home`, `site.about`, `site.platform`, …) plus
shared pieces (`site.nav`, `site.footer`, `site.leadership`).

Each route's slice follows the same pattern:

```ts
export const site = {
  home: {
    hero: { eyebrow: "…", headline: "…", subline: "…", actions: [...] },
    sections: [
      { id: "operating-today", eyebrow: "…", heading: "…", body: "…" },
      // …
    ],
  },
  // …
} as const;
```

`as const` keeps the types narrow — consumers get literal string types,
which catches typos and enables exhaustive `switch` on section IDs.

## Editing rules

- Preserve structural keys. Adding a section? Add the same shape as its
  siblings.
- Don't rename an existing key in a drive-by. That breaks every consumer.
  Rename + update all references in one commit, or not at all.
- Keep copy under the budgets enforced in
  [`scripts/validate-dist.mjs`](../../../scripts/validate-dist.mjs):
  - H1 ≤ 12 words.
  - Hero subline ≤ 30 words.
  - Section body ≤ 60 words (unless the route page explicitly whitelists longer).
- No emojis unless the brand voice rule explicitly permits.
- Follow sentence case for headings; never title-case the H1.

## Typing

- Prefer `readonly` arrays (`as const` handles this).
- If a field is optional, mark it `?:` and handle the undefined case in
  the consumer. Don't default to empty strings — that hides bugs.
- Add a union type alias (e.g. `type RouteId = keyof typeof site`) when
  multiple consumers would benefit.

## Large content

- If copy exceeds ~40 lines, consider extracting to
  [`src/content/`](../../../src/content/) as an Astro content collection.
- Content collections give you validation + type generation via
  `astro:content`. Use them for bios, case studies, articles.
- Keep short marketing copy in `site.ts` — the routing through a
  collection isn't worth it for a headline.
