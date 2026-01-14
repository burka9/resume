import pkg from 'sql.js';
const initSqlJs = pkg as typeof import('sql.js').default;
type SqlJsDatabase = InstanceType<Awaited<ReturnType<typeof initSqlJs>>['Database']>;
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '../../db/portfolio.db');

let db: SqlJsDatabase | null = null;

async function getDb(): Promise<SqlJsDatabase> {
  if (db) return db;

  const SQL = await initSqlJs();

  if (existsSync(dbPath)) {
    const fileBuffer = readFileSync(dbPath);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  return db;
}

function saveDb(): void {
  if (!db) return;
  const data = db.export();
  const buffer = Buffer.from(data);
  writeFileSync(dbPath, buffer);
}

// Types
export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  tech_stack: string | null;
  github_url: string | null;
  live_url: string | null;
  image_url: string | null;
  created_at: string;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
  sort_order: number;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

// Helper to convert sql.js result to typed array
function queryAll<T>(db: SqlJsDatabase, sql: string): T[] {
  const result = db.exec(sql);
  if (result.length === 0) return [];

  const columns = result[0].columns;
  return result[0].values.map(row => {
    const obj: Record<string, unknown> = {};
    columns.forEach((col, i) => {
      obj[col] = row[i];
    });
    return obj as T;
  });
}

function queryOne<T>(db: SqlJsDatabase, sql: string): T | undefined {
  const results = queryAll<T>(db, sql);
  return results[0];
}

// Queries
export async function getAllProjects(): Promise<Project[]> {
  const db = await getDb();
  return queryAll<Project>(db, 'SELECT * FROM projects ORDER BY created_at DESC');
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const db = await getDb();
  // Escape single quotes in slug
  const safeSlug = slug.replace(/'/g, "''");
  return queryOne<Project>(db, `SELECT * FROM projects WHERE slug = '${safeSlug}'`);
}

export async function getAllExperiences(): Promise<Experience[]> {
  const db = await getDb();
  return queryAll<Experience>(db, 'SELECT * FROM experiences ORDER BY sort_order ASC');
}

export async function getAllSkills(): Promise<Skill[]> {
  const db = await getDb();
  return queryAll<Skill>(db, 'SELECT * FROM skills ORDER BY category, name');
}

export async function getSkillsByCategory(): Promise<Record<string, Skill[]>> {
  const skills = await getAllSkills();
  return skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);
}

export async function saveContactMessage(name: string, email: string, message: string): Promise<void> {
  const db = await getDb();
  // Escape single quotes
  const safeName = name.replace(/'/g, "''");
  const safeEmail = email.replace(/'/g, "''");
  const safeMessage = message.replace(/'/g, "''");
  db.run(`INSERT INTO contact_messages (name, email, message) VALUES ('${safeName}', '${safeEmail}', '${safeMessage}')`);
  saveDb();
}

export default getDb;
