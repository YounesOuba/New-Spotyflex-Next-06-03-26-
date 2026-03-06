'use client';

import { Clock, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';
import Image from 'next/image';
import { generateAltText } from '@/lib/imageOptimization';
import smallLogo from '../assets/Logo/Spoty.png';
import SaveButton from '@/components/SaveButton';

const CATEGORY_ACCENT = {
  workouts: { color: '#60a5fa', glow: 'rgba(96,165,250,0.15)', border: 'rgba(96,165,250,0.2)', shadow: 'rgba(96,165,250,0.08)' },
  nutrition: { color: '#fb923c', glow: 'rgba(251,146,60,0.15)', border: 'rgba(251,146,60,0.2)', shadow: 'rgba(251,146,60,0.08)' },
  guides: { color: '#c084fc', glow: 'rgba(192,132,252,0.15)', border: 'rgba(192,132,252,0.2)', shadow: 'rgba(192,132,252,0.08)' },
};
const DEFAULT_ACCENT = { color: '#cfff6a', glow: 'rgba(207,255,106,0.15)', border: 'rgba(207,255,106,0.2)', shadow: 'rgba(207,255,106,0.06)' };

/* ────────────────────────────────────────
   WIDE CARD — first/featured position
──────────────────────────────────────── */
export const PostCardWide = memo(({ title, introtext, note, publishedAt, image, tags, href, category }) => {
  const accent = CATEGORY_ACCENT[category] || DEFAULT_ACCENT;
  const articleData = { slug: href, title, excerpt: introtext, image, category, readTime: note ? note.replace(' min read', '') : '', publishedDate: publishedAt, tags };

  return (
    <div className="relative block group">
      <Link href={`/article/${href}`} className="absolute inset-0 z-10" aria-label={`Read ${title}`} />
      <article
        className="relative overflow-hidden rounded-3xl border transition-all duration-700"
        style={{ background: 'linear-gradient(135deg,#141414 0%,#0f0f0f 100%)', borderColor: 'rgba(255,255,255,0.06)' }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 48px 96px -24px rgba(0,0,0,0.7), 0 0 0 1px ${accent.border}`; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr]">

          {/* ── Image ── */}
          <div className="relative overflow-hidden aspect-[16/10] md:aspect-auto md:min-h-[400px]">
            {image ? (
              <Image
                src={image} alt={generateAltText(title, 'featured image')} fill priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05] "
                style={{ filter: 'brightness(0.72) saturate(0.85)' }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a]">
                <Image src={smallLogo} alt="SpotyFlex" className="opacity-10 bg-[#212121]" />
              </div>
            )}

            {/* Right fade to content */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#141414] hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/30 to-transparent md:hidden" />

            {/* Hover color sweep */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 20% 60%, ${accent.glow} 0%, transparent 55%)` }}
            />

            {/* Category badge */}
            <div className="absolute top-6 left-6 z-20 pointer-events-none">
              <span
                className="text-[8px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-full"
                style={{ color: accent.color, background: 'rgba(0,0,0,0.75)', border: `1px solid ${accent.border}`, backdropFilter: 'blur(10px)' }}
              >
                {category}
              </span>
            </div>

            {/* Save Button */}
            <div className="absolute top-6 right-6 z-20 pointer-events-auto">
              <SaveButton article={articleData} variant="card" />
            </div>
          </div>

          {/* ── Content ── */}
          <div className="relative flex flex-col justify-between p-8 lg:p-10 xl:p-12 overflow-hidden">
            {/* Corner glow */}
            <div
              className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{ background: `radial-gradient(circle, ${accent.glow} 0%, transparent 70%)` }}
            />

            <div className="relative z-10">
              {/* Tags */}
              {tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[7px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
                      style={{ color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h3 className="text-white leading-[1.08] mb-5 transition-colors duration-500 group-hover:text-[#cfff6a]"
                style={{ fontSize: 'clamp(1.4rem,2.4vw,2rem)', fontFamily: '"Playfair Display",Georgia,serif', fontWeight: 900, letterSpacing: '-0.025em' }}>
                {title}
              </h3>

              {/* Animated accent bar */}
              <div className="flex items-center gap-1.5 mb-5">
                <div className="h-[2px] rounded-full transition-all duration-500 group-hover:w-14"
                  style={{ width: 20, background: accent.color }} />
                <div className="h-[2px] rounded-full opacity-25 transition-all duration-700 group-hover:w-4"
                  style={{ width: 6, background: accent.color }} />
              </div>

              {introtext && (
                <p className="text-[13px] leading-relaxed line-clamp-3" style={{ color: 'rgba(255,255,255,0.38)' }}>
                  {introtext}
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="relative z-10 flex items-center justify-between mt-8 pt-6 border-t"
              style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center overflow-hidden shrink-0"
                  style={{ background: accent.glow, border: `1px solid ${accent.border}` }}>
                  <Image src={smallLogo} alt="SF" className="w-full h-full object-cover opacity-80" />
                </div>
                <div>
                  <div className="text-[10px] font-bold" style={{ color: 'rgba(255,255,255,0.5)' }}>SpotyFlex Team</div>
                  <div className="text-[9px] uppercase tracking-wider font-bold" style={{ color: 'rgba(255,255,255,0.2)' }}>
                    {publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}{note ? ` · ${note}` : ''}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 group-hover:gap-3"
                style={{ background: accent.glow, border: `1px solid ${accent.border}`, color: accent.color }}>
                Read
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
});
PostCardWide.displayName = 'PostCardWide';

/* ────────────────────────────────────────
   STANDARD CARD
──────────────────────────────────────── */
const PostCard = memo(({ title, introtext, note, publishedAt, image, tags, href, category }) => {
  const accent = CATEGORY_ACCENT[category] || DEFAULT_ACCENT;
  const articleData = { slug: href, title, excerpt: introtext, image, category, readTime: note ? note.replace(' min read', '') : '', publishedDate: publishedAt, tags };

  return (
    <div className="relative block group h-full">
      <Link href={`/article/${href}`} className="absolute inset-0 z-10" aria-label={`Read ${title}`} />
      <article
        className="relative h-full flex flex-col overflow-hidden rounded-2xl transition-all duration-500 group-hover:-translate-y-2"
        style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.05)' }}
        onMouseEnter={e => {
          e.currentTarget.style.border = `1px solid ${accent.border}`;
          e.currentTarget.style.boxShadow = `0 32px 64px -16px rgba(0,0,0,0.7), 0 0 40px -20px ${accent.shadow}`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.border = '1px solid rgba(255,255,255,0.05)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* ── Image ── */}
        <div className="relative overflow-hidden shrink-0" style={{ aspectRatio: '16/10' }}>
          {image ? (
            <Image
              src={image} alt={generateAltText(title, 'featured image')} fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-all duration-[1.2s] ease-out group-hover:scale-[1.07]"
              style={{ filter: 'brightness(0.78) saturate(0.85)' }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[#181818]">
              <Image src={smallLogo} alt="SpotyFlex" className="opacity-8 bg-[#212121]" />
            </div>
          )}

          {/* Gradient floor */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, #0f0f0f 0%, rgba(15,15,15,0.5) 35%, transparent 100%)' }} />

          {/* Hover tinted wash */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: `linear-gradient(145deg, ${accent.glow} 0%, transparent 55%)` }}
          />

          {/* Top badges */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-start justify-between z-20">
            <div className="flex items-center gap-2 pointer-events-none">
              <span
                className="text-[7.5px] font-black uppercase tracking-[0.25em] px-2.5 py-1 rounded-full"
                style={{ color: accent.color, background: 'rgba(0,0,0,0.72)', border: `1px solid ${accent.border}`, backdropFilter: 'blur(8px)' }}
              >
                {category}
              </span>
              <span
                className="flex items-center gap-1.5 text-[7.5px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full"
                style={{ color: 'rgba(255,255,255,0.35)', background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)' }}
              >
                <Clock className="w-2.5 h-2.5" />
                {note}
              </span>
            </div>

            <div className="pointer-events-auto">
              <SaveButton article={articleData} variant="card" />
            </div>
          </div>

          {/* Hover arrow hint */}
          <div
            className="absolute bottom-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400"
            style={{ background: accent.glow, border: `1px solid ${accent.border}` }}
          >
            <ArrowUpRight className="w-3.5 h-3.5" style={{ color: accent.color }} />
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-col flex-1 px-5 pt-4 pb-5">

          {/* Tags */}
          {tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {tags.slice(0, 2).map((tag, i) => (
                <span key={i}
                  className="text-[7px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-full"
                  style={{ color: 'rgba(255,255,255,0.22)', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3
            className="leading-[1.25] mb-3 transition-colors duration-400 group-hover:text-[#cfff6a] line-clamp-2 flex-1"
            style={{ fontSize: '0.965rem', fontWeight: 700, color: 'rgba(255,255,255,0.85)', letterSpacing: '-0.018em' }}
          >
            {title}
          </h3>

          {/* Excerpt */}
          {introtext && (
            <p className="text-[11.5px] leading-relaxed line-clamp-2 mb-4"
              style={{ color: 'rgba(255,255,255,0.25)' }}>
              {introtext}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3.5 mt-auto border-t"
            style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
            <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.18)' }}>
              {publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
            </span>
            <span
              className="text-[9px] font-black uppercase tracking-wider flex items-center gap-1 opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-350"
              style={{ color: accent.color }}
            >
              Read more <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Bottom glow line */}
        <div
          className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-600 rounded-b-2xl"
          style={{ background: `linear-gradient(90deg, ${accent.color} 0%, transparent 100%)` }}
        />
      </article>
    </div>
  );
});

PostCard.displayName = 'PostCard';
export default PostCard;