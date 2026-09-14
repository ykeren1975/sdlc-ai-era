import { expect, test } from "@playwright/test";
import { loadRoles } from "./content";

const roles = loadRoles();
const PHONE = { width: 390, height: 844 };

test.describe("phone: page length and tap targets (package F)", () => {
  for (const role of roles) {
    test(`${role.id}: at most 7 screens tall on a phone (was 9.6)`, async ({ page }) => {
      await page.setViewportSize(PHONE);
      await page.goto(`roles/${role.id}`);
      const screens = await page.evaluate(
        () => document.documentElement.scrollHeight / innerHeight,
      );
      expect(screens, `${screens.toFixed(1)} screens`).toBeLessThanOrEqual(7);
    });
  }

  test("primary controls are at least 40px tall and citations at least 24px", async ({
    page,
  }) => {
    await page.setViewportSize(PHONE);
    await page.goto("roles/developer");
    // Open everything so hidden controls are measured too.
    await page.evaluate(() =>
      document.querySelectorAll("details").forEach((d) => (d.open = true)),
    );
    const small = await page.evaluate(() => {
      const visible = (el: Element) => {
        const r = el.getBoundingClientRect();
        return (
          r.width > 0 &&
          r.height > 0 &&
          getComputedStyle(el).visibility !== "hidden"
        );
      };
      const primary = [
        ...document.querySelectorAll(
          "main button, main summary, [data-section-link], header nav a",
        ),
      ]
        .filter(visible)
        .filter((el) => !el.closest("[data-map-legend]"))
        .filter((el) => el.getBoundingClientRect().height < 40)
        .map(
          (el) =>
            `${el.tagName} "${el.textContent?.trim().slice(0, 30)}" ${Math.round(el.getBoundingClientRect().height)}px`,
        );
      const citations = [
        ...document.querySelectorAll('sup a[href^="#source-"]'),
      ]
        .filter(visible)
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.height < 24 || r.width < 24;
        })
        .map((el) => el.textContent);
      return { primary, citations };
    });
    expect(small.primary).toEqual([]);
    expect(small.citations).toEqual([]);
  });

  test("secondary sections are collapsed on phones and open on desktop", async ({
    page,
  }) => {
    await page.setViewportSize(PHONE);
    await page.goto("roles/developer");
    const skillGroups = page.getByTestId("skills-group");
    for (let i = 0; i < 3; i++) await expect(skillGroups.nth(i)).not.toHaveAttribute("open", "");
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("roles/developer");
    for (let i = 0; i < 3; i++)
      await expect(skillGroups.nth(i)).toHaveAttribute("open", "");
  });

  test("shift rows show their phase on phones", async ({ page }) => {
    await page.setViewportSize(PHONE);
    await page.goto("roles/developer");
    const firstPhase = roles.find((r) => r.id === "developer")!.data.shifts[0]
      .phase;
    await expect(
      page.getByTestId("shift").first().locator("summary"),
    ).toContainText(new RegExp(firstPhase, "i"));
  });
});

test.describe("navigation state (package F)", () => {
  test("desktop sidebar marks the section in view", async ({ page }) => {
    await page.goto("roles/developer");
    await page.evaluate(() => document.querySelector("#risks")!.scrollIntoView({ block: "start" }));
    await page.evaluate(() => scrollBy(0, 1));
    const link = page
      .getByTestId("section-nav")
      .getByRole("link", { name: "Risks to watch" });
    await expect(link).toHaveAttribute("aria-current", "location");
  });

  test("phone chip marks the section in view", async ({ page }) => {
    await page.setViewportSize(PHONE);
    await page.goto("roles/developer");
    await page.evaluate(() => document.querySelector("#tools")!.scrollIntoView({ block: "start" }));
    await page.evaluate(() => scrollBy(0, 1));
    await expect(
      page.locator('[data-chip-scroller] a[href="#tools"]'),
    ).toHaveAttribute("aria-current", "location");
  });

  test("back-to-top appears after scrolling on phones", async ({ page }) => {
    await page.setViewportSize(PHONE);
    await page.goto("roles/developer");
    const button = page.locator("[data-back-to-top]");
    await expect(button).toBeHidden();
    await page.evaluate(() => scrollTo(0, innerHeight * 3));
    await expect(button).toBeVisible();
    await button.click();
    await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(10);
  });

  test("dark mode 'before' panel is darker than the surface", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("roles/developer");
    const lightness = await page.evaluate(() => {
      const css = getComputedStyle(document.documentElement);
      const l = (v: string) =>
        parseFloat(
          css.getPropertyValue(v).match(/oklch\(([\d.]+)%/)?.[1] ?? "NaN",
        );
      return { before: l("--color-before"), surface: l("--color-surface") };
    });
    expect(lightness.before).toBeLessThan(lightness.surface);
  });
});

test.describe("sharing and citations (package G)", () => {
  test("a deep link opens that risk", async ({ page }) => {
    await page.goto("roles/developer");
    const id = (await page.getByTestId("risk").nth(1).getAttribute("id"))!;
    expect(id, "named, stable anchor").toMatch(/^risk-[a-z][a-z0-9-]+$/);
    await page.goto(`roles/developer#${id}`);
    await expect(page.locator(`#${id} > details`)).toHaveAttribute("open", "");
    await expect(page.locator(`#${id}`)).toBeInViewport();
  });

  test("a link pasted while already on the page opens its item", async ({ page }) => {
    await page.goto("roles/developer");
    const id = (await page.getByTestId("shift").nth(3).getAttribute("id"))!;
    await page.evaluate((h) => (location.hash = h), id);
    await expect(page.locator(`#${id} > details`)).toHaveAttribute("open", "");
    await expect(page.locator(`#${id}`)).toBeInViewport();
  });

  test("'Copy link to this' copies the item's deep link", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("roles/developer");
    const change = page.getByTestId("shift").first();
    await change.locator("summary").click();
    await change.getByRole("button", { name: "Copy link to this" }).click();
    await expect(change.getByText("Link copied")).toBeVisible();
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toBe(
      `${new URL(page.url()).origin}${new URL(page.url()).pathname}#${await change.getAttribute("id")}`,
    );
  });

  test("citation jump highlights the source and returns to the text", async ({
    page,
  }) => {
    await page.goto("roles/developer");
    const change = page.getByTestId("shift").first();
    await change.locator("summary").click();
    const citation = change.locator('sup a[href^="#source-"]').first();
    const target = (await citation.getAttribute("href"))!;
    await citation.click();
    const entry = page.locator(target);
    await expect(entry).toHaveAttribute("data-flash", "");
    const back = entry.getByRole("button", { name: "Back to text" });
    await expect(back).toBeVisible();
    await back.click();
    await expect(citation).toBeInViewport();
    await expect(citation).toBeFocused();
  });

  test("print menu offers summary and full options", async ({ page }) => {
    await page.goto("roles/developer");
    await page.locator("[data-print-menu] > summary").click();
    await expect(page.getByRole("button", { name: /^Summary/ })).toBeVisible();
    await expect(
      page.getByRole("button", { name: /^Full page/ }),
    ).toBeVisible();
  });

  const pdfFor = async (
    page: import("@playwright/test").Page,
    mode: "summary" | "full",
  ) => {
    await page.goto("roles/developer");
    await page.evaluate((m) => {
      document.documentElement.dataset.print = m;
      dispatchEvent(new Event("beforeprint"));
    }, mode);
    await page.emulateMedia({ media: "print" });
    const text = await page.evaluate(() => document.body.innerText);
    // Record visibility before page.pdf(), which fires afterprint and resets the print mode.
    const hidden = await page.evaluate(() =>
      ["#skills", "#tools", "#agent-skills", "#sources"].filter((s) => {
        const el = document.querySelector(s);
        return !el || getComputedStyle(el).display === "none";
      }),
    );
    const pdf = await page.pdf({ format: "A4", printBackground: true });
    const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? [])
      .length;
    return { text, pages, hidden };
  };

  test("summary print is short and headline-only", async ({ page }) => {
    const { text, pages, hidden } = await pdfFor(page, "summary");
    expect(pages, `${pages} pages`).toBeLessThanOrEqual(2);
    expect(text).toMatch(/top 3 changes for you/i);
    expect(hidden).toEqual(["#skills", "#tools", "#agent-skills", "#sources"]);
    expect(text).not.toMatch(/name: [a-z-]+\n/);
  });

  test("full print expands changes but not SKILL.md sources", async ({
    page,
  }) => {
    const dev = roles.find((r) => r.id === "developer")!;
    const { text } = await pdfFor(page, "full");
    await expect(page.getByTestId("shift").first().locator("> details")).toHaveAttribute(
      "open",
      "",
    );
    expect(text).toContain("Skills to build");
    expect(text).not.toContain(
      `name: ${(dev.data as unknown as { starterSkills: string[] }).starterSkills[0]}`,
    );
  });
});
