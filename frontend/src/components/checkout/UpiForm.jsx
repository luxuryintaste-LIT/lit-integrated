// src/components/checkout/UpiForm.jsx
import React, { useState } from 'react';
import { IndianRupee, CheckCircle, XCircle } from 'lucide-react';

const GPayLogo = () => <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/2560px-Google_Pay_Logo.svg.png" alt="GPay" />;
const PhonePeLogo = () => <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/PhonePe_Logo.svg/2560px-PhonePe_Logo.svg.png" alt="PhonePe" />;
const PaytmLogo = () => <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo.svg/2560px-Paytm_Logo.svg.png" alt="Paytm" />;
const AmazonPayLogo = () => <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Amazon_Pay_logo.svg/2560px-Amazon_Pay_logo.svg.png" alt="Amazon Pay" />;

const UpiForm = () => {
  const [upiId, setUpiId] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = () => {
    setError('');
    setIsVerified(false);
    if (!upiId || !upiId.includes('@')) {
      setError('Please enter a valid UPI ID');
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      if (upiId.endsWith('@upi')) {
        setIsVerified(true);
      } else {
        setError('Verification failed. Please check the ID.');
      }
      setIsVerifying(false);
    }, 2000);
  };

  const handleInputChange = (e) => {
    setUpiId(e.target.value);
    setIsVerified(false);
    setIsVerifying(false);
    setError('');
  };

  const renderButton = () => {
    if (isVerifying) {
      return (
        <button className="action-btn" disabled>
          <div className="spinner"></div>
          Verifying...
        </button>
      );
    }
    if (isVerified) {
      return <button className="action-btn">Pay Now</button>;
    }
    return (
      <button className="action-btn" onClick={handleVerify}>
        Verify
      </button>
    );
  };

  return (
    <div className="upi-form-compact">
      <div className="form-header">
        <IndianRupee className="form-header-icon" size={24} />
        <h4 className="form-header-title">UPI</h4>
      </div>
      <div>
        <label className="upi-section-label">Choose App</label>
        <div className="upi-apps">
          <button className="upi-app-btn"><GPayLogo /></button>
          <button className="upi-app-btn"><PhonePeLogo /></button>
          <button className="upi-app-btn"><PaytmLogo /></button>
          <button className="upi-app-btn"><AmazonPayLogo /></button>
        </div>
      </div>
      <div className="upi-divider"><span>or</span></div>
      <div>
        <label htmlFor="upiId" className="upi-section-label">Enter UPI ID</label>
        <div className="upi-input-wrapper">
          <input
            type="text"
            id="upiId"
            value={upiId}
            onChange={handleInputChange}
            placeholder="username@bank"
            className={`upi-input-field${error ? ' error' : ''}`}
            autoComplete="off"
          />
          {isVerifying && <div className="spinner-inline"></div>}
          {isVerified && <CheckCircle className="upi-status-icon verified" size={20} />}
          {error && !isVerifying && <XCircle className="upi-status-icon error" size={20} />}
        </div>
        {error && <small className="error-message">{error}</small>}
      </div>
      {renderButton()}
      <div className="save-details">
        <input type="checkbox" id="saveUpi" />
        <label htmlFor="saveUpi">Save details for future</label>
      </div>
    </div>
  );
};

export default UpiForm;