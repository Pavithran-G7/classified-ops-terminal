import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Shield, Code2, Cloud, Database, Terminal,
  Cpu, Lock, Network, Blocks, Layers, Fingerprint,
  Zap, Server, GitBranch
} from 'lucide-react';
import DataStreamBg from './backgrounds/DataStreamBg';

const categories = ['All', 'Languages', 'ML Frameworks', 'Security', 'Cloud'];

const skillsData = [
  { name: 'Python',      category: 'Languages',     icon: Code2,       proficiency: 92, accent: 'indigo',  tag: 'Primary' },
  { name: 'TypeScript',  category: 'Languages',     icon: Blocks,      proficiency: 85, accent: 'indigo',  tag: 'Advanced' },
  { name: 'Rust',        category: 'Languages',     icon: Terminal,    proficiency: 68, accent: 'indigo',  tag: 'Learning' },
  { name: 'C++',         category: 'Languages',     icon: Cpu,         proficiency: 72, accent: 'indigo',  tag: 'Proficient' },
  { name: 'PyTorch',     category: 'ML Frameworks', icon: Brain,       proficiency: 90, accent: 'cyan',    tag: 'Expert' },
  { name: 'TensorFlow',  category: 'ML Frameworks', icon: Layers,      proficiency: 82, accent: 'cyan',    tag: 'Advanced' },
  { name: 'Scikit-Learn',category: 'ML Frameworks', icon: Network,     proficiency: 88, accent: 'cyan',    tag: 'Expert' },
  { name: 'HuggingFace', category: 'ML Frameworks', icon: Zap,         proficiency: 78, accent: 'cyan',    tag: 'Proficient' },
  { name: 'Burp Suite',  category: 'Security',      icon: Shield,      proficiency: 75, accent: 'matrix',  tag: 'Active' },
  { name: 'Nmap',        category: 'Security',      icon: Lock,        proficiency: 80, accent: 'matrix',  tag: 'Active' },
  { name: 'Wireshark',   category: 'Security',      icon: Fingerprint, proficiency: 70, accent: 'matrix',  tag: 'Proficient' },
  { name: 'AWS',         category: 'Cloud',         icon: Cloud,       proficiency: 76, accent: 'violet',  tag: 'Certified' },
  { name: 'Docker',      category: 'Cloud',         icon: Server,      proficiency: 84, accent: 'violet',  tag: 'Advanced' },
  { name: 'GCP',         category: 'Cloud',         icon: Database,    proficiency: 70, accent: 'violet',  tag: 'Familiar' },
  { name: 'Git/CI/CD',   category: 'Cloud',         icon: GitBranch,   proficiency: 88, accent: 'violet',  tag: 'Expert' },
];

/* HSL values per accent — must match CSS vars */
const accentHSL: Record<string, string> = {
  indigo: '239,84%,67%',
  cyan:   '187,94%,43%',
  matrix: '120,100%,50%',
  violet: '258,90%,66%',
};

const accentClasses: Record<string, { text: string; border: string; badge: string }> = {
  indigo: { text: 'text-indigo',  border: 'border-indigo/20 hover:border-indigo/60',  badge: 'bg-indigo/10 text-indigo' },
  cyan:   { text: 'text-cyan',    border: 'border-cyan/20 hover:border-cyan/60',      badge: 'bg-cyan/10 text-cyan' },
  matrix: { text: 'text-matrix',  border: 'border-matrix/20 hover:border-matrix/60',  badge: 'bg-matrix/10 text-matrix' },
  violet: { text: 'text-violet',  border: 'border-violet/20 hover:border-violet/60',  badge: 'bg-violet/10 text-violet' },
};

const categoryBadge: Record<string, string> = {
  'All': 'text-foreground',
  'Languages': 'text-indigo',
  'ML Frameworks': 'text-cyan',
  'Security': 'text-matrix',
  'Cloud': 'text-violet',
};

export default function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = activeFilter === 'All'
    ? skillsData
    : skillsData.filter(s => s.category === activeFilter);

  return (
    <section id="skills" className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 hex-grid-bg" />
      <DataStreamBg />

      {/* Ambient gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, hsla(239,84%,67%,0.06), transparent)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, hsla(187,94%,43%,0.06), transparent)' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs text-indigo/60 tracking-[0.3em] mb-2"
        >
          MODULE_03
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold text-gradient-primary mb-2"
        >
          Tech Arsenal
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs text-muted-foreground mb-8 tracking-wider"
        >
          {'>'} HOVER NODES FOR PROFICIENCY READOUT
        </motion.p>

        {/* Filter pills */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`relative font-mono text-xs px-5 py-2 rounded-full transition-all duration-300 border overflow-hidden ${
                activeFilter === cat
                  ? 'border-transparent text-background font-semibold'
                  : 'glass-panel text-muted-foreground hover:text-foreground border-border hover:border-foreground/20'
              }`}
              style={activeFilter === cat ? {
                background: `linear-gradient(135deg, hsl(${
                  cat === 'Languages' ? accentHSL.indigo :
                  cat === 'ML Frameworks' ? accentHSL.cyan :
                  cat === 'Security' ? accentHSL.matrix :
                  cat === 'Cloud' ? accentHSL.violet :
                  '239,84%,67%'
                }), hsl(${
                  cat === 'Languages' ? accentHSL.cyan :
                  cat === 'ML Frameworks' ? accentHSL.violet :
                  cat === 'Security' ? '187,94%,43%' :
                  cat === 'Cloud' ? accentHSL.indigo :
                  '187,94%,43%'
                }))`
              } : {}}
            >
              <span className={activeFilter === cat ? '' : categoryBadge[cat]}>{cat}</span>
              {activeFilter === cat && (
                <motion.span
                  layoutId="filter-dot"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-background/60"
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => {
              const ac = accentClasses[skill.accent];
              const hsl = accentHSL[skill.accent];
              const isHov = hovered === skill.name;
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: 10 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  whileHover={{ y: -6, scale: 1.04 }}
                  onHoverStart={() => setHovered(skill.name)}
                  onHoverEnd={() => setHovered(null)}
                  className={`relative glass-panel rounded-2xl p-4 md:p-5 flex flex-col items-center gap-2.5
                    cursor-default transition-all duration-300 border group ${ac.border}`}
                  style={isHov ? {
                    boxShadow: `0 0 28px hsla(${hsl},0.2), 0 0 60px hsla(${hsl},0.08)`,
                  } : {}}
                >
                  {/* Top-right tag */}
                  <span className={`absolute top-2 right-2 font-mono text-[8px] px-1.5 py-0.5 rounded-full tracking-wide ${ac.badge}`}>
                    {skill.tag}
                  </span>

                  {/* Icon container with glow ring */}
                  <div className="relative mt-1">
                    <div
                      className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{
                        background: `hsla(${hsl},0.1)`,
                        border: `1px solid hsla(${hsl},${isHov ? '0.5' : '0.2'})`,
                      }}
                    >
                      <skill.icon
                        className={`w-5 h-5 md:w-6 md:h-6 ${ac.text} transition-all duration-300`}
                        strokeWidth={1.5}
                      />
                    </div>
                    {/* Pulse ring on hover */}
                    {isHov && (
                      <motion.div
                        className="absolute inset-0 rounded-xl"
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        style={{ border: `1px solid hsla(${hsl},0.5)` }}
                      />
                    )}
                  </div>

                  {/* Name */}
                  <span className="font-mono text-[11px] md:text-xs text-foreground text-center leading-tight px-1">
                    {skill.name}
                  </span>

                  {/* Proficiency arc bar */}
                  <div className="w-full space-y-1">
                    <div className="w-full h-[3px] bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, hsla(${hsl},0.6), hsl(${hsl}))` }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.2 + i * 0.04, ease: 'easeOut' }}
                      />
                    </div>
                    <div className="flex justify-between items-center px-0.5">
                      <span className="font-mono text-[9px] text-muted-foreground/60">{skill.category.split(' ')[0]}</span>
                      <motion.span
                        className={`font-mono text-[9px] font-semibold ${ac.text}`}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.2 + i * 0.04 }}
                      >
                        {skill.proficiency}%
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Summary stats */}
        <motion.div
          className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { label: 'Languages', count: skillsData.filter(s=>s.category==='Languages').length, color: 'text-indigo', hsl: accentHSL.indigo },
            { label: 'ML Frameworks', count: skillsData.filter(s=>s.category==='ML Frameworks').length, color: 'text-cyan', hsl: accentHSL.cyan },
            { label: 'Security Tools', count: skillsData.filter(s=>s.category==='Security').length, color: 'text-matrix', hsl: accentHSL.matrix },
            { label: 'Cloud / DevOps', count: skillsData.filter(s=>s.category==='Cloud').length, color: 'text-violet', hsl: accentHSL.violet },
          ].map(stat => (
            <div
              key={stat.label}
              className="glass-panel rounded-xl px-4 py-3 flex items-center gap-3"
              style={{ borderColor: `hsla(${stat.hsl},0.2)` }}
            >
              <span className={`font-display font-bold text-2xl ${stat.color}`}>{stat.count}</span>
              <span className="font-mono text-[10px] text-muted-foreground leading-tight">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
