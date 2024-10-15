const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/task');

const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();


// Middleware
app.use(bodyParser.json());
app.use('/api/tasks', taskRoutes);

// Подключаемся к базе данных
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 40000, // Увеличение тайм-аута до 40 секунд
  })
    .then(() => console.log('Successfully connected to MongoDB Atlas'))
    .catch(err => console.error('Connection error', err));


// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
