import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import Intro3DScene from "./Intro3DScene";

export default function Intro3DPro({ onFinish }) {
  const [showScene, setShowScene] = useState(true);

  useEffect(() => {
    // Total animation time before transitioning to main site
    const timer = setTimeout(() => {
      setShowScene(false);
      setTimeout(onFinish, 600);
    }, 2200); // 2.2 seconds for ultra-fast cinematic sequence

    return () => clearTimeout(timer);
  }, [onFinish]);

  const handleSkip = () => {
    setShowScene(false);
    setTimeout(onFinish, 300);
  };

  return (
    <AnimatePresence>
      {showScene && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#050505] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.02,
            filter: "blur(15px)",
            transition: { duration: 0.8, ease: "easeInOut" } 
          }}
        >
          {/* Skip Button - Top Right */}
          <motion.button
            onClick={handleSkip}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            whileHover={{ opacity: 0.8, backgroundColor: "rgba(230, 192, 137, 0.05)" }}
            className="absolute top-10 right-10 z-[10000] px-6 py-2 border border-[#E6C089]/20 rounded-full text-[9px] tracking-[0.4em] text-[#E6C089] uppercase font-light transition-all cursor-pointer backdrop-blur-sm"
          >
            Skip Sequence
          </motion.button>
          <div className="absolute inset-0">
            <Canvas
              shadows
              gl={{ 
                antialias: true, 
                alpha: true,
                powerPreference: "high-performance",
                stencil: false,
                depth: true
              }}
              camera={{ position: [0, 0, 30], fov: 45 }}
              dpr={[1, 2]} // Support high-res screens
            >
              <Suspense fallback={null}>
                <Intro3DScene />
              </Suspense>
            </Canvas>
          </div>

          {/* Sound simulation overlay (optional visual hint) */}
          <div className="absolute bottom-10 left-10 opacity-30">
            <div className="flex gap-1 items-center">
              <div className="w-1 h-1 bg-[#E6C089] rounded-full animate-ping" />
              <span className="text-[10px] tracking-[0.3em] text-[#E6C089] uppercase">Audio Active</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
