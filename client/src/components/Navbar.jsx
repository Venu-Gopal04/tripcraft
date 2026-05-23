import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="tc-nav">
      <Link to={user ? "/dashboard" : "/"} className="tc-brand">
        <div className="tc-brand-icon">T</div>
        TripCraft
      </Link>
      {user ? (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ fontSize: "0.85rem", color: "var(--w3)" }}>
            Hi, {user.name}
          </span>
          <button
            className="tc-nbtn tc-nbtn-ghost"
            onClick={() => { logout(); navigate("/login"); }}
          >
            ↪ Logout
          </button>
        </div>
      ) : (
        <div className="tc-nav-btns">
          <button className="tc-nbtn tc-nbtn-ghost" onClick={() => navigate("/login")}>Sign in</button>
          <button className="tc-nbtn tc-nbtn-primary" onClick={() => navigate("/register")}>Get started →</button>
        </div>
      )}
    </nav>
  );
}