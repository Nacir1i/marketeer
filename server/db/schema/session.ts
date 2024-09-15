import { text, timestamp, pgTable } from 'drizzle-orm/pg-core';
import user from './user';

const session = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});

export type Session = typeof session.$inferSelect;
export type NewSession = typeof session.$inferInsert;

export default session;
