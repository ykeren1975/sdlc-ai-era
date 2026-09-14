---
name: incident-postmortem-draft
description: Drafts a blameless incident postmortem from chat logs, alerts, metrics, deploy history and responder notes, building an evidence-linked timeline, contributing factors and proposed action items, and marking every claim that lacks evidence. Use after an outage or incident when asked to write a postmortem, incident report, incident review, incident retrospective or timeline, or to check an AI-drafted postmortem against the evidence.
metadata:
  title: "Incident postmortem draft"
  summary: "Drafts a blameless incident postmortem from logs and notes, flagging unsupported claims"
---

# Incident Postmortem Draft

Draft a blameless postmortem in which every statement is tied to evidence, so responders can correct it before it is shared.

## What to gather first

Ask for anything missing before you start:

- The incident ID, severity, affected services and the time window, with time zone.
- Incident channel or chat export, pager and alert history.
- Relevant metrics, dashboards or log excerpts (exported, not live access unless allowed).
- Deploy, configuration and feature flag change history for the window.
- Responder notes and the names or roles of people involved.
- The team's postmortem template, if one exists.
- Rules on what incident data may be shared and with whom.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Normalise all timestamps to one time zone and say which one.
2. Build the timeline from sources, one event per row: detection, alerts, key observations, hypotheses, decisions, mitigations, recovery and all-clear. Link every row to its source.
3. Mark gaps: periods with no evidence, conflicting timestamps and events mentioned by only one person.
4. Separate what happened from what people believed at the time. Record hypotheses that were tested and ruled out; they matter for learning.
5. Describe impact with evidence: who was affected, what they experienced, for how long. Leave numbers blank if the data is not provided, rather than estimating.
6. Identify contributing factors, not a single root cause: technical conditions, recent changes, detection gaps, missing or unclear runbooks, tooling problems, and coordination issues.
7. Note what went well, including what helped detection and recovery.
8. If an AI tool or agent took part in investigation or mitigation, record what it suggested, what humans approved and whether the suggestion was correct.
9. Propose action items that address contributing factors. Each should be specific and checkable. Leave owners and due dates for the team to assign.
10. Write in blameless language: describe actions and the context that made them reasonable, never fault individuals.
11. Review your own draft against the evidence one more time, and label every sentence that is not directly supported as "Unverified".
12. Do not file tickets, post the document or notify anyone. Produce the draft only.

## Output format

```markdown
# Postmortem (DRAFT): <incident title>

- **Incident ID:** <id> | **Severity:** <level> | **Status:** Draft for responder review
- **Time zone:** <tz> | **Duration:** <start> to <end>

## Summary

<3–5 sentences>

## Impact

<who, what, how long, with evidence references>

## Timeline

| Time | Event | Source | Confidence            |
| ---- | ----- | ------ | --------------------- |
|      |       |        | Verified / Unverified |

## Evidence gaps and conflicts

- <item>

## Contributing factors

- <factor> — evidence: <reference>

## Hypotheses ruled out

- <hypothesis> — how it was ruled out

## AI and automation involvement

- <what was suggested, what was approved, whether it was correct, or "none">

## What went well

- <item>

## Proposed action items

| #   | Action | Addresses factor | Type (prevent / detect / mitigate / process) | Owner (TBD) |
| --- | ------ | ---------------- | -------------------------------------------- | ----------- |

## Assumptions and open questions

- <assumption or question, and which responder can confirm>
```

## Watch out for

- A postmortem can have the right shape and still be wrong, with no obvious test for correctness. Evidence links are the check.
- Filling gaps with plausible events. If no source shows it, it is a gap.
- Picking a single root cause when several factors combined.
- Hindsight wording ("should have known", "failed to") that assigns blame.
- Mixing time zones from different tools.
- Personal data, customer details or secrets copied from logs into the draft. Never reproduce secrets, tokens, credentials or personal data in the output; refer to them by location and type, and tell the user to rotate anything exposed.
- Action items that are vague ("improve monitoring") or that only target the last person to act.

## Before you finish

- [ ] Every timeline row has a source and a confidence label.
- [ ] Unsupported sentences are marked "Unverified".
- [ ] Gaps and conflicting evidence are listed.
- [ ] Language is blameless throughout.
- [ ] No personal data or secrets are included.
- [ ] Nothing was posted, filed or sent.
- [ ] Clearly flag your assumptions, every unverified statement, and the conclusions and action item owners that responders must review and decide.
