import Database from 'better-sqlite3';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = process.env.DB_PATH || join(__dirname, '../../db/portfolio.db');

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (db) return db;
  db = new Database(dbPath);
  return db;
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

// Queries
export function getAllProjects(): Project[] {
  const db = getDb();
  return db.prepare('SELECT * FROM projects ORDER BY created_at DESC').all() as Project[];
}

export function getProjectBySlug(slug: string): Project | undefined {
  const db = getDb();
  return db.prepare('SELECT * FROM projects WHERE slug = ?').get(slug) as Project | undefined;
}

export function getAllExperiences(): Experience[] {
  const db = getDb();
  return db.prepare('SELECT * FROM experiences ORDER BY sort_order ASC').all() as Experience[];
}

export function getAllSkills(): Skill[] {
  const db = getDb();
  return db.prepare('SELECT * FROM skills ORDER BY category, name').all() as Skill[];
}

export function getSkillsByCategory(): Record<string, Skill[]> {
  const skills = getAllSkills();
  return skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);
}

export function saveContactMessage(name: string, email: string, message: string): void {
  const db = getDb();
  const stmt = db.prepare('INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)');
  stmt.run(name, email, message);
}

export default getDb;
