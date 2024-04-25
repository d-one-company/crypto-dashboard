import { timestamp, text, pgTableCreator } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

const pgTable = pgTableCreator(name => `crypto_dashboard_${name}`);

export const users = pgTable('user', {
  id: text('id').primaryKey().$default(createId),
  name: text('name'),
  email: text('email').notNull().unique(),
  username: text('username').notNull().unique(),
  image: text('image'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  password: text('password').notNull(),
});
