const express = require('express');
const router = express.Router();
const Partner = require('../models/Partner');
const auth = require('../middleware/auth');

// @route   GET /api/partners
// @desc    Get all partners
router.get('/', async (req, res) => {
  try {
    const partners = await Partner.find().sort({ createdAt: 1 });
    res.status(200).json(partners);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// @route   POST /api/partners
// @desc    Create a partner (Admin only)
router.post('/', auth, async (req, res) => {
  const { name, image } = req.body;

  if (!name || !image) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  try {
    const newPartner = new Partner({ name, image });
    await newPartner.save();
    res.status(201).json(newPartner);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// @route   DELETE /api/partners/:id
// @desc    Delete a partner (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ error: "Partner not found" });
    }
    await partner.deleteOne();
    res.status(200).json({ message: "Partner removed" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
