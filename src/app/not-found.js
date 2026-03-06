'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const LINKS = [
  { label: 'Home',           href: '/'                      },
  { label: 'All Articles',   href: '/articles'              },
  { label: 'Workouts',       href: '/category/gym-workouts' },
  { label: 'Nutrition',      href: '/category/meal-plans'   },
  { label: 'Beginner Guide', href: '/category/beginner'     },
];

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{ background: '#080808' }}>

      {/* Grain */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.035] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />

      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(207,255,106,0.04) 0%, transparent 100%)' }} />

      <div className="relative z-10 max-w-2xl w-full text-center">

        {/* Giant 404 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6 select-none"
        >
          <span
            className="font-black leading-none"
            style={{
              fontSize: 'clamp(7rem, 22vw, 16rem)',
              fontFamily: 'var(--font-playfair), "Playfair Display", serif',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.07)',
              letterSpacing: '-0.05em',
              display: 'block',
            }}
          >
            404
          </span>

          {/* Lime accent line across the middle */}
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              top: '52%',
              width: '40%',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #cfff6a, transparent)',
            }}
          />
        </motion.div>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-5"
        >
          <div className="w-5 h-[2px] rounded-full bg-[#cfff6a]" />
          <span className="text-[9px] font-black uppercase tracking-[0.45em]"
            style={{ color: 'rgba(255,255,255,0.2)' }}>
            Page Not Found
          </span>
          <div className="w-5 h-[2px] rounded-full bg-[#cfff6a]" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-white mb-4 leading-tight"
          style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
            fontFamily: 'var(--font-playfair), "Playfair Display", serif',
            fontWeight: 900,
            letterSpacing: '-0.025em',
          }}
        >
          This page skipped leg day.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[14px] leading-relaxed mb-10 max-w-sm mx-auto"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14"
        >
          <Link href="/"
            className="flex items-center gap-2.5 px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(207,255,106,0.25)]"
            style={{ background: '#cfff6a', color: '#080808' }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
          <Link href="/articles"
            className="flex items-center gap-2.5 px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:border-white/15 hover:text-white/60"
            style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)' }}
          >
            Browse Articles
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <p className="text-[8px] font-black uppercase tracking-[0.4em] mb-4"
            style={{ color: 'rgba(255,255,255,0.12)' }}>
            Or jump to
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {LINKS.map(({ label, href }) => (
              <Link key={label} href={href}
                className="text-[9px] font-black uppercase tracking-[0.2em] px-3.5 py-2 rounded-full transition-all duration-200 hover:text-white/50"
                style={{ color: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                {label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}