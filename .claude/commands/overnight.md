---
description: Run a batch of improvements autonomously until all routes score ≥4.5 on the UX scorecard. Designed for unattended overnight operation with circuit breakers, state persistence, and a morning summary.
argument-hint: "<goal or item list>"
allowed-tools: Agent, Read, Edit, Write, Bash, Glob, Grep
---

You are running the BRG site's overnight autonomous pipeline. Treat
$ARGUMENTS as the high-level goal or a numbered list of improvement
items. Your job is to iterate until every route scores ≥ 4.5 on the
UX scorecard with zero accessibility blockers.

## Initialization

0. Set `BRG_OVERNIGHT=1` in your environment so hooks adjust for
   unattended operation (more aggressive compaction, state persistence).
1. Read `src/data/site.ts` and the current route set to understand the
   site's state.
2. Run `/audit all` to get a baseline scorecard.
3. If the user provided a numbered item list, use it as-is. If they
   provided a high-level goal, dispatch `site-planner` to expand it
   into a numbered list with priorities.
4. Write the work plan to `harness/.overnight-state.json`:
   ```json
   {
     "goal": "<original goal>",
     "items": [{ "id": 1, "desc": "...", "status": "pending" }],
     "baseline": { "scores": {...}, "timestamp": "..." },
     "checkpoints": [],
     "iterations": 0
   }
   ```

## Main loop

For each item in priority order:

1. **Implement** — run `/improve "<item description>"`.
2. **Checkpoint** — run `/checkpoint "<item summary>"` to save progress.
3. **Update state** — mark the item as completed in
   `harness/.overnight-state.json`.
4. **Reassess** — every 3 completed items, run `/audit all` and compare
   to baseline. Record the delta in the state file.

## Convergence loop

After all items are complete:

1. Run `/quality-gate all`.
2. If any route scores < 4.5 on any category or has accessibility
   blockers:
   a. Identify the lowest-scoring route and category.
   b. Dispatch `site-planner` to generate a targeted fix spec.
   c. Run `/improve "<targeted fix>"`.
   d. Re-run `/quality-gate` for the affected route.
3. Repeat until all routes ≥ 4.5 or the circuit breaker trips.

## Circuit breakers

Stop and write a summary (don't spin forever):

- **Max iterations**: 20 total `/improve` cycles. After 20, stop and
  report what's done vs. what remains.
- **Diminishing returns**: If two consecutive convergence iterations
  don't improve any score by ≥ 0.1, stop and report.
- **Repeated failures**: If the same item fails `/improve` twice (build
  errors, reviewer rejections after 2 revision cycles), skip it, log
  the reason, and move to the next item.
- **Context pressure**: If you receive a "consider /compact" suggestion
  from the strategic-compact hook, immediately:
  1. Write current progress to `harness/.overnight-state.json`.
  2. Run `/compact` to free context.
  3. Re-read the state file and continue from where you left off.

## State persistence

Write state to `harness/.overnight-state.json` at every checkpoint.
This file lets a new session resume work if the current one ends
unexpectedly. The file format:

```json
{
  "goal": "...",
  "items": [
    { "id": 1, "desc": "...", "status": "completed", "pr": "#12" },
    { "id": 2, "desc": "...", "status": "in_progress" },
    { "id": 3, "desc": "...", "status": "pending" }
  ],
  "baseline": { "scores": { "/": 3.8, "/about/": 4.1 }, "timestamp": "..." },
  "current": { "scores": { "/": 4.6, "/about/": 4.5 }, "timestamp": "..." },
  "checkpoints": ["abc1234", "def5678"],
  "iterations": 7,
  "circuit_breaker": null
}
```

## Morning summary

When finished (all items done + convergence met, or circuit breaker
tripped), produce:

```
## Overnight run summary — <date>

### Goal
<original goal>

### Completed items
1. ✓ <item> — PR #<n>
2. ✓ <item> — PR #<n>
3. ✗ <item> — skipped: <reason>

### Scorecard delta
| Route        | Before | After | Delta |
| ------------ | ------ | ----- | ----- |
| /            | 3.8    | 4.6   | +0.8  |
| /about/      | 4.1    | 4.5   | +0.4  |
| ...          |        |       |       |

### Circuit breaker
<which one tripped, if any>

### Remaining work
- <anything left undone>

### Commits
<git log --oneline main..HEAD>
```

## Error handling

- **Build failure**: Dispatch `build-error-resolver`. If it can't fix
  in one pass, skip the item and log the error.
- **GitHub API failure**: Retry once after 30s. If still failing, commit
  locally and continue without PRs — the user can push manually.
- **Hook crash**: Log the error and continue. Hooks are defense-in-depth;
  a crashed hook should not block the pipeline.
- **Agent timeout**: If an agent doesn't respond within 5 minutes,
  report the timeout and move to the next item.

## Guardrails

All hard rules from CLAUDE.md still apply:
- Never push to main.
- Don't weaken validate-dist.
- Content in site.ts, not templates.
- Hero stays calm.

The overnight pipeline is autonomous but not exempt from quality gates.
Every change goes through `/improve` which runs the full review
pipeline. No shortcuts.
