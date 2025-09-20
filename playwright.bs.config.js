require("dotenv").config();
const { defineConfig } = require("@playwright/test");

const BS_USERNAME = process.env.BROWSERSTACK_USERNAME;
const BS_ACCESS_KEY = process.env.BROWSERSTACK_ACCESS_KEY;
const buildName = `Build-${new Date().toISOString()}`;

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 60 * 1000,
  reporter: [
    ["line"],
    [
      "@browserstack/test-management-playwright-reporter",
      {
        username: BS_USERNAME,
        accessKey: BS_ACCESS_KEY,
        projectName: "testathon.live",
        buildName: `Build-${new Date().toISOString()}`,
      },
    ],
  ],
  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  testObservability: true,
  projects: [
    {
      name: "bs-chrome",
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(
            JSON.stringify({
              browser: "chrome", // 👈 must be one of the allowed values
              os: "osx",
              osVersion: "ventura", // can use "latest" too
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
  ],
});
