import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth";
import { useGroupContext } from "../../contexts/group";

import GroupForm from  "./CreateForm/createForm";
import "./Dashboard.css";

export default function DashBoard() {
    const navigate = useNavigate();
    const { user, logoutUser } = useAuthContext();
    const { myGroups, foundGroups, fetchMyGroups, searchForGroups, addToGroup, checkIfGroupFull, fetchMembers, suggestGroups} = useGroupContext();
    const [searchText, setSearchText] = useState("");
    const [suggestedGroups, setSuggestedGroups] = useState([]);
    
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

    const handleCreateGroup = () => {
          navigate('/groupform')
    }

    const checkGroup = () => {
      let res = "";
      if (checkIfGroupFull === fetchMembers.length){
          res = "Full Group";
      } else{
          res = "Join Group";
      }
      return res;

    };


  useEffect(() => {
    // This effect runs whenever myGroups changes
  }, [myGroups]);

  // useEffect to fetch groups on initial load
  useEffect(() => {
    fetchMyGroups();
    suggestGroups().then((groups) => {
      setSuggestedGroups(groups);
    });
    //newFetchTeamsTableData();
    //setIsLoading(false);
  }, []);

  const renderedMyGroups = myGroups && myGroups.map((group) => (
    <div className="group" key={group.id}>
      <Link className= "link" to={'/group/' + group.id}><h5>{group.name} - {group.subject}</h5></Link>
      <p>{group.description}</p>
      {/* Add any other group information here */}
    </div>
  ));
  
  const renderedFoundGroups = foundGroups && foundGroups.map((group) => (
    <div key={group.id}>
      <Link to={'/group/' + group.id}><h2>{group.name}</h2></Link>
      <p>{group.description}</p>
      <button onClick={() => handleJoinGroup(group.id)}>{checkGroup()}</button>
      {/* Add any other group information here */}
    </div>
  ));

  const renderedSuggestedGroups = suggestedGroups && suggestedGroups.map((group) => (
    <div className="group" key={group.id}>
        <Link className= "link" to={'/group/' + group.id}><h5>{group.name} - {group.subject}</h5></Link>
        <p>{group.description}</p>
        <button onClick={() => handleJoinGroup(group.id)}>{checkGroup()}</button>
        {/* Add any other group information here */}
    </div>
));

  
  return (
    <>
    <div className="logo"><h1>StudyUs</h1></div> 
    <div className="dashboard">
        <div className="banner"><h1>Dashboard</h1>
          <div className="functions-cont">
            <img src="https://img.icons8.com/ios/512/exit--v1.png" onClick={logout} height="20"width="20"></img>Logout
            <img src="https://img.icons8.com/windows/512/add-user-group-woman-man.png" onClick={handleCreateGroup} height="20"width="20"></img>Create Group
          </div>
        </div>
        <div className="main-cont">
          <div className="group-cont">
            <h2>Groups</h2>
            {renderedMyGroups}
            <h3>Suggestions</h3>
            {renderedSuggestedGroups}
            
          </div>
          <div className="main">
            <div className="greeting">
              <h1>Hello, {user.name}!</h1>
            </div>
            <div className="search-area">
            <h3>Find New Group</h3>
              <input type="text" onChange={handleSearchTextChange} placeholder="Search for groups" />
            </div>
          {foundGroups[0] && searchText.length > 0 ? renderedFoundGroups : <h3></h3>}
        </div>
        </div>
    </div>
    </>
  );
}
