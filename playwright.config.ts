import { defineConfig, devices } from "@playwright/test";

// Dedicated port so tests never hit a dev/preview server you have open.
const PORT = 4329;

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${PORT}/sdlc-ai-era/`,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    // Always rebuild so tests never run against stale content.
    command: `npm run build && node scripts/serve-dist.mjs ${PORT}`,
    url: `http://localhost:${PORT}/sdlc-ai-era/`,
    reuseExistingServer: false,
    timeout: 180_000,
  },
});
