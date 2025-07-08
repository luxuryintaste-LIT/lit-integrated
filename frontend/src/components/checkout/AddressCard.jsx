import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

// Add onEdit and onDelete to the props
const AddressCard = ({ address, isSelected, onSelect, onEdit, onDelete }) => {
  const { type, street, city, state, zip, phone } = address;

  const handleEdit = (e) => {
    e.stopPropagation(); // Prevents the card's onSelect from firing
    onEdit(address);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    // Optional: Add a confirmation dialog before deleting
    if (window.confirm('Are you sure you want to delete this address?')) {
        onDelete(address.id);
    }
  };

  return (
    // Pass the address id to onSelect
    <div className={`address-card ${isSelected ? 'selected' : ''}`} onClick={() => onSelect(address.id)}>
      <div className="address-card-content">
        <div className="address-header">
          {type && <div className="address-type-badge">{type.toUpperCase()}</div>}
          <p className="address-street">{street}</p>
          <p className="address-city-state">{`${city}, ${state} ${zip}`}</p>
          <p className="address-phone">{phone}</p>
        </div>
        <div className="address-actions">
          {/* Add onClick handlers to the buttons */}
          <button className="icon-btn" onClick={handleEdit}><Edit size={18} /></button>
          <button className="icon-btn" onClick={handleDelete}><Trash2 size={18} /></button>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;