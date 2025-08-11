import React from 'react';
import StatusBadge from '../StatusBadge/StatusBadge';
import './OrderDetailsHeader.css';

const OrderDetailsHeader = ({ order }) => {
  return (
    <div className="details-header-wrapper">
      <div className="header-text">
        <h1>Order #{order.id}</h1>
        <p>Placed on {new Date(order.orderTimestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
      <div className="header-actions">
        <StatusBadge status={order.status} />
        <button className="invoice-button">
          {/* Add an icon here if you have one, e.g., <Icon /> */}
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsHeader;