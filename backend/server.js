const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
const path = require('path');
const mongoose = require('mongoose');

// DB Status Middleware
app.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1 && !req.path.includes('/api/auth/ping') && req.path.startsWith('/api/')) {
    return res.status(503).json({ 
      error: "Database connection not established", 
      message: "The server is running but the database is unreachable. Please check the backend logs." 
    });
  }
  next();
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
app.use('/api/contact', require('./routes/contact'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/partners', require('./routes/partners'));
app.use('/api/settings', require('./routes/settings'));

// Placeholder route
app.get('/', (req, res) => {
  res.send('Sunvision API is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
