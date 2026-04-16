# CLAUDE.md — landing-page operating guide

This is the operating guide for Claude Code (and any Claude Agent SDK harness)
working in `biomass-resource-group/landing-page`. Read this first.

## What this repo is

Static Astro 6 marketing site for `biomassresourcegroup.com`, deployed on
Cloudflare Pages. All page content is centralized in [`src/data/site.ts`](./src/data/site.ts);
routes in [`src/pages/`](./src/pages/) compose that data through shared
components in [`src/components/`](./src/components/). Styles live in a single
[`src/styles/global.css`](./src/styles/global.css).

## How work happens here

Improvements arrive as natural-language feedback (often from Julie, the CEO).
Claude Code expands each request into a spec, runs it through a chain of
specialized subagents, ships the change behind a PR, and watches CI.

The orchestration model lives under [`.claude/`](./.claude/) and
[`harness/`](./harness/). The standard pipeline is:

1. **`/improve "<request>"`** — kicks off the full pipeline.
2. **site-planner** subagent expands the request into a spec.
3. **astro-implementer** subagent makes minimal, targeted edits.
4. **ux-reviewer** + **accessibility-auditor** subagents apply the
   [UI/UX scorecard](./harness/checklists/ui-ux-scorecard.md).
5. **dist-validator** subagent runs `npm run check && npm run build && npm run validate:dist`.
6. **git-shipper** subagent commits, pushes, and opens a PR.

Slash commands wrap common entrypoints; see [`.claude/commands/`](./.claude/commands/).

## Hard rules

- **Never push directly to `main`.** Always work on a feature branch and merge via PR.
- **Do not weaken `scripts/validate-dist.mjs` to make a change pass** —
  if validation needs to evolve, that's its own discussion in the PR description.
- **Page content lives in `src/data/site.ts`.** Don't hardcode marketing copy
  into `.astro` templates.
- **Cody Danet has no LinkedIn link on the site.** This is enforced by `validate-dist`.
- **Julie Brown's LinkedIn must remain on `/about/`.** Also enforced.
- **Keep the homepage hero calm.** Julie's design feedback (April 2026) was that
  the eye should reach the headline before any decorative element. New hero work
  should preserve a single H1, ≤2 actions, and one supporting metric strip.

## Required commands before declaring a task done

```bash
npm run check          # astro sync + tsc --noEmit
npm run build          # astro build + CSP postbuild
npm run validate:dist  # structural + SEO + a11y assertions
```

If a change touches production behavior, also run:

```bash
npm run validate:live-deploy
```

## Where to look

| You want to…                                    | Look at                                                     |
| ----------------------------------------------- | ----------------------------------------------------------- |
| Edit copy on any page                           | [`src/data/site.ts`](./src/data/site.ts)                    |
| Restructure a route                             | [`src/pages/`](./src/pages/)                                |
| Adjust shared layout / hero / CTA / footer      | [`src/components/`](./src/components/)                      |
| Adjust visual treatment                         | [`src/styles/global.css`](./src/styles/global.css)          |
| Update what `validate:dist` enforces            | [`scripts/validate-dist.mjs`](./scripts/validate-dist.mjs)  |
| Update CSP / headers                            | [`scripts/postbuild-dist.mjs`](./scripts/postbuild-dist.mjs), [`public/_headers`](./public/_headers) |
| Add a new agent or slash command                | [`.claude/agents/`](./.claude/agents/), [`.claude/commands/`](./.claude/commands/) |
| Run a multi-agent improvement                   | `/improve "<request>"`                                      |
| Score a route's UI/UX                           | [`harness/checklists/ui-ux-scorecard.md`](./harness/checklists/ui-ux-scorecard.md) |

## Brand voice (one paragraph)

BRG is operator-led, not promotional. Sentences are short, specific, and
quantitative where possible. Hero copy stays under ~16 words. Avoid superlatives
("world-class", "revolutionary"). Prefer "operating", "verified", "in-market"
over "innovative", "cutting-edge", "next-generation". Use sentence case for
headings; never title case the H1.

## Working with feedback from stakeholders

Stakeholder feedback (WhatsApp screenshots, email) typically comes as a list of
small qualitative judgments. Use `/incorporate-feedback` to convert that into
a numbered acceptance list before any implementation begins.
