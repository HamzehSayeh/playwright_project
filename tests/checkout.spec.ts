import { test, expect } from "@playwright/test";

test.describe("Checkout as standard user", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/inventory.html");
  });
  test("checkout with one item", async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.waitForTimeout(2000);

    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
    await expect(page.locator(".cart_item")).toHaveCount(1);
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(
      "Sauce Labs Backpack"
    );
    await page.waitForTimeout(2000);
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill("hamzeh");
    await page.waitForTimeout(2000);

    await page.locator('[data-test="lastName"]').fill("sayeh");
    await page.waitForTimeout(2000);

    await page.locator('[data-test="postalCode"]').fill("P400");
    await page.waitForTimeout(2000);
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator(".cart_item")).toHaveCount(1);
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(
      "Sauce Labs Backpack"
    );
    await page.waitForTimeout(2000);

    await page.locator('[data-test="finish"]').click();
    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-complete.html"
    );
    await page.waitForTimeout(2000);

    await page.locator('[data-test="back-to-products"]').click();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });
  test("checkout with zero items", async ({ page }) => {
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
    await expect(page.locator(".cart_item")).not.toHaveCount(1);

    await page.waitForTimeout(2000);
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill("hamzeh");
    await page.waitForTimeout(2000);

    await page.locator('[data-test="lastName"]').fill("sayeh");
    await page.waitForTimeout(2000);

    await page.locator('[data-test="postalCode"]').fill("P400");
    await page.waitForTimeout(2000);
    await page.locator('[data-test="continue"]').click();

    await page.waitForTimeout(2000);

    await page.locator('[data-test="finish"]').click();
    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-complete.html"
    );
    await page.waitForTimeout(2000);

    await page.locator('[data-test="back-to-products"]').click();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test.fail("checking out with out filling name info", async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.waitForTimeout(2000);

    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
    await expect(page.locator(".cart_item")).toHaveCount(1);
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(
      "Sauce Labs Backpack"
    );
    await page.waitForTimeout(2000);
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill("");
    await page.waitForTimeout(2000);

    await page.locator('[data-test="lastName"]').fill("");
    await page.waitForTimeout(2000);

    await page.locator('[data-test="postalCode"]').fill("p400");
    await page.waitForTimeout(2000);
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator(".error-message-container")).toBeVisible();
    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-step-two.html"
    );
  });
});
