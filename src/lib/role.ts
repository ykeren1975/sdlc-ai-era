import { getEntry, type CollectionEntry } from "astro:content";

type RoleData = CollectionEntry<"roles">["data"];

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
