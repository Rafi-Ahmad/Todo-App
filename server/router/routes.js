const express = require('express');
const Todo = require('../models/Todo');

const router = express.Router();

// Get all Todos
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error('Error fetching Todos:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a new Todo
router.post('/todos', async (req, res) => {
  const { task, category, priority } = req.body;

  try {
    const newTodo = new Todo({
      task,
      category,
      priority,
    });
    await newTodo.save();
    res.json(newTodo);
  } catch (error) {
    console.error('Error adding Todo:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a Todo
router.put('/todos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating Todo:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a Todo
router.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Todo.findByIdAndDelete(id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting Todo:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
