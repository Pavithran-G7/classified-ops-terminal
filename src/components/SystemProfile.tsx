import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTypewriter } from '@/hooks/useTypewriter';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import MatrixRain from './MatrixRain';
import CircuitBoardBg from './backgrounds/CircuitBoardBg';
import { Download, Github, Linkedin, Shield } from 'lucide-react';

/* ── Personnel Data ─────────────────────────────── */
const personnelData = [
  { label: 'ID',        value: 'KIRAN_RAJ_S',              color: 'text-foreground' },
  { label: 'ROLE',      value: 'AI / ML ENGINEER',         color: 'text-cyan' },
  { label: 'FOCUS',     value: 'DEEP LEARNING · NLP · CV', color: 'text-indigo' },
  { label: 'SEC_LEVEL', value: 'CYBERSECURITY ENTHUSIAST', color: 'text-matrix/80' },
  { label: 'STATUS',    value: 'OPEN TO WORK — BANGALORE', color: 'text-cyan' },
];

const skills = [
  { name: 'AI / Machine Learning', value: 90, color: 'stroke-indigo' },
  { name: 'Full-Stack Dev',        value: 85, color: 'stroke-cyan' },
  { name: 'Cybersecurity',         value: 78, color: 'stroke-matrix' },
];

const socialLinks = [
  { icon: Github,   label: 'GitHub',    latency: '12ms', href: '#' },
  { icon: Linkedin, label: 'LinkedIn',  latency: '18ms', href: '#' },
  { icon: Shield,   label: 'TryHackMe', latency: '24ms', href: '#' },
];

/* ── Typing line ─────────────────────────────────── */
function TerminalLine({ label, value, color, delay, enabled }: {
  label: string; value: string; color: string; delay: number; enabled: boolean;
}) {
  const { displayed, isComplete } = useTypewriter({ text: `${label}: ${value}`, speed: 35, delay, enabled });
  return (
    <div className="font-mono text-sm flex">
      <span className="text-muted-foreground mr-1">│</span>
      <span className="text-muted-foreground">{displayed.split(':')[0]}</span>
      {displayed.includes(':') && <span className="text-muted-foreground">:</span>}
      <span className={`ml-1 ${color}`}>
        {displayed.includes(':') ? displayed.split(':').slice(1).join(':') : ''}
      </span>
      {!isComplete && <span className="terminal-cursor" />}
    </div>
  );
}

/* ── Skill Ring ──────────────────────────────────── */
function SkillRing({ name, value, color, delay }: {
  name: string; value: number; color: string; delay: number;
}) {
  const { ref, isVisible } = useScrollReveal();
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (value / 100) * circumference;
  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" className="stroke-border" strokeWidth="3" fill="none" />
          <circle
            cx="50" cy="50" r="40"
            className={`skill-ring ${color}`}
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={isVisible ? offset : circumference}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-lg font-bold text-foreground">{isVisible ? value : 0}%</span>
        </div>
      </div>
      <span className="font-mono text-xs text-muted-foreground text-center">{name}</span>
    </motion.div>
  );
}

/* ── Main Component ───────────────────────────────── */
export default function SystemProfile() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [personnelRevealed, setPersonnelRevealed] = useState(false);
  const [dossierDownloading, setDossierDownloading] = useState(false);
  const [dossierComplete, setDossierComplete] = useState(false);

  const headerType = useTypewriter({
    text: 'AI ENGINEER PROFILE // KIRAN RAJ S',
    speed: 40,
    delay: 300,
    enabled: isInView,
    onComplete: () => setTimeout(() => setPersonnelRevealed(true), 400),
  });

  const handleDownload = () => {
    setDossierDownloading(true);
    setTimeout(() => {
      setDossierDownloading(false);
      setDossierComplete(true);
      setTimeout(() => setDossierComplete(false), 3000);
    }, 2000);
  };

  return (
    <section id="about" className="relative py-12 md:py-16 overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 hex-grid-bg" />
      <CircuitBoardBg opacity={0.6} />
      <MatrixRain opacity={0.02} />

      {/* Ambient AI gradient blobs — indigo/cyan dominant */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, hsla(239,84%,67%,0.12), transparent)' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, hsla(187,94%,43%,0.09), transparent)' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs text-indigo/60 tracking-[0.3em] mb-2"
        >
          MODULE_02
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold text-gradient-primary mb-8"
        >
          Model Profile
        </motion.h2>

        <motion.div
          className="glass-panel-strong rounded-xl overflow-hidden glow-indigo"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Terminal bar */}
          <div className="flex items-center gap-2 px-6 py-3 border-b border-border bg-secondary/30">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-indigo/60" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">
              {headerType.displayed}
              {!headerType.isComplete && <span className="terminal-cursor" />}
            </span>
          </div>

          <div className="p-6 md:p-10 space-y-10">
            {/* Personnel Data */}
            <div>
              <div className="font-mono text-xs text-indigo/70 mb-3 tracking-wider">
                {'>'} ENGINEER DATA
              </div>
              <div className="glass-panel rounded-lg p-4 space-y-1 relative">
                <div className="font-mono text-sm text-muted-foreground">
                  ┌─────────────────────────────────────┐
                </div>
                {personnelData.map((item, i) => (
                  <TerminalLine key={item.label} {...item} delay={i * 600} enabled={personnelRevealed} />
                ))}
                <div className="font-mono text-sm text-muted-foreground">
                  └─────────────────────────────────────┘
                </div>
              </div>
            </div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, rotateY: 90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ perspective: 1000 }}
            >
              <div className="font-mono text-xs text-indigo/70 mb-3 tracking-wider">
                {'>'} ACADEMIC MODULE
              </div>
              <div className="glass-panel rounded-lg p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-indigo/10 border border-indigo/20 flex items-center justify-center text-indigo font-display font-bold text-xl">
                    B
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground">
                      B.Tech — Computer Science &amp; Engineering
                    </h3>
                    <p className="font-mono text-sm text-muted-foreground">
                      VIT University, Vellore · 2022 — 2026
                    </p>
                    <p className="font-mono text-xs text-indigo/70 mt-1">
                      Specialisation: Machine Learning · Deep Learning · Network Security
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Capabilities */}
            <div>
              <div className="font-mono text-xs text-indigo/70 mb-6 tracking-wider">
                {'>'} CORE CAPABILITIES
              </div>
              <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                {skills.map((skill, i) => (
                  <SkillRing key={skill.name} {...skill} delay={i * 0.2} />
                ))}
              </div>
            </div>

            {/* Bio — 75% AI, 25% cyber framing */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="font-mono text-xs text-indigo/70 mb-3 tracking-wider">
                {'>'} ABOUT
              </div>
              <div className="glass-panel rounded-lg p-5">
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground font-body">
                  Final-year{' '}
                  <span className="text-indigo font-mono text-sm">Computer Science</span> student
                  passionate about building intelligent systems that learn, adapt, and reason.
                  I specialise in{' '}
                  <span className="text-cyan font-mono text-sm">deep learning architectures</span>,{' '}
                  <span className="text-cyan font-mono text-sm">NLP pipelines</span>, and{' '}
                  <span className="text-indigo font-mono text-sm">computer vision</span> — from
                  research prototypes to production deployments. With a secondary passion for{' '}
                  <span className="text-matrix/80 font-mono text-sm">adversarial ML</span> and{' '}
                  <span className="text-matrix/80 font-mono text-sm">AI security</span>,
                  I explore how intelligent models can both{' '}
                  <span className="text-indigo font-mono text-sm">attack and defend</span> complex systems.
                  Always building. Always shipping.
                </p>
              </div>
            </motion.div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <motion.button
                onClick={handleDownload}
                disabled={dossierDownloading}
                className="glass-panel rounded-lg px-6 py-3 font-mono text-sm group
                  hover:border-indigo/50 hover:glow-indigo transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {dossierDownloading ? (
                  <div className="flex items-center gap-3">
                    <div className="h-1 w-32 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-indigo rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2 }}
                      />
                    </div>
                    <span className="text-indigo text-xs">COMPILING...</span>
                  </div>
                ) : dossierComplete ? (
                  <span className="text-cyan">✓ RESUME READY</span>
                ) : (
                  <span className="flex items-center gap-2 text-foreground">
                    <Download size={14} className="text-indigo" />
                    Download Resume
                  </span>
                )}
              </motion.button>

              <div className="flex items-center gap-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="glass-panel rounded-lg px-4 py-2 flex items-center gap-2 font-mono text-xs
                      text-muted-foreground hover:text-cyan hover:border-cyan/30 transition-all duration-300 group"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <link.icon size={14} />
                    <span className="hidden sm:inline">{link.label}</span>
                    <span className="text-cyan/0 group-hover:text-cyan/60 transition-all text-[10px]">
                      {link.latency}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
