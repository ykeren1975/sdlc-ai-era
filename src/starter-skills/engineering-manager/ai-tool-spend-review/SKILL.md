---
name: ai-tool-spend-review
description: Reviews a team's AI tool spend from invoices or usage exports, breaking it down by tool, seat and usage-based charges, calculating spend per developer, spotting unused seats and cost spikes, and drafting a forecast and budget note with options. Use when preparing a tooling budget, checking a surprise AI bill, planning licence renewals, or when asked "what are we spending on AI tools?" or "forecast our AI costs".
metadata:
  title: "AI tool spend review"
  summary: "Breaks down AI tool spend, spots unused seats and cost spikes, and drafts a forecast"
---

# AI Tool Spend Review

Produce a clear, team-level view of what AI tools cost, where the money goes and what spend is likely next, so the manager can make budget decisions with facts.

## What to gather first

Ask for anything missing before you start:

- Invoices, billing exports or admin usage reports for each AI tool, for at least the last few months.
- The pricing model for each tool: per seat, usage-based credits or tokens, or both, and any spend limits already set.
- The number of developers on the team for each month in the period.
- Team-level usage data (active users per tool), if available.
- The current budget and the budget period.
- Known upcoming changes: new hires, new tools, planned rollouts or contract renewals.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Build a month-by-month table of spend per tool, separating seat charges from usage-based charges.
2. Calculate total spend and spend per developer for each month, using the team size for that month.
3. Compare seats paid for with active users per tool. List seats that appear unused, as counts per tool, not names.
4. Identify spikes in usage-based charges and note what else happened that month, such as a new agent workflow or a large migration.
5. Check for overlap: several tools paid for the same job.
6. Note whether spend limits or alerts exist for usage-based tools, and who can see and change them.
7. Draft a forecast for the next budget period with low, expected and high cases. State every assumption behind each case.
8. List options: adjusting seats, setting or changing spend limits, consolidating tools, or keeping spend steady during a learning period. Give trade-offs for each.
9. Where impact data exists, point to it; do not claim a return on investment the data does not show.
10. Produce the draft. Do not change seats, limits, plans or contracts.

## Output format

```markdown
# AI tool spend review: <team> — <period>

**Budget for period:** <amount> | **Spend to date:** <amount>

## Monthly spend

| Month | Tool | Seat charges | Usage charges | Total | Team size | Spend per developer |
| ----- | ---- | ------------ | ------------- | ----- | --------- | ------------------- |

## Seats and usage

| Tool | Seats paid | Active users | Apparently unused seats |
| ---- | ---------- | ------------ | ----------------------- |

## Spikes and overlaps

- <month / tool — amount — possible cause>

## Spend controls

| Tool | Limit or alert in place? | Who can change it |
| ---- | ------------------------ | ----------------- |

## Forecast: <next period>

| Case     | Total | Assumptions |
| -------- | ----- | ----------- |
| Low      |       |             |
| Expected |       |             |
| High     |       |             |

## Options

| Option | Expected effect | Trade-offs |
| ------ | --------------- | ---------- |

## Assumptions and open questions

- <assumption or question, and who can confirm>
```

## Watch out for

- Check usage-based charges separately; seat counts alone may understate cost.
- A seat with low use is not necessarily wasted; the person may be on leave or new. Present unused seats as a question, not a cut list.
- Do not use per-person spend or usage as a measure of anyone's productivity or performance.
- Present cutting tools as a trade-off to discuss.
- Currency, tax and discount differences between invoices can distort comparisons. Normalise and say how.
- Keep contract terms and pricing confidential to the intended audience.
- Never reproduce secrets, credentials or personal data in the output unless the user needs them.

## Before you finish

- [ ] Seat and usage-based charges are separated.
- [ ] Spend per developer uses the correct team size for each month.
- [ ] Unused seats are shown as counts, with no individual named.
- [ ] Each forecast case lists its assumptions.
- [ ] No seats, limits, plans or contracts were changed.
- [ ] Clearly flag every assumption, and anything the engineering manager or finance must review or decide.
