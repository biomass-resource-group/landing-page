# hooks.md

How the harness lifecycle hooks behave. Wired via
[`.claude/settings.json`](../../.claude/settings.json) using
`$CLAUDE_PROJECT_DIR` so they work from any working directory.

## `session-context.mjs` — SessionStart

Fires once when a Claude Code session starts. Outputs a short context
block with:

- Current branch.
- Working-tree status (clean / dirty).
- Last 5 commits.
- Routes discovered in `src/pages/`.
- Whether `dist/` exists (so `validate:dist` is runnable immediately).
- Pipeline entrypoints (`/improve`, `/audit`).

No side effects. Read-only. Safe to silence if it gets chatty — the
harness still works without it.

## `track-edit.mjs` — PostToolUse on Edit / Write / MultiEdit

Fires after every `Edit`, `Write`, or `MultiEdit` on a watched path:

- `src/**`, `public/**`, `scripts/**`, `astro.config.*`, `package*.json`.

Output reminds Claude that validation is pending. It does **not** run
validation itself — that's the implementer's job before declaring done.

## `stop-reminder.mjs` — Stop

Fires when Claude is about to stop responding. If `src/`, `public/`,
or `scripts/` have uncommitted changes, it suggests `/ship`.

Does not block the stop — just nudges.

## `strategic-compact.mjs` — PostToolUse (optional)

Tracks tool-call count for the session. After ~50 tool calls, suggests
running `/compact` to preserve context capacity. Silent otherwise.

## `pre-bash-guard.mjs` — PreToolUse on Bash (optional)

Blocks known-dangerous commands before they run:

- `git push … main` (enforces the no-push-to-main rule mechanically).
- `rm -rf …` of anything under `src/`, `public/`, `scripts/`.
- `git reset --hard` (prevents accidental blown work).

Exits non-zero with a reason, which Claude sees and acts on.

## Authoring new hooks

- Hooks are Node 20+ ESM scripts under `harness/orchestration/`.
- Use `process.env.CLAUDE_PROJECT_DIR` to locate the repo root — never
  `process.cwd()`. The session's cwd may not be the repo root.
- Silent success (exit 0 with no stdout) is the default. Only emit output
  when action is warranted.
- For `execSync(git …)` calls, always pass `cwd: repoRoot`.
- Test the hook manually:
  ```bash
  CLAUDE_PROJECT_DIR=$PWD node ./harness/orchestration/<hook>.mjs
  ```
- Wire it into [`.claude/settings.json`](../../.claude/settings.json)
  using `$CLAUDE_PROJECT_DIR/...` path prefix.

## Disabling a hook temporarily

Remove its entry from `.claude/settings.json`. Don't delete the script —
other sessions may still reference it.
