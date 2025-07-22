// src/components/OrderSummary/OrderSummary.js

import React from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'; // <--- 1. Import useLocation
import { removeFromCart } from '../../redux/reducers/cartReducer';
// Make sure to import your CSS file
// import './OrderSummary.css'; 

const OrderSummary = () => { // <--- No longer needs props
  const dispatch = useDispatch();
  const location = useLocation(); // <--- 2. Get location object

  // 3. Get orderData from navigation state, default to an empty object
  const orderData = location.state?.orderData || {};

  const cartFromRedux = useSelector((state) => state.cart.cart);
  const discount = useSelector((state) => state.cart.discount || 0);

  // 4. THE CORE LOGIC FIX:
  // Check if we are in a "Buy Now" flow by seeing if orderData.items exists
  const isBuyNow = orderData?.items && orderData.items.length > 0;

  // If it's a "Buy Now" flow, use ONLY orderData.items.
  // Otherwise, use the items from the Redux cart.
  const items = isBuyNow ? orderData.items : cartFromRedux;

  const calculateSubtotal = () =>
    items.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);

  const calculateTotal = () => calculateSubtotal() - discount;

  const handleRemoveFromCart = (itemId) => {
    // We should only be able to remove items if we are NOT in a Buy Now flow
    if (!isBuyNow) {
      dispatch(removeFromCart(itemId));
    }
  };

  // Fees might come from orderData in a Buy Now flow
  const {
    platformFee = 20, // Example default value
    deliveryFee = 50, // Example default value
  } = orderData;

  const totalAmount = calculateTotal() + platformFee + deliveryFee;
  
  // Don't render if there are no items to show
  if (items.length === 0) {
    return (
      <div className="order-summary-container">
        <h2>Your order summary is empty.</h2>
        <p>Add items to your cart or use 'Buy Now' on a product to proceed.</p>
      </div>
    );
  }

  return (
    <div className="order-summary-container">
      <div className="summary-card">
        <h2 className="summary-title">PRICE DETAILS</h2>

        <div className="cart-items-summary">
          {items.map((item) => {
            // Use a consistent ID source
            const itemId = item._id || item.productId; 

            return (
              <div key={itemId} className="cart-item-summary">
                <div className="item-info">
                  <div className="item-details">
                    <h4 className="item-name">{item.name || 'Unnamed Product'}</h4>
                    {item.brand && <p className="item-brand">{item.brand}</p>}
                    <p className="item-variant">
                      {item.color && <>Color: {item.color}</>}
                      {item.color && item.size && <> | </>}
                      {item.size && <>Size: {item.size}</>}
                    </p>
                    <p className="item-quantity">Qty: {item.quantity || 1}</p>
                  </div>

                  <div className="item-price">
                    <span>₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}</span>
                    {/* 5. Only show the remove button if it's NOT a "Buy Now" item */}
                    {!isBuyNow && (
                      <button
                        className="remove-item-btn"
                        onClick={() => handleRemoveFromCart(itemId)}
                        title="Remove item"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="summary-body">
          <div className="summary-row">
            <span>Price ({items.length} item{items.length > 1 ? 's' : ''})</span>
            <span>₹{calculateSubtotal().toLocaleString('en-IN')}</span>
          </div>

          {discount > 0 && !isBuyNow && ( // Discount usually applies to cart, not buy now
            <div className="summary-row savings">
              <span>Discount</span>
              <span>-₹{discount.toLocaleString('en-IN')}</span>
            </div>
          )}

          <div className="summary-row">
            <span>Platform Fee</span>
            <span>{platformFee > 0 ? `₹${platformFee}` : 'Free'}</span>
          </div>

          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>{deliveryFee > 0 ? `₹${deliveryFee}` : 'Free'}</span>
          </div>
        </div>

        <div className="summary-total">
          <strong>Total Amount</strong>
          <strong>₹{totalAmount.toLocaleString('en-IN')}</strong>
        </div>
      </div>

      <div className="secure-info-box">
        <ShieldCheck size={40} className="shield-icon" />
        <div>
          <p><strong>Safe and Secure Payments. Easy returns. 100% Authentic products.</strong></p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

// import React from 'react';
// import { ShieldCheck, X } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { removeFromCart } from '../../redux/reducers/cartReducer';

// const OrderSummary = ({ orderData = {} }) => {
//   const dispatch = useDispatch();
//   const cartFromRedux = useSelector((state) => state.cart.cart);
//   const discount = useSelector((state) => state.cart.discount || 0);

//   const isBuyNow = orderData?.items?.length > 0;
//   const items = isBuyNow
//     ? [...cartFromRedux, ...orderData.items]
//     : cartFromRedux;

//   const calculateSubtotal = () =>
//     items.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);

//   const calculateTotal = () => calculateSubtotal() - discount;

//   const handleRemoveFromCart = (itemId) => {
//     dispatch(removeFromCart(itemId));
//   };

//   const {
//     platformFee = 0,
//     deliveryFee = 0,
//   } = orderData;

//   const totalAmount = calculateTotal() + platformFee + deliveryFee;

//   return (
//     <div className="order-summary-container">
//       <div className="summary-card">
//         <h2 className="summary-title">PRICE DETAILS</h2>

//         {/* Cart Items Section */}
//         <div className="cart-items-summary">
//           {items.map((item) => {
//             const itemId = item._id || item.productId;
//             const fromRedux = cartFromRedux.some(c => (c._id || c.productId) === itemId);

//             return (
//               <div key={itemId} className="cart-item-summary">
//                 <div className="item-info">
//                   <div className="item-details">
//                     <h4 className="item-name">{item.name || 'Unnamed Product'}</h4>
//                     {item.brand && <p className="item-brand">{item.brand}</p>}
//                     <p className="item-variant">
//                       {item.color && <>Color: {item.color}</>}
//                       {item.color && item.size && <> | </>}
//                       {item.size && <>Size: {item.size}</>}
//                     </p>
//                     <p className="item-quantity">Qty: {item.quantity || 1}</p>
//                   </div>

//                   <div className="item-price">
//                     <span>₹ {(item.price * item.quantity).toLocaleString('en-IN')}</span>
//                     {fromRedux && (
//                       <button
//                         className="remove-item-btn"
//                         onClick={() => handleRemoveFromCart(itemId)}
//                         title="Remove item"
//                         aria-label="Remove item"
//                       >
//                         <X size={16} />
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <div className="summary-body">
//           <div className="summary-row">
//             <span>Cart Total</span>
//             <span>₹ {calculateSubtotal().toLocaleString('en-IN')}</span>
//           </div>

//           {discount > 0 && (
//             <div className="summary-row savings">
//               <span>Discount</span>
//               <span>-₹ {discount.toLocaleString('en-IN')}</span>
//             </div>
//           )}

//           <div className="summary-row">
//             <span>Platform Fee</span>
//             <span>{platformFee > 0 ? `₹ ${platformFee}` : 'Free'}</span>
//           </div>

//           <div className="summary-row">
//             <span>Delivery Fee</span>
//             <span>{deliveryFee > 0 ? `₹ ${deliveryFee}` : 'Free'}</span>
//           </div>
//         </div>

//         <div className="summary-total">
//           <strong>Total Amount</strong>
//           <strong>₹ {totalAmount.toLocaleString('en-IN')}</strong>
//         </div>
//       </div>

//       <div className="secure-info-box">
//         <ShieldCheck size={40} className="shield-icon" />
//         <div>
//           <p><strong>Safe and Secure Payments. Easy returns. 100% Authentic products.</strong></p>
//           <p className="terms-text">
//             By continuing with the order, you confirm that you are above 18 years of age, and you agree to Flipkart's <a href="#" className="terms-link">Terms of Use</a> and <a href="#" className="terms-link">Privacy Policy</a>.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderSummary;
