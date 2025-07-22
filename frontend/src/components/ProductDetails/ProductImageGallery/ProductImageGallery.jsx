import React, { useState, useEffect, useRef } from 'react';
import './ProductImageGallery.css';
// ✅ Import the WishlistButton component
import WishlistButton from '../../common/WishlistButton/WishlistButton';

// ✅ The component now accepts the full 'product' object
const ProductImageGallery = ({ product, images, selectedColor }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [currentImageSet, setCurrentImageSet] = useState([]);
  
  const [isZooming, setIsZooming] = useState(false);
  const [origin, setOrigin] = useState('center center');

  const [touchStartX, setTouchStartX] = useState(null);
  const mainImageRef = useRef(null);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const colorGroup = images.find(group => group.color === selectedColor);
    setCurrentImageSet(colorGroup?.images || []);
    setActiveImageIndex(0);
  }, [selectedColor, images]);

  const goToNextImage = () => setActiveImageIndex(prev => (prev + 1) % currentImageSet.length);
  const goToPrevImage = () => setActiveImageIndex(prev => (prev - 1 + currentImageSet.length) % currentImageSet.length);

  const handleMouseMove = (e) => {
    if (!mainImageRef.current) return;
    const rect = mainImageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setOrigin(`${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`);
  };

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchMove = (e) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.touches[0].clientX;
    if (diff > 50) { goToNextImage(); setTouchStartX(null); }
    if (diff < -50) { goToPrevImage(); setTouchStartX(null); }
  };

  const zoomLevel = 2.5;
  const activeImageUrl = currentImageSet[activeImageIndex] || '';

  if (currentImageSet.length === 0) {
    return <div className="image-gallery-container"><div className="main-image-wrapper">No Image Available</div></div>;
  }

  return (
    <div className="image-gallery-container">
      <div className="thumbnail-list">
        {currentImageSet.map((imgUrl, index) => (
          <div
            key={index}
            className={`thumbnail-item ${activeImageIndex === index ? 'active' : ''}`}
            onClick={() => setActiveImageIndex(index)}
            onMouseOver={() => setActiveImageIndex(index)}
          >
            <img src={imgUrl} alt={`Thumbnail ${product.name} ${index + 1}`} />
          </div>
        ))}
      </div>
      <div 
        ref={mainImageRef}
        className="main-image-wrapper"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <img
          src={activeImageUrl}
          alt={`${product.name} - ${selectedColor}`}
          className="main-product-image"
          style={{
            transformOrigin: origin,
            transform: isZooming ? `scale(${zoomLevel})` : 'scale(1)',
          }}
        />
        
        {/* ✅ Add the WishlistButton inside a positioned container */}
        <div className="image-wishlist-btn">
          <WishlistButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductImageGallery;