---
name: astro-patterns
description: Canonical Astro component patterns used in this repo — BaseLayout, PageHero, SectionIntro, PageCta. Triggers when adding a new page or component. Keep existing patterns over introducing new ones.
---

# Astro patterns

The repo has a small, stable set of components. Most new work is
composition over these primitives, not new components.

## Page skeleton

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import PageHero from '../components/PageHero.astro';
import SectionIntro from '../components/SectionIntro.astro';
import { hero, about } from '../data/site';
---

<BaseLayout title={about.hero.title} description={about.hero.summary}>
  <PageHero label={hero.label} title={hero.title} summary={hero.summary} />
  <SectionIntro eyebrow="…" heading="…">
    <p>Body copy here, pulled from site.ts.</p>
  </SectionIntro>
</BaseLayout>
```

## PageHero

```astro
<PageHero
  label="Biochar Carbon Removal Infrastructure"
  title="We build and operate carbon removal infrastructure."
  summary="Short, operator-grounded summary."
/>
```

Constraints:
- One H1 per page (PageHero renders the H1).
- ≤ 2 actions.
- One optional metric strip.
- No decorative overlays competing with the headline.

## SectionIntro

```astro
<SectionIntro eyebrow="Operating today" heading="Three commissioned sites.">
  <p>Body copy here, pulled from site.ts.</p>
</SectionIntro>
```

SectionIntro handles vertical rhythm, max-width, and eyebrow/heading
hierarchy. Never re-implement.

## Content loading

- Marketing copy is in [`src/data/site.ts`](../../../src/data/site.ts),
  exported as individual named constants (`hero`, `about`, `platform`,
  `leadership`, `contact`, etc.).
- Components import the relevant constant in their frontmatter.
- Prefer `site.ts` for user-visible strings over hardcoding in
  templates.

## When to introduce a new component

Only when:
- Two existing routes would use it.
- It can be expressed as a pure Astro component with typed props.
- `validate-dist.mjs` can still assert the structural contract.

## When to extend `site.ts` vs. add a content collection

- Short marketing copy (hero, section body, CTA label) → `src/data/site.ts`.
- Longer, versioned content (bios, articles, case studies) → Astro
  content collection under `src/content/`.
