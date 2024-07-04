import { test, expect } from '@playwright/test';
import { isLeft, unwrapEither } from '../lib/either';
import { getEnv } from '../lib/env';

export const testSearch =  function () {
  test.describe('Search @smoke', () => {
    let headerLocator, searchInput;
    const searchTermEither = getEnv('SEARCH_TERM');
    if (isLeft(searchTermEither)) {
      throw new Error('BASE_URL variable error: ' + unwrapEither(searchTermEither));
    }
    const searchTerm = unwrapEither(searchTermEither);

    test.beforeEach(async ({ page }) => {
      headerLocator = page.locator('header nav.navUser');
      searchInput = headerLocator.getByPlaceholder('Search for products');
    });
  
    test('Search input is visible', async ({ page }) => {
      await expect(searchInput).toBeVisible();
    });

    test('Search input accepts input', async ({ page }) => {
      // fill -> https://playwright.dev/docs/api/class-locator#locator-fill
      searchInput.fill(searchTerm);
      await expect(searchInput).toHaveValue(searchTerm);
    });

    test('QuickSearch show at least one product image', async ({ page }) => {
      searchInput.fill(searchTerm);
      const quickSearchLocator = headerLocator.locator('.quickSearchResults');

      await expect(quickSearchLocator).toBeVisible();
      const figureCount = await quickSearchLocator.locator('.product figure').count();
      await expect(figureCount).toBeGreaterThan(0);
    });
  
    test('Result page has correct heading', async ({ page }) => {
      await searchInput.fill(searchTerm);

      // press -> https://playwright.dev/docs/api/class-keyboard
      await searchInput.press('Enter');

      await expect(page.getByText(/[0-9]+ results for '[A-Za-z]+'$/i)).toBeVisible();
      //await expect(page.locator('#search-results-heading').getByRole('heading', { name: searchTerm, exact: false })).toBeVisible();
    });
  });
}
