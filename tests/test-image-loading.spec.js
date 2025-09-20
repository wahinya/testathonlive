// tests/shelf-items.spec.js
const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/login/LoginPage");
const { ShelfPage } = require("../pages/cart/CartPage");

test("all shelf items should have an image [TC-48699979]", async ({ page }) => {
  let testStatus = "passed";
  const loginPage = new LoginPage(page);
  const shelfPage = new ShelfPage(page);
  try {
    await loginPage.navigateToLoginPage(page);
    await loginPage.login(
      process.env.IMAGE_USER_NAME,
      process.env.IMAGE_USER_PASS
    );

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
