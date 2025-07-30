import React, { useState, useEffect } from 'react';
import './NewsletterPopup.css';
import { api } from "../../newsletter-utils/api";




const NewsletterPopup = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({
    loading: false,
    message: '',
    type: '',
  });

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setStatus({ loading: false, message: '', type: '' });
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  
    
    
    setStatus({ loading: true, message: '', type: '' });
    try {
      const response = await api.subscribe(email);
      if (response.success) {
        setStatus({
          loading: false,
          message: response.data.message || 'Subscription successful! Please check your email to confirm.',
          type: 'success',
        });
        setTimeout(() => {
          setEmail('');
          onClose();
        }, 2000);
      } else {
        setStatus({
          loading: false,
          message: response.error || 'An error occurred. Please try again.',
          type: 'error',
        });
      }
    } catch (error) {
      setStatus({
        loading: false,
        message: 'An unexpected error occurred. Please try again.',
        type: 'error',
      });
    }
 
  };

  const handleClose = () => {
    setEmail('');
    setStatus({ loading: false, message: '', type: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={handleClose}>×</button>
        <h2>Subscribe to Our Newsletter</h2>
        <p>Get weekly updates on luxury, sustainable, fast fashion and the sneaker market</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status.loading}
          />
          {status.message && (
            <div className={`status-message ${status.type}`}>
              {status.message}
            </div>
          )}
          <button
            type="submit"
            className={`subscribe-button-nw  ${status.loading ? 'loading' : ''}`}
            disabled={status.loading}
          >
            {status.loading ? 'SUBSCRIBING...' : 'SUBSCRIBE NOW'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterPopup;