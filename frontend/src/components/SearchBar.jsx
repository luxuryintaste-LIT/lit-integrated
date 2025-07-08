import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState('');
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(inputValue);
    }
  };
  
  return (
    <div className="search-container">
      <form className="search-wrapper" onSubmit={handleSubmit}>
        {/* The main search bar with icons inside */}
        <div className="search-box"> 
          {/* Search Icon (left) */}
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          
          <input 
            type="text" 
            placeholder="You can search items" 
            className="search-input"
            value={inputValue}
            onChange={handleInputChange}
          />

          {/* Filter Icon (right) */}

        </div>

        {/* Action buttons outside the search bar */}
<div className="action-buttons-search">
  {/* Wishlist Button */}
  <button
    type="button"
    className="action-button"
    onClick={() => navigate('/wishlist')}
  >
    {/* Heart Icon */}
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5
        5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78
        1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  </button>

  {/* Cart Button */}
  <button
    type="button"
    className="action-button"
    onClick={() => navigate('/cart')}
  >
    {/* Shopping Bag Icon */}
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  </button>
</div>

      </form>
    </div>
  );
};

export default SearchBar;