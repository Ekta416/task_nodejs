

const express = require('express');
const Blog = require('../models/Blog');
const { jwtSecret } = require('../config');
const jwt = require('jsonwebtoken');
const authenticateJWT = require('../middleware/authenticateJWT');

const router = express.Router();

// Create Blog
router.post('/blogs', authenticateJWT, async (req, res) => {
  const { title, description, image } = req.body;

  try {
    const newBlog = new Blog({ title, description, image });
    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully!', blog: newBlog });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get Blogs
router.get('/blogs', async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
// Update Blog
router.put('/blogs/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const { title, description, image } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, description, image },
      { new: true }
    );
    if (!updatedBlog) return res.status(404).json({ error: 'Blog not found' });
    res.json({ message: 'Blog updated successfully!', blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete Blog
router.delete('/blogs/:id', authenticateJWT, async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await Blog.findByIdAndDelete(id);
      if (!result) return res.status(404).json({ error: 'Blog not found' });
      res.json({ message: 'Blog deleted successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
module.exports = router;

