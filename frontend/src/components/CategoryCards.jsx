import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/CategoryCards.css';
import menImage from '/src/assets/men.png';
import womenImage from '/src/assets/women.png';

const CategoryCards = () => {
  const menTitleRef = useRef(null);
  const womenTitleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (menTitleRef.current) observer.observe(menTitleRef.current);
    if (womenTitleRef.current) observer.observe(womenTitleRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="category-container">
      {/* --- Men Section --- */}
      <div className="category-card-wrapper">
        <div className="category-card men">
          <img src={menImage} alt="Men's Collection" className="category-card-image" />
          <div className="card-content">
            <h2>Men's Collection</h2>
            <p>Discover the latest in men's luxury fashion</p>
          </div>
          <div className="category-options">
            <Link to="/products" state={{ gender: 'Men', category: null }} className="option">Shop All</Link>
            <Link to="/products" state={{ gender: 'Men', category: 'Clothing' }} className="option">Clothing</Link>
            <Link to="/products" state={{ gender: 'Men', category: 'Footwear' }} className="option">Shoes</Link>
            <Link to="/products" state={{ gender: 'Men', category: 'Bags' }} className="option">Bags</Link>
            <Link to="/products" state={{ gender: 'Men', category: 'Accessories' }} className="option">Accessories</Link>
          </div>
        </div>
        <div className="category-title fade-in" ref={menTitleRef}>Men's Fashion</div>
      </div>

      {/* --- Women Section --- */}
      <div className="category-card-wrapper">
        <div className="category-card women">
          <img src={womenImage} alt="Women's Collection" className="category-card-image" />
          <div className="card-content">
            <h2>Women's Collection</h2>
            <p>Explore exclusive women's luxury pieces</p>
          </div>
          <div className="category-options">
            <Link to="/products" state={{ gender: 'Women', category: null }} className="option">Shop All</Link>
            <Link to="/products" state={{ gender: 'Women', category: 'Clothing' }} className="option">Clothing</Link>
            <Link to="/products" state={{ gender: 'Women', category: 'Footwear' }} className="option">Shoes</Link>
            <Link to="/products" state={{ gender: 'Women', category: 'Bags' }} className="option">Bags</Link>
            <Link to="/products" state={{ gender: 'Women', category: 'Accessories' }} className="option">Accessories</Link>
          </div>
        </div>
        <div className="category-title fade-in" ref={womenTitleRef}>Women's Fashion</div>
      </div>
    </section>
  );
};

export default CategoryCards;
