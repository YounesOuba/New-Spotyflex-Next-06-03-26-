'use client';

import { motion } from 'framer-motion';
import NextImage from 'next/image';
import smallLogo from '../assets/Logo/Spoty.png';

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />

      {/* Centered lime glow — very faint */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 55%, rgba(207,255,106,0.035) 0%, transparent 100%)' }}
      />

      {/* ── Main content ── */}
      <div className="relative flex flex-col items-center">

        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-9"
          style={{ filter: 'drop-shadow(0 0 16px rgba(207,255,106,0.18))' }}
        >
          <NextImage
            src={smallLogo}
            alt="SpotyFlex"
            width={100}
            height={100}
            className="brightness-110"
          />
        </motion.div>

        {/* Brand name */}
        <motion.span
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] font-black uppercase tracking-[0.55em] mb-10"
          style={{ color: 'rgba(255,255,255,0.1)' }}
        >
          SpotyFlex
        </motion.span>

        {/* Progress track */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.7 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.28, duration: 0.4 }}
        >
          <div
            className="relative overflow-hidden rounded-full"
            style={{ width: 100, height: 1.5, background: 'rgba(255,255,255,0.07)' }}
          >
            {/* Progress fill */}
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{ background: '#cfff6a' }}
              initial={{ width: '0%', opacity: 0.6 }}
              animate={{ width: ['0%', '35%', '62%', '80%', '90%'] }}
              transition={{
                duration: 2.6,
                times: [0, 0.25, 0.5, 0.75, 1],
                ease: 'easeOut',
              }}
            />

            {/* Shimmer */}
            <motion.div
              className="absolute top-0 h-full"
              style={{
                width: 40,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
              }}
              animate={{ left: ['-40px', '140px'] }}
              transition={{
                duration: 1.1,
                repeat: Infinity,
                repeatDelay: 0.8,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute bottom-8 flex items-center gap-3"
      >
        <div className="w-4 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
        <span
          className="text-[7.5px] font-black uppercase tracking-[0.45em]"
          style={{ color: 'rgba(255,255,255,0.08)' }}
        >
          Fitness · Nutrition · Guides
        </span>
        <div className="w-4 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
      </motion.div>

      {/* Top accent line pulse */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(207,255,106,0.18) 50%, transparent 100%)' }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}