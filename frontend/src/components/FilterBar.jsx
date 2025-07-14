import React, { useEffect, useRef } from 'react';
import '../styles/FilterBar.css';

const FilterBar = ({ onCategorySelect, onSortChange }) => {
  const filterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          filterRef.current.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (filterRef.current) {
      observer.observe(filterRef.current);
    }

    return () => {
      if (filterRef.current) {
        observer.unobserve(filterRef.current);
      }
    };
  }, []);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'Clothing', name: 'Clothing' },
    { id: 'Accessories', name: 'Accessories' },
    { id: 'Footwear', name: 'Footwear' },
    { id: 'Electronics', name: 'Electronics' },
    { id: 'Storage', name: 'Storage' },
    { id: 'Fragrances', name: 'Fragrances' },
  ];

const sortOptions = [
  { id: 'featured', name: 'Featured' },
  { id: 'newest', name: 'Newest First' },
  { id: 'price-low', name: 'Price: Low to High' },
  { id: 'price-high', name: 'Price: High to Low' },
  { id: 'discount-high', name: 'Biggest Discounts' }, // ✅ New Option
];

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    onCategorySelect(selected === 'all' ? null : selected);
  };

  const handleSortChange = (e) => {
    const selected = e.target.value;
    if (onSortChange) onSortChange(selected);
  };

  return (
    <div className="filter-bar" ref={filterRef}>
      <div className="filter-container">
        <div className="select-wrapper">
          <select className="filter-select" onChange={handleCategoryChange} defaultValue="">
            <option value="" disabled>Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="select-wrapper">
          <select className="filter-select" onChange={handleSortChange} defaultValue="featured">
            {sortOptions.map(option => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;