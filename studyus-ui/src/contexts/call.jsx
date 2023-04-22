import React, { createContext, useContext, useState, useEffect } from "react";
import ApiClient from "../services/apiClient";

const CallContext = createContext({});

// context to keep track of a users teams, the current team selected, and whether or not the teamModal should be displayed.
export const CallContextProvider = ({ children }) => {
  const [ url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const setCallUrl = async (name) => {
    setIsLoading(true);
    setError(null);
    const { data } = await ApiClient.startCall(name);
    if (data){
        return data.url;
    } else if (error) {
        setError(error);
    }
    setIsLoading(false);
  };


  const clearCallContext = () => {
    setIsLoading(false);
    setError(null);
  };

  const callValue = {
    setCallUrl,
    setUrl,
    url,
    isLoading,
    error,
    clearCallContext
  };

  return (
    <CallContext.Provider value={callValue}>
      <>{children}</>
    </CallContext.Provider>
  );
};

export const useCallContext = () => useContext(CallContext);