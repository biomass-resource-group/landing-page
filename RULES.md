# RULES.md — rulebook overview

BRG site rules are organized by scope. Each file is short and opinionated.
If a rule is ambiguous, escalate to the user rather than guess.

## Hard rules (non-negotiable)

These trump everything else. See [`CLAUDE.md`](./CLAUDE.md) for the
canonical list. Enforced mechanically by
[`scripts/validate-dist.mjs`](./scripts/validate-dist.mjs) where feasible.

1. Direct pushes to `main` are allowed after validation; PR branches are also
   allowed. Never force-push or delete `main`.
2. Don't weaken `validate-dist.mjs` to make a change pass.
3. Page copy lives in `src/data/site.ts`.
4. No LinkedIn link for Cody Danet anywhere.
5. Julie Brown's LinkedIn stays on `/about/`.
6. Keep the homepage hero calm.

## Scoped rules

Organized under [`harness/rules/`](./harness/rules/):

### Common — apply regardless of file type

| File                                                                                | What it covers                           |
| ----------------------------------------------------------------------------------- | ---------------------------------------- |
| [`common/git-workflow.md`](./harness/rules/common/git-workflow.md)                  | Branch naming, commit style, PR hygiene  |
| [`common/coding-style.md`](./harness/rules/common/coding-style.md)                  | Formatting, imports, file layout         |
| [`common/security.md`](./harness/rules/common/security.md)                          | CSP, headers, deps, secrets              |
| [`common/performance.md`](./harness/rules/common/performance.md)                    | LCP, bundle size, image handling         |
| [`common/testing.md`](./harness/rules/common/testing.md)                            | What `validate:dist` covers, live checks |
| [`common/patterns.md`](./harness/rules/common/patterns.md)                          | Section / hero / card component patterns |
| [`common/hooks.md`](./harness/rules/common/hooks.md)                                | How lifecycle hooks behave               |
| [`common/agents.md`](./harness/rules/common/agents.md)                              | Delegation etiquette                     |
| [`common/code-review.md`](./harness/rules/common/code-review.md)                    | Review rubric                            |
| [`common/development-workflow.md`](./harness/rules/common/development-workflow.md)  | The default flow                         |

### Astro

| File                                                                        | What it covers                      |
| --------------------------------------------------------------------------- | ----------------------------------- |
| [`astro/components.md`](./harness/rules/astro/components.md)                | Component conventions               |
| [`astro/content-data.md`](./harness/rules/astro/content-data.md)            | Editing `src/data/site.ts` safely   |
| [`astro/routing.md`](./harness/rules/astro/routing.md)                      | Routes, 404, redirects              |

### TypeScript

| File                                                                              | What it covers             |
| --------------------------------------------------------------------------------- | -------------------------- |
| [`typescript/type-safety.md`](./harness/rules/typescript/type-safety.md)          | No `any`, `as const`, etc. |
| [`typescript/imports.md`](./harness/rules/typescript/imports.md)                  | Import order, resolution   |

## When rules conflict

- Hard rules trump scoped rules.
- Scoped rules trump habits / style preferences.
- A stakeholder decision (Julie, the team) trumps everything short of hard
  rules. If a decision contradicts a hard rule, escalate — don't silently
  comply.

## Evolving the rulebook

- Add a rule → drop a file in the right `harness/rules/` directory.
- Promote a rule to "hard" → also add it to `CLAUDE.md` and, if mechanically
  checkable, to `validate-dist.mjs`.
- Remove a rule → explain in the PR description why it's obsolete.
