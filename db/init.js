import pkg from 'sql.js';
const initSqlJs = pkg;
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function initDb() {
  const SQL = await initSqlJs();
  const db = new SQL.Database();

  // Read and execute schema
  const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
  db.run(schema);

  // Read and execute seed data
  const seed = readFileSync(join(__dirname, 'seed.sql'), 'utf-8');
  db.run(seed);

  // Save to file
  const data = db.export();
  const buffer = Buffer.from(data);
  writeFileSync(join(__dirname, 'portfolio.db'), buffer);

  console.log('Database initialized successfully!');
  db.close();
}

initDb().catch(console.error);
