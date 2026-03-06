import { Suspense } from 'react';
import { getArticleBySlug, getAllArticles } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Calendar } from 'lucide-react';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import TableOfContents from '@/components/TableOfContents';
import ShareButtons from '@/components/ShareButtons';
import RelatedArticles from '@/components/RelatedArticles';
import Comments from '@/components/Comments';
import { Breadcrumb } from '@/components/Breadcrumb';
import { CategoryBackLink, CategoryMoreLink } from '@/components/ArticlePageClient';
import SaveButton from '@/components/SaveButton';
import smallLogo from '@/assets/Logo/Spoty.png';

const CATEGORY_ACCENT = {
  workouts: { color: '#60a5fa', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.18)', glow: 'rgba(96,165,250,0.06)' },
  nutrition: { color: '#fb923c', bg: 'rgba(251,146,60,0.08)', border: 'rgba(251,146,60,0.18)', glow: 'rgba(251,146,60,0.06)' },
  guides: { color: '#c084fc', bg: 'rgba(192,132,252,0.08)', border: 'rgba(192,132,252,0.18)', glow: 'rgba(192,132,252,0.06)' },
};
const DEFAULT_ACCENT = { color: '#cfff6a', bg: 'rgba(207,255,106,0.08)', border: 'rgba(207,255,106,0.18)', glow: 'rgba(207,255,106,0.05)' };

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const article = await getArticleBySlug(resolvedParams.slug);
  if (!article) return { title: 'Article Not Found - SpotyFlex' };

  // SEO limits: title ~60, description ~155
  const seoTitle = article.title.length > 60 ? `${article.title.substring(0, 57)}...` : article.title;
  const seoDesc = (article.excerpt?.replace(/<[^>]*>/g, '') || article.title).substring(0, 155);

  return {
    title: seoTitle,
    description: seoDesc,
    alternates: { canonical: `https://spotyflex.com/article/${article.slug}` },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      images: article.image ? [article.image] : [],
      type: 'article',
      publishedTime: article.publishedDate,
      modifiedTime: article.updatedDate,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDesc,
      images: article.image ? [article.image] : [],
    },
  };
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map(a => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }) {
  const resolvedParams = await params;
  const article = await getArticleBySlug(resolvedParams.slug);
  if (!article) notFound();

  const accent = CATEGORY_ACCENT[article.category] || DEFAULT_ACCENT;

  const breadcrumbItems = [
    { label: article.category.charAt(0).toUpperCase() + article.category.slice(1), path: `/category/${article.category}` },
    { label: article.title, current: true },
  ];

  const cleanExcerpt = article.excerpt?.replace(/<[^>]*>/g, '').substring(0, 220);

  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": article.title,
          "image": article.image,
          "author": { "@type": "Person", "name": article.author || 'SpotyFlex Team' },
          "publisher": { "@type": "Organization", "name": "SpotyFlex" },
          "datePublished": article.publishedDate,
          "dateModified": article.updatedDate,
          "description": cleanExcerpt,
          "mainEntityOfPage": { "@type": "WebPage", "@id": `https://spotyflex.com/article/${article.slug}` }
        })
      }} />

      <ReadingProgressBar />

      <div className="min-h-screen" style={{ background: '#080808' }}>

        {/* ══════════════════════════════════════════
            HERO — 90svh cinematic banner
        ══════════════════════════════════════════ */}
        <div className="relative w-full" style={{ height: '90svh' }}>

          {/* Image */}
          {article.image ? (
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              style={{ filter: 'brightness(0.92) saturate(1)' }}
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: '#141414' }}>
              <Image src={smallLogo} alt="SpotyFlex" className="opacity-5 bg-[#212121]" />
            </div>
          )}

          {/* Gradient — image fades into page bg */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.2) 0%, transparent 20%, rgba(8,8,8,0.35) 65%, #080808 100%)' }} />

          {/* Accent glow bottom-left */}
          <div className="absolute bottom-0 left-0 w-[600px] h-[350px] pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 0% 100%, ${accent.glow} 0%, transparent 65%)` }} />

          {/* Breadcrumb — top */}
          <div className="absolute top-0 left-0 right-0 z-20">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          {/* Bottom overlay content */}
          <div className="absolute bottom-0 left-0 right-0 z-20 max-w-6xl mx-auto px-4 sm:px-6 pb-16">
            {/* Pills row */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span
                className="text-[8.5px] font-black uppercase tracking-[0.35em] px-3.5 py-1.5 rounded-full"
                style={{ color: accent.color, background: 'rgba(0,0,0,0.65)', border: `1px solid ${accent.border}`, backdropFilter: 'blur(10px)' }}
              >
                {article.category}
              </span>
              {article.tags?.slice(0, 3).map((tag, i) => (
                <span key={i}
                  className="text-[7.5px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full hidden sm:inline-block"
                  style={{ color: 'rgba(255,255,255,0.35)', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(6px)' }}>
                  #{tag}
                </span>
              ))}
            </div>

            {/* Scroll indicator */}
            <div className="flex items-center gap-2.5">
              <div className="flex flex-col gap-[3px]">
                <div className="w-4 h-[1.5px] rounded-full" style={{ background: accent.color, opacity: 0.6 }} />
                <div className="w-2.5 h-[1.5px] rounded-full" style={{ background: accent.color, opacity: 0.3 }} />
              </div>
              <span className="text-[8px] font-black uppercase tracking-[0.35em]"
                style={{ color: 'rgba(255,255,255,0.2)' }}>
                Scroll to read
              </span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            TITLE PANEL
        ══════════════════════════════════════════ */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-14 pb-12 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>

            <div className="mb-7">
              <CategoryBackLink category={article.category} accent={accent} />
            </div>

            <h1
              className="text-white leading-[1.06] mb-7"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.75rem)',
                fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                maxWidth: '860px',
              }}
            >
              {article.title}
            </h1>

            {/* Excerpt / lede */}
            {cleanExcerpt && (
              <p className="mb-9 max-w-2xl"
                style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>
                {cleanExcerpt}{article.excerpt?.length > 220 ? '…' : ''}
              </p>
            )}

            {/* Meta strip */}
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
                  style={{ background: accent.bg, border: `1px solid ${accent.border}` }}>
                  <Image src={smallLogo} alt="SF" className="opacity-80 w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-[12px] font-bold" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    {article.author || 'SpotyFlex Team'}
                  </div>
                  <div className="text-[9px] font-black uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.2)' }}>Author</div>
                </div>
              </div>

              <div className="w-px h-7" style={{ background: 'rgba(255,255,255,0.07)' }} />

              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider"
                style={{ color: 'rgba(255,255,255,0.3)' }}>
                <Calendar className="w-3.5 h-3.5" style={{ color: accent.color, opacity: 0.8 }} />
                <time dateTime={article.publishedDate}>
                  {new Date(article.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
              </div>

              <div className="w-px h-7" style={{ background: 'rgba(255,255,255,0.07)' }} />

              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider"
                style={{ color: 'rgba(255,255,255,0.3)' }}>
                <Clock className="w-3.5 h-3.5" style={{ color: accent.color, opacity: 0.8 }} />
                <span>{article.readTime} min read</span>
              </div>

              <div className="w-px h-7" style={{ background: 'rgba(255,255,255,0.07)' }} />

              <SaveButton article={article} variant="hero" />
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            CONTENT GRID
        ══════════════════════════════════════════ */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-10">

            {/* ── LEFT: Article body ── */}
            <div className="min-w-0 relative z-10">
              {article.content ? (
                <div className="article-content clear-both" dangerouslySetInnerHTML={{ __html: article.content }} />
              ) : (
                <div className="py-20 text-center rounded-3xl border border-dashed"
                  style={{ borderColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.2)' }}>
                  <p className="text-sm font-bold">No content available.</p>
                </div>
              )}

              {/* Share */}
              <div className="mt-20">
                <ShareButtons title={article.title} slug={article.slug} />
              </div>

              {/* Comments */}
              <Comments slug={article.slug} accent={accent} />

              {/* Author card */}
              <div
                className="mt-8 p-7 rounded-3xl flex items-center gap-6 border"
                style={{
                  background: 'linear-gradient(135deg, #141414 0%, #101010 100%)',
                  borderColor: 'rgba(255,255,255,0.06)',
                  boxShadow: `0 0 60px -30px ${accent.glow}`,
                }}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden"
                  style={{ background: accent.bg, border: `1px solid ${accent.border}` }}>
                  <Image src={smallLogo} alt="SF" className="opacity-80 w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-bold mb-0.5" style={{ color: 'rgba(255,255,255,0.8)' }}>
                    {article.author || 'SpotyFlex Team'}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.22)' }}>
                    {new Date(article.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
                <div className="hidden sm:flex flex-col items-end gap-2.5">
                  <span
                    className="text-[8px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-full"
                    style={{ color: accent.color, background: accent.bg, border: `1px solid ${accent.border}` }}
                  >
                    {article.category}
                  </span>
                  <CategoryMoreLink category={article.category} accent={accent} />
                </div>
              </div>

              {/* Related */}
              <Suspense fallback={
                <div className="mt-20 h-48 rounded-3xl animate-pulse" style={{ background: 'rgba(255,255,255,0.02)' }} />
              }>
                <RelatedArticles currentSlug={article.slug} category={article.category} />
              </Suspense>
            </div>

            {/* ── RIGHT: Sticky sidebar ── */}
            <aside className="hidden md:block relative z-10">
              <div className="sticky top-28 space-y-5 max-h-[calc(100vh-140px)] overflow-y-auto pr-3 sidebar-scrollbar">
                {/* TOC */}
                <TableOfContents />

                {/* Article info */}
                <div className="p-5 rounded-2xl border" style={{ background: '#111111', borderColor: 'rgba(255,255,255,0.05)' }}>
                  <p className="text-[8px] font-black uppercase tracking-[0.35em] mb-4" style={{ color: 'rgba(255,255,255,0.18)' }}>
                    Article Info
                  </p>
                  <div className="space-y-3">
                    {[
                      { label: 'Category', value: article.category },
                      { label: 'Read Time', value: `${article.readTime} min` },
                      { label: 'Published', value: new Date(article.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
                      { label: 'Author', value: article.author || 'SpotyFlex Team' },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between gap-4">
                        <span className="text-[8.5px] font-black uppercase tracking-[0.18em]" style={{ color: 'rgba(255,255,255,0.2)' }}>{label}</span>
                        <span className="text-[11px] font-bold capitalize truncate" style={{ color: 'rgba(255,255,255,0.5)' }}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="p-5 rounded-2xl border" style={{ background: accent.bg, borderColor: accent.border }}>
                  <p className="text-[11px] font-bold mb-4 leading-snug" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    Explore more {article.category} articles
                  </p>
                  <CategoryMoreLink category={article.category} accent={accent} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* ── Content styles ── */}
      <style>{`
        .article-content {
          color: rgba(255,255,255,0.62);
          font-size: 1.065rem;
          line-height: 1.9;
        }
        .article-content h2 {
          font-family: var(--font-playfair), 'Playfair Display', Georgia, serif;
          font-size: clamp(1.45rem, 3vw, 1.9rem);
          font-weight: 900;
          letter-spacing: -0.025em;
          color: #fff;
          margin-top: 3rem;
          margin-bottom: 1rem;
          line-height: 1.15;
        }
        .article-content h3 {
          font-size: 1.15rem;
          font-weight: 800;
          color: rgba(255,255,255,0.88);
          margin-top: 2.2rem;
          margin-bottom: 0.75rem;
          letter-spacing: -0.015em;
          line-height: 1.3;
        }
        .article-content h4 {
          font-size: 0.75rem;
          font-weight: 800;
          color: rgba(255,255,255,0.55);
          margin-top: 1.8rem;
          margin-bottom: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .article-content p { margin-bottom: 1.5rem; }
        .article-content a {
          color: #cfff6a;
          text-decoration: none;
          border-bottom: 1px solid rgba(207,255,106,0.22);
          transition: border-color 0.2s, color 0.2s;
        }
        .article-content a:hover { border-color: #cfff6a; color: #fff; }
        .article-content ul, .article-content ol {
          padding-left: 1.4rem;
          margin-bottom: 1.5rem;
          color: rgba(255,255,255,0.56);
        }
        .article-content li { margin-bottom: 0.5rem; line-height: 1.78; }
        .article-content ul li::marker { color: #cfff6a; }
        .article-content ol li::marker { color: rgba(255,255,255,0.25); font-weight: 700; }
        .article-content blockquote {
          border-left: 3px solid #cfff6a;
          margin: 2.5rem 0;
          padding: 1rem 1.5rem;
          background: rgba(207,255,106,0.03);
          border-radius: 0 14px 14px 0;
          color: rgba(255,255,255,0.48);
          font-style: italic;
          font-size: 1.05rem;
          line-height: 1.75;
        }
        .article-content strong, .article-content b { color: rgba(255,255,255,0.92); font-weight: 700; }
        .article-content em { color: rgba(255,255,255,0.52); }
        .article-content img {
          border-radius: 16px;
          margin: 2.5rem 0;
          width: 100%;
          height: auto;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .article-content hr { border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 3rem 0; }
        .article-content code {
          background: rgba(255,255,255,0.06);
          color: #cfff6a;
          padding: 0.15em 0.45em;
          border-radius: 6px;
          font-size: 0.875rem;
          border: 1px solid rgba(255,255,255,0.07);
        }
        .article-content pre {
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 1.5rem;
          overflow-x: auto;
          margin: 2rem 0;
        }
        .article-content pre code { background: none; border: none; padding: 0; color: rgba(255,255,255,0.7); }
        .article-content table { width: 100%; border-collapse: collapse; margin: 2rem 0; font-size: 0.9rem; }
        .article-content th {
          text-align: left;
          padding: 0.75rem 1rem;
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.35);
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .article-content td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.58);
        }
        .article-content tr:hover td { background: rgba(255,255,255,0.02); }

        /* Sidebar Scrollbar */
        .sidebar-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .sidebar-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.08);
          border-radius: 20px;
        }
        .sidebar-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${accent.color}44;
        }
      `}</style>
    </>
  );
}