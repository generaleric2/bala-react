// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const storedAuth = localStorage.getItem('authState');
    return storedAuth ? JSON.parse(storedAuth) : { idToken: null, uid: null };
  });

  const setAuth = (idToken, uid) => {
    const newAuthState = { idToken, uid };
    setAuthState(newAuthState);
    localStorage.setItem('authState', JSON.stringify(newAuthState));
  };

  return (
    <AuthContext.Provider value={{ authState, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
