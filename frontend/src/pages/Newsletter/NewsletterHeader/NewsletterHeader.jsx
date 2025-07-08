import React, { useState, useEffect } from 'react';
import './NewsletterHeader.css';

// Import all three images
import defaultImage from '../../../assets/internationalimage.jpg';
import domesticImage from '../../../assets/domestic-image.jpeg';
import internationalImage from '../../../assets/internationalimage.png';

const NewsletterHeader = ({ activeFilter, onFilterChange, isFlipping }) => {
  const [headerImage, setHeaderImage] = useState(defaultImage);
  const [headerTitle, setHeaderTitle] = useState('NEWSLETTER');

  useEffect(() => {
    switch (activeFilter) {
      case 'domestic':
        setHeaderImage(domesticImage);
        setHeaderTitle('DOMESTIC');
        break;
      case 'international':
        setHeaderImage(internationalImage);
        setHeaderTitle('INTERNATIONAL');
        break;
      default: // 'default' state on initial load
        setHeaderImage(defaultImage);
        setHeaderTitle('NEWSLETTER');
        break;
    }
  }, [activeFilter]);

  return (
    <section 
      className="hero-container" 
      style={{ backgroundImage: `url(${headerImage})` }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content" style={{ justifyContent: 'flex-start', paddingTop: '3rem' }}>
        <h1 className="hero-title">
          {headerTitle === 'NEWSLETTER' ? headerTitle : <><span>{headerTitle}</span><br /><span>NEWSLETTER</span></>}
        </h1>
        <div className="hero-button-group">
          {/* Buttons are now only two, in the specified order */}
          <button 
            className={`hero-button ${activeFilter === 'domestic' ? 'active' : ''}`}
            onClick={() => onFilterChange('domestic')}
            disabled={isFlipping}
          >
            Domestic
          </button>
          <button 
            className={`hero-button ${activeFilter === 'international' ? 'active' : ''}`}
            onClick={() => onFilterChange('international')}
            disabled={isFlipping}
          >
            International
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterHeader;