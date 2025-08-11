import React, { useEffect, useState } from 'react';
import './EcomTopProducts.css';
import EcomProductCard from './EcomProductCard';

const EcomTopProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('/api/products/featured');
        if (!res.ok) throw new Error('Failed to fetch featured products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) return <div className="top-products-loading">Loading top products...</div>;
  if (error) return <div className="top-products-error">{error}</div>;

  return (
    <div className="top-products">
      <h2>Top Selling Products</h2>
      <div className="top-products-list">
        {products.map(product => (
          <EcomProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default EcomTopProducts;
