import { pgTable, text } from 'drizzle-orm/pg-core';

const user = pgTable('user', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
  password: text('password').notNull(),
});

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;

export default user;
