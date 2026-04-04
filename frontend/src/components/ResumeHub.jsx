import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Download, Eye, Globe, Zap, ArrowRight, ShieldCheck, Cpu, Check } from 'lucide-react';

const RESUME_TYPES = [
  {
    id: 'general',
    title: 'General CV',
    subtitle: 'Full Stack & Software Engineering',
    description: 'A comprehensive overview of my technical expertise across the entire web stack, featuring system design, backend architectures, and frontend mastery.',
    viewUrl: 'https://drive.google.com/file/d/1iShBqphCySGNih2iGJUOiYZv3AZ2E8Ae/view?usp=drive_link',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1iShBqphCySGNih2iGJUOiYZv3AZ2E8Ae',
    icon: Globe,
    color: 'from-[#D4A373] to-[#B08D57]',
    highlights: ['System Architecture', 'Backend Scalability', 'React Ecosystem']
  },
  {
    id: 'specialized',
    title: 'Specialized CV',
    subtitle: 'MERN & Performance focus',
    description: 'Deep-dive into specialized MERN stack development with a focus on high-performance interfaces, real-time data, and premium user experiences.',
    viewUrl: 'https://drive.google.com/file/d/1JsM4GHeIrywIeZ0SVyL89L0L-i0lvB6Z/view?usp=sharing',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1JsM4GHeIrywIeZ0SVyL89L0L-i0lvB6Z',
    icon: Zap,
    color: 'from-[#A1A1AA] to-[#71717A]',
    highlights: ['MERN Deep-dive', 'Performance Optm.', 'UI/UX Engineering']
  }
];

const ResumeHub = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState(RESUME_TYPES[0]);

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-[#0B0B0C]/90 backdrop-blur-2xl" 
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, filter: 'blur(20px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          exit={{ scale: 0.8, opacity: 0, filter: 'blur(20px)' }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
          className="relative w-full max-w-5xl bg-[#121214]/95 border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] flex flex-col md:flex-row h-[90vh] md:h-auto md:min-h-[640px] group/hub"
        >
          {/* Animated Gradient Border Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-gradient-to-tr from-[#D4A373]/20 via-transparent to-white/10" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all z-20 hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scanning Beam Border */}
          <div className="scanning-beam-container">
            <div className="scanning-beam" />
          </div>

          {/* Left Side: Selection */}
          <div className="w-full md:w-[350px] p-10 border-r border-white/5 bg-[#121214] backdrop-blur-3xl flex flex-col relative z-20">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-14"
            >
              <h2 className="text-white text-3xl font-black tracking-tighter mb-2 leading-none">CV HUB</h2>
            </motion.div>

            <div className="space-y-6 flex-1">
              {RESUME_TYPES.map((type, idx) => (
                <motion.button
                  key={type.id}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  onClick={() => setSelectedType(type)}
                  whileHover={{ x: 8 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full p-6 rounded-2xl border transition-all text-left relative overflow-hidden group/item ${
                    selectedType.id === type.id 
                    ? 'bg-[#D4A373]/5 border-[#D4A373]/40' 
                    : 'bg-transparent border-white/5 hover:border-white/20'
                  }`}
                >
                  {selectedType.id === type.id && (
                    <motion.div 
                      layoutId="active-pill"
                      className="absolute inset-0 bg-gradient-to-br from-[#D4A373]/10 via-transparent to-transparent"
                    />
                  )}
                  
                  <div className="relative z-10 flex items-center gap-5">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${type.color} shadow-lg opacity-40 group-hover/item:opacity-100 transition-opacity duration-500`}>
                      <type.icon className="w-4 h-4 text-[#0B0B0C]" />
                    </div>
                    <div>
                      <h4 className={`text-sm font-black tracking-widest uppercase transition-colors ${selectedType.id === type.id ? 'text-white' : 'text-gray-600 group-hover/item:text-gray-400'}`}>
                        {type.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-2">
                        <div className={`w-1 h-1 rounded-full ${selectedType.id === type.id ? 'bg-[#D4A373]' : 'bg-gray-800'}`} />
                        <p className="text-[9px] uppercase font-bold tracking-widest text-gray-700">{type.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

          </div>

          {/* Right Side: High-Fidelity Preview */}
          <div className="flex-1 p-12 md:p-16 relative flex flex-col bg-black/20">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none overflow-hidden">
               <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedType.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="relative z-10 flex flex-col lg:flex-row gap-12 h-full items-center lg:items-start"
              >
                {/* Text Content */}
                <div className="flex-1 text-center lg:text-left">
                  <motion.h3 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-white text-5xl md:text-7xl font-black tracking-normal mb-8 leading-[1.1] select-none uppercase"
                  >
                    {selectedType.title.split(' ')[0]}<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A373] to-[#F5F5F7]">
                       {selectedType.title.split(' ')[1]}
                    </span>
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-500 text-lg leading-relaxed font-medium mb-12 max-w-md mx-auto lg:mx-0"
                  >
                    {selectedType.description}
                  </motion.p>

                  <div className="space-y-5 mb-16">
                    {selectedType.highlights.map((h, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="flex items-center gap-4 text-gray-400 justify-center lg:justify-start"
                      >
                        <Zap className="w-3.5 h-3.5 text-[#D4A373]" />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">{h}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-5">
                    <motion.a
                      href={selectedType.viewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-10 py-5 rounded-xl bg-[#D4A373] text-[#0B0B0C] font-black text-[11px] uppercase tracking-[0.3em] shadow-[0_20px_40px_-10px_rgba(212,163,115,0.4)] hover:bg-[#D4A373]/90 transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <Eye className="w-4 h-4" />
                      View PDF
                    </motion.a>

                    <motion.a
                      href={selectedType.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(255,255,255,0.05)" }}
                      whileTap={{ scale: 0.98 }}
                      className="px-10 py-5 rounded-xl bg-white/[0.03] border border-white/10 text-white font-black text-[11px] uppercase tracking-[0.3em] hover:border-white/30 transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <Download className="w-4 h-4 text-[#D4A373]" />
                      Download
                    </motion.a>
                  </div>
                </div>

                {/* Holographic Document Stack Preview */}
                <div className="relative w-64 h-80 hidden lg:block perspective-1000">
                  <motion.div 
                    initial={{ rotateY: 30, x: 50, opacity: 0 }}
                    animate={{ rotateY: -15, x: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-full h-full relative"
                  >
                    {[...Array(3)].map((_, i) => (
                      <div 
                        key={i}
                        className="holographic-stack-item w-full h-full"
                        style={{ 
                          transform: `translateZ(${i * -30}px) translateX(${i * 15}px) translateY(${i * -5}px)`,
                          opacity: 1 - i * 0.2
                        }}
                      >
                         <div className="p-6 h-full flex flex-col">
                            <div className="w-1/2 h-1 bg-white/10 rounded mb-4" />
                            <div className="w-full h-2 bg-white/5 rounded mb-2" />
                            <div className="w-4/5 h-2 bg-white/5 rounded mb-2" />
                            <div className="w-2/3 h-2 bg-white/5 rounded mb-8" />
                            
                            <div className="flex-1 bg-white/[0.02] rounded-xl border border-white/5" />
                            
                            <div className="mt-6 flex gap-2">
                               <div className="w-8 h-8 rounded bg-[#D4A373]/10" />
                               <div className="flex-1 h-8 rounded border border-white/10" />
                            </div>
                         </div>
                      </div>
                    ))}
                    
                    {/* Floating Tech Labels */}
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResumeHub;
