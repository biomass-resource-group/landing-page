# Codex interop protocol

This document defines how GitHub Codex (or any external AI executor)
can drive work in this repo alongside or independently of Claude Code.

## Architecture

```
Claude Code (planner/orchestrator)
    │
    ├── dispatches subagents via Agent tool
    ├── reads/writes code directly
    └── monitors PRs via MCP GitHub tools
        │
Codex (external executor)
    │
    ├── receives work via PR review comments or issue assignments
    ├── reads repo via GitHub file API
    ├── pushes changes via commits
    └── communicates via PR comments
```

## How Codex receives work

1. **Via PR review comments.** Claude or a human posts a review comment
   with `@codex address that feedback`. Codex reads the comment,
   implements the fix, and pushes a commit.

2. **Via issue assignment.** An issue labeled `codex` is assigned to
   the Codex bot. Codex reads the issue body, creates a branch,
   implements the change, and opens a PR.

3. **Via direct invocation.** A user comments `@codex review` on a PR.
   Codex reviews the diff and posts suggestions.

## What Codex should know about this repo

Codex should read these files on first contact:

1. `CLAUDE.md` — operating guide, hard rules, required commands.
2. `src/data/site.ts` — all marketing copy lives here.
3. `src/components/` — small set of shared primitives.
4. `src/styles/global.css` — single stylesheet.
5. `scripts/validate-dist.mjs` — structural validation (do not edit).

## Hard rules (apply to Codex too)

1. Direct pushes to main are allowed after validation; PR branches are also
   allowed. Never force-push or delete main.
2. Don't weaken validate-dist.mjs.
3. Content in site.ts, not templates.
4. Cody Danet: no LinkedIn.
5. Julie Brown: LinkedIn stays on /about/.
6. Hero: single H1, ≤2 actions, calm.

## Validation contract

Before any commit, Codex must run:

```bash
npm run check && npm run build && npm run validate:dist
```

If any step fails, fix it before committing.

## Communication protocol

### Codex → Claude (via PR comments)

When Codex finishes work, it posts a summary comment:

```
## Codex implementation summary

- Changed files: `src/data/site.ts`, `src/styles/global.css`
- Validation: check ✓ | build ✓ | validate:dist ✓
- Ready for review.
```

### Claude → Codex (via review comments)

When Claude needs Codex to do work, it posts:

```
@codex Please implement the following:

1. [specific change with file path]
2. [specific change with file path]

Run `npm run check && npm run build && npm run validate:dist` before
committing.
```

## Parallel execution model

For overnight runs, Claude and Codex can work in parallel:

- Claude handles planning, review, and orchestration.
- Codex handles implementation on separate branches.
- Each creates its own PR.
- Claude reviews Codex's PRs using the quality gate.

This doubles throughput for independent work items.

## Limitations

- Codex cannot run subagents or use the Agent tool.
- Codex cannot subscribe to PR activity.
- Codex may not have access to the full harness (hooks, skills).
- Codex should stick to implementation — planning and review are
  Claude's domain.
