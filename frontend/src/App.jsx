import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Intro3DPro from './components/Intro3DPro';
import BackgroundFX from './components/BackgroundFX';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import CodingPlatforms from './components/CodingPlatforms';
import Contact from './components/Contact';
import EducationJourney from './components/EducationJourney';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#6EE7F9]/30 overflow-x-hidden relative">
      <BackgroundFX />

      <AnimatePresence mode="wait">
        {showIntro && <Intro3DPro key="intro" onFinish={() => setShowIntro(false)} />}
      </AnimatePresence>

      {!showIntro && (
        <div className="relative z-10">
          <Navbar />
          <main className="will-change-transform">
            <section id="hero" className="will-change-transform"><Hero /></section>
            <section id="about" className="will-change-transform"><About /></section>
            <section id="projects" className="will-change-transform"><Projects /></section>
            <section id="tech" className="will-change-transform"><TechStack /></section>
            <section id="certificates" className="will-change-transform"><Certificates /></section>
            <section id="coding" className="will-change-transform"><CodingPlatforms /></section>
            <section id="education" className="will-change-transform"><EducationJourney /></section>
            <section id="contact" className="will-change-transform"><Contact /></section>
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
