import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Typesense from 'typesense';

import '../styles/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // ✅ Typesense search-only client
  const typesenseClient = new Typesense.Client({
    nodes: [
      {
        host: 'tiau5xnegp7mok26p-1.a1.typesense.net',
        port: 443,
        protocol: 'https',
      },
    ],
    apiKey: 'XANzAQBYM4KW9WFvQ29mVJ49rZuwlCnb', // ✅ Make sure it's SEARCH-ONLY key
    connectionTimeoutSeconds: 2,
  });

  const searchProducts = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      if (onSearch) onSearch([]);
      return;
    }

    try {
      setIsSearching(true);
      console.log('🔍 Searching for:', query); // Debug log

      const response = await typesenseClient
        .collections('products')
        .documents()
        .search({
          q: query,
          query_by: 'name,description,tags',
          num_typos: 2,
        });

      console.log('✅ Typesense response:', response); // Log full response

      const matchedProducts = response.hits?.map((hit) => hit.document) || [];
      console.log('📦 Matched Products:', matchedProducts); // Log matched docs

      setSearchResults(matchedProducts);
      if (onSearch) onSearch(matchedProducts);
    } catch (error) {
      console.error('❌ Typesense search error:', error);
      setSearchResults([]);
      if (onSearch) onSearch([]);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      searchProducts(inputValue);
    }, 300);

    return () => clearTimeout(delay);
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchProducts(inputValue);
  };

  return (
    <div className="search-container">
      <form className="search-wrapper" onSubmit={handleSubmit}>
        <div className="search-box">
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
        </div>

        <div className="action-buttons-search">
          <button type="button" className="action-button" onClick={() => navigate('/wishlist')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          <button type="button" className="action-button" onClick={() => navigate('/cart')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </button>
        </div>
      </form>

      {/* 🔽 Search Results Dropdown */}
      <div className="search-dropdown">
        {isSearching && <p className="search-loading">Searching...</p>}
        
        {!isSearching && inputValue.trim() && searchResults.length === 0 && (
          <p className="no-results">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
