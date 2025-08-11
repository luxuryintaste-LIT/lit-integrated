import React from 'react';
import './featuredProducts.css';

const products = [
  {
    name: 'Athletic Shoe',
    description: 'Available in all stores',
    price: '$99.99',
    image: 'https://i.pinimg.com/736x/c3/9a/6a/c39a6adac9235b86ef4dada17fe13386.jpg',
  },
  {
    name: 'Nike Air Force',
    description: 'Available online only',
    price: '$59.99',
    image: 'https://i.pinimg.com/736x/9f/7b/90/9f7b90c456b4ac87ba3c5fabcd76da0b.jpg',
  },
  {
    name: 'Nike Athletic',
    description: 'Available online only',
    price: '$29.99',
    image: 'https://i.pinimg.com/1200x/bb/5e/97/bb5e9719853c297b8e66ac8e0ebfbee5.jpg',
  },
  {
    name: 'New Kicks',
    description: 'Available in select stores',
    price: '$79.99',
    image: 'https://i.pinimg.com/1200x/f9/3f/19/f93f19dd65c32a73fb0560fd85cf7054.jpg',
  },
];

const FeaturedProducts = () => {
  return (
    <section className="featured-products">
      <div className="fp-header">
        <div>
          <h2>Featured Products</h2>
          <p>Browse our latest featured products</p>
        </div>
        <button className="explore-btn">Explore all →</button>
      </div>
      <div className="fp-grid">
        {products.map((product, index) => (
          <div className="fp-card" key={index}>
            <div className="fp-img-wrapper">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="fp-info">
              <h4>{product.name}</h4>
              <p className="fp-desc">{product.description}</p>
              <p className="fp-price">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
