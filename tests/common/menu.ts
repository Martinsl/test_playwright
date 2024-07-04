import { test, expect } from '@playwright/test';
import { getArrayFromEnv } from '../lib/env';

export const testMenuInLocator =  function () {
  test.describe('Menu data @smoke', () => {
    let menuLocator;

    test.beforeEach(async ({ page }) => {
      menuLocator = page.locator('#menu');
    });

    getArrayFromEnv("MENU_HEADINGS").forEach(menuItem => {
      test(`Menu Item "${menuItem}" exists`, async ({ page }) => {
        await expect(menuLocator.getByLabel(menuItem, { exact: true })).toBeVisible();
      });
    });
  });
}
