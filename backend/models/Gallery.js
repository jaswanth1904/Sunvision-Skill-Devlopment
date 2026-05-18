const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  src: { type: String, required: true },
  alt: { type: String, default: 'Event Gallery Image' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Gallery', gallerySchema);
