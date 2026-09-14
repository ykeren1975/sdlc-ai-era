---
name: customer-feedback-synthesis
description: "Synthesises high-volume customer feedback from support tickets, survey comments, app or product reviews and sales call notes into themes, with every theme traced back to the original items and a spot-check of the summary against the source. Use when a product manager asks to summarise a large set of customer feedback, find recurring themes or pain points, prepare insight for roadmap or prioritisation discussions, or turn a pile of tickets and comments into evidence for a product decision. For moderated interviews or usability sessions, use the UX research synthesis instead."
---

# Customer Feedback Synthesis

Turn scattered customer feedback into traceable themes a product manager can verify before acting on them.

This skill is for feedback at volume, used for prioritisation. A handful of moderated interviews or usability sessions needs a qualitative research synthesis instead, where who said what matters more than counts.

## What to gather first

Ask for anything missing before you start:

- The feedback itself: support tickets, survey comments, reviews or sales call notes, with an identifier for each item.
- The question the synthesis should answer (for example "why do trial users churn?"), not just "summarise this".
- Who the feedback comes from: segment, plan, region or product area, and the time period it covers.
- Whether the data is allowed to be processed here. Confirm the user has checked their company's AI policy for customer data, and ask them to remove personal details they do not need.
- Any themes the team already believes in, so you can test them rather than repeat them.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Restate the question and the scope (sources, segment, period) in one short paragraph, and confirm it with the user if anything is unclear.
2. Read every item. Give each an ID if it has none, and note its source type and segment.
3. Note the need or problem behind each item, not the feature the customer asked for. Keep the customer's own words next to your note.
4. Group notes into themes. A theme needs at least two independent items; keep single items in an "Unclustered" list instead of forcing them into a theme.
5. For each theme, list every supporting item ID, pick one or two short verbatim quotes, and describe who raised it (segments, source types).
6. Look for disagreement: items that contradict a theme, or segments that want opposite things. Record them under the theme.
7. Compare your themes with the beliefs the team already holds. Mark each belief as supported, contradicted or not covered by this data.
8. Spot-check your own work: pick at least three themes (or all themes if there are fewer), reopen their source items, and confirm each quote is verbatim and each item really supports the theme. Fix or drop anything that does not hold.
9. Describe how often something came up only in plain words tied to this dataset ("mentioned in 7 of the 40 tickets reviewed"). Counts are fine for large ticket or survey sets; for a small qualitative sample, describe who raised it instead. Never extrapolate to all customers.
10. List the open questions that this data cannot answer and suggest how the product manager could find out (for example a follow-up interview).

## Output format

```markdown
# Feedback synthesis: <question>

**Scope:** <sources, segment, period, number of items reviewed>
**Prepared by:** AI draft for review

## Themes

### 1. <Theme name, phrased as a customer problem>

- **What customers are trying to do:** <one or two sentences>
- **Evidence:** <item IDs>
- **Who raised it:** <segments, source types>
- **In their words:** "<verbatim quote>" (<item ID>)
- **Counter-evidence:** <item IDs and a short note, or "none found">

## Existing beliefs checked

| Belief | Supported / Contradicted / Not covered | Item IDs |
| ------ | -------------------------------------- | -------- |

## Unclustered items

- <item ID>: <one-line note>

## Spot-check log

| Theme | Items reopened | Result |
| ----- | -------------- | ------ |

## Open questions for further research

- <question> — <suggested way to find out>

## Assumptions and open questions

- <assumption or question, and who can confirm>
```

## Watch out for

- A fluent summary is not the same as a correct one. Every claim must point to item IDs a human can open.
- Loud or repeated feedback from one account can look like a trend. Count distinct customers, not messages, when you can tell them apart.
- Feature requests are not needs. Keep "they asked for X" separate from "they are struggling with Y".
- The synthesis informs prioritisation; it does not decide it. Do not rank the roadmap or recommend what to build.
- Do not invent segments, revenue impact or customer names that are not in the data.
- Never reproduce secrets, credentials or personal data (names, emails, account details) in the output unless the user needs them; anonymise quotes by default.

## Before you finish

- [ ] Every theme lists item IDs and at least one verbatim quote.
- [ ] The spot-check log shows at least three themes (or all, if fewer) rechecked against the source.
- [ ] Counter-evidence and unclustered items are included, not hidden.
- [ ] No numbers extend beyond the dataset reviewed.
- [ ] No recommendation on what to build is presented as decided.
- [ ] Clearly flag your assumptions and anything a human must review or decide before this is shared or acted on.
