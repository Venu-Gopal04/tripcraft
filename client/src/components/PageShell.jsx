import { useEffect, useRef } from "react";
import { initCursor, initParticles, initScrollReveal, initHoverCursor } from "../utils/cursor";

export default function PageShell({ children, particles = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cleanCursor = initCursor();
    let cleanParticles;
    if (particles && canvasRef.current) cleanParticles = initParticles(canvasRef.current);
    const cleanReveal = initScrollReveal();
    const timeout = setTimeout(initHoverCursor, 300);
    return () => {
      cleanCursor?.();
      cleanParticles?.();
      cleanReveal?.();
      clearTimeout(timeout);
    };
  }, [particles]);

  return (
    <>
      <div id="tc-cur" className="tc-cur" />
      <div id="tc-cur2" className="tc-cur2" />
      {particles && <canvas ref={canvasRef} className="tc-canvas" />}
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />
      <div className="tc-grid" />
      <div className="shell">{children}</div>
    </>
  );
}