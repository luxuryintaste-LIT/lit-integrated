import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGlobe, FaEnvelopeOpenText } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  // ✅ Mark the panel as newsletter
  useEffect(() => {
    sessionStorage.setItem('adminPanelType', 'newsletter');
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Content Management Hub</h1>
      <p className="dashboard-subtitle">Select a content stream to begin.</p>
      <div className="dashboard-grid">
        <Link to="/admin/website" className="dashboard-card" style={{ animationDelay: '100ms' }}>
          <FaGlobe className="dashboard-icon" />
          <h2>Website Content</h2>
          <p>Manage articles for Domestic and International regions.</p>
        </Link>
        <Link to="/admin/mail" className="dashboard-card" style={{ animationDelay: '200ms' }}>
          <FaEnvelopeOpenText className="dashboard-icon" />
          <h2>Mail Content</h2>
          <p>Manage content for all mails.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;