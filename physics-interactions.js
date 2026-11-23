(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 1. MAGNETIC MONOPOLE CURSOR + IRON-FILING GRID & FIELD LINES */
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "1";
  document.body.prepend(canvas);

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const pointer = { x: width * 0.5, y: height * 0.35, active: false };

  window.addEventListener("pointermove", (e) => {
    if (e.pointerType === "touch") return;
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.active = true;
  });

  window.addEventListener("pointerleave", () => {
    pointer.active = false;
  });

  const SPACING = 38;
  let time = 0;

  function drawMagneticField() {
    ctx.clearRect(0, 0, width, height);
    time += 0.025;

    const cols = Math.ceil(width / SPACING) + 1;
    const rows = Math.ceil(height / SPACING) + 1;

    if (pointer.active && !reducedMotion) {
      const numRays = 16;
      const maxR = 230;
      for (let r = 0; r < numRays; r++) {
        const baseAngle = (r / numRays) * Math.PI * 2 + time * 0.08;
        const grad = ctx.createRadialGradient(
          pointer.x, pointer.y, 8,
          pointer.x, pointer.y, maxR
        );
        grad.addColorStop(0, "rgba(226, 168, 107, 0.24)");
        grad.addColorStop(0.5, "rgba(248, 212, 138, 0.08)");
        grad.addColorStop(1, "rgba(226, 168, 107, 0)");

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;

        for (let step = 10; step <= maxR; step += 12) {
          const curl = Math.sin(step * 0.03 - time * 1.6 + r) * 0.05;
          const a = baseAngle + curl;
          const px = pointer.x + Math.cos(a) * step;
          const py = pointer.y + Math.sin(a) * step;
          if (step === 10) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      const core = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 42);
      core.addColorStop(0, "rgba(255, 236, 194, 0.22)");
      core.addColorStop(1, "rgba(226, 168, 107, 0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, 42, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const gx = i * SPACING;
        const gy = j * SPACING;
        const dx = gx - pointer.x;
        const dy = gy - pointer.y;
        const dist = Math.hypot(dx, dy);

        const influence = pointer.active ? Math.max(0, 1 - dist / 300) : 0;
        const shimmer = 0.7 + 0.3 * Math.sin(time * 2 + i * 0.7 + j * 0.5);

        if (influence > 0.04 && !reducedMotion) {
          const angle = Math.atan2(dy, dx);
          const halfLen = 2.5 + influence * 7.5;
          const alpha = (0.14 + influence * 0.52) * shimmer;

          ctx.save();
          ctx.translate(gx, gy);
          ctx.rotate(angle);
          ctx.beginPath();
          ctx.moveTo(-halfLen, 0);
          ctx.lineTo(halfLen, 0);
          ctx.strokeStyle = `rgba(226, 168, 107, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 1 + influence * 0.9;
          ctx.shadowBlur = influence * 6;
          ctx.shadowColor = "rgba(248, 212, 138, 0.65)";
          ctx.stroke();
          ctx.restore();
        } else {
          const dotAlpha = 0.11 * shimmer;
          ctx.beginPath();
          ctx.arc(gx, gy, 1.15, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(226, 168, 107, ${dotAlpha.toFixed(3)})`;
          ctx.fill();
        }
      }
    }

    ctx.shadowBlur = 0;
    requestAnimationFrame(drawMagneticField);
  }

  drawMagneticField();

  /* 2. NEWTON'S CRADLE NAVBAR PENDULUMS */
  const navLinks = Array.from(document.querySelectorAll("header nav a"));
  if (navLinks.length > 0 && !reducedMotion) {
    const N = navLinks.length;
    const theta = new Array(N).fill(0);
    const omega = new Array(N).fill(0);

    navLinks.forEach((link, idx) => {
      link.classList.add("cradle-item");
      const stringEl = document.createElement("span");
      stringEl.className = "cradle-string";
      const bobEl = document.createElement("span");
      bobEl.className = "cradle-bob";
      link.prepend(bobEl);
      link.prepend(stringEl);

      link.addEventListener("mouseenter", () => {
        const dir = idx < N / 2 ? -1 : 1;
        omega[idx] += dir * 0.055;
      });
    });

    const K_SPRING = 0.018;
    const DAMPING = 0.988;
    const RESTITUTION = 0.92;

    function updateCradle() {
      for (let i = 0; i < N; i++) {
        const alpha = -K_SPRING * Math.sin(theta[i]);
        omega[i] = (omega[i] + alpha) * DAMPING;
        theta[i] += omega[i];
      }

      for (let i = 0; i < N - 1; i++) {
        if (theta[i] - theta[i + 1] > 0.015) {
          const v1 = omega[i];
          const v2 = omega[i + 1];
          omega[i] = v2 * RESTITUTION;
          omega[i + 1] = v1 * RESTITUTION;
          const mid = (theta[i] + theta[i + 1]) * 0.5;
          theta[i] = mid;
          theta[i + 1] = mid;
        }
      }

      for (let i = 0; i < N; i++) {
        const deg = (theta[i] * 180) / Math.PI;
        navLinks[i].style.transform = `rotate(${deg.toFixed(2)}deg)`;
      }

      requestAnimationFrame(updateCradle);
    }

    updateCradle();
  }

  /* 3. PARABOLIC PROJECTILE SCROLL-TO-TOP */
  const launcherBtn = document.createElement("button");
  launcherBtn.className = "projectile-top-btn";
  launcherBtn.setAttribute("aria-label", "Launch back to top");
  launcherBtn.innerHTML = `
    <span class="mono-label mono-amber">Δy &rarr; 0</span>
    <span>Launch to Top &uarr;</span>
  `;
  document.body.appendChild(launcherBtn);

  const hudCanvas = document.createElement("canvas");
  const hctx = hudCanvas.getContext("2d");
  hudCanvas.style.position = "fixed";
  hudCanvas.style.inset = "0";
  hudCanvas.style.width = "100vw";
  hudCanvas.style.height = "100vh";
  hudCanvas.style.pointerEvents = "none";
  hudCanvas.style.zIndex = "9998";
  document.body.appendChild(hudCanvas);

  function syncHudSize() {
    hudCanvas.width = window.innerWidth;
    hudCanvas.height = window.innerHeight;
  }
  syncHudSize();
  window.addEventListener("resize", syncHudSize);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 260) {
      launcherBtn.classList.add("visible");
    } else {
      launcherBtn.classList.remove("visible");
    }
  });

  let launching = false;

  launcherBtn.addEventListener("click", () => {
    if (launching) return;
    const startScroll = window.scrollY;
    if (startScroll <= 5) return;

    if (reducedMotion) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    launching = true;
    const duration = 950;
    const startTime = performance.now();

    const w = hudCanvas.width;
    const h = hudCanvas.height;

    const x0 = w - 110;
    const y0 = h - 75;
    const x1 = Math.max(120, w * 0.22);
    const y1 = 88;
    const arcApex = Math.min(y0, y1) - Math.min(220, h * 0.28);

    const cx = (x0 + x1) * 0.5;
    const cy = 2 * arcApex - 0.5 * (y0 + y1);

    const trail = [];

    function stepLaunch(now) {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);

      const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      window.scrollTo(0, startScroll * (1 - ease));

      const invT = 1 - t;
      const px = invT * invT * x0 + 2 * invT * t * cx + t * t * x1;
      const py = invT * invT * y0 + 2 * invT * t * cy + t * t * y1;

      const dxDt = 2 * invT * (cx - x0) + 2 * t * (x1 - cx);
      const dyDt = 2 * invT * (cy - y0) + 2 * t * (y1 - cy);

      const vxPhys = (dxDt * 0.045).toFixed(1);
      const vyPhys = (-dyDt * 0.045).toFixed(1);

      trail.push({ x: px, y: py });

      hctx.clearRect(0, 0, hudCanvas.width, hudCanvas.height);

      hctx.beginPath();
      hctx.setLineDash([4, 5]);
      hctx.moveTo(x0, y0);
      hctx.quadraticCurveTo(cx, cy, x1, y1);
      hctx.strokeStyle = "rgba(138, 180, 248, 0.28)";
      hctx.lineWidth = 1.2;
      hctx.stroke();
      hctx.setLineDash([]);

      if (trail.length > 1) {
        hctx.beginPath();
        hctx.moveTo(trail[0].x, trail[0].y);
        for (let k = 1; k < trail.length; k++) {
          hctx.lineTo(trail[k].x, trail[k].y);
        }
        hctx.strokeStyle = "rgba(226, 168, 107, 0.85)";
        hctx.lineWidth = 2;
        hctx.stroke();
      }

      const vScale = 0.085;
      const vxEnd = px + dxDt * vScale;
      const vyEnd = py + dyDt * vScale;

      drawArrow(hctx, px, py, vxEnd, py, "#8ab4f8", 1.6);
      drawArrow(hctx, px, py, px, vyEnd, "#e2a86b", 1.6);

      hctx.beginPath();
      hctx.arc(px, py, 5.5, 0, Math.PI * 2);
      hctx.fillStyle = "#e2a86b";
      hctx.shadowBlur = 10;
      hctx.shadowColor = "#e2a86b";
      hctx.fill();
      hctx.shadowBlur = 0;

      const boxX = Math.min(hudCanvas.width - 175, Math.max(16, px + 14));
      const boxY = Math.max(24, py - 34);
      hctx.fillStyle = "rgba(15, 22, 36, 0.9)";
      hctx.strokeStyle = "rgba(226, 168, 107, 0.55)";
      hctx.lineWidth = 1;
      hctx.beginPath();
      hctx.roundRect(boxX, boxY, 156, 40, 4);
      hctx.fill();
      hctx.stroke();

      hctx.font = "11px 'JetBrains Mono', monospace";
      hctx.fillStyle = "#8ab4f8";
      hctx.fillText(`vx: ${vxPhys} m/s`, boxX + 10, boxY + 16);
      hctx.fillStyle = "#e2a86b";
      hctx.fillText(`vy: ${vyPhys} m/s`, boxX + 10, boxY + 32);

      if (t < 1) {
        requestAnimationFrame(stepLaunch);
      } else {
        setTimeout(() => {
          hctx.clearRect(0, 0, hudCanvas.width, hudCanvas.height);
          launching = false;
        }, 280);
      }
    }

    requestAnimationFrame(stepLaunch);
  });

  function drawArrow(context, fromX, fromY, toX, toY, color, lineWidth) {
    const headLen = 6;
    const dx = toX - fromX;
    const dy = toY - fromY;
    if (Math.hypot(dx, dy) < 2) return;
    const angle = Math.atan2(dy, dx);
    context.strokeStyle = color;
    context.fillStyle = color;
    context.lineWidth = lineWidth;
    context.beginPath();
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();

    context.beginPath();
    context.moveTo(toX, toY);
    context.lineTo(toX - headLen * Math.cos(angle - Math.PI / 6), toY - headLen * Math.sin(angle - Math.PI / 6));
    context.lineTo(toX - headLen * Math.cos(angle + Math.PI / 6), toY - headLen * Math.sin(angle + Math.PI / 6));
    context.closePath();
    context.fill();
  }

  /* 4. QUANTUM WAVEFUNCTION COLLAPSE FOR RÉSUMÉ VIEWER */
  const wfShell = document.getElementById("wavefunction-shell");
  const wfCanvas = document.getElementById("wavefunction-canvas");
  const wfStatus = document.getElementById("wf-status-text");

  if (wfShell && wfCanvas) {
    const wctx = wfCanvas.getContext("2d");
    let collapsed = false;
    let collapseProgress = 0;
    let wavePhase = 0;
    let focusPoint = { x: 0.5, y: 0.5 };

    const glitters = Array.from({ length: 140 }, () => ({
      rx: Math.random(),
      ry: Math.random(),
      size: Math.random() * 2.1 + 0.7,
      speed: Math.random() * 0.04 + 0.015,
      phase: Math.random() * Math.PI * 2
    }));

    function resizeWfCanvas() {
      const rect = wfShell.getBoundingClientRect();
      wfCanvas.width = rect.width;
      wfCanvas.height = rect.height;
    }
    resizeWfCanvas();
    window.addEventListener("resize", resizeWfCanvas);

    wfShell.addEventListener("pointerenter", (e) => {
      const rect = wfShell.getBoundingClientRect();
      focusPoint.x = (e.clientX - rect.left) / rect.width;
      focusPoint.y = (e.clientY - rect.top) / rect.height;
      collapsed = true;
      wfShell.classList.add("collapsed");
      if (wfStatus) {
        wfStatus.textContent = "EIGENSTATE OBSERVED // |ψ|² → 1 (RESUME RESOLVED)";
      }
    });

    wfShell.addEventListener("pointermove", (e) => {
      if (!collapsed) {
        const rect = wfShell.getBoundingClientRect();
        focusPoint.x = (e.clientX - rect.left) / rect.width;
        focusPoint.y = (e.clientY - rect.top) / rect.height;
        collapsed = true;
        wfShell.classList.add("collapsed");
      }
    });

    wfShell.addEventListener("pointerleave", () => {
      collapsed = false;
      wfShell.classList.remove("collapsed");
      if (wfStatus) {
        wfStatus.textContent = "SUPERPOSITION STATE // HOVER TO OBSERVE & COLLAPSE |ψ⟩";
      }
    });

    if (reducedMotion) {
      wfShell.classList.add("collapsed");
      wfCanvas.style.display = "none";
    } else {
      function renderWavefunction() {
        const target = collapsed ? 1 : 0;
        collapseProgress += (target - collapseProgress) * 0.075;
        wavePhase += 0.04;

        const w = wfCanvas.width;
        const h = wfCanvas.height;
        wctx.clearRect(0, 0, w, h);

        const visibility = 1 - collapseProgress;

        if (visibility > 0.01) {
          wctx.fillStyle = `rgba(9, 13, 22, ${(0.92 * visibility).toFixed(3)})`;
          wctx.fillRect(0, 0, w, h);

          if (collapseProgress > 0.02 && collapseProgress < 0.98) {
            const fx = focusPoint.x * w;
            const fy = focusPoint.y * h;
            const maxDiag = Math.hypot(w, h);
            const ringR = collapseProgress * maxDiag;

            wctx.beginPath();
            wctx.arc(fx, fy, ringR, 0, Math.PI * 2);
            wctx.strokeStyle = `rgba(255, 241, 204, ${(0.75 * visibility).toFixed(3)})`;
            wctx.lineWidth = 2.5;
            wctx.shadowBlur = 16;
            wctx.shadowColor = "#e2a86b";
            wctx.stroke();
            wctx.shadowBlur = 0;
          }

          const waveCount = 11;
          for (let n = 0; n < waveCount; n++) {
            const norm = n / (waveCount - 1);
            const baseY = h * (0.14 + norm * 0.72);
            const amp = (28 + Math.sin(n * 1.3 + wavePhase * 0.5) * 14) * Math.pow(visibility, 1.3);
            const freq = 0.008 + (n % 4) * 0.0035;
            const speed = (n % 2 === 0 ? 1 : -1) * (1.1 + n * 0.12);

            wctx.beginPath();
            for (let x = 0; x <= w; x += 8) {
              const env = Math.exp(-Math.pow((x - w * 0.5) / (w * 0.42), 2));
              const y =
                baseY +
                Math.sin(x * freq + wavePhase * speed + n) * amp * (0.45 + 0.55 * env) +
                Math.cos(x * freq * 2.1 - wavePhase * 1.4) * (amp * 0.28);
              if (x === 0) wctx.moveTo(x, y);
              else wctx.lineTo(x, y);
            }

            const isAmber = n % 2 === 0;
            const strokeAlpha = (isAmber ? 0.55 : 0.35) * visibility;
            wctx.strokeStyle = isAmber
              ? `rgba(226, 168, 107, ${strokeAlpha.toFixed(3)})`
              : `rgba(138, 180, 248, ${strokeAlpha.toFixed(3)})`;
            wctx.lineWidth = isAmber ? 1.6 : 1.1;
            wctx.stroke();
          }

          glitters.forEach((g, idx) => {
            g.phase += g.speed;
            const gx = g.rx * w;
            const waveOffset = Math.sin(gx * 0.012 + wavePhase + idx) * 26 * visibility;
            const gy = g.ry * h + waveOffset;
            const twinkle = 0.45 + 0.55 * Math.sin(g.phase);
            const alpha = twinkle * 0.85 * visibility;

            wctx.beginPath();
            wctx.arc(gx, gy, g.size, 0, Math.PI * 2);
            wctx.fillStyle = idx % 3 === 0
              ? `rgba(255, 241, 204, ${alpha.toFixed(3)})`
              : `rgba(226, 168, 107, ${alpha.toFixed(3)})`;
            wctx.shadowBlur = 7;
            wctx.shadowColor = "rgba(248, 212, 138, 0.85)";
            wctx.fill();
          });
          wctx.shadowBlur = 0;

          if (visibility > 0.25) {
            wctx.save();
            wctx.globalAlpha = visibility;
            const boxW = Math.min(340, w - 32);
            const boxH = 66;
            const bx = (w - boxW) * 0.5;
            const by = (h - boxH) * 0.5;

            wctx.fillStyle = "rgba(15, 22, 36, 0.92)";
            wctx.strokeStyle = "rgba(226, 168, 107, 0.65)";
            wctx.lineWidth = 1.2;
            wctx.beginPath();
            wctx.roundRect(bx, by, boxW, boxH, 6);
            wctx.fill();
            wctx.stroke();

            wctx.textAlign = "center";
            wctx.font = "11px 'JetBrains Mono', monospace";
            wctx.fillStyle = "#e2a86b";
            wctx.fillText("|Ψ⟩ = ∑ cₙ |φₙ⟩  •  SUPERPOSITION", w * 0.5, by + 26);

            wctx.font = "13px 'Inter', sans-serif";
            wctx.fillStyle = "#f1f5f9";
            wctx.fillText("Hover to observe & collapse wavefunction", w * 0.5, by + 48);
            wctx.restore();
          }
        }

        requestAnimationFrame(renderWavefunction);
      }

      renderWavefunction();
    }
  }
})();
