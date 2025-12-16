const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Log = require('../models/Log');
const User = require('../models/User');
const { protect, admin } = require('../middleware/authMiddleware');

// Helper to create logs
const createLog = async (userId, action, details) => {
  await Log.create({ user: userId, action, details });
};

// ---------------------------------------------------------------------
// GET /api/tasks (UPDATED FOR PAGINATION)
// ---------------------------------------------------------------------
router.get('/', protect, async (req, res) => {
  try {
    // 1. Pagination Parameters (Default: Page 1, Limit 10)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // 2. Build Filter (Manager sees all, User sees assigned)
    let query = {};
    if (req.user.role !== 'manager') {
      query = { assignedTo: req.user._id };
    }

    // 3. Fetch Tasks with Skip/Limit
    const tasks = await Task.find(query)
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 }) // Newest first
      .skip(skip)
      .limit(limit);

    // 4. Get Total Count for Frontend Math
    const total = await Task.countDocuments(query);

    // 5. Send Response with Metadata
    res.json({
      tasks,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalTasks: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ---------------------------------------------------------------------
// POST /api/tasks (Manager Create)
// ---------------------------------------------------------------------
router.post('/', protect, admin, async (req, res) => {
  const { title, description, status, priority, dueDate, assignedTo } = req.body;

  try {
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo,
      createdBy: req.user._id,
    });

    await createLog(req.user._id, 'Created Task', `Created task: ${title}`);

    // --- SOCKET EMIT ---
    const io = req.app.get('io');
    const populatedTask = await Task.findById(task._id).populate('assignedTo', 'name email');
    io.emit('taskCreated', populatedTask);

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ---------------------------------------------------------------------
// PUT /api/tasks/:id (Update)
// ---------------------------------------------------------------------
router.put('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (req.user.role !== 'manager' && task.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Role Logic
    if (req.user.role === 'user') {
      task.status = req.body.status || task.status;
      await createLog(req.user._id, 'Updated Status', `Updated status of ${task.title} to ${task.status}`);
    } else {
      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.status = req.body.status || task.status;
      task.priority = req.body.priority || task.priority;
      task.dueDate = req.body.dueDate || task.dueDate;
      task.assignedTo = req.body.assignedTo || task.assignedTo;
      
      await createLog(req.user._id, 'Updated Task', `Updated details of task: ${task.title}`);
    }

    const updatedTask = await task.save();

    // --- SOCKET EMIT ---
    const io = req.app.get('io');
    const populatedTask = await Task.findById(updatedTask._id).populate('assignedTo', 'name email');
    io.emit('taskUpdated', populatedTask);

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ---------------------------------------------------------------------
// DELETE /api/tasks/:id (Manager Only)
// ---------------------------------------------------------------------
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.deleteOne();
    await createLog(req.user._id, 'Deleted Task', `Deleted task: ${task.title}`);

    // --- SOCKET EMIT ---
    const io = req.app.get('io');
    io.emit('taskDeleted', req.params.id);

    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ---------------------------------------------------------------------
// GET /api/tasks/users (Helper for Manager Dropdown)
// ---------------------------------------------------------------------
router.get('/users', protect, admin, async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ---------------------------------------------------------------------
// GET /api/tasks/logs (Helper for Logs)
// ---------------------------------------------------------------------
router.get('/logs', protect, admin, async (req, res) => {
  try {
    const logs = await Log.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;