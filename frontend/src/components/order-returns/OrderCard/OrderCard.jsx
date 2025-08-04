import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from '../StatusBadge/StatusBadge';
import './OrderCard.css';

const OrderCard = ({ order }) => {
  // A simple function to prevent event propagation when copying
  const handleCopy = (e, text) => {
    e.preventDefault(); // Stop the click from navigating via the Link
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    // You could add a small visual "Copied!" feedback here
  };

  return (
    <Link to={`/orders/${order.id}`} className="order-card-link">
      <div className="order-card-container">
        <div className="card-header">
          <div className="card-header-left">
            <div className="info-group">
              <span className="info-label">ORDER PLACED</span>
              <span className="info-value">{order.date}</span>
            </div>
            <div className="info-group">
              <span className="info-label">TOTAL</span>
              {/* ✅ CHANGED to Rupee symbol for consistency */}
              <span className="info-value">₹{order.pricing.grandTotal.toFixed(2)}</span>
            </div>
          </div>
          <div className="card-header-right">
            <span className="info-label">ORDER ID</span>
            <div className="info-value-copy">
              {order.id}
              <button onClick={(e) => handleCopy(e, order.id)} className="copy-button" title="Copy Order ID">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zM8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="product-info">
            <img src={order.items[0].image} alt={order.items[0].name} className="product-thumbnail"/>
            <div className="product-details">
              <StatusBadge status={order.status} />
              <h3 className="product-name">
                {order.items[0].name}
                {order.items.length > 1 && ` + ${order.items.length - 1} other item(s)`}
              </h3>
              {order.status === 'On the Way' && order.estimatedDelivery &&
                <p className="delivery-estimate">Estimated delivery: {order.estimatedDelivery}</p>
              }
               {order.status === 'Delivered' && 
                <p className="delivery-estimate">Delivered on {order.date}</p>
              }
            </div>
          </div>
          <div className="card-actions">
              <div className="details-button">
                {/* The text inside the button for the gradient */}
                View Details
              </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;