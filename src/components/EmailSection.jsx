'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle, ArrowRight, Zap } from 'lucide-react';
import { useSubscribe } from '@/hooks/use-subscribe';

const PERKS = [
  'Weekly workout plans',
  'Nutrition breakdowns',
  'Recovery guides',
  'Exclusive tips',
];

export default function EmailSection() {
  const { email, setEmail, status, message, subscribe } = useSubscribe();
  return (
    <section
      id="newsletter"
      className="relative overflow-hidden border-t"
      style={{ background: '#080808', borderColor: 'rgba(255,255,255,0.05)' }}
    >
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />

      {/* Lime glow — left */}
      <div
        className="pointer-events-none absolute top-0 left-0 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(207,255,106,0.06) 0%, transparent 65%)' }}
      />

      {/* Lime glow — right */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] translate-x-1/3 translate-y-1/3"
        style={{ background: 'radial-gradient(circle, rgba(207,255,106,0.04) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] gap-16 lg:gap-24 items-center">

          {/* ── Left: copy ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Label */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[2px] rounded-full bg-[#cfff6a]" />
              <span className="text-[9px] font-black tracking-[0.4em] uppercase text-white/25">
                Weekly Newsletter
              </span>
            </div>

            {/* Headline */}
            <h2
              className="text-white mb-6 leading-[1.06]"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.4rem)',
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 900,
                letterSpacing: '-0.03em',
              }}
            >
              Level up your{' '}
              <span style={{ color: '#cfff6a' }}>fitness</span>
              <br />one article at a time.
            </h2>

            <p className="text-white/40 text-[15px] leading-relaxed mb-10 max-w-md">
              Join thousands of readers who get expert workouts, nutrition breakdowns and wellness insights delivered straight to their inbox. No fluff, just results.
            </p>

            {/* Perks */}
            <div className="grid grid-cols-2 gap-3">
              {PERKS.map((perk, i) => (
                <motion.div
                  key={perk}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-2.5"
                >
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(207,255,106,0.1)', border: '1px solid rgba(207,255,106,0.2)' }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#cfff6a]" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/35">{perk}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: form card ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div
              className="relative overflow-hidden rounded-3xl p-8 lg:p-10"
              style={{
                background: 'linear-gradient(145deg, #141414 0%, #0f0f0f 100%)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 40px 80px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #cfff6a, transparent)', opacity: 0.4 }}
              />

              {/* Zap icon */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'rgba(207,255,106,0.08)', border: '1px solid rgba(207,255,106,0.15)' }}
              >
                <Zap className="w-5 h-5 text-[#cfff6a]" />
              </div>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  /* ── Success state ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                      style={{ background: 'rgba(207,255,106,0.1)', border: '1px solid rgba(207,255,106,0.2)' }}
                    >
                      <CheckCircle2 className="w-7 h-7 text-[#cfff6a]" />
                    </div>
                    <h3 className="text-white text-xl font-black mb-2" style={{ letterSpacing: '-0.02em' }}>
                      You're in!
                    </h3>
                    <p className="text-white/35 text-[13px] leading-relaxed">
                      Welcome to the SpotyFlex community. Your first digest arrives Monday.
                    </p>
                  </motion.div>
                ) : (
                  /* ── Form state ── */
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h3
                      className="text-white mb-2 leading-tight"
                      style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}
                    >
                      Start your free subscription
                    </h3>
                    <p className="text-white/30 text-[12px] mb-7 leading-relaxed">
                      Every Monday. Unsubscribe any time.
                    </p>

                    <form onSubmit={subscribe} className="space-y-3">
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          disabled={status === 'loading'}
                          className="w-full px-5 py-4 rounded-2xl text-white text-[14px] font-medium placeholder:text-white/20 focus:outline-none transition-all duration-300"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                          }}
                          onFocus={e => { e.target.style.border = '1px solid rgba(207,255,106,0.35)'; e.target.style.background = 'rgba(207,255,106,0.03)'; }}
                          onBlur={e => { e.target.style.border = '1px solid rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
                        />
                      </div>

                      <AnimatePresence>
                        {status === 'error' && message && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="flex items-center gap-2 px-4 py-3 rounded-xl text-[12px] font-bold"
                            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: 'rgba(239,68,68,0.8)' }}
                          >
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            {message}
                          </motion.div>
                        )}
                        {status === 'already' && message && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="flex items-center gap-2 px-4 py-3 rounded-xl text-[12px] font-bold"
                            style={{ background: 'rgba(207,255,106,0.08)', border: '1px solid rgba(207,255,106,0.2)', color: '#cfff6a' }}
                          >
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            {message}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-50"
                        style={{ background: '#cfff6a', color: '#0a0a0a' }}
                        onMouseEnter={e => { if (status !== 'loading') e.currentTarget.style.background = '#d8ff7a'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#cfff6a'; }}
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Subscribing...
                          </>
                        ) : (
                          <>
                            Subscribe Free
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>

                    {/* Social proof */}
                    <div className="flex items-center gap-3 mt-6 pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                      <div className="flex -space-x-2">
                        {['A', 'B', 'C', 'D'].map((l, i) => (
                          <div
                            key={i}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-black ring-2"
                            style={{
                              background: `hsl(${i * 60 + 120}, 40%, 20%)`,
                              color: 'rgba(255,255,255,0.5)',
                              ringColor: '#0f0f0f',
                            }}
                          >
                            {l}
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] font-bold text-white/20 leading-snug">
                        Be part of our <span className="text-white/40">growing</span> community
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );

}