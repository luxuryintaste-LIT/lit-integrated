const axios = require('axios');
const Subscriber = require('../models/Subscriber'); // Mongoose model

// ✅ Replace with your Azure Function URL and code
const FUNCTION_URL = "https://subscribemail-hdgmhxf9ftc6b0bx.canadacentral-01.azurewebsites.net/api/send-email?code=XHVeKaQlDYK0n1lwFQGvW8aGvAV5iX56e4y-HSTsutN5AzFuWaHNUg%3D%3D";

exports.createSubscriber = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    // 🔍 Check if already subscribed
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already subscribed.' });
    }

    // 💾 Save to MongoDB
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();
    console.log(`✅ Email saved to DB: ${email}`);

    // 📤 Call Azure Function to send confirmation email
    try {
      console.log(`📨 Calling Azure Function with email: ${email}`);
      const response = await axios.post(FUNCTION_URL, { email });
      console.log("✅ Azure Function response:", response.data);
    } catch (emailErr) {
      console.error("❌ Azure Function call failed:", emailErr.response?.data || emailErr.message);
    }

    res.status(201).json({ message: 'Subscription successful!' });

  } catch (err) {
    console.error("❌ Internal Server Error:", err);
    res.status(500).json({
      message: 'Failed to subscribe.',
      error: err.message
    });
  }
};

exports.getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.status(200).json(subscribers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching subscribers.' });
  }
};

exports.deleteSubscriber = async (req, res) => {
  try {
    await Subscriber.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Subscriber removed.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting subscriber.' });
  }
};
