import React, { useState, useEffect } from 'react';
// ✅ Import useNavigate to handle navigation
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../../services/api';
import '../../styles/productDetails.css';

// Convert buffer or base64 to image URL (No changes here)
const bufferToBase64 = (buffer) => {
  if (!buffer || !buffer.data || !buffer.contentType) return '';

  if (typeof buffer.data === 'string') {
    return `data:${buffer.contentType};base64,${buffer.data}`;
  }

  if (Array.isArray(buffer.data)) {
    try {
      const byteArray = Uint8Array.from(buffer.data);
      let binary = '';
      for (let i = 0; i < byteArray.length; i++) {
        binary += String.fromCharCode(byteArray[i]);
      }
      const base64String = btoa(binary);
      return `data:${buffer.contentType};base64,${base64String}`;
    } catch (err) {
      console.error('Base64 conversion error:', err);
      return '';
    }
  }

  return '';
};

const ProductDetails = ({ onClose }) => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);

useEffect(() => {
  const fetchProduct = async () => {
    try {
      const data = await getProduct(id);

      if (data) {
        setProduct(data);
        if (data.colors?.length > 0) {
          setSelectedColor(data.colors[0]);
        }
        if (data.sizes?.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
      } else {
        console.error('No product data returned for id:', id);
      }
    } catch (error) {
      console.error('Failed to fetch product:', error);
    }
  };

  fetchProduct();
}, [id]);

  useEffect(() => {
    if (!product || !product.images) return;

    const colorGroup = product.images.find((group) => group.color === selectedColor);
    setSelectedImages(colorGroup?.images || []);
    setActiveImageIndex(0);
  }, [selectedColor, product]);

  // Effects for modal behavior and Esc key (No changes here)
  useEffect(() => {
    const scrollPosition = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPosition);
    };
  }, []);

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        handleClose(); // Use our handleClose function to also navigate
      }
    };
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [onClose]);


  // Handlers for state changes (No changes here)
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (e) => {
    setQuantity(Math.max(1, parseInt(e.target.value) || 1));
  };

  // Main Action Handlers (Updated)
  const handleAddToCart = () => {
    // The validation is now handled by disabling the button, so this check is a fallback.
    if (!selectedColor || !selectedSize) {
      alert('Please select both color and size');
      return;
    }
    // This part now works as expected once a color/size is selected.
    alert(`Added to cart: ${product.name} - ${selectedColor} - ${selectedSize} - Quantity: ${quantity}`);
    // You could optionally close the modal here too: handleClose();
  };

  const handleBuyNow = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select both color and size');
      return;
    }
    
    // ✅ ENHANCEMENT: Navigate to a checkout page with product info
    const itemToBuy = {
      id: product._id || id,
      name: product.name,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      price: product.price,
      image: selectedImages.length > 0 ? bufferToBase64(selectedImages[0]) : '',
    };

    navigate('/checkout', { state: { item: itemToBuy } });
  };

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    if (typeof onClose === 'function') {
      onClose(); // Call parent's close function if it exists
    }
    // ✅ FIX: Navigate back to the previous page when closing
    navigate(-1);
  };

  if (!product) return <div className="product-details-loading">Loading...</div>;

  return (
    <div className="product-details-container" onClick={handleClose}>
      <div className="product-details-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={handleClose} aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="product-details-grid">
          {/* Images Section (No changes here) */}
          <div className="product-images-section">
            <div className="main-image-container">
              {selectedImages[activeImageIndex] ? (
                <img
                  src={bufferToBase64(selectedImages[activeImageIndex])}
                  alt={`${product.name} - ${selectedColor}`}
                  className="main-product-image"
                />
              ) : (
                <div className="main-product-image placeholder">No Image Available</div>
              )}
            </div>
            <div className="thumbnail-container">
              {selectedImages.map((img, index) => (
                <div
                  key={index}
                  className={`thumbnail ${activeImageIndex === index ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={bufferToBase64(img)} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Info Section (Button changes are here) */}
          <div className="product-info-section">
            <div className="brand-name">{product.brand}</div>
            <h1 className="product-name">{product.name}</h1>

            <div className="price-container">
              <div className="current-price">Rs. {product.price.toLocaleString()}</div>
              {product.originalPrice && (
                <div className="original-price">Rs. {product.originalPrice.toLocaleString()}</div>
              )}
              {product.discount && (
                <div className="discount">{product.discount}% OFF</div>
              )}
            </div>

            <div className="product-description">{product.description}</div>

          <div className="selection-container">
            <h3>Color</h3>
            <div className="color-options">
              {product.colors.map((color, index) => (
                <button 
                  key={color || index} 
                  className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                  onClick={() => color && handleColorSelect(color)}
                  style={{ backgroundColor: color ? color.toLowerCase() : 'transparent' }}
                  title={color || 'No color'}
                >
                  {selectedColor === color && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                </button>
              ))}
            </div>
          </div>

            <div className="selection-container">
              <h3>Size</h3>
              <div className="size-options">
                {product.sizes.map((size) => (
                  <button key={size} className={`size-option ${selectedSize === size ? 'selected' : ''}`} onClick={() => handleSizeSelect(size)}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="selection-container">
              <h3>Quantity</h3>
              <div className="quantity-selector">
                <button className="quantity-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <input type="number" min="1" value={quantity} onChange={handleQuantityChange} className="quantity-input" />
                <button className="quantity-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            {/* ✅ FIX: Action Buttons are now disabled based on state */}
            <div className="action-buttons">
              <button
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={!selectedColor || !selectedSize}
              >
                Add to Cart
              </button>
              <button
                className="buy-now-btn"
                onClick={handleBuyNow}
                disabled={!selectedColor || !selectedSize}
              >
                Buy Now
              </button>
            </div>

            <div className="product-details-list">
              <h3>Product Details</h3>
              <ul>
                {(product.features || []).map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
