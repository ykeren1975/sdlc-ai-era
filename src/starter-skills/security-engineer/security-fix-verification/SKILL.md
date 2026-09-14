---
name: security-fix-verification
description: Verifies a proposed security fix, especially one suggested by an AI tool or autofix feature, by checking that it closes the vulnerability on every path, does not introduce new vulnerabilities, keeps program behaviour intact and adds only real, intended dependencies. Use when reviewing an AI-suggested security patch, a scanner autofix, a vulnerability remediation pull request, or when asked "does this fix actually close the issue".
metadata:
  title: "Security fix verification"
  summary: "Checks that a security fix, including AI-suggested ones, closes the hole safely"
---

# Security Fix Verification

Check that a proposed security fix really closes the issue without breaking behaviour or adding new risk, and draft a merge recommendation.

## What to gather first

Ask for anything missing before you start:

- The original finding: weakness type, affected code, and proof of concept if one exists.
- The proposed fix as a diff or pull request, and who or what produced it.
- The tests and CI results for the fix branch.
- Other places in the codebase that use the same pattern or call the changed code.
- Whether you may build and run tests locally.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Restate the root cause in one sentence. A fix that does not address this root cause is incomplete, however tidy it looks.
2. Read the fix diff in full. Classify the approach: input validation, output encoding, parameterised query, authorisation check, safer API, configuration change, dependency upgrade, or removal of a feature.
3. Check completeness. List every path by which attacker-controlled data reaches the vulnerable sink, and confirm the fix covers each one, not only the path named in the finding.
4. Search the codebase for the same vulnerable pattern elsewhere and note any instance the fix does not touch.
5. Try to bypass the fix on paper: alternative encodings, case changes, nested or double input, different content types, other HTTP methods, other user roles, and race conditions.
6. Check for new vulnerabilities introduced by the change, such as a new injection point, weakened authorisation, sensitive data in logs or error messages, or disabled security features.
7. Check behaviour. Compare old and new logic for legitimate inputs and note any change in results, error handling or performance a user could notice.
8. Check dependencies. For every added or upgraded package, confirm the name is exactly the intended, well-established package and not a similar-looking name, and that the version is one the project allows.
9. Check tests: a test that reproduces the original vulnerability should now fail against the old code and pass against the fix. Flag tests that were deleted, skipped or weakened.
10. If you are allowed to, build and run the tests in an isolated environment without production credentials, and record results. Do not merge, push or deploy.
11. Draft a recommendation with any changes required before merge.

## Output format

```markdown
## Fix verification: <finding ID> / <PR>

- **Fix source:** <person / AI suggestion / autofix>
- **Recommendation:** Merge / Merge after changes / Reject and rework
- **Root cause:** <one sentence>

### Coverage of attack paths

| Path (entry point → sink) | Covered by fix | Evidence |
| ------------------------- | -------------- | -------- |

### Bypass attempts (reasoned)

| Attempt | Result | Notes |
| ------- | ------ | ----- |

### New risks introduced

- <item, or "none found">

### Behaviour changes

- <item, or "none found">

### Dependencies

| Package | Change | Name and version verified |
| ------- | ------ | ------------------------- |

### Tests

- Regression test for this vulnerability: <present / missing>
- Tests removed, skipped or weakened: <list>
- Results: <observed results, or "not run">

### Same pattern elsewhere

- <file:line>

### Required changes before merge

1. <change>

### Assumptions and open questions

- <assumption or question, and who can confirm>
```

## Watch out for

- Fixes that are wrong in quiet ways: they compile, pass tests and still leave the vulnerability open on another path.
- Fixes that change program semantics, such as rejecting valid input or altering error behaviour.
- Dependency names that look right but are not the real, intended package.
- Blocklist-style filters that stop the proof of concept but not variations of it.
- Fixes applied in the client or user interface only, with no server-side check.
- Treating CI passing as proof the fix works; confirm a regression test targets the vulnerability.
- Never reproduce secrets, tokens, credentials or personal data from code, tests, logs or the finding in the output; refer to them by location and type, and tell the user to rotate anything exposed.

## Before you finish

- [ ] Every attack path is listed and marked covered or not covered.
- [ ] At least three bypass ideas were considered.
- [ ] Every new or changed dependency name and version was verified.
- [ ] Test results are observed, or marked "not run".
- [ ] You did not merge, push or deploy anything.
- [ ] Clearly flag your assumptions, residual risk, and the merge decision a human must make.
