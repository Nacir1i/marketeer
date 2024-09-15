import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

let sql: postgres.Sql | null = null;
let db: PostgresJsDatabase | null = null;

export default function () {
  const config = useRuntimeConfig();

  if (!config.connectionString) throw new Error('Missing db url in runtime config');

  if (db && sql) return { db, sql };

  try {
    sql = postgres(config.connectionString as string);
    db = drizzle(sql);
  } catch (error) {
    throw new Error(`Failed to connect to database: ${error}`);
  }

  return { db, sql };
};
