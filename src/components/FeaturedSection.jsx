'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import smallLogo from '../assets/Logo/Spoty.png';

const CATEGORY_COLORS = {
  workouts: { text: '#60a5fa', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.2)' },
  nutrition: { text: '#fb923c', bg: 'rgba(251,146,60,0.1)', border: 'rgba(251,146,60,0.2)' },
  guides: { text: '#c084fc', bg: 'rgba(192,132,252,0.1)', border: 'rgba(192,132,252,0.2)' },
};

function CategoryPill({ category }) {
  const c = CATEGORY_COLORS[category] || { text: '#cfff6a', bg: 'rgba(207,255,106,0.1)', border: 'rgba(207,255,106,0.2)' };
  return (
    <span
      className="inline-block text-[9px] font-black uppercase tracking-[0.25em] px-3 py-1 rounded-full"
      style={{ color: c.text, background: c.bg, border: `1px solid ${c.border}` }}
    >
      {category}
    </span>
  );
}

/* ── Big hero card (first article) ── */
function HeroCard({ article }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative rounded-3xl overflow-hidden group"
      style={{ minHeight: 'clamp(320px, 50vh, 520px)' }}
    >
      {/* Image */}
      <div className="absolute inset-0">
        {article.image ? (
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-[1.2s] group-hover:scale-105 brightness-75"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1c2a06] to-[#0e0e0e] flex items-center justify-center">
            <Image src={smallLogo} alt="SpotyFlex" className="opacity-10 scale-150 bg-[#212121]" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
      </div>

      {/* Top-left label */}
      <div className="absolute top-6 left-6 z-10">
        <span className="text-[9px] font-black tracking-[0.4em] uppercase text-[#cfff6a] bg-[#cfff6a]/10 border border-[#cfff6a]/20 px-3 py-1.5 rounded-full backdrop-blur-md">
          ★ Editor's Pick
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-8 lg:p-10">
        <CategoryPill category={article.category} />

        <h2
          className="mt-4 mb-4 text-white leading-[1.1] tracking-tight transition-colors duration-300 group-hover:text-[#cfff6a]"
          style={{
            fontSize: 'clamp(1.6rem, 3vw, 2.6rem)',
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 900,
          }}
        >
          {article.title}
        </h2>

        <p className="text-white/50 text-[15px] leading-relaxed mb-6 max-w-xl line-clamp-2">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-white/30 text-[11px] font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-[#cfff6a]/50" />
            {article.readTime} min read
            <span className="w-1 h-1 rounded-full bg-white/20" />
            {new Date(article.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>

          <Link
            href={`/article/${article.slug}`}
            className="group/btn flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all duration-300"
            style={{ background: '#cfff6a', color: '#0a0a0a' }}
            onMouseEnter={e => e.currentTarget.style.background = '#fff'}
            onMouseLeave={e => e.currentTarget.style.background = '#cfff6a'}
          >
            Read
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Small side card ── */
function SideCard({ article, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      <Link
        href={`/article/${article.slug}`}
        className="group flex gap-4 p-4 rounded-2xl transition-all duration-300 hover:bg-white/[0.04] border border-transparent hover:border-white/[0.07]"
      >
        {/* Thumbnail */}
        <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-white/5">
          {article.image ? (
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-90"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Image src={smallLogo} alt="" className="opacity-10 scale-110 bg-[#212121]" />
            </div>
          )}
        </div>

        {/* Text */}
        <div className="flex flex-col justify-between py-0.5 flex-1 min-w-0">
          <div>
            <CategoryPill category={article.category} />
            <h3
              className="mt-2 text-[14px] font-bold text-white/85 leading-snug group-hover:text-white transition-colors line-clamp-2"
              style={{ letterSpacing: '-0.01em' }}
            >
              {article.title}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-white/25 text-[10px] font-bold uppercase tracking-wider mt-2">
            <Clock className="w-3 h-3 text-[#cfff6a]/40" />
            {article.readTime} min
            <span className="w-1 h-1 rounded-full bg-white/15" />
            {new Date(article.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        </div>

        <ArrowRight className="w-4 h-4 text-white/10 group-hover:text-[#cfff6a] transition-all shrink-0 self-center -translate-x-1 group-hover:translate-x-0" />
      </Link>
    </motion.div>
  );
}

/* ── Main export ── */
export default function FeaturedSection({ articles = [] }) {
  if (!articles || articles.length === 0) return null;

  const [hero, ...rest] = articles;

  return (
    <section className="bg-[#0d0d0d] border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-12"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-[2px] bg-[#cfff6a] rounded-full" />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/30">
              Featured Stories
            </span>
          </div>
          <Link
            href="/articles"
            className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 hover:text-[#cfff6a] transition-colors"
          >
            View all
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Layout: big card left, list right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-6 lg:gap-8">

          {/* Hero card */}
          <HeroCard article={hero} />

          {/* Side list */}
          <div className="flex flex-col">

            {/* List header */}
            <div className="flex items-center gap-3 mb-4 px-4">
              <span className="text-[9px] font-black tracking-[0.35em] uppercase text-white/15">Also Worth Reading</span>
              <div className="flex-1 h-px bg-white/[0.05]" />
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-1">
              {rest.slice(0, 4).map((article, i) => (
                <SideCard key={article.id} article={article} index={i} />
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-6 px-4"
            >
              <Link
                href="/articles"
                className="group w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl border border-white/[0.07] hover:border-[#cfff6a]/20 hover:bg-[#cfff6a]/[0.04] transition-all duration-300"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/25 group-hover:text-[#cfff6a]/70 transition-colors">
                  Browse All Articles
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-white/15 group-hover:text-[#cfff6a]/70 transition-all group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}