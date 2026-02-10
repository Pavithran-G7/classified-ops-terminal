import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { id: 'hero', label: 'HOME', fullName: 'Neural Link' },
  { id: 'about', label: 'ABOUT', fullName: 'System Profile' },
  { id: 'skills', label: 'SKILLS', fullName: 'Tech Arsenal' },
  { id: 'projects', label: 'PROJECTS', fullName: 'Deployed Operations' },
  { id: 'experience', label: 'TIMELINE', fullName: 'Field Experience' },
  { id: 'contact', label: 'CONTACT', fullName: 'Secure Channel' },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navItems.map(item => ({
        id: item.id,
        el: document.getElementById(item.id),
      }));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i].el;
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 3) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-panel-strong' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.button
          onClick={() => scrollTo('hero')}
          className="font-mono text-sm tracking-wider text-matrix"
          whileHover={{ scale: 1.05 }}
        >
          {'>'} _NEURAL.SYS
        </motion.button>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`relative px-4 py-2 font-mono text-xs tracking-widest transition-colors duration-300 ${
                activeSection === item.id
                  ? 'text-matrix'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              whileHover={{ y: -1 }}
            >
              <AnimatePresence mode="wait">
                {hoveredItem === item.id ? (
                  <motion.span
                    key="full"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="text-cyan"
                  >
                    {item.fullName}
                  </motion.span>
                ) : (
                  <motion.span
                    key="short"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {activeSection === item.id && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-2 right-2 h-px bg-matrix"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-matrix animate-pulse" />
          <span className="font-mono text-xs text-matrix/70">ONLINE</span>
        </div>
      </div>
    </motion.nav>
  );
}
