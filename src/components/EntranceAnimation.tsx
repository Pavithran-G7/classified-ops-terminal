import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EntranceAnimationProps {
  onComplete: () => void;
}

// Geometric robot built from SVG
function RobotEntity({ phase }: { phase: number }) {
  return (
    <motion.div className="relative" style={{ width: '280px', height: '340px' }}>
      <svg viewBox="0 0 280 340" className="w-full h-full" fill="none">
        {/* Head */}
        <motion.g
          initial={{ opacity: 0, y: -40 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2, ease: 'backOut' }}
        >
          {/* Head shell */}
          <motion.polygon
            points="140,30 200,65 200,120 140,145 80,120 80,65"
            stroke="hsl(239, 84%, 67%)"
            strokeWidth="1.5"
            fill="hsla(239, 84%, 67%, 0.08)"
            initial={{ pathLength: 0 }}
            animate={phase >= 2 ? { pathLength: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          {/* Face plate */}
          <motion.polygon
            points="140,50 180,72 180,108 140,130 100,108 100,72"
            stroke="hsl(187, 94%, 43%)"
            strokeWidth="1"
            fill="hsla(187, 94%, 43%, 0.05)"
            initial={{ opacity: 0 }}
            animate={phase >= 2 ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.6 }}
          />
          {/* Left eye */}
          <motion.circle
            cx="120" cy="85" r="8"
            fill="hsla(187, 94%, 43%, 0.1)"
            stroke="hsl(187, 94%, 43%)"
            strokeWidth="1.5"
            initial={{ scale: 0 }}
            animate={phase >= 2 ? { scale: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.8, type: 'spring' }}
          />
          <motion.circle
            cx="120" cy="85" r="4"
            initial={{ opacity: 0, fill: 'hsl(187, 94%, 43%)' }}
            animate={phase >= 2 ? {
              opacity: 1,
              fill: ['hsl(187, 94%, 43%)', 'hsl(120, 100%, 50%)', 'hsl(187, 94%, 43%)'],
            } : {}}
            transition={{ duration: 2, delay: 1, repeat: Infinity }}
          />
          {/* Right eye */}
          <motion.circle
            cx="160" cy="85" r="8"
            fill="hsla(187, 94%, 43%, 0.1)"
            stroke="hsl(187, 94%, 43%)"
            strokeWidth="1.5"
            initial={{ scale: 0 }}
            animate={phase >= 2 ? { scale: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.85, type: 'spring' }}
          />
          <motion.circle
            cx="160" cy="85" r="4"
            initial={{ opacity: 0, fill: 'hsl(187, 94%, 43%)' }}
            animate={phase >= 2 ? {
              opacity: 1,
              fill: ['hsl(187, 94%, 43%)', 'hsl(120, 100%, 50%)', 'hsl(187, 94%, 43%)'],
            } : {}}
            transition={{ duration: 2, delay: 1.1, repeat: Infinity }}
          />
          {/* Antenna */}
          <motion.line
            x1="140" y1="30" x2="140" y2="10"
            stroke="hsl(120, 100%, 50%)"
            strokeWidth="1.5"
            initial={{ opacity: 0 }}
            animate={phase >= 2 ? { opacity: [0, 1, 0.5, 1] } : {}}
            transition={{ duration: 0.5, delay: 0.9 }}
          />
          <motion.circle
            cx="140" cy="8" r="3"
            fill="hsl(120, 100%, 50%)"
            initial={{ opacity: 0 }}
            animate={phase >= 2 ? { opacity: [0, 1, 0.4, 1] } : {}}
            transition={{ duration: 1, delay: 1, repeat: Infinity }}
          />
        </motion.g>

        {/* Torso */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={phase >= 2 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: 'backOut' }}
        >
          <motion.polygon
            points="100,150 180,150 190,230 160,250 120,250 90,230"
            stroke="hsl(239, 84%, 67%)"
            strokeWidth="1.5"
            fill="hsla(239, 84%, 67%, 0.06)"
            initial={{ pathLength: 0 }}
            animate={phase >= 2 ? { pathLength: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          />
          {/* Core reactor */}
          <motion.circle
            cx="140" cy="195" r="14"
            stroke="hsl(187, 94%, 43%)"
            strokeWidth="1"
            fill="hsla(187, 94%, 43%, 0.1)"
            initial={{ scale: 0 }}
            animate={phase >= 2 ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.5 }}
          />
          <motion.circle
            cx="140" cy="195" r="7"
            fill="hsl(187, 94%, 43%)"
            initial={{ opacity: 0 }}
            animate={phase >= 2 ? { opacity: [0, 0.8, 0.3, 0.8] } : {}}
            transition={{ duration: 2, delay: 0.7, repeat: Infinity }}
          />
          {/* Circuit lines on torso */}
          <motion.path
            d="M115,170 L130,170 L130,180 M150,170 L165,170 L165,180 M120,210 L140,215 L160,210"
            stroke="hsl(120, 100%, 50%)"
            strokeWidth="0.8"
            strokeOpacity={0.4}
            initial={{ pathLength: 0 }}
            animate={phase >= 2 ? { pathLength: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </motion.g>

        {/* Left Arm */}
        <motion.g
          initial={{ opacity: 0, x: -30 }}
          animate={phase >= 2 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.path
            d="M95,160 L60,180 L50,220 L55,230"
            stroke="hsl(239, 84%, 67%)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Joint */}
          <circle cx="60" cy="180" r="4" fill="hsla(187, 94%, 43%, 0.3)" stroke="hsl(187, 94%, 43%)" strokeWidth="1" />
        </motion.g>

        {/* Right Arm - extends for card */}
        <motion.g
          initial={{ opacity: 0, x: 30 }}
          animate={phase >= 2 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.path
            d="M185,160 L220,175 L235,195 L230,210"
            stroke="hsl(239, 84%, 67%)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={phase >= 3 ? {
              d: "M185,160 L225,165 L255,155 L260,140"
            } : {}}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
          <motion.circle cx="220" cy="175" r="4" fill="hsla(187, 94%, 43%, 0.3)" stroke="hsl(187, 94%, 43%)" strokeWidth="1"
            animate={phase >= 3 ? { cx: 225, cy: 165 } : {}}
            transition={{ duration: 0.8 }}
          />
          {/* Palm / hand */}
          <motion.circle
            cx="230" cy="210" r="8"
            stroke="hsl(187, 94%, 43%)"
            strokeWidth="1"
            fill="hsla(187, 94%, 43%, 0.1)"
            animate={phase >= 3 ? { cx: 260, cy: 140, r: 10 } : {}}
            transition={{ duration: 0.8 }}
          />
        </motion.g>

        {/* Legs */}
        <motion.g
          initial={{ opacity: 0, y: 30 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <motion.path
            d="M125,250 L115,300 L110,330"
            stroke="hsl(239, 84%, 67%)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <motion.path
            d="M155,250 L165,300 L170,330"
            stroke="hsl(239, 84%, 67%)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="115" cy="300" r="3" fill="hsla(187, 94%, 43%, 0.3)" stroke="hsl(187, 94%, 43%)" strokeWidth="1" />
          <circle cx="165" cy="300" r="3" fill="hsla(187, 94%, 43%, 0.3)" stroke="hsl(187, 94%, 43%)" strokeWidth="1" />
        </motion.g>
      </svg>

      {/* Glow effect behind robot */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={phase >= 2 ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        style={{
          background: 'radial-gradient(ellipse at center, hsla(239, 84%, 67%, 0.15) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />
    </motion.div>
  );
}

// Floating particles that assemble into robot
function AssemblyParticles({ active, dissolve }: { active: boolean; dissolve: boolean }) {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 600,
    y: (Math.random() - 0.5) * 600,
    size: Math.random() * 4 + 1,
    color: i % 3 === 0
      ? 'hsl(120, 100%, 50%)'
      : i % 2 === 0
        ? 'hsl(187, 94%, 43%)'
        : 'hsl(239, 84%, 67%)',
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: p.color,
            left: '50%',
            top: '50%',
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
          initial={{ x: p.x, y: p.y, opacity: 0 }}
          animate={dissolve ? {
            x: p.x * 2,
            y: p.y * 2,
            opacity: 0,
            scale: 0,
          } : active ? {
            x: (Math.random() - 0.5) * 40,
            y: (Math.random() - 0.5) * 60 - 30,
            opacity: [0, 0.8, 0.4],
            scale: [0, 1, 0.5],
          } : {
            x: p.x,
            y: p.y,
            opacity: 0,
          }}
          transition={dissolve ? {
            duration: 1.2,
            delay: Math.random() * 0.5,
            ease: 'easeIn',
          } : {
            duration: active ? 1.2 : 0.5,
            delay: active ? Math.random() * 0.4 : 0,
            ease: 'backOut',
          }}
        />
      ))}
    </div>
  );
}

// Holographic card with typewriter
function HoloCard({ visible, onTypingDone }: { visible: boolean; onTypingDone: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [showIdentity, setShowIdentity] = useState(false);
  const lineIndex = useRef(0);
  const charIndex = useRef(0);

  const bootLines = [
    '> initializing_neural_link...',
    '> loading_ai_modules... [OK]',
    '> security_protocols... [ACTIVE]',
    '> identity_verified ✓',
  ];

  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      if (lineIndex.current >= bootLines.length) {
        clearInterval(interval);
        setTimeout(() => setShowIdentity(true), 400);
        setTimeout(() => onTypingDone(), 1200);
        return;
      }

      const currentLine = bootLines[lineIndex.current];
      charIndex.current++;

      if (charIndex.current >= currentLine.length) {
        setLines(prev => {
          const copy = [...prev];
          copy[lineIndex.current] = currentLine;
          return copy;
        });
        lineIndex.current++;
        charIndex.current = 0;
      } else {
        setLines(prev => {
          const copy = [...prev];
          copy[lineIndex.current] = currentLine.slice(0, charIndex.current);
          return copy;
        });
      }
    }, 30);

    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  return (
    <motion.div
      className="relative"
      initial={{ scale: 0, opacity: 0, rotateY: -20 }}
      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      style={{ perspective: '1000px' }}
    >
      {/* Scanline overlay on card */}
      <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none z-10">
        <motion.div
          className="w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
          initial={{ y: 0 }}
          animate={{ y: [0, 300, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div
        className="relative rounded-lg p-5 w-[340px] sm:w-[400px] overflow-hidden"
        style={{
          background: 'hsla(222, 47%, 8%, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid hsla(187, 94%, 43%, 0.3)',
          boxShadow: '0 0 40px hsla(187, 94%, 43%, 0.15), 0 0 80px hsla(239, 84%, 67%, 0.1), inset 0 1px 0 hsla(187, 94%, 43%, 0.1)',
        }}
      >
        {/* Animated gradient border effect */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, hsla(239, 84%, 67%, 0.2), hsla(187, 94%, 43%, 0.2), hsla(120, 100%, 50%, 0.1))',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'xor',
            WebkitMaskComposite: 'xor',
            padding: '1px',
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Terminal header */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          <span className="ml-2 font-mono text-[10px] text-white/40">neural_link.sh</span>
        </div>

        {/* Boot lines */}
        <div className="font-mono text-xs space-y-1 mb-4">
          {lines.map((line, i) => (
            <p
              key={i}
              className={
                i === 3 && line === bootLines[3]
                  ? 'text-green-400'
                  : 'text-white/60'
              }
            >
              {line}
              {i === lineIndex.current && charIndex.current > 0 && (
                <span className="inline-block w-[2px] h-[1.1em] bg-green-400 ml-0.5 animate-pulse align-text-bottom" />
              )}
            </p>
          ))}
        </div>

        {/* Identity section */}
        <AnimatePresence>
          {showIdentity && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent mb-4" />
              <motion.h2
                className="text-2xl font-bold mb-1"
                style={{
                  background: 'linear-gradient(135deg, hsl(239, 84%, 67%), hsl(187, 94%, 43%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Alex Chen
              </motion.h2>
              <motion.p
                className="font-mono text-xs text-cyan-400 mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                AI/ML Engineer <span className="text-white/30">|</span> Security Researcher
              </motion.p>
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.span
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="font-mono text-[10px] text-green-400/80">AVAILABLE</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function EntranceAnimation({ onComplete }: EntranceAnimationProps) {
  const [act, setAct] = useState(0); // 0=idle, 1=boot, 2=robot, 3=card, 4=transition
  const [dissolve, setDissolve] = useState(false);

  useEffect(() => {
    // Act 1: Boot screen
    const t1 = setTimeout(() => setAct(1), 300);
    // Act 2: Robot arrival
    const t2 = setTimeout(() => setAct(2), 2000);
    // Act 3: Card reveal (arm extends + card appears)
    const t3 = setTimeout(() => setAct(3), 4500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const handleTypingDone = useCallback(() => {
    // Act 4: Transition out
    setTimeout(() => {
      setDissolve(true);
      setAct(4);
      setTimeout(() => onComplete(), 1200);
    }, 1000);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {act < 5 && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ background: 'hsl(222, 84%, 3%)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Grid background — Act 1 */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={act >= 1 ? { opacity: 0.1 } : {}}
            transition={{ duration: 1.5 }}
            style={{
              backgroundImage:
                'linear-gradient(hsla(120, 100%, 50%, 0.15) 1px, transparent 1px), linear-gradient(90deg, hsla(120, 100%, 50%, 0.15) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Pulsing center dot — Act 1 */}
          {act === 1 && (
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 8,
                height: 8,
                background: 'hsl(187, 94%, 43%)',
                boxShadow: '0 0 20px hsl(187, 94%, 43%), 0 0 40px hsla(187, 94%, 43%, 0.5)',
              }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}

          {/* Assembly particles */}
          <AssemblyParticles active={act >= 2} dissolve={dissolve} />

          {/* Robot — Act 2+ */}
          {act >= 2 && act < 4 && (
            <motion.div
              className="relative flex flex-col items-center"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={dissolve ? { opacity: 0, scale: 0.5 } : { scale: 1, opacity: 1 }}
              transition={dissolve ? { duration: 0.8 } : { duration: 1, ease: 'backOut' }}
            >
              <RobotEntity phase={act} />
            </motion.div>
          )}

          {/* Holographic card — Act 3 */}
          {act >= 3 && (
            <motion.div
              className="absolute"
              style={{ top: '15%', right: '10%' }}
              initial={{ opacity: 0 }}
              animate={act === 4 ? {
                scale: 3,
                opacity: 0,
                x: '-30vw',
                y: '20vh',
              } : {
                opacity: 1,
              }}
              transition={act === 4 ? { duration: 1, ease: 'easeIn' } : { duration: 0.5 }}
            >
              <HoloCard visible={act >= 3} onTypingDone={handleTypingDone} />
            </motion.div>
          )}

          {/* Skip button */}
          <motion.button
            className="absolute bottom-8 right-8 font-mono text-xs text-white/30 hover:text-white/60 transition-colors z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={onComplete}
          >
            SKIP →
          </motion.button>

          {/* Status text */}
          <motion.div
            className="absolute bottom-8 left-8 font-mono text-[10px] text-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {act <= 1 && 'SYSTEM BOOT...'}
            {act === 2 && 'INITIALIZING AI ENTITY...'}
            {act === 3 && 'ESTABLISHING NEURAL LINK...'}
            {act === 4 && 'ACCESS GRANTED'}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
