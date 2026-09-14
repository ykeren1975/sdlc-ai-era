---
name: ai-diff-review
description: Reviews a diff or pull request written by an AI assistant or coding agent for correctness, security, test integrity and fit with the codebase, and drafts review comments. Use when asked to review AI-generated code, an agent's pull request, a large machine-generated diff, or your own agent's changes before merge; triggers include "review this diff", "check the agent's PR", "is this AI change safe to merge". For infrastructure, data-model, security-fix or test-only changes, a more specific review skill fits better.
metadata:
  title: "AI diff review"
  summary: "Reviews AI-written code changes for correctness, security and tests, and drafts comments"
---

# AI Diff Review

Review a change drafted by an AI assistant or agent as carefully as a colleague's, and draft findings a human reviewer can act on.

## What to gather first

Ask for anything missing before you start:

- The diff, branch or pull request to review, and the base it is compared against.
- The task, ticket or spec the change was meant to implement.
- How to build and run the tests locally, if you are allowed to run them.
- Any areas the author is unsure about, and any parts of the codebase that are off limits.
- The team's coding and security conventions (instruction file, style guide, lint rules).

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Restate the intended change in two or three sentences from the ticket or spec. If there is no ticket, say so and infer intent from the diff, marking it as an assumption.
2. Read the whole diff once without commenting. List every file touched and group them: feature code, tests, configuration, dependencies, generated files.
3. Check scope. Flag changes that the task did not ask for, such as unrelated refactors, renamed files, reformatting or edits to shared configuration.
4. Check correctness line by line against the intent. Look for code that is almost right: off-by-one boundaries, wrong defaults, swallowed errors, missing null or empty handling, incorrect assumptions about existing APIs, and logic that only works for the happy path.
5. Verify that every function, method, library and configuration key the diff uses actually exists in this codebase or its declared dependencies. Search the repository rather than trusting names that look plausible.
6. Run a security pass on every changed line, treating AI-written code as untrusted until checked:
   - input validation and output encoding (injection, cross-site scripting, log injection);
   - authentication and authorisation checks on new or changed entry points;
   - secrets, tokens or credentials in code, tests, logs or fixtures;
   - unsafe use of cryptography, randomness, file paths, deserialisation or shell calls;
   - new or changed dependencies: confirm each package name is real, intended and pinned the way the project expects.
7. Check test integrity. Flag any test that was deleted, skipped, disabled, loosened (weaker assertions, broader matchers, added retries) or rewritten to match new behaviour without explanation.
8. Check that new behaviour has tests, including at least one failure or edge case, not only the happy path.
9. If you are allowed to, run the existing build, linters and tests in an isolated environment without production credentials, and record the results. Do not push, merge, deploy or change the branch.
10. Check fit: duplicated helpers that already exist elsewhere, naming and structure that break local conventions, and missing or stale documentation.
11. Sort findings by severity and write each one as a concrete comment with file, line and a suggested fix or question.

## Output format

```markdown
## Review summary

- **Change:** <one-sentence restatement of intent>
- **Recommendation:** Approve / Approve with changes / Request changes / Needs discussion
- **Tests run:** <commands and results, or "not run" with reason>

## Findings

| #   | Severity                      | File:line | Category                                                 | Finding | Suggested fix or question |
| --- | ----------------------------- | --------- | -------------------------------------------------------- | ------- | ------------------------- |
| 1   | Blocker / Major / Minor / Nit |           | Correctness / Security / Tests / Scope / Maintainability |         |                           |

## Security pass

- Input handling: <ok / issues, with references>
- Auth and access control: <...>
- Secrets and sensitive data: <...>
- Dependencies: <new packages and whether each was confirmed>

## Test integrity

- Tests added: <list>
- Tests removed, skipped or weakened: <list, or "none found">

## Out of scope changes

- <list, or "none">

## Assumptions and open questions

- <assumption or question, and who can confirm>
```

## Watch out for

- Output that is almost right. It compiles and reads well but handles one case wrongly; trace the unusual inputs, not just the obvious ones.
- Clean syntax is not evidence of secure code. Always do the security pass, even for small diffs.
- An agent claiming it ran or passed tests. Only report test results you ran yourself or can see in CI output.
- Plausible but invented APIs, configuration options or package names.
- Tests changed in the same diff as the code they test, which can hide a behaviour change.
- Very large diffs. Say which parts you reviewed in depth and which you only skimmed.
- Fixes that silence a symptom (catching and ignoring an exception, widening a type) instead of fixing the cause.
- Never reproduce secrets, tokens, credentials or personal data in the output; refer to them by location and type, and tell the user to rotate anything exposed.
- For infrastructure, data-model, security-fix or test-only changes, a more specific review skill fits better.

## Before you finish

- [ ] Every finding points to a file and line and says what to change or ask.
- [ ] The security pass covers every changed entry point and dependency.
- [ ] Deleted, skipped or weakened tests are listed explicitly.
- [ ] Test results are ones you observed, or are marked "not run".
- [ ] You made no commits, pushes, merges or deployments.
- [ ] No secret, token, credential or personal data value appears in the output; any found is referred to by location and type, with advice to rotate it.
- [ ] Clearly flag your assumptions, the parts you did not review in depth, and every decision a human reviewer must make before merge.
