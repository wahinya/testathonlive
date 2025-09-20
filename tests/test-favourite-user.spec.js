require("dotenv").config();
const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/login/LoginPage");
const { ShelfPage } = require("../pages/cart/CartPage");

test("all shelf items favourite button state should be verified [TC-1929]", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const shelfPage = new ShelfPage(page);
  let testStatus = "passed";

  try {
    await loginPage.navigateToLoginPage(page);
    await loginPage.login(process.env.FAV_USER_NAME, process.env.FAV_USER_PASS);

    const usernameElement = page.locator("//span[@class='username']");
    await expect(usernameElement).toHaveText(process.env.FAV_USER_NAME);

    // checkif there is a favourited item
    await shelfPage.verifyAtLeastOneFavourited();
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
