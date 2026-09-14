---
name: team-ai-working-agreement
description: Drafts a team-authored working agreement on how the team works with AI tools and agents inside an existing organisation or team AI policy, covering a Definition of Done for AI-assisted work, review pairing, change size, sharing skills and how the team inspects AI use in retrospectives, with open questions for the team to decide. It does not approve tools, set data rules, agent permissions or spend; those belong in the manager-owned team AI policy. Use when a team starts using AI coding or writing tools under an existing policy, when refreshing working agreements, or when asked to "draft an AI working agreement", "agree team norms for AI" or "how should our team work with AI".
---

# Team AI Working Agreement

Draft team norms that the team can discuss, change and adopt, so AI tools help the work while humans stay accountable for it. The agreement sits inside your AI policy: the policy (owned and approved by management) decides which tools and data are allowed; the team decides how it works day to day.

## What to gather first

Ask for anything missing before you start:

- The name of the AI policy that applies to the team, so the agreement can point to it rather than repeat it.
- The AI tools and agents the team currently uses.
- The team's current working agreements and Definition of Done.
- The team's review practice for code and other work.
- Known concerns from the team (quality, over-reliance, skills, uneven use).
- When and how the team will discuss the draft.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Note which AI policy applies. Do not restate or change tool approvals, data rules, agent permissions or spend; write "Follow your organisation's AI policy" and link to it. If no policy exists, flag this as a blocker for the engineering manager to resolve.
2. List the team's work types (for example code, tests, stories, documentation, meeting notes) and, for each, propose how the team works with AI within the policy: AI drafts and a person reviews, AI assists a person, or the team prefers to work without it. Mark each as a proposal.
3. State accountability: the person who submits AI-assisted work is accountable for it, and AI-generated code gets the same review rigour as a teammate's.
4. Propose a Definition of Done for AI-assisted work: tests are not skipped, reviews are not shortened, the author can explain the change, and documentation still applies.
5. Propose review pairing: who reviews AI-assisted work, and when two people review or pair on large or unfamiliar AI output.
6. Propose a guideline on change size, for example splitting large AI-generated changes into smaller pull requests that can be reviewed properly.
7. Propose how the team will set aside time in Sprint Planning to validate AI output.
8. Propose ways to spread skills: pairing, sharing prompts that worked, and avoiding a single "AI expert" everyone depends on.
9. Propose how the team inspects AI use in retrospectives: a standing question on how AI helped or hindered, what to look at (review effort, rework, change size), and when to revisit the agreement.
10. List open questions where the team must choose. Produce the result as a draft for team discussion.

## Output format

```markdown
# AI working agreement (draft for team discussion): <team>

**Works within:** <policy name — follow your organisation's AI policy for tools, data, agent permissions and spend> or "No policy provided — blocker"
**Review date:** <proposed>

## Our principles

1. Humans stay accountable for all work, including work AI generated.
2. We follow our organisation's AI policy; this agreement only adds team norms.
3. <principle>

## How we work with AI

| Work type | AI drafts, person reviews | AI assists | We prefer not to use AI | Notes |
| --------- | ------------------------- | ---------- | ----------------------- | ----- |

## Definition of Done for AI-assisted work

- <agreement>

## Review pairing

- <agreement>

## Change size

- <agreement>

## Planning and validation time

- <agreement>

## Sharing skills

- <agreement>

## How we inspect AI use in retrospectives

- <retro question, what we look at, review cadence>

## Assumptions and open questions

- <question for the team> — options: <…>
- <assumption or question, and who can confirm>
```

## Watch out for

- An agreement written for the team, rather than with it, will not be followed. Keep every item a proposal.
- People can over-trust automated output and stop checking it. Build explicit review steps into the agreement.
- Speed can crowd out quality. Do not let the agreement relax tests or reviews to go faster.
- Uneven use (some people rely on AI heavily, others avoid it) is a coaching topic, not a rule violation.
- Do not use the agreement to monitor or rate individuals.
- A working agreement cannot override the AI policy. If a proposed norm conflicts with it, flag the conflict to the policy owner rather than resolving it.
- Questions about which tools are approved or what data may go into them belong to the policy owner, not the team's agreement.

## Before you finish

- [ ] The agreement points to the AI policy, or its absence is flagged as a blocker; no tool approvals or data rules are restated.
- [ ] Human accountability and review rigour are explicit.
- [ ] The Definition of Done is not weakened.
- [ ] There is a way to inspect and revise the agreement.
- [ ] Every item is marked as a proposal, with open questions listed.
- [ ] Clearly flag every assumption, and anything the team or Scrum Master must review or decide.
