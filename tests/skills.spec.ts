import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { strFromU8, unzipSync } from "fflate";
import { parse } from "yaml";
import { loadRoles } from "./content";

const SKILLS_DIR = path.resolve(import.meta.dirname, "../src/starter-skills");
const roles = loadRoles() as (ReturnType<typeof loadRoles>[number] & {
  data: { starterSkills?: string[]; agentSkills?: { skill: string }[] };
})[];

const starterFiles = existsSync(SKILLS_DIR)
  ? readdirSync(SKILLS_DIR).flatMap((role) =>
      readdirSync(path.join(SKILLS_DIR, role)).map((name) => {
        const file = path.join(SKILLS_DIR, role, name, "SKILL.md");
        const raw = readFileSync(file, "utf8");
        const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
        return {
          role,
          folder: name,
          raw,
          front: (match ? parse(match[1]) : {}) as Record<string, unknown>,
          body: match?.[2] ?? "",
        };
      }),
    )
  : [];

test.describe("starter skills follow the Agent Skills spec", () => {
  test("there are starter skills", () => {
    expect(starterFiles.length).toBeGreaterThan(0);
  });

  test("skill names are unique across roles", () => {
    const names = starterFiles.map((s) => s.folder);
    expect(names.filter((n, i) => names.indexOf(n) !== i)).toEqual([]);
  });

  for (const s of starterFiles) {
    test(`${s.role}/${s.folder}`, () => {
      const { name, description } = s.front as {
        name?: string;
        description?: string;
      };
      // agentskills.io/specification
      expect(name, "name matches folder").toBe(s.folder);
      expect(name!.length).toBeLessThanOrEqual(64);
      expect(name).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(typeof description).toBe("string");
      expect(description!.length).toBeGreaterThan(0);
      expect(description!.length).toBeLessThanOrEqual(1024);
      expect(description, "description says when to use it").toMatch(
        /\buse (it |this )?(when|for|whenever|before|after|during)\b/i,
      );
      // Site rules (CLAUDE.md)
      expect(
        Object.keys(s.front),
        "no allowed-tools or unknown fields",
      ).toEqual(expect.not.arrayContaining(["allowed-tools"]));
      expect(s.body.split("\n").length, "body under 150 lines").toBeLessThan(
        150,
      );
      for (const heading of [
        "## What to gather first",
        "## Steps",
        "## Output format",
        "## Watch out for",
        "## Before you finish",
      ]) {
        expect(s.body, `has "${heading}"`).toContain(heading);
      }
      // Human-facing display fields
      const meta = s.front.metadata as
        { title?: string; summary?: string } | undefined;
      expect(meta?.title, "metadata.title").toBeTruthy();
      expect(meta?.summary, "metadata.summary").toBeTruthy();
      expect(meta!.summary!.length).toBeLessThanOrEqual(90);
      // Lessons from smoke tests and review
      expect(
        s.body,
        "output template ends with an assumptions section",
      ).toMatch(
        /#{2,3} Assumptions and open questions[\s\S]*?```\s*\n## Watch out for/,
      );
      expect(
        s.body.match(/\S[.;:)][ \t]?\d+\. [A-Z]/),
        "no numbered step glued onto the previous line",
      ).toBeNull();
    });
  }
});

test.describe("roles reference agent skills correctly", () => {
  const readyIds = new Set(
    (
      parse(
        readFileSync(
          path.resolve(import.meta.dirname, "../src/data/agent-skills.yaml"),
          "utf8",
        ),
      ) as { id: string }[]
    ).map((s) => s.id),
  );

  for (const role of roles) {
    test(`${role.id}`, () => {
      const starters = role.data.starterSkills ?? [];
      expect(starters.length, "2-3 starter skills").toBeGreaterThanOrEqual(2);
      expect(starters.length).toBeLessThanOrEqual(3);
      for (const name of starters) {
        expect(
          existsSync(path.join(SKILLS_DIR, role.id, name, "SKILL.md")),
          `${name} exists`,
        ).toBe(true);
      }
      for (const { skill } of role.data.agentSkills ?? []) {
        expect(readyIds.has(skill), `${skill} is in agent-skills.yaml`).toBe(
          true,
        );
      }
    });
  }
});

test.describe("agent skills UI", () => {
  const role = roles.find((r) => r.id === "qa-tester")!;
  const first = starterFiles.find(
    (s) => s.role === role.id && s.folder === role.data.starterSkills?.[0],
  )!;

  test("role page lists starter and ready-made skills", async ({ page }) => {
    await page.goto(`roles/${role.id}`);
    await expect(
      page.getByRole("heading", { name: "Skills to build" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "AI instructions to copy" }),
    ).toBeVisible();
    await expect(page.getByTestId("starter-skill")).toHaveCount(
      role.data.starterSkills!.length,
    );
    await expect(page.getByTestId("ready-skill")).toHaveCount(
      role.data.agentSkills?.length ?? 0,
    );
  });

  test("expand, copy and download a starter skill", async ({
    page,
    context,
    request,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto(`roles/${role.id}`);
    const item = page.locator(`#skill-${first.folder}`);
    await item.locator("summary").first().click();
    // Collapsed row shows the human title and summary, not the routing description.
    const meta = first.front.metadata as { title: string; summary: string };
    await expect(item.locator("summary").first()).toContainText(meta.title);
    await expect(item.locator("summary").first()).toContainText(meta.summary);
    await expect(item.getByTestId("how-to-use")).toContainText("Claude");
    await expect(item.getByTestId("how-to-use")).toContainText("Install it in a coding agent");
    await expect(item.getByTestId("how-to-use")).toContainText(
      "In any AI chat",
    );

    await item.getByRole("button", { name: "Copy instructions" }).click();
    await expect(item.locator("[data-copy-skill-status]")).toHaveText("Copied");
    // Copy gives the instructions without the YAML header (the .zip keeps the full file).
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toBe(first.body.replace(/^\n+/, ""));
    expect(copied.startsWith("---")).toBe(false);
    expect(copied).toContain("## Steps");
    // The first route is the one that works in any AI chat.
    await expect(
      item.getByTestId("how-to-use").locator("li").first(),
    ).toContainText("In any AI chat");

    // The full file is one more click away.
    await item.getByText("Show the full file").click();
    await expect(item.locator("[data-skill-source]")).toContainText(
      `name: ${first.folder}`,
    );

    // Download .zip contains <name>/SKILL.md identical to the source.
    const href = await item
      .getByRole("link", { name: "Download .zip" })
      .getAttribute("href");
    const res = await request.get(href!);
    expect(res.status()).toBe(200);
    const files = unzipSync(new Uint8Array(await res.body()));
    expect(Object.keys(files).filter((f) => !f.endsWith("/"))).toEqual([
      `${first.folder}/SKILL.md`,
    ]);
    expect(strFromU8(files[`${first.folder}/SKILL.md`])).toBe(first.raw);
  });

  test("summary 'Try an agent skill' opens that skill", async ({ page }) => {
    await page.goto(`roles/${role.id}`);
    await page.getByTestId("try-skill").click();
    await expect(
      page.locator(`#skill-${first.folder} > details`),
    ).toHaveAttribute("open", "");
  });

  test("role page is accessible with skills expanded", async ({ page }) => {
    await page.goto(`roles/${role.id}`);
    await page.evaluate(() =>
      document
        .querySelectorAll("#agent-skills details")
        .forEach((d) => ((d as HTMLDetailsElement).open = true)),
    );
    const results = await new AxeBuilder({ page })
      .include("#agent-skills")
      .analyze();
    expect(
      results.violations
        .filter((v) => ["serious", "critical"].includes(v.impact ?? ""))
        .map((v) => v.id),
    ).toEqual([]);
  });

  test("guide page lists every starter skill and is accessible", async ({
    page,
  }) => {
    await page.goto("agent-skills");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Agent Skills guide",
    );
    await expect(page.getByTestId("install-routes")).toContainText(
      "Upload a skill",
    );
    await expect(page.getByTestId("guide-skill")).toHaveCount(
      starterFiles.length,
    );
    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations
        .filter((v) => ["serious", "critical"].includes(v.impact ?? ""))
        .map((v) => v.id),
    ).toEqual([]);
    for (const a of await page.locator('a[href^="http"]').all()) {
      await expect(a).toHaveAttribute("target", "_blank");
    }
  });
});
