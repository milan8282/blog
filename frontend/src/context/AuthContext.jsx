import { createContext, useEffect, useMemo, useState } from "react";
import axiosInstance from "../services/axios";
import {
  clearAuthStorage,
  getToken,
  getUser,
  setToken,
  setUser
} from "../utils/storage";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(getToken());
  const [user, setUserState] = useState(getUser());
  const [loading, setLoading] = useState(true);

  const login = ({ token, user }) => {
    setToken(token);
    setUser(user);
    setTokenState(token);
    setUserState(user);
  };

  const logout = () => {
    clearAuthStorage();
    setTokenState(null);
    setUserState(null);
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const existingToken = getToken();
      const existingUser = getUser();

      if (!existingToken) {
        setLoading(false);
        return;
      }

      if (existingUser) {
        setTokenState(existingToken);
        setUserState(existingUser);
      }

      try {
        const response = await axiosInstance.get("/auth/me");
        setUser(response.data.data);
        setUserState(response.data.data);
        setTokenState(existingToken);
      } catch (error) {
        clearAuthStorage();
        setTokenState(null);
        setUserState(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const value = useMemo(() => {
    return {
      token,
      user,
      loading,
      isAuthenticated: Boolean(token && user),
      login,
      logout,
      setUserState
    };
  }, [token, user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;