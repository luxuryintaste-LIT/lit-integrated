// C:\lit-integrated\frontend\src\components\EcommerceAdmin\ProductDetailPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // We no longer need useNavigate here
import './ProductDetailPage.css';

const mockProductData = [
    { _id: '1', name: 'Cyber-Punk Void Jacket', category: 'Apparel', productLine: 'Luxury Fashion', gender: 'Unisex', price: 120, stock: 50, material: 'Synth-Leather', description: 'A sleek, water-resistant jacket with neon accents, perfect for the urban explorer.', colors: ['Black', 'Purple'], sizes: ['M', 'L', 'XL'], features: ['Water-Resistant', 'LED Accents'], images: { Black: [{url: 'https://picsum.photos/id/101/600/600'}], Purple: [{url: 'https://picsum.photos/id/102/600/600'}]} },
    { _id: '2', name: 'Holo-Lens 2049', category: 'Accessories', productLine: 'Fast Fashion', gender: 'Men', price: 250, stock: 30, material: 'Titanium', description: 'Augmented reality glasses with a lightweight frame and a 4K display.', colors: ['Gray'], sizes: ['One Size'], features: ['AR Display', 'Voice Control'], images: { Gray: [{url: 'https://picsum.photos/id/122/600/600'}]} },
    { _id: '3', name: 'Gaia-Friendly Tee', category: 'Clothing', productLine: 'Sustainable Fashion', gender: 'Unisex', price: 75, stock: 150, material: 'Organic Cotton', description: 'A comfortable and stylish tee made from 100% organic, ethically sourced cotton.', colors: ['White', 'Green'], sizes: ['S', 'M', 'L'], features: ['Organic', 'Breathable'], images: { White: [{url: 'https://picsum.photos/id/145/600/600'}]} },
    { _id: '4', name: 'Air Jordan Retro "Nebula"', category: 'Footwear', productLine: 'Sneaker World', gender: 'Men', price: 350, stock: 25, material: 'Leather & Mesh', description: 'Iconic sneakers with a custom nebula colorway and superior cushioning.', colors: ['Galaxy'], sizes: ['9', '10', '11'], features: ['Air Cushioning', 'High-Top'], images: { Galaxy: [{url: 'https://picsum.photos/id/211/600/600'}]} },
    { _id: '5', name: 'Diamond-Weave Scarf', category: 'Jewellery', productLine: 'Luxury Fashion', gender: 'Women', price: 450, stock: 15, material: 'Silk & Crystal', description: 'An elegant scarf woven with fine silk and embellished with sparkling crystals.', colors: ['Silver'], sizes: ['One Size'], features: ['Hand-Woven', 'Crystal Embellished'], images: { Silver: [{url: 'https://picsum.photos/id/234/600/600'}]} },
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = mockProductData.find(p => p._id === id);
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return <div style={{color: 'white', padding: '2rem'}}>Loading Product...</div>;
  }

  const mainImage = product.images?.[product.colors[0]]?.[0]?.url;

  // The component now ONLY returns the product card itself.
  // It lives inside the parent's padded content area.
  return (
    <div className="product-detail-card">
      <div className="detail-image-section">
        <img src={mainImage} alt={product.name} className="main-product-image" />
      </div>
      <div className="detail-content-section">
        <p className="product-line-tag">{product.productLine}</p>
        <h1>{product.name}</h1>
        <p className="product-description">{product.description}</p>
        <div className="price-stock-section">
          <span className="price">₹{product.price}</span>
          <span className="stock">{product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}</span>
        </div>
        <div className="details-grid">
          <div className="detail-item"><span className="label">Category</span><span className="value">{product.category}</span></div>
          <div className="detail-item"><span className="label">Gender</span><span className="value">{product.gender}</span></div>
          <div className="detail-item"><span className="label">Material</span><span className="value">{product.material}</span></div>
        </div>
        <div className="tags-section">
          <div className="tag-group">
            <h4 className="tag-label">Colors Available</h4>
            <div className="tags">{product.colors.map(c => <span key={c} className="tag">{c}</span>)}</div>
          </div>
          <div className="tag-group">
            <h4 className="tag-label">Sizes</h4>
            <div className="tags">{product.sizes.map(s => <span key={s} className="tag">{s}</span>)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;