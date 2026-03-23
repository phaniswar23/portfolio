import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, Calendar, Grid, List, X, ZoomIn, Eye, ChevronRight, Loader2 } from 'lucide-react';
import { certificates } from './CertificatesData';
import './Certificates.css';

const Categories = ["All", "Frontend", "Backend", "Cloud", "Databases", "Others"];

const Certificates = () => {
  const [filter, setFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);

  const filteredCertificates = useMemo(() => {
    return filter === "All" 
      ? certificates 
      : certificates.filter(cert => cert.category === filter);
  }, [filter]);

  const displayedCertificates = useMemo(() => {
    return filteredCertificates.slice(0, visibleCount);
  }, [filteredCertificates, visibleCount]);

  const hasMore = visibleCount < filteredCertificates.length;

  const loadMore = () => {
    setIsLoading(true);
    // Simulate loading feel
    setTimeout(() => {
      setVisibleCount(prev => prev + 4);
      setIsLoading(false);
    }, 800);
  };

  // Reset visible count when filter changes
  useEffect(() => {
    setVisibleCount(8);
  }, [filter]);

  return (
    <div className="certificates-container pt-16 pb-24 px-6 md:px-12 dark:bg-[#020617] transition-colors duration-500 min-h-screen relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight mb-4">
            Certificates<span className="text-cyan-400">.</span>
          </h2>
          <div className="section-header-underline mx-auto mb-6" />
          <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Interactive preview of validated skills and achievements.
          </p>
        </motion.div>

        {/* Controls: Tabs ONLY */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
          <div className="flex flex-wrap justify-center gap-3">
            {Categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`filter-tab px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  filter === cat ? 'active' : 'text-slate-500 dark:text-slate-400 hover:text-white font-medium'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Display Content: Grid Only */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedCertificates.map((cert, idx) => (
              <GridCard 
                key={cert.id} 
                cert={cert} 
                index={idx} 
                onClick={() => setSelectedCert(cert)} 
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Infinite Scroll / Load More */}
        {hasMore && (
          <div className="mt-16 text-center">
            <button 
              onClick={loadMore}
              disabled={isLoading}
              className="load-more-btn group flex items-center gap-3 mx-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  LOADING...
                </>
              ) : (
                <>
                  EXPLORE MORE
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Compact Modal Preview with Portal */}
      <AnimatePresence>
        {selectedCert && (
          <ModalPreview 
            cert={selectedCert} 
            onClose={() => setSelectedCert(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const GridCard = ({ cert, index, onClick }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="relative group">
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
        onMouseMove={handleMouseMove}
        onClick={onClick}
        className="certificate-card p-6 cursor-pointer"
        style={{
          '--mouse-x': `${mousePos.x}%`,
          '--mouse-y': `${mousePos.y}%`
        }}
      >
        {cert.featured && <div className="featured-badge">FEATURED</div>}

        {/* Live Preview Area (reveals on hover via CSS) */}
        <div className="card-preview-area">
          <div className="preview-img-wrapper">
            <img src={cert.image} alt={cert.title} />
          </div>
        </div>

        <div className="card-content flex flex-col h-full">
          <div className="flex items-start justify-between mb-4">
             <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors">
               <Award className="w-6 h-6 text-cyan-400" />
             </div>
             <div className="p-2 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
               <ZoomIn size={18} className="text-cyan-400" />
             </div>
          </div>

          <h3 className="font-bold text-white mb-2 leading-tight group-hover:text-cyan-400 transition-colors text-lg line-clamp-2">
            {cert.title}
          </h3>
          <p className="text-slate-400 font-medium text-sm mb-4">{cert.issuer}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {cert.tags.slice(0, 3).map(tag => (
              <span key={tag} className="skill-tag text-slate-400">{tag}</span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
            <span className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <Calendar size={12} className="text-cyan-500/50" />
              {cert.date}
            </span>
            <Eye size={16} className="text-cyan-400/0 group-hover:text-cyan-400 transition-all" />
          </div>
        </div>
      </motion.div>
      <div className="card-glow-bg" />
    </div>
  );
};

const ModalPreview = ({ cert, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return createPortal(
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="compact-modal-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="compact-modal-content"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-20"
        >
          <X size={20} />
        </button>

        <div className="modal-top-img">
          <img 
            src={cert.image} 
            alt={cert.title} 
          />
        </div>

        <div className="modal-bottom-details">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold tracking-widest uppercase">
            <Award size={14} />
            Verified Certificate
          </div>

          <h2 className="text-3xl font-black text-white leading-tight">
            {cert.title}
          </h2>

          <div className="flex items-center gap-4 text-slate-400">
             <span className="text-cyan-400 font-bold">{cert.issuer}</span>
             <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
             <span className="flex items-center gap-2 text-sm">
               <Calendar size={14} />
               {cert.date}
             </span>
          </div>

          <div className="flex flex-wrap justify-center gap-2 my-4">
            {cert.tags.map(tag => (
              <span key={tag} className="skill-tag text-slate-300 border-white/20">{tag}</span>
            ))}
          </div>

          <a 
            href={cert.verifyLink} 
            target="_blank" 
            rel="noreferrer"
            className="w-full max-w-sm mt-4 bg-cyan-500 hover:bg-cyan-400 text-black font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all group"
          >
            VERIFY CREDENTIALS
            <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export default Certificates;

