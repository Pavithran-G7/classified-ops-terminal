import { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import NeuralCanvas from './NeuralCanvas';
import { useTypewriter } from '@/hooks/useTypewriter';

const NeuralGlobe = lazy(() => import('./NeuralGlobe'));

const bootLines = [
  { text: '> initializing_neural_link...', delay: 800 },
  { text: '> loading_ai_modules... [OK]', delay: 0 },
  { text: '> security_protocols... [ACTIVE]', delay: 0 },
  { text: '> identity_verified', delay: 0 },
];

export default function HeroSection() {
  const [bootPhase, setBootPhase] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [bootComplete, setBootComplete] = useState(false);


  const line0 = useTypewriter({ text: bootLines[0].text, speed: 30, delay: 1000, enabled: bootPhase >= 0 });
  const line1 = useTypewriter({ text: bootLines[1].text, speed: 25, delay: 0, enabled: bootPhase >= 1 });
  const line2 = useTypewriter({ text: bootLines[2].text, speed: 25, delay: 0, enabled: bootPhase >= 2 });
  const line3 = useTypewriter({ text: bootLines[3].text, speed: 25, delay: 0, enabled: bootPhase >= 3 });

  useEffect(() => {
    if (line0.isComplete && bootPhase === 0) setBootPhase(1);
    if (line1.isComplete && bootPhase === 1) setBootPhase(2);
    if (line2.isComplete && bootPhase === 2) setBootPhase(3);
    if (line3.isComplete && bootPhase === 3) {
      setBootComplete(true);
      setTimeout(() => setShowContent(true), 500);
    }
  }, [line0.isComplete, line1.isComplete, line2.isComplete, line3.isComplete, bootPhase]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hex-grid-bg" />
      <NeuralCanvas />
      <div className="absolute inset-0 scanline-overlay" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-11 gap-8 items-center">
        {/* Left - 3D Neural Globe */}
        <div className="lg:col-span-6 h-[280px] sm:h-[320px] md:h-[400px] lg:h-[500px] xl:h-[560px]">
          <Suspense fallback={<div className="w-full h-full" />}>
            <NeuralGlobe />
          </Suspense>
        </div>

        {/* Right - Terminal */}
        <div className="lg:col-span-5">
          <div className="glass-panel rounded-lg p-6 glow-indigo">
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-destructive/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-matrix/70" />
              <span className="ml-2 font-mono text-xs text-muted-foreground">neural_link.sh</span>
            </div>

            {/* Boot sequence */}
            <div className="font-mono text-sm space-y-1 mb-6">
              {bootPhase >= 0 && (
                <p className="text-muted-foreground">
                  {line0.displayed}
                  {!line0.isComplete && <span className="terminal-cursor" />}
                </p>
              )}
              {bootPhase >= 1 && (
                <p className="text-muted-foreground">
                  {line1.displayed}
                  {!line1.isComplete && bootPhase === 1 && <span className="terminal-cursor" />}
                </p>
              )}
              {bootPhase >= 2 && (
                <p className="text-muted-foreground">
                  {line2.displayed}
                  {!line2.isComplete && bootPhase === 2 && <span className="terminal-cursor" />}
                </p>
              )}
              {bootPhase >= 3 && (
                <p className={line3.isComplete ? 'text-matrix' : 'text-muted-foreground'}>
                  {line3.displayed}
                  {!line3.isComplete && <span className="terminal-cursor" />}
                  {line3.isComplete && ' ✓'}
                </p>
              )}
            </div>

            {/* Identity */}
            {showContent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h1
                  className="text-4xl md:text-5xl font-display font-bold mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span className="text-gradient-primary">Kiran Raj S</span>
                </motion.h1>

                <motion.div
                  className="font-mono text-sm text-cyan mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  AI/ML Engineer <span className="text-muted-foreground"></span>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-matrix animate-pulse" />
                    <span className="font-mono text-xs text-matrix/80">AVAILABLE</span>
                  </div>
                </motion.div>

                <motion.button
                  onClick={scrollToAbout}
                  className="mt-6 glass-panel px-6 py-3 rounded-lg font-mono text-sm text-foreground 
                    hover:border-matrix/50 hover:glow-matrix transition-all duration-300 group"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-matrix mr-2">{'>'}</span>
                  Access System
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      {showContent && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-muted-foreground/30 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 rounded-full bg-cyan" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
