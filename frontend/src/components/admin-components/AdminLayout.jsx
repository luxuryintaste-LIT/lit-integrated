import React from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from "../../context/context-admin/AuthContext";

import { FaSignOutAlt, FaArrowLeft, FaColumns } from 'react-icons/fa';
import './AdminLayout.css';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();
    
    
    const showBackButton = location.pathname !== '/admin/dashboard';

    const isDashboard =
  location.pathname === '/admin/dashboard' ||
  location.pathname === '/admin/ecomDashboard';

   
    const panelType = sessionStorage.getItem('adminPanelType');
    const dashboardPath = panelType === 'ecom' ? '/admin/ecomDashboard' : '/admin/dashboard';

    return (
        <div className="admin-layout-container">
            <header className="admin-header-bar">
                <div className="header-left-actions">
                    {/* Show Back button if not on dashboard */}
                    {showBackButton && (
                        <button onClick={() => navigate(-1)} className="header-btn back-btn">
                            <FaArrowLeft />
                            <span>Back</span>
                        </button>
                    )}
                    {/* Show Dashboard link if not on dashboard */}
{!isDashboard && (
  <Link to={dashboardPath} className="header-btn dashboard-link-btn">
    <FaColumns />
    <span>Dashboard</span>
  </Link>
)}


                </div>
                
                {/* <button onClick={logout} className="header-btn logout-btn">
                    <span>Logout</span>
                    <FaSignOutAlt />
                </button> */}

 {/* <button
  onClick={() => {
    sessionStorage.removeItem('adminAuthenticated');
    sessionStorage.removeItem('currentUser');

    if (location.pathname.startsWith('/admin/ecomDashboard')) {
      window.location.href = '/shop'; // Still use full reload for external
    } else {
      navigate('/newsletter'); // ✅ Smooth client-side redirect
    }
  }}
  className="header-btn logout-btn"
>
  <span>Logout</span>
  <FaSignOutAlt />
</button> */}

<button
  onClick={() => {
    if (location.pathname.startsWith('/admin/ecomDashboard')) {
      logout('/shop', navigate); // ✅ Go to shop
    } else {
      logout('/newsletter', navigate); // ✅ Go to newsletter
    }
  }}
  className="header-btn logout-btn"
>
  <span>Logout</span>
  <FaSignOutAlt />
</button>



            </header>
            <main className="admin-content-area">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;