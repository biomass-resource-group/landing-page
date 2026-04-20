---
name: design-system
description: BRG design system — tokens, typography scale, spacing scale, component patterns, color usage. Reference this when making any visual decision to ensure consistency across routes.
---

# BRG design system

## Color palette

| Token              | Value                          | Usage                        |
|--------------------|--------------------------------|------------------------------|
| `--bg`             | `#fbf8f1`                      | Page background              |
| `--bg-muted`       | `#f3eee3`                      | Tinted sections              |
| `--bg-soft`        | `#efe7d7`                      | Soft backgrounds             |
| `--surface`        | `rgba(255,255,255,0.72)`       | Cards, panels                |
| `--surface-strong` | `rgba(255,255,255,0.88)`       | Elevated cards               |
| `--surface-dark`   | `rgba(16,27,24,0.78)`          | Dark section overlays        |
| `--ink`            | `#0e1714`                      | Primary text                 |
| `--ink-soft`       | `#2f3f38`                      | Secondary text               |
| `--ink-muted`      | `#647067`                      | Tertiary text, captions      |
| `--forest`         | `#335944`                      | Primary accent               |
| `--forest-deep`    | `#14211c`                      | Dark sections, footer        |
| `--forest-soft`    | `#7f9a76`                      | Subtle accent                |
| `--gold`           | `#c89d45`                      | CTA, focus rings, highlights |
| `--gold-soft`      | `#e8c274`                      | Soft highlights              |
| `--cream`          | `#f7f1e3`                      | Text on dark backgrounds     |

### Color rules

- Dark sections use `--cream` text on `--forest-deep` background.
- CTAs use `--forest` background with white text, or `--gold` for
  secondary actions.
- Never introduce new colors. Use existing tokens.
- Contrast ratios: body text ≥ 7:1, large text ≥ 4.5:1.

## Typography

| Role      | Font                    | Weight | Size range       |
|-----------|-------------------------|--------|------------------|
| Body      | Manrope (`--font-body`) | 400-700| 1rem–1.125rem    |
| Display   | Cormorant Garamond (`--font-display`) | 500 | 2rem–3.5rem |

### Typography rules

- H1: Cormorant Garamond, 500, sentence case. One per page.
- H2: Manrope, 700. Section headings.
- H3: Manrope, 600. Subsection headings.
- Body: Manrope, 400. Line height 1.6–1.7.
- Eyebrows: Manrope, 600, uppercase, letter-spacing 0.06em,
  `--ink-muted` or `--gold`.
- Never use bold display font. Never use body font for H1.

## Spacing scale

| Token    | Value   | Usage                         |
|----------|---------|-------------------------------|
| Section  | 6rem    | Between major page sections   |
| Block    | 3rem    | Between content blocks        |
| Element  | 1.5rem  | Between related elements      |
| Tight    | 0.75rem | Within a component            |
| Micro    | 0.25rem | Icon gaps, fine adjustments   |

### Spacing rules

- Sections always use `padding: 6rem 0` (`.section` class).
- Content width capped at `--container` (1200px).
- Generous whitespace is a brand signal — never crowd elements.
- Mobile: sections compress to 3rem–4rem padding.

## Border radius

| Token          | Value    | Usage                    |
|----------------|----------|--------------------------|
| `--radius-lg`  | `2rem`   | Hero cards, major panels |
| `--radius-md`  | `1.25rem`| Standard cards           |
| `--radius-sm`  | `0.75rem`| Buttons, small elements  |

## Shadows

| Token            | Usage              |
|------------------|--------------------|
| `--shadow-soft`  | Subtle elevation   |
| `--shadow-panel` | Prominent panels   |

## Component patterns

### Buttons

- Primary: `--forest` background, white text, `--radius-sm`.
- Secondary: transparent, `--forest` text, 1px `--line-strong` border.
- Hover: darken by 10% or add subtle shadow.
- Never more than 2 CTAs per section.

### Cards

- Use `--surface` or `--surface-strong` background.
- `--radius-md` corners.
- `--shadow-soft` elevation.
- Consistent padding (1.5rem–2rem).

### Sections

- Alternating: plain → tinted → plain → dark.
- Each section has an eyebrow + heading + body pattern.
- Dark sections are used sparingly (1–2 per page max).

## What makes BRG look "excellent"

1. **Generous whitespace** — every element breathes.
2. **Intentional hierarchy** — eye follows eyebrow → heading → body → CTA.
3. **Restrained color** — forest and gold used as accents, not floods.
4. **Consistent rhythm** — same spacing between same-level elements.
5. **Typography contrast** — display vs body fonts create clear levels.
6. **Calm authority** — no animations competing with content, no
   decorative noise, no visual gimmicks.
