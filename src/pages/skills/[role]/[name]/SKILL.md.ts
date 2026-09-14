import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { readFileSync } from "node:fs";
import path from "node:path";
import { STARTER_SKILLS_DIR } from "../../../../lib/role";

// Serves each starter skill's exact SKILL.md for download, mirroring its folder layout.
export const getStaticPaths: GetStaticPaths = async () => {
  const skills = await getCollection("starterSkills");
  return skills.map((s) => {
    const [role, name] = s.id.split("/");
    return { params: { role, name } };
  });
};

export const GET: APIRoute = ({ params }) => {
  const file = path.join(
    STARTER_SKILLS_DIR,
    params.role!,
    params.name!,
    "SKILL.md",
  );
  return new Response(readFileSync(file, "utf8"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
