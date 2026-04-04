import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Github, Linkedin, FileText, Code, Cpu, Database, Zap, Terminal, Globe, CheckCircle2, User, Code2, Trophy } from 'lucide-react';
import profileImg from '../assets/profile.jpg';
import ResumeHub from './ResumeHub';

const Hero = ({ animateIntro }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [showResumeOptions, setShowResumeOptions] = useState(false);

  const capabilities = [
    "High Performance Systems",
    "Bespoke Digital Experiences",
    "Scalable Cloud Architectures",
    "Cutting-edge Frontend Design"
  ];

  const handleCardHover = (hovering) => {
    setIsCardHovered(hovering);
  };

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 60, stiffness: 80 });
  const smoothY = useSpring(mouseY, { damping: 60, stiffness: 80 });
  const rotateX = useTransform(smoothY, [-300, 300], [4, -4]);
  const rotateY = useTransform(smoothX, [-300, 300], [-4, 4]);

  // Card tilt
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const cardRef = useRef(null);
  const tiltX = useSpring(useTransform(cardY, [-0.5, 0.5], [8, -8]), { damping: 40, stiffness: 100 });
  const tiltY = useSpring(useTransform(cardX, [-0.5, 0.5], [-8, 8]), { damping: 40, stiffness: 100 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % capabilities.length);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleGlobalMouseMove = (e) => {
    const x = e.clientX - window.innerWidth / 2;
    const y = e.clientY - window.innerHeight / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleCardMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardX.set((e.clientX - rect.left) / rect.width - 0.5);
    cardY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleCardMouseLeave = () => {
    cardX.set(0);
    cardY.set(0);
  };

  return (
    <section
      onMouseMove={handleGlobalMouseMove}
      className={`relative min-h-screen flex flex-col justify-center pt-20 pb-20 px-4 sm:px-12 md:px-20 max-w-[1600px] mx-auto overflow-hidden text-foreground cursor-default`}
    >
      <div className="absolute inset-0 pointer-events-none -z-20 overflow-hidden bg-transparent">
        {/* 3. Premium Noise Texture (Optimized) */}
        <div className="absolute inset-0 opacity-[0.012] mix-blend-overlay pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '24px 24px' }} 
        />
      </div>

      {/* ── Main Layout ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ rotateX, rotateY, perspective: 1200 }}
        className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-10 items-center z-10 relative"
      >
        {/* ── Left: Text ── */}
        <div className="flex flex-col items-start lg:pr-4">

          {/* Greeting — small & subtle */}
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm sm:text-base font-semibold mb-1 tracking-[0.22em] flex items-center gap-2 text-[#A1A1AA] uppercase"
          >
            <span>Hi There</span>
            <motion.span
              animate={{ rotate: [0, 15, -10, 15, 0], y: [0, -2, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block origin-[70%_70%] text-base"
            >
              👋
            </motion.span>
          </motion.p>

          {/* "I'm" lead-in */}
          <motion.p
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-2xl sm:text-3xl font-light text-white/50 tracking-wide mb-0 select-none transition-colors duration-300"
          >
            I'm
          </motion.p>

          {/* Big Name */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-2 select-none"
          >
            <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-[0.85] block">
              Phaniswar
            </span>
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl sm:text-2xl font-medium mb-4 flex flex-wrap items-center gap-x-4 h-10 transition-colors duration-300"
          >
            <span className="text-[#A1A1AA] font-light italic">Building</span>
            <div className="relative overflow-hidden h-full min-w-[240px] sm:min-w-[360px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentIndex}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -18, opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute left-0 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D4A373] to-[#A1A1AA] whitespace-nowrap block font-bold tracking-tight will-change-transform"
                >
                  {capabilities[currentIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Description paragraph */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-base sm:text-lg text-[#E6E6E8] mb-6 max-w-[540px] leading-relaxed font-light transition-colors duration-300"
          >
            Turning ideas into modern web applications.<br /><br />
            Focused on performance, scalability, and seamless user experience.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto mt-4"
          >
            {/* Primary CTA — Solid Gold */}
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#projects"
              className="group relative flex items-center justify-center px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-500 w-full sm:w-auto bg-[#D4A373] text-[#0B0B0C] shadow-[0_10px_30px_-5px_rgba(212,163,115,0.2)] hover:shadow-[0_15px_45px_-10px_rgba(212,163,115,0.4)]"
            >
              <span className="relative z-10 flex items-center uppercase tracking-widest text-[10px]">
                Explore Work <ArrowRight className="w-3 h-3 ml-2.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>

            {/* Resume button — glass */}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowResumeOptions(true)}
              className="group relative flex items-center justify-center px-8 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md font-bold text-sm overflow-hidden transition-all duration-300 w-full sm:w-auto cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2.5 text-[#F5F5F7]">
                <FileText className="w-4 h-4 text-[#D4A373] group-hover:text-white transition-colors" />
                Resume
              </span>
            </motion.button>

            {/* Social icons */}
            <div className="flex gap-3 w-full sm:w-auto">
              {[
                { icon: Github,   href: "https://github.com/phaniswar23" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/phaniswar99/" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.03)" }}
                  href={social.href}
                  className="flex items-center justify-center p-4 rounded-2xl glass transition-all duration-500 group relative overflow-hidden cursor-pointer"
                >
                  <social.icon className="w-5 h-5 text-[#A1A1AA] transition-colors duration-500 group-hover:text-[#FFFFFF]" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Right: Profile Card ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          className="relative w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto"
        >
          <div className="relative lg:w-full aspect-[4/5] max-w-[400px] perspective-1200 cursor-pointer group/card">
            <motion.div
              ref={cardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
              className="relative w-full h-full"
            >
                {/* 1. Slow moving light sweep */}
                <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden rounded-[20px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] animate-light-sweep" />
                </div>

                {/* 2. Soft Outer Glow behind card */}
                <div className="absolute inset-[-20px] bg-[#D4A373]/5 blur-[40px] rounded-[40px] -z-10 pointer-events-none opacity-50 group-hover/card:opacity-100 transition-opacity duration-500" />

                {/* Glass Card Container */}
                <div className="profile-card relative w-full h-full p-5 flex flex-col group/inner overflow-hidden z-10">
                  {/* Image Area */}
                  <div 
                    style={{ transform: "translateZ(40px)" }}
                    className="relative z-10 flex-[1.4] rounded-2xl overflow-hidden mb-6"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/10 animate-pulse-glow -z-10" />
                    
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/[0.05] shadow-2xl transition-all duration-700">
                      <img 
                        src={profileImg} 
                        alt="Portrait" 
                        className="w-full h-full object-cover object-[center_10%] transition-all duration-700 filter grayscale-[0.2] contrast-[1.05] brightness-[0.95] group-hover/inner:grayscale-0 group-hover/inner:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/80 via-transparent to-transparent opacity-80" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div style={{ transform: "translateZ(60px)" }} className="relative z-10 px-3 pb-2">
                    <div className="mb-5">
                      <h3 className="text-[#F5F5F7] font-bold text-2xl tracking-tight leading-tight flex flex-wrap gap-1.5 transition-colors duration-300">
                        {"Janyavula Phaniswar".split(" ").map((word, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 + (i * 0.1), duration: 0.5, ease: "easeOut" }}
                          >
                            {word}
                          </motion.span>
                        ))}
                      </h3>
                      
                      <div className="mt-2.5 flex flex-wrap gap-1.5 ">
                        <div className="relative px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden group/pill flex flex-wrap gap-1 hover:border-[#D4A373]/40 transition-colors duration-300">
                          {"Full Stack Web Developer".split(" ").map((word, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 1.2 + (i * 0.08), duration: 0.4 }}
                              className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A373]"
                            >
                              {word}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Availability badge */}
                    <div className="relative p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 group-hover/inner:border-[#D4A373]/40 transition-all duration-500 shadow-inner overflow-hidden group/badge">
                      <div className="relative z-10 flex items-center gap-4">
                        <div className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A373] opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4A373] shadow-[0_0_10px_rgba(212,163,115,0.8)]" />
                        </div>
                        <span className="text-[#D4A373] text-xs font-semibold tracking-wide uppercase group-hover/badge:text-white transition-colors duration-300">Available for Internship</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#D4A373]/0 via-[#D4A373]/5 to-[#D4A373]/0 translate-x-[-100%] group-hover/badge:translate-x-[100%] transition-transform duration-1000" />
                    </div>
                  </div>
                </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0B0B0C] to-transparent pointer-events-none z-20 transition-colors duration-500" />

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-20 pointer-events-none">
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4A373] to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4A373] font-bold">Scroll to Explore</span>
      </div>

      <ResumeHub isOpen={showResumeOptions} onClose={() => setShowResumeOptions(false)} />
    </section>
  );
};

export default Hero;
