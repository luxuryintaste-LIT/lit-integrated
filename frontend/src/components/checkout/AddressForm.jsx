// src/components/checkout/AddressForm.jsx
import React, { useState, useEffect } from 'react';

const AddressForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    // Initialize with empty strings
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });

  // This effect runs when `initialData` changes.
  // It pre-fills the form for editing.
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Send the form data back to the parent
  };

  // Determine if we are in "edit" or "add" mode to change the title
  const isEditMode = initialData && initialData.id;

  return (
    <div className="address-form-container">
      <h3>{isEditMode ? 'Edit Address' : 'Add New Address'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Street Address</label>
          <input type="text" name="street" value={formData.street} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>State</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Zip Code</label>
            <input type="text" name="zip" value={formData.zip} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
          <button type="submit" className="action-btn">Save Address</button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm; 