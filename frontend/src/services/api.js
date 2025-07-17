// api.js
import axios from 'axios';

// ✅ Dynamically switch between local and production backend
const isLocalhost = window.location.hostname === 'localhost';

export const API_URL ='https://lit-backend-azajexa8e2a9g4az.canadacentral-01.azurewebsites.net/api';


// ✅ Get all products
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch products';
  }
};

export const getArticlesByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL}/articles/category/${category}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch articles by category';
  }
};


// ✅ Get featured products
export const getFeaturedProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products/featured`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch featured products';
  }
};

// ✅ Get single product by ID
export const getProduct = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch product';
  }
};

// ✅ Create a new product
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/products`, productData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Product creation failed';
  }
};

// ✅ Validate a coupon code
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

export const getArticles = async () => {
  try {
    const response = await axios.get(`${API_URL}/articles`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch articles';
  }
};

export const getArticleBySlug = async (slug) => {
  try {
    const response = await axios.get(`${API_URL}/articles/slug/${slug}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch article by slug';
  }
};

// ✅ Create or update user in DB
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, userData);
    return response.data;
  } catch (error) {
    console.error("❌ API error creating user:", error);
    throw error.response?.data?.message || 'User creation failed';
  }
};

