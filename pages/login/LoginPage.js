const { expect } = require("@playwright/test");

class LoginPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.usernameDropdown = page.locator("#username");
    this.passwordDropdown = page.locator("#password");
    this.loginButton = page.getByRole("button", { name: /log in/i });
    this.signInLink = page.getByRole("link", { name: /Sign in/i });
  }

  async navigateToLoginPage() {
    await this.page.goto(process.env.APP_URL);
    await expect(this.signInLink).toBeVisible();
    await this.signInLink.click();
  }

  async selectFromReactSelect(containerLocator, value) {
    await expect(containerLocator).toBeVisible();
    await containerLocator.click();

    const input = containerLocator.locator(
      'input[id^="react-select"][id$="-input"]'
    );
    await expect(input).toBeVisible();
    await input.fill(value);

    // ✅ Restrict to option elements only
    const option = this.page.locator(".css-1n7v3ny-option", {
      hasText: value,
    });

    await expect(option).toBeVisible();
    await option.click();
  }

  async selectUsername(username) {
    await this.selectFromReactSelect(this.usernameDropdown, username);
  }

  async selectPassword(password) {
    await this.selectFromReactSelect(this.passwordDropdown, password);
  }

  async login(username, password) {
    await this.selectUsername(username);
    await this.selectPassword(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };
