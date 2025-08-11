// C:\lit-integrated\frontend\src\components\EcommerceAdmin\productService.js

const STORAGE_KEY = 'ecom_admin_products';

const initialMockProducts = [
    { _id: '1', name: 'Cyber-Punk Void Jacket', category: 'Apparel', productLine: 'Luxury Fashion', gender: 'Unisex', price: 120, stock: 50, material: 'Synth-Leather', description: 'A sleek, water-resistant jacket...', colors: ['Black', 'Purple'], sizes: ['M', 'L', 'XL'], features: ['Water-Resistant'], images: [{ images: ['https://picsum.photos/100?random=10'] }] },
    { _id: '2', name: 'Holo-Lens 2049', category: 'Accessories', productLine: 'Fast Fashion', gender: 'Men', price: 250, stock: 30, material: 'Titanium', description: 'Augmented reality glasses...', colors: ['Gray', 'Silver'], sizes: ['One Size'], features: ['AR Display'], images: [{ images: ['https://picsum.photos/100?random=11'] }] },
    { _id: '3', name: 'Gaia-Friendly Tee', category: 'Clothing', productLine: 'Sustainable Fashion', gender: 'Unisex', price: 75, stock: 150, material: 'Organic Cotton', description: 'A comfortable and stylish tee...', colors: ['White', 'Green'], sizes: ['S', 'M', 'L'], features: ['Organic'], images: [{ images: ['https://picsum.photos/100?random=12'] }] },
];

// This function runs once to set up the initial data in the browser's storage
const initializeData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMockProducts));
  }
};

initializeData();

export const getProducts = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const products = JSON.parse(localStorage.getItem(STORAGE_KEY));
  return products;
};

export const getProductById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const products = await getProducts();
  return products.find(p => p._id === id);
};

export const createProduct = async (formData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const products = await getProducts();
  
  // This is the new, correct image handling logic
  let imageUrl = `https://picsum.photos/100?random=${new Date().getTime()}`; // Default placeholder
  const firstColor = formData.colors[0];
  if (firstColor && formData.colorImages[firstColor] && formData.colorImages[firstColor][0]) {
    const imageFile = formData.colorImages[firstColor][0];
    imageUrl = URL.createObjectURL(imageFile); // Create stable blob URL
  }

  const newProduct = {
    _id: `prod_${new Date().getTime()}`,
    name: formData.productName,
    category: formData.category,
    productLine: formData.productLine,
    gender: formData.gender,
    price: formData.originalPrice,
    stock: formData.stock,
    material: formData.material,
    description: formData.description,
    colors: formData.colors,
    sizes: formData.sizes,
    features: formData.features,
    discountPercentage: formData.discountPercentage,
    modelSize: formData.modelSize,
    couponCode: formData.couponCode,
    images: [{ images: [imageUrl] }]
  };

  const newProductList = [newProduct, ...products];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newProductList));
  return newProduct;
};

export const updateProduct = async (id, formData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  let products = await getProducts();
  const productIndex = products.findIndex(p => p._id === id);
  if (productIndex === -1) throw new Error("Product not found");

  const updatedProduct = {
    ...products[productIndex],
    name: formData.productName,
    category: formData.category,
    productLine: formData.productLine,
    gender: formData.gender,
    price: formData.originalPrice,
    stock: formData.stock,
    material: formData.material,
    description: formData.description,
    colors: formData.colors,
    sizes: formData.sizes,
    features: formData.features,
    discountPercentage: formData.discountPercentage,
    modelSize: formData.modelSize,
    couponCode: formData.couponCode,
  };

  products[productIndex] = updatedProduct;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  return updatedProduct;
};

export const deleteProduct = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  let products = await getProducts();
  const newProductList = products.filter(p => p._id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newProductList));
  return { success: true };
};