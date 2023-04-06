import "./AccessForbidden.css";
import { Link } from "react-router-dom";

export default function AccessForbidden() {
  return (
    <div className="access-forbidden">
      <h1 className="header">ACCESS FORBIDDEN</h1>
      <h2>
        To see this page, please <Link to="/login">click here to login</Link>
      </h2>
      <h2 className="subheader">
        If you do not have an account yet,{" "}
        <Link to="/register">click here to register!</Link>
      </h2>
    </div>
  );
}
