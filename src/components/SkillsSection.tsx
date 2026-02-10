import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
  Brain, Shield, Code2, Cloud, Database, Terminal,
  Cpu, Lock, Network, Blocks, Layers, Fingerprint
} from 'lucide-react';

const categories = ['All', 'Languages', 'ML Frameworks', 'Security', 'Cloud'];

const skillsData = [
  { name: 'Python', category: 'Languages', icon: Code2, proficiency: 92, accent: 'indigo' },
  { name: 'TypeScript', category: 'Languages', icon: Blocks, proficiency: 85, accent: 'indigo' },
  { name: 'Rust', category: 'Languages', icon: Terminal, proficiency: 68, accent: 'indigo' },
  { name: 'C++', category: 'Languages', icon: Cpu, proficiency: 72, accent: 'indigo' },
  { name: 'PyTorch', category: 'ML Frameworks', icon: Brain, proficiency: 90, accent: 'cyan' },
  { name: 'TensorFlow', category: 'ML Frameworks', icon: Layers, proficiency: 82, accent: 'cyan' },
  { name: 'Scikit-Learn', category: 'ML Frameworks', icon: Network, proficiency: 88, accent: 'cyan' },
  { name: 'HuggingFace', category: 'ML Frameworks', icon: Brain, proficiency: 78, accent: 'cyan' },
  { name: 'Burp Suite', category: 'Security', icon: Shield, proficiency: 75, accent: 'matrix' },
  { name: 'Nmap', category: 'Security', icon: Lock, proficiency: 80, accent: 'matrix' },
  { name: 'Wireshark', category: 'Security', icon: Fingerprint, proficiency: 70, accent: 'matrix' },
  { name: 'AWS', category: 'Cloud', icon: Cloud, proficiency: 76, accent: 'indigo' },
  { name: 'Docker', category: 'Cloud', icon: Database, proficiency: 84, accent: 'indigo' },
  { name: 'GCP', category: 'Cloud', icon: Cloud, proficiency: 70, accent: 'indigo' },
];

const accentMap: Record<string, { border: string; text: string; glow: string }> = {
  indigo: { border: 'border-indigo/30 hover:border-indigo/60', text: 'text-indigo', glow: 'hover:shadow-[0_0_20px_hsla(239,84%,67%,0.15)]' },
  cyan: { border: 'border-cyan/30 hover:border-cyan/60', text: 'text-cyan', glow: 'hover:shadow-[0_0_20px_hsla(187,94%,43%,0.15)]' },
  matrix: { border: 'border-matrix/30 hover:border-matrix/60', text: 'text-matrix', glow: 'hover:shadow-[0_0_20px_hsla(120,100%,50%,0.1)]' },
};

export default function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { ref, isVisible } = useScrollReveal();

  const filtered = activeFilter === 'All'
    ? skillsData
    : skillsData.filter(s => s.category === activeFilter);

  return (
    <section id="skills" className="relative py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 hex-grid-bg" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs text-matrix/60 tracking-[0.3em] mb-2"
        >
          SECTION_03
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold text-gradient-primary mb-8"
        >
          Tech Arsenal
        </motion.h2>

        {/* Filter tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`font-mono text-xs px-4 py-2 rounded-lg transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'glass-panel text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((skill, i) => {
            const accent = accentMap[skill.accent];
            return (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className={`glass-panel rounded-xl p-5 flex flex-col items-center gap-3 cursor-default
                  transition-all duration-300 ${accent.border} ${accent.glow} group`}
              >
                <skill.icon className={`w-7 h-7 ${accent.text} transition-colors`} />
                <span className="font-mono text-xs text-foreground text-center">{skill.name}</span>
                {/* Proficiency bar */}
                <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: skill.accent === 'matrix'
                        ? 'hsl(120, 100%, 50%)'
                        : skill.accent === 'cyan'
                        ? 'hsl(187, 94%, 43%)'
                        : 'hsl(239, 84%, 67%)',
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.05 }}
                  />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  {skill.proficiency}%
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
