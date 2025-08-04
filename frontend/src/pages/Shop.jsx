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
import FeaturedBrands from '../components/Shop/FeatureBrands/FeatureBrands';
import FeaturedProducts from '../components/Shop/FeaturedProducts/FeaturedProducts';
import ViewedProducts from '../components/Shop/ViewedProducts/ViewedProducts';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
<<<<<<< HEAD
  const [isSearching, setIsSearching] = useState(false); // ✅ new state
=======
  const navigate = useNavigate(); // 👈 2. INITIALIZE useNavigate
>>>>>>> c66c7eb9db07783cd6db383d6289ff0021a02d1d

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

<<<<<<< HEAD
  const handleSearch = (matchedProducts) => {
    setFilteredProducts(matchedProducts);
    setIsSearching(matchedProducts.length > 0); // ✅ flag searching state
=======
  // 👇 3. THIS IS THE ONLY FUNCTION THAT CHANGES.
  // Instead of filtering, it navigates to the ProductListPage with a search query.
  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/productlistpage?search=${encodeURIComponent(query.trim())}`);
    }
>>>>>>> c66c7eb9db07783cd6db383d6289ff0021a02d1d
  };

  return (
    <div className="shop-page">
      <Navbar />
      {/* This SearchBar now triggers navigation. */}
      <SearchBar onSearch={handleSearch} />
      
      {isSearching ? (
        // ✅ Show search results only
        <ProductList products={filteredProducts} isSearch={true}/>
      ) : (
<<<<<<< HEAD
        // ✅ Default view when not searching
        <>
          <CategoryCards />
          <FilterBar />
          {loading ? (
            <h2>Loading Products...</h2>
          ) : error ? (
            <h2>{error}</h2>
          ) : (
            <ProductList products={products} />
          )}
          <FeaturedBrands />
          <FeaturedProducts />
        </>
=======
        // This ProductList will now always show the full list of products.
        // The filtering state that was here before is no longer needed for search.
        <ProductList products={products} />
>>>>>>> c66c7eb9db07783cd6db383d6289ff0021a02d1d
      )}

      {/* ✅ Footer should always show */}
      <ViewedProducts />
    </div>
  );
};


export default Shop;