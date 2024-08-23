
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');
const { mongoURI } = require('./config');
const cors = require('cors');


const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', authRoutes);
app.use('/api', blogRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
