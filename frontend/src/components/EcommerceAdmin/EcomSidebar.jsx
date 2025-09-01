// C:\lit-integrated\frontend\src\components\EcommerceAdmin\EcomSidebar.jsx

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt, FaChartLine, FaBoxOpen, FaTags, FaWarehouse,
  FaShoppingCart, FaDollarSign, FaUsers, FaEnvelope, FaCog, FaSignOutAlt
} from "react-icons/fa";
import { useAuth } from "../../context/context-admin/AuthContext"; 
import "./EcomSidebar.css";

const EcomSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout('/shop', navigate);
  };

  return (
    <aside className="ecom-sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Ecom Admin</h2>
      </div>
      
      <nav className="sidebar-nav">
        {/*
          ===================================================================
          --- THIS IS THE DEFINITIVE FIX ---
          Given your App.jsx structure with `/*`, the most robust link to the
          dashboard is its full, absolute path. The `end` prop remains crucial.
          ===================================================================
        */}
        <NavLink to="/admin/ecomDashboard" end>
          <FaTachometerAlt /> <span>Dashboard</span>
        </NavLink>
        
        {/* All other links are relative and correct */}
        <NavLink to="products">
          <FaBoxOpen /> <span>Products</span>
        </NavLink>
        <NavLink to="analytics">
          <FaChartLine /> <span>Analytics</span>
        </NavLink>
        <NavLink to="offers">
          <FaTags /> <span>Offers</span>
        </NavLink>
        <NavLink to="inventory">
          <FaWarehouse /> <span>Inventory</span>
        </NavLink>
        <NavLink to="orders">
          <FaShoppingCart /> <span>Orders</span>
        </NavLink>
        <NavLink to="sales">
          <FaDollarSign /> <span>Sales</span>
        </NavLink>
        <NavLink to="customers">
          <FaUsers /> <span>Customers</span>
        </NavLink>
        <NavLink to="newsletter">
          <FaEnvelope /> <span>Newsletter</span>
        </NavLink>
        <NavLink to="settings">
          <FaCog /> <span>Settings</span>
        </NavLink>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt /> <span>Logout</span>
      </button>
    </aside>
  );
};

export default EcomSidebar;