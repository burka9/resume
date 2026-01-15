import Database from 'better-sqlite3';
import { readFileSync, unlinkSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = process.env.DB_PATH || join(__dirname, 'portfolio.db');

function initDb() {
  // Remove existing DB to start fresh
  if (existsSync(dbPath)) {
    unlinkSync(dbPath);
  }

  const db = new Database(dbPath);

  // Read and execute schema
  const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
  db.exec(schema);

  // Read and execute seed data
  const seed = readFileSync(join(__dirname, 'seed.sql'), 'utf-8');
  db.exec(seed);

  console.log('Database initialized successfully!');
  db.close();
}

initDb();
