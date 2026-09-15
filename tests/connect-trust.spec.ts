// D+E: links between roles (related roles, previous/next, handoffs) and trust signals (source labels, About page).
import { readFileSync } from "node:fs";
import path from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { parse } from "yaml";
import { changeIds } from "../src/lib/anchors";
import {
  relatedRoles,
  ROLE_RELATIONS,
  sourceTypeCount,
  SOURCE_TYPES,
} from "../src/lib/taxonomy";
import { loadRoles, type RoleFile } from "./content";

type Source = RoleFile["data"]["sources"][number];
const roles = loadRoles().sort((a, b) => a.data.order - b.data.order);
const byId = new Map(roles.map((r) => [r.id, r]));
const handoffs: {
  id: string;
  a: { role: string; activity: string };
  b: { role: string; activity: string };
}[] = parse(
  readFileSync(
    path.resolve(import.meta.dirname, "../src/data/handoffs.yaml"),
    "utf8",
  ),
);
const allSources = roles.flatMap((r) => r.data.sources);

test.describe("content: relations, handoffs, source labels", () => {
  test("every source has a valid type and vendorAffiliated flag", () => {
    for (const s of allSources) {
      expect(SOURCE_TYPES, s.id).toContain(s.type);
      expect(typeof s.vendorAffiliated, s.id).toBe("boolean");
    }
  });

  test("a source cited on several roles has the same labels everywhere", () => {
    const seen = new Map<string, Source>();
    for (const s of allSources) {
      const prev = seen.get(s.url);
      if (prev) {
        expect([s.type, s.vendorAffiliated], s.id).toEqual([
          prev.type,
          prev.vendorAffiliated,
        ]);
      } else seen.set(s.url, s);
    }
  });

  test("role relations point to real roles, have no duplicates, and give each role 2–5", () => {
    const keys = ROLE_RELATIONS.map(([a, b]) => [a, b].sort().join("|"));
    expect(new Set(keys).size).toBe(keys.length);
    for (const [a, b] of ROLE_RELATIONS) {
      expect(byId.has(a), a).toBe(true);
      expect(byId.has(b), b).toBe(true);
      expect(a).not.toBe(b);
    }
    for (const role of roles) {
      const related = relatedRoles(role.id);
      expect(related.length, role.id).toBeGreaterThanOrEqual(2);
      expect(related.length, role.id).toBeLessThanOrEqual(5);
      for (const other of related)
        expect(relatedRoles(other)).toContain(role.id);
    }
  });

  test("handoffs join two different roles on real activities, each shift at most twice", () => {
    expect(handoffs.length).toBeGreaterThanOrEqual(8);
    const uses = new Map<string, number>();
    for (const h of handoffs) {
      expect(h.a.role, h.id).not.toBe(h.b.role);
      for (const end of [h.a, h.b]) {
        const role = byId.get(end.role);
        expect(role, `${h.id}: ${end.role}`).toBeTruthy();
        expect(
          role!.data.shifts.map((s) => s.activity),
          `${h.id}: ${end.activity}`,
        ).toContain(end.activity);
        const key = `${end.role}|${end.activity}`;
        uses.set(key, (uses.get(key) ?? 0) + 1);
      }
    }
    for (const [key, n] of uses) expect(n, key).toBeLessThanOrEqual(2);
  });
});

test.describe("role page: connections", () => {
  for (const [i, role] of roles.entries()) {
    test(`${role.id}: related roles and previous/next follow the data`, async ({
      page,
    }) => {
      await page.goto(`roles/${role.id}`);
      const neighbours = page.getByTestId("role-neighbours");
      const cards = neighbours.getByTestId("related-role");
      await expect(cards).toHaveCount(relatedRoles(role.id).length);
      for (const other of relatedRoles(role.id)) {
        await expect(
          cards.filter({ hasText: byId.get(other)!.data.title }),
        ).toHaveCount(1);
      }
      const prev = neighbours.getByTestId("previous-role");
      const next = neighbours.getByTestId("next-role");
      if (i === 0) await expect(prev).toHaveCount(0);
      else await expect(prev).toContainText(roles[i - 1].data.title);
      if (i === roles.length - 1) await expect(next).toHaveCount(0);
      else await expect(next).toContainText(roles[i + 1].data.title);
    });
  }

  test("each role page shows exactly its handoff links", async ({ page }) => {
    for (const role of roles) {
      const expected = handoffs.filter(
        (h) => h.a.role === role.id || h.b.role === role.id,
      ).length;
      await page.goto(`roles/${role.id}`);
      await expect(
        page.locator('[data-testid="handoff-links"] a'),
        role.id,
      ).toHaveCount(expected);
    }
  });

  test("a handoff link opens the matching change on the other role page", async ({
    page,
  }) => {
    const h = handoffs.find(
      (x) => x.a.role === "developer" && x.a.activity === "Automated testing",
    )!;
    const target = byId.get(h.b.role)!;
    const anchor = changeIds(target.data.shifts)[
      target.data.shifts.findIndex((s) => s.activity === h.b.activity)
    ];
    const devAnchor = changeIds(byId.get("developer")!.data.shifts)[
      byId
        .get("developer")!
        .data.shifts.findIndex((s) => s.activity === h.a.activity)
    ];
    await page.goto(`roles/developer#${devAnchor}`);
    const link = page.locator(`#${devAnchor}`).getByRole("link", {
      name: new RegExp(`Related on the .+ page: ${h.b.activity}`),
    });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(new RegExp(`/roles/${h.b.role}/?#${anchor}$`));
    await expect(page.locator(`#${anchor} > details`)).toHaveAttribute(
      "open",
      "",
    );
  });
});

test.describe("role page: source labels", () => {
  for (const role of roles) {
    test(`${role.id}: one type chip per source and a matching mix line`, async ({
      page,
    }) => {
      await page.goto(`roles/${role.id}`);
      const sources = role.data.sources;
      await expect(page.getByTestId("source-type")).toHaveCount(sources.length);
      await expect(page.getByTestId("vendor-affiliated")).toHaveCount(
        sources.filter((s) => s.vendorAffiliated).length,
      );
      const mix = page.getByTestId("source-mix");
      await expect(mix).toBeVisible();
      for (const type of SOURCE_TYPES) {
        const n = sources.filter((s) => s.type === type).length;
        if (!n) continue;
        await expect(mix).toContainText(sourceTypeCount(type, n));
      }
      await expect(mix).toContainText(
        `${sources.filter((s) => s.vendorAffiliated).length} vendor-affiliated`,
      );
    });
  }
});

test.describe("about page", () => {
  test("shows totals computed from the data", async ({ page }) => {
    await page.goto("about");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByTestId("about-roles")).toContainText(
      String(roles.length),
    );
    await expect(page.getByTestId("about-citations")).toHaveText(
      String(allSources.length),
    );
    await expect(page.getByTestId("about-unique")).toHaveText(
      String(new Set(allSources.map((s) => s.url)).size),
    );
    await expect(page.getByTestId("about-affiliated")).toHaveText(
      String(allSources.filter((s) => s.vendorAffiliated).length),
    );
    for (const type of SOURCE_TYPES) {
      await expect(
        page
          .locator(`[data-testid="type-table"] tr[data-type="${type}"] td`)
          .last(),
      ).toHaveText(String(allSources.filter((s) => s.type === type).length));
    }
    await expect(
      page.getByTestId("role-mix-table").locator("tbody tr"),
    ).toHaveCount(roles.length);
  });

  test("explains review dates and how to report a mistake, with no personal name", async ({
    page,
  }) => {
    await page.goto("about#reviews");
    await expect(page.getByTestId("review-explanation")).toContainText(
      "Last reviewed",
    );
    await expect(page.getByTestId("issues-url")).toHaveText(
      "github.com/ykeren1975/sdlc-ai-era/issues",
    );
    await expect(page.getByTestId("issues-note")).toContainText(
      "once the site is published",
    );
    await expect(page.locator("main")).toContainText("independent editor");
    await expect(page.getByTestId("process-steps").locator("li")).toHaveCount(
      4,
    );
  });

  test("is reachable from header, footer, home stats, role review date and guide", async ({
    page,
  }) => {
    await page.goto("");
    await page
      .getByRole("navigation", { name: "Main" })
      .getByRole("link", { name: "About" })
      .click();
    await expect(page).toHaveURL(/\/about\/?$/);

    await page.goto("agent-skills");
    await page.getByTestId("footer-about").click();
    await expect(page).toHaveURL(/\/about\/?$/);

    await page.goto("");
    await page.getByRole("link", { name: /cited sources/ }).click();
    await expect(page).toHaveURL(/\/about\/?#sources$/);

    await page.goto("roles/developer");
    await page.getByTestId("last-reviewed").getByRole("link").click();
    await expect(page).toHaveURL(/\/about\/?#reviews$/);

    await page.goto("agent-skills");
    await page.getByRole("link", { name: "Read how content is made" }).click();
    await expect(page).toHaveURL(/\/about\/?#process$/);
  });
});

test.describe("new UI: accessibility and phone layout", () => {
  for (const theme of ["light", "dark"] as const) {
    for (const path of ["about", "roles/developer"]) {
      test(`${path} has no axe violations (${theme})`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: theme });
        await page.goto(path);
        if (path !== "about") await page.locator("#sources summary").click();
        const results = await new AxeBuilder({ page })
          .include(
            path === "about"
              ? "main"
              : '[data-testid="role-neighbours"], #sources, #shifts',
          )
          .analyze();
        expect(results.violations).toEqual([]);
      });
    }
  }

  test("no horizontal scroll at 320px and 360px on About and a role page", async ({
    page,
  }) => {
    for (const width of [320, 360]) {
      await page.setViewportSize({ width, height: 800 });
      for (const path of ["about", "roles/developer", ""]) {
        await page.goto(path);
        const scrollWidth = await page.evaluate(
          () => document.documentElement.scrollWidth,
        );
        expect(scrollWidth, `${path} at ${width}px`).toBeLessThanOrEqual(width);
      }
    }
  });
});
