const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const authRoutes = require('./routes/authroutes.js');
const blogRoutes = require('./routes/blogRoutes.js');
const { requireAuth, checkUser } = require('./middleware/authMiddleware.js');
require('dotenv').config();

// Middleware
app.use(express.json()); // Parse JSON data
app.use(cookieParser()); // Parse cookies
app.use(express.static('public')); // Serve static files

// Set view engine
app.set('view engine', 'ejs');

// Database connection
const dbURI = process.env.DBCONNECT;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(8000, () => {
      console.log('Server is running on port 8000');
    });
  })
  .catch((err) => console.log(err));

// Routes
app.get('*', checkUser);
// app.post('*',checkUser)
  // Apply middleware to every GET request
app.use(blogRoutes); // Blog routes
app.use(authRoutes); // Authentication routes

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

