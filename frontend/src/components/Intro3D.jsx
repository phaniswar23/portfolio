import { motion } from "framer-motion";

export default function Intro3D({ onFinish }) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#020617]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.6, duration: 0.8 }}
      onAnimationComplete={onFinish}
      style={{ perspective: "1200px" }}
    >
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-white drop-shadow-[0_0_40px_rgba(59,130,246,0.4)]"
        initial={{
          opacity: 0,
          scale: 0.8,
          rotateX: 20,
          z: -200,
          filter: "blur(10px)",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          rotateX: 0,
          z: 0,
          filter: "blur(0px)",
        }}
        exit={{
          scale: 1.4,
          z: 300,
          opacity: 0,
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        whileHover={{ scale: 1.05 }}
      >
        <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
          Welcome to my portfolio
        </span>
      </motion.h1>
    </motion.div>
  );
}
