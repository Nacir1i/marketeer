import { createPage, setup, url } from '@nuxt/test-utils/e2e';
import { describe, expect, test } from 'vitest';

describe('Should pass', async () => {
  await setup({});

  test('should pass', async () => {
    const page = await createPage();
    await page.goto(url('/'), { waitUntil: 'hydration' });

    const component = page.getByTestId('test');

    expect(await component.isVisible()).toBe(true);
    expect(await component.textContent()).include('test');
  });
});
