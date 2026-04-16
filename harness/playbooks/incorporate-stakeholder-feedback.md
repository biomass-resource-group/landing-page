# Playbook: Incorporate stakeholder feedback

End-to-end flow when Julie (or any stakeholder) sends a list of qualitative
feedback items via WhatsApp / email / Slack.

## TL;DR

```text
/incorporate-feedback <paste the feedback>
# review the resulting acceptance list with the user
/improve "<short summary; the acceptance list is already in context>"
```

## Step by step

1. **Paste feedback verbatim** into `/incorporate-feedback`. Don't
   pre-summarize — the `feedback-translator` agent does better work
   on the raw text.
2. **Review the translator's output** with the user. Confirm:
   - Are all items captured?
   - Did the translator's `[content] / [layout] / [a11y] / [branding]`
     tags land correctly?
   - Are inferred items (`P2`) ones we actually want to do?
   - Resolve any open questions before moving on.
3. **Run `/improve`** with the agreed acceptance list. It will:
   - Plan via `site-planner`
   - Optionally propose visuals via `visual-designer`
   - Implement via `astro-implementer`
   - Review in parallel via `ux-reviewer` + `accessibility-auditor`
   - Validate via `dist-validator`
   - Ship via `git-shipper`
4. **Watch the PR**. Subscribe to PR events so CI failures and review
   comments get auto-handled. The session will surface them as
   `<github-webhook-activity>` events.

## What can go wrong

- **Hard-rule conflict** — e.g. Julie asks to add Cody's LinkedIn.
  Stop, surface the conflict, and ask before proceeding. Hard rules
  live in `CLAUDE.md`.
- **Feedback is contradictory** — e.g. "make hero busier" + "calmer
  hero". The translator surfaces this; resolve with the user before
  planning.
- **Spec balloons beyond one PR** — split it. Each PR should have a
  focused acceptance list (≤ 7 items is a good ceiling). Use
  `/route-spec` per route to break a redesign into shipping units.

## When NOT to use this flow

- Single-line typo fixes. Just edit `src/data/site.ts` directly.
- Dependency bumps. Dependabot handles these.
- Header/CSP changes. Use a manual flow with explicit user approval.
