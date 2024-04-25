import { migrate } from 'drizzle-orm/vercel-postgres/migrator';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { db } from './index';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  try {
    console.info('[Drizzle ORM] Migration Started');
    await migrate(db, { migrationsFolder: path.join(__dirname, 'drizzle') });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  console.info('[Drizzle ORM] Migration Finished');
  process.exit(0);
}

main();
