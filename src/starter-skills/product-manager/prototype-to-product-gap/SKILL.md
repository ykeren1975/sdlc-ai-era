---
name: prototype-to-product-gap
description: "Reviews a validated prototype or demo and drafts a plain-language gap analysis of what is still needed to turn it into a shippable product, such as untested use cases, reliability, telemetry, performance, data security and compliance, plus open questions for engineering. Use when a product manager has an AI-built or throwaway prototype that tested well and needs to plan next steps, brief engineers, set expectations with stakeholders, or avoid treating a demo as nearly done."
metadata:
  title: "Prototype to product gap"
  summary: "Lists what a tested prototype still needs to become a shippable product"
---

# Prototype to Product Gap

Draft an honest list of what separates a learning prototype from a product customers can rely on, to discuss with engineering.

## What to gather first

Ask for anything missing before you start:

- What the prototype does: a description, screenshots, a walkthrough, or read access to its code if the user wants you to look.
- What it was built to learn, and what customers or stakeholders actually said when they tried it.
- The use cases the prototype covers, and the product area or existing system it would become part of.
- Known constraints: target users and scale, data involved (especially personal or regulated data), platforms, and any company rules for AI-built code.
- Who will read the result (engineering lead, stakeholders, leadership) and what decision it should support.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Summarise what the prototype proved and what it did not try to prove. Separate evidence from customer sessions from the product manager's own impressions.
2. List the use cases the prototype covers. Then draft the use cases a real product would likely need (other user roles, empty and error states, edits, cancellations, permissions, migrations). Mark which are guesses for the team to confirm.
3. Walk through each product concern below and note what the prototype does today, what is unknown, and a question for engineering:
   - reliability and error handling
   - telemetry and analytics
   - performance at expected scale
   - data security and privacy
   - compliance and legal requirements
   - accessibility
   - integration with existing systems and data
   - support, operations and maintenance
4. If you were given code, note any shortcuts that are typical of prototypes (hardcoded data, missing authentication, no tests). Describe them as observations, not verdicts on quality.
5. Decide, with the user, which parts of the prototype are worth keeping as reference (flows, copy, layout) and which should be treated as throwaway.
6. Draft open questions for engineering and design. Do not produce effort estimates or dates; ask the team for them.
7. Write a short stakeholder summary that explains the gap without technical jargon and without promising a launch date.

## Output format

```markdown
# From prototype to product: <idea name>

**Prototype built to learn:** <question>
**What we learned:** <evidence, with source of each point>
**Status:** Draft for engineering and design review

## Use cases

| Use case | In prototype? | Needed for product? (confirm) |
| -------- | ------------- | ----------------------------- |

## Product concerns

| Concern | Prototype today | Unknowns | Question for engineering |
| ------- | --------------- | -------- | ------------------------ |

## Keep as reference vs throwaway

- **Keep:** <flows, copy, patterns>
- **Throwaway:** <parts not intended for production>

## Stakeholder summary

<three to five plain sentences>

## Assumptions and open questions

- <assumption or question, and who can confirm>
```

## Watch out for

- A polished prototype can hide how much work a real product takes. Never describe it as "almost done" or suggest the leap is easy.
- Positive reactions in a demo are not proof of demand or willingness to pay. Keep the evidence and its limits visible.
- Do not estimate effort, cost or timelines. Those belong to the engineering team.
- Do not recommend shipping prototype code as-is, and do not deploy, merge or share it.
- If the prototype used real customer data, flag that for a data policy check.
- Never reproduce secrets, credentials or personal data (names, emails, account details) in the output unless the user needs them; anonymise quotes by default.
- Prioritisation is the product manager's call. Present gaps, not a ranked plan.

## Before you finish

- [ ] Every product concern in step 3 has an entry, even if it is "unknown".
- [ ] Guessed use cases are marked for the team to confirm.
- [ ] No effort, date or "nearly done" language appears.
- [ ] The stakeholder summary matches the detailed sections.
- [ ] Clearly flag your assumptions and anything a human must review or decide before this is shared.
