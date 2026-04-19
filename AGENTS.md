# AGENTS.md — delegation guide

When working on `biomass-resource-group/landing-page`, delegate by default.
The main loop should stay at planning / orchestration altitude; domain
judgements belong to specialized subagents.

All subagents live in [`.claude/agents/`](./.claude/agents/). Invoke via the
`Agent` tool with `subagent_type` set to the agent name.

## Delegation policy

Proactively delegate — don't wait to be asked.

| Situation                                          | Delegate to                                    |
| -------------------------------------------------- | ---------------------------------------------- |
| Raw stakeholder feedback (WhatsApp, email, Slack)  | `feedback-translator`                          |
| Expanding a request into a numbered spec           | `site-planner`                                 |
| Larger architectural question (IA, route redesign) | `architect`                                    |
| Exploratory / open-ended planning                  | `planner`                                      |
| Visual treatment proposal (CSS, spacing, motion)   | `visual-designer`                              |
| User-visible copy change                           | `copy-editor`                                  |
| Astro / TS / CSS edits against a spec              | `astro-implementer`                            |
| Generic code-quality review                        | `code-reviewer`                                |
| TypeScript-specific review                         | `typescript-reviewer`                          |
| Security review (CSP, headers, deps, secrets)      | `security-reviewer`                            |
| Route / component UI-UX scoring                    | `ux-reviewer`                                  |
| Accessibility audit                                | `accessibility-auditor`                        |
| Performance audit (LCP, CLS, bundle)               | `performance-reviewer`                         |
| Broken build / type error                          | `build-error-resolver`                         |
| Validation before ship                             | `dist-validator`                               |
| README / CLAUDE.md drift                           | `doc-updater`                                  |
| Auditing the harness itself                        | `harness-auditor`                              |
| Commit / push / PR                                 | `git-shipper`                                  |

## Orchestration patterns

- `/improve` runs: feedback-translator (if raw) → site-planner → [optional:
  visual-designer] → astro-implementer → parallel(ux-reviewer,
  accessibility-auditor, performance-reviewer, code-reviewer,
  copy-editor) →
  dist-validator → git-shipper.
- `/audit` runs: parallel(ux-reviewer, accessibility-auditor,
  performance-reviewer) → synthesized scorecard.
- `/ship` runs: dist-validator → git-shipper.

Agents run in **parallel** whenever their inputs don't depend on each other
(typically review-class agents). The main loop sends one message with
multiple `Agent` tool calls.

## Inter-agent communication

Agents cannot see each other's output. The orchestrator (you) must
bridge them:

1. **Planning → Implementation.** Pass the full spec from
   `site-planner` to `astro-implementer` verbatim in the prompt.
   Include file paths and acceptance criteria.

2. **Review → Revision.** Summarize reviewer findings with file:line
   references. Include severity and the reviewer's exact suggestion.
   Don't paraphrase — `astro-implementer` needs precise context.

3. **Implementation → Review.** Tell reviewers what changed: which
   files, which routes, what the spec asked for. Include the diff
   summary or `git log --oneline main..HEAD` output.

4. **Error → Recovery.** When `build-error-resolver` produces a fix,
   pass the diagnosis and fix diff to `astro-implementer` to apply.
   Don't let the resolver edit directly — it may lack full context.

5. **Parallel review synthesis.** When multiple reviewers return in
   parallel, merge their findings into a single prioritized list
   before sending to the implementer. Deduplicate and resolve
   contradictions.

## When NOT to delegate

- Trivial text tweaks inside a single line of copy — just edit.
- Pure reads / grep / glob — use direct tools.
- Anything where the delegation overhead exceeds the work.

## Hard rules (any agent, always)

Enforced repo-wide. Reproduced in each agent's frontmatter where relevant.

1. **Never push directly to `main`.** Always branch, PR, merge.
2. **Do not weaken `scripts/validate-dist.mjs`** to pass a change.
3. **Page content lives in `src/data/site.ts`.** Not in `.astro` templates.
4. **Cody Danet has no LinkedIn link** anywhere on the site.
5. **Julie Brown's LinkedIn must remain on `/about/`.**
6. **Hero stays calm** — single H1, ≤2 actions, one supporting metric strip.

See [`CLAUDE.md`](./CLAUDE.md) for the full operating guide and
[`harness/rules/`](./harness/rules/) for granular rules by scope.
