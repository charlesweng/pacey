const express = require('express');
const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON requests

// Import Routes
// const userRoutes = require('./routes/users');

// Use Routes
// app.use('/api/users', userRoutes);

// Home Route
app.get('/', (req, res) => {
  res.send('Welcome to the Express App!');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app; // Export the app instance
