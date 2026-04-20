---
description: Audit the harness itself (agents, commands, hooks, rules) for drift, orphans, and dangling references.
argument-hint: "[focus: agents | commands | hooks | rules | skills | all]"
allowed-tools: Agent, Read, Grep, Glob, Bash
---

You are auditing the harness. Scope via `$ARGUMENTS` (default: `all`).

## Steps

1. Dispatch `harness-auditor` with the focus arg.
2. If the auditor reports doc drift, also dispatch `doc-updater` to
   propose concrete edits.
3. Synthesize into a single report.

## Output

```
## Harness audit — <date>

### Inventory
agents: N    commands: N    hooks: N    rules: N    skills: N    playbooks: N

### Findings
[CRITICAL], [MAJOR], [MINOR] — from harness-auditor

### Proposed doc edits
[from doc-updater]

### Orphans
- <file>

### Dangling references
- <reference>

### Health
green | yellow | red

### Recommended next steps
1. <action>
2. ...
```

## When to run

- On a monthly cadence.
- After any PR that adds / removes / renames an agent, command, or hook.
- Before a major release or audit conversation with the user.

## What this does NOT cover

- Does not run a full site `/audit` (that's UX + a11y).
- Does not rebuild `dist/`.
- Does not touch production-facing code.
