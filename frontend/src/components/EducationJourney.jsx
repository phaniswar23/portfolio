import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { BookOpen, School, GraduationCap, MapPin } from 'lucide-react';

// --- Sub-Components ---

// Clean Progress Ring
const ProgressRing = ({ value, max, label, delay = 0, isPremium = false }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const percentage = (parseFloat(value) / max) * 100;
  const radius = isPremium ? 24 : 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffsetValue = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    const timeout = setTimeout(() => {
      let startTime = null;
      const end = parseFloat(value);
      const duration = 1500;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = easeOutQuart * end;
        
        setDisplayValue(current.toFixed(isPremium ? 2 : 1));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }, delay * 1000 + 400);

    return () => clearTimeout(timeout);
  }, [value, delay, isPremium]);

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col gap-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-500/80">{label}</span>
        <div className="flex gap-1.5 mt-1">
          {[...Array(5)].map((_, i) => (
            <motion.div 
              key={i}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: delay + (i * 0.1), ease: "easeOut" }}
              className={`w-[4px] h-[10px] rounded-[1px] ${i/5 * 100 < percentage ? 'bg-cyan-400' : 'bg-white/10'}`}
            />
          ))}
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <motion.svg 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className={`transform -rotate-90 ${isPremium ? 'w-16 h-16' : 'w-12 h-12'}`}
        >
          <circle cx="50%" cy="50%" r={radius} stroke="rgba(255,255,255,0.05)" strokeWidth="3" fill="transparent" />
          <motion.circle
            cx="50%" cy="50%" r={radius}
            stroke="#22d3ee"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: strokeDashoffsetValue }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.5, delay: delay, ease: "easeOut" }} 
            strokeLinecap="round"
          />
        </motion.svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-bold text-white ${isPremium ? 'text-lg' : 'text-sm'}`}>
            {displayValue}
          </span>
        </div>
      </div>
    </div>
  );
};

// Subtle Floating Particles
export const ParticleBackground = ({ color = "cyan-400/20", shadow = "shadow-[0_0_8px_#22d3ee]", bounds = "inset-0" }) => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 10
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className={`absolute ${bounds} overflow-hidden pointer-events-none`}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full bg-cyan-400/20 ${shadow}`}
          style={{ width: p.size, height: p.size, left: p.left, top: p.top }}
          animate={{ y: [0, -150], opacity: [0, 0.4, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
};

// Grid Background
export const GridBackground = ({ opacity = 0.02, maskEdges = true }) => {
  const maskStyle = maskEdges 
    ? {
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
        maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
      }
    : {
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 5%, black 100%)',
        maskImage: 'linear-gradient(to bottom, transparent, black 5%, black 100%)'
      };

  return (
    <div className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
      style={{ 
        opacity: opacity,
        backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', 
        backgroundSize: '40px 40px',
        ...maskStyle
      }}
    />
  );
};

// Card Box
const CardBox = ({ item, isUni, delay, index }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width) - 0.5);
    y.set(((e.clientY - rect.top) / rect.height) - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="animate-true-float w-full" style={{ animationDelay: `${index * 1.5}s` }}>
      <motion.div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: isUni ? 1.08 : 1.03 }}
        animate={{ scale: isUni ? 1.06 : 0.95 }}
        className={`relative w-full p-5 md:p-6 flex flex-col transition-shadow duration-300 ease-out overflow-hidden rounded-2xl border backdrop-blur-md group
          ${isUni ? 'bg-[#0a0f16]/95 border-cyan-400/40 opacity-100 hero-pulse-glow z-40' : 'bg-[#0a0f16]/90 border-white/5 opacity-80'}`}
      >
        <div className="glass-reflection-sweep" />
        {isUni && <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none" />}
        <div className="relative z-10 flex flex-col h-full"> 
          <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: delay + 0.1, ease: "easeOut" }} className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 relative group/header cursor-default">
              <div className={`p-2 rounded-lg transition-all duration-300 transform group-hover/header:rotate-6 group-hover/header:scale-110 ${isUni ? 'bg-cyan-500/10 text-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.2)]' : 'bg-white/[0.03] text-white/50 group-hover/header:text-cyan-400'}`}>
                {React.cloneElement(item.icon, { size: 18, strokeWidth: isUni ? 2 : 1.5 })}
              </div>
              <div className="relative flex flex-col items-center">
                <span className={`text-[8.5px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border transition-all duration-300 ${isUni ? 'bg-cyan-900/40 text-cyan-300 border-cyan-400/40 shadow-[0_0_10px_rgba(34,211,238,0.2)]' : 'bg-transparent text-white/40 border-white/10 group-hover/header:border-cyan-500/30'}`}>
                  {item.type}
                </span>
                <div className="absolute -bottom-[6px] h-[1.5px] bg-cyan-400 rounded-full w-0 group-hover/header:w-[80%] transition-all duration-300 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
              </div>
            </div>
            <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-white/30 text-right mt-1.5">{item.period}</span>
          </motion.div>

          <div className="space-y-4 flex-1">
            <h3 className={`text-xl font-bold tracking-tight transition-colors duration-300 ${isUni ? 'text-white md:text-2xl' : 'text-white/90'}`}>{item.institution}</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-white/50">
                <MapPin size={14} className={isUni ? 'text-cyan-400' : 'text-white/40 group-hover:text-cyan-400/70'} />
                <span className="text-[11px] uppercase tracking-wider">{item.location}</span>
              </div>
              <div className={`border-l-2 pl-4 py-0.5 transition-colors duration-300 ${isUni ? 'border-cyan-400/80 text-white/90' : 'border-white/10 text-white/60 group-hover:border-cyan-500/40 group-hover:text-white/80'}`}>
                <p className="text-sm font-medium">{item.degree}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5">
            <ProgressRing value={item.details} max={item.max} label={item.label} delay={delay + 0.2} isPremium={isUni} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Data ---
const EDUCATION_DATA = [
  { institution: "Narayana (E.M) High School", location: "Gudivada, Andhra Pradesh", degree: "Matriculation", details: "94", label: "Percentage", max: 100, period: "April 2020 – March 2021", type: "School", icon: <BookOpen /> },
  { institution: "Narayana Jr College", location: "Gudivada, Andhra Pradesh", degree: "Intermediate", details: "93.1", label: "Percentage", max: 100, period: "May 2021 – March 2023", type: "College", icon: <School /> },
  { institution: "Lovely Professional University", location: "Phagwara, Punjab", degree: "B.Tech - Computer Science", details: "6.84", label: "CGPA", max: 10, period: "August 23 – Present", type: "University", icon: <GraduationCap /> }
];

// --- Main Component ---
const EducationJourney = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const bgParallaxX = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [-30, 30]);
  const bgParallaxY = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [-30, 30]);
  const cursorHighlightX = useTransform(mouseX, v => v - 400);
  const cursorHighlightY = useTransform(mouseY, v => v - 400);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section id="education" ref={containerRef} onMouseMove={handleMouseMove} className="pt-24 pb-12 md:pt-32 md:pb-16 px-4 relative w-full overflow-hidden bg-transparent">
      <motion.div style={{ x: bgParallaxX, y: bgParallaxY }} className="absolute inset-0 pointer-events-none z-0 bg-parallax-layer">
         <div className="absolute inset-0 bg-gradient-to-b from-[#02030A] via-[#03040B] to-[#02030A]" />
         <GridBackground opacity={0.02} maskEdges={false} />
         <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-cyan-800/10 blur-[120px] rounded-full mix-blend-screen" />
         <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[300px] bg-blue-900/10 blur-[150px] rounded-full mix-blend-screen" />
         <ParticleBackground />
         <motion.div className="absolute w-[800px] h-[800px] bg-cyan-500/[0.03] rounded-full blur-[100px] mix-blend-screen" style={{ x: cursorHighlightX, y: cursorHighlightY }} />
      </motion.div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        <header className="mb-24 text-center">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8 }} className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-cyan-400">Path of Progression</span>
            <div className="w-16 h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            Academic <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-blue-300 italic font-medium">Trajectory.</span>
          </motion.h2>
        </header>

        <div className="overflow-x-auto pb-20 -mx-4 px-4 no-scrollbar">
          <div className="flex w-max md:w-full justify-center gap-6 px-10 relative z-10 min-w-[1100px] pt-12">
             <motion.div initial={{ width: "0%" }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="absolute top-[48px] left-[2%] h-[1.5px] bg-cyan-900/50 z-0 origin-left" style={{ maskImage: 'linear-gradient(to right, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, black 80%, transparent 100%)' }}>
                <div className="timeline-particle" />
             </motion.div>
             <div className="absolute bottom-[30px] left-[5%] right-[5%] h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent z-0" />

             {EDUCATION_DATA.map((item, index) => {
                  const isUni = item.type === 'University';
                  const delay = 0.4 + index * 0.2;
                  return (
                    <div key={index} className={`relative flex flex-col items-center shrink-0 ${isUni ? 'w-[360px] md:w-[380px]' : 'w-[320px]'}`}>
                        <motion.div initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: delay - 0.1 }} className={`absolute top-0 -translate-y-1/2 rounded-full z-10 timeline-dot ${isUni ? 'w-[12px] h-[12px] bg-cyan-300' : 'w-[10px] h-[10px] bg-cyan-500/80'}`} />
                        <motion.div initial={{ height: 0, opacity: 0 }} whileInView={{ height: 40, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: delay }} className={`absolute top-[6px] w-[1.5px] z-0 ${isUni ? 'bg-cyan-400' : 'bg-cyan-500/40'}`} />
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: delay + 0.1 }} className="w-full mt-[46px] relative z-20">
                           <CardBox item={item} isUni={isUni} delay={delay + 0.1} index={index} />
                        </motion.div>
                    </div>
                  )
             })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationJourney;
