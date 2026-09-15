import { readFileSync } from "node:fs";
import path from "node:path";
import { getCollection, getEntry, type CollectionEntry } from "astro:content";

type RoleData = CollectionEntry<"roles">["data"];

export const STARTER_SKILLS_DIR = path.resolve("src/starter-skills");

/** A role's starter skills in authored order, with the exact SKILL.md file text. */
export async function getStarterSkills(roleId: string, names: string[] = []) {
  const all = await getCollection("starterSkills");
  return names.map((name) => {
    const entry = all.find((s) => s.id === `${roleId}/${name}`);
    if (!entry)
      throw new Error(
        `Starter skill "${roleId}/${name}" not found in src/starter-skills`,
      );
    const raw = readFileSync(
      path.join(STARTER_SKILLS_DIR, roleId, name, "SKILL.md"),
      "utf8",
    );
    const meta = entry.data.metadata ?? {};
    return {
      entry,
      raw,
      role: roleId,
      name,
      title: meta.title ?? name,
      summary: meta.summary ?? entry.data.description,
    };
  });
}

/** Resolve ready-made agent skill references. */
export async function resolveAgentSkills(items: RoleData["agentSkills"] = []) {
  return Promise.all(
    items.map(async (item) => {
      const entry = await getEntry(item.skill);
      if (!entry) throw new Error(`Unknown agent skill id "${item.skill.id}"`);
      return { ...item, entry };
    }),
  );
}

export const LICENSE_LABELS = {
  "open-source": "Open source",
  "source-available": "Source-available",
  "vendor-terms": "Vendor terms",
  unspecified: "No license file",
} as const;

/** Resolve tool references, "should" first, keeping authored order within each group. */
export async function resolveTools(tools: RoleData["tools"]) {
  const resolved = await Promise.all(
    tools.map(async (item) => {
      const entry = await getEntry(item.tool);
      if (!entry) throw new Error(`Unknown tool id "${item.tool.id}"`);
      return { ...item, entry };
    }),
  );
  return [
    ...resolved.filter((t) => t.recommendation === "should"),
    ...resolved.filter((t) => t.recommendation === "could"),
  ];
}

/** Split text into its first sentence and the rest, for summary/detail disclosure. */
export function splitFirstSentence(text: string): {
  lead: string;
  rest: string;
} {
  const match = text.match(/^(.+?[.!?])\s+(?=[A-Z"“])(.*)$/s);
  return match ? { lead: match[1], rest: match[2] } : { lead: text, rest: "" };
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

type Source = RoleData["sources"][number];

/** Counts by source type, most common first, plus vendor-affiliated count. */
export function sourceMix(sources: Source[]) {
  const counts = new Map<string, number>();
  for (const s of sources) if (s.type) counts.set(s.type, (counts.get(s.type) ?? 0) + 1);
  return {
    byType: [...counts.entries()].sort((a, b) => b[1] - a[1]),
    vendorAffiliated: sources.filter((s) => s.vendorAffiliated).length,
  };
}

/** Handoff links for one change: the other end of every pair that includes this role + activity. */
export async function handoffsFor(roleId: string, activity: string) {
  const [pairs, roles] = await Promise.all([getCollection("handoffs"), getCollection("roles")]);
  return pairs
    .flatMap(({ data }) =>
      data.a.role === roleId && data.a.activity === activity
        ? [data.b]
        : data.b.role === roleId && data.b.activity === activity
          ? [data.a]
          : [],
    )
    .map((end) => {
      const role = roles.find((r) => r.id === end.role);
      if (!role) throw new Error(`Handoff points to unknown role "${end.role}"`);
      const index = role.data.shifts.findIndex((s) => s.activity === end.activity);
      if (index < 0) throw new Error(`Handoff activity "${end.activity}" not found on ${end.role}`);
      return { role, shift: role.data.shifts[index], index };
    });
}
