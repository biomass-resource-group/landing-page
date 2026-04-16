---
name: content-editing
description: How to safely edit `src/data/site.ts` — the primary source of user-visible copy. Triggers whenever marketing copy changes, section content is rewritten, or a hero/section is added.
---

# Content editing

[`src/data/site.ts`](../../../src/data/site.ts) is the primary source of
truth for user-visible copy. It exports individual named constants —
one per content domain. Edits must preserve the shape of each export.

## Before you edit

- Identify which export you're editing (`hero`, `about`, `platform`,
  `leadership`, `contact`, `siteMeta`, `navLinks`, etc.).
- Read adjacent exports to match naming and shape conventions.
- Check if the change needs a visual-treatment pass — if so, delegate
  to `visual-designer` before touching `site.ts`.

## While editing

- Apply [`brand-voice`](../brand-voice/SKILL.md) to any copy change.
  Read out loud. Cut superlatives. Quantify.
- Don't rename an export. That breaks every importer.
- Match existing field casing (camelCase for fields, kebab-case for
  section IDs).
- Section body copy: HTML-as-string is fine but prefer plain prose.
  If you need structured content (lists, nested sections), promote
  the section to a content collection instead.
- Use `as const` on array constants (`navLinks`, `metrics`, etc.) to
  keep types narrow.

## After editing

1. `npm run check` — catches type narrowing problems.
2. `npm run build` — renders the change.
3. `npm run validate:dist` — enforces structural and hard rules.
4. Open the Cloudflare Pages preview URL from the PR; read the
   affected route(s) end-to-end.
5. Delegate to `copy-editor` for a tone review before merge.

## Patterns to avoid

- Hardcoding route-level copy in `.astro` templates. Move to `site.ts`.
- Inventing a new export shape inconsistent with siblings.
- Leaving `TODO:` or `TBD:` in copy.
- Using HTML to simulate hierarchy that the SectionIntro component
  provides structurally.
