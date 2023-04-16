import React, { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../services/apiClient";

const ChatContext = createContext({}); // Was originally null

// context to keep track of a users teams, the current team selected, and whether or not the teamModal should be displayed.
export const ChatContextProvider = ({ children }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [members, setMembers] = useState([]);

  const clearGroups = () => {
    setMyGroups([]);
  };

  const fetchGroupMessages = async () => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await apiClient.fetchMessages();
    if (data) {
      setMyGroups(data.groupList);
      if (data.groupList.length > 0) {
        setCurrentGroup(data.groupList[0]);
      }
    } else if (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  const createGroup = async () => {
  }
  
  const searchForGroups = async (query) => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await apiClient.searchForGroups(query);
    if (data) {
      setFoundGroups(data.groupList);
      // if (data.groupList.length > 0) {
      //   setCurrentTeam(data.teamList[0]);
      // }
    } else if (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  const leaveGroup = async (groupId, userEmail) => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await apiClient.leaveGroup(groupId,userEmail);
    if (data) {
      fetchMyGroups();
    } else if (error) {
      setError(error);
    }
    setIsLoading(false);
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
    // Export everything here
  };

  return (
    <GroupContext.Provider value={chatValue}>
      <>{children}</>
    </GroupContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);