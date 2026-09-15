// Maps a page path to its link preview image under /og/. Kept free of rendering deps so Base.astro stays light.

/**
 * Image slug for a page path with the base already stripped, e.g. "/roles/developer" → "roles/developer".
 * Pages without their own image (downloads, unknown paths) share the home image.
 */
export function ogSlug(pagePath: string): string {
  const clean = pagePath.replace(/^\/+|\/+$/g, "");
  if (/^(roles|phases)\/[a-z0-9-]+$/.test(clean)) return clean;
  if (clean === "about" || clean === "agent-skills") return clean;
  return "index";
}
