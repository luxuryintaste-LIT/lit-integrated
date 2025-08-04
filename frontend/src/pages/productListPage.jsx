<<<<<<< HEAD
// Updated ProductListPage with full filter bar including Gender, Category, Subcategory, Subtype, Price, Size, Color, Fabric, Designer
=======
// ProductListPage.jsx (Full Code with Additions - Nothing Removed)

>>>>>>> c66c7eb9db07783cd6db383d6289ff0021a02d1d
import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom'; // 👈 1. ADDED useSearchParams
import ProductList from '../components/Shop/ProductList';
import SearchBar from '../components/SearchBar'; // 👈 2. ADDED SearchBar import
import { getProducts } from '../services/api';
import '../styles/productListPage.css';

const categoryTree = {
  Women: {
    Clothing: {
      Dresses: [
        'Asymmetric Dresses', 'Bridal Dresses', 'Bridesmaid Dresses', 'Cocktail Dresses',
        'Embellished Dresses', 'Embroidered Dresses', 'Evening Dresses', 'Floral Dresses',
        'Gowns', 'Knee-Length Dresses', 'Knit Dresses', 'Lace Dresses', 'Little Black Dresses',
        'Maxi Dresses', 'Midi Dresses', 'Mini Dresses', 'Off The Shoulder Dresses',
        'Printed Dresses', 'Shirt Dresses', 'Sleeved Dresses', 'Slip Dresses', 'Summer Dresses',
        'Velvet Dresses', 'Wedding Guest Dresses', 'Work Dresses', 'Wrap Dresses'
      ],
      Jumpsuits: [],
      Knitwear: [],
      Tops: [],
      Skirts: [],
      Trousers: [],
    },
    Shoes: {},
    Bags: {},
    Accessories: {},
  },
  Men: {
    Clothing: {
      Shirts: [],
      TShirts: [],
      Trousers: [],
      Jackets: [],
      Knitwear: [],
    },
    Shoes: {},
    Bags: {},
    Accessories: {},
  },
};

const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const colors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Beige', 'Grey'];
const fabrics = ['Cotton', 'Silk', 'Linen', 'Wool', 'Denim'];
const designers = ['Gucci', 'Prada', 'Versace', 'Armani', 'Dior'];

const ProductListPage = () => {

  const [accordionState, setAccordionState] = useState({
  Gender: false,
  Category: false,
  Subcategory: false,
  Subtype: false,
  Price: false,
  Size: false,
  Color: false,
  Fabric: false,
  Designer: false,
});


const toggleAccordion = (key) => {
  setAccordionState((prev) => ({
    ...prev,
    [key]: !prev[key],
  }));
};
  const location = useLocation();
  const { gender = 'Women', category = 'Clothing' } = location.state || {};

<<<<<<< HEAD
  const [selectedGender, setSelectedGender] = useState(gender);
  const [selectedCategory, setSelectedCategory] = useState(category);

  const getFirstSubcategory = (genderVal, categoryVal) => {
  const subs = categoryTree?.[genderVal]?.[categoryVal];
  return subs ? Object.keys(subs)[0] || '' : '';
};

const [selectedSubcategory, setSelectedSubcategory] = useState(
  getFirstSubcategory(gender, category)
);
  const [selectedSubtypes, setSelectedSubtypes] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const [priceFilter, setPriceFilter] = useState(1000);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [selectedDesigners, setSelectedDesigners] = useState([]);

  const [showFilters, setShowFilters] = useState(false);


=======
  // 👇 3. ADDED LOGIC TO READ URL AND MANAGE LIVE SEARCH STATE
  const [searchParams] = useSearchParams();
  const urlSearchQuery = searchParams.get('search') || '';
  const [liveSearchQuery, setLiveSearchQuery] = useState(urlSearchQuery);

  // --- YOUR EXISTING STATE (100% UNCHANGED) ---
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
>>>>>>> c66c7eb9db07783cd6db383d6289ff0021a02d1d
  const toggleSelect = (value, setter, list) =>
    list.includes(value)
      ? setter(list.filter(item => item !== value))
      : setter([...list, value]);

  // --- YOUR EXISTING DATA FETCHING (100% UNCHANGED) ---
  useEffect(() => {
    (async () => {
      const prods = await getProducts();
      const filtered = prods.filter(p =>
        p.gender === selectedGender &&
        p.category === selectedCategory &&
        p.subcategory === selectedSubcategory
      );
      setAllProducts(filtered);
      setFilteredProducts(filtered);
<<<<<<< HEAD

      const max = Math.max(...filtered.map(p => p.price || 0), 0);
      setMaxPrice(max);
      setPriceFilter(max);
=======
      const highest = Math.max(...filtered.map(p => p.price || 0), 0);
      setMaxPrice(highest);
      setPriceFilter(highest);
      setSliderProgress(100);
>>>>>>> c66c7eb9db07783cd6db383d6289ff0021a02d1d
    })();
  }, [selectedGender, selectedCategory, selectedSubcategory]);

  // --- YOUR MAIN FILTERING LOGIC (WITH ONE ADDITION) ---
  useEffect(() => {
<<<<<<< HEAD
    const result = allProducts.filter(p =>
      p.price <= priceFilter &&
      (selectedSubtypes.length ? selectedSubtypes.includes(p.subtype) : true) &&
      (selectedSizes.length ? selectedSizes.includes(p.size) : true) &&
      (selectedColors.length ? selectedColors.includes(p.color) : true) &&
      (selectedFabrics.length ? selectedFabrics.includes(p.fabric) : true) &&
      (selectedDesigners.length ? selectedDesigners.includes(p.designer) : true)
    );
    setFilteredProducts(result);
  }, [priceFilter, selectedSubtypes, selectedSizes, selectedColors, selectedFabrics, selectedDesigners, allProducts]);
=======
    let result = [...allProducts];

    // 👇 4. ADDED SEARCH FILTER BLOCK (APPLIED FIRST)
    if (liveSearchQuery) {
      const lowerQuery = liveSearchQuery.toLowerCase();
      result = result.filter(p => 
        p.name?.toLowerCase().includes(lowerQuery) ||
        p.brand?.toLowerCase().includes(lowerQuery) ||
        p.category?.toLowerCase().includes(lowerQuery)
      );
    }
    // --- END OF ADDED BLOCK ---

    // YOUR EXISTING ADVANCED FILTERS (100% UNCHANGED)
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
        const discount = original && p.price ? Math.round(((original - p.price) / original) * 100) : 0;
        return selectedDiscounts.some(threshold => discount >= threshold);
      });
    }
    setFilteredProducts(result);
  }, [
    liveSearchQuery, // 👈 5. ADDED to the dependency array
    selectedBrands,
    selectedSubcategories,
    selectedColors,
    selectedSizes,
    selectedDiscounts,
    priceFilter,
    allProducts
  ]);

  // --- YOUR REMAINING LOGIC AND HELPERS (100% UNCHANGED) ---
  useEffect(() => {
    if (!maxPrice) return;
    const percent = (priceFilter / maxPrice) * 100;
    setSliderProgress(percent.toFixed(2));
  }, [priceFilter, maxPrice]);

  const brands = [...new Set(allProducts.map(p => p.brand).filter(Boolean))];
  const subcats = [...new Set(allProducts.map(p => p.subcategory).filter(Boolean))];
  const colors = [...new Set(allProducts.flatMap(p => p.colors || []))];
  const sizes = [...new Set(allProducts.flatMap(p => p.sizes || []))];
  const filteredBrandList = brands.filter(b => b.toLowerCase().includes(brandSearch.toLowerCase()));
>>>>>>> c66c7eb9db07783cd6db383d6289ff0021a02d1d

  // --- YOUR JSX (WITH ONE ADDITION) ---
  return (
    <div className="product-list-page">
    {/* Toggle Filter Icon for Mobile/Tablet */}
          <button
      className="floating-filter-button"
      onClick={() => setShowFilters(!showFilters)}
      aria-label="Toggle Filters"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="filter-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
      </svg>
    </button>


      <aside className={`advanced-filter-bar ${showFilters ? 'show' : 'hide'}`}>
        {showFilters && typeof window !== "undefined" && window.innerWidth <= 1024 && (
          <div className="filter-overlay-apply">
            <button onClick={() => setShowFilters(false)}>Apply Filters</button>
          </div>
        )}



        <h2>Filters</h2>
<<<<<<< HEAD

        <div className={`filter-group ${accordionState.Gender ? 'active' : ''}`}>
          <h4 onClick={() => toggleAccordion('Gender')}>
            Gender
            <span className="accordion-icon" />
          </h4>
          <div className="filter-options">
            {['Women', 'Men'].map(g => (
              <div className="custom-radio" key={g}>
                <label htmlFor={`gender-${g}`}>
                  <input
                    type="radio"
                    id={`gender-${g}`}
                    name="gender"
                    checked={selectedGender === g}
                    onChange={() => {
                      setSelectedGender(g);
                      const firstCat = Object.keys(categoryTree[g])[0];
                      const firstSub = getFirstSubcategory(g, firstCat);
                      setSelectedCategory(firstCat);
                      setSelectedSubcategory(firstSub);
                      setSelectedSubtypes([]);
                    }}
                  />
                  {g}
                </label>
              </div>
            ))}
          </div>
        </div>



        {/* Category */}
        <div className={`filter-group ${accordionState.Category ? 'active' : ''}`}>
          <h4 onClick={() => toggleAccordion('Category')}>
            Category
            <span className="accordion-icon" />
          </h4>
          <div className="filter-options"> {/* This was missing */}
            {Object.keys(categoryTree[selectedGender]).map(cat => (
              <div className="custom-radio" key={cat}>
                <input
                  type="radio"
                  id={`cat-${cat}`}
                  name="category"
                  checked={selectedCategory === cat}
                  onChange={() => {
                    setSelectedCategory(cat);
                    const firstSub = getFirstSubcategory(selectedGender, cat);
                    setSelectedSubcategory(firstSub);
                    setSelectedSubtypes([]);
                  }}
                />
                <label htmlFor={`cat-${cat}`}>{cat}</label>
              </div>
            ))}
          </div>
        </div>


        {/* Subcategory */}
        {categoryTree[gender][selectedCategory] && (
          <div className={`filter-group ${accordionState.Subcategory ? 'active' : ''}`}>
            <h4 onClick={() => toggleAccordion('Subcategory')}>
              Subcategory
              <span className="accordion-icon" />
            </h4>
            <div className="filter-options">
              {Object.keys(categoryTree[gender][selectedCategory]).map(sub => (
                <div className="custom-radio" key={sub}>
                  <input
                    type="radio"
                    id={`subcat-${sub}`}
                    name="subcategory"
                    checked={selectedSubcategory === sub}
                    onChange={() => {
                      setSelectedSubcategory(sub);
                      setSelectedSubtypes([]);
                    }}
                  />
                  <label htmlFor={`subcat-${sub}`}>{sub}</label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subtype */}
        {categoryTree[gender][selectedCategory]?.[selectedSubcategory]?.length > 0 && (
          <div className={`filter-group ${accordionState.Subtype ? 'active' : ''}`}>
            <h4 onClick={() => toggleAccordion('Subtype')}>
              Subtype
              <span className="accordion-icon" />
            </h4>
            <div className="filter-options">
              {categoryTree[gender][selectedCategory][selectedSubcategory].map(st => (
                <div className="custom-checkbox" key={st}>
                  <input
                    type="checkbox"
                    id={`subtype-${st}`}
                    checked={selectedSubtypes.includes(st)}
                    onChange={() => toggleSelect(st, setSelectedSubtypes, selectedSubtypes)}
                  />
                  <label htmlFor={`subtype-${st}`}>{st}</label>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* Price */}
        <div className="filter-group active">
          <h4>Price</h4>
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={priceFilter}
            onChange={e => setPriceFilter(+e.target.value)}
          />
          <div>Up to ₹{priceFilter}</div>
        </div>

        {/* Size */}
        <div className={`filter-group ${accordionState.Size ? 'active' : ''}`}>
          <h4 onClick={() => toggleAccordion('Size')}>
            Size
            <span className="accordion-icon" />
          </h4>
          <div className="filter-options">
            {sizes.map(size => (
              <div className="custom-checkbox" key={size}>
                <input
                  type="checkbox"
                  id={`size-${size}`}
                  checked={selectedSizes.includes(size)}
                  onChange={() => toggleSelect(size, setSelectedSizes, selectedSizes)}
                />
                <label htmlFor={`size-${size}`}>{size}</label>
              </div>
            ))}
          </div>
        </div>


        {/* Color */}
        <div className={`filter-group ${accordionState.Color ? 'active' : ''}`}>
          <h4 onClick={() => toggleAccordion('Color')}>
            Color
            <span className="accordion-icon" />
          </h4>
          <div className="filter-options">
            {colors.map(color => (
              <div className="custom-checkbox" key={color}>
                <input
                  type="checkbox"
                  id={`color-${color}`}
                  checked={selectedColors.includes(color)}
                  onChange={() => toggleSelect(color, setSelectedColors, selectedColors)}
                />
                <label htmlFor={`color-${color}`}>{color}</label>
              </div>
            ))}
          </div>
=======
        {/* Brand Filter (Your Original Code) */}
        <div className={`filter-group ${openFilters.Brand ? 'active' : ''}`}>
          <h4 onClick={() => toggleFilter('Brand')}>Brand <span className="accordion-icon" /></h4>
          <div className="filter-options">
            <input type="text" placeholder="Search brand" className="brand-search-input" value={brandSearch} onChange={e => setBrandSearch(e.target.value)} />
            {filteredBrandList.length ? (filteredBrandList.map(b => (
              <div className="custom-checkbox" key={b}><input type="checkbox" id={`brand-${b}`} checked={selectedBrands.includes(b)} onChange={() => toggleSelect(b, setSelectedBrands, selectedBrands)} /><label htmlFor={`brand-${b}`}>{b}</label></div>
            ))) : (<div className="no-results">No brands found</div>)}
          </div>
        </div>
        {/* Price Filter (Your Original Code) */}
        <div className={`filter-group ${openFilters.Price ? 'active' : ''}`}>
          <h4 onClick={() => toggleFilter('Price')}>Price <span className="accordion-icon" /></h4>
          <div className="filter-options price-slider-group">
            <input type="range" min="0" max={maxPrice} value={priceFilter} style={{ '--slider-progress': `${sliderProgress}%` }} onChange={e => setPriceFilter(+e.target.value)} />
            <div className="price-range-display">Up to ₹{priceFilter}</div>
          </div>
        </div>
        {/* Subcategory (Your Original Code) */}
        <div className={`filter-group ${openFilters.Subcategory ? 'active' : ''}`}>
          <h4 onClick={() => toggleFilter('Subcategory')}>Subcategory <span className="accordion-icon" /></h4>
          <div className="filter-options">{subcats.map(sc => (<div className="custom-checkbox" key={sc}><input type="checkbox" id={`subcategory-${sc}`} checked={selectedSubcategories.includes(sc)} onChange={() => toggleSelect(sc, setSelectedSubcategories, selectedSubcategories)} /><label htmlFor={`subcategory-${sc}`}>{sc}</label></div>))}</div>
        </div>
        {/* Color (Your Original Code) */}
        <div className={`filter-group ${openFilters.Color ? 'active' : ''}`}>
          <h4 onClick={() => toggleFilter('Color')}>Color <span className="accordion-icon" /></h4>
          <div className="filter-options">{colors.map(c => (<div className="custom-checkbox" key={c}><input type="checkbox" id={`color-${c}`} checked={selectedColors.includes(c)} onChange={() => toggleSelect(c, setSelectedColors, selectedColors)} /><label htmlFor={`color-${c}`}>{c}</label></div>))}</div>
        </div>
        {/* Size (Your Original Code) */}
        <div className={`filter-group ${openFilters.Size ? 'active' : ''}`}>
          <h4 onClick={() => toggleFilter('Size')}>Size <span className="accordion-icon" /></h4>
          <div className="filter-options">{sizes.map(s => (<div className="custom-checkbox" key={s}><input type="checkbox" id={`size-${s}`} checked={selectedSizes.includes(s)} onChange={() => toggleSelect(s, setSelectedSizes, selectedSizes)} /><label htmlFor={`size-${s}`}>{s}</label></div>))}</div>
        </div>
        {/* Discount (Your Original Code) */}
        <div className={`filter-group ${openFilters.Discount ? 'active' : ''}`}>
          <h4 onClick={() => toggleFilter('Discount')}>Discount <span className="accordion-icon" /></h4>
          <div className="filter-options">{discountOptions.map(percent => (<div className="custom-checkbox" key={percent}><input type="checkbox" id={`discount-${percent}`} checked={selectedDiscounts.includes(percent)} onChange={() => toggleSelect(percent, setSelectedDiscounts, selectedDiscounts)} /><label htmlFor={`discount-${percent}`}>{percent}% Off or more</label></div>))}</div>
>>>>>>> c66c7eb9db07783cd6db383d6289ff0021a02d1d
        </div>


        {/* Fabric */}
        <div className={`filter-group ${accordionState.Fabric ? 'active' : ''}`}>
          <h4 onClick={() => toggleAccordion('Fabric')}>
            Fabric
            <span className="accordion-icon" />
          </h4>
          <div className="filter-options">
            {fabrics.map(fabric => (
              <div className="custom-checkbox" key={fabric}>
                <input
                  type="checkbox"
                  id={`fabric-${fabric}`}
                  checked={selectedFabrics.includes(fabric)}
                  onChange={() => toggleSelect(fabric, setSelectedFabrics, selectedFabrics)}
                />
                <label htmlFor={`fabric-${fabric}`}>{fabric}</label>
              </div>
            ))}
          </div>
        </div>


        {/* Designer */}
        <div className={`filter-group ${accordionState.Designer ? 'active' : ''}`}>
          <h4 onClick={() => toggleAccordion('Designer')}>
            Designer
            <span className="accordion-icon" />
          </h4>
          <div className="filter-options">
            {designers.map(brand => (
              <div className="custom-checkbox" key={brand}>
                <input
                  type="checkbox"
                  id={`designer-${brand}`}
                  checked={selectedDesigners.includes(brand)}
                  onChange={() => toggleSelect(brand, setSelectedDesigners, selectedDesigners)}
                />
                <label htmlFor={`designer-${brand}`}>{brand}</label>
              </div>
            ))}
          </div>
        </div>

      </aside>

      <main className="product-list-main">
        {/* 👇 6. ADDED The SearchBar component to the page */}
        <div className="list-page-search-bar-container">
            <SearchBar onSearch={setLiveSearchQuery} />
        </div>
        
        {/* YOUR EXISTING JSX (UNCHANGED) */}
        <div className="product-result-header">
          <div className="product-result-count">{filteredProducts.length} results</div>
<<<<<<< HEAD
=======
          <div className="category-dropdown"><div className="custom-select-wrapper"></div></div>
>>>>>>> c66c7eb9db07783cd6db383d6289ff0021a02d1d
        </div>
        <ProductList products={filteredProducts} />
      </main>
    </div>
  );
};

export default ProductListPage;
