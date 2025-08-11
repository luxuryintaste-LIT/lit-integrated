import React, { useState, useCallback } from 'react';
import { createProduct } from '../services/api';
import '../styles/AddProductForm.css';

const FileUploadBox = ({ onFileSelect, color, onFileRemove }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    // Simulate upload progress for each file
    files.forEach((file) => {
      const fileId = `${file.name}-${Date.now()}`;
      setUploadProgress(prev => ({
        ...prev,
        [fileId]: {
          progress: 0,
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(1), // Convert to MB
          status: 'uploading',
          file: file // Store the actual file object
        }
      }));

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 100) {
          setUploadProgress(prev => ({
            ...prev,
            [fileId]: {
              ...prev[fileId],
              progress,
              status: progress === 100 ? 'completed' : 'uploading'
            }
          }));
        } else {
          clearInterval(interval);
        }
      }, 300);
    });

    onFileSelect(files);
  };

  const handleRemoveFile = (fileId) => {
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      const fileToRemove = newProgress[fileId].file;
      delete newProgress[fileId];
      onFileRemove(fileToRemove); // Call the removal callback
      return newProgress;
    });
  };

  return (
    <div className="upload-section">
      <div 
        className={`upload-box ${isDragging ? 'dragging' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="upload-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
        <p>Drag files to upload</p>
        <button className="choose-file-btn" onClick={() => document.getElementById(`file-input-${color}`).click()}>
          Choose File
        </button>
        <input
          id={`file-input-${color}`}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          style={{ display: 'none' }}
        />
      </div>

      {Object.entries(uploadProgress).length > 0 && (
        <div className="upload-progress-list">
          {Object.entries(uploadProgress).map(([fileId, file]) => (
            <div key={fileId} className="upload-progress-item">
              <div className="file-info">
                <div className="file-icon">
                  {file.name.match(/\.(jpg|jpeg|png|gif)$/i) ? '🖼️' : '📄'}
                </div>
                <div className="file-details">
                  <span className="file-name">{file.name}</span>
                  <div className="file-meta">
                    <span>{file.size} mb</span>
                    <span>{file.status === 'completed' ? 'Completed' : `${file.progress}% done`}</span>
                  </div>
                </div>
                <button 
                  className="remove-file-btn"
                  onClick={() => handleRemoveFile(fileId)}
                >×</button>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${file.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AddProductForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    brandName: '',
    productName: '',
    originalPrice: '',
    currentPrice: '',
    discountPercentage: '',
    description: '',
    category: '',
    stock: '',
    colors: [],
    colorImages: {},
    sizes: [],
    features: [],
    featured: false,
    
  });

  const [newFeature, setNewFeature] = useState('');
  const [newSize, setNewSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [colorImages, setColorImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const availableColors = [
    'Red', 'Blue', 'Green', 'Black', 'White', 'Yellow', 'Purple', 'Orange', 'Pink', 'Brown', 'Gray', 'Navy', 'Beige', 'Tan', 'Gold', 'Silver', 'Rose Gold'
  ];

  const availableCategories = [
    'Clothing', 'Accessories', 'Footwear', 'Fragrances', 'Storage', 'Electronics', 'Home & Living'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleColorSelect = (color) => {
    if (color && !formData.colors.includes(color)) {
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, color],
        colorImages: {
          ...prev.colorImages,
          [color]: []
        }
      }));
    }
    setSelectedColor('');
  };

  const handleImageUpload = useCallback((files, color) => {
    setFormData(prev => ({
      ...prev,
      colorImages: {
        ...prev.colorImages,
        [color]: [...(prev.colorImages[color] || []), ...files]
      }
    }));
  }, []);

  const handleRemoveImage = useCallback((fileToRemove, color) => {
    setFormData(prev => ({
      ...prev,
      colorImages: {
        ...prev.colorImages,
        [color]: prev.colorImages[color].filter(file => file !== fileToRemove)
      }
    }));
  }, []);

  const handleAddSize = () => {
    if (newSize && !formData.sizes.includes(newSize)) {
      setFormData(prev => ({
        ...prev,
        sizes: [...prev.sizes, newSize]
      }));
      setNewSize('');
    }
  };

  const handleAddFeature = () => {
    if (newFeature && !formData.features.includes(newFeature)) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature]
      }));
      setNewFeature('');
    }
  };

  const handleRemoveColor = (color) => {
    setFormData(prev => {
      const newColors = prev.colors.filter(c => c !== color);
      const newColorImages = { ...prev.colorImages };
      delete newColorImages[color];
      return {
        ...prev,
        colors: newColors,
        colorImages: newColorImages
      };
    });
  };

  const handleRemoveSize = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter(s => s !== size)
    }));
  };

  const handleRemoveFeature = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Prepare the product data for API submission
      const productData = {
        name: formData.productName,
        brand: formData.brandName,
        description: formData.description,
        price: parseFloat(formData.currentPrice),
        originalPrice: parseFloat(formData.originalPrice),
        discount: parseFloat(formData.discountPercentage) || 0,
        category: formData.category,
        stock: parseInt(formData.stock) || 0,
        colors: formData.colors,
        sizes: formData.sizes,
        features: formData.features,
        featured: formData.featured,
        imageUrl: '/images/products/default-product.jpg'
      };

      console.log('Submitting product data:', productData);
      
      // Call the API to create the product
      const createdProduct = await createProduct(productData);
      console.log('Product created successfully:', createdProduct);
      
      // Reset form and close modal
      setFormData({
        brandName: '',
        productName: '',
        originalPrice: '',
        currentPrice: '',
        discountPercentage: '',
        description: '',
        category: '',
        stock: '',
        colors: [],
        colorImages: {},
        sizes: [],
        features: [],
        featured: false
      });
      setNewFeature('');
      setNewSize('');
      setSelectedColor('');
      setColorImages([]);
      
      onClose();
    } catch (error) {
      console.error('Error creating product:', error);
      setError(error.response?.data?.message || 'Failed to create product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="add-product-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Add New Product</h2>
        
        {error && (
          <div className="error-message" style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#ffebee', borderRadius: '4px' }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="brandName">Brand Name</label>
            <input
              type="text"
              id="brandName"
              name="brandName"
              value={formData.brandName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              {availableCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="originalPrice">Original Price (₹)</label>
              <input
                type="number"
                id="originalPrice"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label htmlFor="currentPrice">Current Price (₹)</label>
              <input
                type="number"
                id="currentPrice"
                name="currentPrice"
                value={formData.currentPrice}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label htmlFor="discountPercentage">Discount Percentage (%)</label>
              <input
                type="number"
                id="discountPercentage"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleInputChange}
                min="0"
                max="100"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="stock">Stock Quantity</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                required
                min="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="4"
            ></textarea>
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
              />
              Featured Product (will appear in featured list)
            </label>
          </div>

          <h3>Colors</h3>
          <div className="form-group">
            <label htmlFor="colorSelect">Select a color</label>
            <div className="color-selection">
              <select
                id="colorSelect"
                value={selectedColor}
                onChange={(e) => handleColorSelect(e.target.value)}
              >
                <option value="">Select a color</option>
                {availableColors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="selected-colors">
            {formData.colors.map((color) => (
              <span key={color} className="color-tag">
                {color}
                <button type="button" onClick={() => handleRemoveColor(color)}>&times;</button>
              </span>
            ))}
          </div>

          <h3>Color Images</h3>
          <div className="color-images-section">
            {formData.colors.map((color) => (
              <div key={color} className="color-image-upload">
                <h4>{color} Images</h4>
                <FileUploadBox 
                  color={color} 
                  onFileSelect={(files) => handleImageUpload(files, color)}
                  onFileRemove={(fileToRemove) => handleRemoveImage(fileToRemove, color)}
                />
                <div className="image-preview">
                  {(formData.colorImages[color] || []).map((file, index) => (
                    <div key={index} className="preview-item">
                      <img src={URL.createObjectURL(file)} alt={file.name} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h3>Sizes</h3>
          <div className="form-group">
            <label htmlFor="newSize">Add a size (e.g., S, M, L, XL)</label>
            <div className="size-input">
              <input
                type="text"
                id="newSize"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault(); // Prevent form submission
                    handleAddSize();
                  }
                }}
                placeholder="Enter size (e.g., S, M, L, XL)"
              />
              <button type="button" onClick={handleAddSize}>Add Size</button>
            </div>
          </div>
          <div className="selected-sizes">
            {formData.sizes.map((size) => (
              <span key={size} className="size-tag">
                {size}
                <button type="button" onClick={() => handleRemoveSize(size)}>&times;</button>
              </span>
            ))}
          </div>

          <h3>Features</h3>
          <div className="form-group">
            <label htmlFor="newFeature">Add a feature</label>
            <div className="feature-input">
              <input
                type="text"
                id="newFeature"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault(); // Prevent form submission
                    handleAddFeature();
                  }
                }}
                placeholder="Enter product feature"
              />
              <button type="button" onClick={handleAddFeature}>Add Feature</button>
            </div>
          </div>
          <div className="selected-features">
            {formData.features.map((feature) => (
              <span key={feature} className="feature-tag">
                {feature}
                <button type="button" onClick={() => handleRemoveFeature(feature)}>&times;</button>
              </span>
            ))}
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Adding Product...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm; 