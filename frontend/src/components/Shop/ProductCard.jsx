import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToWishlist, removeFromWishlist } from '../../redux/reducers/cartReducer';
import '/src/styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlist = useSelector(state => state.cart.wishlist);
  const isWishlisted = product ? wishlist.some(item => item._id === product._id) : false;

  const [imgSrc, setImgSrc] = useState('/images/products/default-product.jpg');

  // ✅ Convert image data (base64 string or buffer) to usable image src
  const convertToBase64 = (image) => {
    if (!image || !image.data || !image.contentType) return '';

    // Case 1: Already base64 string
    if (typeof image.data === 'string') {
      return `data:${image.contentType};base64,${image.data}`;
    }

    // Case 2: Buffer-like array from MongoDB
    if (Array.isArray(image.data)) {
      try {
        const byteArray = Uint8Array.from(image.data);
        let binary = '';
        for (let i = 0; i < byteArray.length; i++) {
          binary += String.fromCharCode(byteArray[i]);
        }
        const base64String = btoa(binary);
        return `data:${image.contentType};base64,${base64String}`;
      } catch (err) {
        console.error('Image base64 conversion error:', err);
        return '';
      }
    }

    return '';
  };

  // ✅ Load the first image on product load
  useEffect(() => {
    if (
      product?.images?.[0]?.images?.[0]
    ) {
      const image = product.images[0].images[0];
      const base64Src = convertToBase64(image);
      if (base64Src) setImgSrc(base64Src);
    }
  }, [product]);

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

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
      color: product.colors?.[0] || 'Default Color',
      size: product.sizes?.[0] || 'Default Size',
    };

    dispatch(addToCart(itemToAdd));
  };

  return (
    <div className="product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
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
          <Link to={`/product/${product._id}`} className="buy-now" onClick={(e) => e.stopPropagation()}>Buy Now</Link>
          <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
