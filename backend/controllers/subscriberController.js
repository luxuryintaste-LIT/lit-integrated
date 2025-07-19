// subscriberController.js

const Subscriber = require('../models/Subscriber'); // Mongoose model

exports.createSubscriber = async (req, res) => {
  try {
    const { email } = req.body;
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already subscribed.' });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();
    res.status(201).json({ message: 'Subscription successful!' });
  } catch (err) {
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
