import { motion } from 'framer-motion';
import { ExternalLink, Github, Lock } from 'lucide-react';

const projects = [
  {
    title: 'Neural Threat Detector',
    description: 'Real-time network intrusion detection using transformer-based anomaly detection with 97.3% accuracy.',
    tech: ['PyTorch', 'FastAPI', 'Redis', 'Docker'],
    category: 'AI + Security',
    status: 'DEPLOYED',
  },
  {
    title: 'Adversarial ML Toolkit',
    description: 'Open-source framework for generating and defending against adversarial attacks on vision models.',
    tech: ['Python', 'TensorFlow', 'NumPy'],
    category: 'Research',
    status: 'ACTIVE',
  },
  {
    title: 'CryptoGuard AI',
    description: 'Blockchain transaction analysis platform that detects fraudulent patterns using graph neural networks.',
    tech: ['GNN', 'Rust', 'PostgreSQL', 'React'],
    category: 'AI + FinTech',
    status: 'BETA',
  },
  {
    title: 'SecureVision',
    description: 'Privacy-preserving computer vision pipeline using federated learning for edge devices.',
    tech: ['PyTorch', 'ONNX', 'TensorRT', 'C++'],
    category: 'Edge AI',
    status: 'DEVELOPMENT',
  },
];

const statusColors: Record<string, string> = {
  DEPLOYED: 'text-matrix',
  ACTIVE: 'text-cyan',
  BETA: 'text-violet',
  DEVELOPMENT: 'text-muted-foreground',
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 hex-grid-bg" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs text-matrix/60 tracking-[0.3em] mb-2"
        >
          SECTION_04
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold text-gradient-primary mb-16"
        >
          Deployed Operations
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-panel-strong rounded-xl overflow-hidden group cursor-default
                hover:glow-indigo transition-all duration-500 relative"
            >
              {/* Confidential watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none
                opacity-[0.03] group-hover:opacity-0 transition-opacity duration-500">
                <span className="font-mono text-6xl font-bold text-foreground rotate-[-30deg]">
                  CONFIDENTIAL
                </span>
              </div>

              <div className="p-6 relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] tracking-wider text-muted-foreground">
                    {project.category}
                  </span>
                  <span className={`font-mono text-[10px] tracking-wider ${statusColors[project.status]}`}>
                    ● {project.status}
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
                    <span
                      key={t}
                      className="font-mono text-[10px] px-2 py-1 rounded bg-secondary/50 text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Accent line */}
                <div className="h-px w-0 group-hover:w-full transition-all duration-700 bg-gradient-to-r from-indigo via-cyan to-matrix-dim" />

                {/* Links */}
                <div className="flex items-center gap-4 mt-4">
                  <motion.a
                    href="#"
                    className="font-mono text-xs text-muted-foreground hover:text-cyan flex items-center gap-1 transition-colors"
                    whileHover={{ x: 2 }}
                  >
                    <Github size={12} /> Source
                  </motion.a>
                  <motion.a
                    href="#"
                    className="font-mono text-xs text-muted-foreground hover:text-matrix flex items-center gap-1 transition-colors"
                    whileHover={{ x: 2 }}
                  >
                    <ExternalLink size={12} /> Access Files →
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
