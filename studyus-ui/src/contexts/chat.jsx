import React, { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../services/apiClient";
import { useGroupContext } from "./group";

const ChatContext = createContext({}); // Was originally null

// context to keep track of a users teams, the current team selected, and whether or not the teamModal should be displayed.
export const ChatContextProvider = ({ children }) => {
  const [groupMessages, setGroupMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGroupMessages = async (groupId) => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await apiClient.fetchMessages(groupId);
    if (data) {
      setGroupMessages(data.chatList)
    } else if (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  const postMessage = async (content) => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await apiClient.sendMessage();
  };
  

  // useEffect to fetch groups on initial load
  useEffect(() => {
    fetchGroupMessages();
    setIsLoading(false);
  }, []); 


  const clearChatContext = () => {
    setIsLoading(false);
    setError(null);
  };

  const chatValue = {
    groupMessages,
    setGroupMessages,
    fetchGroupMessages,
    postMessage
  };

  return (
    <ChatContext.Provider value={chatValue}>
      <>{children}</>
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);