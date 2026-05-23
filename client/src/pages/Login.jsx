import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as loginApi } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import PageShell from "../components/PageShell";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true);
    try {
      const res = await loginApi(form);
      login(res.data.token, res.data.user);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally { setLoading(false); }
  };

  return (
    <PageShell>
      <div className="auth-wrap">
        <div className="auth-card fu">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <Link to="/" className="tc-brand" style={{ justifyContent: "center", textDecoration: "none", marginBottom: "1.5rem", display: "flex" }}>
              <div className="tc-brand-icon">T</div>
              TripCraft
            </Link>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 700, letterSpacing: "-0.03em", marginTop: "1.5rem", marginBottom: "0.4rem" }}>Welcome back</h1>
            <p style={{ color: "var(--w3)", fontSize: "0.875rem", fontWeight: 300 }}>Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label className="tc-label">Email address</label>
              <input className="tc-input" type="email" required placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="tc-label">Password</label>
              <input className="tc-input" type="password" required placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            <button type="submit" disabled={loading} className="tc-btn tc-btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}>
              {loading ? "Signing in..." : "Sign in →"}
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: "0.85rem", color: "var(--w3)", marginTop: "2rem" }}>
            No account?{" "}
            <Link to="/register" style={{ color: "var(--cyan)", textDecoration: "none", fontWeight: 500 }}>Create one</Link>
          </p>
        </div>
      </div>
    </PageShell>
  );
}