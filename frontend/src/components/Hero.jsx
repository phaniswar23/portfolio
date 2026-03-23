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
      className={`relative min-h-[90vh] flex flex-col justify-center pt-16 pb-0 px-8 sm:px-12 md:px-20 max-w-[1600px] mx-auto overflow-hidden text-foreground cursor-default`}
    >
      {/* ── Clean Premium Dark Background System ── */}
      <div className="absolute inset-0 pointer-events-none -z-20 overflow-hidden bg-[#020617]">
        {/* 1. Base Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F1A] via-[#0F172A] to-[#020617] opacity-100" />

        {/* 2. Soft Radial Glows (Left Blue, Right Purple) */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            animate={{ 
              opacity: [0.08, 0.12, 0.08],
              scale: [1, 1.05, 1] 
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[-10%] w-[1000px] h-[1000px] bg-[#6EE7F9]/15 blur-[160px] rounded-full" 
          />
          <motion.div 
            animate={{ 
              opacity: [0.08, 0.12, 0.08],
              scale: [1, 1.05, 1] 
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[-20%] right-[-10%] w-[1200px] h-[1200px] bg-[#A78BFA]/15 blur-[160px] rounded-full" 
          />
        </div>

        {/* 3. Premium Noise Texture (Grain Overlay) */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />
        
        {/* 4. Ultra-Subtle Dot Pattern (Apple/Stripe Style) */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-radial-vignette opacity-40" />
      </div>

      {/* ── Main Layout (Content is the focus) ── */}
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
            className="text-sm sm:text-base font-semibold mb-1 tracking-[0.22em] flex items-center gap-2 text-slate-500 dark:text-gray-400 uppercase"
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
            className="text-2xl sm:text-3xl font-light text-slate-700 dark:text-white/55 tracking-wide mb-0 select-none transition-colors duration-300"
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
            <span className="name-text block">
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
            <span className="text-slate-400 dark:text-gray-500 font-light italic">Building</span>
            <div className="relative overflow-hidden h-full min-w-[300px] sm:min-w-[360px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={capabilities[currentIndex]}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -18, opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute left-0 text-transparent bg-clip-text bg-gradient-to-r from-[#6EE7F9] via-[#A78BFA] to-white whitespace-nowrap block font-bold tracking-tight"
                >
                  {capabilities[currentIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Description paragraph — readable width, relaxed line height */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-base sm:text-lg text-slate-700 dark:text-white/40 mb-6 max-w-[540px] leading-relaxed font-light transition-colors duration-300"
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
            {/* Primary CTA — gradient solid */}
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="#projects"
              className="group relative flex items-center justify-center px-8 py-4 rounded-2xl font-bold text-sm overflow-hidden transition-all duration-300 w-full sm:w-auto bg-gradient-to-r from-[#6EE7F9] to-[#A78BFA] text-black shadow-[0_10px_40px_-10px_rgba(110,231,249,0.3)] hover:shadow-[0_15px_60px_-10px_rgba(110,231,249,0.5)]"
            >
              <span className="relative z-10 flex items-center">
                Explore Work <ArrowRight className="w-4 h-4 ml-2.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>

            {/* Resume button — glass */}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowResumeOptions(true)}
              className="group relative flex items-center justify-center px-8 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md font-bold text-sm overflow-hidden transition-all duration-300 w-full sm:w-auto cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2.5 text-white">
                <FileText className="w-4 h-4 text-[#6EE7F9] group-hover:text-[#A78BFA] transition-colors" />
                Resume
              </span>
            </motion.button>

            {/* Social icons */}
            <div className="flex gap-3 w-full sm:w-auto">
              {[
                { icon: Github,   href: "https://github.com/phaniswar23",             hoverColor: "group-hover:text-[#6EE7F9]" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/phaniswar99/",    hoverColor: "group-hover:text-[#A78BFA]" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -6, scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                  href={social.href}
                  className="flex items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 group relative overflow-hidden cursor-pointer"
                >
                  <social.icon className={`w-5 h-5 text-slate-400 transition-colors duration-300 ${social.hoverColor}`} />
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
          {/* Glass photo card with 3D horizontal flip */}
          <div 
            className="relative lg:w-full aspect-[4/5] max-w-[400px] perspective-1200 cursor-pointer group/card"
          >
            <motion.div
              ref={cardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
              className="relative w-full h-full"
            >
                {/* 1. Slow moving light sweep (Subtle) */}
                <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden rounded-[20px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] animate-light-sweep" />
                </div>

                {/* 2. Soft Outer Glow behind card */}
                <div className="absolute inset-[-20px] bg-cyan-500/5 blur-[40px] rounded-[40px] -z-10 pointer-events-none opacity-50 group-hover/card:opacity-100 transition-opacity duration-500" />

                {/* Glass Card Container */}
                <div className="profile-card relative w-full h-full p-5 flex flex-col group/inner overflow-hidden z-10">
                  {/* Premium Noise Texture for Card */}
                  <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-20" 
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
                  />

                  {/* Rectangular Image Container */}
                  <div 
                    style={{ transform: "translateZ(40px)" }}
                    className="relative z-10 flex-[1.4] rounded-2xl overflow-hidden mb-6"
                  >
                    {/* Pulsing glow behind image */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 animate-pulse-glow -z-10" />
                    
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl group-hover/inner:border-cyan-500/30 transition-colors duration-500">
                      <img 
                        src={profileImg} 
                        alt="Portrait" 
                        className="w-full h-full object-cover object-[center_10%] transition-all duration-700 scale-[1.15] group-hover/inner:scale-125 filter contrast-[1.08] brightness-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/60 via-transparent to-transparent opacity-60" />
                      
                      {/* Glowing ring around image */}
                      <div className="absolute inset-0 border-[2px] border-cyan-400/0 group-hover/inner:border-cyan-400/20 rounded-2xl transition-all duration-700 pointer-events-none" />
                    </div>
                  </div>

                  {/* Card Meta with Word Animations */}
                  <div style={{ transform: "translateZ(60px)" }} className="relative z-10 px-3 pb-2">
                    <div className="mb-5">
                      {/* Name: Word-by-word animation */}
                      <h3 className="text-white font-bold text-2xl tracking-tight leading-tight flex flex-wrap gap-1.5 transition-colors duration-300">
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
                      
                      {/* Role: Word-by-word animation */}
                      <div className="mt-2.5 flex flex-wrap gap-1.5 ">
                        <div className="relative px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden group/pill flex flex-wrap gap-1 hover:border-cyan-500/40 transition-colors duration-300">
                          {"Full Stack Web Developer".split(" ").map((word, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 1.2 + (i * 0.08), duration: 0.4 }}
                              className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400"
                            >
                              {word}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Availability badge */}
                    <div className="relative p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 group-hover/inner:border-cyan-500/40 transition-all duration-500 shadow-inner overflow-hidden group/badge">
                      <div className="relative z-10 flex items-center gap-4">
                        <div className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_10px_rgba(110,231,249,0.8)]" />
                        </div>
                        <span className="text-cyan-400 text-xs font-semibold tracking-wide uppercase group-hover/badge:text-white transition-colors duration-300">Available for Internship</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 translate-x-[-100%] group-hover/badge:translate-x-[100%] transition-transform duration-1000" />
                    </div>
                  </div>
                </div>

            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none z-20 transition-colors duration-500" />

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-20 pointer-events-none">
        <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-400 to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-cyan-400 font-bold">Scroll to Explore</span>
      </div>

      <ResumeHub isOpen={showResumeOptions} onClose={() => setShowResumeOptions(false)} />
    </section>
  );
};

export default Hero;
