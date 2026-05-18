const express = require('express');
const router = express.Router();
const Stat = require('../models/Stat');
const auth = require('../middleware/auth');

// @route   GET /api/stats
// @desc    Get all stats
router.get('/', async (req, res) => {
  try {
    const stats = await Stat.find().sort({ createdAt: 1 });
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// @route   POST /api/stats
// @desc    Create a new stat
router.post('/', auth, async (req, res) => {
  try {
    const { label, value, suffix, color, bg } = req.body;
    const newStat = new Stat({ label, value, suffix, color, bg });
    await newStat.save();
    res.status(201).json(newStat);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// @route   PUT /api/stats/:id
// @desc    Update a stat
router.put('/:id', auth, async (req, res) => {
  try {
    const { label, value, suffix, color, bg } = req.body;
    const updatedStat = await Stat.findByIdAndUpdate(
      req.params.id,
      { label, value, suffix, color, bg },
      { new: true }
    );
    if (!updatedStat) {
      return res.status(404).json({ error: "Stat not found" });
    }
    res.status(200).json(updatedStat);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// @route   DELETE /api/stats/:id
// @desc    Delete a stat
router.delete('/:id', auth, async (req, res) => {
  try {
    const stat = await Stat.findByIdAndDelete(req.params.id);
    if (!stat) {
      return res.status(404).json({ error: "Stat not found" });
    }
    res.status(200).json({ message: "Stat deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
