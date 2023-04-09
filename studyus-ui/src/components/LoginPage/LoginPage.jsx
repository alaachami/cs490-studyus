import "./LoginPage.css";
import * as React from "react";
import LoginForm from "./Loginform/LoginForm";

export default function LoginPage() {
        return (
        <div className="login-page">
                <h1>Login Page</h1>
                <LoginForm />
        </div>
        );
}