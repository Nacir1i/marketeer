import stylistic from '@stylistic/eslint-plugin';
import tailwind from 'eslint-plugin-tailwindcss';
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    '@stylistic/semi': ['error', 'always'],
    '@stylistic/brace-style': ['error', '1tbs'],
    'vue/max-attributes-per-line': ['warn', { singleline: 3, multiline: 1 }],
  },
  plugins: {
    '@stylistic': stylistic,
  },
}).append(...tailwind.configs['flat/recommended']);
