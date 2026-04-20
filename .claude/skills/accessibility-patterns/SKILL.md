---
name: accessibility-patterns
description: Accessibility patterns enforced on this site — semantic landmarks, heading order, focus visibility, alt text, color contrast. Triggers when adding or editing any visible component.
---

# Accessibility patterns

The `accessibility-auditor` agent enforces most of these. This skill is
what you apply at edit time so the audit passes on first try.

## Landmarks

Every route must have:

- One `<header>` (contains `<Navigation />`).
- One `<main>` (the primary content).
- One `<footer>` (contains `<Footer />`).

`BaseLayout` handles this. Don't introduce duplicate landmarks.

## Heading order

- Every route has exactly one `<h1>`. Hero renders it.
- Subsections use `<h2>`. Never skip a level.
- `Section` component renders `<h2>` by default. If a card inside needs
  a heading, use `<h3>`.

Verification: `validate-dist.mjs` fails the build if heading order is
wrong.

## Images

- Every `<img>` has `alt` text. Decorative images get `alt=""` (empty
  string, not missing).
- Every `<img>` has `width` + `height`. Prevents CLS.
- Prefer Astro's `<Image />` from `astro:assets` — it handles sizing
  and format negotiation.

## Links + buttons

- Links go to real URLs. No `href="#"` or `href="javascript:void(0)"`.
- External links: `target="_blank" rel="noopener noreferrer"`.
- Never use a button when a link would do (semantics matter for
  screen readers).
- Icon-only buttons: provide `aria-label` (not just tooltip).

## Focus

- Focus is always visible. Don't remove the default outline without
  providing a replacement that's just as visible.
- Tab order follows reading order. Don't use `tabindex` > 0.
- Skip-to-content link at the top of `BaseLayout`. Don't remove it.

## Color contrast

- Body text / backgrounds: 4.5:1 minimum (WCAG AA).
- Large text (≥ 24px): 3:1 minimum.
- Interactive elements at all states (default, hover, focus, active).
- Use the CSS custom properties in `:root` — they were chosen to meet
  the bar. Don't introduce one-off colors.

## Forms

The contact form at `/contact/` is the only form on the site.

- Every field has a `<label>` with `for` matching the input's `id`.
- Required fields: `required` attribute + visual indicator beyond
  color.
- Error states: `aria-invalid` + a text description nearby.

## Motion

- Respect `prefers-reduced-motion`. Any animation wraps in:
  ```css
  @media (prefers-reduced-motion: no-preference) {
    /* animation here */
  }
  ```
- No auto-playing video. No parallax.

## Delegation

After any visible change, dispatch `accessibility-auditor`. Don't
merge without its sign-off.
