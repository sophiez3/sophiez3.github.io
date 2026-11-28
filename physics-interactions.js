(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 1. GLOBAL TWINKLING CONSTELLATIONS BACKGROUND WITH HOVER HIGHLIGHT */
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.id = "global-constellation-canvas";
  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "0";
  document.body.prepend(canvas);

  let width = 0;
  let height = 0;
  let dpr = 1;

  function resizeSky() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resizeSky();
  window.addEventListener("resize", resizeSky);

  const pointer = { x: -9999, y: -9999, active: false };

  window.addEventListener("pointermove", (e) => {
    if (e.pointerType === "touch") return;
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.active = true;
  });

  window.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "touch") return;
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.active = true;
  }, { passive: true });

  window.addEventListener("pointerleave", () => {
    pointer.active = false;
    pointer.x = -9999;
    pointer.y = -9999;
  });

  // Twinkling background field stars (denser starfield)
  const ambientStars = Array.from({ length: 280 }, () => ({
    nx: Math.random(),
    ny: Math.random(),
    r: 0.5 + Math.random() * 1.35,
    baseAlpha: 0.16 + Math.random() * 0.36,
    phase: Math.random() * Math.PI * 2,
    speed: 0.015 + Math.random() * 0.028
  }));

  // Dispersed constellations across the viewport (normalized 0..1 coordinates)
  const CONSTELLATIONS = [
    {
      name: "CASSIOPEIA",
      hoverLevel: 0,
      stars: [
        [0.05, 0.14],
        [0.09, 0.20],
        [0.13, 0.16],
        [0.17, 0.22],
        [0.21, 0.15]
      ],
      lines: [[0, 1], [1, 2], [2, 3], [3, 4]]
    },
    {
      name: "URSA MAJOR",
      hoverLevel: 0,
      stars: [
        [0.71, 0.11],
        [0.76, 0.13],
        [0.80, 0.17],
        [0.84, 0.20],
        [0.85, 0.26],
        [0.92, 0.25],
        [0.91, 0.19]
      ],
      lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]]
    },
    {
      name: "ORION",
      hoverLevel: 0,
      stars: [
        [0.06, 0.46],
        [0.14, 0.48],
        [0.09, 0.55],
        [0.105, 0.56],
        [0.12, 0.57],
        [0.07, 0.66],
        [0.15, 0.65]
      ],
      lines: [[0, 1], [0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6], [5, 6]]
    },
    {
      name: "CYGNUS",
      hoverLevel: 0,
      stars: [
        [0.88, 0.42],
        [0.85, 0.49],
        [0.81, 0.58],
        [0.78, 0.46],
        [0.92, 0.52]
      ],
      lines: [[0, 1], [1, 2], [3, 1], [1, 4]]
    },
    {
      name: "LYRA",
      hoverLevel: 0,
      stars: [
        [0.08, 0.81],
        [0.11, 0.83],
        [0.10, 0.87],
        [0.14, 0.85],
        [0.13, 0.89]
      ],
      lines: [[0, 1], [1, 2], [1, 3], [2, 4], [3, 4]]
    },
    {
      name: "LEO",
      hoverLevel: 0,
      stars: [
        [0.89, 0.75],
        [0.86, 0.73],
        [0.84, 0.77],
        [0.86, 0.81],
        [0.80, 0.83],
        [0.75, 0.86],
        [0.83, 0.87]
      ],
      lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]]
    },
    {
      name: "TRIANGULUM",
      hoverLevel: 0,
      stars: [
        [0.44, 0.13],
        [0.52, 0.16],
        [0.48, 0.21]
      ],
      lines: [[0, 1], [1, 2], [2, 0]]
    },
    {
      name: "CORONA BOREALIS",
      hoverLevel: 0,
      stars: [
        [0.42, 0.84],
        [0.45, 0.88],
        [0.49, 0.89],
        [0.53, 0.88],
        [0.56, 0.84]
      ],
      lines: [[0, 1], [1, 2], [2, 3], [3, 4]]
    },
    {
      name: "GEMINI",
      hoverLevel: 0,
      stars: [
        [0.33, 0.44],
        [0.38, 0.43],
        [0.32, 0.52],
        [0.37, 0.51],
        [0.31, 0.60],
        [0.36, 0.59]
      ],
      lines: [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [2, 3]]
    },
    {
      name: "AQUILA",
      hoverLevel: 0,
      stars: [
        [0.62, 0.45],
        [0.65, 0.48],
        [0.68, 0.51],
        [0.61, 0.52],
        [0.69, 0.44],
        [0.64, 0.57]
      ],
      lines: [[0, 1], [1, 2], [3, 1], [1, 4], [1, 5]]
    }
  ];

  // Point-to-segment distance helper so hovering near any star OR constellation line highlights that constellation
  function distToSegment(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lenSq = dx * dx + dy * dy;
    if (lenSq === 0) return Math.hypot(px - x1, py - y1);
    let t = ((px - x1) * dx + (py - y1) * dy) / lenSq;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
  }

  let frame = 0;

  function drawConstellations() {
    frame++;
    ctx.clearRect(0, 0, width, height);

    // 1. Draw faint twinkling background stars
    for (let i = 0; i < ambientStars.length; i++) {
      const st = ambientStars[i];
      const twinkle = reducedMotion ? 0 : Math.sin(frame * st.speed + st.phase) * 0.11;
      const alpha = Math.max(0.04, st.baseAlpha + twinkle);
      ctx.beginPath();
      ctx.arc(st.nx * width, st.ny * height, st.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(203, 213, 225, ${alpha.toFixed(3)})`;
      ctx.fill();
    }

    // 2. Determine which single constellation (if any) is closest under the cursor
    let hoveredIndex = -1;
    if (pointer.active && !reducedMotion) {
      let bestDist = 44; // hover threshold in pixels around stars/lines
      CONSTELLATIONS.forEach((c, idx) => {
        // Check distance to stars
        for (let s = 0; s < c.stars.length; s++) {
          const sx = c.stars[s][0] * width;
          const sy = c.stars[s][1] * height;
          const d = Math.hypot(pointer.x - sx, pointer.y - sy);
          if (d < bestDist) {
            bestDist = d;
            hoveredIndex = idx;
          }
        }
        // Check distance to connecting lines
        for (let l = 0; l < c.lines.length; l++) {
          const [a, b] = c.lines[l];
          const x1 = c.stars[a][0] * width;
          const y1 = c.stars[a][1] * height;
          const x2 = c.stars[b][0] * width;
          const y2 = c.stars[b][1] * height;
          const d = distToSegment(pointer.x, pointer.y, x1, y1, x2, y2);
          if (d < bestDist) {
            bestDist = d;
            hoveredIndex = idx;
          }
        }
      });
    }

    // 3. Render each constellation with smooth hover highlight transition
    CONSTELLATIONS.forEach((c, cIdx) => {
      const targetHover = cIdx === hoveredIndex ? 1 : 0;
      c.hoverLevel += (targetHover - c.hoverLevel) * 0.1;
      const h = c.hoverLevel;

      // Constellation connecting lines (brighter baseline visibility + amber hover glow)
      const lineAlpha = 0.24 + h * 0.38;
      ctx.save();
      ctx.strokeStyle = h > 0.05
        ? `rgba(226, 168, 107, ${lineAlpha.toFixed(3)})`
        : `rgba(155, 194, 255, ${lineAlpha.toFixed(3)})`;
      ctx.lineWidth = 1.15 + h * 0.8;
      if (h > 0.05) {
        ctx.shadowBlur = 9 * h;
        ctx.shadowColor = "rgba(226, 168, 107, 0.65)";
      }

      for (let l = 0; l < c.lines.length; l++) {
        const [i, j] = c.lines[l];
        const x1 = c.stars[i][0] * width;
        const y1 = c.stars[i][1] * height;
        const x2 = c.stars[j][0] * width;
        const y2 = c.stars[j][1] * height;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      ctx.restore();

      // Constellation star vertices (brighter default glow + twinkling)
      for (let s = 0; s < c.stars.length; s++) {
        const px = c.stars[s][0] * width;
        const py = c.stars[s][1] * height;
        const twinkle = reducedMotion ? 0 : Math.sin(frame * 0.024 + cIdx * 1.7 + s * 1.1) * 0.14;
        const starAlpha = Math.min(0.98, 0.44 + twinkle + h * 0.5);
        const radius = (s === 0 ? 2.25 : 1.7) + h * 1.15;

        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        if (h > 0.05) {
          ctx.fillStyle = `rgba(255, 232, 188, ${starAlpha.toFixed(3)})`;
          ctx.shadowBlur = 11 * h;
          ctx.shadowColor = "rgba(226, 168, 107, 0.85)";
        } else {
          ctx.shadowBlur = 4;
          ctx.shadowColor = s === 0 ? "rgba(226, 168, 107, 0.35)" : "rgba(138, 180, 248, 0.3)";
          ctx.fillStyle = s === 0
            ? `rgba(234, 178, 118, ${Math.min(0.95, starAlpha + 0.1).toFixed(3)})`
            : `rgba(196, 222, 255, ${starAlpha.toFixed(3)})`;
        }
        ctx.fill();
        ctx.restore();
      }

      // Constellation name label (clearer baseline visibility + amber hover highlight)
      const [lx, ly] = c.stars[0];
      const labelAlpha = 0.26 + h * 0.48;
      ctx.font = "500 9px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.fillStyle = h > 0.05
        ? `rgba(226, 168, 107, ${labelAlpha.toFixed(3)})`
        : `rgba(148, 163, 184, ${labelAlpha.toFixed(3)})`;
      ctx.fillText(c.name, lx * width + 7, ly * height - 6);
    });

    requestAnimationFrame(drawConstellations);
  }

  drawConstellations();

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

    function observeWavefunction(clientX, clientY) {
      const rect = wfShell.getBoundingClientRect();
      focusPoint.x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      focusPoint.y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
      collapsed = true;
      wfShell.classList.add("collapsed");
      if (wfStatus) {
        wfStatus.textContent = "EIGENSTATE OBSERVED // |ψ|² → 1 (RESUME RESOLVED)";
      }
    }

    wfShell.addEventListener("pointerenter", (e) => {
      observeWavefunction(e.clientX, e.clientY);
    });

    wfShell.addEventListener("pointermove", (e) => {
      if (!collapsed) {
        observeWavefunction(e.clientX, e.clientY);
      }
    });

    wfShell.addEventListener("pointerdown", (e) => {
      observeWavefunction(e.clientX, e.clientY);
    });

    wfShell.addEventListener("pointerleave", (e) => {
      if (e.pointerType === "touch") return;
      collapsed = false;
      wfShell.classList.remove("collapsed");
      if (wfStatus) {
        wfStatus.textContent = "SUPERPOSITION STATE // HOVER OR TAP TO OBSERVE & COLLAPSE |ψ⟩";
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
            wctx.fillText("Hover or tap to observe & collapse", w * 0.5, by + 48);
            wctx.restore();
          }
        }

        requestAnimationFrame(renderWavefunction);
      }

      renderWavefunction();
    }
  }

})();
