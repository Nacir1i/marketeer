import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { Lucia } from 'lucia';
import session from '../db/schema/session';
import user from '../db/schema/user';
import useDatabase from '~/composables/useDatabase';

const client = useDatabase();

const adapter = new DrizzlePostgreSQLAdapter(client.db, session, user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !import.meta.dev,
    },
  },
  getUserAttributes: attributes => ({
    email: attributes.email,
  }),
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

interface DatabaseUserAttributes {
  email: string
}
