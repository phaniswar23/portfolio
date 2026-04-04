import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu,
  X,
  User, 
  Briefcase, 
  Code2, 
  Award,
  GraduationCap,
  Mail,
  Home
} from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const [bubbleStyle, setBubbleStyle] = useState({ opacity: 0 }); // v9: Master Sync
  const ratiosRef = useRef(new Map());

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero', icon: Home },
    { name: 'About', href: '#about', id: 'about', icon: User },
    { name: 'Projects', href: '#projects', id: 'projects', icon: Briefcase },
    { name: 'Skills', href: '#tech', id: 'tech', icon: Code2 },
    { name: 'Certifications', href: '#certificates', id: 'certificates', icon: Award },
    { name: 'Coding', href: '#coding', id: 'coding', icon: GraduationCap },
    { name: 'Education', href: '#education', id: 'education', icon: GraduationCap },
    { name: 'Contact', href: '#contact', id: 'contact', icon: Mail },
  ];

  // v4: Shared Layout Logic (Higher Precision)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);
    const handler = (e) => setShouldReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Precise State Triggers
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const threshold = heroHeight - 80;
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for Section Sync
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-15% 0px -15% 0px', // Precise focal zone
      threshold: [0, 0.25, 0.5, 0.75, 1.0] // Efficient resolution
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        ratiosRef.current.set(entry.target.id, entry.intersectionRatio);
      });

      // Find section with highest visibility ratio
      let maxRatio = 0;
      let winnerId = null;

      ratiosRef.current.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          winnerId = id;
        }
      });

      // Bottom of page rescue: Force 'contact' if we're at the very bottom
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      
      let finalWinner = winnerId;
      let finalRatio = maxRatio;

      if (isAtBottom && ratiosRef.current.has('contact')) {
        finalWinner = 'contact';
        finalRatio = 1;
      }

      // Only update if winner is confident and different
      if (finalWinner && finalRatio > 0.15) {
        setActiveSection(prev => {
          if (prev !== finalWinner) return finalWinner;
          return prev;
        });
      }
    }, observerOptions);
    
    navLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []); // Run once on mount

  // Initial Sync & Rescue Logic
  useEffect(() => {
    const sync = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      
      let currentSection = 'hero';
      navLinks.forEach(link => {
        const el = document.getElementById(link.id);
        if (el && scrollPos >= el.offsetTop) {
          currentSection = link.id;
        }
      });
      setActiveSection(currentSection);
    };

    const timer = setTimeout(sync, 500); // Wait for components to mount
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(targetId);
      element.focus({ preventScroll: true });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="navbar-container">
      <div className="navbar-wrapper liquid-glass">
        {/* DESKTOP NAVIGATION */}
        <nav 
          aria-label="Main Navigation" 
          className="hidden lg:flex items-center nav-container h-full"
        >

          {navLinks.filter(link => link.id !== 'hero').map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  scrollToSection(e, link.href);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                <span className="relative z-10">{link.name}</span>
                {isActive && !shouldReduceMotion && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="nav-bubble"
                    transition={{
                      type: 'spring',
                      stiffness: 450,
                      damping: 35,
                      mass: 1
                    }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* MOBILE MENU TOGGLE */}
        <button 
          className="lg:hidden text-white p-2 focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50 rounded-lg transition-all"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* MOBILE NAVIGATION OVERLAY */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="mobile-menu-overlay"
            >
              <nav className="flex flex-col p-4 gap-2">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span className="text-sm font-bold uppercase tracking-widest">{link.name}</span>
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4A373] shadow-[0_0_10px_#D4A373]" />
                      )}
                    </a>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
