import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
	return (
        <>
        <h1>Landing page</h1>
        <h2>
        <Link to="/register">Click here to sign up!</Link>
        </h2>
        <h2>
        <Link to="/login">Click here to log in!</Link>
        </h2>
        </>
	);
}