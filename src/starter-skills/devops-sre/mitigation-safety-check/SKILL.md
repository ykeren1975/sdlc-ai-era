---
name: mitigation-safety-check
description: Checks whether a proposed operational action during an incident, such as a rollback, restart, failover, scale change, config change or traffic shift, is safe given the current system state, and checks an AI investigation's suggested cause against the evidence before any action is recommended. Use during an incident or on-call when an agent or person proposes a mitigation, when asked "is it safe to roll back", or when verifying an AI-suggested root cause.
---

# Mitigation Safety Check

Check a proposed mitigation against the current system state and the evidence, and give the incident lead a clear, reasoned recommendation to approve or reject.

## What to gather first

Ask for anything missing before you start:

- The proposed action, exactly as it would be run, and who or what proposed it.
- The suspected cause and the evidence behind it (alerts, logs, traces, metrics, recent changes).
- The affected service, environment and region.
- Current state: in-progress deploys, configuration pushes, migrations, failovers, maintenance, traffic level.
- The relevant runbook or playbook, if one exists.
- Who is the incident lead and who can approve actions.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Restate the proposed action and the problem it is meant to solve in one or two sentences.
2. Check the suspected cause against the evidence. For each piece of supporting evidence, open the underlying signal (log lines, metric, trace, change record) and confirm it says what the suggestion claims. Note evidence that contradicts the hypothesis and alternative causes that fit the same signals.
3. Check timing: did the suspected trigger happen before the symptoms began, in the affected scope only?
4. Classify the action as read-only, reversible or destructive, and say why.
5. Check current system state before judging safety. An action that is normally safe can be unsafe right now. Look for in-progress configuration pushes, deploys, schema or data migrations, ongoing failovers, dependent services under stress, and caches or queues that would be disrupted.
6. Check dependencies: what else the action touches, such as shared databases, other services on the same cluster, or clients that expect the current version.
7. Check data safety: whether the action can lose, duplicate or corrupt data, or break compatibility with data written since the last change.
8. Check the runbook. Note where the proposal matches it, departs from it, or where the runbook looks out of date.
9. Define how success and failure will be recognised: which signals should improve, within what time, and what indicates the action made things worse.
10. Write the rollback or abort plan for the action itself.
11. Consider a safer alternative, such as a smaller scope, a single region or instance first, or a read-only diagnostic step.
12. Do not run the action or any command that changes the system. Only read-only queries, if allowed. The decision belongs to the incident lead.

## Output format

```markdown
## Mitigation safety check

- **Proposed action:** <exact action>
- **Proposed by:** <person / agent / tool>
- **Action class:** Read-only / Reversible / Destructive
- **Recommendation:** Proceed / Proceed with conditions / Do not proceed / Need more information
- **Confidence:** High / Medium / Low

### Cause check

| Claim | Evidence checked | Supports / Contradicts / Unclear |
| ----- | ---------------- | -------------------------------- |

- Alternative causes still possible: <list>

### Current state check

| Condition                         | Present? | Effect on safety |
| --------------------------------- | -------- | ---------------- |
| Deploy or config push in progress |          |                  |
| Migration in progress             |          |                  |
| Failover or maintenance under way |          |                  |
| Dependent services degraded       |          |                  |

### Risks of acting

- <item>

### Success and failure signals

- Expect: <signal and time window>
- Abort if: <signal>

### Rollback or abort plan

1. <step>

### Safer alternative

- <option, or "none identified">

### Needs human decision

- <item>

### Assumptions and open questions

- <assumption or question, and who can confirm>
```

## Watch out for

- An action that is safe in one state and unsafe in another, such as a rollback during a configuration push.
- AI-suggested causes that sound convincing but rest on a correlation or a misread signal. Check the underlying data, not the summary.
- Confirmation bias: looking only for evidence that supports the first hypothesis.
- Stale state information. Note when each state check was made.
- Actions scoped wider than needed, such as all regions instead of one.
- Pressure to act fast. A short, clear "need more information" is better than a guess.
- Never reproduce secrets, tokens, credentials or personal data from logs, traces or configs in the output; refer to them by location and type, and tell the user to rotate anything exposed.

## Before you finish

- [ ] Every claimed piece of evidence was checked against its source.
- [ ] Current system state was checked, with the time of each check noted.
- [ ] The action is classified, and rollback and abort signals are defined.
- [ ] You ran no command that changes the system.
- [ ] Clearly flag your assumptions, your confidence, anything you could not verify, and that the incident lead must approve or reject the action.
