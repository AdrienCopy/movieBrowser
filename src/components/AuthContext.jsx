import React, { createContext, useState, useEffect } from 'react';
import { fetchUserInfo } from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(localStorage.getItem('session_id'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (sessionId) {
      fetchUserInfo(sessionId).then(data => {
        setUser(data);
      }).catch(error => console.error('Error fetching user data:', error));
    }
  }, [sessionId]);

const login = (sessionId) => {
    localStorage.setItem('session_id', sessionId);
    setSessionId(sessionId);
  };

const logout = () => {
  localStorage.removeItem('session_id');
  setSessionId(null);
  setUser(null);
};

  return (
    <AuthContext.Provider value={{ sessionId, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
