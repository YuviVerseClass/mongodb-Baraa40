const Task = require('../models/Task');

async function getTasks(req, res) {
  const tasks = await Task.find();
  res.json(tasks);
}

async function addTask(req, res) {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const newTask = new Task({ title });
  await newTask.save();
  res.status(201).json(newTask);
}

async function toggleTask(req, res) {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  task.done = !task.done;
  await task.save();
  res.json(task);
}

async function deleteTask(req, res) {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  res.json({ message: 'Task deleted successfully' });
}

module.exports = {
  getTasks,
  addTask,
  toggleTask,
  deleteTask,
};
