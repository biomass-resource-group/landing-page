---
name: content-editing
description: How to safely edit `src/data/site.ts` — the canonical source of all user-visible copy. Triggers whenever marketing copy changes, section content is rewritten, or a hero/section is added.
---

# Content editing

[`src/data/site.ts`](../../../src/data/site.ts) is the single source of
truth for all user-visible copy. Edits must preserve its shape — every
route's slice follows the same skeleton and downstream components
rely on it.

## Before you edit

- Confirm what route's slice you're editing (`site.home`, `site.about`,
  `site.platform`, …).
- Read the existing section shapes adjacent to your target. New
  sections should mirror their siblings.
- Check if the change needs a visual-treatment pass — if so, delegate
  to `visual-designer` before touching `site.ts`.

## While editing

- Apply [`brand-voice`](../brand-voice/SKILL.md) to any copy change.
  Read out loud. Cut superlatives. Quantify.
- Keep `as const` on the exported `site` object. Don't delete or move
  it.
- Match existing field casing:
  - `eyebrow`, `headline`, `subline` (camelCase)
  - `primaryAction`, `secondaryAction` (camelCase)
  - Section IDs: `kebab-case`
- Section body copy: HTML-as-string is fine but prefer plain prose.
  If you need structured content (lists, nested sections), promote
  the section to a content collection instead.

## Budgets (enforced by `validate-dist.mjs`)

- H1 ≤ 12 words.
- Hero subline ≤ 30 words.
- Section body ≤ 60 words (unless the route explicitly whitelists
  longer in `validate-dist.mjs`).

## After editing

1. `npm run check` — catches type narrowing problems.
2. `npm run build` — renders the change.
3. `npm run validate:dist` — enforces word budgets and hard rules.
4. Open the Cloudflare Pages preview URL from the PR; read the
   affected route(s) end-to-end.
5. Delegate to `copy-editor` for a tone review before merge.

## Patterns to avoid

- Hardcoding copy in `.astro` templates. Move to `site.ts`.
- Inventing a new field shape inconsistent with siblings.
- Leaving `TODO:` or `TBD:` in copy.
- Using HTML to simulate hierarchy that the Section component provides
  structurally.
