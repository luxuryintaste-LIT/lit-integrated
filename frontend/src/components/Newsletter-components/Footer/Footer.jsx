import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

import logo from "../../../assets/lit-logo.png";
import emailIcon from "../../../assets/email-logo.svg";
import linkedinIcon from "../../../assets/linkedin-logo.svg";
import instagramIcon from "../../../assets/instagram-logo.svg";
import twitterIcon from "../../../assets/twitter-logo.svg";
import googlePlayBadge from "../../../assets/googlePlayBadge.png";
import appStoreBadge from "../../../assets/app-store-badge.svg";
import { subscribeToNewsletter } from "../../../services/api";

const Footer = () => {
  const [email, setEmail] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState('');
  const dropdownRef = useRef();

  const handleSubscribe = async () => {
    if (!email) {
      setSubscriptionStatus('Please enter your email address.');
      return;
    }

    try {
      const res = await subscribeToNewsletter(email);
      setSubscriptionStatus(res.message || 'Successfully subscribed!');
      setEmail('');
    } catch (error) {
      setSubscriptionStatus(
        error?.response?.data?.message || 'Subscription failed. Try again.'
      );
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <footer className="footer-container" id="footer-community-section">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-logo-section dropdown-container" ref={dropdownRef}>
            <div onClick={() => setDropdownOpen(!dropdownOpen)} className="footer-logo-wrapper">
              <img src={logo} alt="LIT Logo" className="footer-logo" />
            </div>
            {dropdownOpen && (
              <div className="footer-dropdown">
                <Link to="/admin/login?redirect=newsletters" className="dropdown-item">Newsletters</Link>
                <Link to="/admin/login?redirect=ecommerce" className="dropdown-item">Ecommerce</Link>
              </div>
            )}
          </div>

          <div className="footer-main-nav">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Services</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>

        <div className="footer-secondary">
          <div className="footer-join-section">
            <h3>Join our Community</h3>
            <div className="footer-email-container">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="footer-email-input"
                required
              />
              <button onClick={handleSubscribe} className="footer-subscribe-btn">
                Subscribe
              </button>
            </div>
            {subscriptionStatus && (
              <p className="subscription-status">{subscriptionStatus}</p>
            )}
          </div>

          <div className="footer-contact-section">
            <div className="footer-contact-item">
              <span>Email</span>
              <a href="mailto:info@luxuryintaste.com">
                <img src={emailIcon} alt="Email" />
              </a>
            </div>
            <div className="footer-contact-item">
              <span>LinkedIn</span>
              <a href="https://www.linkedin.com/company/luxury-in-taste-lit/" target="_blank" rel="noopener noreferrer">
                <img src={linkedinIcon} alt="LinkedIn" />
              </a>
            </div>
            <div className="footer-contact-item">
              <span>Instagram</span>
              <a href="https://www.instagram.com/luxuryintaste" target="_blank" rel="noopener noreferrer">
                <img src={instagramIcon} alt="Instagram" />
              </a>
            </div>
            <div className="footer-contact-item">
              <span>Twitter</span>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src={twitterIcon} alt="Twitter" />
              </a>
            </div>
          </div>

          <div className="footer-store-buttons">
            <a 
              href="https://play.google.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="store-button google-play"
            >
              <img src={googlePlayBadge} alt="Get it on Google Play" />
            </a>
            <a 
              href="https://www.apple.com/app-store/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="store-button app-store"
            >
              <img src={appStoreBadge} alt="Download on the App Store" />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
            <p>&copy; {new Date().getFullYear()} Luxury In Taste. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
 