import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToWishlist, removeFromWishlist } from '../../redux/reducers/cartReducer';
import '/src/styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.cart.wishlist);
  const isWishlisted = product ? wishlist.some(item => item._id === product._id) : false;

  const [imgSrc, setImgSrc] = useState('/images/products/default-product.jpg');

  // ✅ Use image URL directly (not base64)
  useEffect(() => {
    if (
      product.images &&
      product.images.length > 0 &&
      product.images[0].images &&
      product.images[0].images.length > 0
    ) {
      const imageUrl = product.images[0].images[0]; // now just a URL string
      setImgSrc(imageUrl);
    }
  }, [product]);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const itemToAdd = {
      ...product,
      quantity: 1,
      color: product.colors && product.colors.length > 0 ? product.colors[0] : 'Default Color',
      size: product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Default Size',
    };

    dispatch(addToCart(itemToAdd));
  };

  return (
    <Link to={`/product/${product._id}`} className="product-card">
      <div className="product-image-container">
        <img
          src={imgSrc}
          alt={product.name}
          className="product-image"
          onError={() => setImgSrc('/images/products/default-product.jpg')}
        />
        <button
          className={`wishlist-button ${isWishlisted ? 'active' : ''}`}
          onClick={handleWishlistClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isWishlisted ? "white" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
      <div className="product-info">
        <div className="brand-name">{product.brand}</div>
        <h3 className="product-name-card">{product.name}</h3>
        <div className="price-container">
          <div className="current-price">Rs. {product.price.toLocaleString()}</div>
          {product.originalPrice && (
            <div className="original-price">Rs. {product.originalPrice.toLocaleString()}</div>
          )}
          {product.discount && (
            <div className="discount">{product.discount}% OFF</div>
          )}
        </div>
        <div className="button-container">
          <Link to={`/product/${product._id}`} className="buy-now">Buy Now</Link>
          <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;