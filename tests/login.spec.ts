import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Valid Login Tests', () => {
    test('Valid Login Using Valid Standard Username And Valid Password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await page.waitForTimeout(2000);
        await loginPage.login(process.env.STANDARD_USERNAME!, process.env.PASSWORD!);
        await page.waitForTimeout(2000);
        await expect(page.getByText('Swag Labs')).toBeVisible;
        await page.waitForTimeout(2000);
        await expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
    });

    test(' Login Using Problem Username And Valid Password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await page.waitForTimeout(2000);
        await loginPage.login(process.env.PROBLEM_USERNAME!, process.env.PASSWORD!);
        await page.waitForTimeout(2000);
        await expect(page.getByText('Swag Labs')).toBeVisible;
        await page.waitForTimeout(2000);
        await expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
    });

    test(' Login Using Performance Glitch Username And Valid Password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await page.waitForTimeout(2000);
        await loginPage.login(process.env.PERFORMANCE_GLITCH_USERNAME!, process.env.PASSWORD!);
        await page.waitForTimeout(2000);
        await expect(page.getByText('Swag Labs')).toBeVisible;
        await page.waitForTimeout(2000);
        await expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
    });

    test(' Login Using Error Username And Valid Password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await page.waitForTimeout(2000);
        await loginPage.login(process.env.ERROR_USERNAME!, process.env.PASSWORD!);
        await page.waitForTimeout(2000);
        await expect(page.getByText('Swag Labs')).toBeVisible;
        await page.waitForTimeout(2000);
        await expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
    });

    test('Valid Login Using Valid Visual Username And Valid Password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await page.waitForTimeout(2000);
        await loginPage.login(process.env.VISUAL_USERNAME!, process.env.PASSWORD!);
        await page.waitForTimeout(2000);
        await expect(page.getByText('Swag Labs')).toBeVisible;
        await page.waitForTimeout(2000);
        await expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
    });
});

test.describe('Invalid Login Tests', () => {
    test('Invalid Login Using Valid Standard Username And Invalid Password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await page.waitForTimeout(2000);
        await loginPage.login(process.env.STANDARD_USERNAME!, 'invalid password');
        await page.waitForTimeout(2000);
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await page.waitForTimeout(2000);
        await expect(page.locator('[data-test="error"]')).toContainText("Epic sadface: Username and password do not match any user in this service");
    });

    test('Invalid Login Using Valid Standard Username And An Empty Password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await page.waitForTimeout(2000);
        await loginPage.login(process.env.STANDARD_USERNAME!, '');
        await page.waitForTimeout(2000);
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText("Epic sadface: Password is required");
    });

    test('Invalid Login Using Empty Username And An Empty Password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await page.waitForTimeout(2000);
        await loginPage.login('', '');
        await page.waitForTimeout(2000);
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText("Epic sadface: Username is required");
    });

    test('Invalid Login Using Empty Username And Valid Password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await page.waitForTimeout(2000);
        await loginPage.login('', process.env.PASSWORD!);
        await page.waitForTimeout(2000);
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText("Epic sadface: Username is required");
    });

    test('Login Using Locked Out Username And Valid Password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await page.waitForTimeout(2000);
        await loginPage.login(process.env.LOCKED_OUT_USERNAME!, process.env.PASSWORD!);
        await page.waitForTimeout(2000);
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText("Epic sadface: Sorry, this user has been locked out.");
    });
});
