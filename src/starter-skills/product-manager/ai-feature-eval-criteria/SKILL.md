---
name: ai-feature-eval-criteria
description: "Helps a product manager define what good output looks like for an AI feature by reviewing real user interactions, naming failure modes and drafting binary pass/fail criteria to agree with engineering and QA. Use when defining what good output means for an AI feature from real user interactions (error analysis), before building an eval suite."
metadata:
  title: "AI feature eval criteria"
  summary: "Reviews real AI feature use to name failure modes and draft pass/fail quality criteria"
---

# AI Feature Eval Criteria

Draft pass/fail criteria for an AI feature, grounded in how it actually fails on real interactions.

This skill stops at the criteria. Building the eval dataset, grading and regression runs is covered by QA's eval plan (`llm-feature-eval-plan`).

## What to gather first

Ask for anything missing before you start:

- What the feature is for: the user, the task it helps with, and what a successful outcome means for that user.
- A sample of real interactions (inputs and outputs), ideally from production or a realistic test group. If none exist, say that criteria written without them are provisional.
- Confirmation that the sample may be used here under the company's AI and data policy, with personal details removed.
- Any existing acceptance criteria, product rules, tone guidelines or policies the output must respect.
- Who the principal domain expert is (often the product manager) and who in engineering or QA will build the evals.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Summarise the feature's purpose and the user's goal in two or three sentences. Confirm it with the user.
2. Read each interaction in the sample. For each, write a pass or fail judgement and a one-sentence critique saying why. Do not skip the ones that look fine.
3. Mark every judgement you are unsure about as "needs expert review" rather than guessing.
4. Group the failure critiques into named failure modes (for example "invents a policy", "ignores the user's constraint", "wrong tone for an upset customer"). Keep the wording specific to this product.
5. For each failure mode, list the interaction IDs that show it and describe the context in which it happens.
6. Turn each failure mode into a binary criterion that a reviewer could apply consistently: "Pass if…, Fail if…". Avoid rating scales unless the user asks for them.
7. For each criterion, suggest how it could be checked: human review, a code-based check (for format, length, required fields) or an AI judge that a human calibrates first. Say which checks need a human.
8. Suggest which interactions QA could keep as starter test cases, including passes, failures and edge cases. Leave the dataset, grading and regression runs to QA's eval plan.
9. List what the sample did not cover (user types, languages, rare but risky situations) so the team can collect more.
10. Draft questions to agree with engineering, such as where the evals run and what result would block a release. Leave the thresholds for humans to set.

## Output format

```markdown
# Eval criteria draft: <feature name>

**Feature goal:** <who it helps and with what>
**Sample reviewed:** <number of interactions, source, date range>
**Status:** Draft for domain expert and engineering review

## Interaction review

| ID  | Pass/Fail/Needs expert review | Critique |
| --- | ----------------------------- | -------- |

## Failure modes

### <Failure mode name>

- **Seen in:** <interaction IDs>
- **When it happens:** <context>
- **Why it matters to the user:** <one sentence>

## Criteria

| #   | Criterion (Pass if… / Fail if…) | Failure mode | Suggested check | Human needed? |
| --- | ------------------------------- | ------------ | --------------- | ------------- |

## Starter eval set

- <interaction ID>: <why it is included>

## Gaps in the sample

- <situation not covered>

## Questions to agree with engineering

- <question>

## Assumptions and open questions

- <assumption or question, and who can confirm>
```

## Watch out for

- Trying a few prompts by hand does not show how a feature fails. Base criteria on the real sample, and say plainly when the sample is thin.
- Generic criteria like "helpful" or "accurate" cannot be applied consistently. Rewrite them until two reviewers would agree.
- AI output can differ for the same input. A single pass on a test case is not proof it will always pass.
- An AI judge needs to be checked against human judgements before anyone trusts it.
- Do not decide release thresholds, and do not present your pass/fail calls as final. The domain expert makes those calls.
- Never reproduce secrets, credentials or personal data (names, emails, account details) in the output unless the user needs them; anonymise quotes by default.

## Before you finish

- [ ] Every interaction in the sample has a judgement and a critique.
- [ ] Every criterion links to a failure mode seen in real interactions.
- [ ] Uncertain judgements are marked for expert review.
- [ ] Gaps in the sample are listed.
- [ ] No release threshold or ship decision is presented as settled.
- [ ] Clearly flag your assumptions and anything a human must review or decide before these criteria are used.
