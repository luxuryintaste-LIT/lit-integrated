// src/pages/AuthCallback.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/api'; // ✅ import the function

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
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.slice(1));
    const idToken = params.get('id_token');

    if (idToken) {
      console.log('✅ Token found:', idToken);
      localStorage.setItem('id_token', idToken);

      const decodedUser = decodeJwt(idToken);
      if (!decodedUser) return;

      console.log("👤 Decoded User Info:", decodedUser);
      setUser(decodedUser);

      // Save to localStorage and sessionStorage
      localStorage.setItem('user_info', JSON.stringify(decodedUser));
      sessionStorage.setItem('user_info', JSON.stringify(decodedUser));

      // Call backend to store user in DB
      const userData = {
        provider: decodedUser.oid || decodedUser.sub,
        name: decodedUser.name || decodedUser.given_name,
        email: decodedUser.emails?.[0] || decodedUser.email,
      };

      console.log(userData)

      createUser(userData)
        .then(res => console.log("✅ User stored in DB:", res))
        .catch(err => console.error("❌ Failed to store user in DB:", err));

      // Redirect after short delay
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
