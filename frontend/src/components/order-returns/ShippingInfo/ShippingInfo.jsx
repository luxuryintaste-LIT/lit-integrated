import React from 'react';
import './ShippingInfo.css'; // This will contain .info-card styles

const ShippingInfo = ({ shipping }) => {
  return (
    <div className="info-card">
      <h3 className="info-card-title">Shipping To</h3>
      <div className="info-card-content">
        <p className="recipient-name">{shipping.recipientName}</p>
        <p className="address">{shipping.address}</p>
        <p className="contact-info">{shipping.contactInfo}</p>
      </div>
    </div>
  );
};
export default ShippingInfo;