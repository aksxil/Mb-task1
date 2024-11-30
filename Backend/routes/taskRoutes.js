const express = require('express');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new task (Protected Route)
router.post('/', protect, createTask);

// Get all tasks for the logged-in user (Protected Route)
router.get('/', protect, getTasks);

// Get a single task by ID (Protected Route)
router.get('/:id', protect, getTaskById);

// Update a task by ID (Protected Route)
router.put('/:id', protect, updateTask);

// Delete a task by ID (Protected Route)
router.delete('/:id', protect, deleteTask);

module.exports = router;
