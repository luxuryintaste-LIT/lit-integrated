const axios = require('axios');
const Subscriber = require('../models/Subscriber'); // Mongoose model

// Replace this with your Azure Function endpoint
const AZURE_FUNCTION_URL = 'https://subscribemail-hdgmhxf9ftc6b0bx.canadacentral-01.azurewebsites.net/api/send-email?code=XHVeKaQlDYK0n1lwFQGvW8aGvAV5iX56e4y-HSTsutN5AzFuWaHNUg%3D%3D';

exports.createSubscriber = async (req, res) => {
  try {
    const { email } = req.body;

    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already subscribed.' });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    // Trigger Azure Function to send welcome email
    try {
      await axios.post(AZURE_FUNCTION_URL, { email });
      res.status(201).json({ message: 'Subscription successful and email sent!' });
    } catch (emailErr) {
      console.error('Azure email error:', emailErr.response?.data || emailErr.message);
      res.status(201).json({
        message: 'Subscription successful, but failed to send welcome email.',
        emailError: emailErr.response?.data || emailErr.message,
      });
    }

  } catch (err) {
    console.error('Subscription error:', err);
    res.status(500).json({ message: 'Failed to subscribe.', error: err.message });
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
