const User = require('../models/User');

// Login or register user (Upsert)
exports.loginUser = async (req, res) => {
  const { provider, name, email } = req.body;

  if (!provider || !email || !name) {
    return res.status(400).json({ message: 'Missing required user fields' });
  }

  try {
    const user = await User.findOneAndUpdate(
      { provider },
      { $set: { name, email } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json(user);
  } catch (err) {
    console.error('❌ Error in loginUser:', err.message, err);
    res.status(500).json({ message: err.message || 'Server error while logging in user' });
  }
};
