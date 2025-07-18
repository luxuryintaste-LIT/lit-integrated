// NewsletterPopup.jsx
import React, { useState } from 'react';
import './newsletterPopup.css';
import { subscribeToNewsletter } from '../../services/api'; // ✅ Import your API function

const NewsletterPopup = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      await subscribeToNewsletter(email); // ✅ using your API
      setSubscribed(true);
    } catch (err) {
      setError(err || 'Subscription failed. Please try again later.');
    }
  };

  if (subscribed) {
    return (
      <div className="newsletter-popup">
        <p>🎉 Thank you for subscribing!</p>
      </div>
    );
  }

  return (
    <div className="newsletter-popup">
      <h3>Subscribe to our Newsletter</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Subscribe</button>
      </form>
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default NewsletterPopup;
