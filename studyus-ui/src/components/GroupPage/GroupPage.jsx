import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useGroupContext } from "../../contexts/group";
import { useAuthContext } from "../../contexts/auth";
import "./GroupPage.css";
import { useChatContext } from "../../contexts/chat";


export default function GroupPage() {
        const { groupMessages, fetchGroupMessages, sendMessage } = useChatContext();
        const { members, setMembers, fetchMembers, leaveGroup, setCurrentGroupId } = useGroupContext();
        const { user } = useAuthContext();
        const { id } = useParams()
        const navigate = useNavigate();

        const handleLeaveGroup = (id, user) => {
                leaveGroup(id, user.email);  
                navigate('/dashboard');
        };


        const renderedMembers = members && members.map((member) => (
                
                <div className="member" key={member.id}>
                  <div className="member-name">{member.name}</div>
                  <p>{member.email}</p>
                  
                </div>
        ));
        const renderedMessages = groupMessages && groupMessages.map((message) => (
                <div className="message" key={message.id}>
                        <p className="sender-name">{message.name}</p>
                        <p className="timestamp">{message.timestamp}</p>
                        <p className="content">{message.message}</p>
                </div>
        ));
        
        useEffect(() => {
        // This effect runs whenever members changes
        }, []);
        
        // useEffect to fetch groups on initial load
        useEffect(() => {
                fetchMembers(id);
                fetchGroupMessages(id)
        }, []);

	return (
        <>
                <div className = "logo">
                        <h1>StudyUs</h1>
                </div>
                <div className="banner">
                        <h1>cs100</h1>
                        <button onClick={() => handleLeaveGroup(id, user)}>Leave Group</button> 
                </div>

                <div className="members-cont">{renderedMembers}</div>
                <div className="messages-cont">{renderedMessages}</div>
                

        </>
	);
}