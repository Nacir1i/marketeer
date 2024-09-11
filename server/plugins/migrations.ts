import { migrate } from 'drizzle-orm/postgres-js/migrator';
import useDatabase from '~/composables/useDatabse';

export default defineNitroPlugin(async (_nitroApp) => {
  const client = useDatabase();

  try {
    await migrate(client.db, { migrationsFolder: './server/db/migrations' });
  } catch (error) {
    throw new Error(`Failed to run migrations: ${error}`);
  }
});
