import { defineConfig, devices } from "@playwright/test";

const port = 3200;

/**
 * Instant-navigation checks against a production build. `next dev` never
 * prefetches, so only `next start` shows what a real navigation paints before
 * dynamic content streams in. `NEXT_EXPOSE_TESTING_API` turns on the testing
 * API that `@next/playwright`'s `instant()` needs; see next.config.ts.
 */
export default defineConfig({
  forbidOnly: Boolean(process.env.CI),
  reporter: process.env.CI ? "line" : "list",
  retries: process.env.CI ? 1 : 0,
  testDir: "./e2e",
  timeout: 60_000,
  use: {
    ...devices["Desktop Chrome"],
    baseURL: `http://localhost:${port}`,
    trace: "retain-on-failure",
  },
  webServer: {
    command: `npm run build && next start -p ${port}`,
    env: { NEXT_EXPOSE_TESTING_API: "1" },
    reuseExistingServer: false,
    timeout: 600_000,
    url: `http://localhost:${port}/ui`,
  },
});
