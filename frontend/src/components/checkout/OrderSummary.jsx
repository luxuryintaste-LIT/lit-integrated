import React from 'react';
import { ShieldCheck, X } from 'lucide-react'; // Using lucide-react for icons
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../redux/reducers/cartReducer';

const OrderSummary = ({ orderData }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const discount = useSelector((state) => state.cart.discount);

  // Calculate totals from actual cart data
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() - discount;
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  // Default data to prevent errors if props are not passed
  const {
    platformFee = 0,
    deliveryFee = 0,
  } = orderData || {};

  const totalAmount = calculateTotal() + platformFee + deliveryFee;

  return (
    <div className="order-summary-container">
      <div className="summary-card">
        <h2 className="summary-title">PRICE DETAILS</h2>
        
        {/* Cart Items Section */}
        <div className="cart-items-summary">
          {cart.map((item) => (
            <div key={item._id} className="cart-item-summary">
              <div className="item-info">
                <div className="item-details">
                  <h4 className="item-name">{item.name}</h4>
                  <p className="item-brand">{item.brand}</p>
                  <p className="item-variant">
                    {item.color && `Color: ${item.color}`}
                    {item.size && ` | Size: ${item.size}`}
                  </p>
                  <p className="item-quantity">Qty: {item.quantity}</p>
                </div>
                <div className="item-price">
                  <span>₹ {(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  <button 
                    className="remove-item-btn"
                    onClick={() => handleRemoveFromCart(item._id)}
                    title="Remove item"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="summary-body">
          <div className="summary-row">
            <span>Cart Total</span>
            <span>₹ {calculateSubtotal().toLocaleString('en-IN')}</span>
          </div>
          {discount > 0 && (
            <div className="summary-row savings">
              <span>Discount</span>
              <span>-₹ {discount.toLocaleString('en-IN')}</span>
            </div>
          )}
          <div className="summary-row">
            <span>Platform Fee</span>
            <span>{platformFee > 0 ? `₹ ${platformFee}` : 'Free'}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>{deliveryFee > 0 ? `₹ ${deliveryFee}` : 'Free'}</span>
          </div>
        </div>
        <div className="summary-total">
          <span>Total Amount</span>
          <span>₹ {totalAmount.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <div className="secure-info-box">
        <ShieldCheck size={40} className="shield-icon" />
        <div>
          <p><strong>Safe and Secure Payments. Easy returns. 100% Authentic products.</strong></p>
          <p className="terms-text">
            By continuing with the order, you confirm that you are above 18 years of age, and you agree to the Flipkart's <a>Terms of Use</a> and <a>Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;