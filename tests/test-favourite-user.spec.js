require("dotenv").config();
const { test } = require("@playwright/test");
const { navigateToLoginPage, login } = require("../pages/login/LoginPage");

test("all shelf items favourite button state should be verified [TC-1930]", async ({
  page,
}) => {
  let testStatus = "passed";

  try {
    await navigateToLoginPage(page);

    // Login with fav_user creds from env
    await login(page, process.env.FAV_USER_NAME, process.env.FAV_USER_PASS);
    const usernameElement = page.locator("//span[@class='username']");
    await expect(usernameElement).toHaveText(process.env.FAV_USER_NAME);

    // checkif there is a favourited item
    await shelfPage.verifyAllFavouriteButtonsClicked();
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
