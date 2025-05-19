import React, { createContext, useState, useContext, useEffect } from "react";
import { loginUser } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = async (phoneNumber, pin) => {
    setLoading(true);
    try {
      const userData = await loginUser(phoneNumber, pin);

      const userInfo = userData?.data?.data;

      if (userInfo?.authenticated) {
        const userDataToStore = {
          ...userInfo,
          id: userInfo.id,
        };

        // Store user data in localStorage on successful login
        localStorage.setItem("user", JSON.stringify(userDataToStore));

        setUser(userDataToStore);
        setIsAuthenticated(true);
        return true;
      } else {
        setIsAuthenticated(false);
        setUser(null);
        return false;
      }
    } catch (error) {
      console.error("Login failed:", error);
      setIsAuthenticated(false);
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // const logout = () => {
  //   // Remove user data from localStorage when logging out
  //   localStorage.removeItem("user");

  //   setIsAuthenticated(false);
  //   setUser(null);
  // };

  const value = {
    isAuthenticated,
    user,
    userId: user?.id || null,
    login,
    // logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
