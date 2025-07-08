import axios from 'axios';

// ✅ Dynamically switch between local and production backend
const isLocalhost = window.location.hostname === 'localhost';

export const API_URL = isLocalhost
  ? 'http://localhost:5000/api'
  : 'https://calm-tree-05462bf10.1.azurestaticapps.net/api';

// ==================== Product APIs ====================
export const getProducts = async () => {
const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const getFeaturedProducts = async () => {
  const response = await axios.get(`${API_URL}/products/featured`);
  return response.data;
};

export const getProduct = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axios.post(`${API_URL}/products`, productData);
  return response.data;
};

export const validateCouponCode = async (code) => {
  const response = await axios.post(`${API_URL}/coupons/validate`, { code });
  return response.data;
};

// ==================== Newsletter APIs ====================
export const getArticles = async () => {
  const response = await axios.get(`${API_URL}/articles`);
  return response.data;
};

