import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../database/tasks.db');

async function seed() {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });
  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL
    );
    DELETE FROM tasks;
    INSERT INTO tasks (title, description, status) VALUES
      ('Tarea de ejemplo 1', 'Descripción de la tarea 1', 'pendiente'),
      ('Tarea de ejemplo 2', 'Descripción de la tarea 2', 'en progreso'),
      ('Tarea de ejemplo 3', 'Descripción de la tarea 3', 'completada');
  `);
  await db.close();
  console.log('Base de datos inicializada con datos de ejemplo.');
}

seed();
