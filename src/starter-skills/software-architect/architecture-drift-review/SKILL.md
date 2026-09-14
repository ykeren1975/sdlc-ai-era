---
name: architecture-drift-review
description: "Compares a codebase or a set of recent changes against the intended architecture, such as layers, module boundaries, dependency rules and decision records, reports structural and semantic violations with evidence, triages them, and proposes rules that could become automated fitness functions or agent instructions. Use when a software architect asks to check for architecture drift or erosion, review whether AI-generated or recent code respects boundaries, prepare a conformance review, or turn architecture guidelines into checkable rules."
---

# Architecture Drift Review

Find where code has drifted from the intended architecture, triage it, and propose checks that stop it recurring.

## What to gather first

Ask for anything missing before you start:

- The intended architecture: layers, modules and allowed dependencies, key decision records, and the team's architecture guidelines or agent instruction files.
- The scope: whole codebase, one module, or a range of recent changes.
- Existing automated checks (architecture tests, linters, dependency rules) and their current results, if available.
- The purpose: a periodic review, a pre-release check, or a response to a specific concern.
- Confirmation that the code may be read with an AI tool under the company's AI policy.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Work read-only. Do not change code, open pull requests or alter checks.
2. Write the intended rules as a numbered list in precise terms (for example "the domain module must not import from the web module"). Mark any rule you had to infer from documents rather than read directly, and ask the architect to confirm it.
3. Run or read the output of existing deterministic checks if the user allows it. Record their results first and keep them separate from your own reading of the code.
4. Look for structural violations the checks do not cover: forbidden imports, cycles, bypassed layers, shared database access across module boundaries, and new direct calls to external services.
5. Look for semantic violations that need judgement: business logic in the wrong layer, duplicated domain concepts with different names, decisions in records that the code contradicts, and copies of a pattern the team has marked as degraded.
6. For each finding, record the rule, the evidence (file and line), and whether it came from a deterministic check or your own reading.
7. Triage: group findings that share a cause, and rate each group as high, medium or low based on how it affects the ability to change the system safely. Explain each rating.
8. For high and medium groups, propose a small, reviewable fix direction. Keep fixes small enough to review one at a time, and do not apply them.
9. Propose which rules could become automated fitness functions (deterministic checks that coding agents and CI can run) and which should go into agent instruction files. Draft the rule wording; leave tool choice to the team.
10. List what automated checks cannot catch here, such as overengineering or misunderstood requirements, so humans know what to review by hand.

## Output format

```markdown
# Architecture drift review: <system or scope>

**Scope:** <paths or change range>
**Purpose:** <why>
**Status:** Draft for architect triage

## Intended rules

| #   | Rule | Source (document/confirmed/inferred) |
| --- | ---- | ------------------------------------ |

## Existing check results

- <check>: <summary of result>

## Findings

| Group | Rule # | Evidence (file:line) | Found by (check/reading) | Severity | Reason |
| ----- | ------ | -------------------- | ------------------------ | -------- | ------ |

## Fix directions

### Group <name>

- **Cause:** <…>
- **Suggested small fix:** <…>
- **Verify by:** <how a reviewer or check confirms it>

## Candidate fitness functions

| Rule | Deterministic check or agent instruction | Draft wording |
| ---- | ---------------------------------------- | ------------- |

## Needs human review (not checkable)

- <item>

## Assumptions and open questions

- <assumption or question, and who can confirm>
```

## Watch out for

- Drift compounds when agents and people copy existing patterns, including degraded ones. Call out degraded patterns that are likely to be copied.
- A first scan can surface many violations. Group and triage them instead of listing hundreds of lines.
- Your own semantic findings are less reliable than deterministic checks. Label the source of every finding and suggest a verification step for fixes.
- Some rules may be outdated. A violation might mean the rule should change; raise that as a question for the architect.
- Neither automated nor AI-based checks catch everything. Keep the "needs human review" section.
- Do not modify code, checks or instruction files; propose drafts only.
- Never reproduce secrets, credentials or personal data (names, emails, account details) in the output unless the user needs them; point to the file and line instead of copying the value.

## Before you finish

- [ ] Every finding names a rule, evidence and how it was found.
- [ ] Inferred rules are marked and sent to the architect to confirm.
- [ ] Findings are grouped and triaged with reasons.
- [ ] Proposed fixes are small and have a verification step.
- [ ] Clearly flag your assumptions and anything the architect or team must review or decide before acting.
