import React, { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../services/apiClient";

const GroupContext = createContext({}); // Was originally null

// context to keep track of a users teams, the current team selected, and whether or not the teamModal should be displayed.
export const GroupContextProvider = ({ children }) => {
  const [myGroups, setMyGroups] = useState([]);
  const [foundGroups, setFoundGroups] = useState([]);
  const [groupModal, setGroupModal] = useState(false);
  const [currentGroup, setCurrentGroup] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [myGroupsTableData, setMyGroupsTableData] = useState([]);
  const [ids, setIds] = useState([]);
  const [members,setMembers]=useState([]);
  //const [tableData, setTableData] = useState([])

  const clearGroups = () => {
    setMyGroups([]);
  };

  const fetchMyGroups = async () => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await apiClient.listAllGroups();
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

  const addToGroup = async (groupId, userEmail) => {
    setIsLoading(true);
    setError(null);
    console.log("addToGroup groupdId: " + groupId)
    console.log("addToGroup email: " + userEmail)
    // GroupdId and Useremail are both correct here, but undefined when passed to function
    const { data, error } = await apiClient.addMemberToGroup(groupId, userEmail);
    if (data) {
      fetchMyGroups();
    } else if (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  

  // useEffect to fetch groups on initial load
  useEffect(() => {
    fetchMyGroups();
    setIsLoading(false);
  }, []); 

  // Function to get groups ids from array of groups
  const getGroupIds = (recievedGroups) => {
    let groupIds = [];
    recievedGroups?.map((group) => {
      groupIds.push(group.id);
    });
    return groupIds;
  };

  const fetchGroupMembers= async (groupId) => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await apiClient.fetchMemberList(groupId);
    if (data) {
      setMembers(data.groupData)
    } else if (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  const clearGroupContext = () => {
    setMyGroups([]);
    setGroupModal(false);
    setCurrentGroup({});
    setIsLoading(false);
    setError(null);
    setMyGroupsTableData([]);
    setIds([]);
  };

  const groupValue = {
    myGroups,
    setMyGroups,
    currentGroup,
    setCurrentGroup,
    fetchMyGroups,
    addToGroup,
    //fetchMyGroupsTableData,
    searchForGroups,
    //newFetchTeamsTableData,
    groupModal,
    setGroupModal,
    isLoading,
    myGroupsTableData,
    setMyGroupsTableData,
    clearGroups,
    //getData,
    foundGroups,
    setFoundGroups,
    clearGroupContext,
  };

  return (
    <GroupContext.Provider value={groupValue}>
      <>{children}</>
    </GroupContext.Provider>
  );
};

export const useGroupContext = () => useContext(GroupContext);