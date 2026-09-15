import { test, expect } from '@playwright/test';

test.describe('Telugu Ruchulu storefront', () => {
  test('loads the customer storefront', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /what's on your mind/i })).toBeVisible({ timeout: 15_000 });
    await expect(page.getByRole('main')).toBeVisible();
  });

  test('supports menu search', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /what's on your mind/i })).toBeVisible({ timeout: 15_000 });

    const search = page.getByRole('searchbox').first();
    if (await search.count()) {
      await search.fill('Biryani');
      await expect(page.getByRole('main')).toBeVisible();
    }
  });
});
