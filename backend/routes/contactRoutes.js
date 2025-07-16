const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const contactController = require('../controllers/contactController');

// This confirms the file is being loaded by the server.
console.log("✅ Contact routes file loaded!");

// @route   POST /api/contact
// @desc    Submit a contact form message
// @access  Public
router.post(
  '/', // Handles requests to the root of '/api/contact'
  [
    body('name', 'Name is required').not().isEmpty().trim().escape(),
    body('email', 'Please include a valid email').isEmail().normalizeEmail(),
    body('message', 'Message must be at least 10 characters')
      .not().isEmpty().isLength({ min: 10 }).trim().escape(),
  ],
  contactController.submitMessage
);

module.exports = router;