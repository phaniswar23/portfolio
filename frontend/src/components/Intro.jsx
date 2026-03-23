import React from 'react';
import { motion } from 'framer-motion';

export default function Intro() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#020617] overflow-hidden pointer-events-none"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.1, 
        filter: "blur(10px)",
        transition: { duration: 0.8, ease: "easeInOut" }
      }}
    >
      {/* Subtle vignette edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.85)_100%)] z-10" />

      {/* Radial glow behind text */}
      <motion.div
        className="absolute w-[800px] h-[800px] bg-blue-500/15 rounded-full blur-[140px] z-0"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* 3D Scene Container */}
      <div className="relative z-20 flex items-center justify-center w-full h-full" style={{ perspective: "1000px" }}>
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-blue-300 drop-shadow-[0_0_25px_rgba(34,211,238,0.3)]"
          initial={{ z: -300, opacity: 0, filter: "blur(20px)" }}
          animate={{ 
            z: 0, 
            opacity: 1, 
            filter: "blur(0px)" 
          }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          exit={{ 
            z: 800, 
            opacity: 0, 
            filter: "blur(25px)",
            transition: { duration: 0.8, ease: [0.32, 0, 0.67, 0] } 
          }}
        >
          Welcome to my portfolio
        </motion.h1>
      </div>
    </motion.div>
  );
}
