import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItinerary } from "../api/itinerary";
import Navbar from "../components/Navbar";
import PageShell from "../components/PageShell";
import toast from "react-hot-toast";

export default function ItineraryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getItinerary(id).then(r => setItinerary(r.data.itinerary)).catch(() => toast.error("Not found")).finally(() => setLoading(false));
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/shared/${itinerary.shareToken}`);
    toast.success("Share link copied!");
  };

  if (loading) return (
    <PageShell>
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="tc-ring" />
      </div>
    </PageShell>
  );
  if (!itinerary) return null;

  return (
    <PageShell>
      <Navbar />
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "3rem 2.5rem", position: "relative", zIndex: 2 }}>

        {/* TOP BAR */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" }}>
          <button onClick={() => navigate("/dashboard")} style={{ background: "transparent", border: "none", color: "var(--w3)", cursor: "pointer", fontSize: "0.875rem", fontFamily: "'Space Grotesk',sans-serif", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "var(--w)"} onMouseLeave={e => e.target.style.color = "var(--w3)"}>
            ← Back
          </button>
          <button onClick={handleShare} className="tc-btn tc-btn-primary" style={{ padding: "10px 22px", fontSize: "0.875rem" }}>
            🔗 Share itinerary
          </button>
        </div>

        {/* HERO CARD */}
        <div className="fu" style={{ background: "linear-gradient(135deg,rgba(0,212,255,0.07),rgba(139,92,246,0.05))", border: "1px solid rgba(0,212,255,0.15)", borderRadius: 22, padding: "2.5rem", marginBottom: "1.5rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -1, left: "20%", right: "20%", height: 1, background: "linear-gradient(90deg,transparent,var(--cyan),transparent)" }} />
          <div className="tc-tag" style={{ marginBottom: "1.25rem" }}><div className="tc-tag-dot" />AI Generated</div>
          <h1 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05, margin: "0.75rem 0 1.2rem" }}>{itinerary.title}</h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginBottom: "1.2rem" }}>
            {itinerary.destination && <span style={{ fontSize: "0.85rem", color: "var(--w2)" }}>📍 {itinerary.destination}</span>}
            {itinerary.startDate && <span style={{ fontSize: "0.85rem", color: "var(--w2)" }}>📅 {itinerary.startDate} → {itinerary.endDate}</span>}
            {itinerary.travelers && <span style={{ fontSize: "0.85rem", color: "var(--w2)" }}>👤 {itinerary.travelers} traveler(s)</span>}
          </div>
          {itinerary.summary && <p style={{ fontSize: "0.92rem", color: "rgba(240,239,255,0.6)", lineHeight: 1.78, fontWeight: 300 }}>{itinerary.summary}</p>}
        </div>

        {/* SHARE BAR */}
        <div className="share-bar fu fu1">
          <div>
            <p style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 3 }}>🔗 Shareable link active</p>
            <p style={{ fontSize: "0.76rem", color: "var(--w3)", fontWeight: 300 }}>Anyone with this link can view — no login required</p>
          </div>
          <button onClick={handleShare} className="tc-btn tc-btn-ghost" style={{ padding: "8px 18px", fontSize: "0.82rem", whiteSpace: "nowrap" }}>Copy link</button>
        </div>

        {/* DAYS */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {itinerary.days?.map((day, idx) => (
            <div key={day.day} className="day-card reveal">
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "1.4rem" }}>
                <div className="day-num">{day.day}</div>
                <div>
                  <h3 style={{ fontWeight: 600, fontSize: "0.97rem", letterSpacing: "-0.02em" }}>{day.title}</h3>
                  {day.date && <p style={{ fontSize: "0.72rem", color: "var(--w3)", marginTop: 2, letterSpacing: "0.04em" }}>{day.date}</p>}
                </div>
              </div>

              {day.transport && <div className="transport-bar">🚀 {day.transport}</div>}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                {day.activities?.length > 0 && (
                  <div>
                    <p style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--w3)", fontWeight: 600, marginBottom: "0.65rem" }}>Activities</p>
                    {day.activities.map((a, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                        <div style={{ width: 5, height: 5, background: "var(--cyan)", borderRadius: "50%", marginTop: 6, flexShrink: 0, opacity: 0.5 }} />
                        <span style={{ fontSize: "0.8rem", color: "rgba(240,239,255,0.6)", lineHeight: 1.5 }}>{a}</span>
                      </div>
                    ))}
                  </div>
                )}
                {day.meals?.length > 0 && (
                  <div>
                    <p style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--w3)", fontWeight: 600, marginBottom: "0.65rem" }}>Meals</p>
                    {day.meals.map((m, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                        <span style={{ fontSize: "0.75rem" }}>🍽</span>
                        <span style={{ fontSize: "0.8rem", color: "rgba(240,239,255,0.6)", lineHeight: 1.5 }}>{m}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {(day.accommodation || day.tips?.length > 0) && (
                <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {day.accommodation && (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", borderRadius: 8, padding: "5px 12px", fontSize: "0.76rem", color: "var(--w2)" }}>
                      🏨 {day.accommodation}
                    </span>
                  )}
                  {day.tips?.map((t, i) => <span key={i} className="tip-pill">💡 {t}</span>)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}