// src/components/checkout/AddressSelection.jsx
import React, { useState } from 'react';
import AddressCard from './AddressCard';
import AddressForm from './AddressForm'; // Import the new form
import { Plus } from 'lucide-react';

// This is now our initial state, not a constant display list
const initialAddresses = [
  { id: 1, type: 'Home', street: '2118 Thorndridge', city: 'Syracuse', state: 'Connecticut', zip: '35824', phone: '(209) 555-0104' },
  { id: 2, type: 'Office', street: '2715 Ash Dr.', city: 'San Jose', state: 'South Dakota', zip: '83475', phone: '(704) 555-0127' },
];

const AddressSelection = ({ onNext }) => {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState(1);

  // State to control the form: `null` means hidden, an object means visible for editing/adding
  const [editingAddress, setEditingAddress] = useState(null);

  const handleAddNew = () => {
    // Open the form with blank data for a new address
    setEditingAddress({}); 
  };
  
  const handleEdit = (address) => {
    // Open the form with the data of the address to be edited
    setEditingAddress(address);
  };

  const handleDelete = (addressId) => {
    setAddresses(prev => prev.filter(addr => addr.id !== addressId));
  };

  const handleSave = (addressData) => {
    if (addressData.id) {
      // It's an existing address, so we update it
      setAddresses(prev => prev.map(addr => addr.id === addressData.id ? addressData : addr));
    } else {
      // It's a new address, so we add it with a new ID
      const newAddress = { ...addressData, id: Date.now() }; // Use timestamp for a unique ID
      setAddresses(prev => [...prev, newAddress]);
      setSelectedAddressId(newAddress.id); // Auto-select the newly added address
    }
    setEditingAddress(null); // Close the form
  };
  
  const handleCancel = () => {
    setEditingAddress(null); // Close the form
  };

  // If `editingAddress` is not null, show the form. Otherwise, show the list.
  if (editingAddress) {
    return (
      <AddressForm 
        initialData={editingAddress}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className="step-content-container">
      <h3 className="step-title">Select Address</h3>
      <div className="address-list">
        {addresses.map(address => (
          <AddressCard
            key={address.id}
            address={address}
            isSelected={selectedAddressId === address.id}
            onSelect={setSelectedAddressId}
            onEdit={handleEdit}       // Pass the handler
            onDelete={handleDelete}   // Pass the handler
          />
        ))}
      </div>
      
      <button className="add-new-address-btn" onClick={handleAddNew}>
        <Plus size={20} />
        Add New Address
      </button>

      <div className="step-navigation">
        <button className="btn-primary" onClick={onNext} disabled={!selectedAddressId}>
            Next
        </button>
      </div>
    </div>
  );
};

export default AddressSelection;