import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './server/db/schema/*',
  out: './server/db/migrations',
  dialect: 'postgresql',
  introspect: {
    casing: 'preserve',
  },
  dbCredentials: {
    url: process.env.NUXT_CONNECTION_STRING!,
  },
});
