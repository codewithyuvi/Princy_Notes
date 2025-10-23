import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // optional to show spinner while checking

  useEffect(() => {
    // On app load, check if user is logged in
    const checkLogin = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/getCurrentAdmin`, {
          withCredentials: true,
        });
        if (res.status === 200) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch {
        setAuthenticated(false);
      }
      setLoading(false);
    };

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
