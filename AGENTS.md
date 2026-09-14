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

## Content rules

- Every `shifts[]` item needs at least one `sourceIds` entry that exists in that role's `sources`. Tool recommendations and risks that make a factual claim cite sources too.
- **No statistics** (e.g. "55% faster") unless the source contains that exact figure; put the quote in the source's `quote` field.
- AI-era claims use sources published 2024 or later. Older sources only for "traditional" claims.
- Tools must be real, currently active products as of `lastReviewed`. Use the official product URL.
- `recommendation: should` = widely adopted, fits the role's core work, free tier or industry standard. Everything else is `could`.
- Caps per role: 5–8 shifts, 4–8 tools, 3–8 sources.
- Neutral, practical tone. No vendor hype, no "revolutionize". Write for a practitioner, in plain English.
- `first30Days` and the Markdown body are editorial opinion and are labeled as such on the page.
- The site is a snapshot as of `lastReviewed`; do not write "latest" or "new" without a date.
- Research subagents never edit `src/data/tools.yaml`; they propose tools and the main session merges them (avoids parallel write conflicts).

## Lessons learned

<!-- Add a bullet each time Claude makes a mistake worth preventing. -->
