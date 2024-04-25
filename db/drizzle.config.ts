import { defineConfig } from 'drizzle-kit';
import { env } from '@/env';

export default defineConfig({
  schema: ['./db/schema.ts'],
  out: './db/drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.POSTGRES_URL,
  },
  tablesFilter: ['crypto_dashboard_*'],
});
