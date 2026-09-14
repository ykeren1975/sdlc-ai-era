---
description: Research, write, fact-check and verify a new SDLC role page
argument-hint: <role name>
---

Add the role "$ARGUMENTS" to the site.

Existing roles: !`ls src/content/roles`
Existing tool ids: !`grep -E '^- id:' src/data/tools.yaml`

1. **Research**: launch the `role-researcher` subagent for "$ARGUMENTS". Give it the list of existing tool ids above so it reuses them. It writes `src/content/roles/<id>.md` and returns proposed new tools.
2. **Merge tools**: add the proposed tools to `src/data/tools.yaml` yourself (dedupe by id and by product name; keep ids kebab-case).
3. `npm run check` and `npm run check:links`. Fix broken URLs (find the real page, or drop the claim).
4. **Fact-check**: launch the `fact-checker` subagent on the role file. It must not edit anything.
5. **Fix** every `unsupported` claim (rewrite to match the source, find a better source, or remove it). A role passes with 0 unsupported and at most 2 unverifiable claims.
6. Run `/verify`.
7. Report: what was added, fact-check summary before/after fixes, and any rule worth adding to CLAUDE.md.
