import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InteractionPresence = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = (e) => {
      const newClick = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setClicks((prev) => [...prev, newClick]);
      setTimeout(() => {
        setClicks((prev) => prev.filter((c) => c.id !== newClick.id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {/* ── Click Bursts ── */}
      <AnimatePresence>
        {clicks.map((click) => (
          <motion.div
            key={click.id}
            initial={{ opacity: 0.6, scale: 0 }}
            animate={{ opacity: 0, scale: 3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute w-12 h-12 rounded-full border border-blue-400/30 bg-blue-400/5 shadow-[0_0_20px_rgba(96,165,250,0.2)]"
            style={{
              left: click.x - 24,
              top: click.y - 24,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default InteractionPresence;
