import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import OrbitMarker from "./OrbitMarkers";
import PixelAvatar from "./PixelAvatar";
import TypewriterText from "./TypewriterText";
import ProjectsShowcase from "./ProjectsShowcase";
import ExperienceShowcase from "./ExperienceShowcase";
import ContactShowcase from "./ContactShowcase";

export type Destination = {
  id: string;
  title: string;
  index: string;
  subtitle: string;
  terrain: string;
  coordinate: string;
  themeColor: string;
  intro: string;
  points: string[];
  tools: string[];
  action?: { label: string; href: string };
};

export const destinations: Destination[] = [
  {
    id: "about",
    title: "About",
    index: "01",
    subtitle: "ENGINEERING MINDSET & PHILOSOPHY",
    terrain: "/assets/terrains/ocean.png",
    coordinate: "SECTOR 01 // 05°S 140°W",
    themeColor: "radial-gradient(circle at 50% 100%, rgba(96, 165, 250, 0.2) 0%, transparent 70%)",
    intro: "Curious about complex systems, elegant architectures, and the craft behind virtual worlds.",
    points: [
      "Committed to clean, decoupled code, robust architecture and maintainable gameplay loops.",
      "Constantly exploring technical frontiers: graphics, simulation, procedural systems and multiplayer infra.",
      "Dedicated gamer and builder passionate about creating worlds that inspire wonder and technical elegance."
    ],
    tools: ["Systems Design", "Profiling & Optimization", "Gameplay Feel", "Technical Curiosity"],
  },
  {
    id: "projects",
    title: "Projects",
    index: "02",
    subtitle: "PRODUCTION GAMES & ENGINE ARCHITECTURE",
    terrain: "/assets/terrains/volcanic.png",
    coordinate: "SECTOR 02 // 28°S 45°W",
    themeColor: "radial-gradient(circle at 50% 100%, rgba(255, 90, 40, 0.22) 0%, transparent 70%)",
    intro: "Game engineering across production titles, engine architecture, and technical prototypes.",
    points: [
      "Casual game loops, responsive player controls and modular progression systems built in Unity.",
      "Synchronized multiplayer gameplay with Mirror networking and Nakama server orchestration.",
      "Console platform porting, input handling and memory profiling for PlayStation 4 and Nintendo Switch."
    ],
    tools: ["Unity", "C#", "Mirror", "Nakama", "PS4 / Switch", "Physics"],
  },
  {
    id: "experience",
    title: "Experience & Education",
    index: "03",
    subtitle: "STUDD GAMES · GEC WAYANAD",
    terrain: "/assets/terrains/desert.png",
    coordinate: "SECTOR 03 // 23°N 11°E",
    themeColor: "radial-gradient(circle at 50% 100%, rgba(250, 204, 21, 0.18) 0%, transparent 70%)",
    intro: "Unity Developer at Studd Games with production experience across all portfolio titles, backed by a B.Tech in Computer Science & Engineering from GEC Wayanad.",
    points: [
      "Unity Developer at Studd Games (Oct 2025 – Nov 2026, Ernakulam, Kerala).",
      "Engineered all commercial games, console porting pipelines, and interactive systems featured in this portfolio.",
      "B.Tech in Computer Science & Engineering — Govt. Engineering College, Wayanad (KTU Kerala, 2021 – 2025)."
    ],
    tools: ["Unity", "C#", "PS4 / Switch SDK", "Console Porting", "Gameplay AI", "Mirror / Nakama", "Docker", "Computer Science"],
  },
  {
    id: "contact",
    title: "Contact",
    index: "04",
    subtitle: "COMMUNICATIONS & TRANSMISSION",
    terrain: "/assets/terrains/ice.png", // Matches the user uploaded polar crystalline terrain
    coordinate: "SECTOR 04 // 64°N 18°W",
    themeColor: "radial-gradient(circle at 50% 100%, rgba(147, 197, 253, 0.24) 0%, transparent 70%)",
    intro: "Have an exciting game development role, technical challenge or collaboration idea? Let's build something memorable.",
    points: [
      "Available for full-time game development roles, technical contracts, and creative collaborations.",
      "Direct Transmission: gdsdev455@gmail.com · +91 9778784425",
      "Connect across GitHub (gouthamdevs) and LinkedIn (goutham-dev-s-gds) to discuss games, architecture, and technology."
    ],
    tools: ["Email", "Phone", "LinkedIn", "GitHub", "Collaborations"],
    action: { label: "SEND TRANSMISSION", href: "mailto:gdsdev455@gmail.com" },
  },
];

// Constellation positions undulating in a dynamic celestial 3-curve alternating pattern
// Order: Launch Pad (Down) -> 0: About (Up) -> 1: Projects (Down) -> 2: Experience & Education (Up) -> 3: Contact (Down)
const positions = [
  { left: "32%", top: "42%", align: "left" as const, shortTag: "PHILOSOPHY & MINDSET" },  // 0: About (01) [Crest 1 - Up]
  { left: "48%", top: "72%", align: "right" as const, shortTag: "FEATURED WORK & RELEASES" },   // 1: Projects (02) [Trough 1 - Down]
  { left: "64%", top: "36%", align: "left" as const, shortTag: "ENGINEERING JOURNEY" },  // 2: Experience & Education (03) [Crest 2 - Up]
  { left: "78%", top: "66%", align: "right" as const, shortTag: "TRANSMISSIONS" },         // 3: Contact (04) [Trough 2 - Down, info on right]
];

const basePosition = { left: "18%", top: "78%" };

// Smooth artistic Bézier spline with 3 distinct dynamic curves (Down -> Up -> Down -> Up -> Down)
const mainSpline =
  "M 180 780 C 210 650, 260 420, 320 420 C 380 420, 420 720, 480 720 C 540 720, 580 360, 640 360 C 690 360, 730 660, 780 660";

// Harmonic resonance twin wave wavering gracefully alongside the undulating path
const harmonicSpline =
  "M 180 780 C 205 660, 270 400, 320 420 C 370 440, 430 730, 480 720 C 530 710, 590 340, 640 360 C 685 380, 740 670, 780 660";

export default function WorldExplorer({ onReturn }: { onReturn: () => void }) {
  const [activeScene, setActiveScene] = useState<Destination | null>(null);
  // Cache last active scene so during exit transition all props remain populated
  const lastSceneRef = useRef<Destination | null>(null);
  if (activeScene) {
    lastSceneRef.current = activeScene;
  }
  const displayScene = activeScene || lastSceneRef.current;

  const pathRef = useRef<SVGPathElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Rocket state: starts docked on Launch Pad circle at bottom (18%, 78%), facing launch trajectory (15 deg)
  const [rocketPos, setRocketPos] = useState({ x: 18, y: 78, angle: 15 });
  const [isFlying, setIsFlying] = useState(false);
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(-1); // -1 = Launch Pad
  const currentDistRef = useRef<number>(0);
  const lastDirectionRef = useRef<1 | -1>(1);

  const getTargetDistance = useCallback((nodeIdx: number): number => {
    if (!pathRef.current) return 0;
    const total = pathRef.current.getTotalLength();
    if (nodeIdx === -1) return 0; // Launch Pad at bottom-left
    const fractions: Record<number, number> = {
      0: 0.2657, // About (01) at (32%, 42%) [Crest 1 - Up]
      1: 0.5008, // Projects (02) at (48%, 72%) [Trough 1 - Down]
      2: 0.7722, // Experience & Education (03) at (64%, 36%) [Crest 2 - Up]
      3: 1.0,    // Contact (04) at (78%, 66%) [Trough 2 - Down, info on right]
    };
    return total * (fractions[nodeIdx] ?? 0);
  }, []);

  const computeAngleAt = useCallback((dist: number, direction: 1 | -1): number => {
    if (!pathRef.current) return direction === 1 ? 90 : -90;
    const total = pathRef.current.getTotalLength();
    let p1: DOMPoint;
    let p2: DOMPoint;
    if (direction === 1) {
      const d1 = Math.min(dist, Math.max(0, total - 3));
      const d2 = Math.min(total, d1 + 3);
      p1 = pathRef.current.getPointAtLength(d1);
      p2 = pathRef.current.getPointAtLength(d2);
    } else {
      const d1 = Math.max(dist, Math.min(total, 3));
      const d2 = Math.max(0, d1 - 3);
      p1 = pathRef.current.getPointAtLength(d1);
      p2 = pathRef.current.getPointAtLength(d2);
    }
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.atan2(dy, dx) * (180 / Math.PI) + 90;
  }, []);

  // Compute exact celestial waypoint coordinates and spline tangent angle
  const getNodeRocketState = useCallback(
    (nodeIdx: number, direction: 1 | -1 = 1): { x: number; y: number; angle: number } => {
      if (nodeIdx === -1) {
        return { x: 18, y: 78, angle: direction === 1 ? 15 : computeAngleAt(0, -1) };
      }
      if (!pathRef.current) {
        const fallbackAngle = direction === 1 ? 90 : -90;
        const defaultPositions: Record<number, { x: number; y: number; angle: number }> = {
          0: { x: 32, y: 42, angle: fallbackAngle },
          1: { x: 48, y: 72, angle: fallbackAngle },
          2: { x: 64, y: 36, angle: fallbackAngle },
          3: { x: 78, y: 66, angle: fallbackAngle },
        };
        return defaultPositions[nodeIdx] ?? { x: 18, y: 78, angle: 15 };
      }

      const targetDist = getTargetDistance(nodeIdx);
      const pt = pathRef.current.getPointAtLength(targetDist);

      return {
        x: pt.x / 10,
        y: pt.y / 10,
        angle: computeAngleAt(targetDist, direction),
      };
    },
    [getTargetDistance, computeAngleAt]
  );

  // Animate rocket along the line to target node and open its scene
  const flyToNode = useCallback(
    (nodeIdx: number) => {
      if (!pathRef.current) return;
      const total = pathRef.current.getTotalLength();
      const targetDist = getTargetDistance(nodeIdx);
      const startDist = currentDistRef.current;

      // If already at this node, open scene immediately
      if (Math.abs(targetDist - startDist) < 1.5) {
        if (nodeIdx >= 0) {
          setActiveScene(destinations[nodeIdx]);
        }
        return;
      }

      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }

      const direction: 1 | -1 = targetDist >= startDist ? 1 : -1;
      lastDirectionRef.current = direction;

      setIsFlying(true);
      setActiveNodeIndex(nodeIdx);

      const distToTravel = Math.abs(targetDist - startDist);
      const duration = Math.min(1600, Math.max(700, (distToTravel / total) * 1400 + 350));
      const startTime = performance.now();

      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(1, elapsed / duration);
        const eased = easeInOutCubic(progress);
        const currentD = startDist + (targetDist - startDist) * eased;

        const pt = pathRef.current!.getPointAtLength(currentD);

        setRocketPos({
          x: pt.x / 10,
          y: pt.y / 10,
          angle: computeAngleAt(currentD, direction),
        });

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(animate);
        } else {
          currentDistRef.current = targetDist;
          setIsFlying(false);
          setRocketPos(getNodeRocketState(nodeIdx, direction));
          // Arrived at destination node: open that node's dedicated scene!
          if (nodeIdx >= 0) {
            setTimeout(() => {
              setActiveScene(destinations[nodeIdx]);
            }, 120);
          }
        }
      };

      animFrameRef.current = requestAnimationFrame(animate);
    },
    [getTargetDistance, getNodeRocketState, computeAngleAt]
  );

  useEffect(() => {
    // Preload terrain assets in background so transitions are instant with zero decode lag
    destinations.forEach((d) => {
      const img = new Image();
      img.src = d.terrain;
    });

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Synchronize rocket position, active waypoint, and spline distance with activeScene
  useEffect(() => {
    if (!activeScene || isFlying) return;
    const idx = destinations.findIndex((d) => d.id === activeScene.id);
    if (idx >= 0) {
      setActiveNodeIndex(idx);
      currentDistRef.current = getTargetDistance(idx);
      setRocketPos(getNodeRocketState(idx, lastDirectionRef.current));
    }
  }, [activeScene, isFlying, getTargetDistance, getNodeRocketState]);

  // Keyboard Escape support to return from scene to constellation map
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeScene) {
        // Prevent closing if a child modal (like screenshot lightbox) is active
        const hasOpenLightbox = document.querySelector(".lightbox-modal-backdrop");
        if (!hasOpenLightbox) {
          const currentIdx = destinations.findIndex((d) => d.id === activeScene.id);
          if (currentIdx >= 0) {
            setActiveNodeIndex(currentIdx);
            currentDistRef.current = getTargetDistance(currentIdx);
            setRocketPos(getNodeRocketState(currentIdx, lastDirectionRef.current));
          }
          setActiveScene(null);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeScene, getTargetDistance, getNodeRocketState]);

  // Scene navigation handlers: immediately sync rocket and waypoint
  const handlePrevScene = () => {
    if (!activeScene) return;
    const currentIdx = destinations.findIndex((d) => d.id === activeScene.id);
    const prevIdx = (currentIdx - 1 + destinations.length) % destinations.length;
    const dir: 1 | -1 = prevIdx < currentIdx ? -1 : 1;
    lastDirectionRef.current = dir;
    setActiveScene(destinations[prevIdx]);
    setActiveNodeIndex(prevIdx);
    currentDistRef.current = getTargetDistance(prevIdx);
    setRocketPos(getNodeRocketState(prevIdx, dir));
  };

  const handleNextScene = () => {
    if (!activeScene) return;
    const currentIdx = destinations.findIndex((d) => d.id === activeScene.id);
    const nextIdx = (currentIdx + 1) % destinations.length;
    const dir: 1 | -1 = nextIdx > currentIdx ? 1 : -1;
    lastDirectionRef.current = dir;
    setActiveScene(destinations[nextIdx]);
    setActiveNodeIndex(nextIdx);
    currentDistRef.current = getTargetDistance(nextIdx);
    setRocketPos(getNodeRocketState(nextIdx, dir));
  };

  return (
    <div className="explorer-view-wrapper">
      {/* ==========================================================
          LAYER 1: CONSTELLATION MAP & ROCKET FLIGHT PATH
          Persistent base stage. Never unmounted to prevent black flicker!
          ========================================================== */}
      <section
        className={`destination-screen${activeScene ? " is-scene-active" : ""}`}
        key="constellation-map"
        aria-hidden={!!activeScene}
      >
        <div className="destination-starfield" aria-hidden="true" />

        {/* Ethereal organic nebula dust clouds faithfully reflecting reference image */}
        <div className="constellation-nebulae" aria-hidden="true">
          <svg
            className="nebula-vector-canvas"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="nebulaSoftGaussian" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="32" />
              </filter>
              <filter id="nebulaDeepGaussian" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="55" />
              </filter>
            </defs>

            {/* Layer 1: Ambient deep cosmic cloud spine hugging the constellation path */}
            <path
              d="M 60 880 C 40 700, 120 480, 240 450 C 340 420, 390 580, 480 540 C 560 500, 520 280, 640 250 C 740 220, 780 130, 890 120 C 980 110, 990 280, 920 380 C 850 480, 750 620, 660 630 C 570 640, 540 780, 450 810 C 350 840, 240 940, 140 950 C 80 960, 70 930, 60 880 Z"
              fill="rgba(15, 18, 28, 0.78)"
              filter="url(#nebulaDeepGaussian)"
              className="nebula-drift-deep"
            />

            {/* Layer 2: Organic topographic cloud lobes echoing reference contours */}
            {/* Lower-left lobe around Launch Pad & Commercial Projects */}
            <path
              d="M 90 840 C 70 730, 130 590, 210 520 C 290 450, 350 510, 340 640 C 330 760, 280 890, 190 920 C 130 940, 100 890, 90 840 Z"
              fill="rgba(24, 29, 44, 0.62)"
              filter="url(#nebulaSoftGaussian)"
              className="nebula-drift-mid"
            />

            {/* Center-lower trough lobe under Personal Projects */}
            <path
              d="M 280 720 C 310 610, 380 570, 470 590 C 550 610, 570 730, 530 810 C 490 880, 380 890, 320 850 C 270 810, 260 770, 280 720 Z"
              fill="rgba(22, 27, 40, 0.65)"
              filter="url(#nebulaSoftGaussian)"
            />

            {/* Upper-crest & Center body embracing Experience and About */}
            <path
              d="M 460 480 C 470 370, 550 260, 650 280 C 740 300, 770 410, 780 510 C 790 610, 740 700, 650 680 C 570 660, 490 670, 460 590 C 430 530, 450 500, 460 480 Z"
              fill="rgba(28, 34, 52, 0.6)"
              filter="url(#nebulaSoftGaussian)"
              className="nebula-drift-mid"
            />

            {/* Upper-right apex cloud embracing Contact */}
            <path
              d="M 670 360 C 680 230, 770 140, 860 130 C 940 120, 980 200, 960 310 C 930 400, 850 470, 770 450 C 700 430, 660 410, 670 360 Z"
              fill="rgba(26, 32, 48, 0.62)"
              filter="url(#nebulaSoftGaussian)"
            />

            {/* Layer 3: Nested highlight contour clouds for rich depth */}
            <path
              d="M 180 620 C 220 540, 300 550, 320 620 C 330 680, 290 740, 230 730 C 180 720, 160 670, 180 620 Z"
              fill="rgba(38, 46, 68, 0.42)"
              filter="url(#nebulaSoftGaussian)"
            />
            <path
              d="M 480 430 C 520 330, 600 340, 630 410 C 650 470, 610 530, 550 530 C 490 530, 460 480, 480 430 Z"
              fill="rgba(42, 50, 74, 0.4)"
              filter="url(#nebulaSoftGaussian)"
            />
            <path
              d="M 720 280 C 760 190, 840 200, 870 260 C 890 320, 850 370, 800 370 C 740 370, 700 330, 720 280 Z"
              fill="rgba(40, 48, 72, 0.44)"
              filter="url(#nebulaSoftGaussian)"
            />
          </svg>
        </div>

        <button className="destination-back" onClick={onReturn} aria-label="Return to Earth">
          <ArrowLeft size={14} /> <span>BACK</span>
        </button>

        <div className="destination-heading">
          <span className="heading-beacon" aria-hidden="true" />
          <span>CHOOSE WHERE TO EXPLORE</span>
        </div>

        <div className="constellation-map" aria-label="Portfolio destinations">
          <svg className="constellation-lines" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="cosmicLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="30%" stopColor="#d8f0ff" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#e2f2ff" stopOpacity="0.9" />
              </linearGradient>
              <filter id="starHaloGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Ambient celestial glow ribbon */}
            <path className="constellation-glow" d={mainSpline} />

            {/* Harmonic resonance twin wave */}
            <path className="constellation-harmonic" d={harmonicSpline} />

            {/* Constellation branch paths connecting secondary stars */}
            <path className="constellation-branch" d="M 180 780 Q 220 700, 260 650" />
            <path className="constellation-branch" d="M 320 420 Q 360 350, 390 380" />
            <path className="constellation-branch" d="M 480 720 Q 510 760, 540 710" />
            <path className="constellation-branch" d="M 480 720 Q 530 610, 560 570" />
            <path className="constellation-branch" d="M 560 570 L 590 580" />
            <path className="constellation-branch" d="M 640 360 Q 680 300, 720 320" />
            <path className="constellation-branch" d="M 780 660 Q 820 700, 850 670" />

            {/* Primary artistic luminous curve */}
            <path ref={pathRef} className="constellation-main" d={mainSpline} />

            {/* Animated starlight pulses gliding along the path */}
            <path className="constellation-stream" d={mainSpline} />

            {/* Secondary celestial stars with translucent halos */}
            {/* Star 1: Lower Launch branch at (260, 650) */}
            <circle cx="260" cy="650" r="14" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.8" />
            <circle cx="260" cy="650" r="3.2" className="constellation-branch-star" />

            {/* Star 2: Upper About branch at (390, 380) */}
            <circle cx="390" cy="380" r="16" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="0.8" />
            <circle cx="390" cy="380" r="3.5" className="constellation-branch-star" />

            {/* Star 3: Lower Projects branch at (540, 710) */}
            <circle cx="540" cy="710" r="12" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.8" />
            <circle cx="540" cy="710" r="3.0" className="constellation-branch-star" />

            {/* Star 4 & 5: Intermediate binary pair at (560, 570) & (590, 580) */}
            <ellipse cx="575" cy="575" rx="26" ry="15" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.8" />
            <circle cx="560" cy="570" r="3.4" className="constellation-branch-star" />
            <circle cx="590" cy="580" r="3.0" className="constellation-branch-star" />

            {/* Star 6: Prominent radiant halo star at (720, 320) */}
            <circle cx="720" cy="320" r="22" fill="rgba(255, 255, 255, 0.12)" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" />
            <circle cx="720" cy="320" r="13" fill="rgba(255, 255, 255, 0.18)" />
            <circle cx="720" cy="320" r="4.0" className="constellation-branch-star" filter="url(#starHaloGlow)" />

            {/* Star 7: Lower Contact branch star at (850, 670) */}
            <circle cx="850" cy="670" r="12" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.8" />
            <circle cx="850" cy="670" r="3.0" className="constellation-branch-star" />

            {/* Twinkling star sparks on intermediate orbital waypoints */}
            <circle cx="230" cy="610" r="2.2" className="constellation-spark" />
            <circle cx="400" cy="570" r="2.4" className="constellation-spark" style={{ animationDelay: "1.1s" }} />
            <circle cx="560" cy="540" r="2.5" className="constellation-spark" style={{ animationDelay: "2.2s" }} />
            <circle cx="720" cy="510" r="2.2" className="constellation-spark" style={{ animationDelay: "0.8s" }} />
            <circle cx="550" cy="660" r="2.5" className="constellation-spark" style={{ animationDelay: "2.2s" }} />
            <circle cx="730" cy="310" r="2.2" className="constellation-spark" style={{ animationDelay: "0.8s" }} />
          </svg>

          {/* Actual launch pad platform circle (custom illustrated docking marker) */}
          <motion.button
            className={`launch-base-node${activeNodeIndex === -1 ? " is-active" : ""}`}
            style={basePosition}
            onClick={() => flyToNode(-1)}
            aria-label="Launch Pad"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.94 }}
          >
            <OrbitMarker index={-1} isActive={activeNodeIndex === -1} />
          </motion.button>

          {/* 4 Destination Nodes with Custom Illustrated Planetary Orbit Markers */}
          {destinations.map((destination, index) => (
            <motion.button
              key={destination.id}
              className={`destination-node destination-node-${index + 1}${
                activeNodeIndex === index ? " is-active" : ""
              }`}
              style={{ left: positions[index].left, top: positions[index].top }}
              onClick={() => flyToNode(index)}
              aria-label={`Explore ${destination.title}`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.15 + index * 0.08,
                duration: 0.5,
                type: "spring",
              }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.94 }}
            >
              {/* Custom Illustrated Planetary Orbit Marker */}
              <OrbitMarker
                destinationId={destination.id}
                index={index}
                isActive={activeNodeIndex === index}
              />

              {/* High-contrast Glassmorphic HUD Destination Waypoint Card */}
              <div className={`destination-label align-${positions[index].align}`}>
                <div className="label-badge-row">
                  <span className="label-sector-index">{destination.index}</span>
                  <span className="label-sector-tag">{positions[index].shortTag}</span>
                </div>
                <div className="label-title-row">
                  <span className="label-main-title">{destination.title}</span>
                  <ArrowUpRight size={14} className="label-arrow" />
                </div>
              </div>
            </motion.button>
          ))}

          {/* Space Rocket: Sits on top of the bottom circle, flies along line to selected node */}
          <div
            className={`rocket-vehicle${isFlying ? " is-flying" : ""}`}
            style={{
              left: `${rocketPos.x}%`,
              top: `${rocketPos.y}%`,
              transform: `translate(-50%, -50%) rotate(${rocketPos.angle}deg)`,
            }}
            aria-hidden="true"
          >
            <img
              src="/assets/rocket/rocket.png"
              alt="Rocket"
              className="rocket-sprite"
            />
            <div className="rocket-thruster" />
          </div>
        </div>
      </section>

      {/* ==========================================================
          LAYER 2: DEDICATED DESTINATION SCENE VIEW OVERLAY
          Smoothly dissolves over constellation map without any black screen gap!
          ========================================================== */}
      <AnimatePresence>
        {activeScene && displayScene && (
          <motion.div
            key="destination-scene-overlay"
            className={`destination-scene-view ${!activeScene ? "is-exiting" : ""}`}
            style={{ pointerEvents: activeScene ? "auto" : "none" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {/* LAYER 1: Deep space starfield background (fully covers constellation map) */}
            <div className="scene-starfield-bg" aria-hidden="true" />

            {/* Ambient atmospheric color glow matching the terrain */}
            <div
              className="scene-atmosphere-glow"
              style={{ background: displayScene.themeColor }}
              aria-hidden="true"
            />

            {/* LAYER 2: Expansive Hero Environment (The Main Attraction) */}
            <div className="scene-terrain-wrap" aria-hidden="true">
              <img
                src={displayScene.terrain}
                alt={displayScene.title}
                className="scene-terrain-img"
              />
              <div className="scene-horizon-gradient" />
            </div>

            {/* LAYER 3: Dedicated Destination Showcase Views */}
            {displayScene.id === "about" ? (
              <motion.div
                key="about-avatar-showcase"
                className="about-top-showcase"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <div className="about-avatar-container">
                  <PixelAvatar />
                </div>
                <h1 className="about-title-pixel">Goutham Dev S</h1>
                <TypewriterText />
                <p className="about-subtitle-pixel">
                  I build worlds and systems behind them
                </p>
                <div className="about-body-panel">
                  <p className="about-body-text">
                    Hi there, and thanks for stopping by! I’m Goutham — a game dev with a passion for turning pixels into playable worlds that are fast, fun, and just a bit chaotic — exactly how games should be.
                  </p>
                </div>
              </motion.div>
            ) : displayScene.id === "projects" ? (
              <ProjectsShowcase />
            ) : displayScene.id === "experience" ? (
              <ExperienceShowcase />
            ) : displayScene.id === "contact" ? (
              <ContactShowcase />
            ) : (
              <div className="scene-content-anchor">
                <motion.article
                  key="scene-intel-card"
                  className="scene-content-card"
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  <div className="scene-card-header">
                    <div className="scene-card-tags">
                      <span className="scene-tag-badge">
                        <Sparkles size={11} /> {displayScene.subtitle}
                      </span>
                    </div>
                    <div className="scene-card-header-actions">
                      <span className="scene-tag-index">{displayScene.index} // 04</span>
                    </div>
                  </div>

                  <h1 className="scene-card-title">{displayScene.title}</h1>
                  <p className="scene-card-intro">{displayScene.intro}</p>

                  <div className="scene-card-body">
                    <div className="scene-points-col">
                      <h3 className="scene-col-label">KEY SYSTEMS & ARCHITECTURE</h3>
                      <ul className="scene-points-list">
                        {displayScene.points.map((pt, i) => (
                          <li key={i}>
                            <span className="scene-bullet">↗</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="scene-tools-col">
                      <div>
                        <h3 className="scene-col-label">TECHNOLOGY & DOMAINS</h3>
                        <div className="scene-tool-chips">
                          {displayScene.tools.map((tool) => (
                            <span key={tool} className="scene-tool-chip">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      {displayScene.action && (
                        <a
                          href={displayScene.action.href}
                          className="scene-action-btn"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>{displayScene.action.label}</span>
                          <ArrowUpRight size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              </div>
            )}

            {/* LAYER 4: Top Navigation Bar */}
            <header className="scene-topbar">
              <button
                className="scene-back-btn"
                onClick={() => {
                  if (activeScene) {
                    const currentIdx = destinations.findIndex((d) => d.id === activeScene.id);
                    if (currentIdx >= 0) {
                      setActiveNodeIndex(currentIdx);
                      currentDistRef.current = getTargetDistance(currentIdx);
                      setRocketPos(getNodeRocketState(currentIdx, lastDirectionRef.current));
                    }
                  }
                  setActiveScene(null);
                }}
                aria-label="Back"
              >
                <ArrowLeft size={15} />
                <span>BACK</span>
              </button>

              <div className="scene-topbar-right">
                <div className="scene-nav-arrows">
                  <button
                    className="scene-arrow-btn"
                    onClick={handlePrevScene}
                    aria-label="Previous destination"
                    title="Previous destination"
                  >
                    <ArrowLeft size={13} />
                    <span className="arrow-text">PREV</span>
                  </button>
                  <span className="scene-step-counter">{displayScene.index} / 04</span>
                  <button
                    className="scene-arrow-btn"
                    onClick={handleNextScene}
                    aria-label="Next destination"
                    title="Next destination"
                  >
                    <span className="arrow-text">NEXT</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </header>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
