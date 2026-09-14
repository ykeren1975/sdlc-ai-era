---
name: epic-to-stories-and-criteria
description: "Breaks an epic into user stories with GIVEN/WHEN/THEN acceptance criteria, using a written domain context, and explicitly covers edge cases, business rules and non-functional requirements while flagging anything invented. Use when a business analyst asks to split an epic or feature into stories, write acceptance criteria, draft backlog items from an epic, or produce requirements that testers or coding agents will work from."
metadata:
  title: "Epic to stories"
  summary: "Splits an epic into user stories with acceptance criteria, flagging anything invented"
---

# Epic to Stories and Acceptance Criteria

Draft a reviewable set of user stories and acceptance criteria from an epic, grounded in the domain and honest about gaps.

## What to gather first

Ask for anything missing before you start:

- The epic: goal, scope, business value and any notes from workshops or interviews.
- A domain context description: key terms, business rules, user roles, the systems involved and the architecture at a high level. If none exists, offer to draft one first and have the analyst correct it.
- Known non-functional and regulatory requirements (performance, security, privacy, accessibility, audit, retention).
- The team's story conventions: template, size expectations, definition of ready, and how acceptance criteria are written.
- Who reads the stories next (developers, testers generating test cases, a coding agent) and what they need.
- Confirmation that the material may be used here under the organisation's AI and data policy.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Restate the epic goal, the users involved and what is out of scope. List any terms you could not find in the domain context.
2. Identify the user roles and the main journeys through the epic. Confirm them with the analyst if they are unclear.
3. Draft stories in the team's template, one user goal per story. Keep each small enough for the team's usual sprint size.
4. For each story, write acceptance criteria in GIVEN/WHEN/THEN form. Cover the main path, then alternative paths.
5. For each story, add edge cases deliberately: empty or missing data, invalid input, permissions, concurrency, cancellation, limits, time zones and dates, and failure of a dependent system.
6. Add non-functional criteria where they apply. If a non-functional need is likely but unspecified, add it as an open question rather than inventing a number.
7. Mark every business rule by origin: "from source" (with a reference to the epic, notes or domain context) or "assumed". Assumed rules must be confirmed by a stakeholder.
8. Check the set as a whole: no gaps between stories, no duplicates, no contradictions, and every part of the epic scope is covered by at least one story.
9. List questions for stakeholders, grouped by who can answer them.

## Output format

```markdown
# Stories for epic: <epic name>

**Epic goal:** <one sentence>
**Out of scope:** <items>
**Domain context used:** <document name or "drafted in this session">
**Status:** Draft for analyst and stakeholder review

## Story <N>: <short title>

As a <role>, I want <capability> so that <benefit>.

**Acceptance criteria**

1. GIVEN <context> WHEN <action> THEN <outcome>

**Edge cases**

- GIVEN <context> WHEN <action> THEN <outcome>

**Non-functional**

- <criterion or "open question: …">

**Business rules**

| Rule | Origin (from source + reference / assumed) |
| ---- | ------------------------------------------ |

## Coverage check

| Epic scope item | Covered by stories |
| --------------- | ------------------ |

## Assumptions and open questions

- <assumption or question, who can confirm, and which story it blocks>
```

## Watch out for

- Never reproduce secrets, credentials or personal data (names, emails, account details) from interview notes or tickets in the output unless the user needs them; anonymise quotes by default.
- Drafts tend to invent plausible business rules. Never state a rule as fact without a source; mark it "assumed".
- Look for roles and cases outside the main journey.
- State non-functional needs explicitly so later test design covers them. If they are unknown, raise them as questions.
- Vague wording gets built exactly as written when a coding agent or test generator reads it. Replace words like "quickly", "appropriate" or "user-friendly" with testable statements or questions.
- Poor domain context produces poor stories. If the context is thin, say so at the top of the output.
- Do not create or update items in the team's tracker. Produce a draft for the analyst to review and enter.

## Before you finish

- [ ] Every story has main-path, edge-case and non-functional criteria, or an open question in their place.
- [ ] Every business rule is marked "from source" or "assumed".
- [ ] The coverage check shows every epic scope item.
- [ ] No unexplained vague terms remain in acceptance criteria.
- [ ] Clearly flag your assumptions and anything a stakeholder or the analyst must review or decide before these stories go into refinement.
