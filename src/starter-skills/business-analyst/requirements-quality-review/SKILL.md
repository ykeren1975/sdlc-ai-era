---
name: requirements-quality-review
description: "Reviews a set of user stories or requirements against explicit quality criteria, such as clear, testable, independent, consistent, complete and covering non-functional needs, and returns specific findings with suggested fixes and questions. Use when a business analyst asks to check, critique or quality-review a backlog, requirements document, stories or acceptance criteria before refinement, sign-off, test design or handing a spec to developers or a coding agent."
metadata:
  title: "Requirements quality review"
  summary: "Checks stories or requirements for clarity and testability, with suggested fixes"
---

# Requirements Quality Review

Review requirements against clear criteria and return specific, fixable findings for the analyst to act on.

## What to gather first

Ask for anything missing before you start:

- The requirements or stories to review, each with an identifier.
- The quality criteria to apply. If the team has none, propose the default list in step 1 and confirm it.
- The domain context or glossary, and any related documents the requirements must agree with (policies, process maps, earlier decisions).
- Who uses the requirements next (developers, testers, a coding agent, an external supplier) and the review's purpose, such as refinement readiness or sign-off.
- Confirmation that the material may be used here under the organisation's AI and data policy.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Agree the criteria before reviewing. A reasonable default:
   - **Clear:** one reading only; no vague words without a definition.
   - **Testable:** a tester could say pass or fail.
   - **Atomic:** one need per item.
   - **Consistent:** no contradictions with other items or the glossary.
   - **Complete:** actor, trigger, outcome, and error or exception handling are present.
   - **Non-functional covered:** performance, security, privacy, accessibility and regulatory needs are stated or explicitly not applicable.
   - **Valuable and traceable:** the reason or source is known.
2. Review each item against every criterion. Record only real findings, each tied to a criterion and a quote of the problem text.
3. Rate each finding as blocking (cannot be built or tested as written), important, or minor. Explain the rating in a few words.
4. For each finding, suggest a fix. If the fix needs information you do not have, write a question instead of inventing the answer.
5. Review the set as a whole: contradictions between items, duplicates, gaps between items, and non-functional needs missing across the set.
6. Note what is good and should be kept, briefly, so the analyst does not rewrite sound items.
7. Summarise readiness per item: ready, ready with minor fixes, or not ready.

## Output format

```markdown
# Requirements quality review: <document or backlog name>

**Items reviewed:** <count and IDs>
**Criteria used:** <list>
**Purpose:** <refinement readiness / sign-off / handover>
**Status:** AI review draft for analyst judgement

## Summary

| Item | Readiness | Blocking | Important | Minor |
| ---- | --------- | -------- | --------- | ----- |

## Findings

| Item | Criterion | Severity | Problem text | Why it matters | Suggested fix or question |
| ---- | --------- | -------- | ------------ | -------------- | ------------------------- |

## Set-level issues

- **Contradictions:** <item IDs and description>
- **Duplicates:** <…>
- **Gaps:** <…>
- **Non-functional coverage:** <…>

## Worth keeping

- <item ID>: <what works well>

## Assumptions and open questions

- <assumption or question, and who can confirm>
```

## Watch out for

- Never reproduce secrets, credentials or personal data found in backlog items in the output; refer to the item ID instead.
- Reviews without explicit criteria drift into style preferences. Tie every finding to an agreed criterion.
- Suggested fixes can quietly change what a stakeholder asked for. When a fix alters meaning, mark it as a question for the stakeholder, not a correction.
- Missing non-functional and regulatory requirements are easy to overlook in both drafting and review. Check them on every item and across the set.
- Do not invent business rules to make an item "complete". Ask.
- AI reviews can be inconsistent between runs. Keep the criteria and severity definitions fixed, and treat the review as input to the analyst's judgement, not a verdict.
- Do not edit the source document or tracker items directly.

## Before you finish

- [ ] Every finding names a criterion and quotes the problem text.
- [ ] Every item has a readiness rating.
- [ ] Set-level contradictions, gaps and non-functional coverage were checked.
- [ ] Meaning-changing fixes are framed as stakeholder questions.
- [ ] Clearly flag your assumptions and anything the analyst or stakeholders must review or decide before acting on this review.
