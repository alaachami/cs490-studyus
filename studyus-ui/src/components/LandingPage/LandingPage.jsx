import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <h1 className="landing-page-title" style={{ fontFamily: "Inter, sans-serif" }}>
        Join a community of motivated learners and unlock your academic potential.
      </h1>
      <p className="landing-page-description" style={{ fontFamily: "Inter, sans-serif" }}>
        Collaborate with peers, share resources, and stay motivated as you work towards your goals - all from the comfort of your own home.
      </p>
      <div className="landing-page-buttons-container">
        <Link to="/register" className="register-link" style={{ fontFamily: "Inter, sans-serif" }}>
          Sign up now!
        </Link>
        <Link to="/login" className="login-link" style={{ fontFamily: "Inter, sans-serif" }}>
          Log in here
        </Link>
      </div>
    </div>
  );
}
