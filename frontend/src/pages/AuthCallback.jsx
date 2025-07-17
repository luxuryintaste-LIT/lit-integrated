// src/pages/AuthCallback.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const decodeJwt = (token) => {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return decoded;
    } catch (err) {
      console.error('❌ Failed to decode JWT:', err);
      return null;
    }
  };

  useEffect(() => {
    console.log("🟡 AuthCallback mounted");

    const hash = window.location.hash;
    const params = new URLSearchParams(hash.slice(1));
    const idToken = params.get('id_token');

    if (idToken) {
      console.log('✅ Token found:', idToken);
      localStorage.setItem('id_token', idToken);

      const decodedUser = decodeJwt(idToken);
      console.log("👤 Decoded User Info:", decodedUser);
      setUser(decodedUser);

      // Optional: Store in localStorage
      localStorage.setItem('user_info', JSON.stringify(decodedUser));

      setTimeout(() => {
        console.log('➡️ Redirecting to /');
        navigate('/');
      }, 3000);
    } else {
      console.error('❌ No id_token found in URL hash');
    }
  }, [navigate]);

  return (
    <div>
      <h2>Signing in...</h2>
      <p>Please wait while we complete the authentication...</p>
      {user && (
        <div style={{ marginTop: '20px' }}>
          <h3>Welcome, {user.name || user.given_name || "User"}!</h3>
          <p>Email: {user.emails?.[0]}</p>
        </div>
      )}
    </div>
  );
};

export default AuthCallback;
