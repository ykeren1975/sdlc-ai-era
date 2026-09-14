import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { zipSync, strToU8 } from "fflate";
import { readFileSync } from "node:fs";
import path from "node:path";
import { STARTER_SKILLS_DIR } from "../../../lib/role";

// A ready-to-upload skill: <name>/SKILL.md inside a ZIP (the layout Claude's "Upload a skill" expects).
export const getStaticPaths: GetStaticPaths = async () => {
  const skills = await getCollection("starterSkills");
  return skills.map((s) => {
    const [role, name] = s.id.split("/");
    return { params: { role, name } };
  });
};

export const GET: APIRoute = ({ params }) => {
  const name = params.name!;
  const file = readFileSync(
    path.join(STARTER_SKILLS_DIR, params.role!, name, "SKILL.md"),
    "utf8",
  );
  // Fixed timestamp keeps builds reproducible.
  const zip = zipSync({
    [name]: {
      "SKILL.md": [strToU8(file), { mtime: new Date("2026-01-01T00:00:00Z") }],
    },
  });
  return new Response(zip, { headers: { "Content-Type": "application/zip" } });
};
