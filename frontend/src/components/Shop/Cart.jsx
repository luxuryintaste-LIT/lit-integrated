import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  IconButton,
  Button,
  TextField,
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateCartItem,
  removeFromCart,
  clearCart,
  setCoupon,
  clearCoupon,
} from '../../redux/reducers/cartReducer';
import { validateCouponCode } from '../../services/api';

// ✅ Import the external CSS file
import '../../styles/Cart.css';

const Cart = () => {
  // All logic from Version 1 is preserved
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const discount = useSelector((state) => state.cart.discount);
  const couponApplied = useSelector((state) => state.cart.couponApplied);
  const [couponInput, setCouponInput] = React.useState('');
  const [couponError, setCouponError] = React.useState('');

  const SHIPPING_COST = 0; // Match Version 2's "Free shipping"

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + SHIPPING_COST - discount;
  };

  const handleUpdateQuantity = (itemId, quantity) => {
    if (quantity > 0) {
      dispatch(updateCartItem({ itemId, quantity }));
    }
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleApplyCoupon = async () => {
    setCouponError('');
    dispatch(clearCoupon());
    try {
      const { discountValue, discountType } = await validateCouponCode(couponInput);
      let calculatedDiscount = 0;
      if (discountType === 'flat') {
        calculatedDiscount = discountValue;
      } else if (discountType === 'percent') {
        calculatedDiscount = Math.round(calculateSubtotal() * (discountValue / 100));
      }
      dispatch(
        setCoupon({ coupon: couponInput, discount: calculatedDiscount, couponApplied: true })
      );
    } catch (err) {
      dispatch(clearCoupon());
      setCouponError(err.toString() || 'Invalid promo code');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart-message">
          <h1>Your cart is empty</h1>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <Button className="checkout-button" onClick={() => navigate('/shop')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-content">
        <h1>Your Cart</h1>
        <div className="cart-layout">
          {/* Cart Items Section */}
          <div className="cart-items-container">
            {cart.map((item) => {
              // Convert image data to base64 for display
              const convertToBase64 = (image) => {
                if (!image || !image.data || !image.contentType) return '/images/products/default-product.jpg';

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
                    return '/images/products/default-product.jpg';
                  }
                }

                return '/images/products/default-product.jpg';
              };

              // Get the first image from the product
              const imageSrc = item.images?.[0]?.images?.[0] 
                ? convertToBase64(item.images[0].images[0])
                : '/images/products/default-product.jpg';

              return (
                <Card key={item._id} component="div" elevation={0} className="cart-item">
                  <CardMedia component="img" image={imageSrc} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <div className="cart-item-info">
                      <div className="cart-item-brand">{item.brand}</div>
                      <h3 className="cart-item-name">{item.name}</h3>
                      <div className="cart-item-price">Rs. {(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                    <div className="cart-item-controls">
                      <div className="quantity-controls">
                        <IconButton size="small" onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)} disabled={item.quantity <= 1}>
                          <RemoveIcon />
                        </IconButton>
                        <span>{item.quantity}</span>
                        <IconButton size="small" onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)} disabled={item.quantity >= item.stock}>
                          <AddIcon />
                        </IconButton>
                      </div>
                      <button className="remove-button" onClick={() => handleRemoveFromCart(item._id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Order Summary Section */}
          <div className="order-summary">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>Rs. {calculateSubtotal().toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{SHIPPING_COST > 0 ? `Rs. ${SHIPPING_COST}` : 'Free'}</span>
            </div>
            {discount > 0 && (
              <div className="summary-row discount-row">
                <span>Coupon Applied</span>
                <span>-Rs. {discount.toLocaleString()}</span>
              </div>
            )}
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>Rs. {calculateTotal().toLocaleString()}</span>
            </div>
            <button className="checkout-button" onClick={() => navigate('/checkout')}>

              PROCEED TO CHECKOUT
            </button>

            <div className="promo-code">
              <h3 className="promo-code-title">Promotional Code</h3>
              <div className="promo-code-input">
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter promo code"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  disabled={couponApplied}
                  // ✅ Apply class directly to the input element
                  InputProps={{ className: 'promo-input' }}
                />
                <button className="apply-button" onClick={handleApplyCoupon} disabled={couponApplied || !couponInput}>
                  APPLY
                </button>
              </div>
              {couponError && <p className="promo-error">{couponError}</p>}
              {couponApplied && <p className="promo-success">Promo code applied successfully!</p>}
            </div>
             <button className="clear-cart-button" onClick={handleClearCart}>
                Clear Cart
            </button>
          </div>
        </div>

        {/* Static Features Section from Version 2 */}
        <div className="features-section">
          <div className="feature-item">
            <h3 className="feature-title">EASY RETURNS</h3>
            <p className="feature-description">Take advantage of our easy return service if you're not satisfied with your order</p>
          </div>
          <div className="feature-item">
            <h3 className="feature-title">PAYMENTS</h3>
            <p className="feature-description">Choose among the safest and most common payment methods</p>
          </div>
          <div className="feature-item">
            <h3 className="feature-title">CULTURE AND RELIABILITY</h3>
            <p className="feature-description">A reliable and successful history in the fashion industry for over 50 years</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;