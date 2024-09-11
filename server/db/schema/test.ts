import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

const test = pgTable('test', {
  id: serial('id').primaryKey(),
  name: varchar('name'),
});

export type Test = typeof test.$inferSelect;
export type NewTest = typeof test.$inferInsert;

export default test;
