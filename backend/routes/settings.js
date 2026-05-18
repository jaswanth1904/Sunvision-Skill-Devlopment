const express = require('express');
const router = express.Router();
const Setting = require('../models/Setting');
const auth = require('../middleware/auth');

// @route   GET /api/settings/:key
// @desc    Get setting by key
router.get('/:key', async (req, res) => {
  try {
    const setting = await Setting.findOne({ key: req.params.key });
    if (!setting) {
      return res.status(404).json({ error: "Setting not found" });
    }
    res.status(200).json(setting.value);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// @route   POST /api/settings/:key
// @desc    Create or update setting (Admin only)
router.post('/:key', auth, async (req, res) => {
  try {
    let setting = await Setting.findOne({ key: req.params.key });
    if (setting) {
      setting.value = req.body;
      setting.updatedAt = Date.now();
      await setting.save();
    } else {
      setting = new Setting({
        key: req.params.key,
        value: req.body,
      });
      await setting.save();
    }
    res.status(200).json(setting.value);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
