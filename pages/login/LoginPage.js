const { expect } = require("@playwright/test");

async function navigateToLoginPage(page) {
  await page.goto(process.env.APP_URL);

  // Use role+name locator instead of invalid ID
  const signInLink = page.getByRole("link", { name: "Sign In" });

  await expect(signInLink).toBeVisible();
  await signInLink.click();
}

async function login(page, username, password) {
  await page.click("div[id*='username']");
  await page.locator("div.css-26l3qy-menu span", { hasText: username }).click();

  // Open password dropdown
  await page.click("div[id*='password']");
  await page.locator("div.css-26l3qy-menu span", { hasText: password }).click();

  // Submit login using ID
  await page.click("#login-btn");
}

module.exports = {
  navigateToLoginPage,
  login,
};
