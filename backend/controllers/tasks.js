import { getDb } from '../db.js';

export async function getAllTasks(req, res, next) {
  try {
    const db = await getDb();
    let query = 'SELECT * FROM tasks';
    const params = [];
    if (req.query.status) {
      query += ' WHERE status = ?';
      params.push(req.query.status);
    }
    const tasks = await db.all(query, params);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

export async function createTask(req, res, next) {
  try {
    const { title, description, status } = req.body;
    if (!title || !status) {
      return res.status(400).json({ error: 'Title and status are required' });
    }
    const db = await getDb();
    const result = await db.run(
      'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
      [title, description, status]
    );
    res.status(201).json({ id: result.lastID, title, description, status });
  } catch (err) {
    next(err);
  }
}

export async function updateTask(req, res, next) {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    if (!title || !status) {
      throw new Error('Datos inválidos');
    }
    const db = await getDb();
    const result = await db.run(
      'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
      [title, description, status, id]
    );
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ id, title, description, status });
  } catch (err) {
    next(err);
  }
}
