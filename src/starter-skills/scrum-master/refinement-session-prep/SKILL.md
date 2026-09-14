---
name: refinement-session-prep
description: Prepares a backlog refinement session by scanning draft backlog items, including AI-drafted stories, for unclear outcomes, missing acceptance criteria, hidden dependencies and items too large for a Sprint. Its output is facilitation questions for the team, not a quality verdict on the items (a requirements quality review is a business analyst skill). Use before backlog refinement, when bringing AI-generated user stories to the team, or when asked to "prep refinement" or "which items are ready to discuss in refinement".
metadata:
  title: "Refinement session prep"
  summary: "Spots unclear or oversized backlog items and suggests questions for the team to discuss"
---

# Refinement Session Prep

Help the Scrum Master and Product Owner walk into refinement with a clear view of which items are ready to discuss and which questions the team needs to answer. The output is facilitation questions, not a quality verdict; a requirements quality review is a business analyst skill.

## What to gather first

Ask for anything missing before you start:

- The backlog items to be refined, with titles, descriptions and acceptance criteria.
- Which items were drafted or expanded by an AI tool.
- The Product Goal and, if known, the likely next Sprint Goal.
- The team's Definition of Ready (if it uses one) and Definition of Done.
- Known dependencies on other teams or systems.
- Session length and who will attend.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. For each item, restate in one sentence the user or business outcome it delivers. If you cannot, mark the outcome as unclear.
2. Check acceptance criteria: are they present, testable and free of vague words such as "fast", "easy" or "better"?
3. Check size signals: several outcomes in one item, many acceptance criteria, or work across many components. Suggest possible ways to split, labelled as options.
4. List dependencies and assumptions each item relies on, including data, access, other teams and decisions not yet made.
5. For AI-drafted items, look for content the team did not ask for: invented requirements, generic criteria copied across items, or details that conflict with the Product Goal.
6. Note questions about how the work will be tested and reviewed, including time to validate AI-generated output.
7. Suggest a discussion order for this session only; this is not Product Backlog order.
8. Write facilitation questions for each item that invite the team to challenge the draft.
9. Produce the prep notes. Do not estimate items, reorder the Product Backlog or edit items in your tracker; the team and Product Owner decide those.

## Output format

```markdown
# Refinement prep: <team> — <date>

**Product Goal:** <goal>
**Session length:** <minutes>

## Suggested discussion order (this session only, not Product Backlog order)

| #   | Item | Outcome clear? | Criteria testable? | Possibly too large? | AI-drafted? |
| --- | ---- | -------------- | ------------------ | ------------------- | ----------- |

## Item notes

### <Item title>

- **Outcome as understood:** <sentence or "Unclear">
- **Acceptance criteria issues:** <list>
- **Dependencies and assumptions:** <list>
- **Possible splits (options only):** <list>
- **AI-draft concerns:** <list or "None found">
- **Questions for the team:**
  1. <question>

## Cross-item observations

- <repeated gaps, shared dependencies>

## For the Scrum Master and Product Owner

- <decisions they need to make>

## Assumptions and open questions

- <assumption or question, and who can confirm>
```

## Watch out for

- AI drafts read smoothly and can look finished. Fluent wording is not the same as a shared understanding.
- Generic acceptance criteria repeated across items often mean nobody thought about the specific case.
- Do not estimate or commit on the team's behalf. Sizing belongs to the people doing the work.
- Splitting suggestions are options. The Product Owner decides value and order.
- Leave out customer names or sensitive details not needed for the session.
- Never reproduce secrets, credentials or personal data in the output unless the user needs them.
- Do not grade the items or their authors. Turn every gap into a question for the team.
- Encourage the whole team to question drafts, not only the person who generated them.

## Before you finish

- [ ] Every item has an outcome statement or is marked unclear.
- [ ] Acceptance criteria issues and dependencies are listed per item.
- [ ] AI-drafted items were checked for invented or generic content.
- [ ] No estimates, backlog reordering or tracker edits were made.
- [ ] Questions invite the team to challenge the drafts.
- [ ] Clearly flag every assumption, and anything the Scrum Master, Product Owner or team must review or decide.
