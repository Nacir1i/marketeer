// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxt/test-utils/module'],
  ssr: false,
  eslint: {
    config: {
      stylistic: true,
    },
  },
  runtimeConfig: {
    connectionString: '',
    facebookId: '',
    facebookSecret: '',
  },
});
