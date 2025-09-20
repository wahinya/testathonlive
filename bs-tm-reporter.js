// bs-tm-reporter.js
const fs = require("fs");

// Try to load fetch (works in Node 18+, polyfill for <18)
let fetchFn;
try {
  fetchFn = global.fetch || require("node-fetch");
} catch (err) {
  console.warn(
    "⚠️ Fetch not found, BrowserStack TM updates may fail:",
    err.message
  );
}

class BrowserStackTMReporter {
  constructor(options) {
    this.username = options.username;
    this.accessKey = options.accessKey;
    this.projectName = options.projectName;
    this.buildName = options.buildName;
  }

  async onTestEnd(test, result) {
    const title = test.title;
    const match = title.match(/\[TC-(\d+)\]/); // Extract TC ID like [TC-1928]
    if (!match) return;

    const tcId = match[0]; // full "TC-1928"
    const status = result.status === "passed" ? "passed" : "failed";

    console.log(`📡 Updating BrowserStack TM: ${tcId} -> ${status}`);

    if (!fetchFn) return;

    try {
      const response = await fetchFn(
        `https://api.browserstack.com/test-management/v1/testcases/${tcId}/results`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Basic " +
              Buffer.from(`${this.username}:${this.accessKey}`).toString(
                "base64"
              ),
          },
          body: JSON.stringify({
            status,
            projectName: this.projectName,
            buildName: this.buildName,
          }),
        }
      );

      if (!response.ok) {
        console.error(
          `❌ Failed to update TM for ${tcId}: ${response.status} ${response.statusText}`
        );
      }
    } catch (err) {
      console.error(`❌ Error updating TM for ${tcId}:`, err.message);
    }
  }
}

module.exports = BrowserStackTMReporter;
