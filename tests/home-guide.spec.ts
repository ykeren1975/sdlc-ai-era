import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

async function expectNoSeriousA11yViolations(page: Page) {
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter((v) =>
    ["serious", "critical"].includes(v.impact ?? ""),
  );
  expect(
    serious.map((v) => `${v.id}: ${v.help} (${v.nodes.length} nodes)`),
  ).toEqual([]);
}

test.describe("home SDLC map (desktop)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
  });

  test("shows a dot-size legend with three labels", async ({ page }) => {
    const legend = page.locator("[data-map-legend]");
    await expect(legend).toBeVisible();
    for (const label of ["1 change", "2 changes", "3+ changes"]) {
      await expect(legend.getByText(label, { exact: true })).toBeVisible();
    }
    await expect(legend).toHaveAttribute("aria-hidden", "true");
  });

  test("filter hint sits under the heading and updates", async ({ page }) => {
    const hint = page.locator("[data-map-status]");
    await expect(hint).toBeVisible();
    await expect(hint).toHaveText(
      "Select a phase to highlight the roles it affects.",
    );
    const heading = await page.locator("#map-heading").boundingBox();
    const hintBox = await hint.boundingBox();
    expect(hintBox!.y).toBeGreaterThan(heading!.y);
    expect(Math.abs(hintBox!.x - heading!.x)).toBeLessThan(2);

    const deploy = page.locator('[data-phase-filter="deploy"]');
    await deploy.click();
    await expect(deploy).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("[data-map-role][data-dim]").first()).toHaveCSS(
      "opacity",
      "0.3",
    );
    await expect(hint).toContainText("roles change in Deploy");
  });

  test("phase buttons are at least 36px tall", async ({ page }) => {
    const buttons = page.locator("[data-phase-filter]");
    await expect(buttons).toHaveCount(7);
    for (const button of await buttons.all()) {
      const box = await button.boundingBox();
      expect(box!.height).toBeGreaterThanOrEqual(36);
    }
  });

  test("hovering a role row reveals its arrow", async ({ page }) => {
    const row = page.locator("[data-map-role] a").first();
    const arrow = row.locator("[data-row-arrow]");
    await expect(arrow).toHaveCSS("opacity", "0");
    await row.hover();
    await expect(arrow).toHaveCSS("opacity", "1");
  });

  for (const theme of ["light", "dark"] as const) {
    test(`has no serious a11y violations in ${theme} mode`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme: theme });
      await page.goto("./");
      await expectNoSeriousA11yViolations(page);
    });
  }
});

test.describe("agent skills guide contents", () => {
  test("desktop shows contents with a scrollspy", async ({ page }) => {
    await page.goto("agent-skills");
    const nav = page.getByRole("navigation", { name: "On this page" });
    await expect(nav).toBeVisible();
    await expect(nav.getByRole("link")).toHaveCount(5);

    await page
      .locator("#sources-heading")
      .evaluate((el) => el.scrollIntoView({ block: "start" }));
    await expect(nav.getByRole("link", { name: "Sources" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    await expect(nav.locator('[aria-current="location"]')).toHaveCount(1);
  });

  test("contents are hidden on a phone", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("agent-skills");
    await expect(page.getByTestId("guide-contents")).toBeHidden();
  });

  test("has no serious a11y violations", async ({ page }) => {
    await page.goto("agent-skills");
    await expectNoSeriousA11yViolations(page);
  });
});
