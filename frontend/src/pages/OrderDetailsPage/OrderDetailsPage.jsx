import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../services/orderService';
import OrderDetailsHeader from '../../components/order-returns/OrderDetailsHeader/OrderDetailsHeader';
import ShippingInfo from '../../components/order-returns/ShippingInfo/ShippingInfo';
import DeliveryTimeline from '../../components/order-returns/DeliveryTimeline/DeliveryTimeline';
import ProductItemDetails from '../../components/order-returns/ProductItemDetails/ProductItemDetails';
import PricingSummary from '../../components/order-returns/PricingSummary/PricingSummary';
import './OrderDetailsPage.css';

const OrderDetailsPage = () => {
  const { orderId } = useParams(); // Get orderId from URL like '/orders/:orderId'
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        setLoading(true);
        const data = await getOrderById(orderId);
        setOrder(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <div className="page-status-container">Loading Order Details...</div>;
  }

  if (error) {
    return <div className="page-status-container error">{error}</div>;
  }

  if (!order) {
    return null; // Or a "not found" component
  }

  return (
    <div className="order-details-container">
      <OrderDetailsHeader order={order} />
      <div className="details-layout-grid">
        <div className="main-content-col">
          <div className="product-list-section">
            <h2>{order.items.length} Item(s)</h2>
            {order.items.map((item) => (
              <ProductItemDetails key={item.sku} item={item} orderStatus={order.status} />
            ))}
          </div>
        </div>
        <div className="sidebar-col">
          <ShippingInfo shipping={order.shippingInfo} />
          <PricingSummary pricing={order.pricing} />
          <DeliveryTimeline events={order.deliveryStatus} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;