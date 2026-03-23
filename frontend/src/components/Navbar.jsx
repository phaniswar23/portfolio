import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [activeSection, setActiveSection] = useState('');

  const { scrollYProgress } = useScroll();
  const shineX = useTransform(scrollYProgress, [0, 1], ['-100%', '200%']);

  const navLinks = [
    { name: 'About',        href: '#about',        id: 'about' },
    { name: 'Projects',     href: '#projects',     id: 'projects' },
    { name: 'Skills',       href: '#tech',         id: 'tech' },
    { name: 'Certifications', href: '#certificates', id: 'certificates' },
    { name: 'Coding Profiles', href: '#coding',     id: 'coding' },
    { name: 'Education',    href: '#education',    id: 'education' },
    { name: 'Contact',      href: '#contact',      id: 'contact' },
  ];

  /* ── Scroll state + IntersectionObserver active section ── */
  useEffect(() => {
    // 1. Observe sections to determine active link
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger at the middle of the viewport
      threshold: 0
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    navLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    // 2. Simple, throttled scroll listener for background blur
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">

      {/* Ambient glow behind the bar */}
      <motion.div
        animate={{
          scaleX: scrolled ? 1 : 0.92,
        }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`absolute inset-x-0 mx-auto w-full max-w-[740px] h-12 bg-[#6EE7F9]/10 blur-[52px] rounded-full pointer-events-none -z-10 transition-opacity duration-500 ${scrolled ? 'opacity-45' : 'opacity-20'}`}
      />

      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-[600ms] pointer-events-auto relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.4),inset_0_1px_rgba(255,255,255,0.05)]"
      >
        {/* Scroll-driven specular shine */}
        <motion.div
          style={{ x: shineX }}
          className="absolute inset-0 w-2/3 h-full bg-gradient-to-r from-transparent via-slate-400/[0.04] to-transparent dark:via-white/[0.06] skew-x-[-35deg] pointer-events-none z-10 blur-[1px]"
        />

        {/* Top highlight seam */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-slate-300/40 to-transparent dark:via-white/20 pointer-events-none z-10" />

        {/* P Monogram logo */}
        <a
          href="#"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border-white/10 hover:bg-white/10 border group transition-all duration-300 hover:border-[#6EE7F9]/40 hover:shadow-[0_0_14px_rgba(110,231,249,0.3)] mr-2 relative z-20 overflow-hidden flex-shrink-0"
        >
          <svg viewBox="0 0 40 40" className="w-4 h-4 text-white logo-glow relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M14 10V30M14 10H22C25.3137 10 28 12.6863 28 16V16C28 19.3137 25.3137 22 22 22H14"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          </svg>
          <div className="absolute inset-0 rounded-full bg-[#6EE7F9]/0 group-hover:bg-[#6EE7F9]/10 blur-md transition-all duration-500" />
        </a>

        {/* Nav Links */}
        <div className="flex items-center gap-0.5 relative z-20">
          {navLinks.map((link) => {
            const isActive  = activeSection === link.id;
            const isHovered = hoveredLink   === link.name;

            return (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                className={`
                  relative text-[10px] font-bold uppercase tracking-[0.18em]
                  px-4 py-2.5 rounded-full z-10 select-none block
                  transition-all duration-300 ease-in-out
                  ${isActive ? 'text-white' : isHovered ? 'text-white scale-105' : 'text-gray-400'}
                `}
              >
                {/* ── ACTIVE sliding glass pill ── */}
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-[#6EE7F9]/15 to-[#A78BFA]/15 border border-white/10 backdrop-blur-md rounded-full shadow-[0_0_20px_rgba(110,231,249,0.15),inset_0_0_10px_rgba(255,255,255,0.05)] -z-10"
                  />
                )}

                {/* ── HOVER slight glow (only when not active) ── */}
                {isHovered && !isActive && (
                  <motion.div
                    layoutId="nav-hover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-white/5 border border-white/5 rounded-full -z-10 shadow-[0_0_15px_rgba(255,255,255,0.03)]"
                  />
                )}

                {link.name}
              </a>
            );
          })}
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
