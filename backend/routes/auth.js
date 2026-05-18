const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// @route   POST /api/auth/register
// @desc    Register an admin (You can disable this after creating your account)
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/auth/login
// @desc    Login admin & get token
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Login attempt for username: ${username}`);

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log(`User not found: ${username}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log(`Password mismatch for user: ${username}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    console.log(`Login successful for user: ${username}`);
    res.json({ token, username: user.username });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const user = await User.findById(userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/auth/ping
// @desc    Check auth service health
router.get('/ping', (req, res) => res.json({ message: 'Auth service is alive' }));



// @route   PUT /api/auth/update
// @desc    Update admin credentials
router.put('/update', auth, async (req, res) => {
  const { username, password, email, fullName, currentPassword } = req.body;

  try {
    const userId = req.user.id || req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // If updating password, verify current password first
    if (password) {
      if (!currentPassword) {
        return res.status(400).json({ message: 'Current password is required to set a new password' });
      }
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
      user.password = password; // Pre-save hook will hash this
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (fullName) user.fullName = fullName;
    if (req.body.title) user.title = req.body.title;
    if (req.body.avatar) user.avatar = req.body.avatar;

    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/auth/reset-admin
// @desc    Emergency reset admin credentials to admin/admin123
router.post('/reset-admin', async (req, res) => {
  try {
    // Look for any user with 'admin' in username or the first user
    let user = await User.findOne({ role: 'admin' }) || await User.findOne();
    if (!user) {
      user = new User({ username: 'admin', password: 'admin123', role: 'admin' });
    } else {
      user.username = 'admin';
      user.password = 'admin123';
    }
    await user.save();
    res.json({ message: 'Admin account has been reset to: admin / admin123' });
  } catch (error) {
    res.status(500).json({ error: 'Server error during reset' });
  }
});

module.exports = router;
