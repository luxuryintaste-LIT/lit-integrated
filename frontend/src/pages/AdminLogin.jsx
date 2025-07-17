import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/context-admin/AuthContext';
import '../styles/AdminLogin.css'; //  CSS stays imported here

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  // const params = new URLSearchParams(location.search);
  // const redirectParam = params.get('redirect');

  // let redirectPath = '/admin/dashboard';
  // if (redirectParam === 'ecommerce') {
  //   redirectPath = '/admin/ecomDashboard';
  // }

  // Get ?redirect= from the URL
let redirectParam = new URLSearchParams(location.search).get('redirect');

// If not found in URL, check sessionStorage
if (!redirectParam) {
  redirectParam = sessionStorage.getItem('redirectAfterLogin');
} else {
  sessionStorage.setItem('redirectAfterLogin', redirectParam);
}

// Decide where to go
let redirectPath = '/admin/dashboard';
if (redirectParam === 'ecommerce') {
  redirectPath = '/admin/ecomDashboard';
}


  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate(redirectPath);
  //   }
  // }, [isAuthenticated, navigate, redirectPath]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

//   if (success) {
//   console.log("Redirecting to:", redirectPath); // ✅ This will help you confirm
//   navigate(redirectPath);
// }

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    const success = login(credentials.email, credentials.password);
    if (success) {
      navigate(redirectPath);
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h1>Admin Login</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;  