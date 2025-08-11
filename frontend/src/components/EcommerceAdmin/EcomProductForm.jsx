// C:\lit-integrated\frontend\src\components\EcommerceAdmin\EditProductForm.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/AddProductForm.css'; // Reusing the same CSS

// This should be the same mock data source used in other components
const mockProducts = [
    { _id: '1', name: 'Cyber-Punk Void Jacket', category: 'Apparel', productLine: 'Luxury Fashion', gender: 'Unisex', price: 120, stock: 50, material: 'Synth-Leather', description: 'A sleek, water-resistant jacket with neon accents, perfect for the urban explorer.', colors: ['Black', 'Purple'], sizes: ['M', 'L', 'XL'], features: ['Water-Resistant', 'LED Accents'] },
    { _id: '2', name: 'Holo-Lens 2049', category: 'Accessories', productLine: 'Fast Fashion', gender: 'Men', price: 250, stock: 30, material: 'Titanium', description: 'Augmented reality glasses with a lightweight frame and a 4K display.', colors: ['Gray', 'Silver'], sizes: ['One Size'], features: ['AR Display', 'Voice Control'] },
    //... other products
];

// API Simulations
const fetchProductById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockProducts.find(p => p._id === id);
};
const updateProduct = async (id, data) => {
  console.log(`Updating product ${id}:`, data);
  await new Promise(resolve => setTimeout(resolve, 500));
  // In a real app, the server would return the updated product
  return { ...data, _id: id };
};

const EditProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const availableCategories = ['Clothing', 'Accessories', 'Footwear', "Jewellery" ];
  const availableGenders = ['Men', 'Women', 'Unisex'];
  const availableProductLines = ['Fast Fashion', 'Luxury Fashion', 'Sustainable Fashion', 'Sneaker World'];

  useEffect(() => {
    const loadProductData = async () => {
      const productToEdit = await fetchProductById(id);
      if (productToEdit) {
        // This pre-fills the form state with ALL the product's data
        setFormData({
          productName: productToEdit.name || '',
          originalPrice: productToEdit.price || '',
          discountPercentage: productToEdit.discountPercentage || '',
          description: productToEdit.description || '',
          category: productToEdit.category || '',
          stock: productToEdit.stock || '',
          colors: productToEdit.colors || [],
          sizes: productToEdit.sizes || [],
          features: productToEdit.features || [],
          material: productToEdit.material || '',
          modelSize: productToEdit.modelSize || '',
          couponCode: productToEdit.couponCode || '',
          gender: productToEdit.gender || '',
          productLine: productToEdit.productLine || '',
        });
      } else {
        setError('Product not found!');
      }
    };
    loadProductData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      await updateProduct(id, formData);
      alert('Product updated successfully! (Simulated)');
      navigate('/admin/ecomDashboard/products');
    } catch (err) {
      setError('Failed to update product.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (error) return <div style={{color: 'red', padding: '2rem'}}>{error}</div>;
  if (!formData) return <div style={{color: 'white', padding: '2rem'}}>Loading Product Data...</div>;
  
  return (
    <div className="add-product-modal" style={{ position: 'static', background: 'transparent', backdropFilter: 'none', height: 'auto', display: 'block' }}>
      <div className="modal-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit} noValidate>
          
          {/* --- THE FULL FORM STRUCTURE WITH ALL VALUES BOUND --- */}
          <div className="form-row">
            <div className="form-group"><label>Product Name</label><input name="productName" value={formData.productName} onChange={handleInputChange} required /></div>
            <div className="form-group"><label>Gender</label><select name="gender" value={formData.gender} onChange={handleInputChange} required><option value="">Select Gender</option>{availableGenders.map(g=><option key={g} value={g}>{g}</option>)}</select></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Product Line</label><select name="productLine" value={formData.productLine} onChange={handleInputChange} required><option value="">Select Line</option>{availableProductLines.map(pl=><option key={pl} value={pl}>{pl}</option>)}</select></div>
            <div className="form-group"><label>Category</label><select name="category" value={formData.category} onChange={handleInputChange} required><option value="">Select Category</option>{availableCategories.map(c=><option key={c} value={c}>{c}</option>)}</select></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Original Price (₹)</label><input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleInputChange} required /></div>
            <div className="form-group"><label>Discount (%)</label><input type="number" name="discountPercentage" value={formData.discountPercentage} onChange={handleInputChange} /></div>
            <div className="form-group"><label>Stock Quantity</label><input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Material</label><input name="material" value={formData.material} onChange={handleInputChange} /></div>
            <div className="form-group"><label>Model Size</label><input name="modelSize" value={formData.modelSize} onChange={handleInputChange} /></div>
            <div className="form-group"><label>Coupon Code</label><input name="couponCode" value={formData.couponCode} onChange={handleInputChange} /></div>
          </div>
          <div className="form-group"><label>Description</label><textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} required></textarea></div>
          
          <h3>Colors & Sizes</h3>
          <p style={{color: '#b0a0ca', fontSize: '0.9rem', marginTop: '-1rem', marginBottom: '1.5rem'}}>
            Note: Editing array fields like colors and sizes is not yet implemented in this form.
          </p>
          <div className="tags-section" style={{marginBottom: '2rem', display: 'flex', gap: '2rem'}}>
            <div className="tag-group"><h4 className="tag-label">Current Colors</h4><div className="tags">{formData.colors.map(c => <span key={c} className="tag">{c}</span>)}</div></div>
            <div className="tag-group"><h4 className="tag-label">Current Sizes</h4><div className="tags">{formData.sizes.map(s => <span key={s} className="tag">{s}</span>)}</div></div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={() => navigate(-1)} disabled={isSubmitting}>Cancel</button>
            <button type="submit" className="submit-button" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Changes'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;