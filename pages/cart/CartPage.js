const { expect } = require("@playwright/test");

class ShelfPage {
  constructor(page) {
    this.page = page;
    this.shelfItems = page.locator(".shelf-item");
  }

  async goto(url) {
    await this.page.goto(url);
  }

  async verifyAllFavouriteButtonsClicked() {
    const count = await this.shelfItems.count();

    for (let i = 0; i < count; i++) {
      const favBtn = this.shelfItems
        .nth(i)
        .locator('button[aria-label="delete"]');
      const favClass = await favBtn.getAttribute("class");

      await expect(
        favClass && favClass.includes("clicked"),
        `Shelf item ${i} favourite button should be clicked`
      ).toBeTruthy();
    }
  }

  async verifyAllHaveImages() {
    const count = await this.shelfItems.count();

    for (let i = 0; i < count; i++) {
      const img = this.shelfItems.nth(i).locator("img");
      await expect(img, `Shelf item ${i} should have an image`).toHaveAttribute(
        "src",
        /.+/
      );
    }
  }
}

module.exports = { ShelfPage };
