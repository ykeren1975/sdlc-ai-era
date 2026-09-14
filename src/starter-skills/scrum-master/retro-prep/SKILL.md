---
name: retro-prep
description: Prepares a Sprint Retrospective by clustering team feedback into themes, drafting an agenda with activities and timings, and adding a question on how AI helped or hindered the Sprint, while keeping the team's own words visible. Use before a retrospective, when grouping retro sticky notes or survey answers, or when asked to "prepare the retro", "cluster this feedback" or "suggest a retrospective format".
metadata:
  title: "Retrospective prep"
  summary: "Groups team feedback into themes and drafts a retrospective agenda"
---

# Retro Prep

Prepare a retrospective plan and a first grouping of feedback that helps the team inspect its Sprint, without replacing the team's own conversation.

## What to gather first

Ask for anything missing before you start:

- The Sprint Goal and whether it was met.
- Team feedback collected so far (anonymous notes, survey answers), if any.
- Actions agreed at the last retrospective and their status.
- Notable events from the Sprint: incidents, scope changes, absences, releases.
- Meeting length, format (in person or remote) and number of participants.
- Anything the Scrum Master wants to focus on, and topics to avoid.
- Whether the feedback may be processed by the AI tool you are running in, under your team's data policy.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Remove names and identifying details from feedback before working with it, unless the team has agreed otherwise.
2. Cluster the feedback into four to seven themes. Name each theme neutrally and keep the original notes listed under it.
3. For each theme, note how many notes it contains and whether the notes agree or conflict. Do not merge conflicting views into one statement.
4. List notes that do not fit any theme separately, so they are not lost.
5. Review last retrospective's actions: done, partly done, not started. Suggest opening the session with them.
6. Add at least one prompt about how AI tools or agents helped or hindered this Sprint, for example review effort, quality, pull request size, or who is using the tools.
7. Draft an agenda: set the stage, gather data, generate insights, decide what to do, close. Give each part a timing that fits the meeting length.
8. Suggest one or two activities for each part, with short instructions the Scrum Master can read out.
9. Suggest questions the facilitator can ask to dig into each theme. Do not suggest the answers or the actions.
10. Produce the plan as a draft for the Scrum Master.

## Output format

```markdown
# Retrospective plan: <team> — Sprint <number>

**Length:** <minutes> | **Format:** <in person / remote> | **Participants:** <n>

## Last retro's actions

| Action | Status | Note |
| ------ | ------ | ---- |

## Feedback themes (draft grouping for the team to adjust)

### <Theme name> (<n> notes)

- "<original note>"
- Agreement: <mostly agree / mixed / conflicting>
- Questions to explore: <question>

### Unclustered notes

- "<note>"

## Agenda

| Time | Part | Activity | Facilitator instructions |
| ---- | ---- | -------- | ------------------------ |

## AI in this Sprint

- Prompt: <question about where AI helped or hindered>
- Follow-up questions: <question>

## Notes for the Scrum Master

- <sensitive topics, low-participation risks>

## Assumptions and open questions

- <assumption or question, and who can confirm>
```

## Watch out for

- The themes are a starting point. Let the team regroup and rename them in the session.
- Clustering can flatten a minority view or a single serious concern. Keep outliers visible.
- Anonymous feedback can still identify someone through details. Remove those details.
- Never reproduce secrets, credentials or personal data in the output unless the user needs them.
- Do not write conclusions or actions for the team; the retrospective exists for the team to decide them.
- Watch for signs of over-reliance on AI (one "AI guru", review being skipped, very large pull requests) and turn them into open questions, not accusations.
- Retrospective input may leave your tools if an AI feature processes it. Check your policy first.
- Do not judge or rank individual team members.

## Before you finish

- [ ] Feedback is anonymised and original wording is preserved under each theme.
- [ ] Conflicting views and outliers are visible.
- [ ] There is a prompt about how AI helped or hindered.
- [ ] The agenda fits the meeting length.
- [ ] No actions or conclusions were decided on the team's behalf.
- [ ] Clearly flag every assumption, and anything the Scrum Master must review or decide, including sensitive themes.
