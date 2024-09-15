import { bigint, pgTable, text } from 'drizzle-orm/pg-core';

const user = pgTable('user', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
  username: text('username').notNull(),
  profile_picture: text('profile_picture').notNull(),
  facebook_id: bigint('facebook_id', { mode: 'number' }).notNull().unique(),
});

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;

export default user;
