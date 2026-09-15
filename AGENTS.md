# SDLC in the AI Era

A static website: a visitor picks their SDLC role and sees what changes for them in the AI era — traditional vs. AI-era way of working, tools, skills, risks — with cited sources.

`CLAUDE.md` is a symlink to this file. Update it whenever Claude gets something wrong (see "Lessons learned").

## Stack

- Astro 7 (static output), Tailwind CSS 4 via `@tailwindcss/vite`, TypeScript strict
- Content collections in `src/content.config.ts` (`z` from `astro/zod`, loaders from `astro/loaders`)
- Playwright + `@axe-core/playwright` for tests; Prettier (+ `prettier-plugin-astro`) runs automatically after every edit via a hook (needs `jq`)
- Deployed to GitHub Pages under a base path — **never hardcode internal links**; use `url()` from `src/lib/url.ts`

## Commands

- `npm run dev` — dev server (in Claude sessions: `npx astro dev --background`, stop with `npx astro dev stop`)
- `npm run check` — `astro check` (types + content schema)
- `npm run build` — static build to `dist/`
- `npm run check:links` — every external URL in content must resolve
- `npm test` — Playwright (builds and previews the site itself)
- `/verify` runs all of the above in order

## Definition of done

`check`, `build`, `check:links`, and `test` all pass, and the change was looked at in a browser (screenshots at desktop and 360px).

## Project layout

- `src/data/tools.yaml` — the single list of tools (id, name, vendor, url, category, status, lastVerified)
- `src/content/roles/<id>.md` — one file per role; file name is the id (no `slug` field)
- `src/components/`, `src/layouts/Base.astro`, `src/pages/`
- `scripts/check-links.mjs`, `tests/`

## Roles (id → order, icon)

Order follows the SDLC flow on the home page.

| id                  | title                         | order | icon           |
| ------------------- | ----------------------------- | ----- | -------------- |
| product-manager     | Product Manager / Owner       | 10    | compass        |
| business-analyst    | Business Analyst              | 20    | clipboard-list |
| ux-designer         | UX/UI Designer                | 30    | pen-tool       |
| software-architect  | Software Architect            | 40    | layers         |
| developer           | Software Developer / Engineer | 50    | code           |
| qa-tester           | QA Engineer / Tester          | 60    | flask-conical  |
| security-engineer   | Security Engineer             | 70    | shield-check   |
| devops-sre          | DevOps / SRE Engineer         | 80    | server-cog     |
| data-engineer       | Data Engineer / Analyst       | 90    | database       |
| project-manager     | Project Manager               | 100   | chart-gantt    |
| scrum-master        | Scrum Master / Agile Coach    | 110   | refresh-cw     |
| engineering-manager | Engineering Manager           | 120   | users          |

## Content rules

- Every `shifts[]` item needs at least one `sourceIds` entry that exists in that role's `sources`. Tool recommendations and risks that make a factual claim cite sources too.
- **No statistics** (e.g. "55% faster") unless the source contains that exact figure; put the quote in the source's `quote` field.
- AI-era claims use sources published 2024 or later. Older sources only for "traditional" claims.
- Tools must be real, currently active products as of `lastReviewed`. Use the official product URL.
- `recommendation: should` = widely adopted, fits the role's core work, free tier or industry standard. Everything else is `could`.
- Caps per role: 5–8 shifts, 4–8 tools, 3–8 sources.
- Neutral, practical tone. No vendor hype, no "revolutionize". Write for a practitioner, in plain English.
- `first30Days`, the Markdown body, tool tiers and starter skills are editorial. They are labelled **"Our suggestion"** on the page, never presented as sourced claims.
- **Risk headlines:**
  - Each risk has a `headline` (≤90 characters) that condenses that risk's own `text`: state the risk plainly first, and keep any attribution the text needs ("In one study…").
  - Exactly 1 risk per role has `highlight: true`, shown in the summary.
- **Starter skill display fields:** each `SKILL.md` has `metadata.title` (readable title) and `metadata.summary` (≤90 characters, condenses its own `description`, with no new capabilities).
- **Skimmable layer:**
  - `tagline` (≤70 chars) condenses the role `summary`.
  - Each shift's `headline` (≤80 chars) condenses **that shift's own `aiEra` text**.
  - Neither may add facts, names, numbers, digits, "%" or comparatives that aren't in the text it condenses.
  - Exactly 3 shifts per role have `highlight: true`: the ones that matter most for day-to-day work.
- **Agent skills:**
  - Ready-made skills live in `src/data/agent-skills.yaml`. Each description paraphrases that skill's own `SKILL.md`, and each license comes from its folder.
  - Starter skills are real skill folders at `src/starter-skills/<role>/<skill-name>/SKILL.md` and must follow the agentskills.io spec:
    - `name` is lowercase-hyphenated, ≤64 characters and matches its folder;
    - `description` is ≤1024 characters and says what the skill does **and when to use it** ("Use when…");
    - the body stays under 150 lines.
  - A starter skill's body covers: purpose, inputs to gather, numbered steps, output format, edge cases, and a closing "Before you finish" check that flags what needs human review.
  - Starter skills are editorial: no statistics or factual claims, no `allowed-tools`, no instructions to send data to external services, and no vendor lock-in unless the skill is inherently about that tool.
- **Source types:** every source has a `type` and `vendorAffiliated`.
  - `type` is judged by what the cited page _is_, not who wrote it:
    - `research`: an academic paper or preprint (arXiv, conference, journal).
    - `survey`: a report built on questionnaire or interview responses from many people.
    - `official`: guidance from a standards body, professional association, government, framework authors (e.g. Scrum Guide), or an open-source foundation or project documenting its own standard.
    - `vendor`: a company's documentation, product page, blog or case study about its own product, customers or internal practice.
    - `practitioner`: an individual expert's or consultancy's article, newsletter, blog or technology radar.
    - `news`: journalism or news analysis (e.g. InfoQ).
  - `vendorAffiliated: true` when the publisher sells products or services in the topic's space. For example, a Productboard survey about PM tools is `survey` plus affiliated, and a Thoughtworks Radar entry is `practitioner` plus affiliated (consultancy). Academic papers, standards bodies, journalists and independent individuals are `false`.
  - When unsure, choose the more cautious label (`vendor` over `practitioner`, `vendorAffiliated: true`).
- **Deploy checklist:** when the site is published to GitHub Pages, remove the "available once published" note on the About page and add `https://github.com/ykeren1975/sdlc-ai-era/issues` to `check:links`.
- The site is a snapshot as of `lastReviewed`; do not write "latest" or "new" without a date.
- Research subagents never edit `src/data/tools.yaml`; they propose tools and the main session merges them (avoids parallel write conflicts).

## Lessons learned

<!-- Add a bullet each time Claude makes a mistake worth preventing. -->

- **Don't pad a sourced sentence with unsourced detail.** Developer pilot: true claims got extra clauses no cited source had ("agents run tests as they work", "AI reviewers give a first pass", "small batches"). Every clause of an `aiEra` sentence must be in a cited source, or be cut.
- **Don't turn one person's quote into a group finding.** "One engineer estimated…" never becomes "engineers report…". Comparative words ("far more", "most", "increasingly") need a source that actually compares.
- **A `quote` is one continuous passage from the page.** Never stitch sentences with "…", never reorder them, and never drop a lead-in like "They estimated…" that changes who is making the claim (Business Analyst batch).
- **Keep caveats the source gives about itself.** Small samples ("three epics", "55 respondents"), model vintage ("LLMs available in 2024") and the base of a percentage stay in the text; don't write "of respondents" unless the page says so (QA batch).
- **Tool `useFor` lines describe only what the cited source or official page says.** No added capabilities ("hosted"), no comparisons with other tools ("more control than…"), no invented causes ("which is why…") (UX, DevOps batch).
- **WebFetch summarises pages and can garble exact wording.** When a verbatim quote is disputed, check the raw page: `curl -sL <url> | sed 's/<[^>]*>/ /g' | grep -o "<phrase>.\{0,120\}"` (Engineering Manager batch: WebFetch said "deploy them", the page says "oversee their work").
- **Short headlines drift in two predictable ways** (redesign, 22 of 90 flagged):
  - They turn a description into advice ("Review…", "Coach…", "Let agents…").
  - They turn one product, company or study into a general claim ("agents can…" when only Jira's agent does).

  Keep the subject ("In Veracode's tests…", "At Google…") and only use an imperative when the source recommends it.

- **Test a skill by running it, not just linting it.** Smoke tests gave 3 skills only their `SKILL.md` and a realistic input (Agent skills batch). They found problems no linter or reviewer caught: nowhere in the output to record assumptions, a numbered step glued onto a bullet, and confidence rules that contradicted the template.
  - Every starter skill now ends its output with `### Assumptions and open questions`.
  - "What to gather first" says: ask once, then proceed and record assumptions.
- **Skills that read code, logs, data or tickets must say "never reproduce secrets or personal data in the output"**, and skills must not overlap in triggers. Where two roles need related skills, each description states the boundary (e.g. team working agreement vs manager-owned AI policy).
- **Inline elements at a line break lose their space.** When Prettier wraps `word` and `<code>`/`<strong>`/`<a>` onto separate lines, Astro renders them glued ("orDownload"). End such lines with `{" "}` (found on the guide page three times).
- **After adding tests, confirm the test count went up** (`npx playwright test --list | tail -1`). A `grep && sed && cat >>` chain once stopped at a grep that found nothing, so the new tests were never written, yet the suite still showed "all passed" (UX batch).
- **Wrap frontmatter strings containing `: ` or `#` in double quotes.** An unquoted colon in a `quote` broke YAML parsing for the whole site (DevOps batch). Run `npm run check` before reporting a role as written.
- **Don't generalise from one company or a niche group.** Findings about one vendor's own staff (e.g. Anthropic's internal study) are written as "At <company>, …", not as industry-wide truths. Use surveys for "most developers".
- **Don't use `astro preview` from Claude sessions or tests.** Astro 7 detects AI agents and backgrounds the preview with a lock file, which breaks Playwright's `webServer`. Tests serve `dist/` with `node scripts/serve-dist.mjs <port>`. For a manual look, run the same script in the background.
- **Recheck vendor reports for a newer edition.** Annual reports (Veracode, DORA, Stack Overflow, State of DevOps) get updated. Before citing one, search for a newer edition, and date claims from older studies ("early-2025 tools").
- **One `quote` backs one statistic.** A source has a single `quote` field, so a second figure from the same page ("only 40%…") has no quoted passage, even if the page says it. Cite a second figure only if it's in the same continuous quote; otherwise drop it (Product Manager risk, found by a persona walkthrough after fact-checking passed).
- **arXiv papers change between versions.** Date the version you quote, not v1, and pin the URL to it (`/abs/<id>v2`). In the Product Manager batch, two papers were dated from v1, but the quoted wording and sample sizes only appeared in later versions (one v1 was a different study).
- **Check every author's affiliation on the paper itself, not just the venue.** A peer-reviewed paper can still be vendor-affiliated: the Product Manager vibe-coding paper had co-authors at Notion Labs and Collov AI, and two checkers passed it as independent before a later research agent spotted it. Fact-checkers without a shell can't read arXiv PDFs; extract the text (`pypdf` in a scratchpad venv) before accepting "unverifiable".
