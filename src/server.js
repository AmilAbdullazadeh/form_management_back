require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const formRoutes = require('./routes/form.routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/forms', formRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 