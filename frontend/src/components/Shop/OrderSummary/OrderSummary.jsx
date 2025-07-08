// src/components/Shop/OrderSummary/OrderSummary.jsx

import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import './OrderSummary.css';

// Helper function to format numbers as Indian Rupees or return 'Free'
const formatCurrency = (amount) => {
  if (typeof amount === 'string') {
    return amount; // Handles the "Free" case
  }
  // This will format numbers like 3,199
  return `Rs. ${amount.toLocaleString('en-IN')}`;
};

const formatSavings = (amount) => {
    // This will format savings as -Rs. 900
    return `-Rs. ${Math.abs(amount).toLocaleString('en-IN')}`;
}

const OrderSummary = ({ summary }) => {
  // Destructure the summary prop with default values to prevent errors
  const {
    cartTotal = 0,
    savings = 0,
    platformFee = 0,
    deliveryFee = 0,
    totalAmount = 0
  } = summary;

  return (
    <div className="order-summary-container">
      <div className="order-summary-card">
        <h4>PRICE DETAILS</h4>
        <div className="price-details">
          <h5>Order Summary</h5>
          <div className="summary-item">
            <span>Cart Total</span>
            <span>{formatCurrency(cartTotal)}</span>
          </div>
          <div className="summary-item">
            <span>Savings</span>
            <span className="savings-text">{formatSavings(savings)}</span>
          </div>
          <div className="summary-item">
            <span>Platform Fee</span>
            <span>{formatCurrency(platformFee)}</span>
          </div>
          <div className="summary-item">
            <span>Delivery Fee</span>
            <span>{formatCurrency(deliveryFee)}</span>
          </div>
        </div>
        <div className="total-amount">
          <h5>Total Amount</h5>
          <h5>{formatCurrency(totalAmount)}</h5>
        </div>
      </div>
      <div className="security-info">
        <FaShieldAlt className="shield-icon" />
        <p><strong>Safe and Secure Payments. Easy returns.</strong> 100% Authentic products.</p>
      </div>
      <p className="disclaimer">
        By continuing with the order, you confirm that you are above 18 years of age, and you agree to the Flipkart's <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
      </p>
    </div>
  );
};

export default OrderSummary;