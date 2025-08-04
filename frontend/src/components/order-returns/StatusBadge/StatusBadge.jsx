import React from 'react';
import './StatusBadge.css';

/**
 * A reusable component to display an order status with appropriate color-coding.
 * @param {{ status: 'Delivered' | 'On the Way' | 'Canceled' | 'Returned' }} props
 */
const StatusBadge = ({ status }) => {
  // Converts a status like "On the Way" into a CSS-friendly class name like "on-the-way"
  const statusClass = status.toLowerCase().replace(/ /g, '-');

  return (
    <div className={`status-badge ${statusClass}`}>
      {status}
    </div>
  );
};

export default StatusBadge;