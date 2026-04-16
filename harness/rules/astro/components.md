# astro/components.md

Conventions for Astro components in this repo.

## File layout

- Components live in [`src/components/`](../../../src/components/).
- Layouts in [`src/layouts/`](../../../src/layouts/). Only `BaseLayout`
  exists today — promote to multiple layouts only if a second layout
  genuinely differs.
- Pages in [`src/pages/`](../../../src/pages/). One file per route,
  kebab-case.

## Frontmatter (the `---` block)

Keep it small. Allowed:

- Imports.
- Prop destructuring + `interface Props` above.
- Small shaping of imported data (slicing an array, composing a
  computed string).

Not allowed:

- Mutable state.
- `Astro.glob` when `astro:content` collections fit.
- Inline marketing copy — pull from `src/data/site.ts`.

## Props

- Declare a typed `interface Props` at the top of the frontmatter.
- Default values go in the destructure: `const { variant = "default" } = Astro.props;`.
- Keep required props minimal. Components should be invocable with
  sensible defaults.

## Slots

- Use named slots for optional ornamental content (`<slot name="aside" />`).
- Default slot for the primary content.
- Never rely on slot ordering — name them.

## Styles

- Prefer `global.css` over `<style>` tags — the audit has full selector
  visibility.
- If a `<style>` tag is truly needed, scope it with `<style scoped>` and
  explain in a one-line comment why it can't live in global.

## Hydration

- Default: no hydration. Let Astro output static HTML.
- If a component is genuinely interactive, pick the cheapest client
  directive that still works:
  - `client:visible` (lazy, best default for below-fold interactive).
  - `client:idle` (non-blocking but top-of-page).
  - `client:load` (reserve for truly critical interactivity).
- Don't hydrate a static component just to add a transition. CSS does
  transitions fine.

## Common components (reference)

| Component           | Purpose                                  |
| ------------------- | ---------------------------------------- |
| `BaseLayout.astro`  | `<head>`, Navigation, Footer, metadata.  |
| `Navigation.astro`  | Primary nav; routes pulled from data.    |
| `Footer.astro`      | Contact / legal / social links.          |
| `Hero.astro`        | Route hero primitive.                    |
| `Section.astro`     | Content band with eyebrow + heading.     |
| `LeadershipCard.astro` | Canonical bio card.                   |

Copy one of these before writing a new component from scratch.
