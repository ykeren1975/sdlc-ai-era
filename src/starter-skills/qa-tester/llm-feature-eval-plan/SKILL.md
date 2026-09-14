---
name: llm-feature-eval-plan
description: Drafts an evaluation plan and a starter eval dataset for a product feature built on a large language model, where the same input can give different outputs, covering labelled examples, edge and adversarial cases, a Pass/Fail grading method and regression runs on every change. Use when quality criteria for a chatbot, summariser, AI assistant or other generative AI feature exist, or alongside defining them, to build the eval dataset, grading method and regression runs. Defining what good output looks like is a product decision; if there are no criteria yet, draft them with the product manager first.
metadata:
  title: "LLM feature eval plan"
  summary: "Drafts an evaluation plan and starter test set for a feature built on a language model"
---

# LLM Feature Eval Plan

Draft an eval plan and starter dataset so a team can judge an AI feature's output quality consistently and repeatably.

## What to gather first

Ask for anything missing before you start:

- What the feature does and who uses it.
- The agreed quality criteria (Pass if / Fail if), usually drafted by the product manager from real interactions. If none exist, say so.
- The prompt or system instructions, and any tools or data sources the feature can use.
- Real or realistic example inputs, and whether they contain personal or confidential data.
- Known failures, complaints or bug reports.
- Constraints: response time, cost limits, languages, content the feature must never produce.
- How the team currently tests the feature, if at all.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Write the feature's purpose in one sentence and list the user tasks it must support.
2. Start from the agreed quality criteria. Deciding what good output looks like is a product decision, so do not redefine it. If no criteria exist, draft provisional ones as separate binary statements ("Pass if…, Fail if…"), for example on correctness against source, following instructions, format, refusal when appropriate and safety, and mark each as needing product agreement.
3. Separate criteria that can be checked by code (format, length, required fields, forbidden terms, response time) from criteria that need human or model-based judgement.
4. Draft a starter dataset of inputs grouped by category: typical requests, edge cases (empty, very long, mixed language, ambiguous), out-of-scope requests, and adversarial inputs such as instructions hidden in user content that try to override the feature's rules.
5. For each input, write the expected characteristics of a good answer rather than one exact expected string.
6. Replace or remove any personal or confidential data in examples. Use synthetic stand-ins and note where real data was anonymised.
7. Plan grading and labelling: each output gets Pass or Fail per criterion, with an optional "needs human review" flag when the grader is unsure. Say who labels outputs, who reviews flagged ones, how disagreements are resolved, and how many examples need human labels before trusting any automated grader.
8. If a model is used as a grader, plan to validate it against the human labels first and record where it disagrees.
9. Because output varies, plan to run each input more than once and judge consistency as well as quality.
10. Define pass thresholds per criterion as proposals for the team to agree, not as fixed numbers.
11. Plan when evals run: on every prompt, model, tool or data change, and before each release. Say where results are stored and who reviews regressions.
12. Add non-functional checks: response time, cost per request, behaviour on timeouts and errors, and what is logged.

## Output format

```markdown
# Eval plan: <feature name>

## Purpose and user tasks

- <task>

## Quality criteria

| Criterion | Pass if | Fail if | Checked by                  | Status               |
| --------- | ------- | ------- | --------------------------- | -------------------- |
|           |         |         | Code / Human / Model grader | Agreed / Provisional |

## Starter dataset

| ID     | Category                                    | Input (synthetic) | Good answer should | Must not |
| ------ | ------------------------------------------- | ----------------- | ------------------ | -------- |
| EV-001 | Typical / Edge / Out of scope / Adversarial |                   |                    |          |

## Grading and labelling

- Grades: Pass / Fail per criterion, plus optional "needs human review" flag
- Labellers, review of flagged outputs, and disagreement process: <...>
- Model grader validation: <plan, or "not used">
- Runs per input: <n, proposed>

## Proposed thresholds

| Criterion | Proposed threshold | Needs agreement from |
| --------- | ------------------ | -------------------- |

## When evals run

- <trigger> → <who reviews>

## Non-functional checks

- <check>

## Assumptions and open questions

- <assumption, risk or question, and who can confirm>
```

## Watch out for

- Writing one exact expected output and asserting equality. It will fail on harmless variation and pass on nothing useful.
- Trusting a model grader that has never been compared with human labels.
- Only typical inputs. Adversarial and out-of-scope inputs are where harmful failures appear.
- Real user data copied into eval datasets or shared outside approved systems. Never reproduce secrets, tokens, credentials or personal data from prompts, logs or bug reports in the output; refer to them by location and type, and tell the user to rotate anything exposed.
- Middle grades such as "borderline" that let unclear outputs slip through. Grade Pass or Fail and flag uncertain cases for human review.
- Rewriting the product's quality criteria. Raise disagreements as questions for the product manager.
- Answers that sound fluent but are wrong. Check against the source, not just readability.
- Treating a single good run as a pass when output varies between runs.

## Before you finish

- [ ] Every criterion has Pass if / Fail if wording, a checking method, and is marked agreed or provisional.
- [ ] The dataset includes typical, edge, out-of-scope and adversarial inputs.
- [ ] No real personal or confidential data appears in examples.
- [ ] Thresholds are marked as proposals for the team to agree.
- [ ] Clearly flag your assumptions, which criteria and thresholds need product or team agreement, and which examples a human must label.
