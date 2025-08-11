import React, { useState, useEffect,useMemo } from 'react';
import { getOrders } from '../../services/orderService';
import OrderControls from '../../components/order-returns/OrderControls/OrderControls';
import OrderCard from '../../components/order-returns/OrderCard/OrderCard';
import './OrdersPage.css'; // We'll create a new CSS file for the page
const OrdersPage = () => {
  // --- STEP 1: ENHANCE STATE MANAGEMENT ---
  const [allOrders, setAllOrders] = useState([]); // Master list of all orders
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to hold the current filter settings
  const [filters, setFilters] = useState({
    status: 'All',
    searchTerm: '',
    timeRange: 'all', // Default to all time
  });

  // --- Initial Data Fetch ---
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getOrders();
        setAllOrders(data);
      } catch (err) {
        setError('Failed to load orders. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // --- STEP 2: FILTERING LOGIC ---
  // useMemo will re-run this logic only when allOrders or filters change.
  const filteredOrders = useMemo(() => {
    let processedOrders = [...allOrders];

    // Filter by Status
    if (filters.status !== 'All') {
      processedOrders = processedOrders.filter(order => order.status === filters.status);
    }

    // Filter by Search Term
    if (filters.searchTerm) {
      const lowercasedTerm = filters.searchTerm.toLowerCase();
      processedOrders = processedOrders.filter(order =>
        order.id.toLowerCase().includes(lowercasedTerm) ||
        order.items.some(item =>
          item.name.toLowerCase().includes(lowercasedTerm) ||
          item.brand.toLowerCase().includes(lowercasedTerm)
        )
      );
    }

    // Filter by Time Range
    if (filters.timeRange !== 'all') {
      const today = new Date();
      const cutoffDate = new Date();
      cutoffDate.setDate(today.getDate() - parseInt(filters.timeRange, 10));

      processedOrders = processedOrders.filter(order => {
        const orderDate = new Date(order.orderTimestamp);
        return orderDate >= cutoffDate;
      });
    }

    return processedOrders;
  }, [allOrders, filters]);


  // --- STEP 3: FUNCTION TO HANDLE FILTER CHANGES ---
  // This function will be passed down to OrderControls
  const handleFilterChange = (newFilter) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilter,
    }));
  };

  if (loading) {
    return <div className="page-status-container">Loading your orders...</div>;
  }

  if (error) {
    return <div className="page-status-container error">{error}</div>;
  }

  return (
    <div className="orders-page-container">
      <div className="orders-header">
        <h1>My Orders & Returns</h1>
        <p>View, track, and manage your past and current orders.</p>
      </div>
      
      {/* Pass the handler and current filters down to the controls */}
      <OrderControls filters={filters} onFilterChange={handleFilterChange} />

      <div className="order-list">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => <OrderCard key={order.id} order={order} />)
        ) : (
          <p className="no-orders-message">No orders match your current filters.</p>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;