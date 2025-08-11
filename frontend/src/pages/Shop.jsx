import React, { useState, useEffect } from 'react';
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
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false); // ✅ new state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : []);
        setFilteredProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = (matchedProducts) => {
    setFilteredProducts(matchedProducts);
    setIsSearching(matchedProducts.length > 0); // ✅ flag searching state
  };

  return (
    <div className="shop-page">
      <Navbar />
      <SearchBar onSearch={handleSearch} />
      
      {isSearching ? (
        // ✅ Show search results only
        <ProductList products={filteredProducts} isSearch={true}/>
      ) : (
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
      )}

      {/* ✅ Footer should always show */}
      <ViewedProducts />
    </div>
  );
};


export default Shop;