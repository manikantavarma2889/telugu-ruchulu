import { test, expect } from '@playwright/test';

test.describe('Telugu Ruchulu storefront', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /what's on your mind/i })).toBeVisible({ timeout: 15_000 });
  });

  test('loads the customer storefront with accessible landmarks', async ({ page }) => {
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('main').locator('h2').first()).toHaveText(/what's on your mind/i);
    const skipLink = page.getByRole('link', { name: /skip to main content/i });
    await expect(skipLink).toHaveCount(1);
    const search = page.getByRole('searchbox', { name: /search dishes/i });
    await expect(search).toBeVisible();
  });

  test('supports menu search', async ({ page }) => {
    const search = page.getByRole('searchbox', { name: /search dishes/i });
    await search.fill('Biryani');
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Hyderabadi Biryani' })).toBeVisible();
  });

  test('supports category filtering', async ({ page }) => {
    await page.getByRole('button', { name: /filter by biryani/i }).click();
    await expect(page.getByRole('heading', { name: /biryani recommendations/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Hyderabadi Biryani' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Vegetable Biryani' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Andhra Meals' })).toHaveCount(0);
  });

  test('supports adding a dish to the cart and changing quantity', async ({ page }) => {
    const biryani = page.getByRole('article', { name: /Hyderabadi Biryani/i });
    await biryani.getByRole('button', { name: /add Hyderabadi Biryani to cart/i }).click();
    await expect(biryani.getByLabel(/Hyderabadi Biryani, quantity 1/i)).toBeVisible();
    await biryani.getByRole('button', { name: /add one more Hyderabadi Biryani to cart/i }).click();
    await expect(biryani.getByLabel(/Hyderabadi Biryani, quantity 2/i)).toBeVisible();
  });

  test('serves the PWA manifest and registers a service worker', async ({ page, request }) => {
    const manifestResponse = await request.get('/manifest.webmanifest');
    expect(manifestResponse.ok()).toBeTruthy();
    const manifest = await manifestResponse.json();
    expect(manifest.name).toBe('Telugu Ruchulu');
    expect(manifest.display).toBe('standalone');
    const serviceWorkerReady = await page.evaluate(async () => {
      if (!('serviceWorker' in navigator)) return false;
      const registration = await navigator.serviceWorker.ready;
      return Boolean(registration.active);
    });
    expect(serviceWorkerReady).toBeTruthy();
  });
});
