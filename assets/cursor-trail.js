(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "99999";
  document.body.appendChild(canvas);

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const COLORS = [
    "226, 168, 107", // #e2a86b theme amber
    "248, 212, 138", // Warm gold
    "255, 241, 204"  // Soft starlight highlight
  ];

  const particles = [];
  let lastX = null;
  let lastY = null;

  function spawnParticles(x, y, count) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.55 + 0.12;
      particles.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + 0.22,
        size: Math.random() * 2.2 + 1.0,
        alpha: Math.random() * 0.5 + 0.4, // Faint but clearly visible on dark slate
        decay: Math.random() * 0.015 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
      });
    }
  }

  window.addEventListener("pointermove", (e) => {
    if (e.pointerType === "touch") return; // Only show for mouse/trackpad
    if (lastX !== null && lastY !== null) {
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (dist > 2) {
        spawnParticles(e.clientX, e.clientY, dist > 18 ? 4 : 2);
      }
    }
    lastX = e.clientX;
    lastY = e.clientY;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;
      p.twinklePhase += 0.25;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      const shimmer = 0.72 + 0.28 * Math.sin(p.twinklePhase);
      const currentAlpha = Math.max(0, p.alpha * shimmer);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${currentAlpha.toFixed(3)})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${p.color}, ${(currentAlpha * 0.9).toFixed(3)})`;
      ctx.fill();
    }

    ctx.shadowBlur = 0;
    requestAnimationFrame(animate);
  }

  animate();
})();