// Reads role content straight from disk so tests grow automatically as roles are added.
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { parse } from "yaml";

const ROLES_DIR = path.resolve(import.meta.dirname, "../src/content/roles");

export interface RoleFile {
  id: string;
  data: {
    title: string;
    sdlcPhases: string[];
    shifts: { phase: string; sourceIds: string[] }[];
    tools: { sourceIds?: string[] }[];
    risks: { sourceIds?: string[] }[];
    sources: { id: string }[];
  };
}

export function loadRoles(): RoleFile[] {
  return readdirSync(ROLES_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => {
      const text = readFileSync(path.join(ROLES_DIR, f), "utf8");
      const match = text.match(/^---\n([\s\S]*?)\n---/);
      return { id: f.replace(/\.md$/, ""), data: parse(match?.[1] ?? "") };
    });
}
