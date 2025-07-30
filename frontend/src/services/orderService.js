  import { mockOrders } from '../mocks/mockOrders';
  import { productDatabase } from '../mocks/mockProducts';

  // --- HELPER FUNCTION: This "joins" your data, just like a backend would ---
  const hydrateOrderItems = (items) => {
    return items.map(item => {
      const productDetails = productDatabase[item.sku] || {}; // Find product details by SKU
      return {
        ...item,          // Contains sku, quantity, priceAtPurchase
        ...productDetails,  // Adds name, image, brand, variant
      };
    });
  };


  /**
   * Fetches all orders and enriches them with full product details.
   * In a real app, this would be an async call to your backend API.
   * @returns {Promise<Array>} A promise that resolves with the list of hydrated orders.
   */
  export const getOrders = () => {
    return new Promise((resolve) => {
      // Simulate a network delay of 500ms
      setTimeout(() => {
        const hydratedOrders = mockOrders.map(order => ({
          ...order,
          items: hydrateOrderItems(order.items),
        }));
        resolve(hydratedOrders);
      }, 500);
    });
  };

  /**
   * Fetches a single order by its ID and enriches it with full product details.
   * @param {string} orderId The ID of the order to fetch.
   * @returns {Promise<Object>} A promise that resolves with the single hydrated order.
   */
  export const getOrderById = (orderId) => {
    return new Promise((resolve, reject) => {
      // Simulate a network delay
      setTimeout(() => {
        const order = mockOrders.find(o => o.id === orderId);

        if (order) {
          const hydratedOrder = {
            ...order,
            items: hydrateOrderItems(order.items),
          };
          resolve(hydratedOrder);
        } else {
          reject(new Error('Order not found.'));
        }
      }, 500);
    });
  };