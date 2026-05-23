import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getItineraries, uploadDocuments, deleteItinerary } from "../api/itinerary";
import { useDropzone } from "react-dropzone";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import PageShell from "../components/PageShell";
import toast from "react-hot-toast";

const STEPS = ["Uploading documents...", "AI analysing content...", "Building itinerary...", "Almost done..."];

function UploadModal({ onClose, onSuccess }) {
  const [files, setFiles] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [step, setStep] = useState(0);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [], "application/pdf": [] },
    maxFiles: 10,
    onDrop: accepted => setFiles(p => [...p, ...accepted]),
  });

  const handleGenerate = async () => {
    if (!files.length) return toast.error("Upload at least one document");
    setGenerating(true); setStep(0);
    const iv = setInterval(() => setStep(s => s < 3 ? s + 1 : s), 3500);
    const fd = new FormData();
    files.forEach(f => fd.append("documents", f));
    try {
      const res = await uploadDocuments(fd);
      clearInterval(iv);
      onSuccess(res.data.itinerary);
      toast.success("Itinerary generated!");
      onClose();
    } catch (err) {
      clearInterval(iv);
      toast.error(err.response?.data?.message || "Generation failed");
      setGenerating(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button onClick={onClose} style={{ position: "absolute", top: "1.25rem", right: "1.25rem", background: "transparent", border: "none", color: "var(--w3)", cursor: "pointer", fontSize: "1.2rem" }}>✕</button>

        {generating ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem", padding: "2rem 0" }}>
            <div className="tc-ring" />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-0.02em" }}>Generating itinerary</h3>
            <p style={{ color: "var(--cyan)", fontSize: "0.875rem" }}>{STEPS[step]}</p>
            <div style={{ display: "flex", gap: 6 }}>
              {STEPS.map((_, i) => (
                <div key={i} className="progress-step" style={{ background: i <= step ? "var(--cyan)" : "rgba(255,255,255,0.1)", boxShadow: i <= step ? "0 0 8px var(--cyan)" : "none" }} />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="tc-eyebrow" style={{ marginBottom: "0.5rem" }}>New itinerary</div>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "1.75rem" }}>Upload travel documents</h2>

            <div {...getRootProps()} className={`upload-zone ${isDragActive ? "active" : ""}`}>
              <input {...getInputProps()} />
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📄</div>
              <p style={{ fontWeight: 500, marginBottom: "0.4rem" }}>{isDragActive ? "Drop files here" : "Drag & drop your documents"}</p>
              <p style={{ fontSize: "0.8rem", color: "var(--w3)", marginBottom: "1.25rem" }}>PDF, JPG, PNG · Up to 10 files</p>
              <button type="button" className="tc-btn tc-btn-ghost" style={{ padding: "0.55rem 1.25rem", fontSize: "0.85rem" }}>Browse files</button>
            </div>

            {files.length > 0 && (
              <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: 6 }}>
                {files.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", borderRadius: 10, padding: "8px 14px" }}>
                    <span style={{ fontSize: "0.83rem", color: "var(--w2)" }}>📎 {f.name}</span>
                    <button onClick={() => setFiles(fs => fs.filter((_, j) => j !== i))} style={{ background: "none", border: "none", color: "var(--w3)", cursor: "pointer" }}>✕</button>
                  </div>
                ))}
              </div>
            )}

            {files.length > 0 && (
              <button onClick={handleGenerate} className="tc-btn tc-btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: "1.25rem" }}>
                ✨ Generate itinerary
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getItineraries().then(r => setItineraries(r.data.itineraries)).catch(() => toast.error("Failed to load")).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
  if (!loading) {
    setTimeout(() => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.05 });
      document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    }, 100);
  }
}, [loading, itineraries]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!confirm("Delete this itinerary?")) return;
    await deleteItinerary(id);
    setItineraries(p => p.filter(i => i._id !== id));
    toast.success("Deleted");
  };

  const handleShare = (e, token) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/shared/${token}`);
    toast.success("Share link copied!");
  };

  return (
    <PageShell>
      <Navbar />
      {showModal && <UploadModal onClose={() => setShowModal(false)} onSuccess={it => setItineraries(p => [it, ...p])} />}

      <div className="dash-content">
        {/* HEADER */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "3rem" }}>
          <div className="fu">
            <div className="tc-eyebrow" style={{ marginBottom: "0.5rem" }}>Welcome back, {user?.name?.split(" ")[0]}</div>
            <h1 style={{ fontSize: "2.2rem", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.1 }}>My Itineraries</h1>
            <p style={{ color: "var(--w3)", fontSize: "0.85rem", marginTop: "0.4rem", fontWeight: 300 }}>
              {itineraries.length} trip{itineraries.length !== 1 ? "s" : ""} planned
            </p>
          </div>
          <button onClick={() => setShowModal(true)} className="tc-btn tc-btn-primary fu fu1" style={{ padding: "12px 24px", fontSize: "0.9rem" }}>
            + New itinerary
          </button>
        </div>

        {/* GRID */}
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.25rem" }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", borderRadius: 20, height: 220, opacity: 0.5 }} />
            ))}
          </div>
        ) : itineraries.length === 0 ? (
          <div style={{ textAlign: "center", padding: "6rem 2rem" }} className="fu">
            <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>✈️</div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>No itineraries yet</h2>
            <p style={{ color: "var(--w3)", marginBottom: "2rem", fontWeight: 300 }}>Upload your first travel document to get started</p>
            <button onClick={() => setShowModal(true)} className="tc-btn tc-btn-primary">Upload documents →</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.25rem" }}>
            {itineraries.map((it, idx) => (
              <div key={it._id} className="it-card reveal" style={{ animationDelay: `${idx * 0.08}s` }} onClick={() => navigate(`/itinerary/${it._id}`)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div className="tc-tag"><div className="tc-tag-dot" />AI Generated</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={e => handleShare(e, it.shareToken)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "var(--w3)", width: 28, height: 28, borderRadius: "50%", cursor: "pointer", fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }} title="Copy share link" onMouseEnter={e => { e.target.style.borderColor = "var(--cyan)"; e.target.style.color = "var(--cyan)"; }} onMouseLeave={e => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--w3)"; }}>🔗</button>
                    <button onClick={e => handleDelete(e, it._id)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "var(--w3)", width: 28, height: 28, borderRadius: "50%", cursor: "pointer", fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }} title="Delete" onMouseEnter={e => { e.target.style.borderColor = "var(--pink)"; e.target.style.color = "var(--pink)"; }} onMouseLeave={e => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--w3)"; }}>🗑</button>
                  </div>
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "0.55rem", lineHeight: 1.3 }}>{it.title}</h3>
                {it.destination && <p style={{ fontSize: "0.78rem", color: "var(--w3)", marginBottom: "0.25rem" }}>📍 {it.destination}</p>}
                {it.startDate && <p style={{ fontSize: "0.78rem", color: "var(--w3)", marginBottom: "0.75rem" }}>📅 {it.startDate} → {it.endDate}</p>}
                <p style={{ fontSize: "0.78rem", color: "var(--w2)", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", fontWeight: 300 }}>{it.summary}</p>
                <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "9px", color: "var(--w3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{it.days?.length} DAYS</span>
                  <span style={{ fontSize: "0.78rem", color: "var(--cyan)", fontWeight: 500 }}>View →</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}