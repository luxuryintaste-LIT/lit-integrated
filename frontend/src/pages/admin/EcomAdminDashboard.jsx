<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/context-admin/AuthContext';
import AddProductForm from '../../components/AddProductForm';



import '../../App.css';

const EcomDashboard = () => {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    sessionStorage.setItem('adminPanelType', 'ecom');
  }, []);

  const handleLogout = () => {
    logout('/shop', navigate);
  };

  return (
    <div className="admin-dashboard glassmorphic-container">
      <div className="admin-header centered-admin-header">
        <h1 className="centered-admin-title">E-commerce Admin Dashboard</h1>
        {/* <button className="logout-button" onClick={handleLogout}>Logout 🔓</button> */}
      </div>

      <p className="centered-admin-welcome">
        Welcome to the E-commerce dashboard. You are now authenticated.
      </p>

      <DashboardStats />
      <EcomOrderTable />

      <div className="centered-admin-actions">
        <button className="admin-action-btn purple-glow-btn" onClick={() => setIsAddProductModalOpen(true)}>Add Product</button>
        <button className="admin-action-btn purple-glow-btn" onClick={() => navigate('/admin/edit-product')}>Edit Product</button>
        <button className="admin-action-btn purple-glow-btn" onClick={() => navigate('/admin/delete-product')}>Delete Product</button>
      </div>

      <AddProductForm
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
      />
    </div>
  );
};

export default EcomDashboard;
=======
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- added
import { useAuth } from '../../context/context-admin/AuthContext';
import AddProductForm from '../../components/AddProductForm';
import '../../App.css';

const EcomDashboard = () => {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const navigate = useNavigate(); // <-- added

  

   const { logout } = useAuth(); // ✅ Grab logout from context

    // ✅ Mark the panel as ecom
  useEffect(() => {
    sessionStorage.setItem('adminPanelType', 'ecom');
  }, []);

  const handleLogout = () => {
    logout('/shop', navigate); // ✅ Use clean logout
  };
  

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>E-commerce Admin Dashboard</h1>
       
      </div>
      <p>Welcome to the E-commerce dashboard. You are now authenticated.</p>
      <div className="admin-actions">
        <button onClick={() => setIsAddProductModalOpen(true)}>Add Product</button>
        <button onClick={() => navigate('/admin/edit-product')}>Edit Product</button>
        <button onClick={() => navigate('/admin/delete-product')}>Delete Product</button>
      </div>
      <AddProductForm
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
      />
    </div>
  );
};

export default EcomDashboard;
>>>>>>> c66c7eb9db07783cd6db383d6289ff0021a02d1d
