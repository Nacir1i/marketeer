import { setup } from '@nuxt/test-utils/e2e';
import { describe, expect, test } from 'vitest';

describe('Should pass', async () => {
  await setup({});

  test('should pass', async () => {
    expect(true).toBe(true);
  });
});
