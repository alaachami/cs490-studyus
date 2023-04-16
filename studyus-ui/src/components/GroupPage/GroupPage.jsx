import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGroupContext } from "../../contexts/group";
import { useAuthContext } from "../../contexts/auth";
import "./GroupPage.css";

export default function GroupPage() {
  const { members, setMembers, fetchMembers, leaveGroup } = useGroupContext();
  const { user } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleLeaveGroup = (id, user) => {
    leaveGroup(id, user.email);
    navigate("/dashboard");
  };

  const renderedMembers =
    members &&
    members.map((member) => (
      <div className="member" key={member.id}>
        <div className="member-p" style={{background: `url(https://cdn.onlinewebfonts.com/svg/img_264157.png})`}}></div>
        <div className="member-details">
          <div className="member-name">{member.name}</div>
          <div className="member-role">{member.email}</div>
        </div>
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
      <div className="logo">
        <h1>StudyUs</h1>
      </div>
      <div className="banner">
        <h1>cs100</h1>
        <div class="functions-cont">
    <img src="https://img.icons8.com/ios/512/exit--v1.png" onClick= {() => handleLeaveGroup(id, user)} height="20" width="20" ></img>
    <span class="leave-group-msg">Leave Group</span>
</div>
      </div>

      <div className="members-cont">{renderedMembers}</div>
    </>
  );
}