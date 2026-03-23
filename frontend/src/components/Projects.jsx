import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Zap, Layers, Globe, Terminal, Cpu, Database, Layout, Play, Fullscreen } from 'lucide-react';


const projects = [
  {
    title: 'CodeConnect',
    subtitle: 'Developer Social Network',
    description: 'A MERN-based platform for connecting developers and sharing ideas in real time.',
    image: 'https://images.unsplash.com/photo-1522071823991-b99c5517a72c?q=80&w=800&auto=format&fit=crop',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1728-large.mp4',
    tags: ['MERN', 'Socket.io', 'Tailwind'],
    github: 'https://github.com/phaniswar23',
    live: 'https://codeconnect-v1.onrender.com/',
    accent: '#6EE7F9',
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
    github: 'https://github.com/phaniswar23',
    accent: '#ffffff',
    icon: Database
  },
  {
    title: 'Word Imposter Game',
    subtitle: 'Multiplayer Strategy',
    description: 'A real-time multiplayer word game built using MERN stack with interactive gameplay.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-set-of-dice-rolling-on-a-table-34440-large.mp4',
    tags: ['MERN', 'Socket.io', 'Express'],
    github: 'https://github.com/phaniswar23',
    accent: '#6EE7F9',
    icon: Zap
  }
];

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isSectionInView, setIsSectionInView] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { damping: 40, stiffness: 120 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { damping: 40, stiffness: 120 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    window.requestAnimationFrame(() => {
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    });
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
  
  // Also pause video if section goes out of view
  useEffect(() => {
    if (!isSectionInView && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isSectionInView]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); mouseX.set(0); mouseY.set(0); }}
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      style={{ rotateX, rotateY, perspective: 1000, transformStyle: 'preserve-3d' }}
      className="group relative w-full h-[520px] will-change-transform"
    >
      {/* ── Minimal Glow Border ── */}
      <div className={`absolute -inset-[1px] rounded-[2rem] opacity-0 group-hover:opacity-100 blur-[1px] transition-opacity duration-500 -z-10 bg-gradient-to-br from-[#6EE7F9]/20 via-transparent to-[#A78BFA]/20`} />

      <div className="h-full rounded-[2.5rem] overflow-hidden flex flex-col shadow-[var(--shadow-premium)] transition-all duration-500 relative border border-border bg-card dark:backdrop-blur-md dark:shadow-none">
        
        {/* ── Visual Engine (Image -> Video) ── */}
        <div className="w-full h-[48%] relative overflow-hidden bg-slate-100 dark:bg-black/40 h-44 md:h-52 font-bold mb-0">
           {/* Static Thumbnail */}
           <motion.div 
             animate={{ scale: isHovered ? 1.05 : 1, filter: isHovered ? 'blur(4px) brightness(0.6)' : 'blur(0px) brightness(0.95)' }}
             transition={{ duration: 0.8 }}
             className="absolute inset-0"
           >
             <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
           </motion.div>
           
           {/* Video Preview */}
           <AnimatePresence>
             {project.video && isSectionInView && (
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: isHovered ? 1 : 0 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.3 }}
                 className="absolute inset-0 z-20 pointer-events-none"
               >
                 <video 
                   ref={videoRef}
                   src={project.video}
                   muted
                   loop
                   playsInline
                   preload="auto"
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 dark:from-[#020617]/80 via-transparent to-transparent" />
               </motion.div>
             )}
           </AnimatePresence>

           {/* Centered Preview Label */}
           <div className={`absolute inset-0 z-30 flex items-center justify-center transition-all duration-500 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <div className="px-4 py-1.5 rounded-full bg-slate-900/80 dark:bg-white/10 dark:backdrop-blur-md border border-slate-700/50 dark:border-white/20 text-white text-[9px] font-black uppercase tracking-[0.2em] shadow-2xl">
                Preview Interaction
              </div>
           </div>

           {/* Featured Badge */}
             <div className="absolute top-4 left-4 z-40">
                <div className="px-2.5 py-0.5 rounded-full bg-[#6EE7F9]/10 border border-[#6EE7F9]/20 text-[#6EE7F9] text-[8px] font-black uppercase tracking-[0.15em] backdrop-blur-md">
                   Featured
                </div>
             </div>
        </div>

        {/* ── Content Matrix ── */}
        <div className="flex-1 p-8 flex flex-col relative z-30">
           <div style={{ transform: 'translateZ(20px)' }} className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-3">
                 <h3 className="text-xl font-black text-foreground tracking-tighter group-hover:text-[#6EE7F9] transition-colors duration-500">
                   {project.title}
                 </h3>
              </div>

              <p className="text-foreground/70 text-xs leading-relaxed mb-6 font-light line-clamp-2 transition-colors duration-300">
                 {project.description}
              </p>

              {/* Low-Contrast Tech Shards */}
              <div className="flex flex-wrap gap-2 mb-8">
                 {project.tags.map(tag => (
                   <span key={tag} className="px-2.5 py-1 rounded-md text-[8px] font-medium text-foreground/50 truncate border border-border bg-card uppercase tracking-widest transition-colors duration-300">
                     {tag}
                   </span>
                 ))}
              </div>

              {/* Minimal Actions */}
              <div className="mt-auto flex items-center gap-4">
                 {project.live && (
                   <motion.a 
                     href={project.live}
                     target="_blank"
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     className="bg-[#6EE7F9] hover:opacity-90 text-black text-[9px] font-bold px-4 py-3 rounded-xl flex items-center justify-center gap-2 flex-1 shadow-lg shadow-[#6EE7F9]/20 dark:shadow-none transition-all"
                   >
                     Live Preview <Globe size={12} />
                   </motion.a>
                 )}

                 <motion.a 
                   href={project.github}
                   target="_blank"
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   className={`text-[9px] font-bold px-4 py-3 rounded-xl flex items-center justify-center gap-2 flex-1 transition-all border
                     ${project.live ? 'bg-card text-foreground hover:bg-slate-50/50 dark:hover:bg-white/[0.02] border-border shadow-[var(--shadow-soft)] dark:shadow-none' : 'bg-[#6EE7F9] hover:opacity-90 text-black shadow-lg shadow-[#6EE7F9]/20 dark:shadow-none border-[#6EE7F9]'}`}
                 >
                   View Code <Github size={12} />
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
    <section id="projects" className="pt-10 pb-10 px-4 sm:px-8 md:px-12 relative w-full overflow-hidden bg-background text-foreground cursor-default transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <header className="mb-24 flex flex-col items-center text-center">
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter text-foreground dark:text-white/90 leading-[0.85] mb-6 transition-colors duration-300">
               Projects.
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#6EE7F9]/20 to-transparent mx-auto" />
        </header>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
