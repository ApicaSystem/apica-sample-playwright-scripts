import { test, expect } from '@playwright/test';

const BASE_URL = "https://www.saucedemo.com"

test('test login fail', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.locator('[data-test="username"]').fill("locked_out_user")
    await page.locator('[data-test="password"]').fill("secret_sauce")
    await page.locator('[data-test="login-button"]').click()
    await expect(page.locator('[data-test="title"]')).toHaveText("Products")
});
