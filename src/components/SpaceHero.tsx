import { motion } from "framer-motion";
import EarthCanvas from "./EarthCanvas";

interface SpaceHeroProps {
  onExplore: () => void;
  isTransitioning?: boolean;
}

export default function SpaceHero({
  onExplore,
  isTransitioning = false,
}: SpaceHeroProps) {
  return (
    <section className={`space-hero${isTransitioning ? " is-launching" : ""}`} id="top">
      {/* 3D Earth Canvas spanning the full hero */}
      <div className="earth-canvas-wrapper">
        <EarthCanvas
          onEarthClick={onExplore}
          isTransitioning={isTransitioning}
        />
      </div>

      {/* Spacer maintaining flex vertical structure */}
      <div className="hero-center-spacer" />

      {/* Atmospheric transition curtain */}
      <motion.div
        className="launch-curtain"
        initial={false}
        animate={{ opacity: isTransitioning ? 1 : 0 }}
        transition={{ duration: 0.65, delay: isTransitioning ? 1.05 : 0 }}
        aria-hidden="true"
      >
        <motion.p
          animate={isTransitioning ? { opacity: [0, 1, 1, 0], y: [10, 0, 0, -6] } : { opacity: 0 }}
          transition={{ duration: 1.3, times: [0, 0.25, 0.75, 1], delay: 0.55 }}
        >
          ENTERING THE UNKNOWN
        </motion.p>
      </motion.div>

      <div className="space-footnote">
        <span>PLAY / BUILD / EXPERIMENT</span>
      </div>
    </section>
  );
}
