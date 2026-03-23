import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Intro3DPro({ onFinish }) {
  // Auto-dismiss: play entry for ~2s, then trigger exit via parent state
  useEffect(() => {
    const timer = setTimeout(onFinish, 2200);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ perspective: "1200px" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -60, scale: 1.05, transition: { duration: 0.6, ease: "easeInOut" } }}
    >
      {/* ── Background Layers ── */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Primary animated lime orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-[#6EE7F9]/10 blur-[150px] rounded-full"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary lavender orb bottom-right */}
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#A78BFA]/10 blur-[120px] rounded-full"
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.85)_100%)] pointer-events-none" />

      {/* ── Typography ── */}
      <motion.div
        className="text-center relative z-20 px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Subtle "Welcome to" label */}
        <h2
          className="text-sm tracking-[0.4em] text-[#6EE7F9]/60 uppercase mb-4 font-medium"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Welcome to
        </h2>

        {/* Dominant heading */}
        <motion.h1
          className="text-7xl md:text-9xl font-extrabold tracking-tight leading-none"
          style={{
            fontFamily: "'Clash Display', 'Inter', sans-serif",
            textShadow: "0 0 20px rgba(110, 231, 249, 0.2), 0 0 40px rgba(167, 139, 250, 0.15)",
          }}
          initial={{ scale: 0.7, rotateX: 20, filter: "blur(10px)", opacity: 0 }}
          animate={{ scale: 1, rotateX: 0, filter: "blur(0px)", opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
        >
          <span className="bg-gradient-to-r from-[#6EE7F9] via-[#A78BFA] to-[#ffffff] bg-clip-text text-transparent">
            My Portfolio
          </span>
        </motion.h1>
      </motion.div>
    </motion.div>
  );
}
