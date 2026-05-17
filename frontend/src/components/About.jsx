import React from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  Palette, 
  Code2, 
  Cpu,
  Sparkles,
  Zap,
  Shield,
  MousePointer2
} from 'lucide-react';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const pillars = [
    { 
      icon: Layers, 
      title: "MERN Stack", 
      desc: "Architecting robust full-stack systems with Node.js, Express, and React.",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    { 
      icon: Palette, 
      title: "Clean UI/UX", 
      desc: "Crafting pixel-perfect, minimalist interfaces that prioritize user experience.",
      color: "from-purple-500/20 to-pink-500/20"
    },
    { 
      icon: Code2, 
      title: "Clean Code", 
      desc: "Writing maintainable, scalable code following industry best practices.",
      color: "from-orange-500/20 to-amber-500/20"
    },
    { 
      icon: Cpu, 
      title: "Performance", 
      desc: "Optimizing every byte for speed, efficiency, and smooth interactions.",
      color: "from-emerald-500/20 to-teal-500/20"
    }
  ];

  return (
    <section id="about-content" className="relative pt-12 pb-32 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(200, 169, 126, 0.05) 0%, transparent 60%)' }} />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
          <motion.div variants={itemVariants} className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-12 bg-[#C8A97E]" />
              <span className="text-[#C8A97E] font-bold tracking-[0.3em] text-xs uppercase">The Philosophy</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-none">
              About <span className="text-[#C8A97E] italic font-light">Me.</span>
            </h2>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-col items-start md:items-end gap-2">
            <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">Est. 2023 / MERN Expert</p>
            <div className="flex gap-2">
              {[Zap, Sparkles, Shield].map((Icon, i) => (
                <Icon key={i} size={14} className="text-[#C8A97E]/40" />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Narrative */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-8">
            <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Engineering <span className="text-[#C8A97E]">Experience</span> <br />
              Beyond the Screen.
            </h3>
            
            <div className="space-y-6 text-lg text-gray-400 leading-relaxed font-light">
              <p>
                I'm <span className="text-white font-medium">Phaniswar</span>, a Full Stack Architect and 3rd year B.Tech CSE student at LPU. My journey is defined by a relentless pursuit of engineering excellence and digital aesthetics.
              </p>
              <p>
                Specializing in the MERN stack, I transform complex business logic into elegant, high-performance web applications. I believe that code should not only work perfectly but also be a pleasure to maintain and evolve.
              </p>
              
              <div className="pt-4 flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#C8A97E]/50 transition-colors">
                  <MousePointer2 className="w-5 h-5 text-[#C8A97E]" />
                </div>
                <span className="text-white font-bold tracking-widest text-[10px] uppercase group-hover:text-[#C8A97E] transition-colors">
                  Based in Punjab, India
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Pillars Grid */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-[#C8A97E]/30 transition-all duration-500 overflow-hidden"
              >
                {/* Hover Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <pillar.icon className="w-6 h-6 text-[#C8A97E]" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{pillar.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                    {pillar.desc}
                  </p>
                </div>

                {/* Decorative Accent */}
                <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <div className="text-[4rem] font-black tracking-tighter text-white select-none leading-none">
                    0{i + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
