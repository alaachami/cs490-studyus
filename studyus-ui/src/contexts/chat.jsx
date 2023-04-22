import React, { createContext, useContext, useState, useEffect } from "react";
import ApiClient from "../services/ApiClient";
import { useParams } from "react-router-dom"; 
import { useAuthContext } from "./auth";

const ChatContext = createContext({});

// context to keep track of a users teams, the current team selected, and whether or not the teamModal should be displayed.
export const ChatContextProvider = ({ children }) => {
  const [groupMessages, setGroupMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { user} = useAuthContext();
  const userId = user.id;

  const fetchGroupMessages = async (groupId) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await ApiClient.fetchMessages(groupId);
      setGroupMessages(data.chatList);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  const postMessage = async (id, userId, content ) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await ApiClient.sendMessage(id, userId, content);
      if (data) { 
        fetchGroupMessages(id);
      }
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  // useEffect to fetch groups on initial load
  useEffect(() => {
    fetchGroupMessages();
  }, []);

  const clearChatContext = () => {
    setIsLoading(false);
    setError(null);
  };

  const chatValue = {
    groupMessages,
    setGroupMessages,
    fetchGroupMessages,
    postMessage,
    isLoading,
    error,
    clearChatContext
  };

  return (
    <ChatContext.Provider value={chatValue}>
      <>{children}</>
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);