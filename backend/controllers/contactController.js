const ContactMessage = require('../models/ContactMessage');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');

exports.submitMessage = async (req, res) => {
  // 1. Check for validation errors from express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, message } = req.body;

  try {
    // 2. Create and save the new message to the database
    const newMessage = new ContactMessage({
      name,
      email,
      message,
    });
    await newMessage.save();

    // 3. Send the confirmation email (optional, but good practice)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: name,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        // Don't block the response for an email error, just log it
      }
    });

    // 4. Send a success response to the frontend
    res.status(201).json({ msg: 'Message received! We will get back to you soon.' });

  } catch (err) {
    console.error(err.message);
    // Handle potential Mongoose validation errors or other server errors
    if (err.name === 'ValidationError') {
      return res.status(400).json({ msg: 'Validation failed.', errors: err.errors });
    }
    res.status(500).send('Server Error');
  }
};