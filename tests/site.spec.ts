import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { loadRoles } from "./content";

const roles = loadRoles();

async function expectNoSeriousA11yViolations(page: Page) {
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter((v) =>
    ["serious", "critical"].includes(v.impact ?? ""),
  );
  expect(
    serious.map((v) => `${v.id}: ${v.help} (${v.nodes.length} nodes)`),
  ).toEqual([]);
}

async function expectNoHorizontalScroll(page: Page) {
  await page.setViewportSize({ width: 360, height: 800 });
  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
}

test.describe("content integrity", () => {
  test("there is at least one role", () => {
    expect(roles.length).toBeGreaterThan(0);
  });

  for (const role of roles) {
    test(`${role.id}: every sourceId refers to a listed source`, () => {
      const known = new Set(role.data.sources.map((s) => s.id));
      const used = [
        ...role.data.shifts.flatMap((s) => s.sourceIds),
        ...role.data.tools.flatMap((t) => t.sourceIds ?? []),
        ...role.data.risks.flatMap((r) => r.sourceIds ?? []),
      ];
      expect(used.filter((id) => !known.has(id))).toEqual([]);
      expect(known.size).toBe(role.data.sources.length); // no duplicate source ids
    });

    test(`${role.id}: every shift phase is listed in sdlcPhases`, () => {
      const phases = new Set(role.data.sdlcPhases);
      expect(
        role.data.shifts.map((s) => s.phase).filter((p) => !phases.has(p)),
      ).toEqual([]);
    });
  }
});

test.describe("home page", () => {
  test("lists one card per role, each linking to its page", async ({
    page,
  }) => {
    await page.goto("./");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const cards = page.getByTestId("role-card");
    await expect(cards).toHaveCount(roles.length);
    for (const role of roles) {
      await expect(page.locator(`a[href$="/roles/${role.id}"]`)).toBeVisible();
    }
  });

  test("is accessible", async ({ page }) => {
    await page.goto("./");
    await expectNoSeriousA11yViolations(page);
  });

  test("has no horizontal scroll on a narrow phone", async ({ page }) => {
    await page.goto("./");
    await expectNoHorizontalScroll(page);
  });
});

for (const role of roles) {
  test.describe(`role page: ${role.id}`, () => {
    test("renders all sections", async ({ page }) => {
      const res = await page.goto(`roles/${role.id}`);
      expect(res?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        role.data.title,
      );
      await expect(page.getByTestId("last-reviewed")).toBeVisible();
      await expect(page.getByTestId("shift")).toHaveCount(
        role.data.shifts.length,
      );
      await expect(page.getByTestId("tool")).toHaveCount(
        role.data.tools.length,
      );
      await expect(page.getByTestId("sources").locator("li")).toHaveCount(
        role.data.sources.length,
      );
      for (const id of ["tools", "skills", "risks"]) {
        await expect(page.locator(`section#${id}`)).toBeVisible();
      }
    });

    test("citation links point at existing sources", async ({ page }) => {
      await page.goto(`roles/${role.id}`);
      const hrefs = await page
        .locator('sup a[href^="#source-"]')
        .evaluateAll((els) => els.map((e) => e.getAttribute("href")));
      expect(hrefs.length).toBeGreaterThan(0);
      for (const href of new Set(hrefs)) {
        await expect(page.locator(href!)).toHaveCount(1);
      }
    });

    test("is accessible", async ({ page }) => {
      await page.goto(`roles/${role.id}`);
      await expectNoSeriousA11yViolations(page);
    });

    test("has no horizontal scroll on a narrow phone", async ({ page }) => {
      await page.goto(`roles/${role.id}`);
      await expectNoHorizontalScroll(page);
    });
  });
}

test("every internal link resolves", async ({ page, request }) => {
  const toVisit = ["./"];
  const seen = new Set<string>();
  const broken: string[] = [];

  while (toVisit.length) {
    const next = toVisit.pop()!;
    const res = await page.goto(next);
    const pageUrl = page.url().split("#")[0];
    if (seen.has(pageUrl)) continue;
    seen.add(pageUrl);
    if (!res?.ok()) {
      broken.push(`${pageUrl} (${res?.status()})`);
      continue;
    }
    const links = await page
      .locator("a[href]")
      .evaluateAll((els) => els.map((e) => (e as HTMLAnchorElement).href));
    for (const link of links) {
      const u = new URL(link);
      if (u.origin !== new URL(pageUrl).origin) continue;
      const clean = `${u.origin}${u.pathname}`;
      if (!seen.has(clean)) {
        if (!u.pathname.startsWith("/sdlc-ai-era"))
          broken.push(`${clean} (missing base path, from ${pageUrl})`);
        else toVisit.push(clean);
      }
    }
  }
  for (const u of seen) {
    const r = await request.get(u);
    if (!r.ok()) broken.push(`${u} (${r.status()})`);
  }
  expect(broken).toEqual([]);
});
