---
name: iac-change-review
description: Reviews an infrastructure-as-code change, such as Terraform, CloudFormation, Kubernetes manifests, Helm charts or pipeline files, for security misconfigurations, blast radius, drift from the live environment, destructive operations and rollback, whether a person or an AI wrote it. Use when reviewing an infrastructure pull request, an AI-generated IaC change, a plan output before apply, or when asked "is this infrastructure change safe".
---

# IaC Change Review

Review an infrastructure-as-code change for security and operational risk, and draft findings before anyone applies it.

## What to gather first

Ask for anything missing before you start:

- The diff or pull request, and the environment(s) it targets.
- The plan or dry-run output, produced by the team's pipeline or a person with access.
- Results from the team's IaC security scanners and policy checks, if they ran.
- The purpose of the change and the ticket or request behind it.
- Relevant state: current resources, recent drift, ongoing migrations or maintenance windows.
- Organisation rules for network exposure, encryption, tagging, identity and cost.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Restate the intended change in one or two sentences. Flag changes in the diff that go beyond it.
2. Read the plan or dry-run output, not just the code. List every resource to be created, changed, replaced or destroyed. Treat replacements and destroys as high attention.
3. Check that the plan matches the diff. Unexpected changes can mean drift between code and the live environment, a provider or module version change, or state problems. Flag them; do not try to fix state.
4. Run a security pass on every changed resource, even when the code is well formed:
   - network exposure: open ingress, public endpoints, public storage;
   - identity and access: wildcard permissions, broad roles, long-lived keys;
   - encryption at rest and in transit, and key management;
   - logging, auditing and backups turned off or reduced;
   - secrets in code, variables, outputs or state.
5. Compare the scanner results with your own findings. Note findings the scanner missed and scanner findings that were suppressed, with the reason given.
6. Assess blast radius: which services, environments and teams depend on the changed resources.
7. Check data safety: databases, volumes, queues and buckets that could lose data on replace or destroy, and whether deletion protection is set.
8. Check timing and state: whether the change is safe given the current system state, such as in-flight deploys, configuration pushes, migrations or peak traffic.
9. Check rollback: how to reverse the change, and whether any part cannot be reversed.
10. Check versions and dependencies: pinned providers, modules, images and charts from expected sources.
11. Do not run apply, deploy, delete or any command that changes infrastructure or state. Read-only commands such as format checks or validation are fine if allowed.
12. Draft the review with a recommendation.

## Output format

```markdown
## IaC review: <PR or change title>

- **Target environment(s):** <env>
- **Recommendation:** Approve / Approve with changes / Block / Needs plan output
- **Irreversible operations present:** Yes / No

### Planned operations

| Resource | Operation (create / update / replace / destroy) | Expected from diff? | Data at risk? |
| -------- | ----------------------------------------------- | ------------------- | ------------- |

### Security findings

| #   | Severity            | Resource | Issue | Scanner caught it?    | Suggested fix |
| --- | ------------------- | -------- | ----- | --------------------- | ------------- |
| 1   | High / Medium / Low |          |       | Yes / No / Suppressed |               |

### Drift and unexpected changes

- <item, or "none found">

### Blast radius

- <dependent services and environments>

### State and timing check

- <current conditions that make this change safe or unsafe now>

### Rollback plan

- <steps, and what cannot be rolled back>

### Assumptions and open questions

- <assumption or question, and who can confirm>
```

## Watch out for

- Code that is syntactically valid and still insecure. Passing validation is not a security review.
- Relying on prompting or on the author's description; check every resource yourself and still require automated scanning.
- Replacements hidden behind small attribute changes that force a resource to be recreated.
- A change that is safe in one system state and unsafe in another, such as during a migration or configuration push.
- Scanner suppressions added in the same change without explanation.
- Reviewing code without the plan output. Say clearly that the review is incomplete.
- Secrets exposed through outputs, logs or state rather than source code.
- Never reproduce secrets, tokens, credentials or personal data in the output; refer to them by location and type, and tell the user to rotate anything exposed. Do not copy plan or state excerpts that contain sensitive values; mask them.

## Before you finish

- [ ] Every replace and destroy is listed with its data risk.
- [ ] The security pass covers every changed resource.
- [ ] Scanner results are compared with your findings, including suppressions.
- [ ] Current system state and timing were considered.
- [ ] No apply, deploy or state-changing command was run.
- [ ] No secret, token, credential or personal data value appears in the output; plan or state excerpts with sensitive values are masked, and anything exposed is flagged for rotation.
- [ ] Clearly flag your assumptions, whether plan output was available, and the approval and timing decisions a human must make.
