import { test, expect } from '@playwright/test';

/**
 * ARROW FUNCTIONS IN REAL PLAYWRIGHT TESTS
 *
 * Put this file in your  tests/  folder and run:
 *     npx playwright test tests/arrow-functions.spec.ts --project=chromium
 *
 * It needs NO internet: Playwright itself answers for the fake site https://app.test
 * (that is what page.route(...) does).
 *
 * Every  =>  below is an arrow function. Read the comments to see WHY.
 */

// A tiny web page. Clicking "Load" fetches /api/items and shows how many came back.
const PAGE_HTML = `
  <ul id="todos"><li>  Buy milk </li><li>Walk dog</li><li>Read book</li></ul>
  <button id="load">Load</button>
  <p id="status"></p>
  <script>
    document.getElementById('load').addEventListener('click', async () => {
      const res = await fetch('/api/items');
      const items = await res.json();
      document.getElementById('status').textContent = 'Loaded ' + items.length;
    });
  </script>
`;

// test.describe(name, arrow)  groups tests. The arrow function holds the tests inside.
test.describe('Arrow functions in Playwright', () => {
  // test.beforeEach(arrow)  runs before EVERY test. Playwright passes { page } into the arrow.
  test.beforeEach(async ({ page }) => {
    // page.route(pattern, arrow)  - the arrow decides how to answer each request.
    await page.route('https://app.test/**', (route) => {
      if (route.request().url().endsWith('/api/items')) {
        return route.fulfill({ json: ['Buy milk', 'Walk dog'] });
      }
      return route.fulfill({ contentType: 'text/html', body: PAGE_HTML });
    });
    await page.goto('https://app.test/');
  });

  // 1. The test body itself is an async arrow function.
  //    async  = it may use await.   ({ page })  = take only "page" from the fixtures.
  test('the test body is an async arrow function', async ({ page }) => {
    await expect(page.locator('#todos li')).toHaveCount(3);
  });

  // 2. Arrow functions inside array methods. allTextContents() gives you a plain array of strings.
  test('array methods take arrow callbacks', async ({ page }) => {
    const rawTexts = await page.locator('#todos li').allTextContents();
    const cleaned = rawTexts.map((text) => text.trim());
    expect(cleaned).toEqual(['Buy milk', 'Walk dog', 'Read book']);

    const withDog = cleaned.filter((text) => text.includes('dog'));
    expect(withDog).toEqual(['Walk dog']);
  });

  // 3. page.evaluate(arrow) runs the arrow function INSIDE THE BROWSER, not in your test.
  //    So it cannot see your test variables. Pass them in as the second argument instead.
  test('page.evaluate runs an arrow function inside the browser', async ({ page }) => {
    const count = await page.evaluate(() => document.querySelectorAll('li').length);
    expect(count).toBe(3);

    const selector = 'li'; // a variable from the test...
    const countAgain = await page.evaluate((sel) => document.querySelectorAll(sel).length, selector); // ...passed IN
    expect(countAgain).toBe(3);
  });

  // 4. waitForResponse(arrow) - the arrow is a yes/no question: "is this the response I am waiting for?"
  test('waitForResponse takes an arrow function as the condition', async ({ page }) => {
    // Start waiting BEFORE the click, otherwise the response can be missed.
    const responsePromise = page.waitForResponse(
      (response) => response.url().endsWith('/api/items') && response.status() === 200,
    );
    await page.getByRole('button', { name: 'Load' }).click();
    const response = await responsePromise;
    expect(await response.json()).toEqual(['Buy milk', 'Walk dog']);
    await expect(page.locator('#status')).toHaveText('Loaded 2');
  });

  // 5. expect.poll(arrow) - runs the arrow again and again until the value matches or time runs out.
  test('expect.poll re-runs an arrow function until it passes', async ({ page }) => {
    await page.getByRole('button', { name: 'Load' }).click();
    await expect
      .poll(async () => (await page.locator('#status').textContent()) ?? '')
      .toBe('Loaded 2');
  });

  // 6. waitForFunction(arrow) - the arrow runs in the browser repeatedly until it returns true.
  test('waitForFunction waits for a condition inside the browser', async ({ page }) => {
    await page.getByRole('button', { name: 'Load' }).click();
    await page.waitForFunction(() => document.querySelector('#status')?.textContent === 'Loaded 2');
  });
});