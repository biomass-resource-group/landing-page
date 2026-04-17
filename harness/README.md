# BRG site harness

The harness is the operating system for changing
`biomass-resource-group/landing-page`. It packages a project-level
[`CLAUDE.md`](../CLAUDE.md), subagents and slash commands under
[`.claude/`](../.claude/), skills, lifecycle hooks, scoped rules,
playbooks, and operational contexts.

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
                          parallel(ux-reviewer, accessibility-auditor,
                                   performance-reviewer, code-reviewer)
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

| Path                                              | Purpose                                    |
| ------------------------------------------------- | ------------------------------------------ |
| [`../CLAUDE.md`](../CLAUDE.md)                    | Operating guide. Read first.               |
| [`../AGENTS.md`](../AGENTS.md)                    | Delegation policy and agent map.           |
| [`../RULES.md`](../RULES.md)                      | Rulebook index with scope breakdown.       |
| [`../.claude/settings.json`](../.claude/settings.json) | Permissions, env, hooks.              |
| [`../.claude/agents/`](../.claude/agents/)        | Subagent definitions (18 total).           |
| [`../.claude/commands/`](../.claude/commands/)    | Slash commands (15 total).                 |
| [`../.claude/skills/`](../.claude/skills/)        | Project-level skills (6 total).            |
| [`../.claude-plugin/`](../.claude-plugin/)        | Plugin manifest.                           |
| [`./orchestration/`](./orchestration/)            | Hook scripts (6 total).                    |
| [`./rules/`](./rules/)                            | Scoped rules (common + astro + typescript).|
| [`./contexts/`](./contexts/)                      | Operational mode configs (dev/review/research).|
| [`./playbooks/`](./playbooks/)                    | End-to-end workflow guides (6 total).      |
| [`./checklists/ui-ux-scorecard.md`](./checklists/ui-ux-scorecard.md) | UX scoring rubric. |
| [`./tests/`](./tests/)                            | Hook smoke tests + guard verification.     |
| [`./_archive/`](./_archive/)                      | Superseded Claude+Codex orchestration.     |

## Subagents at a glance (18)

### BRG-specific

| Agent                    | Role                                          | Model  |
| ------------------------ | --------------------------------------------- | ------ |
| `feedback-translator`    | Raw stakeholder text → structured items       | sonnet |
| `site-planner`           | Items → spec with acceptance criteria         | opus   |
| `visual-designer`        | Layout/branding spec → CSS proposal           | opus   |
| `copy-editor`            | Brand-voice review of any user-visible string | sonnet |
| `astro-implementer`      | Spec → focused `.astro` / `.ts` / `.css` edits | sonnet |
| `ux-reviewer`            | Routes → scorecard with merge decision        | opus   |
| `accessibility-auditor`  | Routes → blocker/major/minor a11y findings    | sonnet |
| `dist-validator`         | Runs `check`/`build`/`validate:dist`          | sonnet |
| `git-shipper`            | Branch → commit → push → PR (no merge)        | sonnet |

### Generic (from ECC pattern)

| Agent                    | Role                                          | Model  |
| ------------------------ | --------------------------------------------- | ------ |
| `code-reviewer`          | Code-quality review of pending changes        | sonnet |
| `security-reviewer`      | CSP / headers / deps / secrets review         | sonnet |
| `typescript-reviewer`    | TS-specific type-safety review                | sonnet |
| `architect`              | Architectural trade-off recommendations       | opus   |
| `planner`                | Exploratory implementation planning           | opus   |
| `doc-updater`            | Detects + fixes doc drift                     | sonnet |
| `harness-auditor`        | Audits the harness for gaps / orphans         | sonnet |
| `build-error-resolver`   | Diagnoses + fixes failing builds              | sonnet |
| `performance-reviewer`   | LCP / CLS / bundle / image audit per route    | sonnet |

## Slash commands (15)

| Command                    | What it does                                     |
| -------------------------- | ------------------------------------------------ |
| `/improve "<request>"`     | Full pipeline: plan → implement → review → ship  |
| `/incorporate-feedback`    | Translate raw stakeholder text into items        |
| `/audit <routes>`          | Score routes against the UI/UX scorecard         |
| `/route-spec <route>`      | Generate a baseline acceptance spec for a route  |
| `/ship "<summary>"`        | Validate, commit, push, PR (no merge)            |
| `/plan "<request>"`        | Exploratory implementation plan                  |
| `/code-review [scope]`     | Code-quality review of diff/PR                   |
| `/security-review [scope]` | Security review (CSP/headers/deps/secrets)       |
| `/refactor <target>`       | Focused refactor with tight scope                |
| `/harness-audit [focus]`   | Audit the harness itself                         |
| `/quality-gate [scope]`    | Run every quality check in parallel              |
| `/update-docs [scope]`     | Sync operating docs with code                    |
| `/checkpoint "<label>"`    | Midway save (commit + push, no PR)               |
| `/perf-audit <routes>`     | Performance audit with Lighthouse                |
| `/deploy-check [url]`      | Post-deploy sanity probe                         |

## Skills (6)

| Skill                    | Triggers on                                    |
| ------------------------ | ---------------------------------------------- |
| `brand-voice`            | Editing user-visible copy                      |
| `astro-patterns`         | Adding pages or components                     |
| `content-editing`        | Changing `src/data/site.ts`                    |
| `csp-headers`            | Touching CSP / `_headers` / inline scripts     |
| `accessibility-patterns` | Adding or editing visible components            |
| `cloudflare-deploy`      | Editing deploy-adjacent config                  |

## Hooks (6)

| Hook                   | Event        | Behavior                                  |
| ---------------------- | ------------ | ----------------------------------------- |
| `session-context.mjs`  | SessionStart | Surfaces branch, status, routes, dist     |
| `pre-bash-guard.mjs`   | PreToolUse   | Blocks push-to-main, force-push, rm -rf   |
| `track-edit.mjs`       | PostToolUse  | Reminds validation pending on watched edits |
| `strategic-compact.mjs`| PostToolUse  | Suggests /compact every ~50 tool calls    |
| `stop-reminder.mjs`    | Stop         | Nudges /ship if uncommitted changes exist |
| `session-end.mjs`      | SessionEnd   | Emits session summary (branch, commits)   |

## Contexts (3)

| Context      | When to use                                    |
| ------------ | ---------------------------------------------- |
| `dev.md`     | Implementation mode — writing code             |
| `review.md`  | Review mode — evaluating quality               |
| `research.md`| Exploration mode — understanding, not shipping |

## Playbooks (6)

| Playbook                           | When to use                           |
| ---------------------------------- | ------------------------------------- |
| `incorporate-stakeholder-feedback` | Raw feedback arrives                  |
| `redesign-a-route`                 | Major route overhaul                  |
| `audit-and-fix`                    | Periodic site-wide quality sweep      |
| `handle-ci-failure`                | PR checks fail                        |
| `ship-hotfix`                      | Live-site regression                  |
| `onboard-new-contributor`          | New human or AI starts working        |

## Rules (15 files)

See [`RULES.md`](../RULES.md) for the full index. Rules are organized:

- `rules/common/` (10 files): git-workflow, coding-style, security,
  performance, testing, patterns, hooks, agents, code-review,
  development-workflow.
- `rules/astro/` (3 files): components, content-data, routing.
- `rules/typescript/` (2 files): type-safety, imports.

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

- New agent → `.claude/agents/` + update `AGENTS.md` table.
- New command → `.claude/commands/` + update this README's table.
- New skill → `.claude/skills/<name>/SKILL.md`.
- New rule → `harness/rules/<scope>/` + update `RULES.md` index.
- New hook → `harness/orchestration/` + wire in `settings.json` +
  update `harness/rules/common/hooks.md`.
- New playbook → `harness/playbooks/`.
- Run `/harness-audit` after any harness change to check for drift.
