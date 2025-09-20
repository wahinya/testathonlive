// playwright.config.js
const { defineConfig, devices } = require("@playwright/test");
require("dotenv").config();

const BS_USERNAME = process.env.BROWSERSTACK_USERNAME;
const BS_ACCESS_KEY = process.env.BROWSERSTACK_ACCESS_KEY;
const BS_PROJECT_ID = process.env.BROWSERSTACK_PROJECT_ID;
const buildName = `Build-${new Date().toISOString()}`;
const isBrowserStack = !!BS_USERNAME && !!BS_ACCESS_KEY;

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 60 * 1000,
  expect: { timeout: 5000 },
  retries: isBrowserStack ? 2 : 0,
  globalSetup: require.resolve("./global-setup"), // polyfill fetch

  reporter: isBrowserStack
    ? [
        ["line"],
        [
          "./bs-tm-reporter.js", // your custom TM reporter
          {
            username: BS_USERNAME,
            accessKey: BS_ACCESS_KEY,
            projectId: BS_PROJECT_ID,
            buildName,
          },
        ],
      ]
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
    ? [
        {
          name: "bs-chrome",
          use: {
            connectOptions: {
              wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(
                JSON.stringify({
                  browser: "chrome",
                  os: "osx",
                  osVersion: "ventura",
                  "browserstack.username": BS_USERNAME,
                  "browserstack.accessKey": BS_ACCESS_KEY,
                  "browserstack.video": true,
                  "browserstack.networkLogs": true,
                  sessionName: "testathon live session",
                  build: buildName,
                  testObservability: true,
                })
              )}`,
            },
          },
        },
      ]
    : [
        { name: "chromium", use: { ...devices["Desktop Chrome"] } },
        { name: "firefox", use: { ...devices["Desktop Firefox"] } },
        { name: "webkit", use: { ...devices["Desktop Safari"] } },
      ],
});
