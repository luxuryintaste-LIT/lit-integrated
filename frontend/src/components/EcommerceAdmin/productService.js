// C:\lit-integrated\frontend\src\components\EcommerceAdmin\productService.js

// This URL points to your real backend server, as defined in your .env file
const API_URL = 'http://localhost:5000/api/products';

/**
 * Fetches all products from the backend server.
 */
export const getProducts = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

/**
 * Fetches a single product by its ID from the backend server.
 */
export const getProductById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return await response.json();
};

/**
 * Creates a new product by sending data and images to the backend server.
 */
export const createProduct = async (productData) => {
  const formData = new FormData();

  // Append all simple text/number fields
  Object.keys(productData).forEach(key => {
    if (key !== 'colorImages') {
      const value = productData[key];
      if (Array.isArray(value)) {
        value.forEach(item => formData.append(`${key}[]`, item));
      } else {
        formData.append(key, value);
      }
    }
  });

  // Append all image files for the backend to process
  for (const color in productData.colorImages) {
    productData.colorImages[color].forEach(file => {
      formData.append(`images-${color}`, file);
    });
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    body: formData,
    // NOTE: Do NOT set Content-Type header when using FormData with fetch.
    // The browser sets it automatically with the correct boundary.
  });

  if (!response.ok) {
    throw new Error('Failed to create product on the server.');
  }
  return await response.json();
};

/**
 * Updates an existing product on the backend server.
 */
export const updateProduct = async (id, productData) => {
  // For updates, we send JSON. Image updates would require FormData and a different backend logic.
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error('Failed to update product.');
  }
  return await response.json();
};

/**
 * Deletes a product from the backend server.
 */
export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete product.');
  }
  return await response.json();
};