import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe("sort feature for standard user", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/inventory.html");
  });

  test("Sort from Name (A to Z)", async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').click();
    await page.waitForTimeout(2000);
    const originalFirstItem = await page
      .locator(".inventory_item_name")
      .first()
      .textContent();
    await page.selectOption('[data-test="product-sort-container"]', "az");
    await page.waitForTimeout(2000);
    const names = await page.locator(".inventory_item_name").allTextContents();
    await expect(page.locator(".inventory_item_name").first()).toHaveText(
      originalFirstItem!
    );

    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
    await page.locator('[data-test="product-sort-container"]').click();
    await page.waitForTimeout(2000);
  });

  test("Sort from Name (Z to A)", async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').click();
    await page.waitForTimeout(2000);
    const originalFirstItem = await page
      .locator(".inventory_item_name")
      .first()
      .textContent();
    await page.selectOption('[data-test="product-sort-container"]', "za");
    await page.waitForTimeout(2000);
    const names = await page.locator(".inventory_item_name").allTextContents();
    await expect(page.locator(".inventory_item_name").first()).not.toHaveText(
      originalFirstItem!
    );

    const reverseSort = [...names].sort().reverse();
    expect(names).toEqual(reverseSort);

    await page.locator('[data-test="product-sort-container"]').click();
    await page.waitForTimeout(2000);
  });

  test("Sort Price low to high", async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').click();
    await page.waitForTimeout(2000);

    await page.selectOption('[data-test="product-sort-container"]', "lohi");
    await page.waitForTimeout(2000);

    const prices = await page
      .locator(".inventory_item_price")
      .allTextContents();
    const numericPrices = prices.map((p) => parseFloat(p.replace("$", "")));
    const sorted = [...numericPrices].sort((a, b) => a - b);
    expect(numericPrices).toEqual(sorted);

    await page.locator('[data-test="product-sort-container"]').click();
    await page.waitForTimeout(2000);
  });

  test("Sort Price high to low", async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').click();
    await page.waitForTimeout(2000);

    await page.selectOption('[data-test="product-sort-container"]', "hilo");
    await page.waitForTimeout(2000);

    const prices = await page
      .locator(".inventory_item_price")
      .allTextContents();
    const numericPrices = prices.map((p) => parseFloat(p.replace("$", "")));
    const reverseSort = [...numericPrices].sort((a, b) => b - a);
    expect(numericPrices).toEqual(reverseSort);

    await page.locator('[data-test="product-sort-container"]').click();
    await page.waitForTimeout(2000);
  });
});

test.describe("Sort feature for problem_user", () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(process.env.PROBLEM_USERNAME!, process.env.PASSWORD!);
  });

  test.fail(
    "Sorting from A to Z should not sort correctly",
    async ({ page }) => {
      await page.selectOption('[data-test="product-sort-container"]', "az");
      await page.waitForTimeout(1000);

      const names = await page
        .locator(".inventory_item_name")
        .allTextContents();
      const sorted = [...names].sort();

      expect(names).not.toEqual(sorted);
    }
  );

  test.fail(
    "Sorting from Z to A should not sort correctly",
    async ({ page }) => {
      await page.locator('[data-test="product-sort-container"]').click();

      await page.selectOption('[data-test="product-sort-container"]', "za");
      await page.waitForTimeout(1000);

      const names = await page
        .locator(".inventory_item_name")
        .allTextContents();
      const reverseSorted = [...names].sort().reverse();

      expect(names).toEqual(reverseSorted);
    }
  );

  test.fail(
    "Sorting by price low to high should not work properly",
    async ({ page }) => {
      await page.locator('[data-test="product-sort-container"]').click();
      await page.waitForTimeout(2000);

      await page.selectOption('[data-test="product-sort-container"]', "lohi");
      await page.waitForTimeout(2000);

      const prices = await page
        .locator(".inventory_item_price")
        .allTextContents();
      const numericPrices = prices.map((p) => parseFloat(p.replace("$", "")));
      const sorted = [...numericPrices].sort((a, b) => a - b);
      expect(numericPrices).toEqual(sorted);

      await page.locator('[data-test="product-sort-container"]').click();
      await page.waitForTimeout(2000);
    }
  );

  test.fail("Sort Price high to low", async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').click();
    await page.waitForTimeout(2000);

    await page.selectOption('[data-test="product-sort-container"]', "hilo");
    await page.waitForTimeout(2000);

    const prices = await page
      .locator(".inventory_item_price")
      .allTextContents();
    const numericPrices = prices.map((p) => parseFloat(p.replace("$", "")));
    const reverseSort = [...numericPrices].sort((a, b) => b - a);
    expect(numericPrices).toEqual(reverseSort);

    await page.locator('[data-test="product-sort-container"]').click();
    await page.waitForTimeout(2000);
  });
});
