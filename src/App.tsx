import { useState, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CockpitLaunch from "./components/CockpitLaunch";

const WorldExplorer = lazy(() => import("./components/WorldExplorer"));

function App() {
  const [exploring, setExploring] = useState(false);

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
            initial={{ opacity: 0, scale: 1.025 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
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
