// J + M: Before → Now comparison, page transitions, reveal and disclosure motion, 404 page.
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { loadRoles } from "./content";

const roles = loadRoles();
const PHONE = { width: 390, height: 844 };

test.describe("Before → Now (J)", () => {
  test("desktop shows both sides with the arrow between them", async ({
    page,
  }) => {
    await page.goto("roles/qa-tester");
    const item = page.getByTestId("shift").first();
    await item.locator("summary").click();
    await expect(item.locator('[data-bn-panel="before"]')).toBeVisible();
    await expect(item.locator('[data-bn-panel="now"]')).toBeVisible();
    await expect(item.locator(".bn-arrow")).toBeVisible();
    await expect(item.locator("[data-bn-toggle]")).toBeHidden();
  });

  test("phone shows one side at a time with a working switch", async ({
    page,
  }) => {
    await page.setViewportSize(PHONE);
    await page.goto("roles/qa-tester");
    const item = page.getByTestId("shift").first();
    await item.locator("summary").click();
    const before = item.locator('[data-bn-panel="before"]');
    const now = item.locator('[data-bn-panel="now"]');
    const toBefore = item.getByRole("button", { name: "Before AI" });
    const toNow = item.getByRole("button", { name: "With AI" });
    await expect(now).toBeVisible();
    await expect(before).toBeHidden();
    await expect(toNow).toHaveAttribute("aria-pressed", "true");
    await toBefore.click();
    await expect(before).toBeVisible();
    await expect(now).toBeHidden();
    await expect(toBefore).toHaveAttribute("aria-pressed", "true");
    await expect(toNow).toHaveAttribute("aria-pressed", "false");
    await toNow.click();
    await expect(now).toBeVisible();
  });

  test("phone print shows both sides", async ({ page }) => {
    await page.setViewportSize(PHONE);
    await page.goto("roles/qa-tester");
    const item = page.getByTestId("shift").first();
    await item.locator("summary").click();
    await page.emulateMedia({ media: "print" });
    await expect(item.locator('[data-bn-panel="before"]')).toBeVisible();
    await expect(item.locator('[data-bn-panel="now"]')).toBeVisible();
  });

  test("without JavaScript both sides show and the switch stays hidden", async ({
    browser,
    baseURL,
  }) => {
    const ctx = await browser.newContext({
      javaScriptEnabled: false,
      viewport: PHONE,
    });
    const page = await ctx.newPage();
    await page.goto(`${baseURL}roles/qa-tester`);
    const item = page.getByTestId("shift").first();
    await item.locator("summary").click();
    await expect(item.locator('[data-bn-panel="before"]')).toBeVisible();
    await expect(item.locator('[data-bn-panel="now"]')).toBeVisible();
    await expect(item.locator("[data-bn-toggle]")).toBeHidden();
    await ctx.close();
  });

  test("phone switch passes axe", async ({ page }) => {
    await page.setViewportSize(PHONE);
    await page.goto("roles/developer");
    await page.getByTestId("shift").first().locator("summary").click();
    await page.evaluate(() =>
      Promise.all(
        document
          .getAnimations()
          .filter((a) => a.effect?.getTiming().iterations !== Infinity)
          .map((a) => a.finished.catch(() => {})),
      ),
    );
    const results = await new AxeBuilder({ page })
      .include('[data-testid="shift"]')
      .analyze();
    expect(results.violations).toEqual([]);
  });
});

test.describe("motion and finish (M)", () => {
  test("pages opt into cross-document view transitions, off with reduced motion", async ({
    page,
  }) => {
    const hasRule = () =>
      page.evaluate(() => {
        const walk = (rules: CSSRuleList): boolean =>
          [...rules].some(
            (r) =>
              r.cssText.startsWith("@view-transition") ||
              ("cssRules" in r && walk((r as CSSGroupingRule).cssRules)),
          );
        return [...document.styleSheets].some((s) => {
          try {
            return walk(s.cssRules);
          } catch {
            return false;
          }
        });
      });
    await page.goto("");
    expect(await hasRule()).toBe(true);
  });

  test("a role's icon tile shares one transition name between the lists and its page", async ({
    page,
  }) => {
    const names = async () =>
      page.evaluate(() =>
        [
          ...document.querySelectorAll<HTMLElement>(
            "[style*='view-transition-name']",
          ),
        ]
          .filter((el) => el.getClientRects().length > 0)
          .map((el) => el.style.viewTransitionName),
      );
    for (const size of [{ width: 1440, height: 900 }, PHONE]) {
      await page.setViewportSize(size);
      await page.goto("");
      const home = await names();
      expect(new Set(home).size, `unique at ${size.width}px`).toBe(home.length);
      expect(home).toContain("role-developer");
    }
    await page.goto("phases/test");
    const phase = await names();
    expect(new Set(phase).size).toBe(phase.length);
    await page.goto("roles/developer");
    expect(await names()).toEqual(["role-developer"]);
  });

  test("reveal motion never lowers text opacity", async ({ page }) => {
    await page.goto("roles/developer");
    const opacities = await page.evaluate(() =>
      [...document.querySelectorAll("[data-reveal]")].map(
        (el) => getComputedStyle(el).opacity,
      ),
    );
    expect(opacities.length).toBeGreaterThan(3);
    expect(new Set(opacities)).toEqual(new Set(["1"]));
  });

  test("unknown pages get the designed 404 with every role linked", async ({
    page,
  }) => {
    const res = await page.goto("this-page-does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "This page isn't in the loop",
    );
    await expect(page.getByTestId("not-found-role")).toHaveCount(roles.length);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
    await page.getByTestId("not-found-role").first().click();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(page.url()).toMatch(/\/roles\//);
  });
});
