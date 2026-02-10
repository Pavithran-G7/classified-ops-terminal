import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const timeline = [
  {
    role: 'ML Research Intern',
    company: 'DeepCore Labs',
    period: 'Jun 2025 — Present',
    status: 'active',
    objectives: [
      'Developing adversarial robustness benchmarks for vision transformers',
      'Reduced model vulnerability by 34% through novel training techniques',
    ],
    tech: ['PyTorch', 'Weights & Biases', 'CUDA'],
  },
  {
    role: 'Security Analyst Intern',
    company: 'CyberShield Inc.',
    period: 'Jan 2025 — May 2025',
    status: 'completed',
    objectives: [
      'Automated vulnerability scanning pipeline using ML-powered triage',
      'Analyzed 200+ threat reports and contributed to incident response',
    ],
    tech: ['Python', 'Splunk', 'Nmap', 'Burp Suite'],
  },
  {
    role: 'Open Source Contributor',
    company: 'Various ML Projects',
    period: '2023 — Present',
    status: 'active',
    objectives: [
      'Contributed to HuggingFace Transformers and PyTorch Lightning',
      'Maintained personal adversarial ML toolkit with 500+ GitHub stars',
    ],
    tech: ['Python', 'Git', 'CI/CD'],
  },
];

const statusColors: Record<string, string> = {
  active: 'bg-cyan',
  completed: 'bg-matrix',
  future: 'bg-muted-foreground',
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 hex-grid-bg" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs text-matrix/60 tracking-[0.3em] mb-2"
        >
          SECTION_05
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold text-gradient-primary mb-16"
        >
          Field Experience
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-indigo via-cyan to-matrix-dim" />

          <div className="space-y-12">
            {timeline.map((item, i) => (
              <TimelineCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ item, index }: { item: typeof timeline[0]; index: number }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative pl-12 md:pl-16"
    >
      {/* Node */}
      <div className={`absolute left-2.5 md:left-4.5 top-1 w-3 h-3 rounded-full ${statusColors[item.status]} 
        ring-4 ring-background`}>
        {item.status === 'active' && (
          <span className="absolute inset-0 rounded-full bg-cyan animate-ping opacity-30" />
        )}
      </div>

      <div className="glass-panel rounded-xl p-5 hover:glow-indigo transition-all duration-500 group">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
          <h3 className="font-display font-bold text-foreground">{item.role}</h3>
          <span className="font-mono text-[10px] text-muted-foreground">{item.period}</span>
        </div>
        <p className="font-mono text-sm text-cyan/80 mb-3">{item.company}</p>

        <div className="font-mono text-xs text-muted-foreground mb-1 tracking-wider">
          {'>'} MISSION OBJECTIVES
        </div>
        <ul className="space-y-1 mb-4">
          {item.objectives.map((obj, j) => (
            <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-matrix mt-1 text-xs">▸</span>
              {obj}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {item.tech.map((t) => (
            <span key={t} className="font-mono text-[10px] px-2 py-1 rounded bg-secondary/50 text-muted-foreground">
              {t}
            </span>
          ))}
        </div>

        {/* Hover detail */}
        <span className="absolute top-3 right-3 font-mono text-[9px] text-matrix/0 group-hover:text-matrix/40 transition-all">
          ACCESS GRANTED
        </span>
      </div>
    </motion.div>
  );
}
