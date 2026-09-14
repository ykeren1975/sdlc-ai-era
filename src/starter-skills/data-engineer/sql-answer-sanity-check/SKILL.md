---
name: sql-answer-sanity-check
description: Checks a SQL query and the number it returns before the answer goes to a stakeholder, covering joins, grain, filters, metric definitions and simple reconciliation checks. Use when an AI tool or a colleague has written a query that answers a business question, when a stakeholder brings a number from an AI assistant, or when someone asks "is this number right?", "check this SQL", "validate this query" or "sanity check these results".
metadata:
  title: "SQL answer sanity check"
  summary: "Checks a SQL query and the number it returns before the answer goes to a stakeholder"
---

# SQL Answer Sanity Check

Confirm that a query answers the question that was actually asked, and that its result is plausible, before anyone relies on it.

## What to gather first

Ask for anything missing before you start:

- The business question in the asker's own words, and who will use the answer.
- The SQL query, and the result it returned (or a sample of rows).
- The agreed definition of any metric involved (for example "active customer" or "net revenue"), and where that definition lives.
- The tables used, with their grain (what one row represents) and primary keys, if documented.
- A trusted reference number to compare against, such as an existing dashboard, report or last period's figure.
- Whether you may run read-only queries, and which data you are allowed to see.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Restate the question as a precise spec: the metric, the time window, the time zone, the filters, the grouping and the unit. Note any word in the question that could mean more than one thing.
2. Read the query clause by clause and write down, in plain English, what it actually computes. Compare this with the spec from step 1.
3. Check the grain of every table in the query. For each join, state the join keys and whether the relationship is one-to-one, one-to-many or many-to-many.
4. For any join that could multiply rows, draft a read-only check: count rows before and after the join, and count distinct keys against total rows.
5. Check join types. Flag inner joins that silently drop rows with no match, and left joins whose later `WHERE` clause turns them back into inner joins.
6. Check filters: date boundaries (inclusive or exclusive), time zones, soft-deleted or test records, status values, and how NULLs are treated in filters and aggregates.
7. Check the metric logic against the agreed definition: `COUNT` versus `COUNT(DISTINCT)`, sums of values that are already aggregated, averages of averages, currency and unit conversions.
8. Draft reconciliation checks: total the result and compare it with the reference number; check that segment subtotals add up to the total; spot-check a few individual records by hand.
9. If you are allowed to, run only the read-only checks (`SELECT` statements) on a limited sample. Use a development copy or replica where possible, add LIMIT or sampling, and ask before scanning large tables. Never run statements that write, update, delete or change permissions.
10. Decide a verdict: looks right, needs a fix, or cannot confirm. If a fix is needed, propose a corrected query and explain each change.

## Output format

```markdown
## Sanity check: <short name of the question>

**Question as understood:** <one sentence spec>
**Verdict:** Looks right | Needs a fix | Cannot confirm

### What the query actually computes

<plain-English description>

### Checks

| Check                       | What I looked at | Result                       | Notes |
| --------------------------- | ---------------- | ---------------------------- | ----- |
| Grain and joins             |                  | Pass / Concern / Not checked |       |
| Row multiplication          |                  |                              |       |
| Filters and dates           |                  |                              |       |
| NULL handling               |                  |                              |       |
| Metric definition           |                  |                              |       |
| Reconciliation to reference |                  |                              |       |

### Issues found

1. <issue> — <why it matters> — <suggested fix>

### Suggested query (if changed)

<SQL with comments on each change>

### Assumptions and open questions

- <assumption or question, and who can confirm>
```

## Watch out for

- A query that runs without errors can still return the wrong number. A plausible result is not evidence that it is correct.
- Column names can mislead. A column called `status` or `amount` may not mean what its name suggests; check documentation or ask the owner rather than guessing.
- Fan-out from one-to-many joins inflates sums and counts without any visible error.
- Different teams may use different definitions of the same metric. Use the agreed definition, and say so if none exists.
- Late-arriving or incomplete data can make the most recent period look low.
- Never reproduce secrets, credentials or personal data in the output unless the user needs them. Summarise, mask identifiers, or use counts.
- If the question cannot be answered from the modeled data, say so instead of stretching the query to fit.

## Before you finish

- [ ] The question spec and the query's actual behaviour are both written down and compared.
- [ ] Every join has a stated grain and a row-multiplication check.
- [ ] The result was reconciled against a reference, or the output says no reference was available.
- [ ] No write, update or delete statements were run or suggested for running.
- [ ] No sensitive data appears in the output.
- [ ] Clearly flag every assumption, and anything a human must review or decide, such as an ambiguous definition or a number that could not be confirmed.
