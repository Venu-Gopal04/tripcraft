export function initCursor() {
  const cur = document.getElementById("tc-cur");
  const cur2 = document.getElementById("tc-cur2");
  if (!cur || !cur2) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  let raf;

  const onMove = e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + "px";
    cur.style.top = my + "px";
  };

  document.addEventListener("mousemove", onMove);

  const loop = () => {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cur2.style.left = rx + "px";
    cur2.style.top = ry + "px";
    raf = requestAnimationFrame(loop);
  };
  loop();

  return () => {
    document.removeEventListener("mousemove", onMove);
    cancelAnimationFrame(raf);
  };
}

export function initParticles(canvas) {
  const ctx = canvas.getContext("2d");
  let W, H, pts = [], raf;

  const resize = () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  };

  const init = () => {
    resize();
    pts = Array.from({ length: 80 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.2 + 0.3,
      hue: Math.random() > 0.7 ? 280 : Math.random() > 0.5 ? 330 : 195,
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue},100%,70%,0.55)`; ctx.fill();
    });
    pts.forEach((a, i) => pts.slice(i + 1).forEach(b => {
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 120) {
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(0,212,255,${0.06 * (1 - d / 120)})`;
        ctx.lineWidth = 0.5; ctx.stroke();
      }
    }));
    raf = requestAnimationFrame(draw);
  };

  init(); draw();
  window.addEventListener("resize", init);
  return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", init); };
}

export function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("revealed");
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.05, rootMargin: "0px 0px -20px 0px" });

  // Small delay so DOM is ready
  setTimeout(() => {
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
  }, 100);

  return () => obs.disconnect();
}

export function initHoverCursor() {
  const cur = document.getElementById("tc-cur");
  const cur2 = document.getElementById("tc-cur2");
  if (!cur || !cur2) return;
  document.querySelectorAll("button, a, .it-card, .glass, .step-card").forEach(el => {
    el.addEventListener("mouseenter", () => {
      cur.style.width = "18px"; cur.style.height = "18px";
      cur2.style.transform = "translate(-50%,-50%) scale(1.5)";
      cur2.style.borderColor = "rgba(0,212,255,0.7)";
    });
    el.addEventListener("mouseleave", () => {
      cur.style.width = "10px"; cur.style.height = "10px";
      cur2.style.transform = "translate(-50%,-50%) scale(1)";
      cur2.style.borderColor = "rgba(0,212,255,0.4)";
    });
  });
}