import stylistic from '@stylistic/eslint-plugin';
import tailwind from 'eslint-plugin-tailwindcss';
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    '@stylistic/semi': ['error', 'always'],
  },
  plugins: {
    '@stylistic': stylistic,
  },
}).append(...tailwind.configs['flat/recommended']);
