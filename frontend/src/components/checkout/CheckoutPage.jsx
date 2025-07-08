
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import OrderSummary from './OrderSummary';
import AddressSelection from './AddressSelection';
import PaymentSelection from './PaymentSelection'; // We'll create this next
import './checkout.css'; // Main stylesheet

const CheckoutPage = () => {
  const [step, setStep] = useState(2); // Start at step 2 (Address)
  const cart = useSelector((state) => state.cart.cart);
  
  const [orderData, setOrderData] = useState({
    platformFee: 0,
    deliveryFee: 0,
  });

  const handleNextStep = () => {
    setStep(prevStep => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep(prevStep => prevStep - 1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 2: // Address Selection
        return <AddressSelection onNext={handleNextStep} />;
      case 3: // Payment
        // You would create and import a PaymentSelection component here
        // For now, let's add a placeholder
        return <PaymentSelection onBack={handlePrevStep} />; 
      case 4: // Order Review
        // You would create and import an OrderReview component here
        return <div>Order Review Content</div>;
      default:
        return <AddressSelection onNext={handleNextStep} />;
    }
  };

  return (
    <div className="checkout-page-background">
      <div className="checkout-container">
        {/* Left Column: Dynamic Content */}
        <div className="checkout-main-content">
            {/* You can add a stepper component here if needed */}
            {renderStepContent()}
        </div>
        
        {/* Right Column: Static Order Summary */}
        <div className="checkout-sidebar">
          <OrderSummary orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;