import { expect, test, type Page } from "@playwright/test";
import { ogSlug } from "../src/lib/og-path";
import { loadRoles } from "./content";

const SITE = "https://ykeren1975.github.io/sdlc-ai-era/";
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

// Page path (relative to the base) → the image slug it should use.
const pages: { path: string; slug: string }[] = [
  { path: "", slug: "index" },
  { path: "about", slug: "about" },
  { path: "agent-skills", slug: "agent-skills" },
  ...roles.map((r) => ({ path: `roles/${r.id}`, slug: `roles/${r.id}` })),
  ...phasesWithShifts.map((p) => ({
    path: `phases/${p}`,
    slug: `phases/${p}`,
  })),
];

const meta = (page: Page, attr: "property" | "name", key: string) =>
  page.locator(`meta[${attr}="${key}"]`).getAttribute("content");

/** Width and height from a PNG's IHDR chunk. */
function pngSize(buf: Buffer) {
  expect(buf.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
  expect(buf.subarray(12, 16).toString("ascii")).toBe("IHDR");
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

test.describe("link previews", () => {
  for (const { path, slug } of pages) {
    test(`/${path}: og:image is a 1200×630 PNG`, async ({ page }) => {
      const response = await page.goto(path || "./");
      expect(response?.status()).toBe(200);

      const image = await meta(page, "property", "og:image");
      expect(image).toBe(`${SITE}og/${slug}.png`);
      expect(await meta(page, "property", "og:image:width")).toBe("1200");
      expect(await meta(page, "property", "og:image:height")).toBe("630");
      expect(await meta(page, "property", "og:image:alt")).toBeTruthy();
      expect(await meta(page, "property", "og:type")).toBe("website");
      expect(await meta(page, "name", "twitter:card")).toBe(
        "summary_large_image",
      );

      const canonical = `${SITE}${path ? `${path}/` : ""}`;
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        canonical,
      );
      expect(await meta(page, "property", "og:url")).toBe(canonical);

      // The same file must exist in the build: fetch it from the local server.
      const local = new URL(new URL(image!).pathname, page.url()).href;
      const png = await page.request.get(local);
      expect(png.status()).toBe(200);
      expect(png.headers()["content-type"]).toContain("image/png");
      expect(pngSize(await png.body())).toEqual({ width: 1200, height: 630 });
    });
  }

  test("404 page uses the home image and has no canonical", async ({
    page,
  }) => {
    await page.goto("404");
    expect(await meta(page, "property", "og:image")).toBe(
      `${SITE}og/index.png`,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  });

  test("pages without their own image fall back to the home image", () => {
    expect(ogSlug("/")).toBe("index");
    expect(ogSlug("")).toBe("index");
    expect(ogSlug("/roles/developer/")).toBe("roles/developer");
    expect(ogSlug("/404")).toBe("index");
    expect(ogSlug("/skills/developer/some-skill.zip")).toBe("index");
  });
});
