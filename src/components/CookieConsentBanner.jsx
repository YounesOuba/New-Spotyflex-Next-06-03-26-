'use client';

import { useState, useEffect } from 'react';
import { Cookie, X, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { setCookieConsent, shouldShowCookieBanner } from '@/lib/cookieConsent';

export default function CookieConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (shouldShowCookieBanner()) {
      const t = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  function handleAccept() {
    setCookieConsent('accepted');
    setShow(false);
  }

  function handleNecessary() {
    setCookieConsent('necessary');
    setShow(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 z-[200] w-[calc(100vw-2rem)] max-w-[340px]"
        >
          {/* Card */}
          <div
            className="relative overflow-hidden rounded-2xl p-5"
            style={{
              background: 'linear-gradient(145deg, #161616, #121212)',
              border: '1px solid rgba(207,255,106,0.18)',
              boxShadow: '0 24px 48px -8px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
            }}
          >
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(207,255,106,0.4), transparent)' }} />

            {/* Glow */}
            <div className="pointer-events-none absolute top-0 right-0 w-32 h-32 -translate-y-1/2 translate-x-1/4"
              style={{ background: 'radial-gradient(circle, rgba(207,255,106,0.06) 0%, transparent 70%)' }} />

            {/* Header row */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(207,255,106,0.1)', border: '1px solid rgba(207,255,106,0.2)' }}>
                  <Cookie className="w-4 h-4" style={{ color: '#cfff6a' }} />
                </div>
                <div>
                  <p className="text-[12px] font-black text-white leading-none mb-0.5">We use cookies</p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: 'rgba(255,255,255,0.2)' }}>
                    Analytics · Ads · Necessary
                  </p>
                </div>
              </div>
              <button onClick={handleNecessary} aria-label="Accept necessary only"
                className="shrink-0 w-6 h-6 flex items-center justify-center rounded-lg transition-colors"
                style={{ color: 'rgba(255,255,255,0.2)' }}>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Body */}
            <p className="text-[11px] leading-relaxed mb-4"
              style={{ color: 'rgba(255,255,255,0.38)' }}>
              We use cookies to improve your experience, analyze traffic, and serve relevant ads.{' '}
              <Link href="/privacy"
                className="font-bold transition-colors hover:text-white/60"
                style={{ color: 'rgba(207,255,106,0.7)' }}>
                Read our Privacy Policy
              </Link>
            </p>

            {/* What's included — minimal */}
            <div className="flex items-center gap-3 mb-4 px-3 py-2 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" style={{ color: '#cfff6a', opacity: 0.6 }} />
              <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
                Necessary always on · Analytics &amp; Ads need consent
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button onClick={handleNecessary}
                className="flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-200"
                style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)' }}>
                Necessary only
              </button>
              <button onClick={handleAccept}
                className="flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: '#cfff6a',
                  color: '#080808',
                  boxShadow: '0 8px 20px -6px rgba(207,255,106,0.35)',
                }}>
                Accept all
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}