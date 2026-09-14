---
name: change-spec-for-agent
description: Turns a ticket or feature request into a short spec, technical plan and ordered task list that a coding agent can follow, with acceptance checks and a security and testing plan for each task. Use when planning a medium or large code change before delegating it to an AI agent, breaking down a ticket, writing a spec or implementation plan, or deciding what to hand to an agent and what to do by hand.
---

# Change Spec for an Agent

Write a concise spec, plan and task list for a code change so an agent can implement it in small, reviewable steps.

## What to gather first

Ask for anything missing before you start:

- The ticket, feature request or bug report, including acceptance criteria if any.
- The repository and the area of code involved.
- Constraints: deadlines, performance or compatibility needs, APIs that must not change.
- The project's build, test and lint commands, and any agent instruction file.
- Who will review the agent's work, and how large a pull request they are comfortable reviewing.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Decide whether a spec is worth it. If the change is a small, well-understood fix, say so and propose a two-line prompt instead of a full spec.
2. Read the relevant code before writing. Note the files, functions and existing patterns the change should follow. Do not describe code you have not looked at.
3. Write the problem statement and the intended behaviour in plain language, from the user's or caller's point of view.
4. List what is explicitly out of scope, so the agent does not wander into unrelated refactors.
5. Write acceptance criteria as checkable statements. Include error cases, empty or boundary inputs, and any non-functional needs such as performance, accessibility or backwards compatibility.
6. Draft the technical plan: components to change, data or schema changes, new interfaces, and how the change will be rolled out or reversed.
7. Add a security section: new inputs and where they are validated, permission checks, sensitive data touched, and new dependencies (each must be named and justified).
8. Break the plan into ordered tasks. Each task should be small enough for one reviewable commit, name the files it expects to touch, and say which tests prove it is done.
9. For each task, mark whether it suits an agent, needs a human, or needs a human decision first (for example, a design choice or a migration on real data).
10. Add stop conditions: situations where the agent must stop and ask rather than guess, such as failing unrelated tests, missing credentials or ambiguous requirements.
11. Keep the whole document short. Cut anything a reviewer would skim past.
12. Produce the spec only; do not start implementing it or hand it to an agent.

## Output format

```markdown
# Spec: <change title>

## Problem

<2–4 sentences>

## Intended behaviour

- <bullet per behaviour>

## Out of scope

- <bullet>

## Acceptance criteria

- [ ] <checkable statement>
- [ ] <error or edge case>
- [ ] <non-functional need, if any>

## Technical plan

- **Components:** <files, modules>
- **Data changes:** <or "none">
- **Rollout and rollback:** <how>

## Security considerations

- <inputs, permissions, sensitive data, new dependencies>

## Tasks

| #   | Task | Files | Done when (tests) | Owner                                |
| --- | ---- | ----- | ----------------- | ------------------------------------ |
| 1   |      |       |                   | Agent / Human / Human decision first |

## Stop and ask if

- <condition>

## Assumptions and open questions

- <assumption or question, and who can confirm>
```

## Watch out for

- Over-specifying small changes. A long spec can take longer to review than the change itself.
- Long documents the agent will not follow closely. Prefer short, concrete tasks with checks over prose.
- Acceptance criteria that only cover the happy path.
- Plans that assume a library, endpoint or table exists without checking.
- Tasks that mix a refactor with a behaviour change, which makes review harder.
- Leaving the security and test sections empty because the change "looks simple".
- No secrets, credentials or customer data in the spec. Never reproduce secrets, tokens, credentials or personal data found in code, configs or tickets; refer to them by location and type, and tell the user to rotate anything exposed.

## Before you finish

- [ ] Every task has a test or check that proves it is done.
- [ ] Out of scope items and stop conditions are written down.
- [ ] Security considerations are filled in or explicitly marked "none identified" with a reason.
- [ ] File and function names in the plan were confirmed in the repository.
- [ ] The document is short enough to review in a few minutes.
- [ ] You produced the spec only; nothing was implemented or handed to an agent.
- [ ] Clearly flag your assumptions, open questions, and every decision a human must make before the agent starts.
