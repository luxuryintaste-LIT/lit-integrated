// C:\lit-integrated\frontend\src\pages\admin\EcomAdminDashboard.jsx

import React, { useState, useEffect } from 'react'; // Import useEffect
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import EcomSidebar from '../../components/EcommerceAdmin/EcomSidebar';

import '../../App.css';
import './EcomAdminDashboard.css';

const EcomAdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isDetailPage = location.pathname.includes('/products/') && location.pathname.split('/').length > 4;

  // This effect closes the sidebar automatically when the user navigates to a new page
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  return (
    <div className={`ecom-admin-layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <EcomSidebar />
      
      {/* The new overlay that closes the sidebar when clicked */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      <div className="ecom-admin-content">
        <div className="admin-header">
          {isDetailPage ? (
            <button className="page-back-button" onClick={() => navigate(-1)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              <span>Back</span>
            </button>
          ) : (
            <h1 className="dashboard-title">E-commerce Admin Dashboard</h1>
          )}

          {/* DYNAMIC HAMBURGER/CLOSE ICON */}
          <button className="mobile-menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? (
              // "X" (Close) Icon
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              // "Hamburger" (Menu) Icon
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default EcomAdminDashboard;