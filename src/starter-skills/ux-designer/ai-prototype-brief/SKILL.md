---
name: ai-prototype-brief
description: "Writes a detailed, context-rich prompt brief for an AI prototyping or UI generation tool, covering users, the interaction to test, design system rules, content, states and accessibility, plus a review checklist for the generated prototype before it goes in front of users. Use when a UX designer wants to build a working prototype of a complex interaction with AI, generate screens that fit their product instead of a generic layout, or prepare a prototype for usability testing."
metadata:
  title: "AI prototype brief"
  summary: "Writes a detailed brief for an AI prototyping tool, plus a checklist to review the result"
---

# AI Prototype Brief

Give an AI prototyping tool the context it needs to produce a testable, on-brand prototype, then check what it produced.

## What to gather first

Ask for anything missing before you start:

- The interaction to prototype and the research question the usability test should answer.
- Who the users are, their goal in this flow, and relevant findings from earlier research.
- Design standards: design system components, patterns, spacing and type rules, tone of voice, and any screens the prototype must match.
- Realistic content, using fictional or sample data only. Confirm no personally identifiable or confidential product data will go into the tool.
- Which tool the designer will use and whether it is approved by the organisation. Keep the brief tool-neutral unless they ask otherwise.
- Constraints: platform and screen sizes, accessibility requirements, and what does not need to work.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Write a one-paragraph summary of the prototype's purpose: the user, their goal, and the question the test must answer.
2. Describe the flow step by step: entry point, each screen or state, user actions, and how the system responds.
3. List every state the interaction needs: empty, loading, partial, error, success, undo, and edge cases such as long names or no results.
4. Write the design context: which components and patterns to use, hierarchy rules (what must be most prominent on each screen), and patterns to avoid.
5. Provide realistic sample content and data, written out in full. Avoid lorem ipsum, because placeholder text hides layout and hierarchy problems.
6. State accessibility requirements explicitly: keyboard operation, visible focus, labels for inputs and icons, alt text, colour contrast and meaningful headings. Ask for real labels, not placeholder attributes.
7. List what is out of scope so the tool does not add features.
8. Assemble the brief into a single prompt the designer can paste into their tool, plus a shorter follow-up prompt for iterating on one screen at a time.
9. Draft a review checklist for the designer to apply to the output before any user sees it.

## Output format

```markdown
# Prototype brief: <interaction name>

## Purpose

<user, goal, research question>

## Prompt to paste

<complete prompt: context, users, flow, states, design rules, content, accessibility, out of scope>

## Follow-up prompt template

"On the <screen> screen, change <specific element> so that <design intent>. Keep everything else the same."

## States covered

| State | Trigger | What the user sees |
| ----- | ------- | ------------------ |

## Review checklist before testing

- [ ] Right design pattern for this task (not just a plausible one)
- [ ] Clear visual hierarchy; the primary action stands out
- [ ] No unnecessary repeated elements or invented features
- [ ] All listed states exist and are reachable
- [ ] Keyboard-only walkthrough works; focus is visible
- [ ] Inputs and icons have real labels; placeholders were replaced
- [ ] Only sample data is used
- [ ] The prototype can answer the research question

## Assumptions and open questions

- <assumption or question, and who can confirm>
```

## Watch out for

- If the brief lacks users, domain or design standards, warn that the output may be generic.
- A polished generated prototype can look complete while using the wrong pattern, a confusing hierarchy or repeated elements. The review checklist is not optional.
- The first output will probably not get everything right. Plan for several focused iterations rather than one large prompt rewrite.
- Always state accessibility requirements in the brief and check them manually.
- Real product data or personal information must not go into the prompt or the tool.
- The prototype is for learning. Do not describe it as ready for development handoff.

## Before you finish

- [ ] The brief names the users, the research question and the design standards.
- [ ] Every state in the flow is described.
- [ ] Accessibility requirements are written into the prompt itself.
- [ ] Only fictional or sample data appears.
- [ ] The review checklist is included.
- [ ] Clearly flag your assumptions and anything the designer must review or decide before the prototype is tested with users.
