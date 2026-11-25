import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { projects, Project } from "../data/projects";

interface WorldsExplorerProps {
  onReturnToOrbit: () => void;
}

const worldTerrains: Record<string, { name: string; terrain: string; subtitle: string; coordinate: string }> = {
  "01": {
    name: "Forest World",
    terrain: "/assets/terrains/forest.png",
    subtitle: "Organic gameplay, feel, and rapid casual production",
    coordinate: "SECTOR 01 // 12°N 77°E",
  },
  "02": {
    name: "Volcanic World",
    terrain: "/assets/terrains/volcanic.png",
    subtitle: "High-intensity synchronization, dedicated servers & infrastructure",
    coordinate: "SECTOR 02 // 28°S 45°W",
  },
  "03": {
    name: "Ice World",
    terrain: "/assets/terrains/ice.png",
    subtitle: "Precision console platform adaptation, profiling & memory limits",
    coordinate: "SECTOR 03 // 64°N 18°W",
  },
  "04": {
    name: "Desert World",
    terrain: "/assets/terrains/desert.png",
    subtitle: "Autonomous agent simulations, foraging & reinforcement learning",
    coordinate: "SECTOR 04 // 23°N 11°E",
  },
  "05": {
    name: "Ocean World",
    terrain: "/assets/terrains/ocean.png",
    subtitle: "Fluid spatial computing, plane detection & augmented reality",
    coordinate: "SECTOR 05 // 05°S 140°W",
  },
  "06": {
    name: "Circuit World",
    terrain: "/assets/terrains/volcanic.png",
    subtitle: "High-speed 3D kart physics, rubber-banding AI & power-up systems",
    coordinate: "SECTOR 06 // 34°S 118°E",
  },
  "07": {
    name: "Arcade World",
    terrain: "/assets/terrains/forest.png",
    subtitle: "Playful physics simulation, bounce dynamics & casual puzzle game feel",
    coordinate: "SECTOR 07 // 18°N 142°E",
  },
  "08": {
    name: "Rune World",
    terrain: "/assets/terrains/ice.png",
    subtitle: "Precise grid matrix logic, tetromino geometry & arcade combo systems",
    coordinate: "SECTOR 08 // 51°N 04°W",
  },
};

export default function WorldsExplorer({ onReturnToOrbit }: WorldsExplorerProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeProject: Project = projects[selectedIndex] || projects[0];
  const activeMeta = worldTerrains[activeProject.id] || worldTerrains["01"];

  // Keyboard navigation: Arrow keys to switch worlds, Escape to return
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onReturnToOrbit();
      } else if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev + 1) % projects.length);
      } else if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev - 1 + projects.length) % projects.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onReturnToOrbit]);

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <motion.div
      className="worlds-explorer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background Terrain with smooth cross-fade */}
      <div className="worlds-backdrop" aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            className="terrain-layer"
            style={{ backgroundImage: `url('${activeMeta.terrain}')` }}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 0.32, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7 }}
          />
        </AnimatePresence>
        <div className="backdrop-gradient" />
      </div>

      {/* Top Navigation Header */}
      <header className="worlds-header">
        <div className="header-meta">
          <span className="meta-pill"><span className="spark">✳</span> SURFACE EXPLORATION</span>
          <span className="meta-coords">{activeMeta.coordinate}</span>
        </div>

        <button className="return-orbit-action" onClick={onReturnToOrbit} aria-label="Return to orbit">
          <RotateCcw size={14} />
          <span>RETURN TO ORBIT</span>
          <span className="key-shortcut">[ESC]</span>
        </button>
      </header>

      {/* Main Worlds Content */}
      <div className="worlds-content">
        {/* World Tabs Selector */}
        <div className="worlds-tabs">
          {projects.map((project, idx) => {
            const isCurrent = idx === selectedIndex;
            const meta = worldTerrains[project.id];
            return (
              <button
                key={project.id}
                className={`world-tab ${isCurrent ? "is-active" : ""}`}
                onClick={() => setSelectedIndex(idx)}
              >
                <span className="tab-num">0{idx + 1}</span>
                <span className="tab-title">{meta.name.replace(" World", "")}</span>
              </button>
            );
          })}
        </div>

        {/* Active World Card */}
        <AnimatePresence mode="wait">
          <motion.article
            key={activeProject.id}
            className="world-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="card-topline">
              <span className="world-badge">
                <Sparkles size={12} /> {activeMeta.name.toUpperCase()}
              </span>
              <span className="project-category">{activeProject.category} // {activeProject.year}</span>
            </div>

            <h2 className="world-title">{activeProject.title}</h2>
            <p className="world-intro">{activeProject.intro}</p>

            <div className="world-details">
              <div className="contributions-block">
                <h4 className="block-label">KEY SYSTEMS & ARCHITECTURE</h4>
                <ul>
                  {activeProject.contribution.map((item, i) => (
                    <li key={i}>
                      <span className="bullet">↗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="tools-block">
                <h4 className="block-label">TECHNOLOGY STACK</h4>
                <div className="tool-chips">
                  {activeProject.tools.map((tool) => (
                    <span key={tool} className="tool-chip">{tool}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      {/* Footer Navigation Controls */}
      <footer className="worlds-footer">
        <div className="nav-controls">
          <button className="nav-btn" onClick={handlePrev} aria-label="Previous world">
            <ArrowLeft size={16} />
            <span>PREVIOUS WORLD</span>
          </button>
          <div className="nav-counter">
            <span>0{selectedIndex + 1}</span>
            <span className="divider">/</span>
            <span>0{projects.length}</span>
          </div>
          <button className="nav-btn" onClick={handleNext} aria-label="Next world">
            <span>NEXT WORLD</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="footer-note">
          <span>USE ARROW KEYS OR TABS TO NAVIGATE WORLDS</span>
        </div>
      </footer>
    </motion.div>
  );
}
