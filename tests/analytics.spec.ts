// GoatCounter: loads only on the published host, never from local builds or tests; key clicks are tagged.
import { expect, test } from "@playwright/test";

test.describe("analytics", () => {
  test("the loader is on every page but sends nothing outside the live host", async ({
    page,
  }) => {
    const external: string[] = [];
    page.on("request", (r) => {
      if (/goatcounter|gc\.zgo\.at/.test(r.url())) external.push(r.url());
    });
    for (const path of [
      "",
      "roles/developer",
      "about",
      "phases/test",
      "agent-skills",
    ]) {
      await page.goto(path);
      await expect(page.locator("script[data-analytics-loader]")).toHaveCount(
        1,
      );
    }
    expect(external).toEqual([]);
    expect(await page.locator('script[src*="gc.zgo.at"]').count()).toBe(0);
  });

  test("on the live host the loader adds GoatCounter with the site endpoint", async ({
    page,
  }) => {
    // Simulate the published hostname without any network: route the page and block the script.
    await page.route("https://ykeren1975.github.io/**", async (route) => {
      const res = await page.request.get(
        route
          .request()
          .url()
          .replace(
            "https://ykeren1975.github.io/sdlc-ai-era/",
            "http://localhost:4329/sdlc-ai-era/",
          ),
      );
      await route.fulfill({ response: res });
    });
    await page.route("https://gc.zgo.at/**", (route) =>
      route.fulfill({ body: "", contentType: "text/javascript" }),
    );
    await page.goto("https://ykeren1975.github.io/sdlc-ai-era/");
    const script = page.locator('script[src="https://gc.zgo.at/count.js"]');
    await expect(script).toHaveCount(1);
    await expect(script).toHaveAttribute(
      "data-goatcounter",
      "https://sdlc-ai-era.goatcounter.com/count",
    );
  });

  test("key interactions carry click event names", async ({ page }) => {
    await page.goto("roles/developer");
    for (const name of [
      "copy-instructions/developer/",
      "download-instructions/developer/",
      "print/summary",
      "print/full",
      "copy-page-link",
      "handoff/developer/",
      "related-role/developer/",
      "source/developer/",
    ]) {
      expect(
        await page.locator(`[data-goatcounter-click^="${name}"]`).count(),
        name,
      ).toBeGreaterThan(0);
    }
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("");
    expect(
      await page.locator('[data-goatcounter-click^="hero-phase/"]').count(),
    ).toBe(7);
  });

  test("About explains what is counted", async ({ page }) => {
    await page.goto("about#privacy");
    await expect(page.getByTestId("privacy-text")).toContainText("GoatCounter");
    await expect(page.getByTestId("privacy-text")).toContainText("cookies");
  });
});
