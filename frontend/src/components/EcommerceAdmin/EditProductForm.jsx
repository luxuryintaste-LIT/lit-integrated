// C:\lit-integrated\frontend\src\components\EcommerceAdmin\EditProductForm.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/AddProductForm.css';
import { getProductById, updateProduct } from './productService';

const FileUploadBox = ({ onFileSelect, onFileRemove, color }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({});

    const handleFiles = useCallback((files) => {
        files.forEach((file) => {
            const fileId = `${file.name}-${Date.now()}`;
            setUploadProgress(prev => ({ ...prev, [fileId]: { progress: 0, name: file.name, size: (file.size / 1024 / 1024).toFixed(2), status: 'uploading', file: file }}));
            let currentProgress = 0;
            const interval = setInterval(() => {
                currentProgress += 10;
                setUploadProgress(prev => {
                    const updatedProgress = { ...prev };
                    if (updatedProgress[fileId]) {
                        updatedProgress[fileId].progress = Math.min(currentProgress, 100);
                        if (currentProgress >= 100) {
                            updatedProgress[fileId].status = 'completed';
                            clearInterval(interval);
                        }
                    } else {
                        clearInterval(interval);
                    }
                    return updatedProgress;
                });
            }, 200);
        });
        onFileSelect(files, color);
    }, [color, onFileSelect]);

    const handleRemoveFile = useCallback((e, fileId) => {
        e.stopPropagation();
        const fileToRemove = uploadProgress[fileId].file;
        setUploadProgress(prev => {
            const newProgress = { ...prev };
            delete newProgress[fileId];
            return newProgress;
        });
        onFileRemove(fileToRemove, color);
    }, [color, onFileRemove, uploadProgress]);
    
    return (
        <div className="upload-section">
            <div className={`upload-box ${isDragging ? 'dragging' : ''}`} onDragEnter={(e) => {e.preventDefault(); setIsDragging(true);}} onDragLeave={(e) => {e.preventDefault(); setIsDragging(false);}} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(Array.from(e.dataTransfer.files)); }} onClick={() => document.getElementById(`file-input-${color}`).click()}>
                <div className="upload-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg></div>
                <p>Drag & drop files here, or click to browse</p>
                <input id={`file-input-${color}`} type="file" multiple accept="image/*" onChange={(e) => handleFiles(Array.from(e.target.files))} style={{ display: 'none' }} />
            </div>
            {Object.entries(uploadProgress).length > 0 && (
                <div className="upload-progress-list">
                    {Object.entries(uploadProgress).map(([fileId, file]) => (
                        <div key={fileId} className="upload-progress-item">
                            <div className="file-info">
                                <div className="file-icon">🖼️</div>
                                <div className="file-details">
                                    <div className="file-name">{file.name}</div>
                                    <div className="file-meta">{file.size} MB &bull; {file.status}</div>
                                </div>
                                <button className="remove-file-btn" onClick={(e) => handleRemoveFile(e, fileId)}>&times;</button>
                            </div>
                            <div className="progress-bar"><div className="progress-fill" style={{ width: `${file.progress}%` }}></div></div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


const EditProductForm = () => {
  // ===================================================================
  // --- THIS IS THE CORRECTED LINE ---
  // ===================================================================
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [newFeature, setNewFeature] = useState('');
  const [newSize, setNewSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const availableCategories = ['Clothing', 'Accessories', 'Footwear', "Jewellery" ];
  const availableGenders = ['Men', 'Women', 'Unisex'];
  const availableProductLines = ['Fast Fashion', 'Luxury Fashion', 'Sustainable Fashion', 'Sneaker World'];
  const availableColors = ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow', 'Purple', 'Orange', 'Pink', 'Brown', 'Gray', 'Navy'];

  useEffect(() => {
    const loadProductData = async () => {
      const productToEdit = await getProductById(id);
      if (productToEdit) {
        setFormData({
          productName: productToEdit.name || '',
          originalPrice: productToEdit.price || '',
          discountPercentage: productToEdit.discountPercentage || '',
          description: productToEdit.description || '',
          category: productToEdit.category || '',
          stock: productToEdit.stock || '',
          colors: productToEdit.colors || [],
          colorImages: productToEdit.colorImages || {},
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

  const handleInputChange = (e) => { const { name, value, type, checked } = e.target; setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value })); };
  const handleColorSelect = (color) => { if (color && !formData.colors.includes(color)) { setFormData(prev => ({ ...prev, colors: [...prev.colors, color], colorImages: { ...prev.colorImages, [color]: [] } })); } setSelectedColor(''); };
  const handleImageUpload = useCallback((files, color) => { setFormData(prev => ({ ...prev, colorImages: { ...prev.colorImages, [color]: [...(prev.colorImages[color] || []), ...files] }})); }, []);
  const handleRemoveImage = useCallback((fileToRemove, color) => { setFormData(prev => ({...prev, colorImages: {...prev.colorImages, [color]: prev.colorImages[color].filter(file => file !== fileToRemove)}})); }, []);
  const handleAddSize = () => { if (newSize && !formData.sizes.includes(newSize)) { setFormData(p => ({ ...p, sizes: [...p.sizes, newSize] })); setNewSize(''); }};
  const handleAddFeature = () => { if (newFeature && !formData.features.includes(newFeature)) { setFormData(p => ({ ...p, features: [...p.features, newFeature] })); setNewFeature(''); }};
  const handleRemoveColor = (color) => setFormData(p => { const newColors = p.colors.filter(c => c !== color); const newImages = {...p.colorImages}; delete newImages[color]; return {...p, colors: newColors, colorImages: newImages}; });
  const handleRemoveSize = (size) => setFormData(p => ({ ...p, sizes: p.sizes.filter(s => s !== size) }));
  const handleRemoveFeature = (feature) => setFormData(p => ({ ...p, features: p.features.filter(f => f !== feature) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      await updateProduct(id, formData);
      alert('Product updated successfully!');
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
          
          <h3>Colors & Images</h3>
          <div className="form-group"><label>Add Colors</label><div className="color-selection"><select value={selectedColor} onChange={(e) => handleColorSelect(e.target.value)}><option value="">Select a color to add</option>{availableColors.map(c => <option key={c} value={c}>{c}</option>)}</select></div><div className="selected-colors">{formData.colors.map(c => <span key={c} className="color-tag">{c}<button type="button" onClick={() => handleRemoveColor(c)}>&times;</button></span>)}</div></div>
          <div className="color-images-section">{formData.colors.map(c => <div key={c} className="color-image-upload"><h4>Images for {c}</h4><FileUploadBox color={c} onFileSelect={handleImageUpload} onFileRemove={handleRemoveImage} /></div>)}</div>
          
          <h3>Sizes & Features</h3>
          <div className="form-row">
            <div className="form-group"><label>Add Sizes</label><div className="size-input"><input value={newSize} onChange={(e) => setNewSize(e.target.value)} placeholder="e.g., S, M, XL" /><button type="button" onClick={handleAddSize}>Add Size</button></div><div className="selected-sizes">{formData.sizes.map(s => <span key={s} className="size-tag">{s}<button type="button" onClick={() => handleRemoveSize(s)}>&times;</button></span>)}</div></div>
            <div className="form-group"><label>Add Features</label><div className="feature-input"><input value={newFeature} onChange={(e) => setNewFeature(e.target.value)} placeholder="e.g., Waterproof" /><button type="button" onClick={handleAddFeature}>Add Feature</button></div><div className="selected-features">{formData.features.map(f => <span key={f} className="feature-tag">{f}<button type="button" onClick={() => handleRemoveFeature(f)}>&times;</button></span>)}</div></div>
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