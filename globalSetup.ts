import { chromium } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("https://www.saucedemo.com");
  await page.fill('[data-test="username"]', process.env.STANDARD_USERNAME!);
  await page.fill('[data-test="password"]', process.env.PASSWORD!);
  await page.click('[data-test="login-button"]');

  await page.context().storageState({ path: "storage/standard-user.json" });
  await browser.close();
}
export default globalSetup;
