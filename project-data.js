const PROJECTS = {
  "sound-vs-fire": {
    number: "01",
    category: "EXPERIMENTAL PHYSICS",
    title: "Sound vs. Fire",
    tagline: "Acoustic flame suppression modeled as a damped harmonic oscillator.",
    summary:
      "Experimental and theoretical investigation for the United States Invitational Young Physicists Tournament (USIYPT) analyzing the acoustic frequency, pressure amplitude, and flame geometry parameters governing acoustic flame extinction.",
    skills: ["Experimental Physics", "Acoustics", "Schlieren Imaging", "Differential Equations", "Python"],
    question:
      "Determine how sound frequency, pressure intensity, and flame size interact to displace oxygen and extinguish a convective flame.",
    contribution:
      "Derived the damped oscillator frequency model, captured Schlieren & high-speed optical data, and ran frequency/decibel sweeps.",
    githubUrl: "https://github.com/sophiez3",
    slidesPdf: "assets/sound-fire-research.pdf",
    videoMp4: "", // Leave blank when project only has a slide deck
    diagramHeader: "f_d ≈ 57 Hz / SCHLIEREN",
    diagramFooter: "I = (Δp_max)² / 2ρv   |   55–65 Hz",
    svgDiagram: `
      <svg viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 70 Q 45 20, 80 70 T 150 70 T 220 70 T 290 70" stroke="#8ab4f8" stroke-width="1.5"/>
        <path d="M10 70 Q 45 38, 80 70 T 150 70 T 220 70 T 290 70" stroke="#8ab4f8" stroke-opacity="0.45" stroke-width="1.2"/>
        <path d="M10 70 Q 45 110, 80 70 T 150 70 T 220 70 T 290 70" stroke="#e2a86b" stroke-width="1.5"/>
        <circle cx="150" cy="70" r="5" fill="#e2a86b"/>
        <circle cx="150" cy="70" r="14" stroke="#e2a86b" stroke-dasharray="3 3" stroke-opacity="0.7"/>
      </svg>`,
    mindmap: {
      centralQuestion: "How do acoustic waves overcome convective buoyancy to extinguish a flame?",
      tradeoff: "High pressure amplitude displaces oxygen faster, but excessive amplitude induces turbulent air replenishment.",
      nodes: [
        {
          step: "01 FRAME THE QUESTION",
          title: "Convective Flame Dynamics",
          text: "Treat the rising hot gas column as a damped harmonic oscillator driven by periodic buoyancy forces."
        },
        {
          step: "02 BUILD THE MODEL",
          title: "Damped Natural Frequency",
          text: "Measure logarithmic decrement via high-speed video to compute ω_d ≈ 57 Hz under room damping."
        },
        {
          step: "03 TEST & ITERATE",
          title: "Frequency & dB Sweeps",
          text: "Sweep 0–130 Hz and 85–113 dB across single- and dual-wick candles at a fixed 1 cm speaker distance."
        },
        {
          step: "04 OPTICAL VERIFICATION",
          title: "Schlieren Flow Visualization",
          text: "Confirm boundary-layer oxygen displacement visually at the 55–65 Hz resonant extinction window."
        }
      ]
    }
  },

  "housing-peer-tool": {
    number: "02",
    category: "AI & QUANTITATIVE POLICY",
    title: "Housing Peer Tool",
    tagline: "Structural peer matching and explainable neighborhood triage for housing affordability.",
    summary:
      "Built for the 2026 PNC × 180DC Challenge. Matches target cities to structural peers across seven socioeconomic and infrastructure dimensions, quantifies rent-income divergence, scores neighborhoods across four housing archetypes (0–1), and generates grounded bank product memos.",
    skills: ["FastAPI", "Python", "Pandas / NumPy", "OpenRouter LLM", "SVG Data Viz"],
    question:
      "Identify where city rents diverge from structural peer expectations and route neighborhoods to targeted bank products with fair-lending guardrails.",
    contribution:
      "Architected the FastAPI analytics engine, threshold-based 4-archetype scoring model, dependency-free SVG frontend, and grounded LLM memo generator.",
    githubUrl: "https://github.com/sophiez3",
    slidesPdf: "assets/housing-peer-slides.pdf",
    videoMp4: "assets/housing-peer-demo.mp4",
    diagramHeader: "PEER_MATCH / 4 ARCHETYPES",
    diagramFooter: "Score ∈ [0, 1]   |   ΔRent = +$134/mo",
    svgDiagram: `
      <svg viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="75" y1="35" x2="160" y2="70" stroke="#8ab4f8" stroke-opacity="0.5" stroke-width="1.3"/>
        <line x1="75" y1="105" x2="160" y2="70" stroke="#8ab4f8" stroke-opacity="0.5" stroke-width="1.3"/>
        <line x1="160" y1="70" x2="248" y2="42" stroke="#e2a86b" stroke-width="1.5"/>
        <line x1="160" y1="70" x2="248" y2="98" stroke="#8ab4f8" stroke-opacity="0.5" stroke-width="1.3"/>
        <rect x="25" y="22" width="95" height="26" rx="4" fill="#131c2e" stroke="#334155"/>
        <text x="34" y="39" fill="#94a3b8" font-family="monospace" font-size="9">City Peer Fit</text>
        <rect x="25" y="92" width="95" height="26" rx="4" fill="#131c2e" stroke="#334155"/>
        <text x="34" y="109" fill="#94a3b8" font-family="monospace" font-size="9">Tract Metrics</text>
        <rect x="122" y="56" width="76" height="28" rx="4" fill="#182236" stroke="#e2a86b"/>
        <text x="131" y="74" fill="#e2a86b" font-family="monospace" font-size="9">0-1 Triage</text>
        <rect x="215" y="28" width="85" height="26" rx="4" fill="#131c2e" stroke="#e2a86b"/>
        <text x="223" y="45" fill="#f1f5f9" font-family="monospace" font-size="9">Bank Product</text>
        <rect x="215" y="84" width="85" height="26" rx="4" fill="#131c2e" stroke="#334155"/>
        <text x="223" y="101" fill="#94a3b8" font-family="monospace" font-size="9">Grounded Memo</text>
      </svg>`,
    mindmap: {
      centralQuestion: "How can financial institutions allocate housing capital equitably using explainable peer benchmarks?",
      tradeoff: "Transparent threshold weights and human fair-lending review over opaque black-box neural scoring.",
      nodes: [
        {
          step: "01 FRAME THE QUESTION",
          title: "Structural Peer Benchmarking",
          text: "Compare cities on income, job mix, housing age, commute, and broadband rather than raw geography."
        },
        {
          step: "02 BUILD THE MODEL",
          title: "4-Archetype Tract Scoring",
          text: "Score neighborhoods 0–1 across vacant sites, transit lots, tangled titles, and severe energy burden."
        },
        {
          step: "03 IMPLEMENTATION",
          title: "FastAPI + Dependency-Free UI",
          text: "Validate CSV uploads in-memory with pandas/NumPy and render interactive SVG peer regression charts."
        },
        {
          step: "04 GOVERNANCE & OUTPUT",
          title: "Fact-Grounded LLM Memos",
          text: "Restrict OpenRouter LLM synthesis strictly to computed metrics alongside mandatory fair-lending checks."
        }
      ]
    }
  },

  "india-carefinder": {
    number: "03",
    category: "DATA ENGINEERING & AI",
    title: "India CareFinder",
    tagline: "Geospatially verified hospital discovery and readiness scoring across India.",
    summary:
      "Built for the Databricks Datathon 2026. Helps patients find reliable hospitals for urgent or planned care using a PySpark & Spark SQL pipeline that cross-checks coordinates against Indian PIN codes and OpenStreetMap data while surfacing evidence quotes in an explainable 'How We Decide' tab.",
    skills: ["Databricks", "PySpark", "Spark SQL", "OpenStreetMap", "Python"],
    question:
      "Verify noisy healthcare facility records at national scale and adapt readiness scoring for emergency vs. planned patient care.",
    contribution:
      "Designed the dual-mode readiness weighting logic, built the PySpark geospatial cross-validation pipeline, and created the 'How We Decide' explainability tab.",
    githubUrl: "https://github.com/sophiez3",
    slidesPdf: "",
    videoMp4: "assets/carefinder-demo.mp4",
    diagramHeader: "GEOSPATIAL / PIN × OSM",
    diagramFooter: "Emergency vs. Planned Weights",
    svgDiagram: `
      <svg viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="160" cy="70" rx="115" ry="44" stroke="#8ab4f8" stroke-opacity="0.35" stroke-width="1.2"/>
        <ellipse cx="160" cy="70" rx="72" ry="26" stroke="#e2a86b" stroke-opacity="0.65" stroke-width="1.3"/>
        <circle cx="160" cy="70" r="5" fill="#e2a86b"/>
        <circle cx="105" cy="52" r="3.5" fill="#8ab4f8"/>
        <circle cx="212" cy="84" r="3.5" fill="#8ab4f8"/>
        <line x1="105" y1="52" x2="160" y2="70" stroke="#8ab4f8" stroke-dasharray="2 2"/>
        <line x1="212" y1="84" x2="160" y2="70" stroke="#8ab4f8" stroke-dasharray="2 2"/>
      </svg>`,
    mindmap: {
      centralQuestion: "How can patients trust hospital recommendations when facility directories contain coordinate and service errors?",
      tradeoff: "Strict geospatial cross-verification against OpenStreetMap and PIN boundaries to eliminate false positives.",
      nodes: [
        {
          step: "01 FRAME THE QUESTION",
          title: "Urgent vs. Planned Care Logic",
          text: "Separate patient intent so emergency routing prioritizes proximity and trauma readiness over elective breadth."
        },
        {
          step: "02 DATA ENGINEERING",
          title: "PySpark & OSM Cross-Check",
          text: "Validate raw coordinates against Indian PIN boundaries and external OpenStreetMap records in Spark SQL."
        },
        {
          step: "03 EXPLAINABILITY",
          title: "'How We Decide' Evidence",
          text: "Extract verbatim supporting quotes from facility descriptions so every ranking displays verifiable proof."
        },
        {
          step: "04 DEPLOYMENT",
          title: "Databricks SQL Warehouse",
          text: "Serve curated Unity Catalog tables directly to the live web app for low-latency patient queries."
        }
      ]
    }
  },

  "smart-kitchen": {
    number: "04",
    category: "FULL-STACK SYSTEMS",
    title: "Smart Kitchen",
    tagline: "Automated inventory reconciliation and natural-language order handoff pipeline.",
    summary:
      "End-to-end kitchen operations platform synchronizing multi-database ingredient states with live menu availability, translating conversational customer requests into structured ingredient deductions, and verifying order handoffs via QR tokens.",
    skills: ["FastAPI", "React", "Python", "SQL", "LLM Schemas"],
    question:
      "Prevent order fulfillment failures by reconciling natural-language custom orders against real-time ingredient inventory.",
    contribution:
      "Built the relational inventory state engine, structured LLM order parser, and transactional QR handoff verification workflow.",
    githubUrl: "https://github.com/sophiez3",
    slidesPdf: "assets/smart-kitchen-slides.pdf",
    videoMp4: "assets/smart-kitchen-demo.mp4",
    diagramHeader: "STATE_SYNC / INVENTORY",
    diagramFooter: "Order → Schema → Deduction",
    svgDiagram: `
      <svg viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="52" width="68" height="36" rx="4" fill="#131c2e" stroke="#8ab4f8"/>
        <text x="42" y="74" fill="#8ab4f8" font-family="monospace" font-size="9">NL Order</text>
        <path d="M98 70 H 126" stroke="#e2a86b" stroke-width="1.5"/>
        <rect x="126" y="46" width="68" height="48" rx="4" fill="#182236" stroke="#e2a86b"/>
        <text x="136" y="67" fill="#e2a86b" font-family="monospace" font-size="9">JSON</text>
        <text x="136" y="80" fill="#f1f5f9" font-family="monospace" font-size="9">Schema</text>
        <path d="M194 70 H 222" stroke="#e2a86b" stroke-width="1.5"/>
        <rect x="222" y="52" width="68" height="36" rx="4" fill="#131c2e" stroke="#8ab4f8"/>
        <text x="233" y="74" fill="#8ab4f8" font-family="monospace" font-size="9">DB Sync</text>
      </svg>`,
    mindmap: {
      centralQuestion: "How do we bridge unstructured customer modifications with strict relational inventory states?",
      tradeoff: "Deterministic SQL stock locks paired with constrained LLM schema extraction to prevent overselling.",
      nodes: [
        {
          step: "01 FRAME THE QUESTION",
          title: "Inventory-Menu Drift",
          text: "Eliminate mismatches between front-of-house menu availability and back-of-house ingredient stock."
        },
        {
          step: "02 BUILD THE MODEL",
          title: "Structured Order Parsing",
          text: "Translate free-text dietary modifications into typed JSON ingredient deduction deltas."
        },
        {
          step: "03 IMPLEMENTATION",
          title: "Transactional State Engine",
          text: "Enforce atomic stock checks in FastAPI/SQL before confirming order tickets."
        },
        {
          step: "04 VERIFICATION",
          title: "QR Handoff Loop",
          text: "Close the kitchen lifecycle with token-verified order pickup and live status updates."
        }
      ]
    }
  }
};