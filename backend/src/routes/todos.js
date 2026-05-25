const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET all todos (with status filters: all, completed, pending)
router.get('/', async (req, res, next) => {
  try {
    const { status } = req.query;
    let query = {};

    if (status === 'completed') {
      query.completed = true;
    } else if (status === 'pending') {
      query.completed = false;
    }

    const todos = await Todo.find(query).sort({ createdAt: -1 });
    return res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
});

// POST create todo
router.post('/', async (req, res, next) => {
  try {
    const { title, description, dueDate, completed } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required and cannot be empty' });
    }

    const todo = new Todo({
      title,
      description: description || '',
      dueDate: dueDate || null,
      completed: completed === true || completed === 'true'
    });

    const savedTodo = await todo.save();
    return res.status(201).json(savedTodo);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
});

// PUT update todo by ID
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, completed } = req.body;

    // Build update object only for defined fields to allow partial updates if needed,
    // but also check title validation if it is sent
    const updateData = {};
    if (title !== undefined) {
      if (title.trim() === '') {
        return res.status(400).json({ message: 'Title cannot be empty' });
      }
      updateData.title = title;
    }
    if (description !== undefined) updateData.description = description;
    if (dueDate !== undefined) updateData.dueDate = dueDate;
    if (completed !== undefined) updateData.completed = completed;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    return res.status(200).json(updatedTodo);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
});

// DELETE todo by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    return res.status(200).json({ message: 'Todo deleted successfully', id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
