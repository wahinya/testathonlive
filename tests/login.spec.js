require("dotenv").config();
const { test } = require("@playwright/test");
const { navigateToLoginPage, login } = require("../pages/login/LoginPage");

test("Login as demouser [TC-1928]", async ({ page }) => {
  let testStatus = "passed";
  try {
    await navigateToLoginPage(page);
    await login(page, process.env.DEMO_USER_NAME, process.env.DEMO_USER_PASS);
    // ✅ Check username is visible and matches
    const usernameElement = page.locator("//span[@class='username']");
    await expect(usernameElement).toHaveText(process.env.DEMO_USER_NAME);
  } catch (err) {
    testStatus = "failed";
    throw err;
  } finally {
    // Report status to BrowserStack safely
    try {
      await page.evaluate((_status) => {
        window.browserstack_executor?.({
          action: "setSessionStatus",
          arguments: { status: _status, reason: "Test completed" },
        });
      }, testStatus);
    } catch (reportErr) {
      console.warn(
        "⚠️ Could not update BrowserStack session status:",
        reportErr.message
      );
    }
  }
});
