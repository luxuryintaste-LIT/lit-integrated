import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductList from '../components/Shop/ProductList';
import { getProducts } from '../services/api';
import '../styles/productListPage.css';

const ProductListPage = () => {
  const location = useLocation();
  const { gender, category: initialCategory } = location.state || {};

  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All Products');
  const categoryOptions = ['All Products', 'Accessories', 'Footwear', 'Clothing'];

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [openFilters, setOpenFilters] = useState({
    Brand: true, Price: true, Subcategory: true, Color: true, Size: true, Discount: true,
  });

  const [brandSearch, setBrandSearch] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);

  const [maxPrice, setMaxPrice] = useState(1000);
  const [priceFilter, setPriceFilter] = useState(1000);
  const [sliderProgress, setSliderProgress] = useState(100);

  const discountOptions = [10, 25, 35, 50, 60, 70];

  const toggleFilter = (name) =>
    setOpenFilters(prev => ({ ...prev, [name]: !prev[name] }));

  const toggleSelect = (value, setter, list) =>
    list.includes(value)
      ? setter(list.filter(item => item !== value))
      : setter([...list, value]);

  useEffect(() => {
    (async () => {
      const prods = await getProducts();

      const filtered = prods.filter(p =>
        (!gender || p.gender === gender) &&
        (selectedCategory === 'All Products' || p.category === selectedCategory)
      );

      setAllProducts(filtered);
      setFilteredProducts(filtered);

      const highest = Math.max(...filtered.map(p => p.price || 0), 0);
      setMaxPrice(highest);
      setPriceFilter(highest);
      setSliderProgress(100);
    })();
  }, [gender, selectedCategory]);

  useEffect(() => {
    let result = [...allProducts];

    if (selectedBrands.length)
      result = result.filter(p => selectedBrands.includes(p.brand));

    if (selectedSubcategories.length)
      result = result.filter(p => selectedSubcategories.includes(p.subcategory));

    if (selectedColors.length)
      result = result.filter(p => p.colors?.some(c => selectedColors.includes(c)));

    if (selectedSizes.length)
      result = result.filter(p => p.sizes?.some(s => selectedSizes.includes(s)));

    result = result.filter(p => p.price <= priceFilter);

    if (selectedDiscounts.length) {
      result = result.filter(p => {
        const original = p.originalPrice || p.mrp || p.strikePrice || 0;
        const discount = original && p.price
          ? Math.round(((original - p.price) / original) * 100)
          : 0;
        return selectedDiscounts.some(threshold => discount >= threshold);
      });
    }

    setFilteredProducts(result);
  }, [
    selectedBrands,
    selectedSubcategories,
    selectedColors,
    selectedSizes,
    selectedDiscounts,
    priceFilter,
    allProducts
  ]);

  useEffect(() => {
    if (!maxPrice) return;
    const percent = (priceFilter / maxPrice) * 100;
    setSliderProgress(percent.toFixed(2));
  }, [priceFilter, maxPrice]);

  const brands = [...new Set(allProducts.map(p => p.brand).filter(Boolean))];
  const subcats = [...new Set(allProducts.map(p => p.subcategory).filter(Boolean))];
  const colors = [...new Set(allProducts.flatMap(p => p.colors || []))];
  const sizes = [...new Set(allProducts.flatMap(p => p.sizes || []))];
  const filteredBrandList = brands.filter(b =>
    b.toLowerCase().includes(brandSearch.toLowerCase()));

  return (
    <div className="product-list-page">
      <aside className="advanced-filter-bar">
        <h2>Filters</h2>

        {/* Brand Filter */}
        <div className={`filter-group ${openFilters.Brand ? 'active' : ''}`}>
          <h4 onClick={() => toggleFilter('Brand')}>Brand <span className="accordion-icon" /></h4>
          <div className="filter-options">
            <input
              type="text"
              placeholder="Search brand"
              className="brand-search-input"
              value={brandSearch}
              onChange={e => setBrandSearch(e.target.value)}
            />
            {filteredBrandList.length ? (
              filteredBrandList.map(b => (
                <div className="custom-checkbox" key={b}>
                  <input
                    type="checkbox"
                    id={`brand-${b}`}
                    checked={selectedBrands.includes(b)}
                    onChange={() => toggleSelect(b, setSelectedBrands, selectedBrands)}
                  />
                  <label htmlFor={`brand-${b}`}>{b}</label>
                </div>
              ))
            ) : (
              <div className="no-results">No brands found</div>
            )}
          </div>
        </div>

        {/* Price Filter */}
        <div className={`filter-group ${openFilters.Price ? 'active' : ''}`}>
          <h4 onClick={() => toggleFilter('Price')}>Price <span className="accordion-icon" /></h4>
          <div className="filter-options price-slider-group">
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={priceFilter}
              style={{ '--slider-progress': `${sliderProgress}%` }}
              onChange={e => setPriceFilter(+e.target.value)}
            />
            <div className="price-range-display">Up to ₹{priceFilter}</div>
          </div>
        </div>

        {/* Subcategory */}
        <div className={`filter-group ${openFilters.Subcategory ? 'active' : ''}`}>
          <h4 onClick={() => toggleFilter('Subcategory')}>Subcategory <span className="accordion-icon" /></h4>
          <div className="filter-options">
            {subcats.map(sc => (
              <div className="custom-checkbox" key={sc}>
                <input
                  type="checkbox"
                  id={`subcategory-${sc}`}
                  checked={selectedSubcategories.includes(sc)}
                  onChange={() => toggleSelect(sc, setSelectedSubcategories, selectedSubcategories)}
                />
                <label htmlFor={`subcategory-${sc}`}>{sc}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Color */}
        <div className={`filter-group ${openFilters.Color ? 'active' : ''}`}>
          <h4 onClick={() => toggleFilter('Color')}>Color <span className="accordion-icon" /></h4>
          <div className="filter-options">
            {colors.map(c => (
              <div className="custom-checkbox" key={c}>
                <input
                  type="checkbox"
                  id={`color-${c}`}
                  checked={selectedColors.includes(c)}
                  onChange={() => toggleSelect(c, setSelectedColors, selectedColors)}
                />
                <label htmlFor={`color-${c}`}>{c}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Size */}
        <div className={`filter-group ${openFilters.Size ? 'active' : ''}`}>
          <h4 onClick={() => toggleFilter('Size')}>Size <span className="accordion-icon" /></h4>
          <div className="filter-options">
            {sizes.map(s => (
              <div className="custom-checkbox" key={s}>
                <input
                  type="checkbox"
                  id={`size-${s}`}
                  checked={selectedSizes.includes(s)}
                  onChange={() => toggleSelect(s, setSelectedSizes, selectedSizes)}
                />
                <label htmlFor={`size-${s}`}>{s}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Discount */}
        <div className={`filter-group ${openFilters.Discount ? 'active' : ''}`}>
          <h4 onClick={() => toggleFilter('Discount')}>Discount <span className="accordion-icon" /></h4>
          <div className="filter-options">
            {discountOptions.map(percent => (
              <div className="custom-checkbox" key={percent}>
                <input
                  type="checkbox"
                  id={`discount-${percent}`}
                  checked={selectedDiscounts.includes(percent)}
                  onChange={() => toggleSelect(percent, setSelectedDiscounts, selectedDiscounts)}
                />
                <label htmlFor={`discount-${percent}`}>{percent}% Off or more</label>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main className="product-list-main">
        <div className="product-result-header">
          <div className="product-result-count">{filteredProducts.length} results</div>
          <div className="category-dropdown">
               <div className="custom-select-wrapper">
   
  </div>
</div>
 
        </div>
        <ProductList products={filteredProducts} />
      </main>
    </div>
  );
};

export default ProductListPage;