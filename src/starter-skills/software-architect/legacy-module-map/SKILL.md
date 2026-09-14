---
name: legacy-module-map
description: "Explores an unfamiliar or legacy module read-only and drafts a map of its responsibilities, dependencies, data flows, business rules and risky coupling, with every statement linked to file and line references and graded by confidence, plus questions for the people who know the system. Use when a software architect or developer needs to understand legacy code before modernising, migrating, splitting or changing it, onboard to an inherited system, or recover design intent and hidden business rules."
metadata:
  title: "Legacy module map"
  summary: "Maps what an unfamiliar legacy module does, with file references and confidence levels"
---

# Legacy Module Map

Produce an evidence-linked map of a legacy module that a human can verify before planning any change.

## What to gather first

Ask for anything missing before you start:

- Which module, service or directory to map, and the repository or files you may read.
- Why the map is needed (modernisation, migration, a specific change, onboarding), so you focus on what matters.
- Any existing documentation, diagrams or decision records, even if outdated.
- Who still knows the system, so questions can be routed to them.
- Confirmation that reading this code with an AI tool is allowed under the company's AI policy.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Work read-only. Do not modify, build, run migrations or execute code that touches data or external systems. If running tests would help, ask first.
2. Identify entry points: public APIs, endpoints, scheduled jobs, message consumers, UI actions and command-line entries.
3. Trace inbound and outbound dependencies: other modules, shared libraries, databases and tables, queues, files, external services and configuration. Record the file and line where each dependency appears.
4. Follow the main flows from each important entry point and describe them step by step in plain language.
5. Extract business rules: conditions, calculations, validations, magic numbers and special cases. Quote the code location for each and describe the rule in business terms.
6. Look for hidden coupling: shared database tables, global state, reflection or dynamic loading, naming conventions that other code depends on, and duplicated logic elsewhere.
7. Note dead or suspicious code only as "appears unused" with the evidence, since callers may exist outside the code you can see.
8. Grade every statement: **confirmed** (seen directly in the code), **inferred** (likely from patterns or names) or **unknown**.
9. Compare with existing documentation and list where they disagree.
10. Draft a text-based diagram of the module and its dependencies (for example a Mermaid flowchart) that the architect can refine.
11. Write questions for people who know the system, especially about why rules exist and what depends on this module from outside.

## Output format

````markdown
# Module map: <module name>

**Purpose of this map:** <why it was requested>
**Scope read:** <paths>
**Status:** AI draft; verify against code and with people who know the system

## Responsibilities

- <responsibility> — <confidence> — <file:line>

## Entry points

| Entry point | Type | Location | Confidence |
| ----------- | ---- | -------- | ---------- |

## Dependencies

| Direction | Depends on | How | Location | Confidence |
| --------- | ---------- | --- | -------- | ---------- |

## Main flows

### <Flow name>

1. <step> (<file:line>)

## Business rules

| Rule in business terms | Code location | Confidence | Question |
| ---------------------- | ------------- | ---------- | -------- |

## Coupling and risks

- <description> — <evidence>

## Diagram

```mermaid
flowchart LR
  <draft>
```

## Documentation mismatches

- <doc says> vs <code shows>

## Questions for people who know the system

- <question> — <suggested person or team>

## Assumptions and open questions

- <assumption or question, and who can confirm>
````

## Watch out for

- AI summaries of code can sound certain while being wrong. Every statement needs a location and a confidence grade.
- Callers outside the visible code (other repositories, reports, scripts, partner integrations) may depend on behaviour that looks unused.
- Business rules often exist for historical or legal reasons that the code does not explain. Ask before labelling anything a bug.
- The map records how the system works today, not how it should work. Keep improvement ideas out of the findings.
- Existing patterns, including degraded ones, are what agents and people copy next. Mark patterns that should not be repeated.
- Do not change code, open pull requests or run anything with side effects.
- Never reproduce secrets, credentials or personal data (names, emails, account details) in the output unless the user needs them; point to the file and line instead of copying the value.

## Before you finish

- [ ] Every responsibility, dependency and rule has a location and a confidence grade.
- [ ] Unknowns and documentation mismatches are listed, not smoothed over.
- [ ] Nothing was modified or executed with side effects.
- [ ] Questions for people who know the system are included.
- [ ] Clearly flag your assumptions and anything a human must verify or decide before this map is used to plan changes.
