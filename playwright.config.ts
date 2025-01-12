import { defineConfig, devices } from "@playwright/test";
require("dotenv").config();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 1,
  reporter: "html",
  use: {
    testIdAttribute: "id",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    headless: true,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
