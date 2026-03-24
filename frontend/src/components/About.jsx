import { useInView } from 'framer-motion';
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  User, 
  Code2, 
  Layers, 
  Cpu, 
  Palette, 
  GraduationCap, 
  Calendar,
  Sparkles,
  Zap,
  Terminal
} from 'lucide-react';


const AnimatedNumber = ({ value, duration = 2000 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const startedRef = useRef(false);

  useEffect(() => {
    if (!isInView || startedRef.current) return;
    startedRef.current = true;

    const startTime = performance.now();
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * value);
      if (ref.current) ref.current.textContent = current;
      if (progress < 1) requestAnimationFrame(tick);
      else if (ref.current) ref.current.textContent = value;
    };
    requestAnimationFrame(tick);
  }, [isInView, value, duration]);

  return <span ref={ref}>0</span>;
};

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax for background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 80]);


  return (
    <section id="about" ref={containerRef} className="pt-12 pb-10 px-8 sm:px-12 md:px-24 relative max-w-[1600px] mx-auto overflow-hidden bg-background text-foreground transition-colors duration-500">
      {/* Dynamic Background Elements */}
      <motion.div style={{ y: y1 }} className="absolute top-0 right-10 w-96 h-96 bg-[#6EE7F9]/5 blur-[120px] rounded-full -z-10 opacity-0 dark:opacity-100 transition-opacity duration-500" />
      <motion.div style={{ y: y2 }} className="absolute bottom-40 left-10 w-[500px] h-[500px] bg-[#A78BFA]/5 blur-[140px] rounded-full -z-10 opacity-0 dark:opacity-100 transition-opacity duration-500" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-16 flex flex-col items-center justify-center text-center mt-0"
      >
        <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-foreground leading-[0.85] mb-6 transition-colors duration-300">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6EE7F9] via-[#A78BFA] to-white italic drop-shadow-[0_0_30px_rgba(110,231,249,0.2)]">ME.</span>
        </h2>
        <div className="w-40 h-[1.5px] bg-gradient-to-r from-transparent via-[#6EE7F9]/30 to-transparent mx-auto" />
      </motion.div>

      <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          
          {/* LEFT COLUMN: Narrative Intro */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-3xl md:text-5xl font-black text-foreground leading-tight transition-colors duration-300">
              Building Real-World <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6EE7F9] to-[#A78BFA] italic">
                Solutions.
              </span>
              </h3>
              
              <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 leading-relaxed font-medium max-w-lg transition-colors duration-300">
                I'm <span className="text-foreground font-bold">Phaniswar</span>, a <span className="text-[#6EE7F9] font-semibold">3rd year B.Tech CSE</span> student at <span className="text-foreground font-semibold">LPU</span> and a <span className="text-[#A78BFA] font-semibold">MERN stack developer</span> focused on building scalable web applications.
              </p>
            </div>

          </motion.div>

          {/* RIGHT COLUMN: Interactive Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
             <div className="absolute -inset-4 bg-[#6EE7F9]/5 blur-[100px] rounded-full -z-10 animate-pulse-slow opacity-0 dark:opacity-100 transition-opacity duration-500" />
             
             {[
               { 
                 icon: Layers, 
                 title: "MERN Stack", 
                 desc: "Expertise in full-stack JavaScript development.",
                 delay: 0.3
               },
               { 
                 icon: Palette, 
                 title: "Clean UI/UX", 
                 desc: "Focus on creating minimal, intuitive interfaces.",
                 delay: 0.4
               },
               { 
                 icon: Code2, 
                 title: "Problem Solving", 
                 desc: "Strong grasp of DSA and logical structuring.",
                 delay: 0.5
               },
               { 
                 icon: Cpu, 
                 title: "Scalability", 
                 desc: "Building foundations for future-proof growth.",
                 delay: 0.6
               }
             ].map((card, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 whileHover={{ y: -6, scale: 1.02 }}
                 className="p-6 rounded-[2.5rem] bg-card border border-border dark:backdrop-blur-md group hover:border-#6EE7F9/20 transition-all duration-500 relative overflow-hidden shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-premium)] dark:shadow-none dark:hover:shadow-none"
               >
                 <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#6EE7F9]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 <div className="w-12 h-12 rounded-2xl bg-[#6EE7F9]/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#6EE7F9]/20 transition-all duration-500">
                   <card.icon className="w-6 h-6 text-[#6EE7F9]" />
                 </div>
                 <h4 className="text-lg font-bold text-foreground mb-2 transition-colors duration-300">{card.title}</h4>
                 <p className="text-xs text-foreground/60 leading-relaxed font-medium transition-colors duration-300">{card.desc}</p>
               </motion.div>
             ))}
          </div>
        </div>

        {/* Bottom Stat Bar */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 p-10 rounded-[3rem] bg-card border border-border dark:backdrop-blur-md relative overflow-hidden group shadow-[var(--shadow-premium)] dark:shadow-2xl transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-[#6EE7F9]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#6EE7F9]/[0.03] blur-[100px] -z-10 group-hover:bg-[#6EE7F9]/[0.05] transition-colors" />
           {[
             { label: "Projects Built", value: 2 },
             { label: "Certifications", value: 3 },
             { label: "Solved Problems", value: 100 }
           ].map((stat, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.7 + (i * 0.1) }}
               className="text-center relative z-10"
             >
               <div className="text-4xl md:text-5xl font-black text-foreground mb-2 tracking-tighter transition-colors duration-300">
                 <AnimatedNumber value={stat.value} duration={2000} />+
               </div>
               <div className="text-[10px] font-bold text-slate-500 dark:text-gray-500 uppercase tracking-[0.3em] transition-colors duration-300">{stat.label}</div>
               {i < 2 && <div className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 w-px h-12 bg-border" />}
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};


export default About;
