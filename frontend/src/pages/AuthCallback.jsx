// src/pages/AuthCallback.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🟡 AuthCallback mounted");

    const fullUrl = window.location.href;
    const hash = window.location.hash;
    console.log("➡️ Full URL:", fullUrl);
    console.log("➡️ Hash:", hash);

    const params = new URLSearchParams(hash.slice(1)); // remove the '#' character
    const idToken = params.get('id_token');

    if (idToken) {
      console.log('✅ Token found:', idToken);
      localStorage.setItem('id_token', idToken);

      setTimeout(() => {
        console.log('➡️ Redirecting to /');
        navigate('/');
      }, 2000); // Delay redirect to ensure logs are visible
    } else {
      console.error('❌ No id_token found in URL hash:', hash);
    }
  }, [navigate]);

  return (
    <div>
      <h2>Signing in...</h2>
      <p>Please wait while we complete the authentication...</p>
    </div>
  );
};

export default AuthCallback;
