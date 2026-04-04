import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle, Github, Linkedin, Mail } from 'lucide-react';
import EliteContactBackground from './EliteContactBackground';
import profileImg from '../assets/profile.jpg';

const luxuryTransition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };

const MagneticIcon = ({ Icon, href }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set(clientX - centerX);
    y.set(clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ 
        scale: 1.15, 
        y: -8,
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        boxShadow: "0 15px 35px -5px rgba(200, 169, 126, 0.4), 0 0 15px rgba(200, 169, 126, 0.2)"
      }}
      whileTap={{ scale: 0.95 }}
      animate={{ 
        boxShadow: ["0 0 0px rgba(200,169,126,0)", "0 0 40px rgba(200,169,126,0.3)", "0 0 0px rgba(200,169,126,0)"],
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center hover:border-[#C8A97E]/80 transition-all duration-300 group/icon relative overflow-hidden"
    >
      <Icon className="w-5 h-5 text-white/40 group-hover/icon:text-[#C8A97E] group-hover/icon:scale-110 transition-all duration-300 relative z-10" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#C8A97E]/20 to-transparent opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500" />
      <div className="absolute -inset-4 bg-[#C8A97E]/30 blur-2xl opacity-0 group-hover/icon:opacity-100 transition-opacity duration-700" />
    </motion.a>
  );
};

const ReactiveInput = ({ label, name, type = "text", required, value, onChange, isTextArea, setGlobalTyping }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleFocus = () => {
    setIsFocused(true);
    setGlobalTyping(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setGlobalTyping(false);
  };

  const InputTag = isTextArea ? "textarea" : "input";

  return (
    <div className="premium-input-container group/field">
      <motion.div
        whileFocus={{ scale: 1.01, z: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full"
      >
        <InputTag
          ref={inputRef}
          type={type}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          rows={isTextArea ? 4 : undefined}
          className={`w-full glass-input-slot rounded-2xl px-7 py-5 text-white placeholder-transparent focus:outline-none transition-all duration-700 font-medium relative z-10 glowing-caret ${isTextArea ? 'resize-none' : ''}`}
          id={name}
        />
        
        {/* Physical elevation shadow for raised state */}
        <AnimatePresence>
          {isFocused && (
            <motion.div 
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 0.4, y: 10 }}
              exit={{ opacity: 0, y: 0 }}
              className="absolute inset-x-4 bottom-0 h-4 bg-black/40 blur-xl pointer-events-none -z-10"
            />
          )}
        </AnimatePresence>
      </motion.div>

      <label 
        htmlFor={name}
        className={`absolute left-7 transition-all duration-500 pointer-events-none tracking-wide text-[9px] font-bold z-20 uppercase ${
          isFocused || value 
          ? '-top-3 text-[#A1A1AA] tracking-[0.2em] opacity-100' 
          : (isTextArea ? 'top-6' : 'top-1/2 -translate-y-1/2') + ' text-[#71717A] opacity-40'
        }`}
      >
        {label}
      </label>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); 
  const [errorMessage, setErrorMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isNearForm, setIsNearForm] = useState(false);
  const [focusPos, setFocusPos] = useState({ x: 0.5, y: 0.5 });
  const [focusIntensity, setFocusIntensity] = useState(0);

  const sectionRef = useRef(null);
  const formRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(smoothY, [-500, 500], [2, -2]); // SUBTLE 2deg range
  const rotateY = useTransform(smoothX, [-500, 500], [-2, 2]);
  const translateY = useMotionValue(0);

  const handleGlobalMouseMove = (e) => {
    const x = e.clientX - window.innerWidth / 2;
    const y = e.clientY - window.innerHeight / 2;
    mouseX.set(x);
    mouseY.set(y);

    if (formRef.current) {
      const rect = formRef.current.getBoundingClientRect();
      const distance = Math.hypot(
        e.clientX - (rect.left + rect.width / 2),
        e.clientY - (rect.top + rect.height / 2)
      );
      setIsNearForm(distance < 400);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      const isDev = import.meta.env.DEV;
      const apiUrl = import.meta.env.VITE_API_URL || (isDev ? 'http://localhost:5001' : '');
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        const data = await response.json();
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Server connection failed.');
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="cinematic-bg-root pt-12 pb-40 px-4 sm:px-6 relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <EliteContactBackground 
        isTyping={isTyping} 
        isNearForm={isNearForm} 
        focusPos={focusPos} 
        focusIntensity={focusIntensity} 
      />

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.05 }
          }
        }}
        className="max-w-[1400px] w-full mx-auto relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: luxuryTransition }
            }}
            className="flex flex-col space-y-12"
          >
            <motion.div className="space-y-6">
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[0.9]">
                <span className="block text-white/95">Let's</span> 
                <span className="animate-text-shimmer italic bg-gradient-to-r from-[#C8A97E] via-[#F5F5F7] to-[#C8A97E] bg-clip-text text-transparent">Connect_</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#C8A97E] to-transparent rounded-full" />
              <p className="text-gray-400 text-lg sm:text-xl leading-relaxed max-w-md font-medium">
                Designing elite digital experiences. Available for select collaborations and visionary projects.
              </p>
            </motion.div>

            <motion.div 
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ 
                rotateX: 3, rotateY: -3, y: -8,
                boxShadow: "0 100px 150px -40px rgba(0, 0, 0, 1), 0 0 80px rgba(200, 169, 126, 0.15)"
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="luxury-glass-panel p-8 sm:p-12 rounded-[3.5rem] relative group/card shadow-2xl overflow-hidden cursor-default transition-all duration-500"
            >
              <div className="surface-streak" />
              <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-diag-sweep" />
              </div>
              <div className="absolute top-0 left-0 w-full h-full rounded-[3rem] border border-white/10 pointer-events-none group-hover/card:border-[#C8A97E]/30 transition-colors duration-500" />
              
              <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className="relative">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute -inset-16 bg-[#C8A97E]/20 rounded-full blur-[80px] pointer-events-none" 
                  />
                  <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border border-white/10 relative z-10 shadow-2xl group-hover/card:border-[#C8A97E]/60 transition-all duration-1000">
                    <img src={profileImg} alt="Phaniswar J." className="w-full h-full object-cover grayscale-[0.1] group-hover/card:grayscale-0 transition-all duration-1000 scale-[1.02] group-hover/card:scale-110" />
                    <div className="absolute inset-0 border-[4px] border-white/0 group-hover/card:border-white/10 rounded-full transition-all duration-700 pointer-events-none" />
                    <div className="absolute inset-0 border-[2px] border-[#C8A97E]/0 group-hover/card:border-[#C8A97E]/40 rounded-full transition-all duration-700 shadow-[inset_0_0_30px_rgba(200,163,115,0.4)] opacity-0 group-hover/card:opacity-100" />
                  </div>
                </div>
                <div className="text-center md:text-left flex-1">
                  <h3 className="text-3xl font-black text-white/95 mb-1 group-hover/card:text-[#C8A97E] transition-colors duration-300">Phaniswar J.</h3>
                  <p className="text-gray-400/80 font-medium text-sm mb-6 tracking-wide uppercase">Full Stack Developer</p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    {[
                      { icon: Github, href: 'https://github.com/phaniswar23' },
                      { icon: Linkedin, href: 'https://www.linkedin.com/in/phaniswar99/' },
                      { icon: Mail, href: 'mailto:phaniswar.janyavula@example.com' }
                    ].map((link, i) => (
                      <MagneticIcon key={i} Icon={link.icon} href={link.href} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Reactive Contact Form */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: luxuryTransition }
            }}
            animate={{ 
              y: [0, -6, 0], // Idle float
            }}
            transition={{
                y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ 
              rotateX, 
              rotateY,
              perspective: 1000,
              transformStyle: "preserve-3d"
            }}
            className="flex justify-center w-full"
          >
            <motion.div 
               ref={formRef}
               className={`w-full max-w-xl liquid-glass-form-container p-10 sm:p-14 rounded-[3.5rem] relative group/form shadow-2xl transition-all duration-700 ${isNearForm ? 'border-white/10' : 'border-white/5'}`}
            >
              <div className="surface-streak" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#C8A97E]/[0.05] to-transparent pointer-events-none" />
              
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <ReactiveInput 
                  label="Your Name" name="name" required 
                  value={formData.name} onChange={handleChange} 
                  setGlobalTyping={setIsTyping}
                />
                <ReactiveInput 
                  label="Email Address" name="email" type="email" required 
                  value={formData.email} onChange={handleChange} 
                  setGlobalTyping={setIsTyping}
                />
                <ReactiveInput 
                  label="Your Message" name="message" required isTextArea
                  value={formData.message} onChange={handleChange} 
                  setGlobalTyping={setIsTyping}
                />

                <div className="relative pt-4">
                  <motion.button
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-7 rounded-[1.5rem] premium-liquid-button text-white font-bold uppercase tracking-[0.3em] text-[10px] shadow-2xl flex items-center justify-center gap-4 relative z-10"
                  >
                    {status === 'loading' ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>GET IN TOUCH <ArrowRight size={14} /></>
                    )}
                  </motion.button>
                </div>

                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 backdrop-blur-md success-glow-pulse"
                    >
                      <CheckCircle2 size={16} /> Message Delivered
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
