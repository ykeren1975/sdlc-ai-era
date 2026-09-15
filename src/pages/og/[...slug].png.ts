// Build-time link preview images: /og/index.png, /og/roles/<id>.png, /og/phases/<phase>.png, /og/about.png, /og/agent-skills.png.
import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { renderOgImage, type OgCard } from "../../lib/og";
import { evidence, formatDate } from "../../lib/role";
import { PHASES, PHASE_LABELS } from "../../lib/taxonomy";

export const getStaticPaths = (async () => {
  const roles = (await getCollection("roles")).sort(
    (a, b) => a.data.order - b.data.order,
  );
  const tools = await getCollection("tools");
  const sourceCount = roles.reduce((n, r) => n + r.data.sources.length, 0);

  const cards: { slug: string; card: OgCard }[] = [
    {
      slug: "index",
      card: {
        eyebrow: "Role-by-role guide",
        title: "What changes for *you* when software is built with AI?",
        subtitle: `${roles.length} roles · ${tools.length} tools · ${sourceCount} cited sources`,
        footer:
          "How each SDLC role’s work, tools and skills shift, with sources",
        titleSize: 72,
      },
    },
    {
      slug: "about",
      card: {
        eyebrow: "About",
        title: "About & method",
        subtitle:
          "What this site is, how its content was researched and checked, and how sources are labelled.",
        footer: `${roles.length} roles · ${sourceCount} cited sources`,
        titleSize: 76,
      },
    },
    {
      slug: "agent-skills",
      card: {
        eyebrow: "Guide",
        title: "Agent Skills guide",
        subtitle:
          "What Agent Skills are, how to use one, and copy-ready starter skills for every SDLC role.",
        footer: `Starter skills for ${roles.length} roles`,
        titleSize: 76,
      },
    },
  ];

  for (const role of roles) {
    const { total, independent } = evidence(role.data.sources);
    cards.push({
      slug: `roles/${role.id}`,
      card: {
        eyebrow: "Role guide",
        title: role.data.title,
        subtitle: role.data.tagline,
        bullets: role.data.shifts
          .filter((s) => s.highlight && s.takeaway)
          .slice(0, 3)
          .map((s) => s.takeaway!),
        footer: `${independent} of ${total} sources independent · Last reviewed ${formatDate(role.data.lastReviewed)}`,
      },
    });
  }

  for (const phase of PHASES) {
    const inPhase = roles.filter((r) =>
      r.data.shifts.some((s) => s.phase === phase),
    );
    if (inPhase.length === 0) continue;
    const changes = inPhase.reduce(
      (n, r) => n + r.data.shifts.filter((s) => s.phase === phase).length,
      0,
    );
    cards.push({
      slug: `phases/${phase}`,
      card: {
        eyebrow: "Lifecycle phase",
        title: `What changes in ${PHASE_LABELS[phase]}`,
        subtitle: `${inPhase.length} ${inPhase.length === 1 ? "role" : "roles"} · ${changes} ${changes === 1 ? "change" : "changes"}`,
        footer: `Every change this guide lists for the ${PHASE_LABELS[phase]} phase`,
        titleSize: 76,
      },
    });
  }

  return cards.map(({ slug, card }) => ({ params: { slug }, props: { card } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ card: OgCard }> = async ({ props }) => {
  const png = await renderOgImage(props.card);
  return new Response(png, { headers: { "Content-Type": "image/png" } });
};
