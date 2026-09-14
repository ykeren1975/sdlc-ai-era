// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Deployed as a GitHub Pages project site, so every internal link must go through url() in src/lib/url.ts
export default defineConfig({
  site: "https://ykeren1975.github.io",
  base: "/sdlc-ai-era",
  trailingSlash: "ignore",
  vite: {
    plugins: [tailwindcss()],
  },
});
