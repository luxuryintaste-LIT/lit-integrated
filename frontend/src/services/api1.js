import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFeaturedProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products/featured`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProduct = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/products`, productData, {
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Product creation failed';
  }
};

export const validateCouponCode = async (code) => {
  try {
    const response = await axios.post(`${API_URL}/coupons/validate`, { code });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Coupon validation failed';
  }
};


#mine 
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Get all products
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get featured products
export const getFeaturedProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products/featured`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get single product by ID
export const getProduct = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new product
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/products`, productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Validate a coupon code
export const validateCouponCode = async (code) => {
  try {
    const response = await axios.post(`${API_URL}/coupons/validate`, { code });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Coupon validation failed';
  }
};

// ✅ Subscribe to newsletter
export const subscribeToNewsletter = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/newsletter/subscribe`, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Subscription failed';
  }
};
