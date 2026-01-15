import Database from 'better-sqlite3';
import { readFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = process.env.DB_PATH || join(__dirname, 'portfolio.db');

function updateDb() {
    if (!existsSync(dbPath)) {
        console.error('Database not found! Run npm run db:init first.');
        process.exit(1);
    }

    const db = new Database(dbPath);

    // Read seed data
    const seed = readFileSync(join(__dirname, 'seed.sql'), 'utf-8');

    // Start transaction
    const updateTransaction = db.transaction(() => {
        // Clear content tables
        db.prepare('DELETE FROM projects').run();
        db.prepare('DELETE FROM experiences').run();
        db.prepare('DELETE FROM skills').run();

        // Reset sequences for content tables
        db.prepare("DELETE FROM sqlite_sequence WHERE name IN ('projects', 'experiences', 'skills')").run();

        // Re-run seed data
        db.exec(seed);
    });

    try {
        updateTransaction();
        console.log('Database content updated successfully! Contact messages preserved.');
    } catch (error) {
        console.error('Failed to update database:', error);
    } finally {
        db.close();
    }
}

updateDb();
