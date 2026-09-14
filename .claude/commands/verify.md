---
description: Run the full verification loop (check, build, links, tests, visual check)
---

Run the verification loop for this project, in order, stopping at the first failing step to diagnose it:

1. `npm run check`
2. `npm run build`
3. `npm run check:links`
4. `npm test`
5. Visual check: start `node scripts/serve-dist.mjs 4330` in the background (not `astro preview`) and open `http://localhost:4330/sdlc-ai-era/`, open the home page and one role page with the Playwright browser tools at 1280px and 360px wide, take screenshots, and actually look at them for layout problems (overflow, overlapping, unreadable contrast, empty sections). Stop the preview server afterwards.

For each failure: show the relevant error output, identify the root cause, and fix it if the fix is clear. Re-run from the failing step. If the same kind of mistake is likely to recur, propose a one-line rule for the "Lessons learned" section of CLAUDE.md.

End with a short table: step, pass/fail, notes.
