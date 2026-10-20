import { test, expect } from '@playwright/test';

const BASE_URL = 'https://the-internet.herokuapp.com';

test('home page', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle('The Internet');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Welcome to the-internet');
});

test('dynamic loading', async ({ page }) => {
    await page.goto(`${BASE_URL}/dynamic_loading/1`);
    await page.getByRole('button', { name: 'Start' }).click();
    // The text appears after a few seconds of loading.
    await expect(page.locator('#finish')).toHaveText('Hello World!', { timeout: 15000 });
});

test('new tab', async ({ page, context }) => {
    await page.goto(`${BASE_URL}/windows`);
    const newPagePromise = context.waitForEvent('page');
    await page.getByRole('link', { name: 'Click Here' }).click();
    const newPage = await newPagePromise;
    await newPage.waitForLoadState();
    await expect(newPage.getByRole('heading')).toHaveText('New Window');
    await newPage.close();
    await expect(page).toHaveURL(/.*\/windows$/);
});
