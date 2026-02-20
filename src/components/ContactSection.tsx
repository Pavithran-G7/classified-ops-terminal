import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Shield, Check } from 'lucide-react';
import OGLParticles from './animations/OGLParticles';

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    }, 2500);
  };

  const socialLinks = [
    { icon: Github,   label: 'GitHub',    status: 'ONLINE', href: '#' },
    { icon: Linkedin, label: 'LinkedIn',  status: 'ONLINE', href: '#' },
    { icon: Shield,   label: 'TryHackMe', status: 'ONLINE', href: '#' },
  ];

  return (
    <section id="contact" className="relative py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 hex-grid-bg" />

      {/* OGL Particle field background */}
      <div className="absolute inset-0 pointer-events-none">
        <OGLParticles
          particleColors={['#81ee83', '#6366f1', '#22d3ee']}
          particleCount={600}
          particleSpread={10}
          speed={0.08}
          particleBaseSize={80}
          moveParticlesOnHover={false}
          alphaParticles
          disableRotation
          pixelRatio={2}
        />
      </div>

      {/* Indigo/cyan ambient — AI focused */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[500px] h-[300px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, hsla(239,84%,67%,0.08), transparent)' }} />
        <div className="absolute top-0 right-0 w-[400px] h-[300px] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, hsla(187,94%,43%,0.06), transparent)' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs text-indigo/60 tracking-[0.3em] mb-2"
        >
          MODULE_06
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold text-gradient-primary mb-8"
        >
          Let's Connect
        </motion.h2>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-panel-strong rounded-xl p-6 md:p-8 border-indigo/10">
              <div className="flex items-center gap-2 mb-6 pb-3 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-indigo/60" />
                <div className="w-3 h-3 rounded-full bg-cyan/40" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">
                  send_message.py
                </span>
              </div>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-16 h-16 rounded-full bg-indigo/10 flex items-center justify-center mx-auto mb-4"
                  >
                    <Check className="w-8 h-8 text-indigo" />
                  </motion.div>
                  <p className="font-mono text-sm text-indigo mb-2">MESSAGE DELIVERED</p>
                  <p className="font-mono text-xs text-muted-foreground">
                    I'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { name: 'name'    as const, label: 'YOUR_NAME',    type: 'text',  placeholder: 'Your name' },
                    { name: 'email'   as const, label: 'EMAIL',         type: 'email', placeholder: 'your@email.com' },
                    { name: 'subject' as const, label: 'SUBJECT',       type: 'text',  placeholder: 'What\'s it about?' },
                  ].map((field) => (
                    <div key={field.name} className="relative">
                      <label className="font-mono text-[10px] text-indigo/60 tracking-wider mb-1 block">
                        {'>'} {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        required
                        value={formState[field.name]}
                        onChange={(e) => setFormState(s => ({ ...s, [field.name]: e.target.value }))}
                        className="w-full bg-transparent border border-border rounded-lg px-4 py-3 font-mono text-sm
                          text-foreground placeholder:text-muted-foreground/40
                          focus:outline-none focus:border-indigo/50 focus:ring-1 focus:ring-indigo/20
                          transition-all duration-300"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="font-mono text-[10px] text-indigo/60 tracking-wider mb-1 block">
                      {'>'} MESSAGE
                    </label>
                    <textarea
                      placeholder="Tell me about your project or idea..."
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                      className="w-full bg-transparent border border-border rounded-lg px-4 py-3 font-mono text-sm
                        text-foreground placeholder:text-muted-foreground/40 resize-none
                        focus:outline-none focus:border-indigo/50 focus:ring-1 focus:ring-indigo/20
                        transition-all duration-300"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={sending}
                    className="w-full glass-panel rounded-lg px-6 py-3 font-mono text-sm
                      border-indigo/20 hover:border-indigo/50 hover:glow-indigo
                      transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {sending ? (
                      <div className="flex items-center gap-3">
                        <div className="h-1 w-40 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-indigo to-cyan rounded-full"
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 2.5 }}
                          />
                        </div>
                        <span className="text-indigo text-xs">SENDING...</span>
                      </div>
                    ) : (
                      <>
                        <Send size={14} className="text-indigo" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="md:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {/* Info card */}
            <div className="glass-panel rounded-xl p-6">
              <div className="font-mono text-xs text-indigo/60 tracking-wider mb-4">
                {'>'} STATUS
              </div>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Response Time</span>
                  <span className="text-cyan">{'<'} 24h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Open To</span>
                  <span className="text-indigo">AI/ML Roles</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="text-cyan flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                    ACTIVE
                  </span>
                </div>
                {/* Cyber interest — 25% presence */}
                <div className="flex justify-between pt-1 border-t border-border/50 mt-2">
                  <span className="text-muted-foreground text-[11px]">Sec Interest</span>
                  <span className="text-matrix/70 text-[11px]">Adversarial ML</span>
                </div>
              </div>
            </div>

            <div className="font-mono text-xs text-indigo/60 tracking-wider mb-2">
              {'>'} FIND ME ON
            </div>
            <div className="space-y-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="glass-panel rounded-lg px-4 py-3 flex items-center justify-between
                    hover:border-indigo/30 transition-all duration-300 group block"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center gap-3">
                    <link.icon size={16} className="text-muted-foreground group-hover:text-indigo transition-colors" />
                    <span className="font-mono text-sm text-foreground">{link.label}</span>
                  </div>
                  <span className="font-mono text-[10px] text-indigo/0 group-hover:text-indigo/70 transition-all">
                    {link.status} →
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="mt-20 text-center font-mono text-xs text-muted-foreground/40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>
            <span className="text-indigo/40">model</span>
            <span className="text-muted-foreground/30">.forward(</span>
            <span className="text-cyan/40">"crafted with neural precision"</span>
            <span className="text-muted-foreground/30">)</span>
            <span className="text-matrix/30 ml-3">// © 2026</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
