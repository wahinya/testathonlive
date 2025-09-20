require("dotenv").config();
const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/login/LoginPage");

test("Login as demouser [TC-48691307]", async ({ page }) => {
  const loginPage = new LoginPage(page);
  let testStatus = "passed";
  try {
    await loginPage.navigateToLoginPage();
    await loginPage.login(
      process.env.DEMO_USER_NAME,
      process.env.DEMO_USER_PASS
    );
    // ✅ Check username is visible and matches
    const usernameElement = page.locator("//span[@class='username']");
    await expect(usernameElement).toHaveText(process.env.DEMO_USER_NAME);
  } catch (err) {
    testStatus = "failed";
    throw err;
  } finally {
    // Report status to BrowserStack safely
    try {
      await page.evaluate((_status, name) => {
        window.browserstack_executor?.({
          action: "setSessionStatus",
          arguments: { status: _status, reason: "Test completed", name },
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
