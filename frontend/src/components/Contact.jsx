import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle, Github, Linkedin, Mail } from 'lucide-react';
import ContactBackground from './ContactBackground';
import profileImg from '../assets/profile.jpg';
import { GridBackground, ParticleBackground } from './EducationJourney';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const sectionRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
            const x = ((e.clientX - left) / width) * 100;
            const y = ((e.clientY - top) / height) * 100;
            sectionRef.current.style.setProperty('--mouse-x', `${x}%`);
            sectionRef.current.style.setProperty('--mouse-y', `${y}%`);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic Validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // Reset status after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setErrorMessage('Unable to connect to the server. Please check your connection.');
    }
  };


  return (
    <section 
      ref={sectionRef} 
      id="contact" 
      className="py-32 px-6 relative min-h-screen flex items-center justify-center overflow-hidden bg-[#02030A]"
    >
      {/* Shared Ambient Layers brought over from EducationJourney for continuity */}
      <GridBackground opacity={0.015} maskEdges={false} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-cyan-900/15 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      <ParticleBackground color="cyan-400/10" shadow="shadow-none" bounds="inset-0" />

      {/* ── Global Cursor Glow ── */}
      <div 
        className="cursor-glow" 
        style={{ 
          left: 'var(--mouse-x)', 
          top: 'var(--mouse-y)',
          transform: 'translate(-50%, -50%)',
          position: 'absolute'
        }} 
      />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
        className="max-w-[1400px] w-full mx-auto relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          
          {/* LEFT COLUMN: Profile Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.1
                }
              }
            }}
            className="flex flex-col space-y-12"
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="space-y-6"
            >
              <h2 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9]">
                <span className="block text-white/95">Let's</span> 
                <span className="animate-text-shimmer italic bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Connect_</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md font-medium">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </motion.div>

            <motion.div 
              variants={{
                hidden: { opacity: 0, scale: 0.95, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 }
              }}
              whileHover={{ 
                y: -10, 
                scale: 1.04,
                boxShadow: "0 40px 80px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(110, 231, 249, 0.2)"
              }}
              className="transmission-panel p-10 rounded-[3rem] relative group/card shadow-2xl overflow-hidden backdrop-blur-[40px]"
            >
              {/* Visible Diagonal Light Sweep */}
              <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-diag-sweep" />
              </div>

              {/* Refined Edge Glows */}
              <div className="absolute top-0 left-0 w-full h-full rounded-[3rem] border border-white/10 pointer-events-none group-hover/card:border-cyan-500/30 transition-colors duration-500" />
              
              <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className="relative">
                  {/* Pulsing glow behind image */}
                  <div className="absolute -inset-8 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse group-hover/card:opacity-100 transition-opacity" />
                  
                  <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border border-white/10 relative z-10 shadow-2xl group-hover/card:border-cyan-400/50 transition-all duration-700">
                    <img 
                      src={profileImg} 
                      alt="Phaniswar J." 
                      className="w-full h-full object-cover grayscale-[0.2] group-hover/card:grayscale-0 transition-all duration-1000 scale-105 group-hover/card:scale-125"
                    />
                    {/* Glowing ring */}
                    <div className="absolute inset-0 border-2 border-cyan-400/0 group-hover/card:border-cyan-400/40 rounded-full transition-all duration-700" />
                  </div>
                  {/* Status Indicator */}
                  <div className="absolute bottom-4 right-4 z-20 w-5 h-5 rounded-full bg-[#05070F] border border-white/10 flex items-center justify-center p-0.5">
                    <div className="w-full h-full rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] status-pulse-dot" />
                  </div>
                </div>

                <div className="text-center md:text-left flex-1">
                  <h3 className="text-3xl font-black text-white/95 mb-1 flex items-center justify-center md:justify-start gap-3 group-hover/card:text-cyan-400 transition-colors duration-300">
                    Phaniswar J.
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  </h3>
                  <p className="text-gray-400/80 font-medium text-sm mb-6 tracking-wide uppercase">Full Stack Developer</p>
                  
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    {[
                      { icon: Github, href: 'https://github.com/phaniswar23' },
                      { icon: Linkedin, href: 'https://www.linkedin.com/in/phaniswar99/' },
                      { icon: Mail, href: 'mailto:phaniswar.janyavula@example.com' }
                    ].map((link, i) => (
                      <motion.a 
                        key={i}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5, scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                        className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-cyan-500/50 transition-all duration-300 group/icon"
                      >
                        <link.icon className="w-5 h-5 text-white/40 group-hover/icon:text-cyan-400 transition-colors" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="flex justify-center w-full"
          >
            <div className="w-full max-w-xl transmission-panel p-10 sm:p-14 rounded-[3.5rem] relative group/form shadow-2xl overflow-hidden backdrop-blur-[40px]">
              {/* Faint Reflection Highlight on Top */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-20" />
              
              {/* Internal Glow Effects */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 blur-[100px] -z-10 animate-pulse" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/10 blur-[100px] -z-10 animate-pulse" />

              <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                {/* Your Name */}
                <div className="relative group/field">
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-7 py-6 text-white placeholder-transparent focus:outline-none input-neon-focus transition-all duration-500 font-medium"
                    id="name"
                  />
                  <label 
                    htmlFor="name"
                    className={`absolute left-7 transition-all duration-300 pointer-events-none tracking-wide text-xs font-semibold ${
                      focusedField === 'name' || formData.name ? '-top-3 text-cyan-400 bg-[#02030A] px-2.5 scale-90' : 'top-1/2 -translate-y-1/2 text-gray-500'
                    }`}
                  >
                    Your Name
                  </label>
                  {/* Underline Animation */}
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 ${focusedField === 'name' ? 'w-full' : 'w-0'}`} />
                </div>

                {/* Email Address */}
                <div className="relative group/field">
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-7 py-6 text-white placeholder-transparent focus:outline-none input-neon-focus transition-all duration-500 font-medium"
                    id="email"
                  />
                  <label 
                    htmlFor="email"
                    className={`absolute left-7 transition-all duration-300 pointer-events-none tracking-wide text-xs font-semibold ${
                      focusedField === 'email' || formData.email ? '-top-3 text-cyan-400 bg-[#02030A] px-2.5 scale-90' : 'top-1/2 -translate-y-1/2 text-gray-500'
                    }`}
                  >
                    Email Address
                  </label>
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 ${focusedField === 'email' ? 'w-full' : 'w-0'}`} />
                </div>

                {/* Your Message */}
                <div className="relative group/field">
                  <textarea
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-7 py-6 text-white placeholder-transparent focus:outline-none input-neon-focus transition-all duration-500 font-medium resize-none"
                    id="message"
                  ></textarea>
                  <label 
                    htmlFor="message"
                    className={`absolute left-7 transition-all duration-300 pointer-events-none tracking-wide text-xs font-semibold ${
                      focusedField === 'message' || formData.message ? '-top-3 text-cyan-400 bg-[#02030A] px-2.5 scale-90' : 'top-7 text-gray-500'
                    }`}
                  >
                    Your Message
                  </label>
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 ${focusedField === 'message' ? 'w-full' : 'w-0'}`} />
                </div>

                {/* Submit Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(110, 231, 249, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-6 rounded-[2rem] bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-[length:200%_auto] animate-btn-grad text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-3 overflow-hidden group disabled:opacity-50 transition-all duration-500 relative"
                >
                  {/* Light Sweep Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:animate-diag-sweep pointer-events-none" />
                  
                  {status === 'loading' ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <span className="relative z-10 flex items-center gap-3">
                      Send Message
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                    </span>
                  )}
                </motion.button>

                {/* Status Messages */}

                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-3 shadow-lg"
                    >
                      <CheckCircle2 className="w-5 h-5" /> Message sent successfully. I'll get back to you soon!
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div 
                      key="error"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/20 text-rose-400 text-xs font-bold flex items-center gap-3 shadow-lg"
                    >
                      <AlertCircle className="w-5 h-5" /> {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Subtle Connection Lines (Lower opacity) */}
      <svg className="absolute inset-0 pointer-events-none hidden lg:block opacity-[0.05]" style={{ zIndex: 1 }}>
        <motion.path 
          d="M 550 450 L 850 550" 
          stroke="url(#line-grad-main)" strokeWidth="0.5" strokeDasharray="15,15" fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
        <defs>
          <linearGradient id="line-grad-main" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
};

export default Contact;
