const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  provider: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true, // Ensure unique names for providers
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true, // Ensure unique emails
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
