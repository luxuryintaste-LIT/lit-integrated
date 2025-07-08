import React, { useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
// import menWomenImage from '/src/assets/men.png'; // This will no longer be needed as products come from API
import '/src/styles/ProductList.css';
import { YoutubeSearchedFor } from '@mui/icons-material';

const ProductList = ({ products }) => {
  const sectionRef = useRef(null);

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

  // Remove hardcoded products array
  // const products = [
  //   ...
  // ];

  return (
    <section className="products-section" ref={sectionRef}>
      <div>
        <h2 className="section-title ">Fresh Arrivals</h2>
        <div className="product-list-container">
          <div className="product-grid">
            {Array.isArray(products) && products.map(product => (
              <ProductCard 
                key={product._id} // Use _id from MongoDB
                product={product}
              />
            ))} 
          </div> 
        </div>
      </div>
    </section>
  );
};

export default ProductList; 


