import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGroupContext } from "../../contexts/group";
import { useAuthContext } from "../../contexts/auth";
import { useCallContext } from "../../contexts/call";
import "./GroupPage.css";
import { useChatContext } from "../../contexts/chat";

// Exporting the GroupPage component
export default function GroupPage() {
  // Create a ref for the messages container element
  const messagesContainerRef = useRef(null);
  const { groupMessages, fetchGroupMessages, postMessage } = useChatContext();
  const {
    members,
    setMembers,
    fetchMembers,
    leaveGroup,
    fetchGroupById,
    groupName,
    setGroupName,
    setCallUrl,
    link,
    setlink,
  } = useGroupContext();
  const { user } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();
  // Initializing state for newMessage and setNewMessage using useState() hook
  const [newMessage, setNewMessage] = useState("");
  // const token = localStorage.getItem('token');
  // console.log("TOKENNN",token);

  // Defining handleLeaveGroup function with id and user parameters
  // Calling leaveGroup function with id and user.email arguments
  // Navigating to "/dashboard" path
  const handleLeaveGroup = (id, user) => { 
    leaveGroup(id, user.email); 
    navigate("/dashboard"); 
  };

  // Defining getGroupName function with id parameter
  const getGroupName = async (id) => { 
        /*console.log("GROUPPP: "+ fetchGroupById(id)); 
        // Setting groupName state with the name property of the result of fetchGroupById(id) function call
        setgroupName(fetchGroupById(id).name); */
        try {
          const group = await fetchGroupById(id);
          setgroupName(group);
        } catch (error) {
          // handle error
        }
      };
  // Rendering members
  // Mapping through members array and rendering JSX for each member    
  const renderedMembers = 
    members && 
    members.map((member) => ( 
      <div className="member" key={member.id}> 
        <div
          className="member-p"
          // style={{ background: `url(https://cdn.onlinewebfonts.com/svg/img_264157.png})` }}
        ></div> 
        <div className="member-details">
          <div className="member-name">{member.name}</div> 
          <div className="member-email">{member.email}</div> 
        </div>
      </div>
    ));

  // Rendering group messages
   // Mapping through groupMessages array and rendering JSX for each message
  const renderedMessages = 
    groupMessages && 
    groupMessages.map((message) => {
    // Convert timestamp to Date object
    const timestamp = new Date(message.timestamp);
    // Get individual date components
    // Getting month with leading zero
    const month = String(timestamp.getMonth() + 1).padStart(2, "0"); 
     // Getting day with leading zero
    const day = String(timestamp.getDate()).padStart(2, "0");
    // Getting year
    const year = timestamp.getFullYear(); 
    // Getting hours with leading zero
    const hours = String(timestamp.getHours()).padStart(2, "0"); 
    // Getting minutes with leading zero
    const minutes = String(timestamp.getMinutes()).padStart(2, "0"); 
    // Format the timestamp
    const formattedTimestamp = `${month}/${day}/${year} - ${hours}:${minutes}`;

    return (
      <div className="message" key={message.id}>
        <div className="message-header">
        <p className="member-p"
          // style={{ background: `url(https://cdn.onlinewebfonts.com/svg/img_264157.png})` }}
          ></p>
        <p className="sender-name">{message.name}</p>
        <p className="timestamp">{formattedTimestamp}</p>
        
        </div>
        <p className="content">{message.message}</p>
        <hr className="divider" />
      </div>
    );
  });

  // handles posting messages
    const handleSendMessage = () => {
        if (newMessage) {
          postMessage(id, user.id, newMessage);
          setNewMessage("");
        }
      };
      // handels enter press to send chat
      const handleKeyPress = (e) => {
       if (e.key === "Enter") {
          // Prevent page refresh
          e.preventDefault(); 
          handleSendMessage();
          }
        };
    
      const handleCall = async (id , user) => { 
          // Call setCallUrl function and wait for the result
          console.log(user.id);
          const url = await setCallUrl(String(user.id));
          console.log(url)
          postMessage(id, user.id, `${user.name} started a call, follow this link: ${url}`);
        
    }
      

  useEffect(() => {
    // This effect runs whenever members changes
  }, []);

  useEffect(() => {
    // This effect runs whenever new message changes
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }

  }, [postMessage, newMessage]);

  // useEffect to fetch groups on initial load
  useEffect(() => {
    //getGroupName(id);
    fetchGroupById(id);
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
        <div className="functions-cont">
          <img
            src="https://img.icons8.com/ios/512/exit--v1.png"
            onClick={() => handleLeaveGroup(id, user)}
            height="20"
            width="20"
          ></img>
          <span className="leave-group-msg">Leave Group</span>

          <img
            src="https://img.icons8.com/phone"
            onClick={() => handleCall(id, user)}
            height="21"
            width="21"
          ></img>
          <span className="leave-group-msg">Start Call</span>

        </div>
      </div>

      <div className="members-cont">{renderedMembers}</div>
      
        <div className="messages-container" ref={messagesContainerRef}>
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
