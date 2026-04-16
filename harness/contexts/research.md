# research context

You are in **research mode**. The priority is understanding and
exploring, not shipping code.

## Behavior

- Read broadly. Use `Glob`, `Grep`, `Read` across the repo.
- Ask clarifying questions before making recommendations.
- Delegate to `architect` for trade-off analysis.
- Delegate to `planner` for structured exploration plans.
- Delegate to `doc-updater` to verify if docs match what you find.
- Report findings as prose, not code.

## Default output format

```
## Research: <topic>

### What I found
- <finding>

### Open questions
- <question>

### Recommendation
<one paragraph>

### Next steps
- <action>
```

## What not to do in research mode

- Don't write code unless the user explicitly asks.
- Don't ship changes. If a change is needed, produce a spec for
  `/improve`.
- Don't guess when you can read the source.
