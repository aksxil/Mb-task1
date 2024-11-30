const Task = require('../models/Task');

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;

    // Validate required fields
    if (!title || !priority) {
      return res.status(400).json({ error: 'Title and Priority are required.' });
    }

    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      status: 'Pending', // Default status
      assignedUserId: req.user._id, // Assign task to the logged-in user
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all tasks for the logged-in user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedUserId: req.user._id }).sort({ dueDate: 1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    // Check if the task belongs to the logged-in user
    if (task.assignedUserId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized access.' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a task by ID
const updateTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    // Check if the task belongs to the logged-in user
    if (task.assignedUserId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized access.' });
    }

    // Update fields if provided in the request body
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    // Check if the task belongs to the logged-in user
    if (task.assignedUserId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized access.' });
    }

    await task.remove();
    res.status(200).json({ message: 'Task deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
