import "./RegisterPage.css";
import * as React from "react";
import RegisterForm from "./RegisterForm/RegisterForm"

export default function RegisterPage() {
	return (
        <div className="register-page">
                <h1>Register Page</h1>
                <RegisterForm />
        </div>
	);
}