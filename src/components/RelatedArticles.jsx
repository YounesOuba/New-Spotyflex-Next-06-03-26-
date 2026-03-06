import { getArticlesByCategory } from '@/lib/api';
import PostCard from '@/components/PostCard';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const CATEGORY_ACCENT = {
  workouts:  { color: '#60a5fa', bg: 'rgba(96,165,250,0.08)',  border: 'rgba(96,165,250,0.18)'  },
  nutrition: { color: '#fb923c', bg: 'rgba(251,146,60,0.08)',  border: 'rgba(251,146,60,0.18)'  },
  guides:    { color: '#c084fc', bg: 'rgba(192,132,252,0.08)', border: 'rgba(192,132,252,0.18)' },
};

const CATEGORY_DEFAULT_HREF = {
  workouts:  '/category/gym-workouts',
  nutrition: '/category/meal-plans',
  guides:    '/category/beginner',
};

export default async function RelatedArticles({ currentSlug, category }) {
  const allCategoryArticles = await getArticlesByCategory(category);

  const related = allCategoryArticles
    .filter(article => article.slug !== currentSlug)
    .slice(0, 3);

  if (related.length === 0) return null;

  const accent = CATEGORY_ACCENT[category] || { color: '#cfff6a', bg: 'rgba(207,255,106,0.08)', border: 'rgba(207,255,106,0.18)' };
  const href   = CATEGORY_DEFAULT_HREF[category] || '/articles';

  return (
    <section className="mt-24">

      {/* Top border with accent glow */}
      <div className="relative h-px mb-16"
        style={{ background: 'rgba(255,255,255,0.05)' }}>
        <div className="absolute left-0 top-0 h-px w-24 rounded-full"
          style={{ background: `linear-gradient(90deg, ${accent.color}, transparent)` }} />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-5 h-[2px] rounded-full" style={{ background: accent.color }} />
            <span className="text-[9px] font-black uppercase tracking-[0.4em]"
              style={{ color: 'rgba(255,255,255,0.2)' }}>
              Keep Reading
            </span>
          </div>
          <h3
            className="text-white leading-tight"
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
              fontFamily: 'var(--font-playfair), "Playfair Display", serif',
              fontWeight: 900,
              letterSpacing: '-0.025em',
            }}
          >
            More in{' '}
            <span style={{ color: accent.color }}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
          </h3>
        </div>

        <Link
          href={href}
          className="group hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5 shrink-0"
          style={{ color: accent.color, background: accent.bg, border: `1px solid ${accent.border}` }}
        >
          View all
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map(article => (
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

      {/* Mobile view all */}
      <div className="mt-8 sm:hidden">
        <Link
          href={href}
          className="group flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300"
          style={{ color: accent.color, background: accent.bg, border: `1px solid ${accent.border}` }}
        >
          View all {category} articles
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}