---
name: ai-feature-trust-states
description: "Maps the trust and failure states of an AI-powered feature, such as uncertain answers, errors, refusals, slow responses and wrong actions, and drafts the transparency, control and recovery design for each, plus design-intent examples of acceptable and unacceptable output. Use when a UX designer is designing an AI assistant, chatbot, agent or generated-content feature, needs to plan what users see when the AI is unsure or wrong, or wants to hand product and QA examples of the output the design intends."
---

# AI Feature Trust States

Plan how an AI feature earns and keeps user trust, including what users see when it is unsure, slow or wrong.

## What to gather first

Ask for anything missing before you start:

- What the feature does, who uses it and the task they are delegating to it.
- What the AI can affect: does it only suggest, or can it take actions such as sending, changing or deleting something?
- Research findings about these users: their expertise, what is at stake for them, and their current trust in automation.
- Current designs or flows, if any, and the product's tone of voice.
- Real or realistic example outputs, especially bad ones, with personal details removed.
- Known technical limits from engineering: typical failure types, response time, what the system can explain about its output.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Describe the delegation: what the user hands over, what they keep control of, and what happens if the output is wrong. Rate the impact of a wrong output as low, medium or high, and explain why.
2. List the states the feature can be in. Include at least: working, slow or long-running, confident output, uncertain or partial output, no answer, refusal or out of scope, error, wrong output the user notices, and wrong output the user does not notice.
3. For each state, design for the four fundamentals:
   - **Transparency:** what the user is told about what the AI did and where the output came from.
   - **Control:** how the user can review, edit, stop, undo or choose not to use the output.
   - **Consistency:** how the behaviour and wording stay predictable across similar situations.
   - **Support when it fails:** how the user recovers, reaches a person or completes the task another way.
4. For any action the AI can take on the user's behalf, add a confirmation or preview step proportional to the impact, and describe how it can be undone. If it cannot be undone, say so prominently.
5. Draft interface copy for uncertain, refusal and error states in the product's tone. Avoid blaming the user and avoid overstating the system's confidence.
6. Write design-intent examples of acceptable and unacceptable output to hand to product and QA, drawn from research and design intent. Product owns the pass/fail criteria and QA owns the evals.
7. List questions for engineering about what the system can detect (for example, whether it can signal low confidence) so designs do not depend on signals that do not exist.
8. Suggest what to test with real users, especially the states where users may not notice a wrong output.

## Output format

```markdown
# Trust and failure states: <feature name>

**Delegated task:** <what the user hands over>
**Impact of wrong output:** <low/medium/high and why>
**Status:** Design draft for review

## State map

| State | Transparency | Control | Consistency | Support when it fails |
| ----- | ------------ | ------- | ----------- | --------------------- |

## Actions taken on the user's behalf

| Action | Confirmation or preview | Undo | Impact if wrong |
| ------ | ----------------------- | ---- | --------------- |

## Draft copy

- **Uncertain:** "<copy>"
- **Refusal / out of scope:** "<copy>"
- **Error:** "<copy>"

## Design-intent examples

| Situation | Acceptable example | Unacceptable example | Design intent behind it |
| --------- | ------------------ | -------------------- | ----------------------- |

## Questions for engineering

- <question>

## What to test with users

- <state or scenario and what to learn>

## Assumptions and open questions

- <assumption or question, and who can confirm>
```

## Watch out for

- Design the failure states first, not last.
- Wrong outputs that users do not notice are the most dangerous state. Look for ways to help users check the output, not just to report errors.
- Do not promise transparency the system cannot provide, such as sources or confidence it does not have. Confirm with engineering.
- Examples of good output must come from research and design intent, not from what the model happens to produce today.
- Never reproduce secrets, credentials or personal data (names, emails, account details) in the output unless the user needs them; anonymise quotes by default.
- Synthetic users or AI opinions cannot tell you whether real users trust the feature. Test with real users.
- The designer and team decide the design; this is a structured draft.

## Before you finish

- [ ] Every listed state has an entry for all four fundamentals.
- [ ] Every AI action has a confirmation, preview or undo, or a clear note that it cannot be undone.
- [ ] Design-intent examples show both acceptable and unacceptable output.
- [ ] Designs that rely on unconfirmed technical signals are flagged.
- [ ] Clearly flag your assumptions and anything the designer, engineering or product must review or decide.
