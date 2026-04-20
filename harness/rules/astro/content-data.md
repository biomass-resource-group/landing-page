# astro/content-data.md

[`src/data/site.ts`](../../../src/data/site.ts) is the primary source of
truth for user-visible copy and structured content on the site.

## Rule zero

**Prefer `site.ts` for marketing copy over `.astro` templates.** Short
utility pages (404, redirects) may inline minimal strings, but
route-level content (hero, sections, CTAs) belongs in `site.ts`.

## Shape

`site.ts` exports individual named constants — one per content domain:

```ts
export const siteMeta = { name: '…', title: '…', description: '…', … };
export const navLinks = [ { label: '…', href: '…' }, … ] as const;
export const hero = { label: '…', title: '…', summary: '…', … };
export const about = { hero: {…}, sections: […], … };
export const platform = { hero: {…}, sections: […], … };
export const leadership = { members: [{…}, …] };
export const contact = { hero: {…}, form: {…}, … };
// etc.
```

`as const` on array constants keeps types narrow — consumers get literal
string types, which catches typos.

## Editing rules

- Preserve structural keys. Adding a section? Add the same shape as its
  siblings in the relevant export.
- Don't rename an existing export or key in a drive-by. That breaks
  every consumer. Rename + update all references in one commit.
- Keep copy under the budgets enforced in
  [`scripts/validate-dist.mjs`](../../../scripts/validate-dist.mjs).
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
