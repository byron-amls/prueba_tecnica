import express from 'express';
import { getAllTasks, createTask, updateTask } from '../controllers/tasks.js';

const router = express.Router();

router.get('/', getAllTasks);
router.post('/', createTask);
router.put('/:id', updateTask);

export default router;
