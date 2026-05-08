import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../database/tasks.db');

export async function getDb() {
  return open({
    filename: dbPath,
    driver: sqlite3.Database
  });
}
