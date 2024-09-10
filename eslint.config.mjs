import stylistic from '@stylistic/eslint-plugin';
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    '@stylistic/semi': ['error', 'always'],
  },
  plugins: {
    '@stylistic': stylistic,
  },
});
