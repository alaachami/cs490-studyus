import "./LoginPage.css";
import React from "react";
import LoginForm from "./Loginform/LoginForm.jsx";

export default function LoginPage() {
  return (
    <div className="container">
      <div className="wallpaper"></div>
      <div className="login-page">
        <h1 className="login-title" style={{ fontFamily: "Inter, sans-serif" }}>
          Welcome Back
        </h1>
        <LoginForm />
      </div>
      <div className="stamp">
        <h1 className="stamp-title" style={{ fontFamily: "Inter, sans-serif" }}>
          StudyUs
        </h1>
      </div>
    </div>
  );
}