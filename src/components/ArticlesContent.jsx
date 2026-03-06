'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PostCard, { PostCardWide } from './PostCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const FILTERS = [
  { id: 'all',       label: 'All'       },
  { id: 'workouts',  label: 'Workouts'  },
  { id: 'nutrition', label: 'Nutrition' },
  { id: 'guides',    label: 'Guides'    },
];

const ACCENT = {
  all:       { color: '#cfff6a', bg: 'rgba(207,255,106,0.1)',  border: 'rgba(207,255,106,0.2)'  },
  workouts:  { color: '#60a5fa', bg: 'rgba(96,165,250,0.1)',   border: 'rgba(96,165,250,0.2)'   },
  nutrition: { color: '#fb923c', bg: 'rgba(251,146,60,0.1)',   border: 'rgba(251,146,60,0.2)'   },
  guides:    { color: '#c084fc', bg: 'rgba(192,132,252,0.1)',  border: 'rgba(192,132,252,0.2)'  },
};

const PAGE_SIZE = 9;

export default function ArticlesContent({ articles = [] }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visible, setVisible]           = useState(PAGE_SIZE);

  const filtered = useMemo(() =>
    activeFilter === 'all'
      ? articles
      : articles.filter(a => a.category === activeFilter),
    [articles, activeFilter]
  );

  const [hero, ...rest] = filtered;
  const shown = rest.slice(0, visible - 1);
  const hasMore = visible - 1 < rest.length;
  const accent = ACCENT[activeFilter];

  function handleFilter(id) {
    setActiveFilter(id);
    setVisible(PAGE_SIZE);
  }

  return (
    <div className="min-h-screen" style={{ background: '#080808' }}>

      {/* ══════════════════════════
          HEADER
      ══════════════════════════ */}
      <div className="relative border-b" style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'linear-gradient(to bottom, #0d0d0d, #080808)' }}>
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px]"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(207,255,106,0.05) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-14">

          {/* Label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-[2px] rounded-full bg-[#cfff6a]" />
            <span className="text-[9px] font-black uppercase tracking-[0.45em]"
              style={{ color: 'rgba(255,255,255,0.2)' }}>
              All Articles
            </span>
          </div>

          {/* Headline + count */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h1
              className="text-white leading-[1.06]"
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                fontWeight: 900,
                letterSpacing: '-0.03em',
              }}
            >
              Every article,{' '}
              <span style={{ color: '#cfff6a' }}>in one place.</span>
            </h1>

            <div
              className="flex items-center gap-3 px-5 py-3 rounded-2xl shrink-0 self-start sm:self-auto"
              style={{ background: 'rgba(207,255,106,0.06)', border: '1px solid rgba(207,255,106,0.14)' }}
            >
              <span className="text-2xl font-black" style={{ color: '#cfff6a' }}>
                {filtered.length}
              </span>
              <div>
                <div className="text-[9px] font-black uppercase tracking-[0.3em]"
                  style={{ color: 'rgba(255,255,255,0.25)' }}>
                  {filtered.length === 1 ? 'Article' : 'Articles'}
                </div>
                <div className="text-[8px] font-bold uppercase tracking-wider"
                  style={{ color: 'rgba(255,255,255,0.1)' }}>
                  {activeFilter === 'all' ? 'Total' : activeFilter}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════
          FILTERS
      ══════════════════════════ */}
      <div
        className="sticky top-16 z-40 border-b"
        style={{ background: 'rgba(8,8,8,0.95)', borderColor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-2.5 overflow-x-auto scrollbar-hide">
          {FILTERS.map(f => {
            const a = ACCENT[f.id];
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => handleFilter(f.id)}
                className="px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap shrink-0"
                style={isActive
                  ? { background: a.bg, color: a.color, border: `1px solid ${a.border}`, boxShadow: `0 4px 20px -6px ${a.color}40` }
                  : { background: 'transparent', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.07)' }
                }
              >
                {f.label}
              </button>
            );
          })}

          <div className="flex-1" />

          {/* Category links */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {[
              { label: 'Beginner', href: '/category/beginner', color: '#c084fc' },
              { label: 'Fat Burning', href: '/category/fat-burning', color: '#60a5fa' },
              { label: 'Meal Plans', href: '/category/meal-plans', color: '#fb923c' },
            ].map(({ label, href, color }) => (
              <Link key={label} href={href}
                className="text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full transition-all duration-200"
                style={{ color: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════
          CONTENT
      ══════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-28">
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero wide card */}
              {hero && (
                <div className="mb-8">
                  <PostCardWide
                    title={hero.title}
                    introtext={hero.excerpt}
                    image={hero.image}
                    publishedAt={hero.publishedDate}
                    note={`${hero.readTime} min read`}
                    tags={hero.tags}
                    href={hero.slug}
                    category={hero.category}
                  />
                </div>
              )}

              {/* Grid */}
              {shown.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {shown.map((article, i) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      className="h-full"
                    >
                      <PostCard
                        title={article.title}
                        introtext={article.excerpt}
                        image={article.image}
                        publishedAt={article.publishedDate}
                        note={`${article.readTime} min read`}
                        tags={article.tags}
                        href={article.slug}
                        category={article.category}
                      />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Load more */}
              {hasMore && (
                <div className="flex flex-col items-center gap-3 mt-14">
                  <button
                    onClick={() => setVisible(v => v + PAGE_SIZE)}
                    className="group flex items-center gap-3 px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-300 hover:-translate-y-0.5"
                    style={{ background: accent.bg, border: `1px solid ${accent.border}`, color: accent.color }}
                  >
                    Load More
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em]"
                    style={{ color: 'rgba(255,255,255,0.12)' }}>
                    Showing {Math.min(visible, filtered.length)} of {filtered.length}
                  </span>
                </div>
              )}

              {/* All loaded indicator */}
              {!hasMore && filtered.length > PAGE_SIZE && (
                <div className="flex items-center justify-center gap-4 mt-14">
                  <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.04)' }} />
                  <span className="text-[9px] font-black uppercase tracking-[0.35em]"
                    style={{ color: 'rgba(255,255,255,0.12)' }}>
                    All {filtered.length} articles loaded
                  </span>
                  <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.04)' }} />
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 text-center rounded-3xl border border-dashed mt-4"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <p className="text-[13px] font-bold mb-1" style={{ color: 'rgba(255,255,255,0.2)' }}>
                No articles in this category yet.
              </p>
              <p className="text-[10px] font-black uppercase tracking-widest"
                style={{ color: 'rgba(255,255,255,0.08)' }}>
                Check back soon
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}