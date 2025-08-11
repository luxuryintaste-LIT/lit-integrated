import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt, FaChartLine, FaBoxOpen, FaTags, FaWarehouse,
  FaShoppingCart, FaDollarSign, FaUsers, FaEnvelope, FaCog, FaSignOutAlt
} from "react-icons/fa";
import "./EcomSidebar.css";

const EcomSidebar = () => {
  return (
    <aside className="ecom-sidebar">
      <h2 className="sidebar-title">Ecom Admin</h2>
      <nav className="sidebar-nav">
        <NavLink to="/admin/ecomDashboard" end><FaTachometerAlt /> Dashboard</NavLink>
        <NavLink to="analytics"><FaChartLine /> Analytics</NavLink>
        <NavLink to="products"><FaBoxOpen /> Products</NavLink>
        <NavLink to="offers"><FaTags /> Offers</NavLink>
        <NavLink to="inventory"><FaWarehouse /> Inventory</NavLink>
        <NavLink to="orders"><FaShoppingCart /> Orders</NavLink>
        <NavLink to="sales"><FaDollarSign /> Sales</NavLink>
        <NavLink to="customers"><FaUsers /> Customers</NavLink>
        <NavLink to="newsletter"><FaEnvelope /> Newsletter</NavLink>
        <NavLink to="settings"><FaCog /> Settings</NavLink>
      </nav>
      <button className="logout-btn"><FaSignOutAlt /> Logout</button>
    </aside>
  );
};

export default EcomSidebar;
