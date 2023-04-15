import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useGroupContext } from "../../contexts/group";
import { useAuthContext } from "../../contexts/auth";
import "./GroupPage.css";


export default function GroupPage() {
        const { members, setMembers, fetchMembers, leaveGroup } = useGroupContext();
        const { user } = useAuthContext();
        const { id } = useParams()

        const handleLeaveGroup = (id, user) => {
                leaveGroup( id, user.email);      
              };
        const renderedMembers = members && members.map((member) => (
                
                <div className="member" key={member.id}>
                  <div className="member-name">{member.name}</div>
                  <p>{member.email}</p>
                  
                </div>
              ));
        
        useEffect(() => {
        // This effect runs whenever members changes
        }, []);
        
        // useEffect to fetch groups on initial load
        useEffect(() => {
                fetchMembers(id);
        }, []);

	return (
        <>
                <div className = "logo">
                        <h1>StudyUs</h1>
                </div>
                <div className="banner">
                        <h1>cs100</h1>
                        <button onClick={handleLeaveGroup(id, user)}>Leave Group </button> 
                </div>

                <div className="members-cont">{renderedMembers}</div>
                

        </>
	);
}