'use client';

import { useBookmarks } from '@/hooks/use-bookmarks';
import PostCard from '@/components/PostCard';
import Link from 'next/link';
import { Heart, ArrowLeft, Trash2, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SavedPage() {
    const { bookmarks, remove, clear, mounted, count } = useBookmarks();

    if (!mounted) return null;

    return (
        <div className="min-h-screen" style={{ background: '#080808' }}>

            {/* Grain */}
            <div className="pointer-events-none fixed inset-0 opacity-[0.03] z-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '200px',
                }}
            />

            {/* Lime glow */}
            <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] z-0"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(207,255,106,0.05) 0%, transparent 70%)' }} />

            {/* ── Header ── */}
            <div className="relative border-b z-10"
                style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'linear-gradient(to bottom, #0d0d0d, #080808)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14">

                    <Link href="/"
                        className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] mb-10 group transition-colors"
                        style={{ color: 'rgba(255,255,255,0.18)' }}>
                        <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-0.5" />
                        <span className="group-hover:text-white/40 transition-colors">Back</span>
                    </Link>

                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-6 h-[2px] rounded-full bg-[#cfff6a]" />
                                <span className="text-[9px] font-black uppercase tracking-[0.45em]"
                                    style={{ color: 'rgba(255,255,255,0.2)' }}>
                                    Your Reading List
                                </span>
                            </div>

                            <h1 className="text-white leading-[1.06] mb-3"
                                style={{
                                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                                    fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                                    fontWeight: 900,
                                    letterSpacing: '-0.03em',
                                }}>
                                Saved{' '}
                                <span style={{ color: '#cfff6a' }}>Articles.</span>
                            </h1>

                            <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                                {count > 0
                                    ? `${count} ${count === 1 ? 'article' : 'articles'} saved to your reading list`
                                    : 'Your reading list is empty'}
                            </p>
                        </div>

                        {/* Count + clear */}
                        {count > 0 && (
                            <div className="flex items-center gap-3 shrink-0">
                                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl"
                                    style={{ background: 'rgba(207,255,106,0.06)', border: '1px solid rgba(207,255,106,0.14)' }}>
                                    <Heart className="w-4 h-4" style={{ color: '#cfff6a' }} fill="#cfff6a" />
                                    <span className="text-xl font-black" style={{ color: '#cfff6a' }}>{count}</span>
                                </div>
                                <button
                                    onClick={clear}
                                    className="flex items-center gap-2 px-4 py-3 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-200 hover:border-red-500/30 hover:text-red-400/60"
                                    style={{ border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.2)' }}
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    Clear all
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Content ── */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 pb-28">
                <AnimatePresence mode="wait">

                    {/* Has bookmarks */}
                    {count > 0 ? (
                        <motion.div
                            key="has-bookmarks"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <AnimatePresence>
                                    {[...bookmarks].reverse().map((article, i) => (
                                        <motion.div
                                            key={article.slug}
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                                            transition={{ duration: 0.3, delay: i * 0.04 }}
                                            className="relative group/saved h-full"
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
                                            {/* Remove button overlay */}
                                            <button
                                                onClick={() => remove(article.slug)}
                                                className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover/saved:opacity-100 transition-all duration-200 hover:scale-110"
                                                style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}
                                                aria-label="Remove bookmark"
                                            >
                                                <Trash2 className="w-3.5 h-3.5 text-red-400" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Auth upsell */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-16 p-6 rounded-2xl border text-center"
                                style={{ background: 'rgba(207,255,106,0.03)', borderColor: 'rgba(207,255,106,0.1)' }}
                            >
                                <p className="text-[12px] font-bold mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                                    Your list is saved locally on this device.
                                </p>
                                <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
                                    Account sync coming soon — sign in to access your list across all devices.
                                </p>
                            </motion.div>
                        </motion.div>

                    ) : (

                        /* Empty state */
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-center py-24"
                        >
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <Heart className="w-6 h-6" style={{ color: 'rgba(255,255,255,0.1)' }} />
                            </div>

                            <h3 className="text-[17px] font-bold text-white mb-2">
                                No saved articles yet
                            </h3>
                            <p className="text-[13px] leading-relaxed mb-8 max-w-xs mx-auto"
                                style={{ color: 'rgba(255,255,255,0.28)' }}>
                                Hit the heart icon on any article to save it here for later.
                            </p>

                            <Link href="/articles"
                                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5"
                                style={{ background: '#cfff6a', color: '#080808' }}>
                                <BookOpen className="w-3.5 h-3.5" />
                                Browse Articles
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
