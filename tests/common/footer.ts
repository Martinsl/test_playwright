import { test, expect } from '@playwright/test';
import { getArrayFromEnv } from '../lib/env';

export const testFooterInLocator =  function () {
  test.describe('Footer data @smoke', () => {
    let footerLocator;

    test.beforeEach(async ({ page }) => {
      footerLocator = page.locator('footer');
    });

    getArrayFromEnv("FOOTER_HEADINGS").forEach(heading => {
      test(`Heading "${heading}" exists`, async ({ page }) => {
        await expect(footerLocator.getByRole('heading', { name: heading })).toBeVisible();
      });
    });
  
    test('there is a newsletter subscription text, input with placeholder and submit button', async ({ page }) => {
      await expect(footerLocator.getByRole('heading', { name: /Newsletter/i })).toBeVisible();
  
      await expect(footerLocator.getByPlaceholder(/email/i)).toBeVisible();
      await expect(footerLocator.getByRole('button', { name: 'Subscribe' })).toBeVisible();
    });
  
    test('there is a storeInfo section and the address is not empty', async ({ page }) => {
      const storeInfoLocator = footerLocator.locator('[data-section-type=storeInfo]');
      await expect(storeInfoLocator).toBeVisible();
  
      await expect(storeInfoLocator.locator('address')).not.toBeEmpty();
    });
  
    test('there is a copyright and it mentions the correct year', async ({ page }) => {
      const copyrightLocator = footerLocator.locator('.footer-copyright');
  
      await expect(copyrightLocator).toContainText(new Date().getFullYear().toString());
    });
  });
}
