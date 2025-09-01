// C:\lit-integrated\frontend\src\pages\admin\EcomProductsView.jsx

import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './EcomProductsView.css';
import AddProductForm from '../../components/EcommerceAdmin/AddProductForm';
import DeleteConfirmationModal from '../../components/EcommerceAdmin/DeleteConfirmationModal'; 
import { getProducts, deleteProduct } from '../../components/EcommerceAdmin/productService';

const EcomProductsView = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [productLineFilter, setProductLineFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const navigate = useNavigate();

  // ===================================================================
  // --- THIS IS THE DEFINITIVE, ROBUST DATA FETCHING FUNCTION ---
  // ===================================================================
  const fetchAndSetProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(''); // Reset error state on each fetch attempt
      const products = await getProducts();
      setAllProducts(products);
      setFilteredProducts(products);
    } catch (err) {
      // This will now catch the network error and display it to the user
      console.error("Fetch Error:", err);
      setError('Failed to connect to the server. Please ensure the backend is running and check your network connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAndSetProducts(); }, [fetchAndSetProducts]);
  
  // The rest of the component logic is correct and does not need to change.
  useEffect(() => {
    let productsToFilter = [...allProducts];
    if (productLineFilter !== 'all') { productsToFilter = productsToFilter.filter(p => p.productLine === productLineFilter); }
    if (genderFilter !== 'all') { productsToFilter = productsToFilter.filter(p => p.gender === genderFilter); }
    if (searchQuery) { const lowercasedQuery = searchQuery.toLowerCase(); productsToFilter = productsToFilter.filter(p => ((p.name?.toLowerCase() ?? '').includes(lowercasedQuery) || (p.category?.toLowerCase() ?? '').includes(lowercasedQuery) || (p.material?.toLowerCase() ?? '').includes(lowercasedQuery) || (p.price?.toString() ?? '').includes(lowercasedQuery) || (p.colors ?? []).some(c => c.toLowerCase().includes(lowercasedQuery)) || (p.sizes ?? []).some(s => s.toLowerCase().includes(lowercasedQuery)))); }
    setFilteredProducts(productsToFilter);
  }, [searchQuery, productLineFilter, genderFilter, allProducts]);

  const handleDeleteClick = (e, product) => { e.stopPropagation(); setProductToDelete(product); setIsDeleteModalOpen(true); };
  const handleConfirmDelete = async () => { if (!productToDelete) return; try { await deleteProduct(productToDelete._id); setAllProducts(prev => prev.filter(p => p._id !== productToDelete._id)); } catch (err) { alert('Failed to delete product.'); } finally { setIsDeleteModalOpen(false); setProductToDelete(null); } };
  const handleProductAdded = (newProduct) => { setAllProducts(prev => [newProduct, ...prev]); };
  const handleEdit = (e, id) => { e.stopPropagation(); navigate(`edit/${id}`); };

  if (loading) return <p style={{color: 'white', padding: '2rem'}}>Loading Products...</p>;
  // This error message will now appear if the network connection fails
  if (error) return <p style={{color: '#f87171', padding: '2rem', fontSize: '1.2rem'}}>{error}</p>;

  return (
    <div className="products-container">
      {/* ... The rest of your JSX remains unchanged ... */}
    </div>
  );
};

export default EcomProductsView;