import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../../services/api';
import '../../styles/productDetails.css';

// This helper function makes your image rendering more robust.
const bufferToBase64 = (buffer) => {
  // If it's already a string URL, just return it.
  if (typeof buffer === 'string') return buffer;

  if (!buffer || !buffer.data || !buffer.contentType) return '';

  // Handles if the data is already a base64 string
  if (typeof buffer.data === 'string') {
    return `data:${buffer.contentType};base64,${buffer.data}`;
  }

  // Handles if the data is an array of numbers (buffer)
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
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        // SAFER: Only set state if data is valid
        if (data) {
          setProduct(data);
          if (data.colors?.length > 0) setSelectedColor(data.colors[0]);
          if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
        } else {
          console.error('No product data returned for id:', id);
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  // Update selectedImages on color or product change
  useEffect(() => {
    if (!product || !product.images) return;
    const colorGroup = product.images.find(group => group.color === selectedColor);
    setSelectedImages(colorGroup?.images || []);
    setActiveImageIndex(0);
  }, [selectedColor, product]);

  // Lock background scroll when modal opens
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

  // Escape key to close modal
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [onClose]);

  const handleColorSelect = (color) => setSelectedColor(color);
  const handleSizeSelect = (size) => setSelectedSize(size);
  const handleQuantityChange = (e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1));

  const handleAddToCart = () => {
    // This check is now mostly handled by the disabled button state, but it's a good fallback.
    if (!selectedColor || !selectedSize) {
      alert('Please select both color and size');
      return;
    }
    alert(`Added to cart: ${product.name} - ${selectedColor} - ${selectedSize} - Quantity: ${quantity}`);
  };

  const handleBuyNow = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select both color and size');
      return;
    }
    const orderItem = {
      productId: product._id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      imageUrl: selectedImages.length > 0 ? bufferToBase64(selectedImages[0]) : '',
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      stock: product.stock,
    };
    navigate('/checkout', { state: { items: [orderItem] } });
  };

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    onClose();
  };

  if (!product) return <div className="product-details-loading">Loading...</div>;

  return (
    <div className="product-details-container" onClick={handleClose}>
      <div className="product-details-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={handleClose} aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="product-details-grid">
          <div className="product-images-section">
            <div className="main-image-container">
              {selectedImages[activeImageIndex] ? (
                <img
                  src={bufferToBase64(selectedImages[activeImageIndex])}
                  alt={`${product.name} - ${selectedColor}`}
                  className="main-product-image"
                />
              ) : <div className="main-product-image placeholder">No Image</div>}
            </div>
            <div className="thumbnail-container">
              {(selectedImages || []).map((img, index) => (
                <div key={index} className={`thumbnail ${activeImageIndex === index ? 'active' : ''}`} onClick={() => setActiveImageIndex(index)}>
                  <img src={bufferToBase64(img)} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="product-info-section">
            <div className="brand-name">{product.brand}</div>
            <h1 className="product-name">{product.name}</h1>
            <div className="price-container">
              {/* SAFER: Use optional chaining to prevent crash if price is missing */}
              <div className="current-price">Rs. {product.price?.toLocaleString()}</div>
              {product.originalPrice && <div className="original-price">Rs. {product.originalPrice?.toLocaleString()}</div>}
              {product.discount && <div className="discount">{product.discount}% OFF</div>}
            </div>
            <div className="product-description">{product.description}</div>

            <div className="selection-container">
              <h3>Color</h3>
              <div className="color-options">
                {/* SAFER: Use '|| []' to prevent crash if colors array is missing */}
                {(product.colors || []).map((color, index) => (
                  <button
                    key={color || index} // SAFER: Handle null/undefined colors
                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                    onClick={() => color && handleColorSelect(color)} // SAFER: Don't call handler if color is null
                    style={{ backgroundColor: color ? color.toLowerCase() : 'transparent' }} // SAFER: This fixes the crash
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
                {/* SAFER: Use '|| []' to prevent crash if sizes array is missing */}
                {(product.sizes || []).map((size) => (
                  <button key={size} className={`size-option ${selectedSize === size ? 'selected' : ''}`} onClick={() => handleSizeSelect(size)}>{size}</button>
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

            <div className="action-buttons">
              {/* SAFER: Disable buttons if selection is incomplete */}
              <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={!selectedColor || !selectedSize}>Add to Cart</button>
              <button className="buy-now-btn" onClick={handleBuyNow} disabled={!selectedColor || !selectedSize}>Buy Now</button>
            </div>

            <div className="product-details-list">
              <h3>Product Details</h3>
              <ul>
                {(product.features || []).map((detail, index) => (<li key={index}>{detail}</li>))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;