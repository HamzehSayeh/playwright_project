import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Add Then Remove From Cart Using Standard Username', () => {
    test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/inventory.html");
  });
    test('should add an item to the cart and remove it', async ({ page }) => {
        await page.click('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
        await page.waitForTimeout(2000);
        await page.click('[data-test="remove-sauce-labs-fleece-jacket"]');
        await page.click('.shopping_cart_link');
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
        await expect(page.locator('.cart_item')).toHaveCount(0);
    });

    test('should add two items to the cart and remove them', async ({ page }) => {
        await page.click('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
        await page.waitForTimeout(2000);
        await page.click('[data-test="remove-sauce-labs-fleece-jacket"]');
        await page.waitForTimeout(2000);
        await page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
        await page.waitForTimeout(2000);
        await page.click('[data-test="remove-sauce-labs-bolt-t-shirt"]');
        await page.click('.shopping_cart_link');
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
        await expect(page.locator('.cart_item')).toHaveCount(0);

    });
});

test.describe('Add To Cart Using Problem Username and remove it', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await page.waitForTimeout(3000);
        await loginPage.login(process.env.PROBLEM_USERNAME!, process.env.PASSWORD!);

        await page.waitForTimeout(3000);
        await expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
    });
    test.fail('Test is not adding the Sauce Labs Fleece Jacket so not removing it ', async ({ page }) => {
        await page.click('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
        await page.waitForTimeout(2000);
        await expect(page.locator('[data-test="remove-sauce-labs-fleece-jacket"]')).toBeVisible();
        await page.click('[data-test="remove-sauce-labs-fleece-jacket"]');
        await page.click('.shopping_cart_link');
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
        await expect(page.locator('.cart_item')).toHaveCount(0);
    });

});

test.describe('Add To Cart Using Error Username', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await page.waitForTimeout(3000);
        await loginPage.login(process.env.ERROR_USERNAME!, process.env.PASSWORD!);

        await page.waitForTimeout(3000);
        await expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
    });
    test.fail('Test is not adding the Sauce Labs Fleece Jacket so not removing it ', async ({ page }) => {
        await page.click('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
        await page.waitForTimeout(2000);
        await expect(page.locator('[data-test="remove-sauce-labs-fleece-jacket"]')).toBeVisible();
        await page.click('[data-test="remove-sauce-labs-fleece-jacket"]');
        await page.click('.shopping_cart_link');
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
        await expect(page.locator('.cart_item')).toHaveCount(0);
    });

});


