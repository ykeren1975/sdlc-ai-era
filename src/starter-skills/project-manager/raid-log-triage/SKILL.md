---
name: raid-log-triage
description: Reviews AI-flagged or newly raised risks, assumptions, issues and dependencies before they enter the RAID log, removing duplicates, checking evidence, suggesting owners and ratings, and listing escalation options for a human to decide. Use when triaging risk flags from a tool or agent, preparing a risk review meeting, cleaning up a RAID log, or when asked to "review these risks", "update the risk register" or "which risks should we escalate".
metadata:
  title: "RAID log triage"
  summary: "Checks new risks and issues before they enter the log; a person decides what to escalate"
---

# RAID Log Triage

Turn a pile of raw risk flags into a clean, evidence-based set of proposed RAID log entries, with escalation choices left to the project manager.

## What to gather first

Ask for anything missing before you start:

- The new flags or items to triage, and where each came from (tool alert, meeting, team member).
- The current RAID log, including owners, ratings and last review dates.
- The project's rating scale for likelihood and impact, and its escalation thresholds, if defined.
- The current plan with milestones and dependencies.
- Recent tracker data for the work items the flags mention.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. List each incoming flag with its source and the evidence it cites.
2. Check each flag against the tracker and plan. Mark it as confirmed, not confirmed (for example, the item is stale but work is happening) or unclear.
3. Match flags against the existing log. Mark duplicates and flags that should update an existing entry instead of creating a new one.
4. Classify each remaining item as a risk (might happen), issue (is happening), assumption or dependency.
5. Rewrite each entry in a clear form: cause, event, effect. Keep it short and factual.
6. Suggest likelihood and impact using the project's scale, with a one-line reason. Mark these as suggestions.
7. Suggest an owner based on the work affected. Mark it as a suggestion to confirm with that person.
8. Suggest a response (avoid, reduce, transfer, accept, or monitor) and one next action for each.
9. Review existing log entries: flag ones not reviewed recently, ones whose trigger dates have passed, and ones that look closed.
10. List items that may meet escalation thresholds, with the trigger and options. Do not update the live log or notify anyone.

## Output format

```markdown
## RAID triage: <project> — <date>

### Incoming flags

| #   | Source | Flag | Evidence checked | Result (Confirmed / Not confirmed / Unclear / Duplicate) |
| --- | ------ | ---- | ---------------- | -------------------------------------------------------- |

### Proposed new or updated entries

| Type | Description (cause → event → effect) | Suggested likelihood | Suggested impact | Suggested owner | Suggested response and next action |
| ---- | ------------------------------------ | -------------------- | ---------------- | --------------- | ---------------------------------- |

### Existing entries needing attention

| Entry | Problem (stale / trigger passed / possibly closed) | Suggested action |
| ----- | -------------------------------------------------- | ---------------- |

### Escalation candidates for the project manager

| Item | Why it may need escalation | Options | Who might need to know |
| ---- | -------------------------- | ------- | ---------------------- |

### Assumptions and open questions

- <assumption, gap or question, and who can confirm>
```

## Watch out for

- Automated flags such as "stale work" or "slipping deadline" are signals, not conclusions. The work may be progressing outside the tracker.
- Tools can spot trends, but deciding which risks to escalate and how to approach them needs knowledge of the people and politics involved. Leave that to the project manager.
- Do not assign blame in risk descriptions. Describe the situation, not a person's failings.
- A long list of low-value risks hides the important ones. Recommend merging or dropping noise.
- Ratings are only comparable if everyone uses the same scale. Say if no scale exists.
- Keep confidential commercial or personnel details out of the log draft.
- Never reproduce secrets, credentials or personal data in the output unless the user needs them.

## Before you finish

- [ ] Every incoming flag was checked against the tracker or plan, or marked unclear.
- [ ] Duplicates are merged into existing entries.
- [ ] Ratings and owners are marked as suggestions.
- [ ] Escalation candidates list options, not decisions.
- [ ] The live log was not changed and nobody was notified.
- [ ] Clearly flag every assumption, and anything the project manager must review or decide, especially escalations and owner assignments.
