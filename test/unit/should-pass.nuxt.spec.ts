import { expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { TestComponent } from '#components';

it('should pass', async () => {
  const component = await mountSuspended(TestComponent);
  expect(component.text()).toBe('test');
});
