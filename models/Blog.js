const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String }, 
  description: { type: String, required: true }
});

module.exports = mongoose.model('Blog', blogSchema);