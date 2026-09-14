---
name: ai-impact-metrics-review
description: Reviews team-level data on AI tool use together with delivery, quality and stability metrics against a baseline, using metrics that keep each other in check, and drafts a balanced summary for leadership. Never uses code volume or individual data as a productivity measure. Use when asked "is AI making the team faster?", when preparing an AI adoption or impact update, setting a baseline before rolling out a tool, or reviewing an AI usage dashboard.
metadata:
  title: "AI impact metrics review"
  summary: "Compares team AI use with delivery and quality metrics and drafts a balanced summary"
---

# AI Impact Metrics Review

Give an honest, team-level picture of how AI tools are affecting delivery, quality and stability, compared with a baseline, without turning output counts into a productivity score.

## What to gather first

Ask for anything missing before you start:

- The question leadership is asking, and the decision it feeds (for example renewing licences or expanding a rollout).
- Team-level AI usage data for the period (for example active users and frequency), aggregated, not per person.
- Delivery metrics for the same period and a baseline period before the change: for example PR throughput, cycle time and deployment frequency.
- Quality and stability metrics for both periods: for example change failure rate, incidents, reverted changes and review time.
- Developer experience input, such as survey results or themes from team discussions.
- Context that affects the numbers: team size changes, holidays, big launches, reorganisations, other process changes.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Confirm the data is aggregated at team level. If per-person data is provided, stop and ask for a team-level export; do not analyse or keep the individual rows.
2. Check that the baseline and current periods are comparable in length, team size and type of work. List every difference.
3. Organise metrics into groups: utilisation (how much the tools are used), impact (delivery, quality, stability, developer experience) and cost (if provided).
4. For each metric, show baseline, current value and direction of change.
5. Pair metrics that keep each other in check: throughput with change failure rate, cycle time with incidents, review time with pull request size.
6. Note where throughput went up while stability or quality went down, and flag it prominently.
7. Mark any metric based on code volume, lines of code, acceptance rate or commit counts as weak evidence and do not use it as a productivity measure.
8. Separate correlation from cause. List other changes that could explain the movement.
9. Note if the period includes ramp-up time, and what longer data would show.
10. Draft a summary with findings, uncertainties, and options for leadership. Do not recommend decisions about individuals.

## Output format

```markdown
# AI impact review: <team or group> — <period> vs <baseline period>

**Question:** <what leadership asked>
**Overall reading:** <one or two sentences, including uncertainty>

## Comparability of periods

- <differences in team size, work type, events>

## Metrics

| Group | Metric | Baseline | Current | Change | Paired with | Evidence strength |
| ----- | ------ | -------- | ------- | ------ | ----------- | ----------------- |

## What the data suggests

1. <finding> — supported by <metrics>

## Warning signs

- <e.g. throughput up while change failure rate up>

## Other explanations to rule out

- <item>

## What we cannot tell yet

- <item and data that would help>

## Options for leadership

| Option | Supports | Risks |
| ------ | -------- | ----- |

## Assumptions and open questions

- <assumption or question, and who can confirm>
```

## Watch out for

- Code generation volume, lines of code and acceptance rate are easy to measure and easy to game. They do not show whether code is maintainable or later reverted.
- Never use these metrics in individual performance evaluations, and say so if the review is shared with the team.
- Check whether stability metrics moved with throughput.
- Note if the period includes ramp-up time, and what longer data would show, before presenting any change as success or failure.
- Never reproduce secrets, credentials or personal data in the output unless the user needs them.
- Small teams produce noisy metrics. A few incidents can swing a rate.
- Do not attribute all change to AI when other process or team changes happened in the same period.

## Before you finish

- [ ] All data in the output is team-level; no individual appears.
- [ ] Every impact metric has a baseline and a paired counter-metric.
- [ ] Volume-based metrics are marked as weak evidence, not productivity.
- [ ] Other explanations and uncertainties are listed.
- [ ] Options are presented without deciding for leadership.
- [ ] Clearly flag every assumption, and anything the engineering manager or leadership must review or decide.
