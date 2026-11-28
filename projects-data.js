const PROJECTS = {
  "voyager-grand-tour": {
    number: "01",
    category: "COMPUTATIONAL PHYSICS",
    subtitle: "AP Physics C 2026 Final Project",
    title: "Voyager Grand Tour Simulator",
    cardSummary:
      "An interactive multi-body orbital simulator that models the Voyager 1 and Voyager 2 grand tours and lets users design their own planetary missions. The simulator uses fourth-order Runge–Kutta numerical integration with specific time-step refinement when the spacecraft enters planetary Hill Spheres.",
    cardNotes: [
      "Development: Designed and implemented on Glowscript VPython independently without generative AI."
    ],
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
      "The Voyager Grand Tour Simulator models the nonlinear trajectories and planetary gravity assists of Voyager 1 and Voyager 2. In addition to historical mission scenarios, it provides an experimental mode for users to explore arbitrary spacecraft trajectories and gravity-assist sequences within the Solar System.",
      "I implemented fourth-order Runge–Kutta numerical integration that evaluates the net gravitational force acting on each planet and spacecraft at every RK4 sub-step. The model includes the gravitational influences of the Sun, all eight major planets, and the spacecraft. As a result, the curved heliocentric trajectories and close planetary flybys emerge from real-time physics calculations rather than predetermined animation paths.",
      "A major challenge I faced was having a fixed integration step: a big step corresponding to multiple years can lose accuracy during a fast, close planetary encounter. However, only using a very small time step would result in a very slow simulation. To address this challenge, I modified the time-step when the spacecraft enters a planet’s Hill sphere. When a spacecraft enters this region, the simulator reduces the integration step for greater accuracy. This ensures that the spacecraft can be effectively accelerated during the flyby. When the spacecraft is within the Hill Sphere, the simulator also zooms the viewing frame in toward the planetary encounter, making the trajectory geometry and deflection easier to visualize.",
      "The simulator also includes an interactive mission-design sandbox. Users can configure specific planetary and spacecraft positions, adjust the spacecraft’s angle, and observe the resulting trajectories in real time. Live kinetic and potential energy plots provide insight into energy changes during gravity assists."
    ],
    aiTransparency: {
      badge: "INDEPENDENT IMPLEMENTATION // NO GENERATIVE AI",
      paragraphs: [
        "Developed independently without generative AI assistance, including the physical model, adaptive encounter logic, and UI."
      ]
    },
    question:
      "Resolve multi-year interplanetary trajectories and rapid hyperbolic planetary gravity assists simultaneously without sacrificing numerical accuracy or simulation speed.",
    contribution:
      "Designed and implemented on Glowscript VPython independently without generative AI, including the physical model, RK4 integrator, Hill-sphere adaptive encounter logic, and UI.",
    githubUrl: "https://github.com/sophiez3",
    liveUrl: "",
    slidesPdf: "",
    videoMp4: "",
    mindmap: {
      centralQuestion: "How can an N-body orbital solver accurately resolve fast planetary gravity assists across multi-year heliocentric timescales?",
      tradeoff: "Fixed large time steps distort periapsis deflection, while globally tiny steps slow down the simulation—solved via Hill-sphere adaptive step refinement and camera zoom.",
      nodes: [
        {
          step: "01 FRAME THE PHYSICS",
          title: "10-Body Gravitational Dynamics",
          text: "Model the Sun, all eight major planets, and the spacecraft so curved heliocentric trajectories and flybys emerge from real-time forces."
        },
        {
          step: "02 NUMERICAL SOLVER",
          title: "Fourth-Order Runge–Kutta (RK4)",
          text: "Evaluate net gravitational force acting on each planet and spacecraft at every RK4 sub-step."
        },
        {
          step: "03 ADAPTIVE REFINEMENT",
          title: "Hill-Sphere Encounter Trigger",
          text: "Reduce integration Δt and zoom the viewing frame toward the encounter body whenever a spacecraft enters a planet's Hill sphere."
        },
        {
          step: "04 MISSION SANDBOX",
          title: "Configurable Trajectories & Energy Plots",
          text: "Configure planetary/spacecraft positions and launch angles in real time with live kinetic and potential energy plots."
        }
      ]
    }
  },

  "india-carefinder": {
    number: "02",
    category: "DATA ENGINEERING & AI",
    subtitle: "Databricks Datathon 2026 Submission",
    title: "India CareFinder",
    cardSummary:
      "Collaborated with a teammate to design a healthcare-facility recommending web app that helps users compare Indian hospitals for emergency services such as dialysis, emergency C-sections, NICU care, and trauma treatment. CareFinder ranks facilities using urgency-specific criteria, displays the evidence supporting each match, and warns users when location or service data is incomplete or contradictory.",
    cardNotes: [
      "My contributions: Helped determine the facility-selection factors, found an external OpenStreetMap dataset for validating the provided facility records, and deployed the web app on Databricks.",
      "Team implementation: My teammate used generative AI to assist with developing the analytical pipeline and application code."
    ],
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
      "CareFinder helps users identify facilities for urgent or planned medical services. A user enters a needed service or related condition, a location, and practical preferences such as urgency, travel radius, budget, and insurance. The application then ranks nearby facilities and explains its decision, including a factor-by-factor score breakdown for each factor and warnings about missing or conflicting information.",
      "I contributed to determining which factors should influence facility selection. These included travel time, strength of service evidence, operating availability, relevant specialists and equipment, outside verification, cost, insurance, location confidence, and facility capacity. The weights change depending on the context: emergency searches emphasize speed and availability, while planned-care searches place more weight on affordability and insurance. When a characteristic like wait time is unavailable, the system excludes it and rescales the remaining weights.",
      "Behind CareFinder, a Databricks pipeline built with PySpark and Spark SQL standardizes ~10,000 Virtue Foundation facility records, identifies specialized services available at each facility, and checks facility coordinates against Indian PIN-codes. I also incorporated an external OpenStreetMap dataset of over 121,000 healthcare locations to cross-check facility identity, proximity, and ownership information. This helped flag any contradictory or missing data in the original dataset.",
      "My other primary responsibility was deploying the team’s code and app on Databricks in our local workspace. The deployed Databricks version connects a React and TypeScript interface to a FastAPI backend and Databricks SQL Warehouse. A separate Vercel deployment demonstrates the interface using sample data. The “How We Decide” view exposes the weights, rubrics, assumptions, and tradeoffs behind every recommendation, so users can develop greater trust in the app through this transparency."
    ],
    aiTransparency: {
      badge: "TWO-PERSON TEAM // AI-ASSISTED IMPLEMENTATION",
      paragraphs: [
        "India CareFinder was a two-person project. I helped determine the factors used to evaluate facilities, found an external OpenStreetMap dataset to validate information from the datathon dataset, and deployed the application on Databricks. My teammate led the implementation and used generative AI to assist with developing the code.",
        "Generative AI was used as a coding assistant and technical tutor while developing India CareFinder. It helped translate our specifications into SQL, Python, and frontend code, understand unfamiliar Databricks workflows, and iterate more quickly during the hackathon. We reviewed, tested, and adapted the generated implementation rather than automatically using the generated code."
      ]
    },
    question:
      "Rank Indian healthcare facilities for urgent vs. planned care while exposing missing data, coordinate errors, and supporting evidence transparently.",
    contribution:
      "Helped determine the facility-selection factors, incorporated an external OpenStreetMap dataset of 121,000+ locations to validate records, and deployed the web app on Databricks.",
    githubUrl: "https://github.com/sophiez3",
    liveUrl: "https://india-carefinder-2l5k0amix-red-pandas1.vercel.app/",
    liveLabel: "Launch Vercel Sample Demo ↗",
    slidesPdf: "",
    videoMp4: "assets/carefinder-demo.mp4",
    mindmap: {
      centralQuestion: "How do we recommend hospitals safely when directory records contain gaps, weak claims, or coordinate errors?",
      tradeoff: "Exclude missing fields and dynamically rescale remaining weights rather than inventing values that could mislead urgent care decisions.",
      nodes: [
        {
          step: "01 CLINICAL CONTEXT",
          title: "Urgency-Specific Selection Factors",
          text: "Shift factor weights between emergency speed/availability and planned-care affordability and insurance, rescaling when fields are missing."
        },
        {
          step: "02 GEOSPATIAL PIPELINE",
          title: "~10K Records × 121K OSM Check",
          text: "Standardize Virtue Foundation records in PySpark/Spark SQL, check Indian PIN-codes, and cross-validate identity and proximity against OpenStreetMap."
        },
        {
          step: "03 TRANSPARENCY",
          title: "'How We Decide' & Warnings",
          text: "Expose weights, rubrics, factor-by-factor score breakdowns, and warnings about missing or conflicting directory information."
        },
        {
          step: "04 DEPLOYMENT",
          title: "Databricks SQL Warehouse & React UI",
          text: "Deploy the React/TypeScript frontend, FastAPI backend, and Databricks SQL Warehouse in the local Databricks workspace."
        }
      ]
    }
  },

  "smart-kitchen": {
    number: "03",
    category: "FULL-STACK AI SYSTEMS",
    subtitle: "NOVA Generative AI Hackathon 2026 Submission",
    title: "Smart Kitchen",
    cardSummary:
      "An AI-assisted restaurant operations system that synchronizes ordering, ingredient inventory, supplier records, and delivery verification. Smart Kitchen automatically updates the kitchen’s inventory database as customers order specific dishes. It simultaneously updates menu availability based on inventory updates. It also structures food modifications and supplier notes into readable format, and uses bag-specific QR codes to ensure deliverers pick up the right bag. Additionally, owners can obtain AI-generated insights on the profitability of certain food items, including recommendations on what ingredients to purchase more of.",
    cardNotes: [],
    skills: [
      "Python",
      "FastAPI",
      "Pydantic",
      "SQLite/SQL",
      "React",
      "Vite",
      "JavaScript",
      "REST APIs",
      "OpenRouter",
      "Structured LLM outputs",
      "QR scanning",
      "Git",
      "pytest"
    ],
    fullDescription: [
      "Smart Kitchen is a locally deployed full-stack prototype to address DoorDash’s customer-facing and kitchen-facing problems. It addresses three recurring problems in online food delivery operations: selling dishes after ingredients have run out, handing drivers the wrong orders, and maintaining operational data across disconnected invoices and sales records.",
      "The system connects three role-specific interfaces to a shared FastAPI backend. On the customer end, customers see dishes become unavailable automatically when required ingredients run short. On the kitchen side, staff can monitor inventory, follow incoming orders, and review AI-parsed supplier notes. On the driver side, drivers scan a unique QR code attached to each order before confirming pickup and delivery, ensuring that they picked up the right order.",
      "Behind each order, the backend retrieves the selected dishes’ recipes and deducts the required ingredients from the ingredients database within a SQLite transaction. This prevents a dish from being shown as available on the delivery app even though the kitchen ran out of ingredients for that dish. OpenRouter-powered features interpret users’ written food customizations and automatically make inventory adjustments. Smart Kitchen also automatically converts inconsistently-structured supplier notes into changes in the kitchen inventory database.",
      "Because LLM output can be incomplete or incorrect, the web app does not trust it directly. Generated data is constrained through structured JSON schemas, validated with Pydantic, and presented for human confirmation before being saved."
    ],
    aiTransparency: {
      badge: "ITERATIVE DEVELOPMENT // AI PAIR PROGRAMMER",
      paragraphs: [
        "I developed Smart Kitchen iteratively, using an AI assistant as a tutor and pair programmer. I defined the problem, designed the workflows and system behavior, tested each prototype, and debugged the application. AI helped me understand unfamiliar technologies, generate and revise portions of code, diagnose errors, and improve testing and documentation. I remained responsible for the project’s design decisions, integration, validation, and final behavior."
      ]
    },
    question:
      "Prevent overselling out-of-stock dishes, driver handoff mix-ups, and disconnected supplier records across restaurant delivery operations.",
    contribution:
      "Defined the problem, designed the three role-specific workflows, transactional SQLite inventory engine, Pydantic-validated LLM parsing pipeline, and QR handoff verification.",
    githubUrl: "https://github.com/sophiez3",
    liveUrl: "",
    slidesPdf: "assets/smart-kitchen-slides.pdf",
    videoMp4: "assets/smart-kitchen-demo.mp4",
    mindmap: {
      centralQuestion: "How do we synchronize customer ordering, unstructured modifications, supplier notes, and driver pickup in real time?",
      tradeoff: "Constrain OpenRouter LLM outputs with JSON schemas and Pydantic validation plus human confirmation before committing database changes.",
      nodes: [
        {
          step: "01 TRANSACTIONAL INVENTORY",
          title: "SQLite Recipe Deductions",
          text: "Deduct required recipe ingredients atomically upon order placement and automatically toggle customer menu availability."
        },
        {
          step: "02 VALIDATED LLM PARSING",
          title: "OpenRouter + Pydantic Schemas",
          text: "Structure written food customizations and supplier invoices into typed schemas requiring human confirmation before saving."
        },
        {
          step: "03 DRIVER VERIFICATION",
          title: "Bag-Specific QR Code Handoff",
          text: "Require drivers to scan each bag's unique QR code before confirming pickup and delivery."
        },
        {
          step: "04 OWNER ANALYTICS",
          title: "Profitability & Restock Insights",
          text: "Generate AI-assisted item profitability insights and ingredient purchasing recommendations."
        }
      ]
    }
  },

  "housing-peer-tool": {
    number: "04",
    category: "AI & QUANTITATIVE POLICY",
    subtitle: "PNC x 180DC Challenge 2026 Submission",
    title: "Housing Peer Tool",
    cardSummary:
      "Collaborated with a teammate to design a framework that helps financial institutions identify targeted solutions to housing affordability across different neighborhoods. The prototype compares peer cities, scores neighborhoods across four housing archetypes, checks for unequal outcomes among similar areas, and connects each archetype to a bank product, community partners, safeguards, and KPIs.",
    cardNotes: [
      "My contribution: Housing affordability solutions, creating neighborhood archetypes, Philadelphia case-study, and prototype specifications.",
      "AI’s contribution: AI was used to implement a web app from our specifications, assisting with research and presentation development, and producing recommendation memos from calculated results."
    ],
    skills: [
      "FastAPI",
      "Python",
      "Pandas / NumPy",
      "OpenRouter LLM",
      "SVG Visualization",
      "Policy & Financial Design"
    ],
    fullDescription: [
      "The Housing Peer Tool was developed for the 2026 PNC x 180 Degrees Consulting Challenge as a proposal for how financial institutions could use AI to target housing-affordability interventions more precisely.",
      "At the city level, the tool identifies structurally similar peer cities using characteristics such as population, income, employment distribution, housing age, commute patterns, and home-ownership. It then compares the target city’s rent against income with peer cities to estimate whether a selected city’s rent is higher or lower than its income. The tool then predicts and highlights the factors on which that city differs most from its peers.",
      "Within a city, neighborhoods receive separate scores from 0 to 1 for the housing archetypes: (1) Vacant or obsolete properties that can be repurposed into new, affordable housing; (2) Underused land near transit lines in low-car-ownership communities; (3) Tangled-title properties and unsubsidized small-landlord rentals; and (4) Older homes facing high energy and repair burdens.",
      "Our team selected these categories, defined the relevant factors and thresholds that determine a neighborhood’s category, and designed a corresponding financial intervention for each. For Type 1 neighborhoods, financial institutions can invest in repurposing abandoned buildings. For Type 2 neighborhoods near major transit lines, homes could be built without parking spaces, lowering housing and rent costs. For Type 3 neighborhoods with inheritance homes with unclear ownership, financial institutions can help with title legal assistance for unsubsidized small-landlord rentals. For Type 4 neighborhoods with old buildings with energy-inefficient heating and cooling systems, financial institutions can provide a home-renovation loan that enables homeowners to pay less in utility fees.",
      "We accompanied our proposal with an AI-assisted web prototype using sample data for Philadelphia, Pittsburgh, and a set of comparison cities. The FastAPI backend uses pandas and NumPy to validate uploaded CSV files, identify city peers, calculate rent-income differences, classify neighborhood archetypes, and compare similar neighborhoods for unequal access. The frontend presents the results including the different neighborhoods and their classifications in a certain city, as well as the targeted solutions for specific neighborhoods.",
      "The prototype’s core classifications are transparent, threshold-based calculations. An OpenRouter-connected language model is used only after the analysis: it converts the computed findings into a recommendation memo and is instructed to rely exclusively on facts supplied by the earlier analysis. This reduces the risk of AI hallucinations.",
      "Generative AI produced most of the algorithms and application code from our requirements. Our substantive contribution was determining what the system should measure, defining the neighborhood categories and factors, researching Philadelphia neighborhoods as a case study, designing the targeted financial solutions, and ensuring the prototype represented our intended framework."
    ],
    aiTransparency: {
      badge: "TEAM-DESIGNED FRAMEWORK // AI-IMPLEMENTED PROTOTYPE",
      paragraphs: [
        "This was a team-designed, AI-implemented prototype. We developed the housing-affordability framework, determined the four neighborhood archetypes, defined the relevant factors and targeted interventions, and researched Philadelphia neighborhoods for our case study. Generative AI transformed those specifications into specific algorithms and a web app."
      ]
    },
    question:
      "Help financial institutions diagnose why housing affordability diverges across comparable cities and deploy targeted solutions across four neighborhood archetypes.",
    contribution:
      "Designed the housing affordability solutions, created the four neighborhood archetypes, conducted the Philadelphia case-study research, and wrote the prototype specifications.",
    githubUrl: "https://github.com/sophiez3",
    liveUrl: "",
    slidesPdf: "assets/housing-peer-slides.pdf",
    videoMp4: "assets/housing-peer-demo.mp4",
    mindmap: {
      centralQuestion: "How can financial institutions target housing-affordability interventions across comparable cities and neighborhoods?",
      tradeoff: "Transparent threshold-based calculations for classification, restricting the OpenRouter LLM strictly to post-analysis memo generation from verified facts.",
      nodes: [
        {
          step: "01 CITY PEER FIT",
          title: "Structural Peer Comparison",
          text: "Identify peer cities by population, income, employment distribution, housing age, commute, and homeownership to estimate rent-income divergence."
        },
        {
          step: "02 NEIGHBORHOOD TRIAGE",
          title: "4 Housing Archetypes (0–1)",
          text: "Score neighborhoods across adaptive reuse, transit-adjacent low-car land, tangled-title small rentals, and energy-burdened older homes."
        },
        {
          step: "03 TARGETED SOLUTIONS",
          title: "Financial Products & Partners",
          text: "Match each archetype to tailored bank lending, parking-free transit housing, title legal aid, or energy-efficiency renovation loans."
        },
        {
          step: "04 HALLUCINATION CONTROL",
          title: "Fact-Constrained LLM Memo",
          text: "Run pandas/NumPy classification first and instruct OpenRouter to rely exclusively on supplied analytical outputs."
        }
      ]
    }
  },

  "sound-vs-fire": {
    number: "05",
    category: "EXPERIMENTAL PHYSICS",
    subtitle: "Independent high school physics research",
    title: "Sound-Based Fire Suppression",
    cardSummary:
      "An experimental and theoretical investigation of acoustic flame suppression. I studied how sound frequency, sound intensity, and flame geometry influence flame extinction. I modeled flame convection as a damped-oscillator system and conducted experiments using stereo speakers, Schlieren imaging, high-speed cameras, and sensor measurements.",
    cardNotes: [
      "Development: Conducted independently without generative AI."
    ],
    skills: [
      "Damped harmonic motion",
      "Acoustic resonance",
      "Schlieren imaging",
      "High-speed video analysis",
      "Temperature and light sensors"
    ],
    fullDescription: [
      "This was an independent high school physics research project investigating how low-frequency sound can extinguish a small candle flame. I created a theoretical model of flame oscillation that I compared with controlled experiments to study the effects of acoustic frequency, sound intensity, and flame size.",
      "I approximated the convective flame body as a damped oscillator. Fluctuations in temperature and light-intensity measurements supported the idea of periodic flame behavior. I used high-speed videos of the candle and Pasco Capstone to record flame displacement measurements and apply Fast Fourier Transform to determine the flame’s natural frequency. Schlieren imaging was used to visualize the motion of air around the flame under the influence of sound.",
      "I placed the flame at a controlled distance from a speaker and played different frequencies of sound. For a single-wick flame, extinction occurred most effectively at sounds between 55 and 65 Hz, with the shortest recorded extinction time occurring near 60 Hz. I then varied sound intensity and found an effective experimental range near 100–102 dB under the tested conditions.",
      "I also investigated the effect of flame geometry by comparing single-wick and dual-wick flames. The larger dual-wick flame required substantially longer sound exposure and was extinguished across a narrower frequency interval. Hence, conditions for flame extinction do not scale independently of flame size.",
      "Finally, I evaluated sources of experimental error. Error can originate from ambient airflow from the school ventilation system, the restricted output range of the speaker, the absence of a sound collimator, and uncertainty in video-based displacement measurements."
    ],
    aiTransparency: {
      badge: "INDEPENDENT RESEARCH // NO GENERATIVE AI",
      paragraphs: [
        "Conducted independently without generative AI assistance, including theoretical modeling, experimental apparatus setup, Schlieren and high-speed optical measurements, data analysis, and error evaluation."
      ]
    },
    question:
      "Investigate how sound frequency, sound intensity, and flame geometry influence low-frequency acoustic flame extinction.",
    contribution:
      "Created the damped-oscillator theoretical model, extracted natural frequency via FFT in Pasco Capstone, captured Schlieren and high-speed optical measurements, and evaluated experimental error.",
    githubUrl: "https://github.com/sophiez3",
    liveUrl: "",
    slidesPdf: "assets/sound-fire-research.pdf",
    videoMp4: "",
    mindmap: {
      centralQuestion: "How do acoustic frequency, sound intensity, and flame geometry interact to extinguish a convective flame?",
      tradeoff: "Optimal suppression occurs near the flame's natural frequency (55–65 Hz, peak at 60 Hz) at 100–102 dB, while larger dual-wick flames narrow the effective frequency window.",
      nodes: [
        {
          step: "01 OSCILLATOR & FFT MODEL",
          title: "Damped Oscillator & Pasco Capstone FFT",
          text: "Verify periodic temperature/light fluctuations and apply Fast Fourier Transform to high-speed video displacements to find natural frequency."
        },
        {
          step: "02 OPTICAL FLOW",
          title: "Schlieren Imaging",
          text: "Visualize the motion of air around the candle flame under acoustic excitation."
        },
        {
          step: "03 PARAMETER SWEEPS",
          title: "Frequency, dB & Wick Geometry",
          text: "Identify the 55–65 Hz (60 Hz peak) and 100–102 dB regime, and contrast single-wick vs. dual-wick flame scaling."
        },
        {
          step: "04 ERROR EVALUATION",
          title: "Apparatus & Ventilation Bounds",
          text: "Evaluate ambient ventilation airflow, speaker output limits, absence of a sound collimator, and video tracking uncertainty."
        }
      ]
    }
  },

  "motme": {
    number: "06",
    category: "PRODUCT DESIGN & AI SYSTEMS",
    subtitle: "HackCMU 2026 Submission",
    title: "MotMe",
    cardSummary:
      "Collaborated with a team to build the travel app MotMe that turns foreign city exploration into a game of tourist-site quests. Completing a challenge with a selfie at the correct location adds the photo to an automatically themed digital scrapbook and reveals a hint for the next destination.",
    cardNotes: [
      "My contribution: Originated the scrapbook and quest-unlocking concept, and co-designed the interface in Figma."
    ],
    skills: [
      "Figma",
      "Gemini API",
      "Neon",
      "Vercel",
      "Generative AI-assisted development"
    ],
    fullDescription: [
      "MotMe is a travel app created by a four-person hackathon team. It encourages travelers to experience a city through a sequence of location-based quests rather than following a conventional itinerary.",
      "For each destination, the app presents the user with a challenge and a clue related to a local place. When the user completes the challenge by submitting a photo of themselves at that site, the image is automatically incorporated into a scrapbook. The scrapbook’s decoration theme is related to the city the user is visiting. Completing one quest also unlocks a hint for the next site, automating exploration, discovery, and memory keeping.",
      "I originated the idea of combining automatic scrapbooking with sequential quest unlocking. I also helped design the interface in Figma and shape the user journey across destination selection, quest discovery, photo submission, scrapbook creation, and clue progression.",
      "Our team designed the app’s general architecture and used generative AI for its visual design and implementation. The Gemini API supplies the list of countries, cities, and local sites for quest content. We also implemented KeyCloak to allow the user to sign in using Google, retaining their user, trip, quest, and scrapbook information. Thus, we connected the app to Neon so this information can be stored across sessions."
    ],
    aiTransparency: {
      badge: "FOUR-PERSON HACKATHON TEAM // AI-ASSISTED BUILD",
      paragraphs: [
        "MotMe was created by a four-person team. I originated the automatic scrapbook and quest-unlocking concepts, contributed to the overall app architecture, and designed the general app layout. However, we used generative AI to assist with interface design, integration, and app functionality, while the central product concept and user workflow were developed by our team."
      ]
    },
    question:
      "Turn foreign city exploration into an interactive game of location-based tourist quests that automatically builds a city-themed digital scrapbook.",
    contribution:
      "Originated the automatic scrapbook and sequential quest-unlocking concepts, contributed to the overall app architecture, and co-designed the interface in Figma.",
    githubUrl: "https://github.com/sophiez3/motme-travel-app",
    liveUrl: "https://motme.vercel.app/",
    slidesPdf: "",
    videoMp4: "",
    mindmap: {
      centralQuestion: "How can travel software turn foreign city sightseeing into an active quest progression and memory-keeping loop?",
      tradeoff: "Balancing structured sequential clue unlocking with seamless selfie-to-scrapbook theming and persistent multi-session storage.",
      nodes: [
        {
          step: "01 CORE IDEATION",
          title: "Sequential Quest + Scrapbook Loop",
          text: "Combine progressive clue unlocking with automatic city-themed scrapbook assembly upon selfie completion."
        },
        {
          step: "02 INTERFACE DESIGN",
          title: "Figma User Journey",
          text: "Co-design the user flow across destination selection, quest discovery, photo submission, scrapbook creation, and clue progression."
        },
        {
          step: "03 AI CONTENT ENGINE",
          title: "Gemini API Destination Quests",
          text: "Supply countries, cities, and local tourist-site challenges dynamically via the Gemini API."
        },
        {
          step: "04 AUTH & PERSISTENCE",
          title: "KeyCloak Google Sign-In & Neon DB",
          text: "Authenticate travelers via KeyCloak and persist user, trip, quest, and scrapbook records across sessions in Neon."
        }
      ]
    }
  }
};
