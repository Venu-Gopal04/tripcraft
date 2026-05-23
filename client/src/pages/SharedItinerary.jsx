import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShared } from "../api/itinerary";
import PageShell from "../components/PageShell";

export default function SharedItinerary() {
  const { token } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getShared(token).then(r => setItinerary(r.data.itinerary)).catch(() => setError(true)).finally(() => setLoading(false));
  }, [token]);

  if (loading) return <PageShell><div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}><div className="tc-ring" /></div></PageShell>;
  if (error) return <PageShell><div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--w3)" }}>Itinerary not found.</div></PageShell>;

  return (
    <PageShell>
      <nav className="tc-nav">
        <div className="tc-brand">
          <div className="tc-brand-icon">T</div>
          TripCraft
        </div>
        <span style={{ fontSize: "0.8rem", color: "var(--w3)", borderLeft: "1px solid var(--border)", paddingLeft: "1rem" }}>Shared itinerary</span>
      </nav>

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "3rem 2.5rem", position: "relative", zIndex: 2 }}>
        <div className="fu" style={{ background: "linear-gradient(135deg,rgba(0,212,255,0.07),rgba(139,92,246,0.05))", border: "1px solid rgba(0,212,255,0.15)", borderRadius: 22, padding: "2.5rem", marginBottom: "1.5rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -1, left: "20%", right: "20%", height: 1, background: "linear-gradient(90deg,transparent,var(--cyan),transparent)" }} />
          <div className="tc-tag" style={{ marginBottom: "1.25rem" }}><div className="tc-tag-dot" />Shared Itinerary</div>
          <h1 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05, margin: "0.75rem 0 1.2rem" }}>{itinerary.title}</h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginBottom: "1.2rem" }}>
            {itinerary.destination && <span style={{ fontSize: "0.85rem", color: "var(--w2)" }}>📍 {itinerary.destination}</span>}
            {itinerary.startDate && <span style={{ fontSize: "0.85rem", color: "var(--w2)" }}>📅 {itinerary.startDate} → {itinerary.endDate}</span>}
          </div>
          {itinerary.summary && <p style={{ fontSize: "0.92rem", color: "rgba(240,239,255,0.6)", lineHeight: 1.78, fontWeight: 300 }}>{itinerary.summary}</p>}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {itinerary.days?.map(day => (
            <div key={day.day} className="day-card reveal">
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "1.4rem" }}>
                <div className="day-num">{day.day}</div>
                <div>
                  <h3 style={{ fontWeight: 600, fontSize: "0.97rem", letterSpacing: "-0.02em" }}>{day.title}</h3>
                  {day.date && <p style={{ fontSize: "0.72rem", color: "var(--w3)", marginTop: 2 }}>{day.date}</p>}
                </div>
              </div>
              {day.transport && <div className="transport-bar">🚀 {day.transport}</div>}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                {day.activities?.length > 0 && (
                  <div>
                    <p style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--w3)", fontWeight: 600, marginBottom: "0.65rem" }}>Activities</p>
                    {day.activities.map((a, i) => <div key={i} style={{ display: "flex", gap: 8, padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}><div style={{ width: 5, height: 5, background: "var(--cyan)", borderRadius: "50%", marginTop: 6, flexShrink: 0, opacity: 0.5 }} /><span style={{ fontSize: "0.8rem", color: "rgba(240,239,255,0.6)", lineHeight: 1.5 }}>{a}</span></div>)}
                  </div>
                )}
                {day.meals?.length > 0 && (
                  <div>
                    <p style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--w3)", fontWeight: 600, marginBottom: "0.65rem" }}>Meals</p>
                    {day.meals.map((m, i) => <div key={i} style={{ display: "flex", gap: 8, padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}><span style={{ fontSize: "0.75rem" }}>🍽</span><span style={{ fontSize: "0.8rem", color: "rgba(240,239,255,0.6)", lineHeight: 1.5 }}>{m}</span></div>)}
                  </div>
                )}
              </div>
              {day.tips?.length > 0 && <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: 6 }}>{day.tips.map((t, i) => <span key={i} className="tip-pill">💡 {t}</span>)}</div>}
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}