import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import logo from '../assets/logo.png';
import googlePlay from '../assets/google-play.png';
import appStore from '../assets/app-store.png';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setMessageType('');

    try {
      const response = await fetch('https://localhost:5000/api/subscribers/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setMessageType('success');
        setEmail(''); // Clear email input on success
      } else {
        
        setMessage(data.message || 'Subscription failed.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Frontend newsletter subscription error:', error);
      setMessage('An error occurred. Please try again later.');
      setMessageType('error');
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-logo-section">
            <Link to="/admin/login">
              <img src={logo} alt="Luxury In Taste Logo" className="footer-logo" />
            </Link>
          </div>
          
          <div className="footer-middle">
            <nav className="footer-nav">
              <Link to="/" className="footer-link">
                Home
              </Link>
              <Link to="/shop" className="footer-link">
                Marketplace
              </Link>
              <Link to="/game-modes" className="footer-link">
                Game Modes
              </Link>
              <Link to="/about-us" className="footer-link">
                About Us
              </Link>
              <Link to="/contact-us" className="footer-link">
                Contact Us
              </Link>
              <Link to="/faq" className="footer-link">
                FAQ
              </Link>
              <Link to="/privacy-policy" className="footer-link">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="footer-link">
                Terms of Service
              </Link>
            </nav>
            <div className="footer-subscribe">
              <h3>Stay Up To Date</h3>
              <form className="subscribe-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="subscribe-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="subscribe-button">
                  Subscribe
                </button>
              </form>
              {message && (
                <p className={`subscription-message ${messageType === 'success' ? 'success' : 'error'}`}>
                  {message}
                </p>
              )}
            </div>
          </div>

          <div className="footer-right">
            <div className="contact-section">
              <h3>Contact Us</h3>
              <div className="social-links">
                <a href="mailto:info@luxuryintaste.com" className="social-link">
                  <i className="fas fa-envelope"></i>
                  <span>info@luxuryintaste.com</span>
                </a>
                <a href="tel:+1234567890" className="social-link">
                  <i className="fas fa-phone"></i>
                  <span>+1 (234) 567-890</span>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-twitter"></i>
                  <span>@LuxuryInTaste</span>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-instagram"></i>
                  <span>@LuxuryInTaste</span>
                </a>
              </div>
            </div>

            <div className="app-downloads">
              <a href="#" className="store-badge">
                <img src={googlePlay} alt="Google Play" className="store-icon" />
                <div className="store-text">
                  <span className="store-action">GET IT ON</span>
                  <span className="store-name">Google Play</span>
                </div>
              </a>
              <a href="#" className="store-badge">
                <img src={appStore} alt="App Store" className="store-icon" />
                <div className="store-text">
                  <span className="store-action">Download on the</span>
                  <span className="store-name">App Store</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Luxury In Taste. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 