import { defineConfig, devices } from "@playwright/test";

const isCI = !!process.env.CI;
const PORT = isCI ? 3000 : 3001;

export default defineConfig({
  testDir: "./tests/visual",
  fullyParallel: true,
  workers: isCI ? undefined : 1,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  reporter: "html",
  use: {
    baseURL: process.env.BASE_URL ?? `http://localhost:${PORT}`,
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "tablet",
      use: { ...devices["iPad Mini"], viewport: { width: 768, height: 1024 } },
    },
    {
      name: "mobile",
      use: { ...devices["iPhone SE"], viewport: { width: 375, height: 812 } },
    },
  ],
  webServer: {
    command: isCI ? "pnpm build && pnpm start" : "pnpm dev",
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !isCI,
    timeout: 120_000,
  },
});
