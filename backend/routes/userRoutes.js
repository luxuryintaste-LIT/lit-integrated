const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Save or find user after social login
router.post('/login', async (req, res) => {
  try {
    const { name, email, provider } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // If not, create the user
      user = new User({ name, email, provider });
      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('User login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
