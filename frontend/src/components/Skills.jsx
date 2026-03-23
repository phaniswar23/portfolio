import React from 'react';
import { motion } from 'framer-motion';

// For a real app, you would use actual SVG logos. We will use stylized text blocks for now to simulate logos.
const skillsRow1 = ['React', 'Node.js', 'MongoDB', 'Express'];
const skillsRow2 = ['Java', 'C++', 'JavaScript'];

const Skills = () => {
  return (
    <section className="py-24 px-6 relative max-w-5xl mx-auto border-t border-white/5">
      <div className="text-center mb-16 z-10 relative">
        <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4">
          Core Technologies
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center space-y-8 z-10 relative">
        {/* Row 1 */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {skillsRow1.map((skill, idx) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-center text-gray-400 hover:text-white transition-colors duration-300 group cursor-default"
            >
              <span className="text-xl md:text-2xl font-semibold tracking-tight">{skill}</span>
            </motion.div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {skillsRow2.map((skill, idx) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (idx + skillsRow1.length) * 0.1 }}
              className="flex items-center text-gray-400 hover:text-white transition-colors duration-300 group cursor-default"
            >
              <span className="text-xl md:text-2xl font-semibold tracking-tight">{skill}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
