---
description: Produce an implementation plan for an open-ended request (complement to /improve, which expects stakeholder feedback).
argument-hint: "<request>"
allowed-tools: Agent, Read, Grep, Glob
---

You are producing a plan for the request `$ARGUMENTS`. No code changes.

## Steps

1. Read [`CLAUDE.md`](../../CLAUDE.md), [`AGENTS.md`](../../AGENTS.md),
   and relevant [`harness/rules/`](../../harness/rules/) files.
2. Delegate to the `planner` agent with:
   - The request verbatim.
   - Which rules files you read.
   - Whether the request includes an existing spec or raw feedback.
3. If the planner surfaces "open questions", collect them and surface
   to the user before invoking `/improve`.

## Output

Return the planner's plan verbatim, plus:

```
Next command: /improve "<request>"   (once open questions are answered)
            | /audit <routes>        (if this is review-only)
            | /route-spec <route>    (if this should start from a per-route spec)
```

## When to skip /plan

- The request is raw feedback → use `/incorporate-feedback` instead.
- The request is a one-line bug fix → just delegate to `astro-implementer`.
- The request is a structural trade-off → use `architect` directly.
