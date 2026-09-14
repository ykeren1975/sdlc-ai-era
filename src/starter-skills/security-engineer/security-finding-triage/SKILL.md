---
name: security-finding-triage
description: Triages a security finding or vulnerability report, whether from a scanner, an AI tool or an external researcher, by checking whether it is real, reachable and exploitable in this codebase, rating severity and drafting a prioritised recommendation and reply. Use when handling scanner alerts, bug bounty or disclosure reports, AI-generated vulnerability reports, a backlog of security findings, or when asked "is this vulnerability real" or "how serious is this".
metadata:
  title: "Security finding triage"
  summary: "Checks if a reported vulnerability is real and exploitable, rates severity, drafts a reply"
---

# Security Finding Triage

Decide whether a reported security issue is real and exploitable here, and draft a prioritised recommendation for a human to confirm.

## What to gather first

Ask for anything missing before you start:

- The finding or report text, including any proof of concept, affected file, endpoint, version or rule ID.
- The source: scanner, AI tool, internal reviewer or external reporter.
- The repository and the deployed version or branch the report applies to.
- How the affected component is deployed and exposed (internet-facing, internal, behind authentication).
- The team's severity scale, disclosure policy and response time targets.
- Whether you may run the application or tests locally. Never test against production or systems you are not authorised to test.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Restate the claim in one sentence: what weakness, where, and what an attacker could achieve.
2. Check the report for signs of low quality: references to files, functions or versions that do not exist, generic text not tied to this code, or an impact that does not follow from the described flaw. Verify every reference in the repository before reasoning further.
3. Locate the vulnerable code. Confirm it exists in the affected version and is not dead, test-only or already fixed.
4. Trace reachability: follow the data from an entry point an attacker can control to the vulnerable code. Note every validation, encoding, authorisation or configuration step on the way.
5. Identify preconditions: authentication level, user role, feature flags, configuration, deployment settings.
6. Judge exploitability. If a proof of concept is provided, decide whether it would work against this code. Read the full PoC before running; never run obfuscated code or code that makes network calls; only run it in a sandbox with no credentials or network access, and only with permission. Never run it against shared or production systems.
7. Assess impact on confidentiality, integrity and availability, and what data or systems are exposed.
8. Rate severity using the team's scale, showing the factors that drove the rating. If there is no scale, use Critical, High, Medium, Low and explain each rating.
9. Check for duplicates: the same flaw reported before, the same pattern elsewhere in the codebase, or the same issue in a dependency.
10. Propose a remediation direction and any short-term mitigation. Do not write or apply the fix as part of triage.
11. Draft a reply to the reporter that is factual and polite, and does not reveal details beyond what the disclosure policy allows. Do not send the reply or contact the reporter.

## Output format

```markdown
## Triage: <finding title or ID>

- **Source:** <scanner / AI tool / researcher / internal>
- **Verdict:** Confirmed / Likely / Not reproducible / Not applicable / Duplicate of <ID>
- **Proposed severity:** <rating> — needs human confirmation
- **Confidence:** High / Medium / Low

### Claim

<one sentence>

### Evidence

| Check                           | Result | Reference (file:line, config, commit) |
| ------------------------------- | ------ | ------------------------------------- |
| Code exists in affected version |        |                                       |
| Reachable from attacker input   |        |                                       |
| Existing controls on the path   |        |                                       |
| Preconditions                   |        |                                       |
| Proof of concept assessed       |        |                                       |

### Impact

<what an attacker gains, what data or systems are affected>

### Related findings

- <duplicates or same pattern elsewhere>

### Recommended next steps

1. <mitigation or fix direction, owner to be decided>

### Draft reply to reporter

<text>

### Assumptions and open questions

- <assumption or question, and who can confirm>
```

## Watch out for

- Scanner output and AI-written reports are a first filter, not a verdict. Open the code for anything that matters.
- Reports that are fluent and detailed but point at code that does not exist or cannot be reached.
- Dismissing a report too quickly because its writing looks generated. Check the substance.
- Severity inflation or deflation driven by the reporter's wording rather than reachability and impact.
- A controls check that stops at the first validation step; confirm it actually blocks the attack.
- Sharing report details, code or secrets with anyone or any service outside the team's approved channels.
- Never reproduce secrets, tokens, credentials or personal data from the report, code or logs in the output; refer to them by location and type, and tell the user to rotate anything exposed.
- A large queue of findings. Record verdicts consistently so the team can prioritise patching.

## Before you finish

- [ ] Every file, function and version in the report was checked in the repository.
- [ ] Reachability and preconditions are backed by references.
- [ ] Severity shows the factors behind it and is marked as a proposal.
- [ ] Nothing was tested against production or unauthorised systems.
- [ ] Any PoC was read in full first and run only with permission, in a sandbox with no credentials or network access.
- [ ] The reporter reply follows the disclosure policy. Do not send the reply or contact the reporter.
- [ ] Clearly flag your assumptions, your confidence, and the severity, disclosure and fix decisions a human must make.
