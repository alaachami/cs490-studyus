import * as React from "react";
import { Link } from "react-router-dom";
import { useLoginForm } from "../../../hooks/useLoginForm";
import { useAuthContext } from "../../../contexts/auth";

import "./RegisterForm.css";

export default function RegisterForm() {
  const { user, setUser } = useAuthContext();
  const { form, errors, isLoading, handleOnInputChange, handleOnSubmit } =
    useLoginForm({ user, setUser });

  return (
    <div className="register-form">
      <h2>Register An Account</h2>

      {Boolean(errors.form) && <p className="error">{errors.form}</p>}
      <br />

      <div className="form">
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            className="form-input"
            name="email"
            type="email"
            value={form.email}
            onChange={handleOnInputChange}
            placeholder="Email"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input
            className="form-input"
            name="password"
            type="password"
            value={form.password}
            onChange={handleOnInputChange}
            placeholder="Password"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="input-field">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            className="form-input"
            name="confirm-password"
            type="password"
            value={form.confirmPassword}
            onChange={handleOnInputChange}
            placeholder="Password"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button
          className="submit-register"
          disabled={isLoading}
          onClick={handleOnSubmit}
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
      </div>
      <div className="footer">
        <p>
          Already have an account? Sign in <Link to="/login">here</Link>
        </p>
      </div>
    </div>
  );
}