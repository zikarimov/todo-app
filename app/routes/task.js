const express = require('express');
const Task = require('../models/task');
const router = express.Router();

// Получить все задачи
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Добавить новую задачу
router.post('/', async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.status(201).json(newTask);
});

// Обновить задачу
router.put('/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

// Удалить задачу
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Пометить задачу как выполненную
router.patch('/:id/complete', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, { completed: true }, { new: true });
  res.json(task);
});

module.exports = router;
