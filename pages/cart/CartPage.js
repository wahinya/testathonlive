const { expect } = require("@playwright/test");

class ShelfPage {
  constructor(page) {
    this.page = page;
    this.shelfItems = page.locator(".shelf-item");
  }

  async verifyAtLeastOneFavourited() {
    await this.page.waitForSelector(".shelf-item button.clicked", {
      timeout: 5000,
    });

    const clickedButtons = this.page.locator(".shelf-item button.clicked");
    const count = await clickedButtons.count();

    expect(count).toBeGreaterThan(0); // ✅ at least one favourited
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
