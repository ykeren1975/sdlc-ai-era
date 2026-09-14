---
name: team-ai-policy-draft
description: Drafts a manager-owned team AI tool policy for approval, within the organisation's rules, covering approved tools, what code and data may go into them, agent permissions, spend limits, minimum review and testing requirements, how usage data will and will not be used, and a plan to walk the team through it. Day-to-day team norms (Definition of Done for AI-assisted work, review pairing, retrospective questions) belong in a team-authored working agreement instead. Use when a team adopts AI coding tools or agents, when policy is unclear or out of date, or when asked to "write our AI policy", "which AI tools are we allowed to use" or "set rules for AI agents and data".
---

# Team AI Policy Draft

Draft a short, practical AI tool policy for an engineering team that fits the organisation's rules. The engineering manager owns it and it needs approval before it applies. It sets the boundaries; the team then agrees its own working norms inside them.

## What to gather first

Ask for anything missing before you start:

- The organisation's existing AI, security, data protection and procurement policies.
- The AI tools the team uses or wants to use, and whether each is approved or licensed.
- The kinds of code and data the team handles (for example customer data, credentials, regulated data, open-source code).
- Current review, testing and release practices.
- Whether agents can act on their own (open pull requests, run commands, access environments).
- Budget limits and who owns AI tool spend.
- Who must approve the policy (for example security, legal or the engineering leadership).

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Summarise the organisation-level rules that apply. If a rule is missing or unclear, list it as a question for the approvers.
2. List approved tools and what each may be used for. Mark tools the team wants but that are not approved as "pending approval".
3. Define data rules: what may go into each tool, and what must never go in (for example secrets, customer personal data, or code under restrictive licences).
4. Set minimum review and testing requirements: AI-generated code is reviewed like any other code, the author is accountable for it, and tests are not skipped. Leave how the team meets them (Definition of Done details, review pairing, change size) to the team's working agreement.
5. Define agent permissions: what agents may do without a human (for example draft a pull request) and what always needs a human (for example merging, deploying, or touching production data).
6. Set spend limits and who owns them, describe how usage and spend are tracked, who can see the data, and state that usage metrics will not be used for individual performance evaluation.
7. Describe how people ask for a new tool or an exception, and who decides.
8. Draft a short plan to walk the team through the policy, collect questions, invite the team to agree its own working norms within it, and set a review date.
9. List who must approve the policy and what each approver needs to confirm.
10. Produce the draft for approval. Do not publish it, change tool settings or grant access.

## Output format

```markdown
# AI tool policy (draft): <team>

**Owner:** <engineering manager> | **Approvers:** <roles> | **Status:** Draft, not in force until approved | **Review date:** <date>

## Purpose

<two sentences>

## Approved tools

| Tool | Approved for | Not approved for | Status |
| ---- | ------------ | ---------------- | ------ |

## Data rules

- May go into approved tools: <list>
- Must never go into AI tools: <list>

## Minimum review and testing requirements

- <requirement>
- Team norms for meeting these live in the team's AI working agreement.

## Agent permissions

| Action | Agent may do alone | Needs a human |
| ------ | ------------------ | ------------- |

## Usage and spend

- What is tracked: <…>
- Who can see it: <…>
- Usage data is not used for individual performance evaluation.
- Spend limits: <…>

## Requests and exceptions

- <process and decision owner>

## Rollout plan

- <walkthrough session, Q&A, team working agreement session, review date>

## Assumptions and open questions

- <assumption or question for approvers, and who can confirm>
```

## Watch out for

- A team policy cannot loosen organisation policy. Flag conflicts instead of resolving them.
- Vague rules ("be careful with data") do not help. Give concrete examples of allowed and forbidden inputs.
- Keep review and testing expectations firm regardless of change volume.
- Keep day-to-day team norms out of the policy. The team owns those in its working agreement.
- Output metrics such as code volume are easy to game. Do not set targets based on them.
- Tool choice may be constrained by procurement. Note this rather than recommending unapproved tools.
- Agents with broad permissions can take irreversible actions. Default to requiring a human for anything that merges, deploys, deletes or touches production.
- A policy nobody has read has no effect. Include the walkthrough plan.

## Before you finish

- [ ] Every rule is consistent with the organisation policies provided, or the conflict is flagged.
- [ ] Data rules include concrete examples.
- [ ] Irreversible agent actions require a human.
- [ ] The policy states usage data is not used for individual performance evaluation.
- [ ] Nothing was published, configured or granted.
- [ ] Clearly flag every assumption, and anything the engineering manager or approvers must review or decide.
