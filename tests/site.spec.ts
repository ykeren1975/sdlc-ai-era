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

const PHASE_ORDER = [
  "plan",
  "requirements",
  "design",
  "build",
  "test",
  "deploy",
  "operate",
];

test.describe("content: skimmable layer", () => {
  for (const role of roles) {
    test(`${role.id}: 3 highlights and clean headlines`, () => {
      expect(role.data.tagline, "tagline").toBeTruthy();
      expect(role.data.shifts.filter((s) => s.highlight)).toHaveLength(3);
      for (const s of role.data.shifts) {
        expect(s.headline, `headline for "${s.activity}"`).toBeTruthy();
        expect(
          s.headline,
          `no numbers in headline "${s.headline}"`,
        ).not.toMatch(/[\d%]/);
      }
    });
  }
});

test.describe("home page", () => {
  test("SDLC map lists every role with dots matching its shift phases", async ({
    page,
  }) => {
    await page.goto("./");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("[data-map-role]")).toHaveCount(roles.length);
    for (const role of roles) {
      const row = page.locator(`[data-map-role="${role.id}"]`);
      await expect(row.locator(`a[href$="/roles/${role.id}"]`)).toBeVisible();
      const expected = PHASE_ORDER.filter((p) =>
        role.data.shifts.some((s) => s.phase === p),
      );
      expect((await row.getAttribute("data-phases"))?.split(" ")).toEqual(
        expected,
      );
    }
  });

  test("phase filter dims roles without that phase", async ({ page }) => {
    await page.goto("./");
    await page.locator('[data-phase-filter="deploy"]').click();
    const withDeploy = roles.filter((r) =>
      r.data.shifts.some((s) => s.phase === "deploy"),
    );
    await expect(page.locator("[data-map-role]:not([data-dim])")).toHaveCount(
      withDeploy.length,
    );
    await page.locator('[data-phase-filter="deploy"]').click();
    await expect(page.locator("[data-map-role][data-dim]")).toHaveCount(0);
  });

  test("shows grouped role cards on a phone", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto("./");
    await expect(page.getByTestId("role-card")).toHaveCount(roles.length);
    await expect(page.getByTestId("role-card").first()).toBeVisible();
  });

  for (const theme of ["light", "dark"]) {
    test(`is accessible in ${theme} mode`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: theme as "light" | "dark" });
      await page.goto("./");
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      await expectNoSeriousA11yViolations(page);
    });
  }

  test("theme toggle switches and persists", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("./");
    const toggle = page.locator("[data-theme-toggle]");
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await toggle.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
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

    test("summary panel shows the 3 highlighted shifts", async ({ page }) => {
      await page.goto(`roles/${role.id}`);
      const cards = page.getByTestId("summary").getByTestId("highlight");
      await expect(cards).toHaveCount(3);
      const highlighted = role.data.shifts.filter((s) => s.highlight);
      for (const [i, s] of highlighted.entries()) {
        await expect(cards.nth(i)).toContainText(s.headline);
      }
    });

    test("is accessible, including with everything expanded", async ({
      page,
    }) => {
      await page.goto(`roles/${role.id}`);
      await expectNoSeriousA11yViolations(page);
      await page.evaluate(() =>
        document.querySelectorAll("details").forEach((d) => (d.open = true)),
      );
      await expectNoSeriousA11yViolations(page);
    });

    test("has no horizontal scroll on a narrow phone", async ({ page }) => {
      await page.goto(`roles/${role.id}`);
      await expectNoHorizontalScroll(page);
    });
  });
}

test.describe("role page interactions (developer)", () => {
  const dev = roles.find((r) => r.id === "developer")!;

  test("shifts are collapsed, expand one or all", async ({ page }) => {
    await page.goto("roles/developer");
    const shifts = page.getByTestId("shift");
    const first = shifts.first();
    await expect(first.getByText("Before", { exact: true })).toBeHidden();
    await first.locator("summary").click();
    await expect(first.getByText("Before", { exact: true })).toBeVisible();
    await expect(
      first.locator('sup a[href^="#source-"]').first(),
    ).toBeVisible();

    await page.getByRole("button", { name: "Expand all" }).click();
    await expect(page.locator("#shifts details[open]")).toHaveCount(
      dev.data.shifts.length,
    );
    await expect(
      page.getByRole("button", { name: "Collapse all" }),
    ).toBeVisible();
  });

  test("clicking a citation opens the sources list", async ({ page }) => {
    await page.goto("roles/developer");
    await page.getByTestId("shift").first().locator("summary").click();
    await page
      .getByTestId("shift")
      .first()
      .locator('sup a[href^="#source-"]')
      .first()
      .click();
    await expect(page.locator("#sources details")).toHaveAttribute("open", "");
  });

  test("print view hides navigation and shows all detail", async ({ page }) => {
    await page.goto("roles/developer");
    await page.emulateMedia({ media: "print" });
    await expect(page.locator("header.no-print")).toBeHidden();
    await expect(page.locator("[data-share]")).toBeHidden();
    // The print button's beforeprint handler opens every disclosure.
    await page.evaluate(() => dispatchEvent(new Event("beforeprint")));
    await expect(page.locator("details:not([open])")).toHaveCount(0);
    await expect(
      page.getByTestId("shift").first().getByText("Now", { exact: true }),
    ).toBeVisible();
  });
});

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
