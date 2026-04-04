import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Zap, Layers, Globe, Terminal, Cpu, Database, Layout, Play, Fullscreen } from 'lucide-react';

const ProjectBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { damping: 50, stiffness: 200 });
  const parallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), { damping: 50, stiffness: 200 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
      <motion.div 
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute inset-[-10%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"
      />
      <style>{`
        .noise-texture {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='none'/%3E%3C/svg%3E");
          opacity: 0.01;
          pointer-events: none;
        }
        .text-reveal-mask {
          mask-image: linear-gradient(to right, black, black 50%, transparent);
          mask-size: 200% 100%;
          mask-position: 100% 0;
          transition: mask-position 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .group:hover .text-reveal-mask {
          mask-position: 0 0;
        }
      `}</style>
    </div>
  );
};

const projects = [
  {
    title: 'CodeConnect',
    subtitle: 'Developer Social Network',
    description: 'A MERN-based platform for connecting developers and sharing ideas in real time.',
    image: '/codeconnect_preview.png',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1728-large.mp4',
    tags: ['MERN', 'Socket.io', 'Tailwind'],
    github: 'https://github.com/Balaji-Sri-Ram/CodeConnect',
    live: 'https://code-connect-sand-eta.vercel.app/',
    accent: '#D4A373', // Gold
    icon: Globe,
    isFeatured: true
  },
  {
    title: 'AgriTrek',
    subtitle: 'Agri-Data Hub',
    description: 'A web platform for agricultural data tracking and management using PHP and Tailwind CSS.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-drone-view-of-a-field-of-crops-15965-large.mp4',
    tags: ['PHP', 'Tailwind CSS', 'MySQL'],
    github: 'https://github.com/phaniswar23/AGRITREK-PROJECT',
    accent: '#A1A1AA', // Silver/Neutral
    icon: Database
  },
  {
    title: 'Word Imposter Game',
    subtitle: 'Multiplayer Strategy',
    description: 'A real-time multiplayer word game built using MERN stack with interactive gameplay.',
    image: '/wordimposter_preview.png',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-set-of-dice-rolling-on-a-table-34440-large.mp4',
    tags: ['MERN', 'Socket.io', 'Express'],
    github: 'https://github.com/phaniswar23/nodeproj',
    live: 'https://wordimpostergame.vercel.app/',
    accent: '#D4A373', // Gold
    icon: Zap
  }
];

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isSectionInView, setIsSectionInView] = useState(false);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { damping: 40, stiffness: 120 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { damping: 40, stiffness: 120 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsSectionInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current && isSectionInView) {
      if (isHovered) {
        videoRef.current.play().catch(err => console.log("Video play interrupted"));
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, isSectionInView]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); mouseX.set(0.5); mouseY.set(0.5); }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      style={{ rotateX, rotateY, perspective: 1500, transformStyle: 'preserve-3d' }}
      className="group relative w-full h-[540px] will-change-transform"
    >
      {/* ── Ambient Glow ── */}
      <div className={`absolute -inset-10 bg-[radial-gradient(circle_at_center,rgba(212,163,115,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-20`} />
      
      {/* ── Gradient Border ── */}
      <div className={`absolute -inset-[1px] rounded-[2.5rem] opacity-0 group-hover:opacity-40 blur-[1px] transition-all duration-700 -z-10 bg-gradient-to-tr from-white/20 via-white/10 to-transparent`} />

      <div className="h-full rounded-[2.5rem] overflow-hidden flex flex-col glass shadow-2xl transition-all duration-500 relative">
        <div className="absolute inset-0 noise-texture" />
        
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent z-40 pointer-events-none" />
        
        {/* ── Cursor Follow Light ── */}
        <motion.div 
          className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(400px circle at ${x * 100}% ${y * 100}%, rgba(255, 255, 255, 0.03), transparent 40%)`
            )
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

        {/* ── Visual Engine ── */}
        <div className="w-full h-64 relative overflow-hidden bg-[#121214]/50">
           <div 
             className="absolute inset-x-0 bottom-0 h-1/2 opacity-30 z-10 pointer-events-none transition-gpu"
             style={{ background: `radial-gradient(circle at bottom, ${project.accent}22, transparent 70%)` }}
           />
           <div className={`absolute inset-0 z-0 opacity-20 pointer-events-none transition-opacity duration-700 ${isHovered ? 'opacity-40' : 'opacity-20'}`} style={{ backgroundColor: project.accent }} />

           <motion.div 
             animate={{ 
               scale: isHovered ? 1.08 : 1, 
               filter: isHovered ? 'blur(2px) brightness(1.1) contrast(1.2) saturate(1.4)' : 'blur(0px) brightness(0.95) contrast(1.1) saturate(1.2)' 
             }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="absolute inset-0"
           >
             <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-gpu" />
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0B0C]/20 to-[#0B0B0C]/90 z-20 pointer-events-none" />
             <div className="absolute inset-0 noise-texture opacity-[0.15] z-30 pointer-events-none" />
             <div className={`absolute inset-0 z-40 transition-opacity duration-1000 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,black_30%,transparent_70%)] pointer-events-none">
                   <img src={project.image} alt={project.title} className="w-full h-full object-cover scale-[1.08]" />
                </div>
             </div>
           </motion.div>
           
           <AnimatePresence>
             {project.video && isSectionInView && (
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: isHovered ? 1 : 0 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.5 }}
                 className="absolute inset-0 z-20 pointer-events-none"
               >
                 <video 
                   ref={videoRef}
                   src={project.video}
                   muted
                   loop
                   playsInline
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-transparent" />
               </motion.div>
             )}
           </AnimatePresence>

           <div className="absolute top-6 left-6 z-40">
              <div 
                className="px-3 py-1 rounded-full backdrop-blur-md border border-white/10 text-[9px] font-black uppercase tracking-[0.2em]"
                style={{ backgroundColor: `${project.accent}22`, color: project.accent, textShadow: `0 0 10px ${project.accent}44` }}
              >
                {project.subtitle}
              </div>
           </div>
           
           <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B0B0C] to-transparent z-40 pointer-events-none opacity-80" />
        </div>

        {/* ── Content Matrix ── */}
        <div className="flex-1 p-8 flex flex-col relative z-30">
           <div style={{ transform: 'translateZ(40px)' }} className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                 <h3 className="text-2xl font-black text-white tracking-[0.02em] group-hover:text-[#D4A373] transition-colors duration-500">
                   {project.title}
                 </h3>
              </div>

              <p className="text-[#E6E6E8] text-xs leading-relaxed mb-8 font-light line-clamp-2 text-reveal-mask">
                 {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 rounded-full text-[9px] font-bold text-[#A1A1AA] border border-white/[0.05] bg-white/[0.01] uppercase tracking-widest hover:border-[#D4A373]/30 hover:text-[#D4A373] transition-all duration-300">
                      {tag}
                    </span>
                  ))}
              </div>

              <div className="mt-auto flex items-center gap-4">
                 {project.live && (
                   <motion.a 
                     href={project.live}
                     target="_blank"
                     whileHover={{ scale: 1.05, y: -2 }}
                     whileTap={{ scale: 0.95 }}
                     className="relative overflow-hidden group/btn bg-[#D4A373] text-[#0B0B0C] text-[10px] font-black px-6 py-4 rounded-xl flex items-center justify-center gap-2 flex-1 shadow-[0_10px_20px_-10px_rgba(212,163,115,0.4)] transition-all"
                   >
                     <span className="relative z-10 flex items-center gap-2">
                       LIVE PREVIEW <ExternalLink size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                     </span>
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] transition-transform" />
                   </motion.a>
                 )}

                 <motion.a 
                   href={project.github}
                   target="_blank"
                   whileHover={{ scale: 1.05, y: -2 }}
                   whileTap={{ scale: 0.95 }}
                   className={`text-[10px] font-black px-6 py-4 rounded-xl flex items-center justify-center gap-2 flex-1 transition-all border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 hover:shadow-[0_10px_20px_-10px_rgba(255,255,255,0.1)]`}
                 >
                   SOURCE CODE <Github size={14} className="group-hover:rotate-12 transition-transform" />
                 </motion.a>
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section className="pt-12 pb-32 px-4 sm:px-8 md:px-12 relative w-full overflow-hidden bg-[#0B0B0C] text-foreground cursor-default transition-colors duration-500">
      <ProjectBackground />
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        <header className="mb-20 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-6xl sm:text-8xl md:text-[10rem] font-black tracking-tighter text-white leading-[0.8] mb-8">
                 Projects<span className="text-white/10">.</span>
              </h2>

              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#D4A373] to-transparent mx-auto opacity-50" />
            </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
