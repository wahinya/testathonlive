// tests/shelf-items.spec.js
const { test, expect } = require("@playwright/test");

test("all shelf items should have an image [TC-1930]", async ({ page }) => {
  let testStatus = "passed";

  try {
    // Login with image_not_loading creds from env
    await login(page, process.env.IMAGE_USER_NAME, process.env.IMAGE_USER_PASS);
    const usernameElement = page.locator("//span[@class='username']");
    await expect(usernameElement).toHaveText(process.env.IMAGE_USER_NAME);
    // veriy all have image
    await shelfPage.verifyAllHaveImages();
  } catch (e) {
    testStatus = "failed";
    throw e;
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
