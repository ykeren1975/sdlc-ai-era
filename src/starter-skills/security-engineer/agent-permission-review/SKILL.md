---
name: agent-permission-review
description: Reviews the tools, integrations, credentials and autonomy granted to an AI agent, assistant or MCP server setup, checking for the combination of private data access, exposure to untrusted content and a way to send data out, plus over-broad permissions, and drafts least-privilege recommendations. Use before connecting an agent or MCP server to real systems, when auditing an AI feature's tool access, reviewing agent credentials or scopes, or assessing prompt injection and data exfiltration risk.
---

# Agent Permission Review

Map what an AI agent can read, what untrusted content reaches it and what it can do, then draft recommendations to narrow its access.

## What to gather first

Ask for anything missing before you start:

- A description of the agent or AI feature and the tasks it is meant to do.
- Its configuration: tools, integrations or MCP servers, and the permissions or scopes of each.
- The credentials it uses (service account, user token, API key) and who owns them.
- Where its inputs come from: users, documents, web pages, email, tickets, repositories, other agents.
- Which actions run without human approval.
- Logging and monitoring in place for the agent's actions.

Do not ask for secret values. Names and scopes of credentials are enough.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. List every tool or integration the agent can call. For each, record what it can read, what it can write or change, and whether it can send data outside the organisation.
2. List every source of content that reaches the agent's context. Mark each source as trusted (controlled by the organisation) or untrusted (anyone outside can influence it, including public issues, inbound email, web pages and uploaded files).
3. Check for the risky combination. Mark whether the agent, as configured, has all three of: access to private data, exposure to untrusted content, and any way to communicate externally (sending messages, creating public content, making web requests, writing to places others can read). Check this across all tools together, and within single tools.
4. For each capability, compare the granted scope with what the stated tasks need. Flag broad scopes, write access that is never needed, shared or personal credentials, and long-lived tokens.
5. Walk through prompt injection scenarios: for each untrusted source, describe what hidden instructions could make the agent do with its current tools.
6. Review autonomy. Classify each action as read-only, reversible or destructive, and check which of them run without human approval.
7. Review identity: whether the agent's actions can be told apart from a human user's in logs, and whether its access can be revoked quickly.
8. Review supply chain: where each tool or MCP server comes from, who maintains it, and how updates are controlled.
9. Draft recommendations in order of risk reduction. Prefer removing one leg of the combination; treat filters as a secondary layer, not the main defence.
10. Do not change any configuration, revoke credentials or call the agent's tools yourself. Recommendations are for humans to apply.

## Output format

```markdown
## Agent permission review: <agent or feature name>

- **Purpose:** <one sentence>
- **Risky combination present:** Yes / No / Unclear
- **Overall risk (proposed):** High / Medium / Low

### Capabilities

| Tool or integration | Reads | Writes or acts | Can send data out | Credential and scope | Needed for tasks? |
| ------------------- | ----- | -------------- | ----------------- | -------------------- | ----------------- |

### Content sources

| Source | Trusted / Untrusted | How it reaches the agent |
| ------ | ------------------- | ------------------------ |

### Risky combination check

- Private data access: <tools>
- Untrusted content exposure: <sources>
- External communication: <tools>

### Injection scenarios

| Untrusted source | Hidden instruction example | Possible outcome with current tools |
| ---------------- | -------------------------- | ----------------------------------- |

### Autonomy

| Action | Read-only / Reversible / Destructive | Human approval required? |
| ------ | ------------------------------------ | ------------------------ |

### Recommendations

| #   | Recommendation | Risk reduced | Effort | Owner to decide |
| --- | -------------- | ------------ | ------ | --------------- |

### Assumptions and open questions

- <assumption or question, and who can confirm>
```

## Watch out for

- Single tools that combine all three risky capabilities, such as one integration that reads private repositories, reads public issues and creates pull requests.
- Hidden channels for sending data out: rendered images or links, web fetches, comments, commit messages, tickets visible to outsiders.
- Relying on guardrail or detection filters as the main defence.
- Agents running with a person's full credentials instead of a scoped identity.
- Memory or retrieved context that can be poisoned by earlier untrusted input.
- Configuration described in documents that differs from what is actually deployed. Say which one you reviewed.
- Never reproduce secrets, tokens, credentials or personal data from configs, logs or documents in the output; refer to them by location and type, and tell the user to rotate anything exposed.

## Before you finish

- [ ] Every tool, content source and credential is listed with its scope.
- [ ] The risky combination check is completed across all tools together.
- [ ] Every action is classified and its approval requirement stated.
- [ ] No secret values were requested or recorded, and no configuration was changed.
- [ ] Clearly flag your assumptions, whether you reviewed documented or deployed configuration, and the risk acceptance decisions a human must make.
