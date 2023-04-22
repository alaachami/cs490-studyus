import React, { createContext, useContext, useState, useNavigate } from "react";
import ApiClient from "../services/apiClient";
const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [initialized, setInitialized] = useState(false);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState();

  const loginUser = async () => {
    setIsProcessing(true);
    const { data, error } = await ApiClient.login(credentials);
    if (data) {
      setUser(data.user);
      ApiClient.setToken(data.token);
      localStorage.setItem("studyus_token", data.token);
    }
    if (error) setError(error);
    setIsProcessing(false);
  };

  const signupUser = async () => {
    setIsProcessing(true);
    const { data, error } = await ApiClient.signup(credentials);
    if (data) {
      setUser(data.user);
      ApiClient.setToken(data.token);
      localStorage.setItem("studyus_token", data.token);
    }
    if (error) setError(error);
    setIsProcessing(false);
  };

  const fetchUserFromToken = async () => {
    setIsProcessing(true);
    const { data } = await ApiClient.fetchUserFromToken();
    if (data) {
      setUser(data.user);
    }
    setInitialized(true);
    setIsProcessing(false);
  };

  const logoutUser = async () => {
    setIsProcessing(true);
    setUser({});
    setInitialized(true);
    setError(null);
    setIsProcessing(false);
    ApiClient.logoutUser();
  };

  const authValue = {
    user,
    setUser,
    isProcessing,
    setIsProcessing,
    setError,
    initialized,
    setInitialized,
    error,
    loginUser,
    signupUser,
    fetchUserFromToken,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authValue}>
      <>{children}</>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
