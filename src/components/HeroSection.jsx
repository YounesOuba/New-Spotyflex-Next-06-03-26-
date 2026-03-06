'use client';

import { ArrowRight, Clock, Calendar } from 'lucide-react';
import Link from 'next/link';
import smallLogo from '../assets/Logo/Spoty.png';
import { memo, useRef } from "react";
import NextImage from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useIsMobile } from '@/hooks/use-mobile';
import SaveButton from '@/components/SaveButton';
import MiniNewsletter from '@/components/MiniNewsletter';

/* ─── Noise grain ─── */
const Noise = () => (
  <div
    className="pointer-events-none absolute inset-0 z-[1] opacity-[0.038]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize: '256px',
    }}
  />
);

/* ─── Ticker tape ─── */
const TICKER_ITEMS = [
  "Strength Training", "Nutrition Tips", "Recovery & Sleep",
  "Mindset & Focus", "HIIT Workouts", "Mobility Work", "Performance", "Wellness Guide",
];

const Ticker = () => {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="relative z-30 h-[38px] bg-[#cfff6a] overflow-hidden flex items-center border-b border-black/10">
      <div className="absolute left-0 z-10 h-full flex items-center px-5 bg-[#0a0a0a] border-r-2 border-[#cfff6a]">
        <span className="text-[#cfff6a] text-[9px] font-black tracking-[0.25em] uppercase whitespace-nowrap">SpotyFlex</span>
      </div>
      <div
        className="flex items-center pl-[130px]"
        style={{ animation: 'spotyflex-ticker 24s linear infinite' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-5 text-[#0a0a0a] text-[9.5px] font-black tracking-[0.22em] uppercase whitespace-nowrap">
            {item}
            <span className="w-[5px] h-[5px] rounded-full bg-black/20 inline-block" />
          </span>
        ))}
      </div>
      <style>{`
        @keyframes spotyflex-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

/* ─── Sidebar stat row ─── */
const StatRow = ({ label, value, accent }) => (
  <div className="flex items-center justify-between px-5 py-[17px] border-b border-white/[0.07] last:border-0 transition-colors hover:bg-white/[0.025]">
    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30">{label}</span>
    <span className={`text-[13px] font-extrabold ${accent ? 'text-[#cfff6a]' : 'text-white'}`}>{value}</span>
  </div>
);

/* ─── Recent article row ─── */
const ArticleRow = ({ num, category, title, readTime, date, slug }) => (
  <Link
    href={`/article/${slug}`}
    className="group flex items-start gap-4 py-4 border-b border-white/[0.07] last:border-0"
  >
    <span className="text-[10px] font-black text-white/[0.18] min-w-[18px] mt-0.5 tabular-nums group-hover:text-[#cfff6a] transition-colors">
      {String(num).padStart(2, '0')}
    </span>
    <div>
      <p className="flex items-center gap-1.5 text-[8.5px] font-black uppercase tracking-[0.22em] text-[#cfff6a]/80 mb-1">
        <span className="w-3 h-px bg-[#cfff6a]/40 inline-block" />
        {category}
      </p>
      <h4 className="text-[13.5px] font-semibold text-white/90 leading-[1.35] group-hover:text-white transition-colors line-clamp-2">
        {title}
      </h4>
      {(readTime || date) && (
        <p className="text-[10px] text-white/20 mt-1">{readTime} min read · {date}</p>
      )}
    </div>
  </Link>
);

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
const HeroSection = memo(({ latestArticle, recentArticles = [], blogStats = {} }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "25%"]);
  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.12]);
  const ctY_raw = useTransform(smoothProgress, [0, 1], ["0%", "12%"]);
  const isMobile = useIsMobile();
  const ctY = isMobile ? 0 : ctY_raw;

  if (!latestArticle) return null;

  const stats = {
    articles: blogStats.totalArticles ?? 0,
    avgRead: blogStats.avgReadTime ?? "0 min",
    topCat: blogStats.topCategory ?? "N/A",
    weeklyNew: blogStats.weeklyNew ?? 0,
  };

  return (
    <>
      <Ticker />

      <section
        ref={containerRef}
        className="relative bg-[#0a0a00] overflow-hidden"
        style={{ minHeight: isMobile ? '100svh' : 'calc(100svh - 38px)' }}
      >
        <Noise />

        {/* Parallax background */}
        <motion.div
          style={{ y: isMobile ? 0 : bgY, scale: isMobile ? 1 : bgScale }}
          className="absolute inset-0 z-0 will-change-transform"
        >
          {latestArticle.image ? (
            <>
              <NextImage
                src={latestArticle.image}
                alt={latestArticle.title}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, 70vw"
                className="object-cover"
                style={{
                  filter: isMobile
                    ? 'brightness(0.45) saturate(0.8)'
                    : 'brightness(0.6) saturate(0.85)',
                }}
              />
              {/* Mobile: stronger bottom gradient so text is readable */}
              <div className="absolute inset-0"
                style={{
                  background: isMobile
                    ? 'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.5) 40%, rgba(10,10,10,0.95) 75%, #0a0a0a 100%)'
                    : 'linear-gradient(to bottom, transparent 0%, rgba(10,10,10,0.4) 50%, #0a0a0a 100%)',
                }}
              />
              {/* Desktop: left fade for sidebar contrast */}
              <div className="absolute inset-0 hidden lg:block"
                style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.75) 0%, transparent 50%, rgba(10,10,10,0.4) 100%)' }}
              />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1c2a06] via-[#0e0e0e] to-[#0a0a0a]">
              {[900, 650, 400].map((s, i) => (
                <div
                  key={s}
                  className="absolute rounded-full border border-[#cfff6a]/[0.045]"
                  style={{
                    width: s, height: s,
                    top: '50%', left: '60%',
                    transform: 'translate(-50%, -50%)',
                    borderStyle: i === 2 ? 'dashed' : 'solid',
                  }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <NextImage src={smallLogo} alt="SpotyFlex Logo" className="opacity-20 bg-[#212121] scale-125" />
              </div>
            </div>
          )}
        </motion.div>

        {/* Vertical watermark — desktop only */}
        <div
          className="absolute left-5 top-1/2 z-10 hidden lg:block pointer-events-none select-none"
          style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}
        >
          <span className="text-white/[0.07] text-[8px] font-black tracking-[0.5em] uppercase whitespace-nowrap">
            Fitness · Nutrition · Performance · Wellness
          </span>
        </div>

        {/* Main content grid */}
        <motion.div
          style={{ y: ctY }}
          className={`relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] ${!isMobile ? 'min-h-[calc(100svh-38px)]' : ''}`}
        >

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col justify-end lg:justify-center px-5 sm:px-8 py-10 lg:px-16 lg:py-16 xl:pl-20"
            style={{ minHeight: isMobile ? '100svh' : undefined }}>

            {/* Breadcrumb */}
            <motion.div
              className="flex items-center gap-2.5 mb-6 text-white/30 text-[10px] font-bold tracking-[0.2em] uppercase"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span>Blog</span>
              <span className="text-white/15">›</span>
              <span className="text-[#cfff6a] bg-[#cfff6a]/10 border border-[#cfff6a]/20 px-3 py-1 rounded-full text-[9px]">
                {latestArticle.category || 'Featured'}
              </span>
              <span className="hidden sm:inline text-white/15">›</span>
              <span className="hidden sm:inline">Featured Article</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="mb-6 text-white leading-[1.0] tracking-tight"
              style={{
                fontSize: 'clamp(2rem, 5vw, 5rem)',
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 900,
                letterSpacing: '-0.02em',
              }}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {latestArticle.title}
            </motion.h1>

            {/* Accent bar */}
            <motion.div
              className="flex items-center gap-2.5 mb-5"
              initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ transformOrigin: 'left' }}
            >
              <div className="w-10 h-[2px] bg-[#cfff6a] rounded-full" />
              <div className="w-3 h-[2px] bg-[#cfff6a]/35 rounded-full" />
            </motion.div>

            {/* Excerpt — hide on very small screens */}
            <motion.p
              className="hidden sm:block text-white/55 text-[1rem] leading-relaxed max-w-[560px] mb-7"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              {latestArticle.excerpt}
            </motion.p>

            {/* Author */}
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#cfff6a] to-[#8fba2a] flex items-center justify-center text-[#0a0a0a] text-[12px] font-black flex-shrink-0 ring-2 ring-[#cfff6a]/20 overflow-hidden relative">
                <NextImage src={smallLogo} alt="SpotyFlex" fill className="object-cover bg-[#212121] scale-125" />
              </div>
              <div>
                <p className="text-white text-[13px] font-bold leading-none mb-1">
                  {latestArticle.author || 'SpotyFlex Team'}
                </p>
                <p className="text-white/35 text-[11px] flex items-center gap-2 flex-wrap">
                  <Clock size={10} className="text-[#cfff6a]/60" />
                  {latestArticle.readTime} min read
                  <span className="w-1 h-1 rounded-full bg-white/20 inline-block" />
                  <Calendar size={10} className="text-[#cfff6a]/60" />
                  {latestArticle.publishedDate}
                </p>
              </div>
            </motion.div>

            {/* CTA row */}
            <motion.div
              className="flex items-center gap-5"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <Link
                href={`/article/${latestArticle.slug}`}
                className="group inline-flex items-center gap-3 bg-[#cfff6a] text-[#0a0a0a] px-6 py-[13px] rounded-full text-[12px] font-black tracking-wide uppercase transition-all hover:-translate-y-[2px] hover:shadow-[0_16px_40px_rgba(207,255,106,0.3)] whitespace-nowrap"
              >
                Read Article
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <SaveButton
                article={latestArticle}
                variant="hero"
              />
            </motion.div>
          </div>

          {/* ── RIGHT SIDEBAR — desktop only ── */}
          <motion.aside
            className="hidden lg:flex flex-col border-l border-white/[0.07] bg-[#0a0a0a]/75 backdrop-blur-[40px] px-8 py-12 xl:px-10 gap-8 pb-12"
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Weekly stats */}
            <div>
              <p className="text-[9px] font-black tracking-[0.4em] uppercase text-white/20 mb-4 flex items-center gap-3 after:flex-1 after:h-px after:bg-white/[0.07] after:content-['']">
                This week
              </p>
              <div className="border border-white/[0.07] rounded-[18px] overflow-hidden">
                <StatRow label="Articles Published" value={stats.weeklyNew} accent />
                <StatRow label="Avg. Read Time" value={stats.avgRead} />
                <StatRow label="Top Category" value={stats.topCat} />
              </div>
            </div>

            {/* Latest articles list */}
            <div className="flex-1">
              <p className="text-[9px] font-black tracking-[0.4em] uppercase text-white/20 mb-2 flex items-center gap-3 after:flex-1 after:h-px after:bg-white/[0.07] after:content-['']">
                Latest articles
              </p>
              <div>
                {recentArticles.map((a, i) => (
                  <ArticleRow
                    key={a.id}
                    num={i + 1}
                    category={a.category}
                    title={a.title}
                    readTime={a.readTime}
                    date={a.publishedDate}
                    slug={a.slug}
                  />
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <MiniNewsletter />
          </motion.aside>
        </motion.div>

        {/* Bottom stats bar */}
        <div className="relative z-20 border-t border-white/[0.07] bg-[#0a0a0a]/90 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4 px-5 sm:px-8 lg:px-16 xl:px-20 py-3 sm:py-4">
          {[
            { label: "Articles Published", value: stats.articles },
            { label: "Top Category", value: stats.topCat },
            { label: "Avg. Read Time", value: stats.avgRead },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2 text-white/25 text-[10px] font-bold tracking-[0.2em] uppercase">
              <span className="text-[#cfff6a] text-[15px] font-black tracking-normal">{s.value}</span>
              {s.label}
            </div>
          ))}
          <div className="hidden lg:flex items-center gap-3 text-white/20 text-[10px] font-bold tracking-[0.2em] uppercase">
            <span>Weekly Growth</span>
            <div className="w-[100px] h-[2px] bg-white/[0.09] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#cfff6a] rounded-full transition-all duration-1000"
                style={{ width: `${Math.min((stats.weeklyNew / 5) * 100, 100)}%` }}
              />
            </div>
            <span>{stats.weeklyNew} / 5</span>
          </div>
          <div className="text-white/20 text-[10px] font-bold tracking-[0.2em] uppercase">
            Est. <span className="text-white/40">2025</span>
          </div>
        </div>
      </section>
    </>
  );
});

HeroSection.displayName = 'HeroSection';
export default HeroSection;