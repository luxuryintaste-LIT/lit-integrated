const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/users/login → create or find user
router.post('/login', async (req, res) => {
  try {
    const { name, email, provider } = req.body;
    console.log(name, email, provider);

    if (!email || !name) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Find existing user by email
    let user = await User.findOne({ email });

    // Create user if not exists
    if (!user) {
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
