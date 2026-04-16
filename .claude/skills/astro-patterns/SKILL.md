---
name: astro-patterns
description: Canonical Astro component patterns used in this repo — BaseLayout, Hero, Section, LeadershipCard. Triggers when adding a new page or component. Keep existing patterns over introducing new ones.
---

# Astro patterns

The repo has a small, stable set of components. Most new work is
composition over these primitives, not new components.

## Page skeleton

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import Hero from '@/components/Hero.astro';
import Section from '@/components/Section.astro';
import { site } from '@/data/site';
---

<BaseLayout title={site.<route>.meta.title} description={site.<route>.meta.description}>
  <Hero {...site.<route>.hero} />
  {site.<route>.sections.map((section) => (
    <Section id={section.id} eyebrow={section.eyebrow} heading={section.heading}>
      <Fragment set:html={section.body} />
    </Section>
  ))}
</BaseLayout>
```

## Hero

```astro
<Hero
  eyebrow="Operating today"
  headline="12 MW across three commissioned sites."
  subline="Biomass generators we've built, commissioned, and run ourselves."
  primaryAction={{ href: '/platform/', label: 'See the platform' }}
  secondaryAction={{ href: '/contact/', label: 'Talk to us' }}
/>
```

Constraints:
- One H1 per page (Hero renders the H1).
- ≤ 2 actions.
- One optional metric strip.
- No decorative overlays competing with the headline.

## Section

```astro
<Section
  id="operating-today"
  eyebrow="Operating today"
  heading="Three commissioned sites, 12 MW total."
>
  <p>Body copy here, pulled from site.ts.</p>
</Section>
```

Section handles vertical rhythm, max-width, and eyebrow/heading
hierarchy. Never re-implement.

## LeadershipCard

```astro
<LeadershipCard
  name="Julie Brown"
  role="CEO"
  bio="Short, operator-grounded bio."
  headshot="/images/leadership/julie-brown.jpg"
  linkedinUrl="https://www.linkedin.com/in/julie-brown"
/>
```

Constraints:
- Cody Danet's card must NOT pass `linkedinUrl`.
- Render inside a grid container; never inline dimensions.

## When to introduce a new component

Only when:
- Two existing routes would use it.
- It can be expressed as a pure Astro component with typed props.
- `validate-dist.mjs` can still assert the structural contract.

## When to extend `site.ts` vs. add a content collection

- Short marketing copy (hero, section body, CTA label) → `src/data/site.ts`.
- Longer, versioned content (bios, articles, case studies) → Astro
  content collection under `src/content/`.
