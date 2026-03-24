import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Briefcase, 
  Code2, 
  Award,
  GraduationCap,
  Mail
} from 'lucide-react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('about');

  const navLinks = [
    { name: 'About', href: '#about', id: 'about', icon: User },
    { name: 'Projects', href: '#projects', id: 'projects', icon: Briefcase },
    { name: 'Skills', href: '#tech', id: 'tech', icon: Code2 },
    { name: 'Certifications', href: '#certificates', id: 'certificates', icon: Award },
    { name: 'Coding', href: '#coding', id: 'coding', icon: GraduationCap },
    { name: 'Education', href: '#education', id: 'education', icon: GraduationCap },
    { name: 'Contact', href: '#contact', id: 'contact', icon: Mail },
  ];

  const mobileLinks = [
    { name: 'About', href: '#about', id: 'about', icon: User },
    { name: 'Projects', href: '#projects', id: 'projects', icon: Briefcase },
    { name: 'Skills', href: '#tech', id: 'tech', icon: Code2 },
    { name: 'Certs', href: '#certificates', id: 'certificates', icon: Award },
    { name: 'Contact', href: '#contact', id: 'contact', icon: Mail },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
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
    
    // Use the comprehensive navLinks for observation
    navLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── DESKTOP NAVBAR (Top) ── */}
      <div className="fixed top-6 left-0 right-0 z-50 hidden md:flex justify-center px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-1 px-4 py-2 rounded-full pointer-events-auto bg-black/20 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative text-[10px] font-bold uppercase tracking-[0.18em] px-4 py-2.5 rounded-full transition-all duration-300 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active-desktop"
                    className="absolute inset-0 bg-white/10 border border-white/10 rounded-full -z-10"
                  />
                )}
                {link.name}
              </a>
            );
          })}
        </motion.nav>
      </div>

      {/* ── MOBILE NAVBAR (iOS Dock Style) ── */}
      <div className="fixed bottom-6 left-0 right-0 z-50 flex md:hidden justify-center px-4 pointer-events-none">
        <motion.nav
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between w-full max-w-[400px] px-6 py-2 rounded-[2.5rem] pointer-events-auto bg-[#050505]/60 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)]"
        >
          {mobileLinks.map((link) => {
            const isActive = activeSection === link.id;
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                className="relative flex flex-col items-center gap-1 py-1"
              >
                <motion.div 
                  whileTap={{ scale: 0.9 }}
                  className={`p-2.5 rounded-2xl transition-all duration-500 ${isActive ? 'bg-gradient-to-br from-[#6EE7F9] to-[#22D3EE] text-black scale-110 shadow-[0_0_20px_rgba(110,231,249,0.4)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                </motion.div>
                {isActive && (
                  <motion.div 
                    layoutId="mobile-dot"
                    className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-[#6EE7F9] shadow-[0_0_8px_#6EE7F9]"
                  />
                )}
              </a>
            );
          })}
        </motion.nav>
      </div>

    </>
  );
};

export default Navbar;
