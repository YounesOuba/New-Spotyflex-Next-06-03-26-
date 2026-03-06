import { getAllArticles, getArticleBySlug } from '@/lib/api';
import { getCategoryBySlug } from '@/lib/categories';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import PostCard from '@/components/PostCard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import StartHereArticle from '@/components/StartHereArticle';

export async function generateStaticParams() {
    const { categories } = await import('@/lib/categories');
    return categories.map(c => ({ category: c.slug }));
}

export async function generateMetadata({ params }) {
    const { category: slug } = await params;
    const cat = getCategoryBySlug(slug);
    if (!cat) return { title: 'Category Not Found' };
    return {
        title: cat.title,
        description: cat.metaDesc,
        openGraph: { title: cat.title, description: cat.metaDesc },
    };
}

const CATEGORY_ACCENT = {
    workouts: { color: '#60a5fa', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.18)' },
    nutrition: { color: '#fb923c', bg: 'rgba(251,146,60,0.08)', border: 'rgba(251,146,60,0.18)' },
    guides: { color: '#c084fc', bg: 'rgba(192,132,252,0.08)', border: 'rgba(192,132,252,0.18)' },
};

export default async function CategoryPage({ params }) {
    const { category: slug } = await params;
    const cat = getCategoryBySlug(slug);
    if (!cat) notFound();

    const accent = CATEGORY_ACCENT[cat.backendCategory] || {
        color: '#cfff6a',
        bg: 'rgba(207,255,106,0.08)',
        border: 'rgba(207,255,106,0.18)',
    };

    const allArticles = await getAllArticles();

    // Pinning Logic:
    // If we're in the 'guides' category, fetch the "Start Here" article (ID 41)
    let pinnedArticle = null;
    if (slug === 'guides') {
        pinnedArticle = await getArticleBySlug('41-start-here');
    }

    // Filtering logic:
    // 1. Must match the backendCategory.
    // 2. If the category configuration has filterTags, the article MUST have at least one matching tag.
    // 3. If no filterTags are defined for the category, we show all articles in that backendCategory.
    // 4. Exclude the pinned article if it exists.
    const articles = allArticles.filter(article => {
        // Exclude pinned article
        if (pinnedArticle && article.id === pinnedArticle.id) return false;

        // 1. Category check
        if (article.category !== cat.backendCategory) return false;

        // 2. Tag check (if filterTags exist)
        if (cat.filterTags && cat.filterTags.length > 0) {
            if (!article.tags || article.tags.length === 0) return false;
            return cat.filterTags.some(tag =>
                article.tags.some(t => t.toLowerCase() === tag.toLowerCase())
            );
        }

        // 3. No filterTags? Show everything in this backendCategory
        return true;
    });

    return (
        <div className="min-h-screen" style={{ background: '#080808' }}>

            {/* ── Hero Banner ── */}
            <div className="relative w-full overflow-hidden" style={{ height: 'clamp(280px, 40vh, 420px)' }}>
                {cat.img && (
                    <Image
                        src={cat.img}
                        alt={cat.title}
                        fill
                        className="object-cover"
                        style={{ filter: 'brightness(0.4) saturate(0.8)' }}
                        priority
                    />
                )}
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to bottom, transparent 30%, #080808 100%)' }}
                />

                {/* Accent glow */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 30% 60%, ${accent.bg} 0%, transparent 60%)` }}
                />

                {/* Overlay content */}
                <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 pb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] mb-5 transition-colors"
                        style={{ color: 'rgba(255,255,255,0.3)' }}
                    >
                        <ArrowLeft className="w-3 h-3" />
                        Home
                    </Link>

                    <div className="flex items-center gap-3 mb-4">
                        <span
                            className="text-[8px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-full"
                            style={{
                                color: accent.color,
                                background: 'rgba(0,0,0,0.6)',
                                border: `1px solid ${accent.border}`,
                                backdropFilter: 'blur(8px)',
                            }}
                        >
                            {cat.backendCategory}
                        </span>
                    </div>

                    <h1
                        className="text-white mb-3 leading-tight"
                        style={{
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            fontFamily: 'var(--font-playfair), serif',
                            fontWeight: 900,
                            letterSpacing: '-0.03em',
                        }}
                    >
                        {cat.title}
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem' }}>{cat.desc}</p>
                </div>
            </div>

            {/* ── Article count strip ── */}
            <div
                className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8"
            >
                {/* Pinned Article Section */}
                {pinnedArticle && (
                    <div className="mb-4">
                        <StartHereArticle post={{
                            ...pinnedArticle,
                            href: pinnedArticle.slug,
                            introtext: pinnedArticle.excerpt,
                            note: `${pinnedArticle.readTime} min read`
                        }} />
                        <div className="h-px w-full mt-10" style={{ background: 'rgba(255,255,255,0.05)' }} />
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <div className="w-6 h-[2px] rounded-full" style={{ background: accent.color }} />
                    <span
                        className="text-[10px] font-black uppercase tracking-[0.35em]"
                        style={{ color: 'rgba(255,255,255,0.25)' }}
                    >
                        {articles.length} {articles.length === 1 ? 'Article' : 'Articles'}
                    </span>
                </div>
            </div>

            {/* ── Article Grid ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 pb-28">
                {articles.length > 0 ? (
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
                ) : (
                    <div
                        className="py-24 text-center rounded-3xl border border-dashed"
                        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                    >
                        <p className="text-[13px] font-bold" style={{ color: 'rgba(255,255,255,0.25)' }}>
                            No articles yet in this category.
                        </p>
                        <p
                            className="text-[10px] font-black uppercase tracking-widest mt-2"
                            style={{ color: 'rgba(255,255,255,0.1)' }}
                        >
                            Check back soon
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
