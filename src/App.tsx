import { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CockpitLaunch from "./components/CockpitLaunch";

const WorldExplorer = lazy(() => import("./components/WorldExplorer"));

function App() {
  const [exploring, setExploring] = useState(false);

  // Prefetch WorldExplorer chunk in the background while user is on Cockpit
  useEffect(() => {
    const timer = window.setTimeout(() => {
      import("./components/WorldExplorer");
    }, 800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="universe-main">
      <AnimatePresence mode="wait">
        {!exploring ? (
          <motion.div
            key="cockpit-launch"
            className="scene-layer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <CockpitLaunch onLaunchComplete={() => setExploring(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="explorer"
            className="scene-layer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
          >
            <Suspense fallback={null}>
              <WorldExplorer onReturn={() => setExploring(false)} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
