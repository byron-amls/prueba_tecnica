import { getDb } from '../lib/db.js';

export async function getAllTickets(req, res, next) {
  try {
    const db = await getDb();
    let query = 'SELECT * FROM tickets ORDER BY created_at DESC';
    const params = [];
    
    if (req.query.status) {
      query += ' WHERE status = ?';
      params.push(req.query.status.toUpperCase());
    }
    
    const tickets = await db.all(query, params);
    res.json(tickets);
  } catch (err) {
    next(err);
  }
}

export async function getTicket(req, res, next) {
  try {
    const { id } = req.params;
    const db = await getDb();
    const ticket = await db.get('SELECT * FROM tickets WHERE id = ?', [id]);
    
    if (!ticket) {
      const err = new Error('Ticket no encontrado');
      err.status = 404;
      return next(err);
    }
    
    res.json(ticket);
  } catch (err) {
    next(err);
  }
}

export async function createTicket(req, res, next) {
  try {
    const { title, description } = req.body;
    
    if (!title) {
      const err = new Error('El título es requerido');
      err.status = 400;
      return next(err);
    }
    
    const db = await getDb();
    const result = await db.run(
      'INSERT INTO tickets (title, description, status) VALUES (?, ?, ?)',
      [title, description || '', 'pending']
    );
    
    const newTicket = await db.get('SELECT * FROM tickets WHERE id = ?', [result.lastID]);
    
    res.status(201).json({ 
      ticket: newTicket,
      success: true 
    });
  } catch (err) {
    next(err);
  }
}

export async function updateTicket(req, res, next) {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    
    if (!title && !description && !status) {
      const err = new Error('Al menos un campo es requerido');
      err.status = 400;
      return next(err);
    }
    
    if (title && !title.trim()) {
      const err = new Error('El título no puede estar vacío');
      err.status = 400;
      return next(err);
    }
    
    const db = await getDb();
    
    const currentTicket = await db.get('SELECT * FROM tickets WHERE id = ?', [id]);
    if (!currentTicket) {
      const err = new Error('Ticket no encontrado');
      err.status = 404;
      return next(err);
    }
    
    const updates = [];
    const values = [];
    
    if (title !== undefined) {
      updates.push('title = ?');
      values.push(title);
    }
    if (description !== undefined) {
      updates.push('description = ?');
      values.push(description);
    }
    if (status !== undefined) {
      updates.push('status = ?');
      values.push(status);
    }
    
    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);
    
    const query = `UPDATE tickets SET ${updates.join(', ')} WHERE id = ?`;
    
    await db.run(query, values);
    
    const updatedTicket = await db.get('SELECT * FROM tickets WHERE id = ?', [id]);
    res.json(updatedTicket);
  } catch (err) {
    next(err);
  }
}

export async function deleteTicket(req, res, next) {
  try {
    const { id } = req.params;
    const db = await getDb();
    
    const ticket = await db.get('SELECT * FROM tickets WHERE id = ?', [id]);
    if (!ticket) {
      const err = new Error('Ticket no encontrado');
      err.status = 404;
      return next(err);
    }
    
    await db.run('DELETE FROM tickets WHERE id = ?', [id]);
    res.json({ success: true, id });
  } catch (err) {
    next(err);
  }
}
