import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, LayoutGrid, Orbit } from 'lucide-react';
import { SKILL_CATEGORIES } from './SkillsData';
import './TechStack.css';

const TechStack = () => {
  const [viewMode, setViewMode] = useState(typeof window !== 'undefined' && window.innerWidth < 768 ? 'grid' : 'orbit'); // 'orbit' | 'grid'
  const [activeTab, setActiveTab] = useState(SKILL_CATEGORIES[0].id);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [focusedSkill, setFocusedSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX - innerWidth / 2) / 30;
    const y = (e.clientY - innerHeight / 2) / 30;
    setMousePos({ x, y });
  };

  const activeCategory = useMemo(() => 
    SKILL_CATEGORIES.find(cat => cat.id === activeTab), 
    [activeTab]
  );
  
  const eliteEasing = [0.16, 1, 0.3, 1];

  const [particles, setParticles] = useState({ deep: [], mid: [], fore: [] });

  React.useEffect(() => {
    const generateParticles = (count, sizeRange) => [...Array(count)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
      opacity: Math.random() * 0.5 + 0.1,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 10
    }));

    setParticles({
      deep: generateParticles(20, [1, 1.5]),
      mid: generateParticles(15, [1.5, 2.5]),
      fore: generateParticles(10, [2.5, 4])
    });
  }, []);

  return (
    <section 
      id="tech" 
      className="tech-stack-section pb-36"
      onMouseMove={handleMouseMove}
    >
      {/* 3D Atmospheric Background */}
      <div className="tech-atmosphere">
        {/* Layer 1: Base & Glows */}
        <div className="bg-glow-cluster">
          <div className="glow-orb cyan" />
          <div className="glow-orb blue" />
          <div className="glow-orb purple" />
        </div>

        {/* Layer 2: 3D Grid */}
        <div 
          className="bg-grid-3d" 
          style={{ 
            transform: `perspective(1000px) rotateX(60deg) translateY(-100px) translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` 
          }}
        />

        {/* Layer 3: Particle Parallax Field */}
        {[
          { layer: 'deep', speed: 0.1, opacity: 0.3 },
          { layer: 'mid', speed: 0.2, opacity: 0.5 },
          { layer: 'fore', speed: 0.4, opacity: 0.8 }
        ].map(({ layer, speed, opacity }) => (
          <div 
            key={layer}
            className="particle-layer"
            style={{ 
              transform: `translate(${mousePos.x * speed}px, ${mousePos.y * speed}px)`,
              opacity 
            }}
          >
            {particles[layer].map((p) => (
              <div 
                key={p.id} 
                className="tech-particle"
                style={{ 
                  top: p.top, 
                  left: p.left,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  opacity: p.opacity,
                  animation: `float-particle ${p.duration}s infinite ease-in-out`,
                  animationDelay: `${p.delay}s`
                }} 
              />
            ))}
          </div>
        ))}

        {/* Interaction Sphere */}
        <div 
          className="bg-sphere" 
          style={{ 
            transform: `translate(${-50 + mousePos.x}%, ${-50 + mousePos.y}%)`,
            background: `radial-gradient(circle, ${activeCategory.color}10 0%, transparent 70%)`
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-6 w-full">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-6"
          >
            <Sparkles size={12} />
            Tech Ecosystem
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white leading-none mb-6"
          >
            Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 italic">Stack.</span>
          </motion.h2>

          {/* Mode Toggle Switch */}
          <div className="stack-mode-toggle">
            <div 
              className="toggle-slider" 
              style={{ 
                left: viewMode === 'orbit' ? '0.25rem' : '50%',
                width: 'calc(50% - 0.25rem)'
              }} 
            />
            <button 
              className={`toggle-btn ${viewMode === 'orbit' ? 'active' : ''}`}
              onClick={() => setViewMode('orbit')}
            >
              <div className="flex items-center gap-2">
                <Orbit size={14} />
                <span>Orbit</span>
              </div>
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <div className="flex items-center gap-2">
                <LayoutGrid size={14} />
                <span>Grid</span>
              </div>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          {viewMode === 'orbit' ? (
            <motion.div
              key="orbit-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6, ease: eliteEasing }}
            >
              <div className="focus-hub" style={{ transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` }}>
                <OrbitGroup 
                  category={activeCategory} 
                  focusedSkill={focusedSkill}
                  setFocusedSkill={setFocusedSkill}
                />
              </div>

              <div className="category-selector">
                {SKILL_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveTab(cat.id);
                      setFocusedSkill(null);
                    }}
                    className={`selector-pill ${activeTab === cat.id ? 'active' : ''}`}
                    style={{ '--accent-color': cat.color, '--accent-color-rgb': '6, 182, 212' }}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid-view"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                visible: { transition: { staggerChildren: 0.08 } }
              }}
              className={`grid-container ${hoveredSkill ? 'has-focus' : ''}`}
            >
              <div className="grid-orb" style={{ '--accent-color-rgb': '6, 182, 212' }} />
              {SKILL_CATEGORIES.map((category) => {
                const isHoveredCategory = category.rings.some(r => r.skills.some(s => s.name === hoveredSkill));
                return (
                  <motion.div 
                    key={category.id} 
                    variants={{
                      hidden: { opacity: 0, y: 40, scale: 0.92, filter: 'blur(10px)' },
                      visible: { 
                        opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
                        transition: { duration: 0.8, ease: eliteEasing }
                      }
                    }}
                    className={`category-group ${isHoveredCategory ? 'active-group' : ''}`}
                  >
                    <div className="category-title-strip" style={{ '--accent-color': category.color }}>
                      <category.icon size={18} style={{ color: category.color }} />
                      <span>{category.title}</span>
                      <div className="title-line" />
                    </div>
                    <div className="skills-grid">
                      {category.rings.flatMap(r => r.skills).map((skill, idx) => (
                        <SkillCard 
                          key={skill.name} 
                          skill={skill} 
                          index={idx} 
                          hoveredSkill={hoveredSkill}
                          setHoveredSkill={setHoveredSkill}
                        />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const OrbitGroup = ({ category, focusedSkill, setFocusedSkill }) => {
  return (
    <div className="orbit-system focused" style={{ '--accent-color': category.color }}>
      {/* Central Core */}
      <div className="focus-core">
        <div className="flex flex-col items-center z-10">
          <category.icon size={30} style={{ color: category.color }} />
          <span className="core-label">{category.title}</span>
        </div>
      </div>

      {/* Orbit Rings & Nodes */}
      {category.rings.map((ring, rIdx) => (
        <div 
          key={ring.id}
          className={`orbit-ring-wrapper ${rIdx === 0 ? 'orbit-rotate-cw' : 'orbit-rotate-ccw'}`}
          style={{ 
            '--duration': `${rIdx === 0 ? '25s' : '40s'}`,
            position: 'absolute',
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}
        >
          {ring.skills.map((skill, sIdx) => {
            const angle = (sIdx / ring.skills.length) * 360;
            const radius = ring.id === 'inner' ? 170 : 290;
            return (
              <OrbitingNode 
                key={skill.name}
                skill={skill}
                angle={angle}
                radius={radius}
                orbitRotation={rIdx === 0 ? 'cw' : 'ccw'}
                isFocused={focusedSkill === skill.name}
                onClick={() => setFocusedSkill(focusedSkill === skill.name ? null : skill.name)}
                duration={rIdx === 0 ? 25 : 40}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

const OrbitingNode = ({ skill, angle, radius, orbitRotation, isFocused, onClick, duration }) => {
  const [isHovered, setIsHovered] = useState(false);
  const logoUrl = skill.customUrl || `https://cdn.simpleicons.org/${skill.slug}`;
  
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '6, 182, 212';
  };

  return (
    <div 
      className="focus-node-wrapper"
      style={{
        transform: `rotate(${angle}deg) translateX(${radius}px)`,
        position: 'absolute',
        top: '50%',
        left: '50%',
        pointerEvents: 'auto',
        zIndex: isFocused ? 100 : 1
      }}
    >
      <motion.div 
        className={`focus-node-upright ${isFocused ? 'focused' : ''}`}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{ scale: isFocused ? 1.4 : isHovered ? 1.15 : 1 }}
        style={{
          animation: `${orbitRotation === 'cw' ? 'orbit-ccw' : 'orbit-cw'} ${duration}s linear infinite`,
          '--brand-color': skill.color,
          '--brand-color-rgb': hexToRgb(skill.color),
          animationPlayState: (isHovered || isFocused) ? 'paused' : 'running',
          cursor: 'pointer'
        }}
      >
        <div className="node-icon-box">
          {skill.icon ? (
            <skill.icon size={32} style={{ color: skill.color }} />
          ) : (
            <img src={logoUrl} alt={skill.name} style={{ width: '32px', height: '32px' }} />
          )}
          <div className="focus-tooltip">
            {skill.name}
          </div>
        </div>
        <span className="node-label">{skill.name}</span>
      </motion.div>
    </div>
  );
};

const SkillCard = ({ skill, index, hoveredSkill, setHoveredSkill }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });
  const isHovered = hoveredSkill === skill.name;
  
  const logoUrl = skill.customUrl || `https://cdn.simpleicons.org/${skill.slug}`;
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '6, 182, 212';
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left;
    const y = e.clientY - card.top;
    
    // Calculate tilt
    const centerX = card.width / 2;
    const centerY = card.height / 2;
    const rotateX = (y - centerY) / 8;
    const rotateY = (centerX - x) / 8;
    
    setTilt({ x: rotateX, y: rotateY });
    setLightPos({ x: (x / card.width) * 100, y: (y / card.height) * 100 });
  };

  return (
    <motion.div 
      className={`skill-card ${isHovered ? 'focused' : ''}`}
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.92, filter: 'blur(10px)' },
        visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
      }}
      style={{ 
        '--brand-color': skill.color, 
        '--brand-color-rgb': hexToRgb(skill.color),
        transform: isHovered ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-8px)` : 'none',
        '--mouse-x': `${lightPos.x}%`,
        '--mouse-y': `${lightPos.y}%`
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHoveredSkill(skill.name)}
      onMouseLeave={() => {
        setHoveredSkill(null);
        setTilt({ x: 0, y: 0 });
      }}
    >
      <div className="card-light-tracker" />
      {skill.icon ? (
        <skill.icon size={36} style={{ color: skill.color }} className="skill-icon" />
      ) : (
        <img src={logoUrl} alt={skill.name} />
      )}
      <span>{skill.name}</span>
    </motion.div>
  );
};

export default TechStack;
