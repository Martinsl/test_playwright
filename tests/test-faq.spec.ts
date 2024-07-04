import { test, expect } from '@playwright/test';
import { isLeft, unwrapEither } from './lib/either';
import { getEnv } from './lib/env';
import { testFooterInLocator } from './common/footer';
import { testMenuInLocator } from './common/menu';
import { testSearch } from './common/search';


test.describe('FAQ data', () => {
  const urlEither = getEnv('BASE_URL');
  if (isLeft(urlEither)) {
    throw new Error('BASE_URL variable error: ' + unwrapEither(urlEither));
  }

  const faqUriEither = getEnv('FAQ_URI');
  if (isLeft(faqUriEither)) {
    throw new Error('FAQ_URI variable error: ' + unwrapEither(urlEither));
  }
  const url = unwrapEither(urlEither) + unwrapEither(faqUriEither);

  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  // Start by testing the common areas
  testFooterInLocator();
  testMenuInLocator();
  testSearch();



  test('Title is as expected', async ({ page }) => {
    const titleEither = getEnv('FAQ_TITLE');
    if (isLeft(titleEither)) {
      throw new Error('FAQ_TITLE variable error: ' + unwrapEither(urlEither));
    }

    const expectedTitle = unwrapEither(titleEither);
    await expect(page).toHaveTitle(expectedTitle);
  });

  test('At least one faq is visible', async ({ page }) => {
    const headingLocator = page.locator('.page-content h2')
    .or(page.locator('.page-content h3')).first();
    await expect(headingLocator).toBeVisible();
  });
});
