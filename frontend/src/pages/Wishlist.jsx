import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import '../styles/Wishlist.css';
const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleRemoveClick = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromWishlist(productId);
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    removeFromWishlist(product.id);
  };

  const filteredWishlist = selectedCategory === 'all'
    ? wishlist
    : wishlist.filter(product => product.category === selectedCategory);

  return (
    <div className="wishlist-page">
      <div className="back-button-container">
        <Link to="/" className="back-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
      </div>

      <div className="wishlist-container">
        <h1 className="wishlist-title">Your Wishlist</h1>

        {wishlist.length > 0 && (
          <div className="filter-container">
            <select
              className="filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
        )}

        {filteredWishlist.length === 0 ? (
          <div className="empty-wishlist">
            {wishlist.length === 0 ? (
              <p>Your wishlist is empty</p>
            ) : (
              <p>No items found in this category</p>
            )}
          </div>
        ) : (
          <div className="wishlist-items">
            {filteredWishlist.map(product => (
              <Link to={`/product/${product.id}} key={product.id`} className="wishlist-item">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
                <div className="wishlist-buttons">
                  <button
                    className="add-to-cart-button"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="remove-from-wishlist"
                    onClick={(e) => handleRemoveClick(e, product.id)}
                  >
                    Remove
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;