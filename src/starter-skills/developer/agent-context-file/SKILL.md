---
name: agent-context-file
description: Drafts or updates a repository instruction file for coding agents, covering build and test commands, conventions, architecture notes, internal APIs and lessons learned from past agent mistakes. Use when setting up a repository for AI coding agents, when an agent keeps making the same mistake, when onboarding an agent to an unfamiliar codebase, or when asked to write or refresh an agent instructions, context or conventions file.
---

# Agent Context File

Draft a short, accurate instruction file that gives a coding agent the context it needs to work in this repository.

## What to gather first

Ask for anything missing before you start:

- The repository, and whether an instruction file already exists (and its expected file name).
- The commands the team uses to install, build, test, lint and run the project.
- Recent examples of agent mistakes the team wants to prevent.
- Areas of the codebase that are sensitive, generated, or must not be edited.
- Team conventions that are not obvious from the code (branching, commit style, review rules).

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. If a file exists, read it fully first. Plan to edit it, not replace it, and keep content the team wrote unless it is wrong.
2. Explore the repository read-only: package manifests, build scripts, CI configuration, directory layout, and a few representative modules.
3. Record the exact commands for install, build, test (all and single test), lint and format. Confirm each command appears in a manifest, script or CI file. Do not run commands that change state beyond a local build or test.
4. Write a short architecture overview: main components, how they talk to each other, and where new code of each kind should go.
5. Document internal APIs and helpers an agent should reuse instead of re-creating, with the module path for each.
6. Write conventions as concrete rules, each with a short example where it helps: naming, error handling, logging, test placement.
7. Add a security section: where secrets live and that they must never be committed, input validation expectations, and any code that needs human security review.
8. Add a testing rule: new behaviour needs tests, and tests must not be deleted, skipped or weakened without explaining why in the pull request.
9. List files and directories the agent must not edit (generated code, vendored code, migrations already applied).
10. Add a "Lessons learned" section and turn each reported agent mistake into one short rule.
11. Keep the file short. Link to longer docs instead of copying them.
12. Return the file content. Write or overwrite the file only if the user asks, and never commit.

## Output format

Return the file content, then a change note. Do not write the file unless the user asks, and never commit.

```markdown
# <Project name> — agent instructions

## Commands

- Install: `<command>`
- Build: `<command>`
- Test (all / single): `<command>` / `<command>`
- Lint and format: `<command>`

## Architecture

<short overview, where new code goes>

## Reuse these

- `<module path>` — <what it does>

## Conventions

- <rule>

## Security

- <rule>

## Testing

- <rule>

## Do not edit

- `<path>` — <reason>

## Lessons learned

- <rule from a past mistake>
```

```markdown
## Change note

- Added: <sections or rules>
- Changed: <what and why>
- Unverified: <commands or facts you could not confirm>

### Assumptions and open questions

- <assumption or question, and who can confirm>
```

## Watch out for

- Commands copied from a README that no longer match the build scripts or CI.
- Describing the architecture the team wants rather than the one that exists. Write what the code shows and flag differences.
- Long files that bury the important rules. Commands and "do not" rules should be near the top.
- Rules that are vague ("write clean code"). Each rule should be something a reviewer can check.
- Internal hostnames copied into the file from configuration.
- Never reproduce secrets, tokens, credentials or personal data in the output; refer to them by location and type, and tell the user to rotate anything exposed.
- Deleting team-written rules because you cannot see why they exist; ask instead.

## Before you finish

- [ ] Every command was confirmed in a script, manifest or CI file, or is marked unverified.
- [ ] Every module path in "Reuse these" exists.
- [ ] Security and testing rules are present.
- [ ] No secrets or sensitive values appear in the file.
- [ ] Existing team content was kept or its removal is explained in the change note.
- [ ] The file was written only if the user asked, and nothing was committed.
- [ ] Clearly flag your assumptions, unverified facts, and any rule a human must confirm before the file is committed.
