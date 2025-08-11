import React, { useState, useEffect } from "react";
import "./TopProducts.css";

const TopProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Dummy data with guaranteed visible images
    setProducts([
      { id: 1, name: "Graphic T-shirt", sales: 320, image: "https://picsum.photos/100?random=1" },
      { id: 2, name: "Leather Handbag", sales: 275, image: "https://picsum.photos/100?random=2" },
      { id: 3, name: "Sporty Smartwatch", sales: 150, image: "https://picsum.photos/100?random=3" },
    ]);
  }, []);

  return (
    <div className="top-products card-glass">
      <h3 className="top-products-title">Top Selling Products</h3>
      <div className="products-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image} alt={p.name} className="product-image" />
            <p className="product-name">{p.name}</p>
            <p className="product-sales">{p.sales} sold</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
