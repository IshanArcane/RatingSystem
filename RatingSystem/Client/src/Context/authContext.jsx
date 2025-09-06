import React, { createContext, useState, useEffect } from "react";
import authService from "../Services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authData, setAuthData] = useState(null);

  // try to fetch current user (if server exposes /auth/me, else rely on login response)
  useEffect(() => {
    // Optionally call an endpoint to verify token & get user
    // authService.getProfile().then(u => setUser(u)).catch(()=>setUser(null));
  }, []);

  const login = async (credentials) => {
    const res = await authService.login(credentials);
    setUser(res.user);
    setAuthData(res);
    return res;
  };

  const register = async (payload) => {
    const res = await authService.register(payload);
    setUser(res.user);
    setAuthData(res);
    return res;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setAuthData(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, authData, setAuthData, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
