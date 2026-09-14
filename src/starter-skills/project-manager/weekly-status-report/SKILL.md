---
name: weekly-status-report
description: Drafts a weekly project status report from plan, tracker and meeting notes, checks it against the underlying data, and flags low-confidence items and escalation decisions for the project manager. Use when preparing a weekly or fortnightly status update, a steering group summary or a sponsor report, or when asked to "write the status report", "summarise project progress" or "check this AI-generated status update".
---

# Weekly Status Report

Draft a status report that reflects the real state of the project, and make clear which parts need the project manager's judgement.

## What to gather first

Ask for anything missing before you start:

- The reporting period and the audience (team, sponsor, steering group), plus any required template.
- The plan or schedule: milestones, baseline dates and current forecast dates.
- A tracker export or list of work items with status, owner, due date and last updated date.
- Notes, decisions and action items from this period's meetings.
- The current risk and issue log.
- Last period's report, so changes can be shown.
- Budget or resource figures (planned and actual spend), if the report covers them.
- The status scale your organisation uses (for example On track / At risk / Off track, or Red / Amber / Green).

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Check data freshness first. List work items not updated during the reporting period, items with no owner, and milestones with no forecast date. Report these before drafting.
2. Compare each milestone's forecast with its baseline and with last period's report. Note what moved and by how much.
3. Group completed work, work in progress and upcoming work by milestone or workstream.
4. Pull decisions made and decisions still needed from the meeting notes. Link each to the meeting it came from.
5. Pull new, changed and closed risks and issues from the log. If no risk log is provided, propose risks drawn from the inputs and label each one "Proposed".
6. Check budget only if figures were given. If there is no planned spend to compare against, say that budget status can't be judged.
7. Propose an overall status and a status per milestone, with one sentence of evidence each. Use On track / At risk / Off track; if the organisation uses RAG colours, map them to Green / Amber / Red and state which scale the report uses.
8. Give a confidence level (High, Medium, Low) for the overall status, each milestone and each progress bullet. Use "Low" where the source data is stale, contradictory, missing, or where the status depends on context not in the data.
9. List candidate escalations: items that may need sponsor or steering attention. Do not decide; describe the trigger and the options.
10. Tailor length and wording to the audience. Keep the executive summary to a few sentences.
11. Produce the draft. Do not send it, post it or update any tracker item.

## Output format

```markdown
# Status report: <project> — <period>

**Draft prepared for review by:** <project manager>
**Status scale used:** On track / At risk / Off track | Green / Amber / Red
**Proposed overall status:** <status> (confidence: High/Medium/Low)

Confidence levels apply to the overall status, each milestone and each progress bullet.

## Executive summary

<3–5 sentences>

## Milestones

| Milestone | Baseline | Forecast | Change since last report | Status | Confidence |
| --------- | -------- | -------- | ------------------------ | ------ | ---------- |

## Progress this period

- <workstream>: <completed> / <in progress> (confidence: High/Medium/Low)

## Budget

- <planned vs actual, or "Budget status can't be judged: no planned spend provided">

## Next period

- <planned work>

## Decisions

| Decision | Made or needed | By whom | Source |
| -------- | -------------- | ------- | ------ |

## Risks and issues

| Item | New/changed/closed/Proposed | Owner | Summary |
| ---- | --------------------------- | ----- | ------- |

## For the project manager to decide

- **Possible escalations:** <item — trigger — options>
- **Low-confidence items to check:** <item — why confidence is low>
- **Data quality problems found:** <stale or ownerless items>

## Assumptions and open questions

- <assumption or question, and who can confirm>
```

## Watch out for

- The report can only be as accurate as the plan and tracker. A task marked "on track" that has not been updated in weeks is unknown, not on track.
- Summaries of complex work can miss context that was never written down. Flag anything that looks inconsistent rather than smoothing it over.
- "Blocked" may mean blocked, or may mean nobody updated the item. Say which you can confirm.
- Do not guess the reason for a slip. State the fact and leave the explanation to the owner.
- Deciding which risks to escalate, and how to frame them, stays with the project manager.
- Leave out personal or confidential details that are not needed for the audience.
- Never reproduce secrets, credentials or personal data in the output unless the user needs them.

## Before you finish

- [ ] Stale and ownerless items are listed, not hidden.
- [ ] Every status has evidence and a confidence level.
- [ ] Milestone changes are compared with the baseline and last report.
- [ ] Escalations are presented as options, not decisions.
- [ ] Nothing was sent, posted or changed in any tool.
- [ ] Clearly flag every assumption, low-confidence item and escalation decision that the project manager must review or decide.
