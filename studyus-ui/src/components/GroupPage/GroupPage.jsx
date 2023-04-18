import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGroupContext } from "../../contexts/group";
import { useAuthContext } from "../../contexts/auth";
import "./GroupPage.css";
import { useChatContext } from "../../contexts/chat";

export default function GroupPage() {
  const { groupMessages, fetchGroupMessages, postMessage} = useChatContext();
  const { members, setMembers, fetchMembers, leaveGroup, fetchGroupById } = useGroupContext();
  const { user } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState("");
  const [groupName, setgroupName] = useState("");

  const handleLeaveGroup = (id, user) => {
    leaveGroup(id, user.email);
    navigate("/dashboard");
  };

  const getGroupName = (id) => {
        console.log("GROUPPP: "+ fetchGroupById(id));
        setgroupName(fetchGroupById(id).name);
      };
    


  const renderedMembers =
    members &&
    members.map((member) => (
      <div className="member" key={member.id}>
        <div
          className="member-p"
          style={{ background: `url(https://cdn.onlinewebfonts.com/svg/img_264157.png})` }}
        ></div>
        <div className="member-details">
          <div className="member-name">{member.name}</div>
          <div className="member-email">{member.email}</div>
        </div>
      </div>
    ));

        const renderedMessages =
        groupMessages &&
        groupMessages.map((message) => {
    // Convert timestamp to Date object
    const timestamp = new Date(message.timestamp);
    // Get individual date components
    const month = String(timestamp.getMonth() + 1).padStart(2, "0");
    const day = String(timestamp.getDate()).padStart(2, "0");
    const year = timestamp.getFullYear();
    const hours = String(timestamp.getHours()).padStart(2, "0");
    const minutes = String(timestamp.getMinutes()).padStart(2, "0");
    // Format the timestamp
    const formattedTimestamp = `${month}/${day}/${year} - ${hours}:${minutes}`;

    return (
      <div className="message" key={message.id}>
        <div className="message-header">
        <p className="member-p"
          style={{ background: `url(https://cdn.onlinewebfonts.com/svg/img_264157.png})` }}></p>
        <p className="sender-name">{message.name}</p>
        <p className="timestamp">{formattedTimestamp}</p>
        </div>
        <p className="content">{message.message}</p>
        <hr className="divider" />
      </div>
    );
  }).reverse();


    const handleSendMessage = () => {
        if (newMessage) {
          postMessage(id, user.id, newMessage);
          setNewMessage("");
        }
      };
      
      const handleKeyPress = (e) => {
        if (e.key === "Enter") {
          e.preventDefault(); // Prevent page refresh
          handleSendMessage();
        }
      };
      

  useEffect(() => {
    // This effect runs whenever members changes
  }, []);

  // useEffect to fetch groups on initial load
  useEffect(() => {
    getGroupName(id);
    fetchMembers(id);
    fetchGroupMessages(id);
  }, []);

  return (
    <>
      <div className="logo">
        <h1>StudyUs</h1>
      </div>
      <div className="banner">
        <h1>{groupName}</h1>
        <div class="functions-cont">
          <img
            src="https://img.icons8.com/ios/512/exit--v1.png"
            onClick={() => handleLeaveGroup(id, user)}
            height="20"
            width="20"
          ></img>
          <span class="leave-group-msg">Leave Group</span>
        </div>
      </div>

      <div className="members-cont">{renderedMembers}</div>
      
        <div className="messages-container">
          {renderedMessages}
          <form className="message-form">
                <input
                type="text"
                className="message-input"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                />
                <button
                type="button"
                className="send-button"
                onClick={() => handleSendMessage(id, user)}
                >
                Send
                </button>
        </form>
        
      </div>
    </>
  );
}
