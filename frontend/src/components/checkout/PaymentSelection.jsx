import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  CreditCard,
  Landmark,
  Wallet,
  IndianRupee,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import PaypalForm from './PaypalForm';

const paymentMethods = [
  { key: 'card', label: 'Debit / Credit Card', icon: CreditCard },
  { key: 'netbanking', label: 'Net Banking', icon: Landmark },
  { key: 'paypal', label: 'PayPal', icon: Wallet },
  { key: 'upi', label: 'UPI', icon: IndianRupee },
];

const PaymentSelection = ({ onBack, orderData }) => {
  const [activeMethod, setActiveMethod] = useState('card');
  const [expandedMobileMethod, setExpandedMobileMethod] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const discount = useSelector((state) => state.cart.discount);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 992);
    const handleResize = () => setIsMobile(window.innerWidth <= 992);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const TAX_RATE = 0.18;

  const calculateSubtotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const calculateTax = () => Math.round(calculateSubtotal() * TAX_RATE);
  const calculateShipping = () => orderData.deliveryFee || 0;
  const calculateTotal = () =>
    calculateSubtotal() + calculateShipping() + calculateTax() - discount;

  const handleRazorpayPayment = async () => {
    try {
      const total = calculateTotal();

      const res = await fetch('http://localhost:5000/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total }),
      });

      const data = await res.json();

      const options = {
        key: 'rzp_test_LHrzjT7gCJiBlJ',
        amount: data.amount,
        currency: 'INR',
        name: 'LIT Store',
        description: 'Order Payment',
        order_id: data.id,
        handler: function (response) {
          alert('✅ Payment Successful!');
          navigate('/order-confirmation');
        },
        prefill: {
          name: orderData.address?.name || 'Customer',
          email: orderData.address?.email || 'user@example.com',
        },
        theme: { color: '#000000' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('❌ Razorpay Error:', error);
    }
  };

  return (
    <div className="step-content-container">
      <div className="payment-header-compact">
        <button className="action-btn" onClick={onBack}>
          <ArrowLeft size={16} style={{ marginRight: 4 }} /> Back
        </button>
        <h6 className="payment-title-compact">Select Payment Method</h6>
      </div>

      <div className="payment-layout">
        {/* Mobile Accordion View */}
        {isMobile ? (
          <div className="payment-accordion">
            {paymentMethods.map(({ key, label, icon: Icon }) => (
              <div
                key={key}
                className={`payment-accordion-item${expandedMobileMethod === key ? ' active' : ''}`}
              >
                <button
                  className="payment-accordion-btn"
                  onClick={() =>
                    setExpandedMobileMethod(expandedMobileMethod === key ? null : key)
                  }
                  aria-expanded={expandedMobileMethod === key}
                >
                  <div className="method-btn-group">
                    <Icon size={24} />
                    <span>{label}</span>
                  </div>
                  <ChevronDown size={24} className="chevron" />
                </button>

                {/* Show payment content */}
                {expandedMobileMethod === key && (
                  <div className="accordion-content">
                    {key === 'paypal' ? (
                      <PayPalScriptProvider options={{ 'client-id': 'sb', currency: 'USD' }}>
                        <PaypalForm amount={calculateTotal()} orderData={orderData} />
                      </PayPalScriptProvider>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={handleRazorpayPayment}
                      >
                        Pay Now ₹{calculateTotal()}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Desktop Sidebar View */}
            <div className="payment-methods-sidebar">
              {paymentMethods.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  className={`method-btn ${activeMethod === key ? 'active' : ''}`}
                  onClick={() => setActiveMethod(key)}
                >
                  <div className="method-btn-group">
                    <Icon size={20} />
                    <span>{label}</span>
                  </div>
                  {activeMethod === key && <ChevronRight size={24} />}
                </button>
              ))}
            </div>

            <div className="payment-content">
              {activeMethod === 'paypal' ? (
                <PayPalScriptProvider options={{ 'client-id': 'sb', currency: 'USD' }}>
                  <PaypalForm amount={calculateTotal()} orderData={orderData} />
                </PayPalScriptProvider>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 4 }}
                  onClick={handleRazorpayPayment}
                >
                  Pay Now ₹{calculateTotal()}
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSelection;


// import React, { useState, useEffect } from 'react';
// import {
//   ArrowLeft,
//   CreditCard,
//   Landmark,
//   Wallet,
//   IndianRupee,
//   ChevronRight,
//   ChevronDown,
// } from 'lucide-react';
// import { Button } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// const paymentMethods = [
//   { key: 'card', label: 'Debit / Credit Card', icon: CreditCard },
//   { key: 'netbanking', label: 'Net Banking', icon: Landmark },
//   { key: 'paypal', label: 'PayPal', icon: Wallet },
//   { key: 'upi', label: 'UPI', icon: IndianRupee },
// ];

// const PaymentSelection = ({ onBack, orderData }) => {
//   const [activeMethod, setActiveMethod] = useState('card');
//   const [isMobile, setIsMobile] = useState(false);
//   const navigate = useNavigate();
//   const cart = useSelector((state) => state.cart.cart);
//   const coupon = useSelector((state) => state.cart.coupon);
//   const discount = useSelector((state) => state.cart.discount);
//   const couponApplied = useSelector((state) => state.cart.couponApplied);

//   useEffect(() => {
//     setIsMobile(window.innerWidth <= 992);
//     const handleResize = () => setIsMobile(window.innerWidth <= 992);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const TAX_RATE = 0.18;

//   const calculateSubtotal = () =>
//     cart.reduce((total, item) => total + item.price * item.quantity, 0);
//   const calculateTax = () => Math.round(calculateSubtotal() * TAX_RATE);
//   const calculateShipping = () => orderData.deliveryFee || 0;
//   const calculateTotal = () =>
//     calculateSubtotal() + calculateShipping() + calculateTax() - discount;

//   const handleRazorpayPayment = async () => {
//     try {
//       const total = calculateTotal();

//       console.log("Total amount to pay (₹):", total);

//       const res = await fetch('http://localhost:5000/api/payment/create-order', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//        body: JSON.stringify({ amount: total}),
//       });

//       const data = await res.json();

//       const options = {
//         key: 'rzp_test_gAKATD4fmPxdNv', // ✅ Replace with your test/live Razorpay Key
//         amount: data.amount,
//         currency: 'INR',
//         name: 'LIT Store',
//         description: 'Order Payment',
//         order_id: data.id,
//         handler: function (response) {
//           alert('✅ Payment Successful!');
//           console.log('Payment Details:', response);
//           navigate('/order-confirmation');
//         },
//         prefill: {
//           name: orderData.address?.name || 'Customer',
//           email: orderData.address?.email || 'user@example.com',
//         },
//         theme: {
//           color: '#000000',
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error('❌ Razorpay Error:', error);
//     }
//   };

//   return (
//     <div className="step-content-container">
//       <div className="payment-header-compact">
//         <button className="action-btn" onClick={onBack}>
//           <ArrowLeft size={16} style={{ marginRight: 4 }} /> Back
//         </button>
//         <h6 className="payment-title-compact">Select Payment Method</h6>
//       </div>

//       <div className="payment-layout">
//         {isMobile ? (
//           <div className="payment-accordion">
//             {paymentMethods.map(({ key, label, icon: Icon }) => (
//               <div
//                 key={key}
//                 className={`payment-accordion-item${
//                   activeMethod === key ? ' active' : ''
//                 }`}
//               >
//                 <button
//                   className="payment-accordion-btn"
//                   onClick={() => setActiveMethod(activeMethod === key ? null : key)}
//                   aria-expanded={activeMethod === key}
//                 >
//                   <div className="method-btn-group">
//                     <Icon size={24} />
//                     <span>{label}</span>
//                   </div>
//                   <ChevronDown size={24} className="chevron" />
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="payment-methods-sidebar">
//             {paymentMethods.map(({ key, label, icon: Icon }) => (
//               <button
//                 key={key}
//                 className={`method-btn ${activeMethod === key ? 'active' : ''}`}
//                 onClick={() => setActiveMethod(key)}
//               >
//                 <div className="method-btn-group">
//                   <Icon size={20} />
//                   <span>{label}</span>
//                 </div>
//                 {activeMethod === key && <ChevronRight size={24} />}
//               </button>
//             ))}
//           </div>
//         )}

//         <div className="payment-content">
//           <Button
//             variant="contained"
//             color="primary"
//             sx={{ mt: 4 }}
//             onClick={handleRazorpayPayment}
//           >
//             Pay Now ₹{calculateTotal()}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentSelection;
