import * as React from "react";
import { Link } from "react-router-dom";
import { useLoginForm } from "../../../hooks/useLoginForm";
import { useAuthContext } from "../../../contexts/auth";

import "./LoginForm.css";

export default function LoginForm() {
  const { user, setUser } = useAuthContext();
  const { form, errors, isLoading, handleOnInputChange, handleOnSubmit } =
    useLoginForm({ user, setUser });

    React.useEffect(() => {
        return () => {
        // Cancel any asynchronous operations or subscriptions here
        };
    }, []);

  return (
    <div className="login-form">
      <h2>Login To Your Account</h2>

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
            placeholder="email"
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
            placeholder="password"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button
          className="submit-login"
          disabled={isLoading}
          onClick={handleOnSubmit}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </div>
      <div className="footer">
        <p>
          Don't have an account? Sign up <Link to="/register">here</Link>
        </p>
      </div>
    </div>
  );
}
