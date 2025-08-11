// C:\lit-integrated\frontend\src\pages\admin\EcomProductsView.jsx

import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './EcomProductsView.css';
import AddProductForm from '../../components/EcommerceAdmin/AddProductForm';
import { getProducts, deleteProduct } from '../../components/EcommerceAdmin/productService';

const EcomProductsView = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchAndSetProducts = useCallback(async () => {
    setLoading(true);
    const products = await getProducts();
    setAllProducts(products);
    setFilteredProducts(products);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAndSetProducts();
  }, [fetchAndSetProducts]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredProducts(allProducts);
      return;
    }
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = allProducts.filter(product => (
        (product.name?.toLowerCase() ?? '').includes(lowercasedQuery) ||
        (product.category?.toLowerCase() ?? '').includes(lowercasedQuery) ||
        (product.productLine?.toLowerCase() ?? '').includes(lowercasedQuery) ||
        (product.gender?.toLowerCase() ?? '').includes(lowercasedQuery) ||
        (product.material?.toLowerCase() ?? '').includes(lowercasedQuery) ||
        (product.price?.toString() ?? '').includes(lowercasedQuery) ||
        (product.colors ?? []).some(color => color.toLowerCase().includes(lowercasedQuery)) ||
        (product.sizes ?? []).some(size => size.toLowerCase().includes(lowercasedQuery))
    ));
    setFilteredProducts(filtered);
  }, [searchQuery, allProducts]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to permanently delete this product?')) {
      await deleteProduct(id);
      fetchAndSetProducts();
    }
  };
  
  const handleProductAdded = () => {
    fetchAndSetProducts();
  };

  const handleEdit = (e, id) => {
    e.stopPropagation();
    navigate(`edit/${id}`);
  };

  if (loading) return <p style={{color: 'white', padding: '2rem'}}>Loading Products...</p>;

  return (
    <div className="products-container">
      <AddProductForm 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onProductAdd={handleProductAdded} 
      />
      <div className="products-header">
        <div className="header-left">
          <h1 className="products-title">Manage Products</h1>
          <div className="search-bar-container">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input 
              type="text"
              placeholder="Search anything..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <button className="add-btn" onClick={() => setIsAddModalOpen(true)}>+ Add Product</button>
      </div>

      <div className="product-card-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-card" onClick={() => navigate(`${product._id}`)}>
              <div className="card-header">
                <img src={product.images?.[0]?.images?.[0]} alt={product.name} className="product-img" />
                <div className="card-title-section">
                  <h3>{product.name}</h3>
                  <p>{product.productLine || 'General'}</p>
                </div>
              </div>
              <div className="card-details">
                <div className="detail-item"><span className="label">Category</span><span className="value">{product.category}</span></div>
                <div className="detail-item"><span className="label">Gender</span><span className="value">{product.gender}</span></div>
                <div className="detail-item"><span className="label">Price</span><span className="value">₹{product.price}</span></div>
                <div className="detail-item"><span className="label">Stock</span><span className="value">{product.stock}</span></div>
              </div>
              <div className="card-actions">
                <button onClick={(e) => handleEdit(e, product._id)} className="edit-btn">Edit</button>
                <button onClick={(e) => handleDelete(e, product._id)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products-message">
            {searchQuery ? `No products found for "${searchQuery}".` : "No products available."}
          </p>
        )}
      </div>
    </div>
  );
};

export default EcomProductsView;