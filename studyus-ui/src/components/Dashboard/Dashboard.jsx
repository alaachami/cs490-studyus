import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth";
import "./Dashboard.css";

export default function DashBoard() {
        const navigate = useNavigate();
        const { user, logoutUser } = useAuthContext();
        const logout = () => {
                // Later on, add functions to clear other contexts (when they are made)
                logoutUser();
                navigate("/");
        };

	return (
        <div className="dashboard">
        
        <h1>Dashboard, hello {user.name}</h1>
        <button onClick={logout}>Logout</button>

        </div>
	);
}