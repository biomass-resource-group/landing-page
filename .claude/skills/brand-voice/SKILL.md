---
name: brand-voice
description: BRG brand voice and copy constraints. Triggers when editing user-visible copy in `src/data/site.ts` or any `.astro` template. Enforces operator-led tone, short quantitative sentences, sentence case headings, and the avoid-superlatives rule.
---

# BRG brand voice

BRG is **operator-led, not promotional.** Every sentence should sound
like it was written by someone who has actually built and operated
biomass facilities.

## Core rules

- Short, specific, quantitative.
- Sentence case for headings. Never title case the H1.
- Hero copy ≤ 16 words.
- One H1 per page. No exceptions.

## Vocabulary

### Prefer

- operating
- verified
- in-market
- commissioned
- commercial
- deployed
- installed capacity
- offtake
- throughput
- feedstock
- counterparty

### Avoid

- world-class
- revolutionary
- cutting-edge
- next-generation
- innovative (unless citing a specific innovation)
- leading (vague)
- best-in-class
- disrupting / disruption
- seamless
- synergy

## Tone checks

- Read the sentence out loud. If it sounds like an investor pitch deck,
  rewrite.
- Replace adjectives with numbers where possible. "Large facility" →
  "20 MW facility". "Experienced team" → "combined 80 years in biomass
  operations".
- If you cite a fact, cite the unit. "X tonnes/yr", "Y MW", not "big".

## Hard rules (enforced in `validate-dist.mjs`)

- Cody Danet: no LinkedIn link anywhere on the site.
- Julie Brown: LinkedIn must remain on `/about/`.
- No title-cased H1 on any page.

## Examples

**Bad:**
> World-class biomass solutions for the next generation of renewable
> energy.

**Good:**
> 12 MW of operating biomass capacity across three commissioned sites.

**Bad:**
> We're revolutionizing the biomass industry with cutting-edge
> technology.

**Good:**
> Biomass generators we've built, commissioned, and run ourselves.

## Delegation

For any copy change, delegate to `copy-editor` — it applies this skill
plus a word-budget check per field.
