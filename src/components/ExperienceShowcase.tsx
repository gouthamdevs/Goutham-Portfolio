import { motion } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  MapPin,
  Sparkles,
  Gamepad2,
  CheckCircle2,
  Code2,
  Cpu,
  Tv,
  Network,
  Boxes,
  Zap,
  Building2,
  Layers
} from "lucide-react";

export default function ExperienceShowcase() {
  const educationCourses = [
    "Data Structures & Algorithms",
    "Computer Graphics",
    "Object-Oriented Design (OOP)",
    "Operating Systems",
    "Computer Networks",
    "Database Management Systems",
    "Linear Algebra & 3D Math"
  ];

  return (
    <div className="experience-showcase-container">
      <motion.div
        className="experience-scroll-frame"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        {/* Sector Header */}
        <header className="experience-header">
          <div className="experience-header-meta">
            <span className="experience-sector-tag">
              <Sparkles size={13} /> SECTOR 03 // ENGINEERING JOURNEY
            </span>
            <span className="experience-index-pill">03 / 04</span>
          </div>
          <h1 className="experience-main-title">Experience & Education</h1>
          <p className="experience-main-intro">
            Professional game engineering background across console ports, open-world systems, and multiplayer infrastructure at Studd Games, backed by a strong Computer Science engineering degree.
          </p>
        </header>

        {/* Section 1: Professional Experience (Studd Games) */}
        <section className="experience-card experience-work-card">
          <div className="card-top-row">
            <div className="card-identity-group">
              <div className="studd-logo-frame">
                <img
                  src="/assets/StuddLogo/Studd_Logo.jpg"
                  alt="Studd Games Logo"
                  className="studd-logo-img"
                />
              </div>
              <div className="card-identity-text">
                <div className="card-title-row">
                  <h2 className="company-name">Studd Games</h2>
                  <span className="role-pill">Unity Developer</span>
                </div>
                <div className="card-metadata-row">
                  <span className="meta-item">
                    <Calendar size={14} />
                    October 2025 — November 2026
                  </span>
                  <span className="meta-separator">•</span>
                  <span className="meta-item">
                    <MapPin size={14} />
                    Ernakulam, Kerala
                  </span>
                  <span className="meta-separator">•</span>
                  <span className="meta-badge">Full-Time Onsite</span>
                  <span className="meta-separator">•</span>
                  <span className="meta-badge">Commercial Studio</span>
                </div>
              </div>
            </div>
          </div>

          <div className="experience-highlight-banner">
            <Gamepad2 size={18} className="highlight-icon" />
            <span>
              <strong>All 8 portfolio projects</strong> were developed during my full-time onsite tenure at Studd Games across client engagements for <strong>Sodesco</strong> and <strong>Classcade Games</strong> — collaborating directly with game designers, 2D/3D artists, production managers, and QA testing teams.
            </span>
          </div>

          <div className="card-contributions-block">
            <h3 className="sub-block-title">
              <Cpu size={15} />
              <span>CORE ENGINEERING RESPONSIBILITIES & SHIPPED SYSTEMS</span>
            </h3>

            <div className="pillars-cards-grid">
              {/* Pillar 1: Console Porting */}
              <div className="pillar-card">
                <div className="pillar-header">
                  <div className="pillar-top-meta">
                    <span className="pillar-badge badge-console">
                      <Tv size={12} /> CONSOLE PORTING
                    </span>
                    <span className="pillar-platform-pill">PlayStation 4 · Nintendo Switch</span>
                  </div>
                  <h4 className="pillar-title">Console Porting & Sony TRC Certification</h4>
                  <span className="pillar-client-label">Farming Camp & Mirth Island · Sodesco</span>
                </div>
                <ul className="pillar-bullets">
                  <li>
                    <span className="pillar-dot" />
                    <span>
                      <strong>Sony TRC Certification & Pipeline:</strong> Independently handled the complete PS4 port from scratch using the Sony Orbis SDK (Neighborhood, <em>orbis-pub-cmd</em>, <em>gengp4</em>, <em>orbis-pub-trp</em>), DualShock 4 controller mappings, and save/load lifecycle.
                    </span>
                  </li>
                  <li>
                    <span className="pillar-dot" />
                    <span>
                      <strong>Dedicated QA Collaboration:</strong> Partnered closely with dedicated QA testing teams to reproduce, debug, and resolve platform-specific defects for official Sony TRC certification sign-off.
                    </span>
                  </li>
                  <li>
                    <span className="pillar-dot" />
                    <span>
                      <strong>Platform Optimization:</strong> Executed memory profiling and framerate stabilization for steady console framerates; contributed to Nintendo platform adaptation.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Pillar 2: Open-World Systems & Dijkstra */}
              <div className="pillar-card">
                <div className="pillar-header">
                  <div className="pillar-top-meta">
                    <span className="pillar-badge badge-openworld">
                      <Layers size={12} /> OPEN WORLD & AI
                    </span>
                    <span className="pillar-platform-pill">GTA-Style 3D Action</span>
                  </div>
                  <h4 className="pillar-title">Open-World Systems, Navigation AI & Audio Integration</h4>
                  <span className="pillar-client-label">Criminal Routes 67 · Sodesco</span>
                </div>
                <ul className="pillar-bullets">
                  <li>
                    <span className="pillar-dot" />
                    <span>
                      <strong>Cross-Functional Studio Collaboration:</strong> Worked in a multidisciplinary team alongside Production Managers, Game Designers, and 2D/3D Artists to translate design documentation into production scenes.
                    </span>
                  </li>
                  <li>
                    <span className="pillar-dot" />
                    <span>
                      <strong>Dijkstra Pathfinding AI:</strong> Implemented urban road-network vehicle navigation and pedestrian NPC pathfinding using <em>Dijkstra's algorithm</em>.
                    </span>
                  </li>
                  <li>
                    <span className="pillar-dot" />
                    <span>
                      <strong>Decoupled UI & FMOD Audio:</strong> Architected layered UI systems (minimap, objective trackers, weapon wheel), safe house persistence, and integrated <em>FMOD</em> dynamic 3D audio and in-game radio.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Pillar 3: Multiplayer Infrastructure & Docker */}
              <div className="pillar-card">
                <div className="pillar-header">
                  <div className="pillar-top-meta">
                    <span className="pillar-badge badge-multiplayer">
                      <Network size={12} /> MULTIPLAYER & DEVOPS
                    </span>
                    <span className="pillar-platform-pill">Dedicated Server Infrastructure</span>
                  </div>
                  <h4 className="pillar-title">Online Multiplayer Architecture, Docker & Hetzner Deployment</h4>
                  <span className="pillar-client-label">Skateball Rumble · Classcade Games</span>
                </div>
                <ul className="pillar-bullets">
                  <li>
                    <span className="pillar-dot" />
                    <span>
                      <strong>Authoritative Networking & Matchmaking:</strong> Built the 2D multiplayer architecture from scratch using <em>Mirror</em> and integrated <em>Nakama</em> for matchmaking and lobby management.
                    </span>
                  </li>
                  <li>
                    <span className="pillar-dot" />
                    <span>
                      <strong>Docker Containerization & Linux:</strong> Containerized headless Unity game servers using <em>Docker</em> and deployed/configured production dedicated server infrastructure on <em>Hetzner Linux</em>.
                    </span>
                  </li>
                  <li>
                    <span className="pillar-dot" />
                    <span>
                      <strong>Custom Server Orchestrator:</strong> Developed a dedicated server lifecycle orchestrator to dynamically provision, allocate, and manage match server instances.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Pillar 4: Casual Games Built from Scratch */}
              <div className="pillar-card">
                <div className="pillar-header">
                  <div className="pillar-top-meta">
                    <span className="pillar-badge badge-casual">
                      <Boxes size={12} /> GAMEPLAY SYSTEMS & AI
                    </span>
                    <span className="pillar-platform-pill">4 Commercial Releases</span>
                  </div>
                  <h4 className="pillar-title">Casual Games Built from Scratch & Gameplay AI</h4>
                  <span className="pillar-client-label">Casual Titles · Classcade Games</span>
                </div>
                <p className="pillar-intro-text">
                  Partnered closely with a <strong>Game Designer</strong> and <strong>2D/3D Artists</strong> to translate design specs and visual concepts into 4 complete, responsive commercial games:
                </p>
                <div className="casual-games-cards-grid">
                  <div className="casual-game-card">
                    <div className="cg-card-top">
                      <strong className="cg-name">Boggie Kart</strong>
                      <span className="cg-genre-badge">3D RACING</span>
                    </div>
                    <p className="cg-description">
                      Engineered 3D kart racing physics, opponent AI navigation lines, and a dynamic <em>rubber-banding system</em> to balance race competitiveness, along with power-up interactions.
                    </p>
                  </div>

                  <div className="casual-game-card">
                    <div className="cg-card-top">
                      <strong className="cg-name">Slime Wars</strong>
                      <span className="cg-genre-badge">TOWER DEFENSE</span>
                    </div>
                    <p className="cg-description">
                      Built lane-based strategy defense systems using <em>Finite State Machines (FSM)</em> and <em>ScriptableObjects</em> for 15 playable units and 8 enemy/boss archetypes.
                    </p>
                  </div>

                  <div className="casual-game-card">
                    <div className="cg-card-top">
                      <strong className="cg-name">Peg Blast</strong>
                      <span className="cg-genre-badge">ARCADE PHYSICS</span>
                    </div>
                    <p className="cg-description">
                      Implemented 2D bouncy ball trajectory physics, launcher aiming, peg collision triggers, and chain-reaction multiplier systems.
                    </p>
                  </div>

                  <div className="casual-game-card">
                    <div className="cg-card-top">
                      <strong className="cg-name">Rune Breaker</strong>
                      <span className="cg-genre-badge">BLOCK PUZZLE</span>
                    </div>
                    <p className="cg-description">
                      Developed falling block puzzle mechanics, rotation matrix bounds, grid clearing algorithms, and special rune power-up systems.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pillar 5: Performance Profiling */}
              <div className="pillar-card">
                <div className="pillar-header">
                  <div className="pillar-top-meta">
                    <span className="pillar-badge badge-opt">
                      <Zap size={12} /> PERFORMANCE & PROFILING
                    </span>
                    <span className="pillar-platform-pill">Console & PC Benchmarks</span>
                  </div>
                  <h4 className="pillar-title">Performance Profiling, Memory Management & Optimization</h4>
                </div>
                <ul className="pillar-bullets">
                  <li>
                    <span className="pillar-dot" />
                    <span>
                      <strong>Diagnostic Profiling:</strong> Conducted extensive profiling using the Unity Profiler, Frame Debugger, and Sony platform diagnostic suites.
                    </span>
                  </li>
                  <li>
                    <span className="pillar-dot" />
                    <span>
                      <strong>Bottleneck Elimination:</strong> Optimized draw call batching, eliminated memory spikes, and resolved CPU/GPU bottlenecks to sustain steady 60 FPS across target console and PC platforms.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Portfolio Projects Grouped by Client */}
          <div className="portfolio-shipped-block">
            <div className="shipped-header-row">
              <span className="shipped-label">
                <Building2 size={13} />
                COMMERCIAL TITLES SHIPPED & PRODUCED AT STUDD GAMES (8 TOTAL)
              </span>
            </div>
            
            <div className="shipped-clients-grid">
              {/* Sodesco Group */}
              <div className="client-portfolio-column">
                <div className="client-column-header">
                  <span className="client-badge sodesco-brand">SODESCO</span>
                  <span className="client-subtitle">Console Ports & Open-World</span>
                </div>
                <div className="client-chips-list">
                  <div className="shipped-project-chip">
                    <span className="chip-project-name">Farming Camp</span>
                    <span className="chip-project-tag">PS4 Port · TRC Sign-off</span>
                  </div>
                  <div className="shipped-project-chip">
                    <span className="chip-project-name">Mirth Island</span>
                    <span className="chip-project-tag">PS4 Port</span>
                  </div>
                  <div className="shipped-project-chip">
                    <span className="chip-project-name">Criminal Routes 67</span>
                    <span className="chip-project-tag">Open World · Dijkstra AI</span>
                  </div>
                </div>
              </div>

              {/* Classcade Games Group */}
              <div className="client-portfolio-column">
                <div className="client-column-header">
                  <span className="client-badge classcade-brand">CLASSCADE GAMES</span>
                  <span className="client-subtitle">Multiplayer & Casual Releases</span>
                </div>
                <div className="client-chips-list">
                  <div className="shipped-project-chip">
                    <span className="chip-project-name">Skateball Rumble</span>
                    <span className="chip-project-tag">Multiplayer · Mirror & Docker</span>
                  </div>
                  <div className="shipped-project-chip">
                    <span className="chip-project-name">Slime Wars</span>
                    <span className="chip-project-tag">Tower Defense · FSM</span>
                  </div>
                  <div className="shipped-project-chip">
                    <span className="chip-project-name">Boggie Kart</span>
                    <span className="chip-project-tag">3D Racing · AI Rubber-Band</span>
                  </div>
                  <div className="shipped-project-chip">
                    <span className="chip-project-name">Peg Blast</span>
                    <span className="chip-project-tag">Arcade · Ball Physics</span>
                  </div>
                  <div className="shipped-project-chip">
                    <span className="chip-project-name">Rune Breaker</span>
                    <span className="chip-project-tag">Puzzle · Grid Algorithms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Education (Govt Engineering College, Wayanad) */}
        <section className="experience-card experience-edu-card">
          <div className="card-top-row">
            <div className="card-identity-group">
              <div className="edu-icon-frame">
                <GraduationCap size={30} />
              </div>
              <div className="card-identity-text">
                <div className="card-title-row">
                  <h2 className="company-name">Govt. Engineering College, Wayanad</h2>
                  <span className="degree-pill">B.Tech · CSE</span>
                </div>
                <div className="card-metadata-row">
                  <span className="meta-item">
                    <Calendar size={14} />
                    2021 — 2025
                  </span>
                  <span className="meta-separator">•</span>
                  <span className="meta-item">
                    <MapPin size={14} />
                    Wayanad, Kerala
                  </span>
                  <span className="meta-separator">•</span>
                  <span className="meta-badge">KTU Kerala</span>
                </div>
              </div>
            </div>
          </div>

          <div className="edu-degree-details">
            <h3 className="degree-title">
              Bachelor of Technology in Computer Science & Engineering
            </h3>
            <p className="degree-university">
              APJ Abdul Kalam Technological University (KTU), Kerala
            </p>
            <p className="degree-summary">
              Comprehensive 4-year engineering curriculum establishing strong foundations in systems programming, data structures, algorithms, computer graphics, linear algebra, and software architecture.
            </p>
          </div>

          <div className="edu-coursework-block">
            <h4 className="coursework-label">
              <Code2 size={14} />
              <span>CORE ACADEMIC FOUNDATIONS</span>
            </h4>
            <div className="coursework-chips-grid">
              {educationCourses.map((c) => (
                <div key={c} className="course-chip">
                  <CheckCircle2 size={13} className="course-check-icon" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
