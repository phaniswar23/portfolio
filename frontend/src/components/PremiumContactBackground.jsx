import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

const PremiumContactBackground = ({ isTyping = false, isNearForm = false }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  // Floating particles system (Layer 3)
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const particleCount = 40; 

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.speedY = (Math.random() - 0.5) * 0.15;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.parallaxFactor = Math.random() * 25 + 10;
      }

      update(mouseX, mouseY) {
        this.baseX += this.speedX;
        this.baseY += this.speedY;

        const parallaxX = (mouseX - 0.5) * this.parallaxFactor;
        const parallaxY = (mouseY - 0.5) * this.parallaxFactor;

        this.x = this.baseX + parallaxX;
        this.y = this.baseY + parallaxY;

        if (this.baseX < 0) this.baseX = canvas.width;
        if (this.baseX > canvas.width) this.baseX = 0;
        if (this.baseY < 0) this.baseY = canvas.height;
        if (this.baseY > canvas.height) this.baseY = 0;
      }

      draw() {
        ctx.fillStyle = `rgba(200, 169, 126, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update(mouse.x, mouse.y);
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouse]);

  const handleMouseMove = (e) => {
    setMouse({ 
      x: e.clientX / window.innerWidth, 
      y: e.clientY / window.innerHeight 
    });
  };

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 60, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const moveGlow = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveGlow);
    return () => window.removeEventListener('mousemove', moveGlow);
  }, [cursorX, cursorY]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none"
      style={{ background: '#0B0B0C' }}
    >
      {/* ── Layer 1: Gradient Mesh (Intelligent Reactivity) ── */}
      <motion.div 
        animate={{ 
          opacity: isNearForm ? 0.6 : 0.4,
          scale: isTyping ? 1.02 : 1
        }}
        className="absolute inset-0 transition-all duration-1000"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(20,20,22,1)_0%,_transparent_70%)] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_rgba(15,15,17,1)_0%,_transparent_70%)] animate-pulse-slow delay-1000" />
        
        <motion.div 
          animate={{ 
            rotate: isTyping ? [0, 1, 0] : 0, 
            transition: { duration: 2, repeat: Infinity } 
          }}
          className="absolute -inset-[50%] opacity-30 will-change-transform" 
          style={{
            backgroundImage: `
              radial-gradient(at 0% 0%, rgba(200, 169, 126, 0.05) 0px, transparent 50%),
              radial-gradient(at 50% 0%, rgba(255, 255, 255, 0.02) 0px, transparent 50%),
              radial-gradient(at 100% 0%, rgba(200, 169, 126, 0.05) 0px, transparent 50%),
              radial-gradient(at 0% 50%, rgba(255, 255, 255, 0.02) 0px, transparent 50%),
              radial-gradient(at 100% 50%, rgba(200, 169, 126, 0.05) 0px, transparent 50%),
              radial-gradient(at 0% 100%, rgba(200, 169, 126, 0.05) 0px, transparent 50%),
              radial-gradient(at 50% 100%, rgba(255, 255, 255, 0.02) 0px, transparent 50%),
              radial-gradient(at 100% 100%, rgba(200, 169, 126, 0.05) 0px, transparent 50%)
            `,
            backgroundSize: '50% 50%',
            animation: 'mesh-float 60s linear infinite'
          }}
        />
      </motion.div>

      {/* ── Layer: Glassmorphism Style Blurred Light Blobs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div 
          animate={{ 
            scale: isNearForm ? 1.2 : 1,
            opacity: isNearForm ? 0.4 : 0.2
          }}
          className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-[#C8A97E] blur-[120px] rounded-full animate-blob-float" 
        />
        <motion.div 
          animate={{ 
            scale: isNearForm ? 1.1 : 1,
            opacity: isNearForm ? 0.3 : 0.2
          }}
          className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-[#A1A1AA] blur-[120px] rounded-full animate-blob-float-delayed" 
        />
      </div>

      {/* ── Layer 2: Soft Noise Texture ── */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none z-10">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* ── Ambient Pulses synced with typing ── */}
      <AnimatePresence>
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-0 bg-[#C8A97E]/5 blur-[100px] z-10 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* ── Layer 3: Floating particles or light dust (Parallax) ── */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-20 pointer-events-none will-change-transform"
      />

      {/* ── Layer 4: Radial glow following cursor ── */}
      <motion.div 
        style={{
          left: springX,
          top: springY,
          x: '-50%',
          y: '-50%'
        }}
        className="absolute w-[800px] h-[800px] bg-radial-glow opacity-40 z-30 pointer-events-none mix-blend-screen"
      />

      {/* ── Cinematic Polish: Soft Vignetting ── */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.5)_100%)] z-40 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.6)]" />
      
      <style>{`
        @keyframes mesh-float {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(2deg) scale(1.1); }
          100% { transform: rotate(0deg) scale(1); }
        }
        @keyframes blob-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(5%, 5%) scale(1.1); }
          66% { transform: translate(-5%, 2%) scale(0.9); }
        }
        @keyframes blob-float-delayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-5%, -5%) scale(1.1); }
          66% { transform: translate(5%, -2%) scale(0.9); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        .bg-radial-glow {
          background: radial-gradient(circle, rgba(200, 169, 126, 0.1) 0%, transparent 70%);
          filter: blur(80px);
        }
      `}</style>
    </div>
  );
};

export default PremiumContactBackground;
