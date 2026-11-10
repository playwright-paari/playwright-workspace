import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
});

test('add a todo item', async ({ page }) => {
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await newTodo.fill('Learn Playwright');
  await newTodo.press('Enter');

  await expect(page.getByTestId('todo-title')).toHaveText(['Learn Playwright']);
});

test('complete a todo item', async ({ page }) => {
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await newTodo.fill('Write first test');
  await newTodo.press('Enter');

  const item = page.getByTestId('todo-item');
  await item.getByRole('checkbox').check();

  await expect(item).toHaveClass(/completed/);
});