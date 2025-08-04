import React, { useState } from 'react';
// We'll use icons for the arrows and close button
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import './PricingSummary.css';

const PricingSummary = ({ pricing, items }) => {
  // State to manage if the details are open or closed on mobile
  const [isOpen, setIsOpen] = useState(false);

  // If there's no pricing info, don't render anything
  if (!pricing) {
    return null;
  }
  
  // A simple function to toggle the state
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Helper to safely format numbers, defaulting to 0 if data is missing
  const formatPrice = (value) => (value ?? 0).toFixed(2);

  return (
    // The main container. We'll add a class when it's open for styling.
    <div className={`pricing-summary-container ${isOpen ? 'open' : ''}`}>

      {/* --- 1. The Always-Visible Header (for Mobile) --- */}
      <div className="summary-header" onClick={toggleOpen}>
        <h3 className="header-title">Total Order Price</h3>
        <div className="header-right">
          <span className="header-total-price">₹{formatPrice(pricing.totalPaid)}</span>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {/* --- 2. The Collapsible Details Content --- */}
      <div className="summary-details-content">
        <div className="details-header">
          <h4>Payment Information</h4>
          <button onClick={toggleOpen} className="close-button"><X size={20} /></button>
        </div>

        <div className="price-breakdown">
          {/* Displaying each item's base price */}
          {items && items.map(item => (
             <div className="price-row" key={item.sku}>
              <span>{item.quantity} x {item.name}</span>
              <span>₹{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}

          {pricing.productDiscount > 0 && (
            <div className="price-row">
              <span>Discount</span>
              <span className="discount-value">-₹{formatPrice(pricing.productDiscount)}</span>
            </div>
          )}

          <div className="price-row semi-total">
            <span>Discounted Price</span>
            <span>₹{formatPrice(pricing.discountedPrice)}</span>
          </div>

          {pricing.couponDiscount > 0 && (
            <div className="price-row">
              <span>Coupon Discount</span>
              <span className="discount-value">-₹{formatPrice(pricing.couponDiscount)}</span>
            </div>
          )}
          
          <div className="price-row">
            <span>Shipping Fee</span>
            <span>₹{formatPrice(pricing.shippingFee)}</span>
          </div>

          {pricing.codFee > 0 && (
            <div className="price-row">
              <span>Cash/Pay On Delivery</span>
              <span>₹{formatPrice(pricing.codFee)}</span>
            </div>
          )}
        </div>

        <div className="price-row grand-total">
          <span>Total Paid</span>
          <span>₹{formatPrice(pricing.totalPaid)}</span>
        </div>

        <div className="payment-method-info">
          <img src="/path/to/your/cod-icon.png" alt="Payment Method" className="payment-icon"/>
          <span>{pricing.paymentMethod || 'Pay on delivery'}</span>
        </div>

        <button className="get-invoice-button">GET INVOICE</button>
      </div>
    </div>
  );
};

export default PricingSummary;