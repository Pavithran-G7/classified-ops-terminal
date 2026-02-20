import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Shield, Check } from 'lucide-react';
import WavePulseBg from './backgrounds/WavePulseBg';

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
    { icon: Github, label: 'GitHub', status: 'ONLINE', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', status: 'ONLINE', href: '#' },
    { icon: Shield, label: 'TryHackMe', status: 'ONLINE', href: '#' },
  ];

  return (
    <section id="contact" className="relative py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 hex-grid-bg" />
      <WavePulseBg />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs text-matrix/60 tracking-[0.3em] mb-2"
        >
          SECTION_07
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold text-gradient-primary mb-8"
        >
          Secure Channel
        </motion.h2>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-panel-strong rounded-xl p-6 md:p-8 border-matrix/10">
              <div className="flex items-center gap-2 mb-6 pb-3 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-matrix/60" />
                <span className="font-mono text-xs text-muted-foreground">
                  secure_transmission.sh
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
                    className="w-16 h-16 rounded-full bg-matrix/10 flex items-center justify-center mx-auto mb-4"
                  >
                    <Check className="w-8 h-8 text-matrix" />
                  </motion.div>
                  <p className="font-mono text-sm text-matrix mb-2">TRANSMISSION COMPLETE</p>
                  <p className="font-mono text-xs text-muted-foreground">
                    Message encrypted and delivered. Expect response within 24h.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { name: 'name' as const, label: 'IDENTIFIER', type: 'text', placeholder: 'Your name' },
                    { name: 'email' as const, label: 'COMM_CHANNEL', type: 'email', placeholder: 'your@email.com' },
                    { name: 'subject' as const, label: 'SUBJECT_LINE', type: 'text', placeholder: 'Subject' },
                  ].map((field) => (
                    <div key={field.name} className="relative">
                      <label className="font-mono text-[10px] text-cyan/60 tracking-wider mb-1 block">
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
                          focus:outline-none focus:border-matrix/50 focus:ring-1 focus:ring-matrix/20
                          transition-all duration-300"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="font-mono text-[10px] text-cyan/60 tracking-wider mb-1 block">
                      {'>'} MESSAGE_BODY
                    </label>
                    <textarea
                      placeholder="Your message..."
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                      className="w-full bg-transparent border border-border rounded-lg px-4 py-3 font-mono text-sm
                        text-foreground placeholder:text-muted-foreground/40 resize-none
                        focus:outline-none focus:border-matrix/50 focus:ring-1 focus:ring-matrix/20
                        transition-all duration-300"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={sending}
                    className="w-full glass-panel rounded-lg px-6 py-3 font-mono text-sm
                      border-matrix/20 hover:border-matrix/50 hover:glow-matrix
                      transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {sending ? (
                      <div className="flex items-center gap-3">
                        <div className="h-1 w-40 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-matrix rounded-full"
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 2.5 }}
                          />
                        </div>
                        <span className="text-matrix text-xs">ENCRYPTING...</span>
                      </div>
                    ) : (
                      <>
                        <Send size={14} className="text-matrix" />
                        <span>Encrypt & Transmit</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Sidebar info */}
          <motion.div
            className="md:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="glass-panel rounded-xl p-6">
              <div className="font-mono text-xs text-cyan/60 tracking-wider mb-4">
                {'>'} SYSTEM STATUS
              </div>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Response Time</span>
                  <span className="text-matrix">{'<'} 24h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Encryption</span>
                  <span className="text-cyan">AES-256</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="text-matrix flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-matrix animate-pulse" />
                    ACCEPTING
                  </span>
                </div>
              </div>
            </div>

            <div className="font-mono text-xs text-cyan/60 tracking-wider mb-2">
              {'>'} EXTERNAL NODES
            </div>
            <div className="space-y-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="glass-panel rounded-lg px-4 py-3 flex items-center justify-between
                    hover:border-matrix/30 transition-all duration-300 group block"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center gap-3">
                    <link.icon size={16} className="text-muted-foreground group-hover:text-matrix transition-colors" />
                    <span className="font-mono text-sm text-foreground">{link.label}</span>
                  </div>
                  <span className="font-mono text-[10px] text-matrix/0 group-hover:text-matrix/70 transition-all">
                    {link.status}
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
          <p>{'>'} system.log: "Crafted with neural precision" // © 2026</p>
        </motion.div>
      </div>
    </section>
  );
}
