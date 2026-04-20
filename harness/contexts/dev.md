# dev context

You are in **implementation mode**. The priority is getting working code
into the repo, validated, and shipped.

## Behavior

- Start by reading the spec (from `site-planner` or `planner`).
- Delegate to `astro-implementer` for file changes.
- Run `npm run check && npm run build && npm run validate:dist` after
  every material edit.
- Don't debate architectural alternatives — that was `architect`'s job
  before this mode started.
- Keep diffs small and focused. One concern per commit.
- When done, run `/quality-gate` or `/ship`.

## Default agent chain

1. `astro-implementer` (edits)
2. `dist-validator` (gate)
3. `code-reviewer` (quality)
4. `git-shipper` (ship)

## What not to do in dev mode

- Don't refactor unrelated code.
- Don't add features the spec didn't ask for.
- Don't debate the spec — flag concerns and continue.
