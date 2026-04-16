# agents.md

Delegation etiquette. The ground truth for "which agent?" is
[`AGENTS.md`](../../../AGENTS.md). This file covers **how** to delegate
well.

## Brief like a smart colleague

An agent starts with no memory of the conversation. Give it enough to
make judgement calls, not a narrow script. In each prompt:

1. **Goal** — one sentence on what success looks like.
2. **Context** — links to the files / specs / feedback that matter.
3. **Constraints** — hard rules the agent must not violate.
4. **Output shape** — what you want back (a spec, a diff, a scorecard,
   a one-paragraph summary).
5. **Non-goals** — what *not* to do (prevents scope creep).

## Parallelize when independent

Review-class agents (`ux-reviewer`, `accessibility-auditor`,
`performance-reviewer`, `copy-editor`, `security-reviewer`) typically
don't depend on each other. Fire them in a single message with multiple
`Agent` tool calls — that's what the `/audit` and `/improve` pipelines do.

## Trust but verify

Each agent's summary describes what it *intended* to do, not what it
actually did. When an implementer agent touches files, read the diff
before declaring the task done.

## Don't over-delegate

Signs you're over-delegating:

- The agent's scope is "run one file through Read / Grep / Edit."
  Just do it inline.
- You're passing no acceptance criteria — the agent is guessing.
- You're delegating the same task to a second agent because the first
  "didn't quite get it." Fix the prompt instead.

## When an agent fails

- Read the agent's output carefully. Most failures surface as a clear
  reason, not a crash.
- If the failure is a hard-rule violation (e.g. the implementer tried
  to write marketing copy into an `.astro` template), escalate to the
  user. Don't silently work around it.
- If the agent ran out of context, split the task smaller.

## Agent lifecycle

Each `Agent` invocation is stateless. To continue a thread, either:

- `SendMessage` to the same agent ID (preserves context).
- Start a fresh `Agent` call with a self-contained prompt.

Default to fresh calls unless the new task genuinely builds on prior
exploration.
