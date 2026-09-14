---
name: test-cases-from-acceptance-criteria
description: Drafts a reviewable set of test cases from a user story, acceptance criteria or requirements, covering functional paths, negative and boundary cases, and non-functional requirements such as performance, accessibility, security and privacy, with traceability back to each criterion. Use when writing test cases or test ideas for a new story or feature, doing test analysis and design, or checking an AI-drafted test list for gaps.
metadata:
  title: "Test cases from acceptance criteria"
  summary: "Drafts test cases from a user story, covering edge cases and non-functional needs"
---

# Test Cases from Acceptance Criteria

Turn a story's acceptance criteria into a traceable, risk-aware set of test cases that a tester reviews before use.

## What to gather first

Ask for anything missing before you start:

- The user story or requirement text and its acceptance criteria.
- The product area, the users affected, and any known risky or fragile parts.
- Non-functional expectations: performance, accessibility, security, privacy, compatibility, localisation.
- Supported platforms, browsers, devices or API versions.
- Existing test cases for the area, to avoid duplicates, and the team's test case format.
- Which test data may be used. Never use real customer data unless the team confirms it is allowed.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Number every acceptance criterion (AC1, AC2 …). If the story has none, list the testable statements you can find and mark them as inferred.
2. List ambiguities and contradictions in the requirements before writing any cases. Do not resolve them by guessing; record them as questions.
3. For each criterion, write at least one positive case that proves it works as described.
4. For each criterion, add negative cases: invalid, missing, duplicated or malformed input, and actions by users without permission.
5. Add boundary cases for every limit, range, length, date, quantity or state transition mentioned or implied.
6. Work through non-functional requirements explicitly, one category at a time, even if the story does not mention them. For each category below, write cases or state why it does not apply:
   - performance and load (response time under expected and peak use);
   - accessibility (keyboard use, screen reader labels, contrast, focus order);
   - security (authorisation, input handling, session behaviour);
   - privacy and data handling (what is stored, shown, logged or exported);
   - compatibility and localisation (browsers, devices, languages);
   - error recovery (offline, timeouts, retries).
7. Add Regression cases for interactions with existing features that the story might break, and trace each one to the risk it covers.
8. Give each case a priority based on risk: impact on users if it fails and likelihood of failure.
9. Mark each case as a candidate for automation, manual testing or exploratory follow-up.
10. Build a traceability table so every criterion maps to cases, and every case maps to a criterion or risk.
11. Remove duplicate or invented cases that do not trace to a requirement or a stated risk.

## Output format

```markdown
## Test design: <story title or ID>

### Requirements questions

- <ambiguity or contradiction, and who should answer>

### Test cases

| ID    | Traces to | Type                                                         | Title | Preconditions | Steps | Expected result | Priority     | Execution                   |
| ----- | --------- | ------------------------------------------------------------ | ----- | ------------- | ----- | --------------- | ------------ | --------------------------- |
| TC-01 | AC1       | Positive / Negative / Boundary / Non-functional / Regression |       |               |       |                 | High/Med/Low | Automate / Manual / Explore |

### Non-functional coverage

| Category                       | Cases | Not applicable because |
| ------------------------------ | ----- | ---------------------- |
| Performance                    |       |                        |
| Accessibility                  |       |                        |
| Security                       |       |                        |
| Privacy                        |       |                        |
| Compatibility and localisation |       |                        |
| Error recovery                 |       |                        |

### Traceability

| Criterion or risk | Cases |
| ----------------- | ----- |
| AC1               |       |

### Suggested exploratory charters

- Explore <area> with <resources> to discover <risk>

### Assumptions and open questions

- <assumption or question, and who can confirm>
```

## Watch out for

- Treating your own draft as final. It is a starting point for a tester's review, not a finished test plan.
- Missing non-functional requirements because the story only describes behaviour. The explicit step above is not optional.
- Inventing requirements. An expected result must come from the story, a linked document or an agreed rule; otherwise mark it as a question.
- Producing many similar cases instead of covering the risky ones. More cases is not better coverage.
- Real personal data in test data or examples. Never reproduce secrets, tokens, credentials or personal data from tickets, specs or existing tests in the output; refer to them by location and type, and tell the user to rotate anything exposed.
- Expected results that are vague ("works correctly"). Each must be observable.

## Before you finish

- [ ] Every acceptance criterion has at least one positive and one negative or boundary case.
- [ ] Every non-functional category has cases or a reason it does not apply.
- [ ] Every case traces to a criterion or a named risk.
- [ ] Ambiguities are listed as questions, not silently resolved.
- [ ] No real customer or personal data appears.
- [ ] Clearly flag your assumptions, inferred requirements, and which priorities and expected results a tester or product owner must confirm.
