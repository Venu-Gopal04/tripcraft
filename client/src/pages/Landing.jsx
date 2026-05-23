import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import Navbar from "../components/Navbar";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <PageShell>
      <Navbar />

      {/* HERO */}
      <div style={{ minHeight: "96vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "5rem 2rem 4rem", position: "relative", overflow: "hidden" }}>
        <div className="scan-line" />

        <div className="tc-badge fu" style={{ marginBottom: "2.5rem" }}>
          <div className="tc-badge-dot" />
          AI-Powered Travel Intelligence
        </div>

        <h1 className="fu fu1" style={{ fontSize: "clamp(3.5rem,7.5vw,7.5rem)", fontWeight: 700, lineHeight: 0.97, letterSpacing: "-0.05em", marginBottom: "1.75rem", maxWidth: 960 }}>
          <span style={{ color: "var(--w)" }}>Upload once.<br /></span>
          <span className="grad-text">Travel everywhere.</span>
        </h1>

        <p className="fu fu2" style={{ fontSize: "1.15rem", color: "var(--w2)", maxWidth: 520, lineHeight: 1.78, marginBottom: "2.75rem", fontWeight: 300 }}>
          Drop your flight tickets, hotel bookings, and travel docs. Our{" "}
          <span style={{ color: "var(--cyan)", fontWeight: 500 }}>AI vision model</span>{" "}
          extracts every detail and builds your complete itinerary in seconds.
        </p>

        <div className="fu fu3" style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginBottom: "4.5rem" }}>
          <button className="tc-btn tc-btn-primary" onClick={() => navigate("/register")}>Start for free →</button>
          <button className="tc-btn tc-btn-ghost" onClick={() => navigate("/login")}>Sign in</button>
        </div>

        {/* FLOATING CARDS */}
        <div className="fu fu4" style={{ position: "relative", width: "100%", maxWidth: 860, height: 200, marginBottom: "4.5rem", perspective: 800 }}>
          {/* Card A */}
          <div style={{ position: "absolute", left: 0, top: 20, width: 220, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: 16, padding: "16px 20px", backdropFilter: "blur(20px)", boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 35px rgba(0,212,255,0.12)", animation: "floatA 7s ease-in-out infinite" }}>
            <div style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 8, fontWeight: 600 }}>
              <span style={{ display: "inline-block", width: 5, height: 5, background: "var(--cyan)", borderRadius: "50%", marginRight: 5, verticalAlign: "middle", boxShadow: "0 0 6px var(--cyan)" }} />
              Flight detected
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "var(--w)", marginBottom: 3, letterSpacing: "-0.02em" }}>HYD → IAD</div>
            <div style={{ fontSize: 11, color: "var(--w3)", lineHeight: 1.5 }}>QR 4775 · Jan 13 03:05<br />via Doha · 3h 25m layover</div>
          </div>

          {/* Card B */}
          <div style={{ position: "absolute", left: "50%", top: 0, width: 280, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(139,92,246,0.25)", borderRadius: 16, padding: "16px 20px", backdropFilter: "blur(20px)", boxShadow: "0 28px 72px rgba(0,0,0,0.7), 0 0 45px rgba(139,92,246,0.15)", animation: "floatB 5s ease-in-out infinite" }}>
            <div style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--purple)", marginBottom: 8, fontWeight: 600 }}>
              <span style={{ display: "inline-block", width: 5, height: 5, background: "var(--purple)", borderRadius: "50%", marginRight: 5, verticalAlign: "middle", boxShadow: "0 0 6px var(--purple)" }} />
              AI itinerary ready
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "var(--w)", marginBottom: 3, letterSpacing: "-0.02em" }}>Hyderabad → D.C. Trip</div>
            <div style={{ fontSize: 11, color: "var(--w3)", lineHeight: 1.5 }}>1 day · 1 traveler<br />Generated in 2.1s ✨</div>
          </div>

          {/* Card C */}
          <div style={{ position: "absolute", right: 0, top: 28, width: 220, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,45,120,0.2)", borderRadius: 16, padding: "16px 20px", backdropFilter: "blur(20px)", boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 30px rgba(255,45,120,0.1)", animation: "floatC 9s ease-in-out infinite" }}>
            <div style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--pink)", marginBottom: 8, fontWeight: 600 }}>
              <span style={{ display: "inline-block", width: 5, height: 5, background: "var(--pink)", borderRadius: "50%", marginRight: 5, verticalAlign: "middle", boxShadow: "0 0 6px var(--pink)" }} />
              Share link
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "var(--w)", marginBottom: 3, letterSpacing: "-0.02em" }}>tripcraft.app/s/x9k2</div>
            <div style={{ fontSize: 11, color: "var(--w3)", lineHeight: 1.5 }}>No login required<br />Copied to clipboard ✓</div>
          </div>
        </div>

        {/* STATS */}
        <div className="fu fu5" style={{ display: "flex", gap: "5rem", paddingTop: "3rem", borderTop: "1px solid var(--border)" }}>
          {[["2s", "avg generation"], ["99%", "extraction accuracy"], ["∞", "no doc limits"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2.2rem", fontWeight: 700, letterSpacing: "-0.04em" }}>{n}</div>
              <div style={{ fontSize: "10.5px", color: "var(--w3)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 5 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="tc-section">
        <div className="tc-eyebrow">How it works</div>
        <div className="tc-h2">Three steps to your<br /><span className="grad-text">perfect trip.</span></div>
        <p className="tc-lead">Our vision AI reads documents with human-level precision, then generates an intelligent day-by-day plan around your actual bookings.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
          {[
            { n: "01 — UPLOAD", icon: "📄", title: "Drop your documents", desc: "Drag & drop flight tickets, hotel confirmations, train bookings. PDF and image formats, up to 10 files." },
            { n: "02 — EXTRACT", icon: "🔍", title: "AI reads everything", desc: "Vision AI extracts every detail — airports, flight numbers, layovers, hotel names, check-in times." },
            { n: "03 — PLAN", icon: "✈️", title: "Itinerary generated", desc: "A structured, shareable day-by-day travel plan crafted automatically. Share via one link." },
          ].map(s => (
            <div key={s.n} className="glass step-card reveal" style={{ padding: "2.25rem", cursor: "default" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--cyan)", fontWeight: 600, marginBottom: "1.5rem", opacity: 0.7 }}>{s.n}</div>
              <div style={{ width: 50, height: 50, background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: "1.25rem", boxShadow: "0 0 20px rgba(0,212,255,0.08)" }}>{s.icon}</div>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.6rem", letterSpacing: "-0.02em" }}>{s.title}</h3>
              <p style={{ fontSize: "0.83rem", color: "var(--w2)", lineHeight: 1.65, fontWeight: 300 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="tc-footer">
        <div className="tc-brand" style={{ textDecoration: "none" }}>
          <div className="tc-brand-icon" style={{ width: 24, height: 24, fontSize: 11 }}>T</div>
          TripCraft
        </div>
        <p style={{ fontSize: "0.8rem", color: "var(--w3)" }}>Built with MERN + Groq AI · 2026</p>
      </footer>
    </PageShell>
  );
}