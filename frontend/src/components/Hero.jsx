import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Github, Linkedin, FileText, Code, Cpu, Database, Zap, Terminal, Globe, CheckCircle2, User, Code2, Trophy } from 'lucide-react';
import profileImg from '../assets/profile.jpg';
import ResumeHub from './ResumeHub';

const TechCore = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#0B0B0C]/50 rounded-2xl border border-white/[0.05]">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,163,115,0.1)_0%,transparent_70%)] animate-pulse" />
      
      {/* Rotating Outer Ring */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[80%] h-[80%] border border-[#D4A373]/20 rounded-full border-dashed"
      />
      
      {/* Rotating Mid Ring */}
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-[60%] h-[60%] border-2 border-[#D4A373]/10 rounded-full"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#D4A373] rounded-full shadow-[0_0_15px_#D4A373]" />
      </motion.div>
      
      {/* Inner Pulsing Core */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-[#D4A373] to-[#A1A1AA] flex items-center justify-center shadow-[0_0_50px_rgba(212,163,115,0.4)]"
      >
        <Cpu className="w-10 h-10 text-[#0B0B0C]" />
        
        {/* Floating Data Bits */}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              rotate: [0, 360],
              radius: [40, 60, 40]
            }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "linear" }}
            className="absolute"
          >
            <div className="w-1 h-1 bg-[#D4A373] rounded-full" />
          </motion.div>
        ))}
      </motion.div>

      {/* Code Fragments */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-20 font-mono text-[8px] text-[#D4A373]">
        <div className="flex justify-between">
          <span>0x${Math.random().toString(16).substr(2, 4)}</span>
          <span>INIT_CORE_v4.0</span>
        </div>
        <div className="flex justify-between">
          <span>SYS_ACTIVE</span>
          <span>{`{ status: 'LIVE' }`}</span>
        </div>
      </div>
    </div>
  );
};

const TechParticles = () => {
  const particles = Array.from({ length: 20 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: Math.random() * 0.3,
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%"
          }}
          animate={{ 
            x: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%"
            ],
            y: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%"
            ],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 20 + Math.random() * 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-1 h-1 bg-[#D4A373] rounded-full blur-[1px]"
        />
      ))}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

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
      className={`relative min-h-screen flex flex-col justify-center pt-20 pb-8 px-4 sm:px-12 md:px-20 max-w-[1600px] mx-auto overflow-hidden text-foreground cursor-default`}
    >
      <div className="absolute inset-0 pointer-events-none -z-20 overflow-hidden bg-transparent">
        {/* 3. Premium Noise Texture (Optimized) */}
        <div className="absolute inset-0 opacity-[0.012] mix-blend-overlay pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '24px 24px' }} 
        />
        <TechParticles />
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
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl font-light text-white/50 tracking-wide mb-0 select-none transition-colors duration-300"
          >
            I'm
          </motion.p>

          {/* Big Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-2 select-none"
          >
            <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-[0.85] block">
              Phaniswar
            </span>
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl sm:text-2xl font-medium mb-4 flex flex-wrap items-center gap-x-4 h-10 transition-colors duration-300"
          >
            <span className="text-[#A1A1AA] font-light italic">Building</span>
            <div className="relative overflow-hidden h-full min-w-[240px] sm:min-w-[360px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentIndex}
                  initial={{ y: 24, opacity: 0, skewY: 5 }}
                  animate={{ y: 0, opacity: 1, skewY: 0 }}
                  exit={{ y: -24, opacity: 0, skewY: -5 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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

        {/* ── Right: Floating Holographic Display ── */}
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto h-[350px] sm:h-[500px] flex items-center justify-center mt-8 lg:mt-0"
        >
          {/* Main Visual Core */}
          <div className="relative w-full aspect-square max-w-[440px] perspective-2000 group/hologram scale-[0.75] sm:scale-100">
            <motion.div
              ref={cardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
              className="relative w-full h-full flex items-center justify-center"
            >
                {/* 1. Ambient Glow System (Organic) */}
                <div className="absolute inset-[-100px] animate-pulse-slow -z-10 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(212, 163, 115, 0.05) 0%, transparent 60%)' }} />
                <div className="absolute top-0 left-0 w-full h-full animate-pulse-slow [animation-delay:2s] -z-10 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(161, 161, 170, 0.1) 0%, transparent 60%)' }} />

                {/* 2. Floating Data Nodes (Holographic Panels) */}
                
                {/* Node 1: Availability */}
                <motion.div 
                  style={{ transform: "translateZ(80px)" }}
                  className="absolute -top-12 -right-4 z-30"
                >
                  <div className="glass px-4 py-2 rounded-xl flex items-center gap-3 border-white/10 shadow-2xl backdrop-blur-2xl">
                    <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A373] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4A373]" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4A373]">Active for Internship</span>
                  </div>
                </motion.div>

                {/* Node 2: Identity Tag */}
                <motion.div 
                  style={{ transform: "translateZ(120px)" }}
                  className="absolute -bottom-8 -left-4 z-30"
                >
                  <div className="glass p-5 rounded-2xl border-white/10 shadow-2xl backdrop-blur-2xl">
                    <h3 className="text-white font-bold text-lg tracking-tight mb-1">Janyavula Phaniswar</h3>
                    <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[#A1A1AA]">Full Stack Architect</div>
                  </div>
                </motion.div>

                {/* Node 3: Stats/Metric (Floating Circle) */}
                <motion.div 
                   style={{ transform: "translateZ(40px)" }}
                   className="absolute top-1/2 -left-12 -translate-y-1/2 z-20 hidden md:block"
                >
                  <div className="w-16 h-16 rounded-full glass flex flex-col items-center justify-center border-white/10 shadow-2xl backdrop-blur-xl">
                    <span className="text-xs font-bold text-[#D4A373]">99%</span>
                    <span className="text-[6px] font-black uppercase text-white/40">Uptime</span>
                  </div>
                </motion.div>

                {/* 3. The Core Visual (Neural Tech Core) */}
                <div 
                  style={{ transform: "translateZ(20px)" }}
                  className="relative w-[340px] h-[340px] rounded-full overflow-hidden shadow-[0_0_80px_rgba(212,163,115,0.1)] border border-white/5"
                >
                  <TechCore />
                </div>

                {/* 4. HUD Geometric Accents */}
                <div className="absolute inset-[-40px] border border-[#D4A373]/10 rounded-full border-dashed animate-spin-slow pointer-events-none" />
                <div className="absolute inset-[-20px] border border-white/5 rounded-full pointer-events-none" />
                
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
