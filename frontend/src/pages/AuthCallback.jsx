// src/pages/AuthCallback.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.slice(1)); // remove '#' at beginning

    const idToken = params.get('id_token');

    if (idToken) {
      // Save the token locally (cookie or localStorage or context)
      localStorage.setItem('id_token', idToken);

      // Optionally: you can decode it with jwt-decode if needed

      // Redirect to desired page
      navigate('/'); // or '/dashboard', etc.
    } else {
      console.error('❌ No token found in URL');
    }
  }, [navigate]);

  return (
    <div>
      <h2>Signing in...</h2>
    </div>
  );
};

export default AuthCallback;
