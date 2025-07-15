import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OrderSummary from './OrderSummary';
import AddressSelection from './AddressSelection';
import PaymentSelection from './PaymentSelection';
import './checkout.css';

const CheckoutPage = () => {
  const [step, setStep] = useState(2); // Start at address selection

  const location = useLocation();
  const cartFromRedux = useSelector((state) => state.cart.cart);
  const itemsFromState = location.state?.items || [];

  // Determine whether it's a "Buy Now" or normal cart checkout
  const items = itemsFromState.length > 0 ? itemsFromState : cartFromRedux;

  const [orderData, setOrderData] = useState({
    platformFee: 0,
    deliveryFee: 0,
    address: null,
    items: items,
  });

  const handleNextStep = () => setStep(prev => prev + 1);
  const handlePrevStep = () => setStep(prev => prev - 1);

  const handleAddressSelect = (selectedAddress) => {
    setOrderData(prev => ({ ...prev, address: selectedAddress }));
    handleNextStep();
  };

  const renderStepContent = () => {
    switch (step) {
      case 2:
        return <AddressSelection onNext={handleAddressSelect} />;
      case 3:
        return <PaymentSelection orderData={orderData} onBack={handlePrevStep} />;
      case 4:
        return <div className="order-success">✅ Order placed successfully!</div>;
      default:
        return <AddressSelection onNext={handleAddressSelect} />;
    }
  };

  return (
    <div className="checkout-page-background">
      <div className="checkout-container">
        <div className="checkout-main-content">
          {renderStepContent()}
        </div>
        <div className="checkout-sidebar">
          <OrderSummary orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
