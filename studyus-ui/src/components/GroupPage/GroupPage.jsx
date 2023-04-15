import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useGroupContext } from "../../contexts/group";
import "./GroupPage.css";


export default function GroupPage() {
        const { members, setMembers, fetchMembers } = useGroupContext();
        const { id } = useParams()

        const renderedMembers = members && members.map((member) => (
                
                <div key={member.id}>
                  <h2>{member.name}</h2>
                  <p>{member.email}</p>
                </div>
              ));
        
        useEffect(() => {
        // This effect runs whenever members changes
        }, [members]);
        
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
                </div>
                {renderedMembers}
                

        </>
	);
}