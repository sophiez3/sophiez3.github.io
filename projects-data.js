const PROJECTS = {
  "voyager-grand-tour": {
    number: "01",
    category: "COMPUTATIONAL PHYSICS",
    subtitle: "Independent computational-physics project",
    title: "Voyager Grand Tour Simulator",
    cardSummary:
      "An interactive multi-body orbital simulator that models the Voyager 1 and Voyager 2 grand tours and allows users to design their own planetary missions. Combines fourth-order Runge–Kutta integration with encounter-aware time-step refinement to resolve gravity assists across vastly different spatial and temporal scales.",
    cardNote: "Development: Designed and implemented independently without generative AI.",
    skills: [
      "Python",
      "Web VPython",
      "N-body dynamics",
      "RK4 integration",
      "Adaptive time stepping",
      "Hill spheres",
      "Vector mechanics",
      "Interactive 3D visualization"
    ],
    fullDescription: [
      "The Voyager Grand Tour Simulator is an interactive computational-physics application that models the nonlinear trajectories and planetary gravity assists of Voyager 1 and Voyager 2. In addition to historical mission scenarios, it provides an open-ended sandbox for configuring and exploring arbitrary spacecraft trajectories within the Solar System.",
      "I implemented a fourth-order Runge–Kutta numerical integrator that evaluates the net vector gravitational acceleration acting on each simulated body at every RK4 sub-step. The model incorporates the Sun, all eight major planets, and the spacecraft, allowing curved heliocentric trajectories and close planetary flybys to emerge from the gravitational equations rather than from predetermined animation paths.",
      "A fixed integration step presents a numerical challenge: a step large enough to simulate years of interplanetary travel efficiently can lose accuracy during a fast, close planetary encounter. To address this, I developed an encounter-aware time-stepping system based on planetary Hill spheres. When a Voyager spacecraft enters a planet’s surrounding encounter region, the simulator reduces the integration step to resolve the rapid change in gravitational acceleration near periapsis. It also shifts the viewing frame toward the encounter body, making the geometry and deflection of the flyby easier to examine.",
      "The application includes historical initial conditions for outer-planet encounters and an interactive mission-design sandbox. Users can place probes using ray-projected orbital-ring snapping, adjust launch-vector components, and observe the resulting trajectories in real time. Live kinetic- and potential-energy plots provide diagnostic insight into energy changes during hyperbolic gravity assists and help reveal numerical instability."
    ],
    aiTransparency: {
      badge: "INDEPENDENT IMPLEMENTATION // NO GENERATIVE AI",
      paragraphs: [
        "This project was designed and programmed independently without generative AI assistance, including the physical model, RK4 integrator, adaptive encounter logic, interaction design, implementation, and debugging.",
        "It demonstrates my ability to translate physical laws into numerical algorithms, reason about accuracy and computational cost, and build interactive scientific software around a mathematical model."
      ]
    },
    question:
      "Resolve multi-year interplanetary trajectories and rapid hyperbolic planetary gravity assists simultaneously without sacrificing numerical stability or frame rate.",
    contribution:
      "Independently designed and coded the 10-body RK4 gravitational integrator, Hill-sphere adaptive time-stepping engine, ray-projected orbital sandbox, and live energy diagnostics.",
    githubUrl: "https://github.com/sophiez3",
    liveUrl: "",
    slidesPdf: "",
    videoMp4: "",
    diagramHeader: "N-BODY / RK4 + HILL SPHERES",
    diagramFooter: "Δt(r) Adaptive   |   Sun + 8 Planets + Probe",
    svgDiagram: `
      <svg viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="145" cy="74" rx="115" ry="44" transform="rotate(-10 145 74)" stroke="#8ab4f8" stroke-opacity="0.35" stroke-width="1.2"/>
        <ellipse cx="145" cy="74" rx="68" ry="26" transform="rotate(-10 145 74)" stroke="#8ab4f8" stroke-opacity="0.55" stroke-width="1.2"/>
        <circle cx="145" cy="74" r="6" fill="#e2a86b"/>
        <circle cx="206" cy="54" r="4.5" fill="#8ab4f8"/>
        <circle cx="206" cy="54" r="18" stroke="#e2a86b" stroke-dasharray="3 3" stroke-opacity="0.75"/>
        <path d="M92 98 Q 165 76, 204 42 T 288 18" stroke="#e2a86b" stroke-width="1.6" fill="none"/>
        <circle cx="204" cy="42" r="3" fill="#fff1cc"/>
      </svg>`,
    mindmap: {
      centralQuestion: "How can an interactive N-body solver accurately resolve fast planetary gravity assists across multi-year heliocentric timescales?",
      tradeoff: "Fixed large time steps distort periapsis deflection, while globally tiny steps stall multi-year cruises—solved via Hill-sphere adaptive step refinement.",
      nodes: [
        {
          step: "01 FRAME THE PHYSICS",
          title: "10-Body Gravitational Dynamics",
          text: "Model the Sun, all eight major planets, and spacecraft probes so hyperbolic flybys emerge purely from Newtonian vector accelerations."
        },
        {
          step: "02 NUMERICAL SOLVER",
          title: "Fourth-Order Runge–Kutta (RK4)",
          text: "Evaluate net gravitational acceleration across all four RK4 sub-steps per frame to preserve orbital energy over multi-year tours."
        },
        {
          step: "03 ADAPTIVE REFINEMENT",
          title: "Hill-Sphere Encounter Trigger",
          text: "Shrink Δt and shift camera focus onto the encounter planet whenever a probe enters its gravitational Hill sphere."
        },
        {
          step: "04 MISSION SANDBOX",
          title: "Interactive Probe Placement & Energy Plots",
          text: "Combine ray-projected orbital-ring snapping and live kinetic/potential energy charts to diagnose slingshot Δv and numerical drift."
        }
      ]
    }
  },

  "india-carefinder": {
    number: "02",
    category: "DATA ENGINEERING & AI",
    subtitle: "Explainable healthcare-facility recommender | Databricks Datathon 2026",
    title: "India CareFinder",
    cardSummary:
      "An explainable decision-support application that helps patients and community health workers compare Indian hospitals for services such as dialysis, emergency C-sections, NICU care, and trauma treatment. Ranks facilities using urgency-specific criteria, shows supporting evidence, and warns when data is incomplete or contradictory.",
    cardNote: "Built with Databricks, PySpark, Spark SQL, FastAPI, React, TypeScript & OpenStreetMap.",
    skills: [
      "Databricks",
      "PySpark",
      "Spark SQL",
      "SQL Warehouse",
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "REST APIs",
      "OpenStreetMap",
      "Geospatial validation"
    ],
    fullDescription: [
      "India CareFinder is an explainable hospital-recommendation application developed for the Databricks Datathon 2026. It helps patients, community health workers, and healthcare planners identify facilities for urgent or planned medical services without treating incomplete directory data as unquestionable fact.",
      "A user enters a needed service or related condition, a location, and practical preferences such as urgency, travel radius, budget, and insurance. The application then ranks nearby facilities and explains each result through source-text quotations, a factor-by-factor score breakdown, and warnings about missing or conflicting information.",
      "I designed the ranking framework around 11 interpretable factors, including travel time, strength of service evidence, operating availability, relevant specialists and equipment, outside verification, cost, insurance, location confidence, and facility capacity. The weights change with the clinical context: emergency searches emphasize speed and availability, while planned-care searches place more weight on evidence, affordability, and insurance. When a field such as wait time is unavailable, the system excludes it and rescales the remaining weights instead of inventing a value. Facilities supported by only weak service evidence are prevented from outranking better-supported options.",
      "Behind the application, a Databricks pipeline built with PySpark and Spark SQL standardizes approximately 10,000 Virtue Foundation facility records, identifies service evidence across multiple fields, extracts supporting quotations, and checks facility coordinates against Indian PIN-code geography. I also incorporated an external OpenStreetMap dataset of more than 121,000 healthcare locations to cross-check facility identity and proximity and supplement ownership information where available.",
      "The deployed Databricks version connects a React and TypeScript interface to a FastAPI backend and Databricks SQL Warehouse. A separate Vercel deployment demonstrates the interface using sample data. The “How We Decide” view exposes the weights, rubrics, assumptions, and tradeoffs behind every score so users can inspect the recommendation rather than being asked to trust a black box."
    ],
    aiTransparency: {
      badge: "AI-ASSISTED IMPLEMENTATION // HUMAN-DESIGNED LOGIC",
      paragraphs: [
        "I used generative AI as a coding assistant and technical tutor while developing India CareFinder. It helped me translate my specifications into SQL, Python, and frontend code, understand unfamiliar Databricks workflows, and iterate more quickly during the hackathon.",
        "I defined the product concept, selected and weighted the readiness factors, designed the emergency and planned-care decision logic, chose the external validation strategy, and specified how evidence and uncertainty should be communicated. I reviewed, adapted, integrated, and tested the generated implementation rather than treating generated code as automatically correct."
      ]
    },
    question:
      "Rank Indian healthcare facilities for urgent vs. planned care while exposing missing data, coordinate errors, and supporting source evidence transparently.",
    contribution:
      "Defined the 11-factor clinical readiness framework, urgency-dependent dynamic weight rescaling, PySpark/OpenStreetMap geospatial validation strategy, and 'How We Decide' explainability tab.",
    githubUrl: "https://github.com/sophiez3",
    liveUrl: "https://india-carefinder-2l5k0amix-red-pandas1.vercel.app/",
    liveLabel: "Launch Vercel Sample Demo ↗",
    slidesPdf: "",
    videoMp4: "assets/carefinder-demo.mp4",
    diagramHeader: "11 FACTORS / 10K × 121K OSM",
    diagramFooter: "Dynamic Weight Rescaling   |   PIN Validation",
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
      centralQuestion: "How do we recommend hospitals safely when directory records contain gaps, weak claims, or coordinate errors?",
      tradeoff: "Exclude missing fields and dynamically rescale the 11 weights rather than imputing synthetic values that could mislead urgent care decisions.",
      nodes: [
        {
          step: "01 CLINICAL CONTEXT",
          title: "11-Factor Readiness Rubrics",
          text: "Shift factor weights dynamically between emergency speed/availability and planned-care evidence, cost, and insurance."
        },
        {
          step: "02 GEOSPATIAL PIPELINE",
          title: "10K Records × 121K OSM Check",
          text: "Standardize Virtue Foundation directories in PySpark, verify coordinates against Indian PIN boundaries, and cross-match OpenStreetMap."
        },
        {
          step: "03 UNCERTAINTY GUARDRAILS",
          title: "Weight Rescaling & Evidence Caps",
          text: "Rescale weights when fields are missing and cap weak-evidence facilities from outranking verified hospitals."
        },
        {
          step: "04 EXPLAINABLE UI",
          title: "'How We Decide' & Verbatim Quotes",
          text: "Surface source-text quotations, factor breakdowns, and contradiction warnings via FastAPI and Databricks SQL Warehouse."
        }
      ]
    }
  },

  "housing-peer-tool": {
    number: "03",
    category: "AI & QUANTITATIVE POLICY",
    subtitle: "Explainable housing-affordability framework | PNC x 180DC Challenge 2026",
    title: "Housing Peer Tool",
    cardSummary:
      "A team-designed decision-support framework that helps financial institutions identify why housing affordability differs across comparable communities and select targeted interventions. Compares peer cities, scores neighborhoods across four locally defined housing archetypes, checks for unequal outcomes, and connects each archetype to bank products, partners, safeguards, and KPIs.",
    cardNote: "My role: Problem framing, archetype/factor design, case study, and prototype specs.",
    skills: [
      "FastAPI",
      "Python",
      "Pandas / NumPy",
      "OpenRouter LLM",
      "SVG Visualization",
      "Policy & Financial Design"
    ],
    fullDescription: [
      "The Housing Peer Tool was developed for the 2026 PNC x 180 Degrees Consulting Challenge as a proposal for how financial institutions could use data and AI to target housing-affordability interventions more precisely.",
      "Our team designed a three-level framework. At the city level, the tool identifies structurally similar peers using characteristics such as population, income, employment mix, housing age, commute patterns, broadband access, and homeownership. It then fits rent against income across the peer group to estimate whether a selected city’s rent is higher or lower than its income would predict and highlights the factors on which that city differs most from its peers.",
      "Within a city, neighborhoods receive separate scores from 0 to 1 for four human-defined housing archetypes: (1) vacant or obsolete properties suitable for adaptive reuse, (2) underused land near transit in low-car-ownership communities, (3) tangled-title properties and unsubsidized small-landlord rentals, and (4) older homes facing high energy and repair burdens. Our team selected these categories, researched the local conditions behind them, defined the relevant factors and thresholds, and designed a corresponding financial intervention for each—including an adaptive-reuse facility, a transit-oriented ground-lease and pooled fund, title legal assistance with landlord repair financing, and an energy-efficiency rehabilitation loan, complete with partners, KPIs, and human and fair-lending review.",
      "We accompanied the proposal with an AI-assisted web prototype using sample data for Philadelphia, Pittsburgh, and comparison cities. The FastAPI backend uses pandas and NumPy to validate uploaded CSV files, identify city peers, calculate rent-income divergence, score neighborhood archetypes, and compare similar neighborhoods for unequal access, while a dependency-free frontend renders interactive SVG charts.",
      "The prototype’s core classifications are transparent, threshold-based calculations rather than opaque LLM judgments. An OpenRouter-connected language model is used only after the analysis: it converts the computed findings into a recommendation memo and is instructed to rely exclusively on facts supplied by the analytical pipeline."
    ],
    aiTransparency: {
      badge: "TEAM-DESIGNED FRAMEWORK // AI-IMPLEMENTED PROTOTYPE",
      paragraphs: [
        "This was a team-designed, AI-implemented prototype. We developed the housing-affordability framework, selected the four neighborhood archetypes, defined the relevant factors and targeted interventions, researched the case study, and established the human and fair-lending safeguards.",
        "Generative AI translated those specifications into the analytical algorithms and web application, assisted with research and presentation development, and generated recommendation memos from the tool’s calculated results. I do not present the application code or algorithms as independently programmed by me."
      ]
    },
    question:
      "Help financial institutions diagnose why housing affordability diverges across comparable cities and deploy fair-lending-reviewed interventions at the neighborhood level.",
    contribution:
      "Led housing-problem framing, designed the 4 neighborhood archetypes and threshold rubrics, conducted the Philadelphia/Pittsburgh case-study research, and wrote the prototype specifications.",
    githubUrl: "https://github.com/sophiez3",
    liveUrl: "",
    slidesPdf: "assets/housing-peer-slides.pdf",
    videoMp4: "assets/housing-peer-demo.mp4",
    diagramHeader: "3-LEVEL PEER MODEL / 4 ARCHETYPES",
    diagramFooter: "Score ∈ [0, 1]   |   Fair-Lending Guardrails",
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
      centralQuestion: "How can banks target housing capital using explainable peer benchmarks rather than opaque black-box scoring?",
      tradeoff: "Deterministic threshold-based archetype scoring and mandatory fair-lending review over autonomous LLM classification.",
      nodes: [
        {
          step: "01 CITY PEER FIT",
          title: "Structural Peer Regression",
          text: "Match cities across 7 socioeconomic/infrastructure metrics and fit rent on income to quantify affordability divergence."
        },
        {
          step: "02 NEIGHBORHOOD TRIAGE",
          title: "4 Human-Defined Archetypes",
          text: "Score tracts 0–1 for vacant sites, transit-adjacent lots, tangled titles/small rentals, and severe energy burden."
        },
        {
          step: "03 TARGETED PRODUCTS",
          title: "Bank Solutions, Partners & KPIs",
          text: "Route each archetype to tailored lending facilities, local CDC/legal-aid partners, and measurable outcomes."
        },
        {
          step: "04 GROUNDED SYNTHESIS",
          title: "Fact-Constrained LLM Memo",
          text: "Use OpenRouter strictly after pandas/NumPy computation to draft memos bound solely to verified pipeline outputs."
        }
      ]
    }
  },

  "sound-vs-fire": {
    number: "04",
    category: "EXPERIMENTAL PHYSICS",
    subtitle: "Independent high-school physics research",
    title: "Sound-Based Fire Suppression",
    cardSummary:
      "An experimental and theoretical investigation of acoustic flame suppression. Modeled flame convection as an oscillatory system and used controlled acoustic trials, Schlieren imaging, high-speed video, and sensor measurements to study how frequency, sound intensity, and flame geometry influence extinction.",
    cardNote: "Development: Conducted independently without generative AI.",
    skills: [
      "Damped harmonic motion",
      "Acoustic resonance",
      "Logarithmic decrement",
      "Schlieren imaging",
      "High-speed video analysis",
      "Temperature & light sensing",
      "Controlled parameter sweeps"
    ],
    fullDescription: [
      "Sound-Based Fire Suppression was an independent high-school physics research project investigating how low-frequency sound can extinguish a small flame. I combined a theoretical model of flame oscillation with controlled experiments to study the effects of acoustic frequency, sound intensity, and flame size.",
      "I treated the convective flame body as an oscillatory system subject to damping. Temperature and light-intensity measurements provided evidence of periodic flame behavior, while high-speed video enabled displacement measurements and logarithmic decrement analysis. Schlieren imaging was used to visualize the motion of air around the flame under acoustic excitation.",
      "To determine the most effective acoustic conditions, I placed the flame at a controlled distance from a speaker and performed frequency sweeps with a function generator. For a single-wick flame, extinction occurred most effectively between approximately 55 and 65 Hz, with the shortest recorded extinction time occurring near 60 Hz. I then varied sound intensity and found an effective experimental range near 100–102 dB under the tested conditions.",
      "I also investigated the effect of flame geometry by comparing single- and dual-wick flames. The larger dual-wick flame required substantially longer acoustic exposure and extinguished across a narrower frequency interval, demonstrating that an effective suppression regime does not scale independently of flame size.",
      "Finally, I evaluated limitations including ambient airflow from the school ventilation system, the restricted output range of the speaker, the absence of a sound collimator, and uncertainty in video-based displacement measurements. These limitations informed how cautiously the observed resonance and intensity ranges could be generalized beyond the experimental apparatus."
    ],
    aiTransparency: {
      badge: "INDEPENDENT RESEARCH // NO GENERATIVE AI",
      paragraphs: [
        "Conducted independently without generative AI assistance, including theoretical modeling, experimental apparatus setup, Schlieren and high-speed optical measurements, data analysis, and error evaluation."
      ]
    },
    question:
      "Investigate the acoustic frequency, sound intensity, and flame geometry parameters that govern low-frequency acoustic flame extinction.",
    contribution:
      "Formulated the damped harmonic oscillator model of flame convection, captured Schlieren and high-speed optical data, executed parameter sweeps, and analyzed experimental error bounds.",
    githubUrl: "https://github.com/sophiez3",
    liveUrl: "",
    slidesPdf: "assets/sound-fire-research.pdf",
    videoMp4: "",
    diagramHeader: "RESONANCE / 55–65 Hz @ 100–102 dB",
    diagramFooter: "Damped Oscillator   |   Schlieren Flow",
    svgDiagram: `
      <svg viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 70 Q 45 20, 80 70 T 150 70 T 220 70 T 290 70" stroke="#8ab4f8" stroke-width="1.5"/>
        <path d="M10 70 Q 45 38, 80 70 T 150 70 T 220 70 T 290 70" stroke="#8ab4f8" stroke-opacity="0.45" stroke-width="1.2"/>
        <path d="M10 70 Q 45 110, 80 70 T 150 70 T 220 70 T 290 70" stroke="#e2a86b" stroke-width="1.5"/>
        <circle cx="150" cy="70" r="5" fill="#e2a86b"/>
        <circle cx="150" cy="70" r="14" stroke="#e2a86b" stroke-dasharray="3 3" stroke-opacity="0.7"/>
      </svg>`,
    mindmap: {
      centralQuestion: "How do acoustic frequency, pressure intensity, and flame size interact to extinguish a convective flame?",
      tradeoff: "Optimal suppression requires matching the flame's resonant band (55–65 Hz) at 100–102 dB without inducing excessive turbulent oxygen replenishment.",
      nodes: [
        {
          step: "01 OSCILLATOR MODEL",
          title: "Convective Damping & Logarithmic Decrement",
          text: "Verify periodic temperature/light oscillations and extract damping ratios from high-speed flame displacement videos."
        },
        {
          step: "02 OPTICAL FLOW",
          title: "Schlieren Imaging",
          text: "Visualize acoustic pressure waves displacing hot combustion gases and starving the flame boundary layer of oxygen."
        },
        {
          step: "03 PARAMETER SWEEPS",
          title: "Frequency, Intensity & Wick Scaling",
          text: "Identify the 55–65 Hz (60 Hz peak) and 100–102 dB regimes, and demonstrate slower, narrower suppression for dual-wick flames."
        },
        {
          step: "04 ERROR ANALYSIS",
          title: "Apparatus & Environmental Bounds",
          text: "Account for ventilation drafts, uncollimated speaker dispersion, and high-speed tracking uncertainty when generalizing results."
        }
      ]
    }
  },

  "motme": {
    number: "05",
    category: "PRODUCT DESIGN & AI SYSTEMS",
    subtitle: "Gamified travel and memory-keeping experience | Team hackathon project",
    title: "MotMe",
    cardSummary:
      "MotMe turns exploring a city into a sequence of location-based quests. Completing a challenge with a photo adds the memory to an automatically themed digital scrapbook and reveals a hint for the next destination.",
    cardNote: "My contribution: Originated the scrapbook & quest-unlocking concept, product architecture, and Figma UI.",
    skills: [
      "Figma",
      "Gemini API",
      "Neon",
      "Vercel",
      "Generative AI-assisted development"
    ],
    fullDescription: [
      "MotMe is a gamified travel application created by a four-person hackathon team. It encourages travelers to experience a city through a sequence of location-based quests rather than following a conventional itinerary.",
      "For each destination, the application presents the user with a challenge and a clue leading to a notable local place. When the user completes the challenge by submitting a photo, the image is automatically incorporated into a scrapbook styled around that city. Completing one quest also unlocks a hint for the next, creating a progression loop that connects exploration, discovery, and memory keeping.",
      "I originated the idea of combining automatic scrapbooking with sequential quest unlocking. I also helped design the interface in Figma and shape the user journey across destination selection, quest discovery, photo submission, scrapbook creation, and clue progression.",
      "The team designed the application’s general architecture and used generative AI to accelerate its visual design and implementation. The Gemini API supplies location-specific destination and quest content. A teammate was responsible for connecting the application to Neon so that user, trip, quest, and scrapbook information could persist across sessions.",
      "My work centered on product ideation, interaction design, and defining how the application’s features should operate together. I contributed to the implementation process with AI assistance, but I do not claim sole authorship of the generated code or ownership of the database integration."
    ],
    aiTransparency: {
      badge: "4-PERSON HACKATHON TEAM // AI-ASSISTED BUILD",
      paragraphs: [
        "MotMe was created by a four-person team. I originated the automatic scrapbook and sequential quest-unlocking concepts, contributed to the overall product architecture, and helped design the user interface in Figma. Another teammate led the Neon database integration.",
        "We used generative AI to assist with interface design, integration, and application functionality, while the central product concept and user workflow were developed by the team."
      ]
    },
    question:
      "Transform rigid sightseeing itineraries into an interactive progression loop that pairs real-world city discovery with automatic digital memory keeping.",
    contribution:
      "Originated the automatic scrapbook and sequential quest-unlocking loop, co-designed the Figma interface, and shaped the end-to-end user journey and product architecture.",
    githubUrl: "https://github.com/sophiez3/motme-travel-app",
    liveUrl: "https://motme.vercel.app/",
    slidesPdf: "",
    videoMp4: "",
    diagramHeader: "QUEST_LOOP / SCRAPBOOK × CLUES",
    diagramFooter: "Photo Capture → Auto-Theme → Next Hint",
    svgDiagram: `
      <svg viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M55 70 C 55 32, 145 32, 160 70 C 175 108, 265 108, 265 70 C 265 32, 175 32, 160 70 C 145 108, 55 108, 55 70 Z" stroke="#8ab4f8" stroke-opacity="0.45" stroke-width="1.3"/>
        <circle cx="72" cy="52" r="4.5" fill="#e2a86b"/>
        <circle cx="160" cy="70" r="5" fill="#fff1cc"/>
        <circle cx="248" cy="88" r="4.5" fill="#8ab4f8"/>
        <text x="38" y="34" fill="#e2a86b" font-family="monospace" font-size="8.5">Quest &amp; Clue</text>
        <text x="128" y="26" fill="#94a3b8" font-family="monospace" font-size="8.5">Photo Verify</text>
        <text x="212" y="114" fill="#8ab4f8" font-family="monospace" font-size="8.5">City Scrapbook</text>
      </svg>`,
    mindmap: {
      centralQuestion: "How can travel software turn passive sightseeing into an active discovery and memory-keeping loop?",
      tradeoff: "Balancing structured sequential quest progression with flexible photo-driven scrapbook assembly across diverse cities.",
      nodes: [
        {
          step: "01 CORE IDEATION",
          title: "Sequential Quest + Scrapbook Loop",
          text: "Combine progressive clue unlocking with automatic city-themed scrapbook generation upon photo completion."
        },
        {
          step: "02 INTERFACE DESIGN",
          title: "Figma User Journey",
          text: "Design intuitive flows across city selection, quest clues, camera/photo submission, and real-time album layouts."
        },
        {
          step: "03 AI CONTENT ENGINE",
          title: "Gemini API Quest Generation",
          text: "Generate location-specific destination challenges and progressive hints tailored to each selected city."
        },
        {
          step: "04 FULL-STACK PERSISTENCE",
          title: "Neon Database & Vercel Deployment",
          text: "Persist user trips, unlocked clues, and scrapbook entries across sessions (teammate-led Neon integration) hosted on Vercel."
        }
      ]
    }
  }
};
