import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import RadarSweepBg from './backgrounds/RadarSweepBg';

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

// SVG path constants
const PATH_PADDING_TOP = 40;
const CARD_SPACING = 260;
const CHECKPOINT_OFFSETS = timeline.map((_, i) => PATH_PADDING_TOP + 60 + i * CARD_SPACING);
const TOTAL_HEIGHT = CHECKPOINT_OFFSETS[CHECKPOINT_OFFSETS.length - 1] + 80;

function buildSvgPath(width: number): string {
  const cx = width / 2;
  const amplitude = Math.min(width * 0.28, 200);
  let d = `M ${cx} ${PATH_PADDING_TOP}`;
  CHECKPOINT_OFFSETS.forEach((y, i) => {
    const dir = i % 2 === 0 ? -1 : 1;
    const cpY = i === 0 ? PATH_PADDING_TOP + (y - PATH_PADDING_TOP) / 2 : (CHECKPOINT_OFFSETS[i - 1] + y) / 2;
    d += ` S ${cx + dir * amplitude} ${cpY}, ${cx + dir * amplitude * 0.6} ${y}`;
  });
  d += ` S ${cx} ${TOTAL_HEIGHT - 40}, ${cx} ${TOTAL_HEIGHT}`;
  return d;
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [containerWidth, setContainerWidth] = useState(800);
  const [markerPos, setMarkerPos] = useState({ x: 0, y: 0, angle: 0 });

  const svgPath = useMemo(() => buildSvgPath(containerWidth), [containerWidth]);

  // Measure container
  useEffect(() => {
    const measure = () => {
      if (sectionRef.current) {
        setContainerWidth(sectionRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Measure path length
  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [svgPath]);

  // Scroll progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 40%'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // Path drawing
  const strokeDashoffset = useTransform(smoothProgress, [0, 1], [pathLength, 0]);

  // Card thresholds — each card appears at its checkpoint fraction
  const cardThresholds = useMemo(
    () => CHECKPOINT_OFFSETS.map((y) => (y - PATH_PADDING_TOP) / (TOTAL_HEIGHT - PATH_PADDING_TOP)),
    []
  );

  // Update marker position
  useMotionValueEvent(smoothProgress, 'change', (v) => {
    if (!pathRef.current || pathLength === 0) return;
    const len = v * pathLength;
    const pt = pathRef.current.getPointAtLength(len);
    const pt2 = pathRef.current.getPointAtLength(Math.min(len + 2, pathLength));
    const angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * (180 / Math.PI);
    setMarkerPos({ x: pt.x, y: pt.y, angle });
  });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-12 md:py-16 overflow-hidden"
    >
      <div className="absolute inset-0 hex-grid-bg" />
      <RadarSweepBg />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs text-indigo/60 tracking-[0.3em] mb-2"
        >
          MODULE_05
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold text-gradient-primary mb-4"
        >
          Experience
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs text-muted-foreground mb-8 tracking-wider"
        >
          {'>'} SCROLL TO NAVIGATE CAREER PATH
        </motion.p>

        {/* Timeline container */}
        <div className="relative" style={{ height: TOTAL_HEIGHT }}>
          {/* SVG Layer */}
          <svg
            className="absolute inset-0 w-full pointer-events-none"
            style={{ height: TOTAL_HEIGHT }}
            viewBox={`0 0 ${containerWidth} ${TOTAL_HEIGHT}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--indigo))" />
                <stop offset="50%" stopColor="hsl(var(--cyan))" />
                <stop offset="100%" stopColor="hsl(var(--matrix))" />
              </linearGradient>
              <filter id="pathGlow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="markerGlow">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background path (dim) */}
            <path
              d={svgPath}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="2"
              opacity="0.3"
            />

            {/* Animated path */}
            <motion.path
              ref={pathRef}
              d={svgPath}
              fill="none"
              stroke="url(#pathGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#pathGlow)"
              style={{
                strokeDasharray: pathLength,
                strokeDashoffset,
              }}
            />

            {/* Checkpoints */}
            {CHECKPOINT_OFFSETS.map((y, i) => {
              const cx = containerWidth / 2;
              const amplitude = Math.min(containerWidth * 0.28, 200);
              const dir = i % 2 === 0 ? -1 : 1;
              const nodeX = cx + dir * amplitude * 0.6;
              return (
                <CheckpointNode
                  key={i}
                  x={nodeX}
                  y={y}
                  index={i}
                  progress={smoothProgress}
                  threshold={cardThresholds[i]}
                  status={timeline[i].status}
                />
              );
            })}

            {/* Traveling Robot Marker */}
            {pathLength > 0 && (
              <g
                transform={`translate(${markerPos.x}, ${markerPos.y})`}
                filter="url(#markerGlow)"
              >
                {/* Mini Robot */}
                <g transform="translate(-12, -14) scale(0.9)">
                  {/* Body */}
                  <rect x="4" y="10" width="16" height="14" rx="3" fill="hsl(var(--matrix))" opacity="0.95" />
                  {/* Head */}
                  <rect x="6" y="2" width="12" height="10" rx="2" fill="hsl(var(--cyan))" opacity="0.9" />
                  {/* Eyes */}
                  <circle cx="10" cy="7" r="1.5" fill="hsl(var(--background))" />
                  <circle cx="14" cy="7" r="1.5" fill="hsl(var(--background))" />
                  <circle cx="10" cy="7" r="0.8" fill="hsl(var(--matrix))">
                    <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="14" cy="7" r="0.8" fill="hsl(var(--matrix))">
                    <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                  {/* Antenna */}
                  <line x1="12" y1="2" x2="12" y2="-3" stroke="hsl(var(--cyan))" strokeWidth="1" />
                  <circle cx="12" cy="-4" r="2" fill="hsl(var(--matrix))">
                    <animate attributeName="r" values="1.5;2.5;1.5" dur="1s" repeatCount="indefinite" />
                  </circle>
                  {/* Legs */}
                  <rect x="6" y="24" width="4" height="5" rx="1" fill="hsl(var(--matrix))" opacity="0.8">
                    <animate attributeName="y" values="24;22;24" dur="0.4s" repeatCount="indefinite" />
                  </rect>
                  <rect x="14" y="24" width="4" height="5" rx="1" fill="hsl(var(--matrix))" opacity="0.8">
                    <animate attributeName="y" values="22;24;22" dur="0.4s" repeatCount="indefinite" />
                  </rect>
                  {/* Arms */}
                  <rect x="-1" y="12" width="5" height="3" rx="1" fill="hsl(var(--cyan))" opacity="0.7">
                    <animate attributeName="y" values="12;14;12" dur="0.6s" repeatCount="indefinite" />
                  </rect>
                  <rect x="20" y="14" width="5" height="3" rx="1" fill="hsl(var(--cyan))" opacity="0.7">
                    <animate attributeName="y" values="14;12;14" dur="0.6s" repeatCount="indefinite" />
                  </rect>
                  {/* Chest light */}
                  <circle cx="12" cy="17" r="2" fill="hsl(var(--indigo))" opacity="0.8">
                    <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
                  </circle>
                </g>
                {/* Trail particles */}
                {[-18, -28, -38].map((offset, i) => (
                  <circle
                    key={i}
                    cx={0}
                    cy={offset}
                    r={3 - i}
                    fill="hsl(var(--cyan))"
                    opacity={0.4 - i * 0.12}
                  />
                ))}
              </g>
            )}
          </svg>

          {/* Cards Layer */}
          {timeline.map((item, i) => (
            <TimelineCard
              key={i}
              item={item}
              index={i}
              progress={smoothProgress}
              threshold={cardThresholds[i]}
              containerWidth={containerWidth}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Checkpoint Node ---------- */
function CheckpointNode({
  x,
  y,
  index,
  progress,
  threshold,
  status,
}: {
  x: number;
  y: number;
  index: number;
  progress: ReturnType<typeof useSpring>;
  threshold: number;
  status: string;
}) {
  const [state, setState] = useState<'inactive' | 'active' | 'visited'>('inactive');

  useMotionValueEvent(progress, 'change', (v) => {
    if (v >= threshold + 0.12) setState('visited');
    else if (v >= threshold - 0.05) setState('active');
    else setState('inactive');
  });

  const colors = {
    inactive: 'hsl(var(--muted-foreground))',
    active: 'hsl(var(--matrix))',
    visited: 'hsl(var(--cyan))',
  };

  const radii = { inactive: 5, active: 8, visited: 6 };

  return (
    <g>
      {state === 'active' && (
        <circle cx={x} cy={y} r="16" fill="none" stroke={colors.active} strokeWidth="1.5" opacity="0.4">
          <animate attributeName="r" values="8;18;8" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
      )}
      <circle
        cx={x}
        cy={y}
        r={radii[state]}
        fill={colors[state]}
        style={{ transition: 'all 0.4s ease' }}
      />
      {/* Index label */}
      <text
        x={x}
        y={y + 1}
        textAnchor="middle"
        dominantBaseline="central"
        fill="hsl(var(--background))"
        fontSize="8"
        fontWeight="bold"
        fontFamily="var(--font-mono)"
      >
        {index + 1}
      </text>
    </g>
  );
}

/* ---------- Timeline Card ---------- */
function TimelineCard({
  item,
  index,
  progress,
  threshold,
  containerWidth,
}: {
  item: (typeof timeline)[0];
  index: number;
  progress: ReturnType<typeof useSpring>;
  threshold: number;
  containerWidth: number;
}) {
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isLeft = index % 2 === 0;
  const isMobile = containerWidth < 640;

  useMotionValueEvent(progress, 'change', (v) => {
    const visible = v >= threshold - 0.08;
    const active = v >= threshold - 0.05 && v < threshold + 0.15;
    setIsVisible(visible);
    setIsActive(active);
  });

  // Position card beside checkpoint
  const topOffset = CHECKPOINT_OFFSETS[index] - 60;
  const cardStyle: React.CSSProperties = isMobile
    ? { top: topOffset, left: '8%', right: '8%' }
    : isLeft
      ? { top: topOffset, left: '2%', width: '44%' }
      : { top: topOffset, right: '2%', width: '44%' };

  return (
    <motion.div
      className="absolute"
      style={cardStyle}
      initial={false}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : isLeft ? -60 : 60,
        scale: isActive ? 1.02 : isVisible ? 0.98 : 0.95,
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div
        className={`glass-panel rounded-xl p-5 transition-all duration-500 ${
          isActive
            ? 'border-[hsl(var(--matrix))]/40 shadow-[0_0_25px_hsla(120,100%,50%,0.12)]'
            : 'opacity-70'
        }`}
        style={{
          borderColor: isActive ? 'hsla(120, 100%, 50%, 0.3)' : undefined,
        }}
      >
        {/* Status indicator */}
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`w-2 h-2 rounded-full ${
              item.status === 'active' ? 'bg-[hsl(var(--matrix))] animate-pulse' : 'bg-[hsl(var(--cyan))]'
            }`}
          />
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
            {item.status === 'active' ? 'IN PROGRESS' : 'COMPLETED'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
          <h3 className="font-display font-bold text-foreground text-sm md:text-base">{item.role}</h3>
          <span className="font-mono text-[10px] text-muted-foreground">{item.period}</span>
        </div>
        <p className="font-mono text-xs text-[hsl(var(--cyan))]/80 mb-3">{item.company}</p>

        <div className="font-mono text-[10px] text-muted-foreground mb-1 tracking-wider">
          {'>'} KEY CONTRIBUTIONS
        </div>
        <ul className="space-y-1 mb-3">
          {item.objectives.map((obj, j) => (
            <li key={j} className="text-xs text-muted-foreground flex items-start gap-2">
              <span className="text-[hsl(var(--matrix))] mt-0.5 text-[10px]">▸</span>
              {obj}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5">
          {item.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[9px] px-2 py-0.5 rounded bg-secondary/50 text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Active corner accent */}
        {isActive && (
          <span className="absolute top-2 right-3 font-mono text-[8px] text-[hsl(var(--matrix))]/50 animate-pulse">
            ● ACTIVE
          </span>
        )}
      </div>
    </motion.div>
  );
}
