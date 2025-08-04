import React from 'react';
import './OrderControls.css';

const OrderControls = ({ filters, onFilterChange }) => {
  const tabs = ['All', 'On the Way', 'Delivered', 'Canceled', 'Returned'];

  return (
    <div className="order-controls-wrapper">
      <div className="filter-tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`filter-tab ${filters.status === tab ? 'active' : ''}`}
            onClick={() => onFilterChange({ status: tab })}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="search-and-time">
        <input
          type="text"
          placeholder="Search by Order ID or Product..."
          className="search-input"
          value={filters.searchTerm}
          onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
        />

        {/* ✅ ADDED WRAPPER for custom styling */}
        <div className="time-select-container">
          <select
            className="time-select"
            value={filters.timeRange}
            onChange={(e) => onFilterChange({ timeRange: e.target.value })}
          >
            <option value="all">All Time</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 3 Months</option>
            <option value="365">Last Year</option>
          </select>
        </div>
        
      </div>
    </div>
  );
};

export default OrderControls;