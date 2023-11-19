const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  category: String,
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
