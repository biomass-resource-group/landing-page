---
description: Convert pasted stakeholder feedback into a numbered acceptance list, ready for `/improve`.
argument-hint: "<pasted feedback or path to a transcript>"
allowed-tools: Agent, Read
---

You are converting stakeholder feedback into a structured acceptance
list. Treat $ARGUMENTS as either:

- Inline feedback (pasted text from a screenshot or email), or
- A file path containing the feedback.

## Steps

1. Dispatch `feedback-translator` with the raw feedback.
2. Surface its output verbatim to the user, formatted as a checklist.
3. Ask the user to confirm or amend the list before invoking `/improve`.

## Default to safety

Do **not** auto-trigger `/improve`. The user reviews the acceptance list
first so that any ambiguity is resolved before code changes begin.
