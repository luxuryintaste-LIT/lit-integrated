// src/components/checkout/CreditCardForm.jsx
import React from 'react';
import { CreditCard } from 'lucide-react';

const CreditCardForm = () => {
  return (
    <div className="payment-form credit-card-form">
      <div className="form-header">
        <CreditCard className="form-header-icon" size={24} />
        <h4 className="form-header-title">Debit / Credit Card</h4>
      </div>
      
      <div className="form-group">
        <label htmlFor="cardNumber">Card Number</label>
        <input type="text" id="cardNumber" placeholder="1234-5678-9876-4321" />
      </div>
      
      {/* This row will contain the two smaller input fields */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="cvv">CVV/CVC No.</label>
          <input type="text" id="cvv" placeholder="xxx" />
        </div>
        <div className="form-group">
          <label htmlFor="expiry">Valid Thru</label>
          <input type="text" id="expiry" placeholder="01/2024" />
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="fullName">Full Name</label>
        <input type="text" id="fullName" placeholder="Full Name" />
      </div>
      
      <button className="action-btn">
        Send OTP
      </button>

      {/* Container for the custom checkbox */}
      <div className="save-details">
        <input type="checkbox" id="saveCard" />
        <label htmlFor="saveCard">Save details for future</label>
      </div>
    </div>
  );
};

export default CreditCardForm;