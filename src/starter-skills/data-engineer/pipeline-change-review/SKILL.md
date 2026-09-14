---
name: pipeline-change-review
description: Reviews a proposed change to a data pipeline or transformation model, often drafted by an AI agent, for correctness, grain changes, downstream impact and missing tests, and produces a review with suggested tests. Use when reviewing a pull request that touches SQL models, ELT jobs, schema changes or pipeline code, or when asked to "review this model change", "check this pipeline PR" or "what could this change break downstream".
---

# Pipeline Change Review

Review a change to a pipeline or transformation model so that wrong joins, duplicate rows or broken downstream reports are caught before the change is merged.

## What to gather first

Ask for anything missing before you start:

- The diff or pull request, and the stated reason for the change.
- Whether the change was written by a person, an AI agent or both.
- The current version of each changed model or job, and its documented grain and keys.
- The list of downstream models, dashboards or exports that depend on the changed outputs, if available.
- Existing tests for the affected models.
- Whether you may run read-only comparison queries in a development or staging environment.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Summarise the intent of the change in two or three sentences, and check that the diff does what the description says and nothing more.
2. List every changed output: tables, columns, data types, and column meanings. Mark each as added, removed, renamed or changed.
3. For each changed model, state the grain before and after the change. Treat any grain change as a high-risk finding.
4. Review joins, filters, deduplication logic and incremental logic (for example, how late or updated records are handled). Note any place where rows could be duplicated or dropped.
5. Trace downstream impact: which dependents read the changed columns, and what they would see after the change.
6. Compare with the existing model where possible. Draft read-only queries that compare row counts, distinct key counts, and totals of key measures between the old and new versions.
7. Check tests. List which existing tests cover the change, and propose missing ones: uniqueness and not-null on keys, accepted values, relationships between tables, and row count or freshness expectations.
8. Check for secrets, credentials, hard-coded environment names, or personal data newly exposed in outputs.
9. Check whether documentation and metric definitions need an update to match the change.
10. Write the review. Do not merge, deploy, backfill or drop anything; those are decisions for the owner.

## Output format

```markdown
## Pipeline change review: <PR or change name>

**Intent:** <2–3 sentences>
**Recommendation:** Ready to merge | Merge after fixes | Needs discussion

### Changed outputs

| Object | Change | Grain before | Grain after | Downstream users |
| ------ | ------ | ------------ | ----------- | ---------------- |

### Findings

| #   | Severity (High/Medium/Low) | Location | Finding | Suggested fix |
| --- | -------------------------- | -------- | ------- | ------------- |

### Comparison checks (read-only)

<queries to run, and results if they were run>

### Missing tests to add

- <test> on <model.column> — <what it would catch>

### Docs and definitions to update

- <item>

### Assumptions and open questions

- <assumption or question, and who can confirm>
```

## Watch out for

- Agent-generated changes can be larger than the task needed. Flag unrelated edits and ask for them to be split out.
- Code that runs and passes existing tests can still be wrong if the tests never covered the changed logic.
- A renamed or retyped column can break dashboards and exports that are not in the project's dependency graph.
- Incremental models may look correct on a fresh build and still be wrong on the next incremental run.
- Backfills and full refreshes can be expensive or irreversible. Recommend them only as a decision for the owner.
- Never reproduce secrets, credentials or personal data in the output unless the user needs them. Use counts and masked examples instead of real customer records.

## Before you finish

- [ ] Grain before and after is stated for every changed model.
- [ ] Downstream impact is listed, or the output says it could not be traced.
- [ ] Each high-severity finding has a suggested fix or a question for the author.
- [ ] Missing tests are proposed for the risky parts of the change.
- [ ] Nothing was merged, deployed, backfilled or deleted.
- [ ] Clearly flag every assumption, and anything a human must review or decide before merging.
