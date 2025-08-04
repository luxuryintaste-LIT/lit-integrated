import React from 'react';
import './ProductInfo.css';


// Import the common components
import ReviewsSummary from '../../common/ReviewsSummary/ReviewsSummary';
import TrustBadges from '../../common/TrustBadges/TrustBadges';

const StockStatus = ({ stock }) => {
  if (stock > 10) return <div className="stock-status in-stock">✓ In Stock</div>;
  if (stock > 0 && stock <= 10) return <div className="stock-status low-stock">Only {stock} left!</div>;
  return <div className="stock-status out-of-stock">Sold Out</div>;
};

const ProductInfo = ({
  product,
  selectedColor,
  onColorChange,
  selectedSize,
  onSizeChange,
  quantity,
  onQuantityChange,
  onAddToCart,
  onBuyNow,
}) => {
  const isActionDisabled = !selectedColor || !selectedSize || product.stock === 0;

  return (
    <div className="product-info-container">
      {/* Product Info Section */}
      <div className="product-main-info">
        <p className="product-brand">{product.brand}</p>
        <h1 className="product-title">{product.name}</h1>
        <div className="price-section">
          <span className="current-price">₹{product.price?.toLocaleString()}</span>
          {product.discount && <span className="discount-badge">{product.discount}% OFF</span>}
          {product.originalPrice && <span className="original-price">₹{product.originalPrice?.toLocaleString()}</span>}
          
        </div>
        {/* <StockStatus stock={product.stock} /> */}
      </div>

      {/* <div className="divider"></div> */}

      {/* Options Section */}
      <div className="product-options">
        <div className="options-group">
          <label className="option-label">Color: {selectedColor}</label>
          <div className="color-selector">
            {(product.colors || []).map((color) => (
              <button
  key={color}
  className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
  onClick={() => onColorChange(color)}
  title={color}
>
  <div className="color-swatch-inner" style={{ backgroundColor: color.toLowerCase() }} />
</button>
 ))}
          </div>
        </div>

        <div className="options-group">
          <label className="option-label">Size: {selectedSize}</label>
          <div className="size-selector">
            {(product.sizes || []).map((size) => (
              <button key={size} className={`size-box ${selectedSize === size ? 'selected' : ''}`} onClick={() => onSizeChange(size)}>
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="options-group">
          <label className="option-label">Quantity:</label>
          <div className="quantity-selector">
            <button className="quantity-btn" onClick={() => onQuantityChange(Math.max(1, quantity - 1))} disabled={isActionDisabled}>-</button>
            <input type="number" value={quantity} className="quantity-input" readOnly />
            <button className="quantity-btn" onClick={() => onQuantityChange(quantity + 1)} disabled={isActionDisabled}>+</button>
          </div>
        </div>
      </div>
      
      {/* Action Section */}
      <div className="product-actions">
        {/* ✅ UPDATED: Both buttons are now in the same container */}
        <div className="action-buttons-group">
          <button className="btn-secondary-cart" onClick={onAddToCart} disabled={isActionDisabled}>
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
          <button className="btn-buy-now" onClick={onBuyNow} disabled={isActionDisabled}>
            Buy Now
          </button>
        </div>
        {/* TrustBadges can be styled or removed */}
        {/* <TrustBadges /> */}
      </div>
    </div>
  );
};

export default ProductInfo;