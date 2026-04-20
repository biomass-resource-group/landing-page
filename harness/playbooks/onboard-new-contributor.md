# Playbook: onboard a new contributor

Use when a new human or AI agent needs to work on this repo for the
first time.

## Prerequisites

- Node.js 20+.
- Git with access to `biomass-resource-group/landing-page`.
- Claude Code CLI (for AI contributors).

## Steps

1. **Clone and install:**
   ```bash
   git clone https://github.com/biomass-resource-group/landing-page.git
   cd landing-page
   npm ci
   ```

2. **Read the operating guide:**
   - [`CLAUDE.md`](../../CLAUDE.md) — hard rules, required commands,
     where to look.
   - [`AGENTS.md`](../../AGENTS.md) — delegation policy.
   - [`RULES.md`](../../RULES.md) — scoped rules index.
   - [`harness/README.md`](../README.md) — pipeline mental model.

3. **Verify the build:**
   ```bash
   npm run check && npm run build && npm run validate:dist
   ```
   All three must pass before making any changes.

4. **Explore the site:**
   ```bash
   npm run preview
   ```
   Open `http://localhost:4321` and navigate every route.

5. **Understand the content model:**
   - Read [`src/data/site.ts`](../../src/data/site.ts) — all marketing
     copy lives here.
   - Browse [`src/components/`](../../src/components/) — small set of
     shared primitives.
   - Browse [`src/styles/global.css`](../../src/styles/global.css) —
     single stylesheet.

6. **Start with a small change:**
   - Run `/audit all` to see current scores.
   - Pick the lowest-scoring route and fix one minor issue.
   - Run `/ship "<summary>"` to go through the full pipeline.

## For AI contributors

- The harness orchestrates through Claude Code subagents and slash
  commands. Start any session by reading the `session-context.mjs`
  output.
- Use `/improve "<request>"` for end-to-end changes.
- Use `/checkpoint "<label>"` to save progress mid-session.
- Use `/quality-gate` before merging.

## Key constraints (memorize these)

1. Never push to `main`. Always branch → PR → merge.
2. Content in `src/data/site.ts`, not in templates.
3. Cody Danet: no LinkedIn. Julie Brown: LinkedIn stays on `/about/`.
4. Hero: single H1, ≤ 2 actions, calm.
5. Don't weaken `validate-dist.mjs`.

## Getting help

- Ask the user (Julie or Richard).
- Read the relevant rule file under `harness/rules/`.
- Run `/harness-audit` to check harness health.
