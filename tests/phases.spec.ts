import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { loadRoles } from "./content";

const roles = loadRoles();
const PHASE_IDS = [
  "plan",
  "requirements",
  "design",
  "build",
  "test",
  "deploy",
  "operate",
];
const phasesWithShifts = PHASE_IDS.filter((p) =>
  roles.some((r) => r.data.shifts.some((s) => s.phase === p)),
);
const rolesIn = (phase: string) =>
  roles.filter((r) => r.data.shifts.some((s) => s.phase === phase));

test.describe("phase pages", () => {
  for (const phase of phasesWithShifts) {
    test(`phase ${phase}: lists every change and role`, async ({ page }) => {
      const response = await page.goto(`phases/${phase}`);
      expect(response?.status()).toBe(200);
      const shiftCount = roles.reduce(
        (n, r) => n + r.data.shifts.filter((s) => s.phase === phase).length,
        0,
      );
      await expect(page.getByTestId("phase-change")).toHaveCount(shiftCount);
      await expect(page.getByTestId("phase-role")).toHaveCount(
        rolesIn(phase).length,
      );
      await expect(
        page
          .getByRole("navigation", { name: "Lifecycle phases" })
          .locator('[aria-current="page"]'),
      ).toHaveCount(1);
    });
  }

  test("a change link opens the item on the role page", async ({ page }) => {
    await page.goto("phases/test");
    const link = page.getByTestId("phase-change").first();
    const href = (await link.getAttribute("href"))!;
    const hash = href.slice(href.indexOf("#"));
    await link.click();
    await expect(page).toHaveURL(new RegExp(`/roles/[^/]+${hash}$`));
    await expect(page.locator(`${hash} > details`)).toHaveAttribute("open", "");
  });

  for (const theme of ["light", "dark"] as const) {
    test(`phase page has no serious a11y violations in ${theme} mode`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme: theme });
      await page.goto("phases/test");
      const results = await new AxeBuilder({ page }).analyze();
      const serious = results.violations.filter((v) =>
        ["serious", "critical"].includes(v.impact ?? ""),
      );
      expect(
        serious.map((v) => `${v.id}: ${v.help} (${v.nodes.length} nodes)`),
      ).toEqual([]);
    });
  }

  test("phase page has no horizontal scroll at 360px", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto("phases/test");
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

test.describe("home phase links", () => {
  test("phase filter shows a panel linking to the phase page", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("./");
    const panel = page.locator('[data-phase-panel="test"]');
    await expect(panel).toBeHidden();
    const button = page.locator('[data-phase-filter="test"]');
    await button.click();
    await expect(panel).toBeVisible();
    await expect(panel).toContainText(
      `${rolesIn("test").length} roles change in Test`,
    );
    await expect(panel.getByRole("link")).toHaveAttribute(
      "href",
      /\/phases\/test$/,
    );
    await expect(page.locator("[data-phase-panel]:visible")).toHaveCount(1);
    await button.click();
    await expect(panel).toBeHidden();
    await expect(page.locator("[data-phase-panel]:visible")).toHaveCount(0);
  });

  test("phase links are visible on a phone", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("./");
    const links = page.getByTestId("phase-links");
    await expect(links).toBeVisible();
    await expect(links.locator('a[href$="/phases/test"]')).toHaveCount(1);
    await expect(links.getByRole("link")).toHaveCount(phasesWithShifts.length);
  });
});
