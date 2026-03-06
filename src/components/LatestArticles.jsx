'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PostCard, { PostCardWide } from './PostCard';
import { ChevronDown, Tag, Filter, X } from 'lucide-react';

const CATEGORIES = [
  { id: 'all',       label: 'All',       color: '#cfff6a', bg: 'rgba(207,255,106,0.1)',  border: 'rgba(207,255,106,0.22)', shadow: 'rgba(207,255,106,0.2)'  },
  { id: 'workouts',  label: 'Workouts',  color: '#60a5fa', bg: 'rgba(96,165,250,0.1)',   border: 'rgba(96,165,250,0.22)',  shadow: 'rgba(96,165,250,0.2)'   },
  { id: 'nutrition', label: 'Nutrition', color: '#fb923c', bg: 'rgba(251,146,60,0.1)',   border: 'rgba(251,146,60,0.22)',  shadow: 'rgba(251,146,60,0.2)'   },
  { id: 'guides',    label: 'Guides',    color: '#c084fc', bg: 'rgba(192,132,252,0.1)',  border: 'rgba(192,132,252,0.22)', shadow: 'rgba(192,132,252,0.2)'  },
];

export default function LatestArticles({ articles = [] }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTag,      setActiveTag]      = useState(null);
  const [visible,        setVisible]        = useState(10);
  const [tagsOpen,       setTagsOpen]       = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const tagsRef = useRef(null);

  const activeCat = CATEGORIES.find(c => c.id === activeCategory);

  const availableTags = useMemo(() => {
    const pool = activeCategory === 'all'
      ? articles
      : articles.filter(a => a.category?.toLowerCase() === activeCategory);
    return [...new Set(pool.flatMap(a => a.tags || []))].sort();
  }, [articles, activeCategory]);

  // Reset tag if not available in new category
  useEffect(() => {
    if (activeTag && !availableTags.includes(activeTag)) setActiveTag(null);
  }, [activeCategory, availableTags, activeTag]);

  // Reset visible on filter change
  useEffect(() => {
    setVisible(10);
  }, [activeCategory, activeTag]);

  // Close tags dropdown on outside click
  useEffect(() => {
    function handler(e) {
      if (tagsRef.current && !tagsRef.current.contains(e.target)) setTagsOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = useMemo(() => articles.filter(a => {
    const cat = activeCategory === 'all' || a.category?.toLowerCase() === activeCategory;
    const tag = !activeTag || (a.tags || []).includes(activeTag);
    return cat && tag;
  }), [articles, activeCategory, activeTag]);

  const [wide, ...rest] = filtered;
  const visibleRest = rest.slice(0, visible - 1);
  const hasMore = visible - 1 < rest.length;

  return (
    <section className="border-t" style={{ background: '#0d0d0d', borderColor: 'rgba(255,255,255,0.05)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-8 h-[2px] rounded-full" style={{ background: '#cfff6a' }} />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase"
              style={{ color: 'rgba(255,255,255,0.25)' }}>
              Latest Articles
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-black uppercase tracking-[0.2em]"
              style={{ color: activeCat.color }}>
              {filtered.length}
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]"
              style={{ color: 'rgba(255,255,255,0.18)' }}>
              {filtered.length === 1 ? 'Article' : 'Articles'}
            </span>
          </div>
        </div>

        {/* ── Filter bar ── */}
        {/* Desktop Filter Bar */}
        <div className="hidden sm:flex flex-wrap items-center gap-2 mb-10">

          {/* Category pills */}
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="relative px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300"
                style={isActive ? {
                  background: cat.bg,
                  color: cat.color,
                  border: `1px solid ${cat.border}`,
                  boxShadow: `0 6px 20px -6px ${cat.shadow}`,
                } : {
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.28)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="cat-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: cat.bg }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}

          {/* Divider */}
          {availableTags.length > 0 && (
            <div className="w-px h-5 mx-1"
              style={{ background: 'rgba(255,255,255,0.08)' }} />
          )}

          {/* Tag dropdown */}
          {availableTags.length > 0 && (
            <div ref={tagsRef} className="relative">
              <button
                onClick={() => setTagsOpen(v => !v)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.18em] transition-all duration-200"
                style={activeTag ? {
                  background: activeCat.bg,
                  color: activeCat.color,
                  border: `1px solid ${activeCat.border}`,
                } : {
                  background: 'rgba(255,255,255,0.03)',
                  color: 'rgba(255,255,255,0.3)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <Tag className="w-3 h-3" />
                {activeTag ? `#${activeTag}` : 'Filter by tag'}
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${tagsOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {tagsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full mt-2 left-0 z-50 min-w-[220px] p-3 rounded-2xl border"
                    style={{
                      background: '#141414',
                      borderColor: 'rgba(255,255,255,0.09)',
                      boxShadow: '0 20px 48px -8px rgba(0,0,0,0.7)',
                    }}
                  >
                    {/* Clear option */}
                    {activeTag && (
                      <button
                        onClick={() => { setActiveTag(null); setTagsOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.25em] mb-2 transition-all duration-150"
                        style={{ color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.04)' }}
                      >
                        ✕ Clear filter
                      </button>
                    )}

                    {/* Tag list */}
                    <div className="flex flex-col gap-0.5 max-h-52 overflow-y-auto">
                      {availableTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => { setActiveTag(tag); setTagsOpen(false); }}
                          className="w-full text-left px-3 py-2 rounded-xl text-[11px] font-medium transition-all duration-150"
                          style={activeTag === tag ? {
                            background: activeCat.bg,
                            color: activeCat.color,
                          } : {
                            color: 'rgba(255,255,255,0.45)',
                          }}
                        >
                          <span style={{ color: activeTag === tag ? activeCat.color : 'rgba(255,255,255,0.2)', marginRight: 6 }}>
                            #
                          </span>
                          {tag}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Filter Bar */}
        <div className="sm:hidden flex items-center justify-end gap-2 mb-10 -mt-14">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.18em] transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <Filter className="w-3.5 h-3.5" />
            Filter
            {(activeCategory !== 'all' || activeTag) && (
              <div className="w-1.5 h-1.5 rounded-full ml-1" style={{ background: activeCat.color }} />
            )}
          </button>
        </div>

        {/* Mobile Filter Sheet */}
        <AnimatePresence>
          {mobileFilterOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileFilterOpen(false)}
                className="fixed inset-0 bg-black bg-opacity-40 z-40"
              />
              
              {/* Sheet */}
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl border-t"
                style={{
                  background: '#0d0d0d',
                  borderColor: 'rgba(255,255,255,0.1)',
                  maxHeight: '85vh',
                }}
              >
                {/* Handle & Header */}
                <div className="sticky top-0 flex items-center justify-between px-6 py-4 border-b"
                  style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  <div className="flex-1" />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Filters
                  </span>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="w-7 h-7 flex items-center justify-center rounded-full transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                  >
                    <X className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.5)' }} />
                  </button>
                </div>

                {/* Filter Content */}
                <div className="overflow-y-auto px-6 py-6" style={{ maxHeight: 'calc(85vh - 70px)' }}>
                  {/* Category Section */}
                  <div className="mb-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] mb-3 block"
                      style={{ color: 'rgba(255,255,255,0.3)' }}>
                      Category
                    </span>
                    <div className="flex flex-col gap-2">
                      {CATEGORIES.map(cat => {
                        const isActive = activeCategory === cat.id;
                        return (
                          <button
                            key={cat.id}
                            onClick={() => {
                              setActiveCategory(cat.id);
                              setMobileFilterOpen(false);
                            }}
                            className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 text-left text-[12px] font-semibold"
                            style={isActive ? {
                              background: cat.bg,
                              color: cat.color,
                              border: `1px solid ${cat.border}`,
                            } : {
                              background: 'rgba(255,255,255,0.03)',
                              color: 'rgba(255,255,255,0.4)',
                              border: '1px solid rgba(255,255,255,0.06)',
                            }}
                          >
                            {cat.label}
                            {isActive && (
                              <div className="w-1.5 h-1.5 rounded-full" style={{ background: cat.color }} />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tag Section */}
                  {availableTags.length > 0 && (
                    <div className="mb-8">
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] mb-3 block"
                        style={{ color: 'rgba(255,255,255,0.3)' }}>
                        Tags ({availableTags.length})
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {availableTags.map(tag => (
                          <button
                            key={tag}
                            onClick={() => {
                              setActiveTag(activeTag === tag ? null : tag);
                            }}
                            className="px-3.5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-200"
                            style={activeTag === tag ? {
                              background: activeCat.bg,
                              color: activeCat.color,
                              border: `1px solid ${activeCat.border}`,
                            } : {
                              background: 'rgba(255,255,255,0.05)',
                              color: 'rgba(255,255,255,0.4)',
                              border: '1px solid rgba(255,255,255,0.08)',
                            }}
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <button
                      onClick={() => {
                        setActiveCategory('all');
                        setActiveTag(null);
                      }}
                      className="flex-1 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        color: 'rgba(255,255,255,0.4)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => setMobileFilterOpen(false)}
                      className="flex-1 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all"
                      style={{
                        background: activeCat.bg,
                        color: activeCat.color,
                        border: `1px solid ${activeCat.border}`,
                      }}
                    >
                      Done
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ── Articles ── */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={`${activeCategory}-${activeTag}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Wide first */}
              {wide && (
                <PostCardWide
                  title={wide.title}
                  introtext={wide.excerpt}
                  image={wide.image}
                  publishedAt={wide.publishedDate}
                  note={`${wide.readTime} min read`}
                  tags={wide.tags}
                  href={wide.slug}
                  category={wide.category}
                />
              )}

              {/* Grid */}
              {visibleRest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {visibleRest.map((article, i) => (
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
                <div className="flex flex-col items-center gap-2 pt-8">
                  <button
                    onClick={() => setVisible(v => v + 10)}
                    className="group flex items-center gap-2.5 px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: activeCat.bg,
                      color: activeCat.color,
                      border: `1px solid ${activeCat.border}`,
                    }}
                  >
                    Load More
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em]"
                    style={{ color: 'rgba(255,255,255,0.1)' }}>
                    {Math.min(visible, filtered.length)} of {filtered.length}
                  </span>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full py-24 rounded-3xl flex flex-col items-center justify-center text-center border-2 border-dashed"
              style={{ borderColor: 'rgba(255,255,255,0.04)' }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="text-xl" style={{ color: 'rgba(255,255,255,0.1)' }}>∅</span>
              </div>
              <p className="text-[13px] font-bold mb-1" style={{ color: 'rgba(255,255,255,0.25)' }}>
                No articles found
              </p>
              <p className="text-[10px] font-black uppercase tracking-widest mt-1"
                style={{ color: 'rgba(255,255,255,0.1)' }}>
                Try a different filter
              </p>
              {activeTag && (
                <button
                  onClick={() => setActiveTag(null)}
                  className="mt-5 text-[9px] font-black uppercase tracking-[0.25em] px-4 py-2 rounded-full transition-all"
                  style={{ color: activeCat.color, border: `1px solid ${activeCat.border}`, background: activeCat.bg }}
                >
                  Clear tag filter
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}