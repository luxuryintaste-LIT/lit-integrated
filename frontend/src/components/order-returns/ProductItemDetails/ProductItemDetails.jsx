import React from 'react';
import './ProductItemDetails.css';

// This component now only needs the 'item' prop.
const ProductItemDetails = ({ item }) => {
  return (
    <div className="product-item-details-container">
      {/* Product Image */}
      <img src={item.image} alt={item.name} className="item-image" />

      {/* Wrapper for all the centered text content */}
      <div className="item-info">
        <p className="item-brand">{item.brand}</p>
        <h3 className="item-name">{item.name}</h3>
        {/* The 'description' is a new field from the screenshot */}
        <p className="item-description">{item.description}</p>
        <p className="item-size">Size: {item.size}</p>
      </div>
    </div>
  );
};

export default ProductItemDetails;