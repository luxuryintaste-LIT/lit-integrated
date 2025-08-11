import React from 'react';
import './EcomProductCard.css';

const EcomProductCard = ({ product }) => {
  const productImage = product.images?.[0]?.images?.[0] || '';

  return (
    <div className="ecom-product-card">
      <img src={productImage} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p>Stock: {product.stock}</p>
      <p>${product.price}</p>
    </div>
  );
};

export default EcomProductCard;
