---
name: metric-definition-writeup
description: Drafts a clear, unambiguous business definition for a metric, covering calculation, grain, filters, edge cases, owner and verified example questions, so people and AI query tools use the same meaning. Use when a metric is defined differently in different reports, before adding a metric to a semantic layer or data model, or when asked to "define this metric", "document what active users means" or "write a metric spec".
---

# Metric Definition Write-up

Turn a loosely named metric into a written definition that people and AI tools can apply the same way every time.

## What to gather first

Ask for anything missing before you start:

- The metric name and the business decision it supports.
- Every existing place the metric is calculated: queries, models, dashboards, spreadsheets.
- The source tables and columns involved, with their grain.
- The person or team who owns the metric and can approve the definition.
- Known disagreements or edge cases people have raised.
- Where the final definition will live (your semantic layer, model documentation or a data catalog).

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Collect every existing calculation of the metric and put them side by side.
2. For each version, write down in plain English what it counts or sums, over which records, with which filters and time logic.
3. List every difference between the versions, such as included statuses, time zone, handling of refunds, test accounts or duplicates.
4. For each difference, list the options with trade-offs, and optionally mark a suggested one; the metric owner decides. Do not pick silently.
5. Draft the definition: a one-sentence meaning, the exact calculation, the grain, the time dimension, allowed breakdowns, and explicit inclusions and exclusions.
6. Write down edge cases and how the definition treats them (NULLs, cancelled or reversed records, late data, currency or unit changes).
7. Write three to five example business questions this metric should answer, with the expected answer shape, and mark which ones have a verified number.
8. Write questions this metric should not be used to answer, and point to a better metric if one exists.
9. If you are allowed to, draft read-only queries that show how far the existing versions differ on a recent period.
10. Produce the write-up as a draft for the owner to approve. Do not change live models or dashboards.

## Output format

```markdown
## Metric: <name>

**Status:** Draft, awaiting approval by <owner>
**Meaning:** <one sentence a business user would understand>

### Calculation

- Measure: <what is counted or summed>
- Grain: <one row = …>
- Time dimension and time zone: <…>
- Filters: <included and excluded records>
- Allowed breakdowns: <dimensions>

### Edge cases

| Case | Treatment |
| ---- | --------- |

### Existing versions compared

| Location | How it differs | Related decision |
| -------- | -------------- | ---------------- |

### Decisions needed from the owner

1. <decision>
   - Option A: <…> — trade-off: <…>
   - Option B: <…> — trade-off: <…>
   - Suggested (optional): <option and one-line reason, or "None">
   - Owner's decision: <to be decided by <owner>>

### Example questions

| Question | Answer shape | Verified answer? |
| -------- | ------------ | ---------------- |

### Do not use this metric for

- <question> — use <other metric> instead

### Assumptions and open questions

- <assumption or question, and who can confirm>
```

## Watch out for

- Schemas do not carry business meaning. Do not infer a definition from column names alone.
- A definition only helps AI tools if it is written where they can read it and covers the questions people actually ask.
- Two dashboards agreeing does not prove they are right; they may share the same mistake.
- Changing a well-known metric can break trends people rely on. Note whether historical figures will shift.
- Never reproduce secrets, credentials or personal data in the output unless the user needs them. Keep example answers free of sensitive data.

## Before you finish

- [ ] Every existing version is listed and compared.
- [ ] The calculation states grain, time logic, filters and edge cases explicitly.
- [ ] Every open choice lists its options and trade-offs as a decision for the owner, not resolved silently.
- [ ] Example questions are marked verified or unverified.
- [ ] No live model, dashboard or definition was changed.
- [ ] Clearly flag every assumption, and anything a human must review or decide before the definition is published.
