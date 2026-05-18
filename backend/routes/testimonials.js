const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const auth = require('../middleware/auth');

// @route   GET /api/testimonials
// @desc    Get all testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// @route   POST /api/testimonials
// @desc    Create a testimonial (Admin only)
router.post('/', auth, async (req, res) => {
  const { name, role, text } = req.body;

  if (!name || !role || !text) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  try {
    const newTestimonial = new Testimonial({ name, role, text });
    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// @route   DELETE /api/testimonials/:id
// @desc    Delete a testimonial (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ error: "Testimonial not found" });
    }
    await testimonial.deleteOne();
    res.status(200).json({ message: "Testimonial removed" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
