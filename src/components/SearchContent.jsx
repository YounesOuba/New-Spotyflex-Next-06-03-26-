'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PostCard from '@/components/PostCard';
import Link from 'next/link';
import {
  Search as SearchIcon,
  ArrowLeft,
  Hash,
  Dumbbell,
  Apple,
  BookOpen,
  Flame,
  ChevronRight,
} from 'lucide-react';

/* ── Constants ─────────────────────────────────────────────────── */

const CATEGORY_STYLES = {
  workouts: { color: '#60a5fa', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.2)', dot: '#60a5fa' },
  nutrition: { color: '#fb923c', bg: 'rgba(251,146,60,0.08)', border: 'rgba(251,146,60,0.2)', dot: '#fb923c' },
  guides: { color: '#c084fc', bg: 'rgba(192,132,252,0.08)', border: 'rgba(192,132,252,0.2)', dot: '#c084fc' },
};

const POPULAR_TAGS = [
  'HIIT', 'Meal Prep', 'Protein', 'Cardio', 'Beginner',
  'Fat Burning', 'Supplements', 'Recovery', 'Gym', 'Home Workout',
];

const BROWSE_CATEGORIES = [
  {
    key: 'workouts',
    label: 'Workouts',
    desc: 'Training programs & routines',
    href: '/category/workouts',
    Icon: Dumbbell,
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.08)',
    border: 'rgba(96,165,250,0.18)',
  },
  {
    key: 'nutrition',
    label: 'Nutrition',
    desc: 'Meal plans & healthy recipes',
    href: '/category/nutrition',
    Icon: Apple,
    color: '#fb923c',
    bg: 'rgba(251,146,60,0.08)',
    border: 'rgba(251,146,60,0.18)',
  },
  {
    key: 'guides',
    label: 'Guides',
    desc: 'In-depth fitness knowledge',
    href: '/category/guides',
    Icon: BookOpen,
    color: '#c084fc',
    bg: 'rgba(192,132,252,0.08)',
    border: 'rgba(192,132,252,0.18)',
  },
];

/* ── Helpers ────────────────────────────────────────────────────── */

import { scoreArticle, normalizeText, tokenizeQuery } from '@/lib/search';

function stripHtml(html = '') {
  return html
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<style[^>]*>.*?<\/style>/gi, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/* ── Skeleton card ──────────────────────────────────────────────── */

function SkeletonCard() {
  return (
    <div
      className="h-72 rounded-2xl animate-pulse"
      style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.05)' }}
    />
  );
}

/* ── Section header ─────────────────────────────────────────────── */

function CategoryHeader({ label, count, color }) {
  return (
    <div className="flex items-center gap-4 mb-7">
      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
      <span
        className="text-[9px] font-black uppercase tracking-[0.35em]"
        style={{ color }}
      >
        {label}
      </span>
      <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
      <span
        className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
        style={{ color, background: `${color}15`, border: `1px solid ${color}30` }}
      >
        {count} {count === 1 ? 'article' : 'articles'}
      </span>
    </div>
  );
}

/* ── Popular tag pill ───────────────────────────────────────────── */

function TagPill({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      id={`tag-pill-${label.replace(/\s+/g, '-').toLowerCase()}`}
      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-200 text-[11px] font-bold"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: 'rgba(255,255,255,0.5)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(207,255,106,0.08)';
        e.currentTarget.style.borderColor = 'rgba(207,255,106,0.22)';
        e.currentTarget.style.color = '#cfff6a';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
      }}
    >
      <Hash className="w-2.5 h-2.5 opacity-60" />
      {label}
    </button>
  );
}

/* ── Main component ─────────────────────────────────────────────── */

export default function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get('q') || '';

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  /* Load articles once on mount */
  useEffect(() => {
    import('@/lib/api').then(({ getAllArticles }) => {
      getAllArticles().then(data => {
        setArticles(data);
        setLoading(false);
      });
    });
  }, []);

  const query = q.toLowerCase().trim();

  /* Ranked + grouped results */
  const { grouped, totalCount } = useMemo(() => {
    if (!query || articles.length === 0) {
      return { grouped: { workouts: [], nutrition: [], guides: [] }, totalCount: 0 };
    }

    const ranked = articles
      .map(a => ({ ...a, _score: scoreArticle(a, query) }))
      .filter(a => a._score > 0)
      .sort((a, b) => b._score - a._score);

    const g = { workouts: [], nutrition: [], guides: [] };
    ranked.forEach(a => {
      if (g[a.category]) g[a.category].push(a);
    });

    return {
      grouped: g,
      totalCount: ranked.length,
    };
  }, [articles, query]);

  /* Latest articles for no-query state */
  const latestArticles = useMemo(() => articles.slice(0, 6), [articles]);

  /* Navigation helper */
  const pushQuery = tag => router.push(`/search?q=${encodeURIComponent(tag)}`);

  return (
    <div className="min-h-screen" style={{ background: '#080808' }}>

      {/* ── Header panel ── */}
      <div className="border-b" style={{ borderColor: 'rgba(255,255,255,0.05)', background: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] mb-10 transition-colors text-white/20 hover:text-[#cfff6a]"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Home
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-[2px] rounded-full" style={{ background: '#cfff6a' }} />
                <span className="text-[9px] font-black uppercase tracking-[0.4em]"
                  style={{ color: 'rgba(255,255,255,0.2)' }}>
                  {query ? 'Search Results' : 'Explore'}
                </span>
              </div>

              {query ? (
                <h1
                  className="text-white leading-[1.06] mb-3"
                  style={{
                    fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
                    fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                    fontWeight: 900,
                    letterSpacing: '-0.03em',
                  }}
                >
                  Results for{' '}
                  <span style={{ color: '#cfff6a' }}>"{q}"</span>
                </h1>
              ) : (
                <h1
                  className="text-white leading-[1.06] mb-3"
                  style={{
                    fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
                    fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                    fontWeight: 900,
                    letterSpacing: '-0.03em',
                  }}
                >
                  What are you{' '}
                  <span style={{ color: '#cfff6a' }}>looking for?</span>
                </h1>
              )}

              <p className="text-[14px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {query
                  ? 'Showing matching articles across all categories'
                  : 'Browse topics, categories, or our latest articles below'}
              </p>
            </div>

            {/* Total count badge */}
            {query && !loading && (
              <div
                className="flex items-center gap-3 px-6 py-4 rounded-2xl shrink-0 self-start sm:self-auto"
                style={{ background: 'rgba(207,255,106,0.06)', border: '1px solid rgba(207,255,106,0.15)' }}
              >
                <span className="text-2xl font-black" style={{ color: '#cfff6a' }}>
                  {totalCount}
                </span>
                <div>
                  <div className="text-[9px] font-black uppercase tracking-[0.3em]"
                    style={{ color: 'rgba(255,255,255,0.25)' }}>
                    {totalCount === 1 ? 'Article' : 'Articles'}
                  </div>
                  <div className="text-[8px] font-bold uppercase tracking-wider"
                    style={{ color: 'rgba(255,255,255,0.12)' }}>
                    Found
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 pb-28">

        {/* ════ LOADING state ════ */}
        {loading && query && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* ════ RESULTS state ════ */}
        {!loading && query && totalCount > 0 && (
          <div className="space-y-16">
            {Object.entries(grouped).map(([cat, articles]) => {
              if (articles.length === 0) return null;
              const style = CATEGORY_STYLES[cat] || CATEGORY_STYLES.guides;
              const label = cat.charAt(0).toUpperCase() + cat.slice(1);
              return (
                <section key={cat} id={`results-${cat}`}>
                  <CategoryHeader label={label} count={articles.length} color={style.color} />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map(article => (
                      <PostCard
                        key={article.id}
                        title={article.title}
                        introtext={article.excerpt}
                        image={article.image}
                        publishedAt={article.publishedDate}
                        note={`${article.readTime} min read`}
                        tags={article.tags}
                        href={article.slug}
                        category={article.category}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* ════ NO RESULTS state ════ */}
        {!loading && query && totalCount === 0 && (
          <div className="max-w-lg mx-auto text-center py-24 rounded-3xl border border-dashed mt-4"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <SearchIcon className="w-7 h-7" style={{ color: 'rgba(255,255,255,0.1)' }} />
            </div>
            <h3 className="text-[18px] font-bold text-white mb-2">
              No results for "{q}"
            </h3>
            <p className="text-[13px] leading-relaxed mb-8 max-w-xs mx-auto"
              style={{ color: 'rgba(255,255,255,0.3)' }}>
              Try different keywords or explore one of these popular topics.
            </p>

            {/* Suggestion pills */}
            <div className="mb-7">
              <p className="text-[9px] font-black uppercase tracking-[0.28em] mb-4"
                style={{ color: 'rgba(255,255,255,0.18)' }}>
                Try searching for
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {POPULAR_TAGS.slice(0, 6).map(tag => (
                  <TagPill key={tag} label={tag} onClick={() => pushQuery(tag)} />
                ))}
              </div>
            </div>

            {/* Category shortcuts */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {BROWSE_CATEGORIES.map(({ key, label, href, color, bg, border }) => (
                <Link
                  key={key}
                  href={href}
                  className="text-[9px] font-black uppercase tracking-[0.25em] px-4 py-2 rounded-full transition-all"
                  style={{ color, background: bg, border: `1px solid ${border}` }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ════ NO QUERY state ════ */}
        {!loading && !query && (
          <div className="space-y-20">

            {/* — Popular Topics — */}
            <section id="popular-topics">
              <div className="flex items-center gap-4 mb-8">
                <Flame className="w-4 h-4" style={{ color: '#cfff6a' }} />
                <span className="text-[9px] font-black uppercase tracking-[0.35em]"
                  style={{ color: 'rgba(255,255,255,0.25)' }}>
                  Popular Topics
                </span>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
              </div>
              <div className="flex flex-wrap gap-2.5">
                {POPULAR_TAGS.map(tag => (
                  <TagPill key={tag} label={tag} onClick={() => pushQuery(tag)} />
                ))}
              </div>
            </section>

            {/* — Browse Categories — */}
            <section id="browse-categories">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[9px] font-black uppercase tracking-[0.35em]"
                  style={{ color: 'rgba(255,255,255,0.25)' }}>
                  Browse Categories
                </span>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {BROWSE_CATEGORIES.map(({ key, label, desc, href, Icon, color, bg, border }) => (
                  <Link
                    key={key}
                    href={href}
                    id={`browse-${key}`}
                    className="group flex flex-col gap-4 p-6 rounded-2xl transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = bg;
                      e.currentTarget.style.borderColor = border;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.025)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: bg, border: `1px solid ${border}` }}
                    >
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                    <div>
                      <div className="font-bold text-white/80 group-hover:text-white transition-colors mb-1">
                        {label}
                      </div>
                      <div className="text-[12px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.33)' }}>
                        {desc}
                      </div>
                    </div>
                    <ChevronRight
                      className="w-4 h-4 mt-auto self-end -translate-x-1 group-hover:translate-x-0 transition-transform duration-300"
                      style={{ color }}
                    />
                  </Link>
                ))}
              </div>
            </section>

            {/* — Latest Articles — */}
            <section id="latest-articles">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[9px] font-black uppercase tracking-[0.35em]"
                  style={{ color: 'rgba(255,255,255,0.25)' }}>
                  Latest Articles
                </span>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
                <Link
                  href="/articles"
                  className="text-[9px] font-black uppercase tracking-[0.2em] transition-colors text-white/20 hover:text-[#cfff6a]"
                >
                  View all
                </Link>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {latestArticles.map(article => (
                    <PostCard
                      key={article.id}
                      title={article.title}
                      introtext={article.excerpt}
                      image={article.image}
                      publishedAt={article.publishedDate}
                      note={`${article.readTime} min read`}
                      tags={article.tags}
                      href={article.slug}
                      category={article.category}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {/* Loading spinner for no-query state while articles are loading */}
        {loading && !query && (
          <div className="space-y-20">
            <section>
              <div className="h-6 w-40 rounded-xl animate-pulse mb-8" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <div className="flex flex-wrap gap-2.5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="h-8 rounded-full animate-pulse" style={{ width: `${60 + i * 8}px`, background: 'rgba(255,255,255,0.04)' }} />
                ))}
              </div>
            </section>
            <section>
              <div className="h-6 w-48 rounded-xl animate-pulse mb-8" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[1, 2, 3].map(i => <div key={i} className="h-40 rounded-2xl animate-pulse" style={{ background: 'rgba(255,255,255,0.035)' }} />)}
              </div>
            </section>
            <section>
              <div className="h-6 w-44 rounded-xl animate-pulse mb-8" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            </section>
          </div>
        )}

      </div>
    </div>
  );
}