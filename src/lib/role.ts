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
    return { entry, raw, role: roleId, name };
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
