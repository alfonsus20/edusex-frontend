import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authLogin, authRegister } from "../api-fetch/auth";
import { getProfile } from "../api-fetch/profile";
import useError from "../hooks/useError";
import {
  removeAuthToken,
  removeRole,
  setAuthToken,
  setDefaultToken,
  setRole,
} from "../utils/helper";

const defaultValue = {
  isAuthenticated: false,
  userInfo: {},
  login: () => {},
  register: () => {},
  logout: () => {},
  isSubmitting: false,
  fetchProfile: () => {},
};

export const AuthContext = createContext(defaultValue);

export const AuthWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleError } = useError();

  const login = async (loginData) => {
    try {
      setIsSubmitting(true);
      const { data } = await authLogin(loginData);
      setUserInfo(data.data.user);
      setAuthToken(data.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const register = async (registerData) => {
    try {
      setIsSubmitting(true);
      const { data } = await authRegister(registerData);
      setUserInfo(data.data.user);
      setAuthToken(data.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchProfile = async () => {
    try {
      const { data } = await getProfile();
      setUserInfo(data.data);
      setRole(data.data.role);
    } catch (error) {
      console.log({ error });
    }
  };

  useMemo(() => {
    if (!!localStorage.getItem("token")) {
      setIsAuthenticated(true);
      setDefaultToken();
      setUserInfo({ role: localStorage.getItem("role") });
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated]);

  const logout = () => {
    setIsAuthenticated(false);
    removeAuthToken();
    removeRole();
    setUserInfo({});
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        logout,
        fetchProfile,
        isAuthenticated,
        userInfo,
        isSubmitting,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
