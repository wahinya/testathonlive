const { expect } = require("@playwright/test");

async function navigateToLoginPage(page) {
  await page.goto(process.env.APP_URL);

  // Use role+name locator instead of invalid ID
  const signInLink = page.getByRole("link", { name: "Sign In" });

  await expect(signInLink).toBeVisible();
  await signInLink.click();
}

async function login(page, username, password) {
  // Select username from first custom dropdown
  await page.click("div[class=' css-26l3qy-menu']"); // open username dropdown
  await page.click(
    `div[class=' css-26l3qy-menu'] span:has-text("${username}")`
  );

  // Select password from second custom dropdown
  await page.click("div[class=' css-26l3qy-menu'] >> nth=1"); // open password dropdown
  await page.click(
    `div[class=' css-26l3qy-menu'] >> nth=1 span:has-text("${password}")`
  );

  // Submit login using ID
  await page.click("#login-btn");
}

module.exports = {
  navigateToLoginPage,
  login,
};
