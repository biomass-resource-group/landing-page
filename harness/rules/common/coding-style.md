# coding-style.md

Small repo, small style rulebook. Bias to consistency with what's already
there over introducing new patterns.

## General

- 2-space indent. No tabs.
- Unix line endings. UTF-8.
- Files end with a single trailing newline.
- No trailing whitespace.
- Prefer explicit over clever. This is marketing-site code, not research.

## Astro components

- `.astro` files use frontmatter (`---`) only for imports + prop
  destructuring + small data shaping. Keep logic in `src/data/site.ts`
  or `src/lib/` (if it exists).
- Class names: BEM-ish (`block`, `block__element`, `block--modifier`).
  Match existing patterns in `src/styles/global.css`.
- Scoped styles via `<style>` only when the rule truly can't be global.
  Default to `global.css` so the audit can see the full selector graph.

## TypeScript

- Named exports by default. Only use `export default` when the importing
  side reads cleaner that way (Astro components, adapters).
- Types > interfaces for data shapes. Interfaces for extensible contracts.
- Prefer `as const` to magic strings; prefer `readonly` arrays for fixed
  enumerations.
- No `any`. Use `unknown` + narrowing, or define the shape.

## CSS

- All colors, spacing, fonts come from CSS custom properties in
  `:root`. Don't hardcode hex / px values inside rules — reference
  variables.
- Use `clamp()` for fluid type / spacing.
- No `!important` unless there's a written reason next to it.

## Imports

- Order: std / framework → third-party → `@/` aliases → relative.
- Separate groups with one blank line.
- Don't use deep-relative imports (`../../../foo`) — promote to alias.

## Naming

- `kebab-case.astro`, `kebab-case.ts` for files.
- `PascalCase` for components and types.
- `camelCase` for functions and variables.
- `SCREAMING_SNAKE_CASE` only for true compile-time constants.

## Comments

- Default to no comments. Name things well instead.
- When a comment is needed, explain the **why**, not the what.
- Don't leave `TODO:` in shipping code. Create a GitHub issue.
