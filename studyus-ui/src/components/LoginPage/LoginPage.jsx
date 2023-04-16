import "./LoginPage.css";
import * as React from "react";
import LoginForm from "./Loginform/LoginForm";

export default function LoginPage() {
        return (
        <>
        <div className="wallpaper"></div>
        <div className="login-page">
                <h1>Welcome Back</h1>
                <LoginForm />
        </div>
        <div className="stamp"><h1>StudyUs</h1></div>
        </>
        );
}