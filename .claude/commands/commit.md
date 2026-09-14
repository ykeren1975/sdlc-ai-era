---
description: Commit the current changes with a good message
allowed-tools: Bash(git status), Bash(git diff *), Bash(git add *), Bash(git commit *), Bash(git log *)
---

## Context

- Status: !`git status`
- Diff summary: !`git diff HEAD --stat`
- Recent commits: !`git log --oneline -10`

## Task

Stage the relevant changes (never secrets, build output, or test artifacts) and create one commit.
Message: imperative subject under 72 chars, then a short body explaining _why_. Match the style of recent commits.
Do not push.
