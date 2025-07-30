// components/FeaturedBrands.jsx
import React from 'react';
import './featuredBrands.css';

const FeaturedBrands = () => {
  return (
    <div className="featured-brands">
      <div className="brand-card">
        <div className="brand-image-wrapper">
          <img
            src="https://www.theoutnet.com/cms/ycm/resource/blob/3229628/4005612033de81fedbab1b0402ca645f/wedding-shop-banner-2-image-data.jpg"
            alt="Maje"
            className="brand-image"
          />
          <div className="brand-overlay">
            <h2 className="brand-title">MAJE</h2>
            <p className="brand-offer">UP TO <strong>70%</strong> OFF</p>
          </div>
        </div>
        <div className="brand-text">
          <h4>JUST LANDED MAJE</h4>
          <p>Parisian cool styles at unreal prices? <em>Oui merci</em></p>
          <button className="shop-btn">SHOP NOW</button>
        </div>
      </div>

      <div className="brand-card">
        <div className="brand-image-wrapper">
          <img
            src="https://www.theoutnet.com/cms/ycm/resource/blob/1149230/8489cc2705229f5f41fa13664b285b39/designers-banner-1-intl-image-data.jpg"
            alt="Loulou Studios"
            className="brand-image"
          />
          <div className="brand-overlay">
            <h2 className="brand-title">LOULOU STUDIOS</h2>
            <p className="brand-offer">UP TO <strong>60%</strong> OFF</p>
          </div>
        </div>
        <div className="brand-text">
          <h4>NEW LOULOU STUDIOS</h4>
          <p>Razor-sharp tailoring, dream dresses and sure-fire staples that <strong>NEVER</strong> miss</p>
          <button className="shop-btn">SHOP NOW</button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBrands;
