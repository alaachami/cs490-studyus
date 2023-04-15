import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth";
import { useGroupContext } from "../../contexts/group";

import GroupForm from  "./CreateForm/createForm";
import "./Dashboard.css";

export default function DashBoard() {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuthContext();
  const { myGroups, foundGroups, fetchMyGroups, searchForGroups, addToGroup, createGroup } = useGroupContext();
  const [searchText, setSearchText] = useState("");
  const [ form, setForm] = useState("false")

  const handleSearchTextChange = (event) => {
    const query = event.target.value;
    setSearchText(query);
    searchForGroups(query);
  };

  const handleJoinGroup = (groupId) => {
    addToGroup(groupId, user.email);
  };

  const logout = () => {
    logoutUser();
    navigate("/");
  };

  const  handleCreateGroup = () => {
        navigate('/groupform')
  }


  useEffect(() => {
    // This effect runs whenever myGroups changes
  }, [myGroups]);

  // useEffect to fetch groups on initial load
  useEffect(() => {
    fetchMyGroups();
    //newFetchTeamsTableData();
    //setIsLoading(false);
  }, []);

  const renderedMyGroups = myGroups && myGroups.map((group) => (
    <div key={group.id}>
      <Link to={'/group/' + group.id}><h2>{group.name}</h2></Link>
      <p>{group.description}</p>
      {/* Add any other group information here */}
    </div>
  ));
  
  const renderedFoundGroups = foundGroups && foundGroups.map((group) => (
    <div key={group.id}>
      <Link to={'/groups/' + group.id}><h2>{group.name}</h2></Link>
      <p>{group.description}</p>
      <button onClick={() => handleJoinGroup(group.id)}>Join Group</button>
      {/* Add any other group information here */}
    </div>
  ));

  
  return (
    <div className="dashboard">
      <h1>Dashboard, hello {user.name}</h1>
      <button onClick={logout}>Logout</button>
      <button onClick={handleCreateGroup}> Create Group </button> 
                
        

      {renderedMyGroups}

      <div className="search-area">
        <input type="text" onChange={handleSearchTextChange} placeholder="Search for groups" />
      </div>

      {foundGroups[0] && searchText.length > 0 ? renderedFoundGroups : <h1>No groups found</h1>}
    </div>
  );
}
