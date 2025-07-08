import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AuthContext = createContext(null);

// Load initial admin user list from localStorage
const getInitialUsers = () => {
  try {
    const savedUsers = localStorage.getItem('adminUsers');
    if (savedUsers) {
      return JSON.parse(savedUsers);
    }
  } catch (error) {
    console.error("Could not parse users from localStorage", error);
  }

  return [
    {
      id: uuidv4(),
      email: (import.meta.env.VITE_ADMIN_EMAIL).toLowerCase(),
      password:( import.meta.env.VITE_ADMIN_PASSWORD),
    }
  ];
};

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(getInitialUsers);

  // Now use *sessionStorage* for currentUser so session expires on browser close
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = sessionStorage.getItem('currentUser');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // Persist admin users list in localStorage (so user DB survives across reloads)
  useEffect(() => {
    localStorage.setItem('adminUsers', JSON.stringify(users));
  }, [users]);

  // Persist current user in *sessionStorage*
  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
      sessionStorage.setItem('adminAuthenticated', 'true');
    } else {
      sessionStorage.removeItem('currentUser');
      sessionStorage.removeItem('adminAuthenticated');
    }
  }, [currentUser]);

  // Login logic
  const login = (email, password) => {
    const userToLogin = users.find(
      user => user.email === email.toLowerCase() && user.password === password
    );
    if (userToLogin) {
      setCurrentUser(userToLogin);
      return true;
    }
    return false;
  };

  // Signup logic
  const signup = (email, password) => {
    const emailExists = users.some(user => user.email === email.toLowerCase());
    if (emailExists) {
      return { success: false, message: 'An account with this email already exists.' };
    }
    const newUser = { id: uuidv4(), email: email.toLowerCase(), password };
    setUsers(prevUsers => [...prevUsers, newUser]);
    setCurrentUser(newUser);
    return { success: true };
  };

  // Logout logic
  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    isAuthenticated: !!currentUser,
    login,
    signup,
    logout,
    currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
