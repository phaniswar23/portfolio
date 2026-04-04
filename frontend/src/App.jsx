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
    <div className="min-h-screen bg-[#0B0B0D] text-white selection:bg-[#C8A97E]/30 overflow-x-hidden relative">
      <BackgroundFX />

      <AnimatePresence mode="wait">
        {showIntro && <Intro3DPro key="intro" onFinish={() => setShowIntro(false)} />}
      </AnimatePresence>

      {!showIntro && (
        <div className="relative z-10">
          <Navbar />
          <main className="will-change-transform">
            <section id="hero" className="will-change-transform bg-[#0B0B0D] relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,_rgba(255,255,255,0.05),_transparent_45%)] pointer-events-none" />
               <Hero />
            </section>
            
            <section id="about" className="will-change-transform bg-[#111113] relative border-t border-white/[0.02]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,_rgba(255,255,255,0.02)_0%,_transparent_60%)] pointer-events-none" />
              <About />
            </section>
            
            <section id="projects" className="will-change-transform bg-[#0B0B0D] relative border-t border-white/[0.02]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(255,255,255,0.035)_0%,_transparent_55%)] pointer-events-none" />
              <Projects />
            </section>
            
            <section id="tech" className="will-change-transform bg-[#111113] relative border-t border-white/[0.02]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.025)_0%,_transparent_60%)] pointer-events-none" />
              <TechStack />
            </section>
            
            <section id="certificates" className="will-change-transform bg-[#1A1A1D] relative border-t border-white/[0.02]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(255,255,255,0.015)_0%,_transparent_50%)] pointer-events-none" />
              <Certificates />
            </section>
            
            <section id="coding" className="will-change-transform bg-[#111113] relative border-t border-white/[0.02]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,_rgba(255,255,255,0.015)_0%,_transparent_40%)] pointer-events-none" />
              <CodingPlatforms />
            </section>
            
            <section id="education" className="will-change-transform bg-[#0B0B0D] relative border-t border-white/[0.02]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_35%,_rgba(255,255,255,0.01)_0%,_transparent_65%)] pointer-events-none" />
              <EducationJourney />
            </section>
            
            <section id="contact" className="will-change-transform bg-gradient-to-b from-[#111113] to-[#0B0B0D] relative border-t border-white/[0.02]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,_rgba(200,169,126,0.025)_0%,_transparent_50%)] pointer-events-none" />
              <Contact />
            </section>
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
