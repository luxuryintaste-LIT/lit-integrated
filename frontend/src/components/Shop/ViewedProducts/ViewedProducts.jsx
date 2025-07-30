import React, { useRef, useState } from 'react';
import './viewedProducts.css';

const initialProducts = [
  {
    id: 1,
    name: 'ALAÏA',
    description: 'Le Papa leather shoulder bag',
    oldPrice: 2264,
    price: 1359,
    discount: '40%',
    image: 'https://www.theoutnet.com/variants/images/46376663162939930/E/w520_q80.jpg',
  },
  {
    id: 2,
    name: 'Y-3',
    description: 'Floral-print canvas tote',
    oldPrice: 252,
    price: 126,
    discount: '50%',
    image: 'https://www.theoutnet.com/variants/images/46376663162931947/R/w520_q80.jpg',
  },
  {
    id: 3,
    name: 'CHRISTIAN LOUBOUTIN',
    description: 'Varsijunior leather-trimmed cotton-gabardine sneakers',
    oldPrice: 742,
    price: 371,
    discount: '50%',
    image: 'https://www.theoutnet.com/variants/images/1647597289021347/Q/w520_q80.jpg',
  },
];

const ViewedProducts = () => {
  const carouselRef = useRef(null);
  const [productList, setProductList] = useState(initialProducts);

  const scroll = (direction) => {
    const amount = 250;
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  const handleRemove = (id) => {
    setProductList(prevList => prevList.filter(product => product.id !== id));
  };

  return (
    <div className="vp-section">
      <h2 className="vp-title">Recently Viewed Products</h2>
      <div className="vp-carousel-wrapper">
        <button className="vp-arrow left" onClick={() => scroll('left')}>&#10094;</button>
        <div className="vp-carousel" ref={carouselRef}>
          {productList.map((product) => (
            <div key={product.id} className="vp-card">
              <div className="vp-img-wrapper">
                <img src={product.image} alt={product.name} className="vp-img" />
                <button
                  className="vp-remove-btn"
                  title="Remove"
                  onClick={() => handleRemove(product.id)}
                >
                  ×
                </button>
              </div>
              <h4 className="vp-brand">{product.name}</h4>
              <p className="vp-desc">{product.description}</p>
              <p className="vp-price">${product.price.toLocaleString()}</p>
              <p className="vp-rrp">
                RRP: <span className="vp-old-price">${product.oldPrice.toLocaleString()}</span>
                <span className="vp-discount"> (-{product.discount})</span>
              </p>
            </div>
          ))}
        </div>
        <button className="vp-arrow right" onClick={() => scroll('right')}>&#10095;</button>
      </div>
    </div>
  );
};

export default ViewedProducts;
