---
name: agent-test-change-audit
description: Audits test changes made by a coding or testing agent, such as healed locators, adjusted waits, updated assertions, skipped, disabled or deleted tests, and flags changes that could hide a real bug or create a false pass. Use when reviewing a pull request where an agent wrote or repaired tests, when a test suite suddenly turns green after agent work, when tests were auto-healed or marked skipped, or when checking generated test code for gaps.
metadata:
  title: "Agent test change audit"
  summary: "Checks agent-changed tests for edits that could hide a real bug or create a false pass"
---

# Agent Test Change Audit

Check whether tests changed by an agent still test the right thing, and flag every change that could hide a real defect.

## What to gather first

Ask for anything missing before you start:

- The diff, branch or pull request containing the test changes, and the base branch.
- Why the agent changed the tests (task description, failure logs, agent notes).
- Whether application code changed in the same diff.
- Recent test run results before and after the change, if available.
- The requirements or acceptance criteria the affected tests are meant to cover.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. List every changed test file and classify each change: new test, deleted test, skipped or disabled test, changed assertion, changed locator, changed wait or timeout, changed test data, changed setup or mocks, retries added.
2. Treat deletions, skips, disabled tests and added retries as high attention. For each, find the reason given. If no reason is given, flag it.
3. For every changed assertion, compare old and new expected values. Decide whether the new value reflects an intended requirement change or simply matches whatever the application now does. Look for weakened checks: exact values replaced by "exists", "contains" or "not null", or removed assertions.
4. For every changed locator, check that it still targets the same user-facing element and purpose, not a different element that happens to match.
5. For changed waits and timeouts, check whether a longer wait hides a real performance problem or race condition.
6. For changed mocks, stubs and test data, check whether the test still exercises real behaviour or now tests the mock.
7. If a test was skipped because the agent believed the feature is broken, treat it as a possible defect. Write down how a human can reproduce it.
8. If application code changed in the same diff, check whether tests were edited to match the new behaviour rather than the requirement.
9. Check new tests for false passes: assertions that can never fail, missing assertions, or tests that pass even when the feature is removed. To confirm a test fails when the behaviour it checks is broken:
   - ask the user for explicit permission first, and skip this check if they do not give it;
   - work only in a separate throwaway worktree or copy, never in the user's working tree;
   - check that `git status` is clean before you start and again after you finish;
   - list every temporary edit in the output, and never commit or push them.
10. Map each affected test back to its requirement and note any requirement that lost coverage.
11. Recommend an action per change: accept, question, revert, or raise a defect.

## Output format

```markdown
## Test change audit: <PR or branch>

### Summary

- Tests added: <n> | changed: <n> | skipped or disabled: <n> | deleted: <n>
- Application code changed in same diff: Yes / No
- Overall: Safe to merge / Needs answers / Do not merge yet

### High-attention changes

| Test | Change type | Before | After | Reason given | Risk | Recommended action |
| ---- | ----------- | ------ | ----- | ------------ | ---- | ------------------ |

### Possible defects hidden by test changes

| Test | Suspected defect | How to reproduce | Suggested severity |
| ---- | ---------------- | ---------------- | ------------------ |

### Coverage lost

| Requirement | Previously covered by | Now covered by |
| ----------- | --------------------- | -------------- |

### Other changes reviewed

- <test>: <change> — <accept / question>

### Temporary edits made to check for false passes

- <file and edit, worktree or copy used, git status before and after — or "none">

### Questions for the author

- <question>

### Assumptions and open questions

- <assumption or question, and who can confirm>
```

## Watch out for

- A green suite is not proof the product works. Ask what changed to make it green.
- A healed test that passes against the wrong element or a weaker check.
- Skipped tests quietly left in the suite. A skip may be the only signal that a feature is broken, and someone must confirm whether the bug is real.
- Tests and code changed together in a way that makes the tests agree with a bug.
- Added retries or longer timeouts that hide flakiness, race conditions or slowness.
- Snapshot or golden files regenerated wholesale, which accepts every difference at once.
- Never reproduce secrets, tokens, credentials or personal data from test data, fixtures or logs in the output; refer to them by location and type, and tell the user to rotate anything exposed.

## Before you finish

- [ ] Every deleted, skipped, disabled or retried test is listed with its reason or "none given".
- [ ] Every changed assertion was compared before and after.
- [ ] Possible hidden defects have reproduction notes.
- [ ] Any deliberate breakage had explicit permission, ran in a throwaway worktree or copy with a clean git status before and after, is listed in the output, and was never committed.
- [ ] Clearly flag your assumptions, which skipped tests may be real bugs, and every accept or revert decision a human must make.
