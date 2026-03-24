import React, { useState, useRef, useEffect, useMemo } from 'react';
/* eslint-disable no-unused-vars */
import { motion, useMotionValue, useTransform, animate, useSpring } from 'framer-motion';
/* eslint-enable no-unused-vars */
import { Activity, ExternalLink, ShieldCheck, Trophy } from 'lucide-react';
import gfgLogo from '../assets/gfg.jpg';
import hrLogo from '../assets/hr.png';
import lcLogo from '../assets/lc.png';


// Official-style SVG Logos for Premium Branding
const PlatformLogos = {
  LeetCode: () => (
    <img src={lcLogo} alt="LeetCode" className="w-9 h-9 object-contain" />
  ),
  Codeforces: () => (
    <svg viewBox="0 0 24 24" className="w-9 h-9">
       <rect x="3" y="11" width="4" height="9" fill="#BFC9D3" />
       <rect x="10" y="4" width="4" height="16" fill="#3B82F6" />
       <rect x="17" y="8" width="4" height="12" fill="#EF4444" />
    </svg>
  ),
  HackerRank: () => (
    <img src={hrLogo} alt="HackerRank" className="w-9 h-9 object-contain" />
  ),
  GeeksforGeeks: () => (
     <img src={gfgLogo} alt="GeeksforGeeks" className="w-10 h-10 object-contain rounded-full" />
  )
};


const platforms = [
  {
    id: 'lc',
    name: 'LeetCode',
    username: '@phaniswar1207',
    statsValue: 100,
    statsSuffix: 'Solved',
    logo: <PlatformLogos.LeetCode />,
    url: 'https://leetcode.com/u/phaniswar1207/',
    color: '#FFA116',
    glow: 'rgba(255, 161, 22, 0.5)',
    theme: 'lc-hero',
    data: { easy: 45, medium: 51, hard: 4, total: 100, trend: [20, 35, 25, 45, 40, 60, 55, 75, 70, 90, 85, 100] }
  },
  {
    id: 'cf',
    name: 'Codeforces',
    username: 'phaniswar99',
    statsValue: 1540,
    statsSuffix: 'Rating',
    logo: <PlatformLogos.Codeforces />,
    url: 'https://codeforces.com/profile/phaniswar99',
    color: '#3B82F6',
    glow: 'rgba(59, 130, 246, 0.5)',
    theme: 'cf-analytics',
    data: { solved: 6, streak: 2, ratingPct: 77, trend: [1200, 1250, 1320, 1300, 1380, 1450, 1420, 1500, 1480, 1540] }
  },
  {
    id: 'hr',
    name: 'HackerRank',
    username: '@phaniswarjanyav1',
    statsValue: 5,
    statsSuffix: 'Stars',
    logo: <PlatformLogos.HackerRank />,
    url: 'https://www.hackerrank.com/profile/phaniswarjanyav1',
    color: '#00EA64',
    glow: 'rgba(0, 234, 100, 0.5)',
    theme: 'hr-skills',
    data: { 
      skills: [
        { name: 'C++', stars: 4, type: 'Silver', color: 'text-cyan-300' },
        { name: 'Java', stars: 4, type: 'Silver', color: 'text-cyan-300' },
        { name: 'SQL', stars: 1, type: 'Bronze', color: 'text-purple-300' }
      ],
      trend: [1, 2, 2, 3, 3, 4, 4, 5, 5, 5]
    }
  },
  {
    id: 'gfg',
    name: 'GeeksforGeeks',
    username: 'phaniswar123',
    statsValue: 132, 
    statsSuffix: 'Score',
    logo: <PlatformLogos.GeeksforGeeks />,
    url: 'https://www.geeksforgeeks.org/profile/phaniswar123',
    color: '#2F8D46',
    glow: 'rgba(47, 141, 70, 0.5)',
    theme: 'gfg-dashboard',
    data: { score: 132, solved: 55, rank: 8360, trend: [30, 50, 45, 75, 65, 90, 85, 110, 132] }
  }
];

const ScrollCounter = ({ value, duration = 2 }) => {
  const nodeRef = useRef(null);
  const isInView = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !isInView.current) {
        isInView.current = true;
        animate(0, value, { duration, ease: [0.16, 1, 0.3, 1], onUpdate(v) { if (nodeRef.current) nodeRef.current.textContent = Math.round(v); } });
      }
    }, { threshold: 0.1 });
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [value, duration]);
  return <span ref={nodeRef}>0</span>;
};

const SignatureSparkline = ({ data, color, isHovered, delay = 0 }) => {
  const points = useMemo(() => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    return data.map((d, i) => ({
      x: (i / (data.length - 1)) * 100,
      y: 40 - ((d - min) / (range || 1)) * 40
    }));
  }, [data]);

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const colorId = color.replace('#', '');

  return (
    <div className="w-full h-12 mt-6 relative group/spark overflow-visible">
      <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible preserve-3d">
        <defs>
          <linearGradient id={`grad-${colorId}`} x1="0" y1="0" x2="1" y2="0">
             <stop offset="0%" stopColor={color} stopOpacity="0.4" />
             <stop offset="50%" stopColor={color} stopOpacity="1" />
             <stop offset="100%" stopColor={color} stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id={`fill-${colorId}`} x1="0" y1="0" x2="0" y2="1">
             <stop offset="0%" stopColor={color} stopOpacity="0.15" />
             <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path 
           d={path} fill="none" stroke={`url(#grad-${colorId})`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
           initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 2, ease: "easeInOut", delay: delay + 0.3 }}
           animate={isHovered ? { y: -3, strokeWidth: 3 } : { y: 0, strokeWidth: 2.5 }}
           style={{ filter: `drop-shadow(0 0 8px ${color}60)` }}
        />
        {/* Moving Dot Animation */}
        <motion.circle
          r="3" fill={color}
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{ offsetPath: `path("${path}")` }}
        />
        <motion.path
          d={`${path} L 100 40 L 0 40 Z`} fill={`url(#fill-${colorId})`}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.5, delay: delay + 0.8 }}
          animate={isHovered ? { y: -3 } : { y: 0 }}
        />

      </svg>
    </div>
  );
};

const MultiRadialRing = ({ easy, medium, hard, total, isHovered }) => {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const gap = 2; // Degrees gap
  
  const easyP = (easy / 200) * 100; // Normalized for visual sweep
  const mediumP = (medium / 200) * 100;
  const hardP = (hard / 200) * 100;

  return (
    <div className="relative w-44 h-44 flex items-center justify-center">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-white/[0.05] pointer-events-none"
      />
      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
         <defs>
            <filter id="glow">
               <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
               <feMerge>
                  <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
               </feMerge>
            </filter>
         </defs>
         <circle cx="50" cy="50" r={r} stroke="currentColor" strokeWidth="10" fill="transparent" className="text-white/[0.04]" />
         <motion.circle
           cx="50" cy="50" r={r} stroke="#10B981" strokeWidth="10" fill="transparent" strokeDasharray={circ}
           initial={{ strokeDashoffset: circ }} whileInView={{ strokeDashoffset: circ - (easyP / 100) * circ }}
           transition={{ duration: 2, ease: "circOut" }} strokeLinecap="round"
           filter="url(#glow)"
         />
         {/* Glow Trail Tip */}
         <motion.circle
           cx="50" cy="50" r={r} stroke="#10B981" strokeWidth="12" fill="transparent" strokeDasharray="0.1 1000"
           initial={{ strokeDashoffset: circ }} whileInView={{ strokeDashoffset: circ - (easyP / 100) * circ }}
           transition={{ duration: 2, ease: "circOut" }} strokeLinecap="round"
           filter="blur(4px)"
         />
         <motion.circle
           cx="50" cy="50" r={r} stroke="#3B82F6" strokeWidth="10" fill="transparent" strokeDasharray={circ}
           initial={{ strokeDashoffset: circ }} whileInView={{ strokeDashoffset: circ - (mediumP / 100) * circ }}
           transition={{ duration: 2, delay: 0.3, ease: "circOut" }} strokeLinecap="round"
           style={{ rotate: (easyP / 100) * 360 + gap, transformOrigin: '50% 50%' }}
           filter="url(#glow)"
         />
         <motion.circle
           cx="50" cy="50" r={r} stroke="#3B82F6" strokeWidth="12" fill="transparent" strokeDasharray="0.1 1000"
           initial={{ strokeDashoffset: circ }} whileInView={{ strokeDashoffset: circ - (mediumP / 100) * circ }}
           transition={{ duration: 2, delay: 0.3, ease: "circOut" }} strokeLinecap="round"
           style={{ rotate: (easyP / 100) * 360 + gap, transformOrigin: '50% 50%' }}
           filter="blur(4px)"
         />
         <motion.circle
           cx="50" cy="50" r={r} stroke="#F97316" strokeWidth="10" fill="transparent" strokeDasharray={circ}
           initial={{ strokeDashoffset: circ }} whileInView={{ strokeDashoffset: circ - (hardP / 100) * circ }}
           transition={{ duration: 2, delay: 0.6, ease: "circOut" }} strokeLinecap="round"
           style={{ rotate: ((easyP + mediumP) / 100) * 360 + gap * 2, transformOrigin: '50% 50%' }}
           filter="url(#glow)"
         />
         <motion.circle
           cx="50" cy="50" r={r} stroke="#F97316" strokeWidth="12" fill="transparent" strokeDasharray="0.1 1000"
           initial={{ strokeDashoffset: circ }} whileInView={{ strokeDashoffset: circ - (hardP / 100) * circ }}
           transition={{ duration: 2, delay: 0.6, ease: "circOut" }} strokeLinecap="round"
           style={{ rotate: ((easyP + mediumP) / 100) * 360 + gap * 2, transformOrigin: '50% 50%' }}
           filter="blur(4px)"
         />
      </svg>


      <div className="absolute flex flex-col items-center">
         <motion.span animate={isHovered ? { scale: 1.05 } : { scale: 1 }} className="text-4xl font-bold text-white leading-none">
           <ScrollCounter value={total} />
         </motion.span>
         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mt-1">Solved</span>
      </div>
    </div>
  );
};

const LeetCodeHero = ({ data, isHovered }) => (
  <div className="w-full flex flex-col items-center py-4">
    <MultiRadialRing {...data} isHovered={isHovered} />
    <div className="flex gap-8 mt-8">
       {[
         { label: 'EASY', val: data.easy, color: 'bg-emerald-500' },
         { label: 'MEDIUM', val: data.medium, color: 'bg-blue-500' },
         { label: 'HARD', val: data.hard, color: 'bg-orange-500' }
       ].map(s => (
         <div key={s.label} className="flex flex-col items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${s.color} shadow-lg`} />
            <span className="text-xs font-bold text-white/80">{s.val}</span>
            <span className="text-[9px] font-black text-white/20 tracking-widest">{s.label}</span>
         </div>
       ))}
    </div>
  </div>
);

const CodeforcesAnalytics = ({ data, isHovered }) => (
  <div className="w-full flex flex-col gap-6 py-4">
    <div className="flex items-center justify-between px-2">
       <div className="flex flex-col">
          <span className="text-2xl font-bold text-blue-400">{data.ratingPct}%</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Top Percentile</span>
       </div>
       <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/[0.03] border border-white/5">
          <Activity className="w-6 h-6 text-blue-400" />
       </div>
    </div>
    <SignatureSparkline data={data.trend} color="#3B82F6" isHovered={isHovered} />
  </div>
);

const HackerRankSkills = ({ data }) => (
  <div className="w-full flex flex-col gap-5 py-4 px-2">
     {data.skills.map((s, i) => (
       <div key={s.name} className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-[9px] font-black tracking-widest text-white/40 uppercase">
             <span>{s.name} Proficiency</span>
             <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className={`text-[10px] ${j < s.stars ? s.color : 'text-white/5'}`}>★</span>
                ))}
             </div>
          </div>
          <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden relative">
             <motion.div 
               initial={{ width: 0 }} whileInView={{ width: `${(s.stars / 5) * 100}%` }} transition={{ duration: 2, delay: 0.1 * i, ease: "circOut" }}
               className="h-full bg-emerald-500 relative" style={{ backgroundColor: s.color === 'text-cyan-300' ? '#22d3ee' : '#a855f7' }}
             >
                <motion.div 
                  animate={{ x: ['-100%', '100%'] }} 
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full h-full"
                />
             </motion.div>
          </div>

       </div>
     ))}
  </div>
);

const GFGStats = ({ data, isHovered }) => (
  <div className="w-full flex flex-col gap-6 py-4 px-2">
     <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Platform Rank', val: data.rank },
          { label: 'Geek Score', val: data.score }
        ].map(s => (
          <div key={s.label} className="p-4 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col gap-1">
             <span className="text-[9px] font-black uppercase text-white/30 tracking-tight">{s.label}</span>
             <span className="text-xl font-bold text-white"><ScrollCounter value={s.val} /></span>
          </div>
        ))}
     </div>
     <SignatureSparkline data={data.trend} color="#2F8D46" isHovered={isHovered} />
  </div>
);

const PremiumModule = ({ platform, isHovered }) => {
  switch(platform.theme) {
    case 'lc-hero': return <LeetCodeHero data={platform.data} isHovered={isHovered} />;
    case 'cf-analytics': return <CodeforcesAnalytics data={platform.data} isHovered={isHovered} />;
    case 'hr-skills': return <HackerRankSkills data={platform.data} />;
    case 'gfg-dashboard': return <GFGStats data={platform.data} isHovered={isHovered} />;
    default: return null;
  }
};

const SignatureCard = ({ platform, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], ["8deg", "-8deg"]);
  const rotateY = useTransform(x, [0, 1], ["-8deg", "8deg"]);




  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.12 }}
      className="w-full flex" style={{ perspective: 1200 }}
    >
      <motion.a
        href={platform.url} target="_blank" rel="noopener noreferrer" ref={cardRef}
        onMouseMove={(e) => {
          if (!cardRef.current) return;
          const r = cardRef.current.getBoundingClientRect();
          x.set((e.clientX - r.left) / r.width);
          y.set((e.clientY - r.top) / r.height);
        }}
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => { setIsHovered(false); x.set(0.5); y.set(0.5); }}

        whileHover={{ scale: 1.02, y: -8 }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative flex flex-col justify-between w-full min-h-[400px] md:min-h-[540px] p-8 md:p-12 rounded-[32px] md:rounded-[40px] bg-white/[0.03] backdrop-blur-[40px] border border-white/[0.08] overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500"
      >
        {/* Animated Gradient Border */}
        <motion.div 
          className="absolute inset-0 rounded-[40px] p-[1px] pointer-events-none"
          animate={{ background: isHovered ? [`conic-gradient(from 0deg at 50% 50%, ${platform.color}20, transparent, ${platform.color}20)`, `conic-gradient(from 360deg at 50% 50%, ${platform.color}20, transparent, ${platform.color}20)`] : `linear-gradient(to bottom, white/10, transparent)` }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full rounded-[40px] bg-transparent" />
        </motion.div>

        {/* Inner Glow & Reflection */}
        <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
        <motion.div 
          className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent skew-x-[-20deg] pointer-events-none"
          animate={isHovered ? { x: ['100%', '-100%'] } : { x: '100%' }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Ambient Back Glow */}
        <div 
          className="absolute -inset-20 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none blur-[100px]"
          style={{ background: `radial-gradient(circle at center, ${platform.color}, transparent 70%)` }}
        />

        {/* Continuous Shimmer */}
        <motion.div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          animate={{ backgroundPosition: ['0% 0%', '200% 200%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ background: 'linear-gradient(45deg, transparent 25%, white 50%, transparent 75%)', backgroundSize: '400% 400%' }}
        />

        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div 
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} 
        />
        
        {/* Dynamic Logo Container */}
        <div className="relative z-10 flex flex-col gap-6" style={{ transform: "translateZ(30px)" }}>
          <div className="flex justify-between items-start">
              <div className="relative w-16 h-16">
                  {/* Layered Logo Glow System (Halo Effect) - Optimized */}
                  <motion.div 
                    animate={isHovered ? { scale: [1, 1.05, 1], opacity: 0.8 } : { scale: 1, opacity: 0.4 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 pointer-events-none will-change-transform"
                    style={{ transform: "translate3d(0,0,0)" }}
                  >
                      {/* 1. Ambient Glow (Outer Halo) */}
                      <div 
                        className="absolute inset-[-80%] rounded-full blur-[20px] will-change-opacity"
                        style={{ background: `radial-gradient(circle, transparent 40%, ${platform.color} 60%, transparent 100%)`, opacity: 0.15 }}
                      />
                      {/* 2. Mid Glow (Brand Identity) */}
                      <div 
                        className="absolute inset-[-30%] rounded-full blur-[12px] will-change-opacity"
                        style={{ background: `radial-gradient(circle, transparent 45%, ${platform.color} 65%, transparent 100%)`, opacity: 0.3 }}
                      />
                      {/* 3. Inner Ring Highlight */}
                      <div 
                        className="absolute inset-[15%] rounded-full blur-[4px] will-change-opacity"
                        style={{ background: `radial-gradient(circle, transparent 50%, ${platform.color} 70%, transparent 100%)`, opacity: 0.5 }}
                      />
                  </motion.div>



                  <motion.div 
                    animate={isHovered ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full h-full rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center backdrop-blur-xl shadow-lg ring-1 ring-white/10 relative z-10"
                    style={{ transform: "translate3d(0,0,0)" }}
                  >

                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {platform.logo}
                    </motion.div>
                  </motion.div>
              </div>
              <ExternalLink className="w-5 h-5 text-white/20 group-hover:text-white/60 transition-colors" />
           </div>


           <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">{platform.name}</h3>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">{platform.username}</span>
           </div>
        </div>

        {/* Content Module */}
        <div className="relative z-10 flex-grow flex items-center justify-center py-4" style={{ transform: "translateZ(40px)" }}>
           <PremiumModule platform={platform} isHovered={isHovered} />
        </div>

        {/* Statistics Footer */}
        <div className="relative z-10 pt-8 border-t border-white/[0.06] flex items-end justify-between" style={{ transform: "translateZ(50px)" }}>
           <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 mb-1">Impact Metric</span>
              <div className="flex items-baseline gap-2">
                 <span className="text-5xl font-bold text-white tracking-tighter">
                   <ScrollCounter value={platform.statsValue} />
                 </span>
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 pb-2">{platform.statsSuffix}</span>
              </div>
           </div>
        </div>
      </motion.a>
    </motion.div>
  );
};

const CodingPlatforms = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <section 
      id="coding" ref={containerRef} onMouseMove={(e) => {
        const r = containerRef.current?.getBoundingClientRect();
        if (r) { mouseX.set(e.clientX - r.left); mouseY.set(e.clientY - r.top); }
      }}
      className="pt-12 pb-40 px-4 md:px-8 bg-[#020306] relative overflow-hidden flex flex-col items-center border-t border-white/[0.02]"
    >
      {/* Dynamic Cursor Spotlight */}
      <motion.div 
        className="absolute inset-0 z-[1] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ 
          background: useTransform(
            [mouseX, mouseY], 
            ([x, y]) => `radial-gradient(1000px circle at ${x}px ${y}px, rgba(255,255,255,0.015), transparent 80%)`
          )
        }}
      />

      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Animated Dotted Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          className="absolute inset-0"
          style={{ 
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, 
            backgroundSize: '40px 40px' 
          }}
        />

        {/* Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

        {/* Drifting Light Particles - Optimized with CSS for performance */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white/10 blur-[2px] particle-float"
              style={{
                width: i % 2 === 0 ? '4px' : '6px',
                height: i % 2 === 0 ? '4px' : '6px',
                left: `${(i + 1) * 15}%`,
                top: `${(i + 1) * 12}%`,
                opacity: 0.15,
                animationDelay: `${i * 2}s`,
                animationDuration: `${15 + i * 5}s`
              }}
            />
          ))}
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes particleFloat {
            0%, 100% { transform: translate3d(0, 0, 0); }
            33% { transform: translate3d(30px, -50px, 0); }
            66% { transform: translate3d(-20px, 40px, 0); }
          }
          .particle-float {
            animation: particleFloat linear infinite alternate;
            will-change: transform;
          }
        `}} />

        <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-emerald-600/10 blur-[120px] rounded-full" />
      </div>


      <div className="w-full max-w-[1500px] relative z-10 mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mb-24 md:mb-32 text-center max-w-4xl mx-auto px-6">
           <div className="inline-flex items-center gap-2 py-1.5 px-5 rounded-full bg-white/[0.04] border border-white/10 mb-8 backdrop-blur-3xl shadow-xl">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/50">Competitive Intelligence</span>
           </div>
           <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white tracking-tightest mb-8 leading-none">
             Coding Profiles
           </h2>
           <p className="text-white/30 max-w-3xl mx-auto text-xl font-bold font-mono tracking-tighter leading-relaxed italic border-l-2 border-emerald-500/20 pl-8 text-left">
             A high-fidelity visualization of algorithmic proficiency and technical problem-solving metrics.
           </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {platforms.map((p, i) => (
            <SignatureCard key={p.id} platform={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CodingPlatforms;
