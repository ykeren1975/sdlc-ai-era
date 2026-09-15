// I + K + L: identity (logo, display face, hero ring, nav state), evidence badges and source-type icons, summary takeaways.
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { loadRoles } from "./content";

type Shift = {
  activity: string;
  headline: string;
  highlight?: boolean;
  takeaway?: string;
  phase: string;
};
const roles = loadRoles().map((r) => ({
  ...r,
  shifts: r.data.shifts as Shift[],
  independent: r.data.sources.filter((s) => !s.vendorAffiliated).length,
}));
const PHASES = [
  "plan",
  "requirements",
  "design",
  "build",
  "test",
  "deploy",
  "operate",
];

test.describe("takeaways (L)", () => {
  test("every highlighted shift has a takeaway of at most 60 characters with no digits", () => {
    for (const role of roles) {
      for (const shift of role.shifts.filter((s) => s.highlight)) {
        expect(shift.takeaway, `${role.id}: ${shift.activity}`).toBeTruthy();
        expect(shift.takeaway!.length).toBeLessThanOrEqual(60);
        expect(shift.takeaway, `${role.id}: ${shift.activity}`).not.toMatch(
          /[0-9%]/,
        );
      }
    }
  });

  for (const role of roles) {
    test(`${role.id}: summary cards show activity, takeaway and (from sm) the headline`, async ({
      page,
    }) => {
      await page.goto(`roles/${role.id}`);
      const cards = page.getByTestId("summary").getByTestId("highlight");
      const highlighted = role.shifts.filter((s) => s.highlight);
      await expect(cards).toHaveCount(highlighted.length);
      for (const [i, shift] of highlighted.entries()) {
        await expect(cards.nth(i)).toContainText(shift.activity, {
          ignoreCase: true,
        });
        await expect(cards.nth(i)).toContainText(shift.takeaway!);
        await expect(cards.nth(i).getByTestId("highlight-evidence")).toHaveText(
          shift.headline,
        );
      }
    });
  }
});

test.describe("evidence (K)", () => {
  for (const role of roles) {
    test(`${role.id}: header badge and source-type icons match the data`, async ({
      page,
    }) => {
      await page.goto(`roles/${role.id}`);
      const badge = page.locator("main header").getByTestId("evidence-badge");
      await expect(badge).toHaveAttribute(
        "data-independent",
        String(role.independent),
      );
      await expect(badge).toHaveAttribute(
        "data-total",
        String(role.data.sources.length),
      );
      await expect(badge).toContainText(
        `${role.independent} of ${role.data.sources.length} sources independent`,
      );
      await expect(page.locator('[data-testid="source-type"] svg')).toHaveCount(
        role.data.sources.length,
      );
      await badge.click();
      await expect(page).toHaveURL(/#sources$/);
    });
  }

  test("home map rows and hero total match the data", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("");
    const rows = page.locator("[data-sdlc-map]").getByTestId("evidence-badge");
    await expect(rows).toHaveCount(roles.length);
    for (const role of roles) {
      await expect(
        page
          .locator(`[data-sdlc-map] a[href$="/roles/${role.id}"]`)
          .first()
          .getByTestId("evidence-badge"),
      ).toHaveAttribute("data-independent", String(role.independent));
    }
    const total = roles.reduce((n, r) => n + r.independent, 0);
    await expect(page.getByTestId("home-independent")).toContainText(
      String(total),
    );
  });
});

test.describe("identity (I)", () => {
  test("hero ring links every phase with the right role count", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("");
    const ring = page.getByTestId("lifecycle-ring");
    await expect(ring).toBeVisible();
    const active = PHASES.filter((p) =>
      roles.some((r) => r.shifts.some((s) => s.phase === p)),
    );
    await expect(ring.locator("a")).toHaveCount(active.length);
    for (const phase of active) {
      const n = roles.filter((r) =>
        r.shifts.some((s) => s.phase === phase),
      ).length;
      await expect(ring.locator(`a[href$="/phases/${phase}"]`)).toContainText(
        `${n} roles`,
      );
    }
    await ring.locator('a[href$="/phases/test"]').click();
    await expect(page).toHaveURL(/\/phases\/test\/?$/);
  });

  test("the ring sweep is hidden when the visitor prefers reduced motion", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("");
    await expect(page.locator(".ring-sweep")).toBeHidden();
  });

  test("header shows the logo and marks the current section", async ({
    page,
  }) => {
    for (const [path, label] of [
      ["", "All roles"],
      ["roles/developer", "All roles"],
      ["phases/test", "All roles"],
      ["agent-skills", "Agent Skills guide"],
      ["about", "About"],
    ] as const) {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(path);
      await expect(page.locator("header [data-logo]").first()).toBeVisible();
      const current = page
        .getByRole("navigation", { name: "Main" })
        .locator('[aria-current="page"]');
      await expect(current, path).toHaveCount(1);
      await expect(current).toContainText(label);
    }
    const favicon = await page.locator('link[rel="icon"]').getAttribute("href");
    const res = await page.request.get(new URL(favicon!, page.url()).href);
    expect(await res.text()).toContain("<svg");
  });

  test("page titles use the display face", async ({ page }) => {
    await page.goto("roles/developer");
    const family = await page
      .locator("h1")
      .evaluate((el) => getComputedStyle(el).fontFamily);
    expect(family).toContain("Fraunces");
  });

  for (const theme of ["light", "dark"] as const) {
    test(`home hero and role header have no axe violations (${theme})`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme: theme });
      await page.setViewportSize({ width: 1440, height: 900 });
      for (const path of ["", "roles/developer"]) {
        await page.goto(path);
        const results = await new AxeBuilder({ page })
          .include("main")
          .include("body > header")
          .include("body > footer")
          .analyze();
        expect(results.violations, path).toEqual([]);
      }
    });
  }

  test("no horizontal scroll at 320px with the new header, hero and footer", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    for (const path of [
      "",
      "roles/developer",
      "about",
      "agent-skills",
      "phases/test",
    ]) {
      await page.goto(path);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
        path,
      ).toBeLessThanOrEqual(320);
    }
  });
});
