import { test, expect } from '@playwright/test';
import { isLeft, unwrapEither } from './lib/either';
import { getEnv } from './lib/env';
import { testFooterInLocator } from './common/footer';
import { testMenuInLocator } from './common/menu';
import { testSearch } from './common/search';

test.describe('Home Page data', () => {
  const urlEither = getEnv('BASE_URL');
  if (isLeft(urlEither)) {
    throw new Error('BASE_URL variable error: ' + unwrapEither(urlEither));
  }
  const baseUrl = unwrapEither(urlEither);

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  // Start by testing the common areas
  testFooterInLocator();
  testMenuInLocator();
  testSearch();
});
