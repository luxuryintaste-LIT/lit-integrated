// Updated ProductListPage with full filter bar including Gender, Category, Subcategory, Subtype, Price, Size, Color, Fabric, Designer
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductList from '../components/Shop/ProductList';
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


  const toggleSelect = (value, setter, list) =>
    list.includes(value)
      ? setter(list.filter(item => item !== value))
      : setter([...list, value]);

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

      const max = Math.max(...filtered.map(p => p.price || 0), 0);
      setMaxPrice(max);
      setPriceFilter(max);
    })();
  }, [selectedGender, selectedCategory, selectedSubcategory]);

  useEffect(() => {
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
        <div className="product-result-header">
          <div className="product-result-count">{filteredProducts.length} results</div>
        </div>
        <ProductList products={filteredProducts} />
      </main>
    </div>
  );
};

export default ProductListPage;
