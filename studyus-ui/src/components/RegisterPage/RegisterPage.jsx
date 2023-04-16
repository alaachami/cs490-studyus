import React from "react";
import "./RegisterPage.css";
import RegisterForm from "./RegisterForm/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="container">
      <div className="wallpaper"></div>
      <div className="register-page">
        <div className="register-form">
          <h1 className="register-title" style={{ fontFamily: "Inter, sans-serif" }}>
            Register Page
          </h1>
          <RegisterForm />
          <div className="stamp">
            <h1 className="stamp-title" style={{ fontFamily: "Inter, sans-serif" }}>
              StudyUs
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
