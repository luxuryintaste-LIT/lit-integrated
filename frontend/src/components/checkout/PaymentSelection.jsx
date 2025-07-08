import React, { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, Landmark, Wallet, IndianRupee, ChevronRight, ChevronDown } from 'lucide-react';

import NetBankingForm from './NetBankingForm';
import UpiForm from './UpiForm';
import PaypalForm from './PaypalForm';
import CreditCardForm from './CreditCardForm';

const paymentMethods = [
  { key: 'card', label: 'Debit / Credit Card', icon: CreditCard },
  { key: 'netbanking', label: 'Net Banking', icon: Landmark },
  { key: 'paypal', label: 'Paypal', icon: Wallet },
  { key: 'upi', label: 'UPI', icon: IndianRupee },
];

const PaymentSelection = ({ onBack }) => {
  const [activeMethod, setActiveMethod] = useState('card');
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 992;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderPaymentForm = () => {
    switch (activeMethod) {
      case 'card':
        return <CreditCardForm />;
      case 'netbanking':
        return <NetBankingForm />;
      case 'paypal':
        return <PaypalForm />;
      case 'upi':
        return <UpiForm />;
      default:
        return null;
    }
  };

  return (
    <div className="step-content-container">
      <div className="payment-header-compact">
        <button className="action-btn" onClick={onBack}>
          <ArrowLeft size={16} style={{ marginRight: 4 }} /> Back
        </button>
        <h6 className="payment-title-compact">Select Payment Method</h6>
      </div>
      <div className="payment-layout">
        {isMobile ? (
          <div className="payment-accordion">
            {paymentMethods.map(({ key, label, icon: Icon }) => (
              <div key={key} className={`payment-accordion-item${activeMethod === key ? ' active' : ''}`}>
                <button
                  className="payment-accordion-btn"
                  onClick={() => setActiveMethod(activeMethod === key ? null : key)}
                  aria-expanded={activeMethod === key}
                >
                  <div className="method-btn-group">
                    <Icon size={24} />
                    <span>{label}</span>
                  </div>
                  <ChevronDown size={24} className="chevron" />
                </button>
                {activeMethod === key && (
                  <div className="payment-accordion-content">
                    {renderPaymentForm()}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="payment-methods-sidebar">
            {paymentMethods.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                className={`method-btn ${activeMethod === key ? 'active' : ''}`}
                onClick={() => setActiveMethod(key)}
              >
                <div className="method-btn-group">
                  <Icon size={20} />
                  <span>{label}</span>
                </div>
                {activeMethod === key && <ChevronRight size={24} />}
              </button>
            ))}
          </div>
        )}
        {/* Only render payment-content for desktop */}
        {!isMobile && <div className="payment-content">{renderPaymentForm()}</div>}
      </div>
    </div>
  );
};

export default PaymentSelection;