import React, { useState } from 'react';
import './Shop.css';
import shopSustainableImage from '../../assets/shop-section-girl.jpg';
import shopLuxuryImage from '../../assets/shop-section-man.jpg';
import { useNavigate } from 'react-router-dom';

const Shop = () => {
  const [showSustainableText, setShowSustainableText] = useState(false);
  const [showLuxuryText, setShowLuxuryText] = useState(false);

  const sustainableText = "Our sustainable e-commerce platform offers a curated selection of eco-friendly products, from fashion to everyday essentials. Discover brands committed to sustainability, reduce your carbon footprint, and shop with a purpose. Join us in making a positive impact.";
  const luxuryText = "Our luxury e-commerce platform offers a curated selection of the finest luxury products with exclusive discounts. From timeless pieces to everyday luxury, only on our platform.";
  const navigate = useNavigate();

  return (
    <section className="shop-container">
      <div className="shop-header">
        <h1>Shop Luxury & Sustainable Fashion</h1>
        <p>Explore New Sustainable Products, Brands, and Enjoy Exclusive Discounts on Luxury Goods, and Much More only on Our Platform.</p>
      </div>
      
      <div className="shop-cards">
    <div className="shop-card">
          <div className="card-text">
            <h2>SUSTAINABLE</h2>
            <div className="card-description">
              <div className={showSustainableText ? "full-text" : "truncated-text"}>
                {showSustainableText ? sustainableText : "Our sustainable e-commerce platform offers a curated selection of eco-friendly products from fashion to..."}
              </div>
              <button className="read-more-btn" onClick={() => setShowSustainableText(!showSustainableText)}>
                {showSustainableText ? 'Read Less ↑' : 'Read More ↓'}
              </button>
            </div>
            <button className="coming-soon-btn" onClick={() => navigate('/shop')}>Shop Now</button>
          </div>
          <div className="shop-card-image">
            <img src={shopSustainableImage} alt="Sustainable Fashion" id="shop-sustainable-image" />
          </div>
        </div>

        {/* LUXURY CARD - Modified */}
        <div className="shop-card">
          <div className="card-text">
            <h2>LUXURY</h2>
            <div className="card-description">
              <div className={showLuxuryText ? "full-text" : "truncated-text"}>
                {showLuxuryText ? luxuryText : "Our luxury e-commerce platform offers a curated selection of the finest luxury products..."}
              </div>
              <button className="read-more-btn" onClick={() => setShowLuxuryText(!showLuxuryText)}>
                {showLuxuryText ? 'Read Less ↑' : 'Read More ↓'}
              </button>
            </div>

    <button className="coming-soon-btn">Shop Now</button>
  </div>
  <div className="shop-card-image">
    <img src={shopLuxuryImage} alt="Luxury Fashion" id="shop-luxury-image" />
  </div>
</div>

      </div>
    </section>
  );
};

export default Shop;