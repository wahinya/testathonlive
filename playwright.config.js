const { defineConfig, devices } = require("@playwright/test");
require("dotenv").config();

const isBrowserStack =
  !!process.env.BROWSERSTACK_USERNAME && !!process.env.BROWSERSTACK_ACCESS_KEY;

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 60 * 1000,
  expect: {
    timeout: 5000,
  },
  retries: isBrowserStack ? 2 : 0,
  reporter: isBrowserStack
    ? [["list"]]
    : [
        ["list"],
        ["html", { outputFolder: "playwright-report", open: "never" }],
      ],
  use: {
    baseURL: process.env.APP_URL || "https://testathon.live",
    trace: isBrowserStack ? "retain-on-failure" : "on-first-retry",
    screenshot: "only-on-failure",
    video: isBrowserStack ? "retain-on-failure" : "off",
    actionTimeout: 15 * 1000,
    navigationTimeout: 30 * 1000,
    testObservability: true,
  },

  projects: isBrowserStack
    ? [{ name: "browserstack" }]
    : [
        {
          name: "chromium",
          use: { ...devices["Desktop Chrome"] },
        },
        {
          name: "firefox",
          use: { ...devices["Desktop Firefox"] },
        },
        {
          name: "webkit",
          use: { ...devices["Desktop Safari"] },
        },
      ],
});
