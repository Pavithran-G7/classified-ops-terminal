import { motion } from 'framer-motion';
import { ExternalLink, Github, Brain, Shield } from 'lucide-react';
import FloatingNodesBg from './backgrounds/FloatingNodesBg';
import Antigravity from './animations/Antigravity';

const projects = [
  {
    title: 'Neural Threat Detector',
    description: 'Real-time network intrusion detection using transformer-based anomaly detection achieving 97.3% accuracy on benchmark datasets.',
    tech: ['PyTorch', 'Transformers', 'FastAPI', 'Docker'],
    category: 'AI · Security',
    status: 'DEPLOYED',
    icon: Brain,
    accent: 'indigo',
  },
  {
    title: 'Adversarial ML Toolkit',
    description: 'Open-source framework for generating & defending against adversarial attacks on vision models. 500+ GitHub stars.',
    tech: ['Python', 'TensorFlow', 'NumPy', 'CI/CD'],
    category: 'AI Research',
    status: 'ACTIVE',
    icon: Brain,
    accent: 'cyan',
  },
  {
    title: 'CryptoGuard AI',
    description: 'Blockchain transaction analysis platform detecting fraudulent patterns using graph neural networks with 94% precision.',
    tech: ['GNN', 'PyG', 'PostgreSQL', 'React'],
    category: 'AI · FinTech',
    status: 'BETA',
    icon: Brain,
    accent: 'violet',
  },
  {
    title: 'SecureVision Edge',
    description: 'Privacy-preserving computer vision pipeline using federated learning — runs entirely on-device, zero data exfiltration.',
    tech: ['PyTorch', 'ONNX', 'TensorRT', 'C++'],
    category: 'Edge AI',
    status: 'DEVELOPMENT',
    icon: Shield,
    accent: 'matrix',
  },
];

const statusConfig: Record<string, { label: string; class: string }> = {
  DEPLOYED:    { label: '● DEPLOYED',    class: 'text-cyan' },
  ACTIVE:      { label: '● ACTIVE',      class: 'text-indigo' },
  BETA:        { label: '● BETA',        class: 'text-violet' },
  DEVELOPMENT: { label: '◌ IN DEV',     class: 'text-muted-foreground' },
};

const accentGlow: Record<string, string> = {
  indigo: 'hover:shadow-[0_0_30px_hsla(239,84%,67%,0.15)] hover:border-indigo/40',
  cyan:   'hover:shadow-[0_0_30px_hsla(187,94%,43%,0.15)] hover:border-cyan/40',
  violet: 'hover:shadow-[0_0_30px_hsla(258,90%,66%,0.15)] hover:border-violet/40',
  matrix: 'hover:shadow-[0_0_30px_hsla(120,100%,50%,0.1)] hover:border-matrix/30',
};

const accentBar: Record<string, string> = {
  indigo: 'from-indigo via-cyan to-cyan/30',
  cyan:   'from-cyan via-indigo to-indigo/30',
  violet: 'from-violet via-indigo to-indigo/30',
  matrix: 'from-matrix via-cyan to-cyan/30',
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 hex-grid-bg" />

      {/* Antigravity particle field — interactive, mouse-following */}
      <div className="absolute inset-0 pointer-events-none">
        <Antigravity
          count={380}
          magnetRadius={6}
          ringRadius={13}
          waveSpeed={0.2}
          waveAmplitude={1}
          particleSize={1.5}
          lerpSpeed={0.17}
          color="#6366f1"
          autoAnimate={true}
          particleVariance={1}
          rotationSpeed={0}
          depthFactor={1}
          pulseSpeed={3}
          particleShape="capsule"
          fieldStrength={10}
        />
      </div>

      {/* Ambient glow — indigo dominant */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[140px]"
          style={{ background: 'radial-gradient(ellipse, hsla(239,84%,67%,0.06), transparent)' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs text-indigo/60 tracking-[0.3em] mb-2"
        >
          MODULE_04
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold text-gradient-primary mb-2"
        >
          AI Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs text-muted-foreground mb-8 tracking-wider"
        >
          {'>'} MODELS TRAINED · SYSTEMS SHIPPED · RESEARCH PUBLISHED
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => {
            const status = statusConfig[project.status];
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className={`glass-panel-strong rounded-xl overflow-hidden group cursor-default
                  transition-all duration-500 relative border ${accentGlow[project.accent]}`}
              >
                <div className="p-6 relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] tracking-wider text-muted-foreground">
                      {project.category}
                    </span>
                    <span className={`font-mono text-[10px] tracking-wider ${status.class}`}>
                      {status.label}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-foreground mb-2 group-hover:text-gradient-primary transition-all">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.map((t) => (
                      <span key={t} className="font-mono text-[10px] px-2 py-1 rounded bg-secondary/50 text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Accent line */}
                  <div className={`h-px w-0 group-hover:w-full transition-all duration-700 bg-gradient-to-r ${accentBar[project.accent]}`} />

                  {/* Links */}
                  <div className="flex items-center gap-4 mt-4">
                    <motion.a href="#" className="font-mono text-xs text-muted-foreground hover:text-cyan flex items-center gap-1 transition-colors" whileHover={{ x: 2 }}>
                      <Github size={12} /> Source
                    </motion.a>
                    <motion.a href="#" className="font-mono text-xs text-muted-foreground hover:text-indigo flex items-center gap-1 transition-colors" whileHover={{ x: 2 }}>
                      <ExternalLink size={12} /> Live Demo →
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
