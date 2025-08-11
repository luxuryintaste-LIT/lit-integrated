import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../../redux/reducers/cartReducer'; // Adjust path if needed
import './WishlistButton.css';

const WishlistButton = ({ product }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.cart.wishlist);
  const isWishlisted = wishlist.some(item => item._id === product._id);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <button
      className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
      onClick={handleWishlistClick}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">{isWishlisted ? 'Saved' : 'Save'}</path>
      </svg>
      {/* <span></span> */}
    </button>
  );
};

export default WishlistButton;