// src/components/checkout/PaypalForm.jsx
import React, { useState } from 'react';
import { Wallet } from 'lucide-react';

const PaypalForm = () => {
  const [paypalId, setPaypalId] = useState('');
  const [error, setError] = useState('');
  
  const handleConfirm = () => {
    setError('');
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!paypalId || !emailRegex.test(paypalId)) {
        setError('Please enter a valid Paypal ID (email).');
        return;
    }
    // Proceed with logic
    alert('Confirmed Paypal ID: ' + paypalId);
  }

  return (
    <div>
      <div className="form-header paypal-form-header">
        <Wallet className="form-header-icon" size={24} />
        <h4 className="form-header-title">Paypal</h4>
      </div>
      <label htmlFor="paypalId" className="paypal-label">Paypal ID</label>
      <div className="paypal-row">
        <input 
          type="text" 
          id="paypalId" 
          value={paypalId}
          onChange={(e) => {
            setPaypalId(e.target.value);
            setError('');
          }}
          placeholder="Enter your Paypal email" 
          className={`paypal-input${error ? ' error' : ''}`}
        />
        <button className="action-btn" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
      {error && <small className="error-message">{error}</small>}
    </div>
  );
};

export default PaypalForm;