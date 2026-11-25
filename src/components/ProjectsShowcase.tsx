import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Sparkles,
  Server,
  Layers,
  ArrowDown,
  Cpu,
  Users,
  Gamepad2,
  Radio,
  Play,
  ExternalLink
} from "lucide-react";
import { projects, Project } from "../data/projects";

export default function ProjectsShowcase() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeScreenshotIndex, setActiveScreenshotIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const activeProject: Project = projects[activeProjectIndex] || projects[0];
  const screenshots = activeProject.screenshots || [];
  const currentScreenshot = screenshots[activeScreenshotIndex] || screenshots[0];

  // Reset screenshot index when project changes
  const handleSelectProject = (idx: number) => {
    setActiveProjectIndex(idx);
    setActiveScreenshotIndex(0);
  };

  const handleNextScreenshot = useCallback(() => {
    if (!screenshots.length) return;
    setActiveScreenshotIndex((prev) => (prev + 1) % screenshots.length);
  }, [screenshots.length]);

  const handlePrevScreenshot = useCallback(() => {
    if (!screenshots.length) return;
    setActiveScreenshotIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  }, [screenshots.length]);

  const stageVideoRef = useRef<HTMLVideoElement | null>(null);

  // Guarantee seamless video autoplay (muted) across all browsers and React StrictMode mounts
  useEffect(() => {
    const video = stageVideoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [currentScreenshot.src, activeProjectIndex]);

  // Pause stage video strictly on final unmount
  useEffect(() => {
    return () => {
      if (stageVideoRef.current) {
        try {
          stageVideoRef.current.pause();
        } catch {}
      }
    };
  }, []);

  // Keyboard controls for screenshot gallery and lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isLightboxOpen) {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowRight") {
        handleNextScreenshot();
      } else if (e.key === "ArrowLeft") {
        handlePrevScreenshot();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, handleNextScreenshot, handlePrevScreenshot]);

  return (
    <div className="projects-showcase-container">
      {/* Top Project Selector Command Deck */}
      <nav className="projects-nav-bar" aria-label="Game Projects Selector">
        <div className="projects-dock-shell">
          <div className="projects-tab-list" role="tablist">
            {projects.map((proj, idx) => {
              const isSelected = idx === activeProjectIndex;
              return (
                <button
                  key={proj.id}
                  role="tab"
                  aria-selected={isSelected}
                  className={`project-nav-tab theme-${proj.theme} ${isSelected ? "is-active" : ""}`}
                  onClick={(e) => {
                    handleSelectProject(idx);
                    e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                  }}
                >
                  {/* Fluid Animated Spotlight Pill for Active Tab */}
                  {isSelected && (
                    <div className="tab-active-spotlight" />
                  )}

                  {/* Corner Tech Brackets */}
                  <span className="tab-corner-accent top-left" aria-hidden="true" />
                  <span className="tab-corner-accent bottom-right" aria-hidden="true" />

                  {/* Status Indicator LED */}
                  <span className={`tab-status-led ${isSelected ? "is-live" : ""}`} aria-hidden="true">
                    {isSelected && <span className="tab-status-pulse" />}
                  </span>

                  {/* Number & Title */}
                  <span className="tab-pill-num">0{idx + 1}</span>
                  <span className="tab-pill-title">{proj.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <motion.div
        key={activeProject.id}
        className={`project-display-grid theme-${activeProject.theme || "coral"}`}
        data-theme={activeProject.theme || "coral"}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        {/* Left Column: Interactive Screenshot Gallery */}
        <div className="project-gallery-pane">
          {screenshots.length > 0 ? (
            <div className="gallery-card">
              {/* Main Screenshot Stage */}
              <div
                className="gallery-stage"
                onClick={() => setIsLightboxOpen(true)}
                title="Click to view full size"
              >
                <AnimatePresence mode="wait">
                  {currentScreenshot.type === "video" || currentScreenshot.src.endsWith(".mp4") ? (
                    <motion.div
                      key={currentScreenshot.src}
                      className="gallery-stage-video-wrap"
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0.3 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <video
                        ref={stageVideoRef}
                        key={currentScreenshot.src}
                        src={currentScreenshot.src}
                        className="gallery-stage-image gallery-stage-video"
                        controls
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        onLoadedData={(e) => {
                          const v = e.currentTarget;
                          v.defaultMuted = true;
                          v.muted = true;
                          const p = v.play();
                          if (p !== undefined) {
                            p.catch(() => {});
                          }
                        }}
                      />
                    </motion.div>
                  ) : (
                    <motion.img
                      key={currentScreenshot.src}
                      src={currentScreenshot.src}
                      alt={currentScreenshot.title}
                      className="gallery-stage-image"
                      initial={{ opacity: 0.3, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.3, scale: 1.02 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                    />
                  )}
                </AnimatePresence>

                {/* Ambient Scanline overlay */}
                <div className="stage-scanlines" />

                {/* Stage Header Info Badge */}
                <div className="stage-top-meta">
                  <span className="stage-counter">
                    CAPTURE {String(activeScreenshotIndex + 1).padStart(2, "0")} / {String(screenshots.length).padStart(2, "0")}
                  </span>
                  <div className="stage-top-actions">
                    {activeProject.steamUrl && (
                      <a
                        href={activeProject.steamUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="stage-steam-pill"
                        onClick={(e) => e.stopPropagation()}
                        title="View on Steam Store"
                      >
                        <ExternalLink size={10} />
                        <span>STEAM</span>
                      </a>
                    )}
                    <button
                      className="stage-zoom-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsLightboxOpen(true);
                      }}
                      aria-label="Enlarge media"
                    >
                      <Maximize2 size={13} />
                      <span>ENLARGE</span>
                    </button>
                  </div>
                </div>

                {/* Arrow Controls */}
                <button
                  className="gallery-nav-arrow is-prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevScreenshot();
                  }}
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  className="gallery-nav-arrow is-next"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextScreenshot();
                  }}
                  aria-label="Next screenshot"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Dedicated Caption Strip (Below video stage so native video controls never overlap) */}
              {(currentScreenshot.title || currentScreenshot.caption) && (
                <div className="gallery-caption-strip">
                  {currentScreenshot.title && (
                    <div className="caption-title">{currentScreenshot.title}</div>
                  )}
                  {currentScreenshot.caption && (
                    <div className="caption-desc">{currentScreenshot.caption}</div>
                  )}
                </div>
              )}

              {/* Thumbnails Row */}
              <div className="gallery-thumbs-track">
                {screenshots.map((s, sIdx) => {
                  const isThumbActive = sIdx === activeScreenshotIndex;
                  const isVideo = s.type === "video" || s.src.endsWith(".mp4");
                  return (
                    <button
                      key={s.src}
                      className={`gallery-thumb-btn ${isThumbActive ? "is-active" : ""} ${isVideo ? "is-video-thumb" : ""}`}
                      onClick={() => setActiveScreenshotIndex(sIdx)}
                      aria-label={s.title ? `View ${s.title}` : `View slide 0${sIdx + 1}`}
                    >
                      {isVideo ? (
                        <div className="thumb-video-container">
                          <video
                            src={`${s.src}#t=0.5`}
                            className="thumb-img"
                            muted
                            preload="metadata"
                          />
                          <div className="thumb-play-pill">
                            <Play size={9} fill="currentColor" />
                          </div>
                        </div>
                      ) : (
                        <img src={s.src} alt={s.title} className="thumb-img" loading="lazy" decoding="async" />
                      )}
                      <span className="thumb-number">0{sIdx + 1}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="gallery-card is-fallback">
              <img
                src={activeProject.image}
                alt={activeProject.imageAlt}
                className="gallery-stage-image"
              />
            </div>
          )}
        </div>

        {/* Right Column: Project Intel, Contributions & Architecture Flow */}
        <div className="project-intel-pane">
          <div className="intel-scroll-body">
            {/* Title & Category Header */}
            <header className="project-intel-header">
              <div className="intel-badges">
                <span className="project-category-badge">
                  <Sparkles size={11} /> {activeProject.category}
                </span>
                <span className="project-year-badge">{activeProject.year}</span>
              </div>
              <h2 className="project-heading">{activeProject.title}</h2>
              <p className="project-intro-text">{activeProject.intro}</p>

              {/* High-Visibility Official Steam Store Hero Banner */}
              {activeProject.steamUrl && (
                <a
                  href={activeProject.steamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="steam-store-banner"
                  title={`View ${activeProject.title} on Steam`}
                >
                  <div className="steam-banner-left">
                    <div className="steam-logo-box">
                      <svg className="steam-logo-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.029 4.524 4.524s-2.03 4.524-4.524 4.524h-.105l-4.076 2.911c0 .052.005.105.005.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 14.819C1.947 20.089 6.797 24 12.494 24c6.627 0 12-5.373 12-12S18.606 0 11.979 0zM7.545 18.21c-.482-.699-1.284-1.157-2.193-1.157-.14 0-.276.014-.411.036l2.093.865c.342.141.594.436.68.794.086.358.003.737-.225 1.02-.228.283-.58.441-.951.428-.37-.014-.707-.2-0.908-.503l-2.028-.838c.361 1.258 1.503 2.176 2.866 2.176 1.636 0 2.964-1.328 2.964-2.964 0-.306-.051-.599-.138-.877l-1.748.966zm8.4-11.455c-1.34 0-2.43 1.09-2.43 2.43 0 1.339 1.09 2.429 2.43 2.429 1.339 0 2.429-1.09 2.429-2.429 0-1.34-1.09-2.43-2.429-2.43zm.001.972c.805 0 1.458.653 1.458 1.458 0 .805-.653 1.457-1.458 1.457-.805 0-1.458-.652-1.458-1.457 0-.805.653-1.458 1.458-1.458z"/>
                      </svg>
                    </div>
                    <div className="steam-banner-info">
                      <span className="steam-banner-title">COMMERCIAL RELEASE ON STEAM</span>
                      <span className="steam-banner-desc">View store page, community hub & user reviews</span>
                    </div>
                  </div>
                  <div className="steam-banner-cta">
                    <span>VIEW STORE PAGE</span>
                    <ExternalLink size={13} />
                  </div>
                </a>
              )}
            </header>

            {/* My Contribution Section */}
            <section className="intel-section">
              <h3 className="section-title">
                <Layers size={14} className="section-title-icon" />
                <span>MY CONTRIBUTION</span>
              </h3>
              {activeProject.contributionGroups ? (
                <div className="contribution-groups-stack">
                  {activeProject.contributionGroups.map((group, gIdx) => (
                    <div key={gIdx} className="contribution-subgroup-card">
                      <div className="subgroup-card-header">
                        <span className="subgroup-card-dot" />
                        <span className="subgroup-card-title">{group.category}</span>
                      </div>
                      <ul className="contributions-list">
                        {group.items.map((item, iIdx) => (
                          <li key={iIdx} className="contribution-item">
                            <span className="cyber-bullet">↗</span>
                            <span className="contribution-text">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="contributions-list">
                  {activeProject.contribution.map((item, idx) => (
                    <li key={idx} className="contribution-item">
                      <span className="cyber-bullet">↗</span>
                      <span className="contribution-text">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Game Content Metrics Section */}
            {activeProject.gameContent && activeProject.gameContent.length > 0 && (
              <section className="intel-section content-metrics-section">
                <h3 className="section-title">
                  <Gamepad2 size={14} className="section-title-icon" />
                  <span>{activeProject.gameContentTitle || "GAME CONTENT"}</span>
                </h3>
                <div className="metrics-grid">
                  {activeProject.gameContent.map((metric, idx) => (
                    <div key={idx} className="metric-badge-box">
                      <span className="metric-value">{metric.value}</span>
                      <span className="metric-label">{metric.label}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Custom Multiplayer Infrastructure Architecture Diagram (Linear Flow) */}
            {activeProject.architectureFlow && (
              <section className="intel-section infrastructure-section">
                <h3 className="section-title">
                  <Server size={14} className="section-title-icon" />
                  <span>{activeProject.architectureDiagramTitle || "Custom Multiplayer Infrastructure"}</span>
                </h3>

                <div className="infrastructure-flow-canvas">
                  {activeProject.architectureFlow.map((flowItem, idx, arr) => {
                    const isLast = idx === arr.length - 1;
                    return (
                      <div key={flowItem.step} className="flow-step-wrapper">
                        <div className="flow-node-box">
                          <div className="flow-node-header">
                            <span className="flow-node-icon">
                              {idx === 0 && <Gamepad2 size={15} />}
                              {idx === 1 && <Radio size={15} />}
                              {idx === 2 && <Cpu size={15} />}
                              {idx === 3 && <Server size={15} />}
                            </span>
                            <span className="flow-node-title">{flowItem.title}</span>
                          </div>
                          <p className="flow-node-desc">{flowItem.desc}</p>
                          {flowItem.tech && (
                            <span className="flow-node-tag">{flowItem.tech}</span>
                          )}
                        </div>

                        {!isLast && (
                          <div className="flow-arrow-connector">
                            <div className="connector-line" />
                            <ArrowDown size={14} className="connector-arrow-icon" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Split Architecture Diagram (e.g. Slime Wars — Gameplay Systems) */}
            {activeProject.architectureSplit && (
              <section className="intel-section infrastructure-section">
                <h3 className="section-title">
                  <Server size={14} className="section-title-icon" />
                  <span>{activeProject.architectureDiagramTitle || "Gameplay Systems"}</span>
                </h3>

                <div className="infrastructure-flow-canvas split-diagram-canvas">
                  {/* Top Node: Level & Game Flow */}
                  <div className="flow-step-wrapper">
                    <div className="flow-node-box">
                      <div className="flow-node-header">
                        <span className="flow-node-icon">
                          <Layers size={15} />
                        </span>
                        <span className="flow-node-title">{activeProject.architectureSplit.top.title}</span>
                      </div>
                      <p className="flow-node-desc">{activeProject.architectureSplit.top.desc}</p>
                    </div>

                    <div className="flow-arrow-connector">
                      <div className="connector-line" />
                      <ArrowDown size={14} className="connector-arrow-icon" />
                    </div>
                  </div>

                  {/* Middle Split Row: Player Characters & Enemies */}
                  <div className="flow-split-row">
                    <div className="flow-node-box">
                      <div className="flow-node-header">
                        <span className="flow-node-icon">
                          <Users size={15} />
                        </span>
                        <span className="flow-node-title">{activeProject.architectureSplit.left.title}</span>
                      </div>
                      <p className="flow-node-desc">{activeProject.architectureSplit.left.desc}</p>
                    </div>

                    <div className="flow-node-box">
                      <div className="flow-node-header">
                        <span className="flow-node-icon">
                          <Gamepad2 size={15} />
                        </span>
                        <span className="flow-node-title">{activeProject.architectureSplit.right.title}</span>
                      </div>
                      <p className="flow-node-desc">{activeProject.architectureSplit.right.desc}</p>
                    </div>
                  </div>

                  {/* Connector Arrow to Bottom */}
                  <div className="flow-arrow-connector">
                    <div className="connector-line" />
                    <ArrowDown size={14} className="connector-arrow-icon" />
                  </div>

                  {/* Bottom Node: Behaviour Architecture */}
                  <div className="flow-step-wrapper">
                    <div className="flow-node-box">
                      <div className="flow-node-header">
                        <span className="flow-node-icon">
                          <Cpu size={15} />
                        </span>
                        <span className="flow-node-title">{activeProject.architectureSplit.bottom.title}</span>
                      </div>
                      <p className="flow-node-desc">{activeProject.architectureSplit.bottom.desc}</p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Technology Stack */}
            <section className="intel-section">
              <h3 className="section-title">
                <Cpu size={14} className="section-title-icon" />
                <span>TECHNOLOGY & TOOLS</span>
              </h3>
              {activeProject.toolCategories ? (
                <div className="tool-categories-stack">
                  {activeProject.toolCategories.map((group, cIdx) => (
                    <div key={cIdx} className="tool-category-group">
                      <div className="tool-category-header">
                        <span className="tool-category-dot" />
                        <span className="tool-category-title">{group.category}</span>
                      </div>
                      <div className="tech-stack-wrap">
                        {group.items.map((tool) => (
                          <span key={tool} className="tech-chip">
                            <span className="chip-dot" />
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="tech-stack-wrap">
                  {activeProject.tools.map((tool) => (
                    <span key={tool} className="tech-chip">
                      <span className="chip-dot" />
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </motion.div>

      {/* Lightbox Fullscreen Preview Modal */}
      <AnimatePresence>
        {isLightboxOpen && currentScreenshot && (
          <motion.div
            className="gallery-lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
          >
            <div
              className="lightbox-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <header className="lightbox-topbar">
                <div className="lightbox-title-meta">
                  <span className="lightbox-badge">{activeProject.title}</span>
                  {currentScreenshot.title && (
                    <span className="lightbox-title">{currentScreenshot.title}</span>
                  )}
                </div>
                <div className="lightbox-actions">
                  <span className="lightbox-counter">
                    {activeScreenshotIndex + 1} / {screenshots.length}
                  </span>
                  <button
                    className="lightbox-close-btn"
                    onClick={() => setIsLightboxOpen(false)}
                    aria-label="Close lightbox"
                  >
                    <X size={18} />
                  </button>
                </div>
              </header>

              <div className="lightbox-image-stage">
                {currentScreenshot.type === "video" || currentScreenshot.src.endsWith(".mp4") ? (
                  <video
                    key={currentScreenshot.src}
                    src={currentScreenshot.src}
                    className="lightbox-full-img lightbox-video"
                    controls
                    autoPlay
                    playsInline
                  />
                ) : (
                  <img
                    src={currentScreenshot.src}
                    alt={currentScreenshot.title}
                    className="lightbox-full-img"
                  />
                )}

                <button
                  className="lightbox-arrow is-prev"
                  onClick={handlePrevScreenshot}
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  className="lightbox-arrow is-next"
                  onClick={handleNextScreenshot}
                  aria-label="Next screenshot"
                >
                  <ChevronRight size={28} />
                </button>
              </div>

              {currentScreenshot.caption && (
                <footer className="lightbox-footer">
                  <p className="lightbox-caption">{currentScreenshot.caption}</p>
                </footer>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
