'use client';

import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />

      {/* Glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(207,255,106,0.04) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 text-center max-w-lg">
        {/* 404 number */}
        <div
          className="mb-6 leading-none select-none"
          style={{
            fontSize: 'clamp(7rem, 18vw, 14rem)',
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 900,
            letterSpacing: '-0.06em',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(207,255,106,0.15)',
          }}
        >
          404
        </div>

        {/* Accent bar */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-[2px] rounded-full bg-[#cfff6a]" />
          <div className="w-3 h-[2px] rounded-full bg-[#cfff6a] opacity-30" />
        </div>

        <h2
          className="text-white mb-4"
          style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.025em' }}
        >
          Article not found
        </h2>

        <p className="mb-10 text-[14px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
          The article you're looking for doesn't exist or has been moved. Head back home or browse our categories.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: '#cfff6a', color: '#0a0a0a' }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>

          <Link
            href="/search"
            className="flex items-center gap-2 px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:border-white/20 hover:text-white"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}
          >
            <Search className="w-3.5 h-3.5" />
            Search Articles
          </Link>
        </div>

        {/* Category links */}
        <div className="mt-12 flex items-center justify-center gap-6">
          {['workouts', 'nutrition', 'guides'].map(cat => (
            <Link
              key={cat}
              href={`/category/${cat}`}
              className="text-[9px] font-black uppercase tracking-[0.3em] transition-colors"
              style={{ color: 'rgba(255,255,255,0.2)' }}
              onMouseEnter={e => e.currentTarget.style.color = '#cfff6a'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}