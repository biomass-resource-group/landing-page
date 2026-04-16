# BRG site harness

The harness is the operating system for changing
`biomass-resource-group/landing-page`. It packages a project-level
[`CLAUDE.md`](../CLAUDE.md), a set of subagents and slash commands
under [`.claude/`](../.claude/), reusable scoring and brand artifacts
under [`harness/checklists/`](./checklists), and standard playbooks
under [`harness/playbooks/`](./playbooks).

## Mental model

```
stakeholder feedback
        │
        ▼
/incorporate-feedback   → feedback-translator
        │
        ▼
       /improve         → site-planner
                          (optional) visual-designer
                          astro-implementer
                          ux-reviewer + accessibility-auditor (parallel)
                          dist-validator
                          git-shipper
                                │
                                ▼
                              PR opened on `main`
                                │
                          CI + Cloudflare Pages preview
                                │
                          PR-event subscription auto-handles
                          Copilot review comments and CI failures
```

## What lives where

| Path                                            | Purpose                                        |
| ----------------------------------------------- | ---------------------------------------------- |
| [`../CLAUDE.md`](../CLAUDE.md)                  | Operating guide. Read first.                   |
| [`../.claude/settings.json`](../.claude/settings.json) | Permissions, env, hooks.                |
| [`../.claude/agents/`](../.claude/agents/)      | Subagent definitions.                          |
| [`../.claude/commands/`](../.claude/commands/)  | Slash commands.                                |
| [`./orchestration/`](./orchestration/)          | Hook scripts (SessionStart / PostToolUse / Stop). |
| [`./playbooks/`](./playbooks/)                  | End-to-end workflows for common requests.      |
| [`./checklists/ui-ux-scorecard.md`](./checklists/ui-ux-scorecard.md) | The scoring rubric `ux-reviewer` applies. |
| [`./claude/system-prompt.md`](./claude/system-prompt.md) | Legacy strategic-orchestrator prompt (kept for non-Claude-Code harnesses). |
| [`./codex/system-prompt.md`](./codex/system-prompt.md) | Legacy implementation prompt (kept for non-Claude-Code harnesses). |

## Subagents at a glance

| Agent                    | Role                                          | Model |
| ------------------------ | --------------------------------------------- | ----- |
| `feedback-translator`    | Raw stakeholder text → structured items       | sonnet |
| `site-planner`           | Items → spec with acceptance criteria         | opus  |
| `visual-designer`        | Layout/branding spec → CSS proposal           | opus  |
| `copy-editor`            | Brand-voice review of any user-visible string | sonnet |
| `astro-implementer`      | Spec → focused `.astro` / `.ts` / `.css` edits | sonnet |
| `ux-reviewer`            | Routes → scorecard with merge decision        | opus  |
| `accessibility-auditor`  | Routes → blocker/major/minor a11y findings    | sonnet |
| `dist-validator`         | Runs `check`/`build`/`validate:dist`          | sonnet |
| `git-shipper`            | Branch → commit → push → PR (no merge)        | sonnet |

## Slash commands

| Command                    | What it does                                     |
| -------------------------- | ------------------------------------------------ |
| `/improve "<request>"`     | Full pipeline: plan → implement → review → ship  |
| `/incorporate-feedback`    | Translate raw stakeholder text into items        |
| `/audit <routes>`          | Score routes against the UI/UX scorecard         |
| `/route-spec <route>`      | Generate a baseline acceptance spec for a route  |
| `/ship "<summary>"`        | Validate, commit, push, PR (no merge)            |

## Hooks

`harness/orchestration/` contains three Node scripts wired in from
`.claude/settings.json`:

- `session-context.mjs` — SessionStart. Surfaces branch, git status,
  recent commits, and routes in scope.
- `track-edit.mjs` — PostToolUse on Edit/Write. Reminds Claude that
  validation is pending whenever a watched path changes.
- `stop-reminder.mjs` — Stop. If `src/`, `public/`, or `scripts/` have
  uncommitted changes, suggests `/ship`.

## Quality bar (hard floor)

A change cannot ship unless:

- `npm run check` passes
- `npm run build` passes
- `npm run validate:dist` passes
- `ux-reviewer` per-category averages ≥ 4.0
- `accessibility-auditor` returns no blockers

These are enforced by the `/improve` and `/ship` pipelines. Don't
loosen them; raise the change to the user instead.

## Extending the harness

- New agent → drop a markdown file in `.claude/agents/` with frontmatter
  (`name`, `description`, `tools`, `model`). Reference it from the
  appropriate slash command.
- New slash command → drop a markdown file in `.claude/commands/` with
  frontmatter (`description`, `argument-hint`, `allowed-tools`).
- New hard rule → add it to `CLAUDE.md` and (if mechanically checkable)
  to `scripts/validate-dist.mjs`.
- New playbook → drop a markdown file in `harness/playbooks/` and
  cross-link from the relevant slash command.
