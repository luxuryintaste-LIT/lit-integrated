import React, { useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom'; // ✅ for navigation
import '/src/styles/ProductList.css';
=======
import '/src/styles/ProductList.css';
// import { YoutubeSearchedFor } from '@mui/icons-material';
>>>>>>> c66c7eb9db07783cd6db383d6289ff0021a02d1d

const ProductList = ({ products, isSearch }) => {
  const sectionRef = useRef(null);
  const navigate = useNavigate(); // ✅ hook to navigate to Fresh Arrivals
  const [showLimited, setShowLimited] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // ✅ Slice the product list to first 6 if showLimited is true
  const displayedProducts = showLimited ? products.slice(0, 6) : products;

  const handleSeeMore = () => {
    navigate('/fresh-arrivals'); // ✅ You must define this route
  };

  return (
    <section className="products-section" ref={sectionRef}>
      <div>
<<<<<<< HEAD
        {!isSearch && <h2 className="section-title">Fresh Arrivals</h2>}
=======
        <h2 className="section-title ">Fresh Arrivals</h2>
>>>>>>> c66c7eb9db07783cd6db383d6289ff0021a02d1d
        <div className="product-list-container">
          <div className="product-grid">
            {Array.isArray(displayedProducts) &&
              displayedProducts.map(product => (
                <ProductCard
  key={product._id || product?.document?._id}
  product={product.document || product}
/>

              ))}
          </div>
        </div>

        {/* ✅ Show See More button only if products.length > 6 */}
        {products.length > 6 && showLimited && (
          <div className="see-more-container">
            <button className="see-more-btn" onClick={handleSeeMore}>
              See More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;
