---
name: stakeholder-requirement-rewrite
description: "Rewrites rough stakeholder statements from interviews, workshops or emails into clear, testable requirements, keeps each original beside its rewrite, flags any possible change of meaning, and prepares a confirmation message for the stakeholder. Use when a business analyst asks to clean up, reword or formalise requirements, turn meeting notes or wishlists into requirement statements, or prepare requirements for stakeholder sign-off."
metadata:
  title: "Stakeholder requirement rewrite"
  summary: "Rewrites rough stakeholder asks as clear, testable requirements for them to confirm"
---

# Stakeholder Requirement Rewrite

Turn a stakeholder's rough words into clear requirements without losing what they meant, and set up the stakeholder to confirm it.

## What to gather first

Ask for anything missing before you start:

- The original statements, in the stakeholder's own words where possible, with who said each one and in what setting.
- The context: the business process, the problem being solved and the project scope.
- The team's glossary or domain context, so key terms are used consistently.
- The requirement style the team uses (for example "The system shall…", user stories, or rules tables).
- Confirmation that the notes may be used here under the organisation's AI and data policy, with personal or confidential details removed if not needed.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Number each original statement and keep it word for word. Do not correct or shorten the originals.
2. Split statements that contain more than one need into separate items, and note which original each came from.
3. Rewrite each item as a clear requirement in the team's style: one need, a named actor, a measurable or observable outcome, and consistent glossary terms.
4. Compare each rewrite with its original, looking for meaning drift:
   - anything added (a new condition, number, actor or scope)
   - anything removed (a qualifier, exception or emotion that signals priority)
   - anything changed (a "should" that became "must", a "sometimes" that became "always", a different term)
5. Record every difference in a drift note. If there are none, write "no differences found" rather than leaving it blank.
6. Where the original is ambiguous, do not pick one reading silently. Offer two or three interpretations and turn them into a question.
7. Flag items that sound like solutions ("add a button that…") and propose the underlying need as a question, keeping the original request visible.
8. Draft a short confirmation message the analyst can send to each stakeholder, showing their words, the rewrite and the specific questions. Do not send it.

## Output format

```markdown
# Requirement rewrites for confirmation

**Source:** <interview/workshop/email, date>
**Status:** Draft, not yet confirmed by stakeholders

## Rewrites

| #   | Original (verbatim) | Stakeholder | Rewrite | Drift note | Question |
| --- | ------------------- | ----------- | ------- | ---------- | -------- |

## Ambiguous items

### Item <#>

- **Original:** "<verbatim>"
- **Interpretation A:** <…>
- **Interpretation B:** <…>
- **Question to ask:** <…>

## Solution-shaped requests

| #   | Request as stated | Possible underlying need (to confirm) |
| --- | ----------------- | ------------------------------------- |

## Confirmation message draft: <stakeholder name>

<short, plain message listing their original words, the rewrites and questions>

## Assumptions and open questions

- <assumption or question, and who can confirm>
```

## Watch out for

- A rewrite can read better than the original and still mean something different. The drift note is required for every item.
- Do not add numbers, deadlines, thresholds or rules the stakeholder did not state. Ask for them instead.
- Strength of language carries priority. "It would be nice" and "we cannot go live without" must not end up worded the same.
- A requirement is not confirmed because it is well written. Mark everything as unconfirmed until the stakeholder agrees.
- Conflicts between stakeholders should be surfaced side by side, not merged into a compromise.
- Never send messages or update shared documents; the analyst decides what goes out.
- Never reproduce secrets, credentials or personal data (names, emails, account details) in the output unless the user needs them; anonymise quotes by default. Stakeholder names are needed only to route confirmations.

## Before you finish

- [ ] Every original is kept verbatim and linked to its rewrite.
- [ ] Every rewrite has a drift note, even if it says no differences were found.
- [ ] Ambiguities are turned into questions, not resolved by guessing.
- [ ] No new numbers, rules or scope appear in the rewrites.
- [ ] Clearly flag your assumptions and anything the stakeholder or analyst must review or decide before these requirements are treated as agreed.
