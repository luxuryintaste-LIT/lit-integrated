// Shop.jsx (Updated)

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 1. IMPORT useNavigate
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import CategoryCards from '../components/CategoryCards';
import FilterBar from '../components/FilterBar';
import ProductList from '../components/Shop/ProductList';
import { getProducts } from '../services/api';
import Navbar from '../components/Newsletter-components/Navbar/Navbar';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // 👈 2. INITIALIZE useNavigate

  // This useEffect that fetches products is perfect and remains unchanged.
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 👇 3. THIS IS THE ONLY FUNCTION THAT CHANGES.
  // Instead of filtering, it navigates to the ProductListPage with a search query.
  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/productlistpage?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="shop-page">
      <Navbar />
      {/* This SearchBar now triggers navigation. */}
      <SearchBar onSearch={handleSearch} />
      <CategoryCards />
      <FilterBar />
      {loading ? (
        <h2>Loading Products...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        // This ProductList will now always show the full list of products.
        // The filtering state that was here before is no longer needed for search.
        <ProductList products={products} />
      )}
    </div>
  );
};

export default Shop;