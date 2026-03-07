'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
    Search as SearchIcon, X, ArrowRight, Zap, Dumbbell,
    Apple, BookOpen, Command, Clock, TrendingUp, Hash, ChevronRight, Loader2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllArticles } from '@/lib/api';
import { searchArticles } from '@/lib/search';
import NextImage from 'next/image';
import smallLogo from '../assets/Logo/Spoty.png';

const QUICK_NAV = [
    { name: 'Latest Articles', icon: Zap, href: '/articles', color: '#cfff6a', bg: 'rgba(207,255,106,0.08)' },
    { name: 'Workout Guides', icon: Dumbbell, href: '/category/workouts', color: '#60a5fa', bg: 'rgba(96,165,250,0.08)' },
    { name: 'Nutrition Plans', icon: Apple, href: '/category/nutrition', color: '#fb923c', bg: 'rgba(251,146,60,0.08)' },
    { name: 'All Categories', icon: BookOpen, href: '/', color: '#c084fc', bg: 'rgba(192,132,252,0.08)' },
];

const TRENDING = ['HIIT Workouts', 'Meal Prep', 'Protein Intake', 'Recovery Tips', 'Cardio Plans'];

export default function Search() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [focused, setFocused] = useState(false);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);
    const router = useRouter();
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => { setIsOpen(false); setQuery(''); setResults([]); }, []);

    // Load recent searches on mount
    useEffect(() => {
        const saved = localStorage.getItem('recentSearches');
        if (saved) {
            try {
                setRecentSearches(JSON.parse(saved));
            } catch (e) {
                setRecentSearches([]);
            }
        }
    }, []);

    const saveToHistory = (term) => {
        if (!term.trim()) return;
        const cleanTerm = term.trim();
        const updated = [cleanTerm, ...recentSearches.filter(t => t !== cleanTerm)].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
    };

    const handleSearch = (e) => {
        e?.preventDefault();
        if (query.trim()) {
            saveToHistory(query);
            close();
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    const handleQuickNav = (href) => { close(); router.push(href); };
    const handleTrending = (term) => { setQuery(term); inputRef.current?.focus(); };

    const [articles, setArticles] = useState([]);

    // Load articles on mount
    useEffect(() => {
        getAllArticles().then(data => setArticles(data || []));
    }, []);

    // Live search — client-side
    useEffect(() => {
        const q = query.trim();
        if (!q || q.length < 1 || articles.length === 0) {
            setResults([]);
            return;
        }

        const timer = setTimeout(() => {
            setIsLoading(true);
            try {
                const searchResults = searchArticles(articles, q, 8);
                setResults(Array.isArray(searchResults) ? searchResults : []);
            } catch (e) {
                console.error('❌ Search error:', e.message);
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        }, 150);  // Faster debounce for client-side search

        return () => clearTimeout(timer);
    }, [query, articles]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); open(); }
            if (e.key === 'Escape') close();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, close]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }, [isOpen]);

    const showSuggestions = query.length === 0;
    const showResults = query.length > 0;

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={open}
                className="group relative flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-300 hover:bg-white/5"
                aria-label="Open Search"
            >
                <SearchIcon className="w-[18px] h-[18px] text-white/50 group-hover:text-[#cfff6a] transition-colors duration-300" />
                <span className="hidden lg:flex items-center gap-2">
                    <span className="text-[10px] font-black tracking-[0.25em] text-white/25 group-hover:text-white/40 uppercase transition-colors">Search</span>
                    <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md border border-white/[0.08] bg-white/[0.03]">
                        <Command className="w-2.5 h-2.5 text-white/20" />
                        <span className="text-[9px] font-black text-white/20">K</span>
                    </span>
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[1000] flex items-start justify-center px-4"
                        style={{ paddingTop: 'clamp(48px, 10vh, 120px)' }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 cursor-pointer"
                            style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(16px)' }}
                            onClick={close}
                        />

                        {/* Panel */}
                        <motion.div
                            ref={containerRef}
                            initial={{ y: -16, opacity: 0, scale: 0.98 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: -8, opacity: 0, scale: 0.99 }}
                            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
                            className="relative w-full max-w-[640px] flex flex-col overflow-hidden"
                            style={{
                                borderRadius: 24,
                                background: 'linear-gradient(160deg, #141414 0%, #0e0e0e 100%)',
                                border: '1px solid rgba(255,255,255,0.07)',
                                boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(207,255,106,0.04), inset 0 1px 0 rgba(255,255,255,0.04)',
                            }}
                        >
                            {/* Top accent line */}
                            <div
                                className="absolute top-0 left-0 right-0 h-px"
                                style={{ background: 'linear-gradient(90deg, transparent 0%, #cfff6a 40%, #cfff6a 60%, transparent 100%)', opacity: 0.5 }}
                            />

                            {/* Input row */}
                            <form onSubmit={handleSearch} className="relative flex items-center gap-3 px-6 py-5">
                                <motion.div animate={{ color: focused || query ? '#cfff6a' : 'rgba(255,255,255,0.25)' }} transition={{ duration: 0.2 }}>
                                    {isLoading ? <Loader2 className="w-5 h-5 shrink-0 animate-spin" /> : <SearchIcon className="w-5 h-5 shrink-0" />}
                                </motion.div>

                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onFocus={() => setFocused(true)}
                                    onBlur={() => setFocused(false)}
                                    placeholder="Search articles, workouts, nutrition..."
                                    autoFocus
                                    className="flex-1 bg-transparent text-[17px] text-white placeholder:text-white/[0.18] focus:outline-none leading-none"
                                    style={{ fontWeight: 500, letterSpacing: '-0.01em' }}
                                />

                                <AnimatePresence>
                                    {query && (
                                        <motion.button
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            type="button"
                                            onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                                            className="p-1.5 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/5 transition-all"
                                        >
                                            <X className="w-4 h-4" />
                                        </motion.button>
                                    )}
                                </AnimatePresence>

                                <AnimatePresence>
                                    {query && (
                                        <motion.button
                                            initial={{ opacity: 0, x: 8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 8 }}
                                            type="submit"
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black tracking-wider uppercase transition-all"
                                            style={{ background: '#cfff6a', color: '#0a0a0a' }}
                                        >
                                            Go <ArrowRight className="w-3 h-3" />
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </form>

                            {/* Divider */}
                            <div className="mx-6 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />

                            {/* Body */}
                            <div className="overflow-y-auto custom-scrollbar" style={{ maxHeight: '55vh' }}>
                                <AnimatePresence mode="wait">

                                    {/* Default state — suggestions */}
                                    {showSuggestions && (
                                        <motion.div
                                            key="suggestions"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="p-6 space-y-7"
                                        >
                                            {/* Trending */}
                                            <div>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <TrendingUp className="w-3.5 h-3.5" style={{ color: '#cfff6a' }} />
                                                    <span className="text-[9px] font-black tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
                                                        Trending Now
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {TRENDING.map((term, i) => (
                                                        <motion.button
                                                            key={term}
                                                            initial={{ opacity: 0, y: 6 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: i * 0.04 }}
                                                            onClick={() => handleTrending(term)}
                                                            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200"
                                                            style={{
                                                                background: 'rgba(255,255,255,0.04)',
                                                                border: '1px solid rgba(255,255,255,0.07)',
                                                                fontSize: 12,
                                                                fontWeight: 600,
                                                                color: 'rgba(255,255,255,0.55)',
                                                            }}
                                                            onMouseEnter={e => {
                                                                e.currentTarget.style.background = 'rgba(207,255,106,0.08)';
                                                                e.currentTarget.style.borderColor = 'rgba(207,255,106,0.2)';
                                                                e.currentTarget.style.color = '#cfff6a';
                                                            }}
                                                            onMouseLeave={e => {
                                                                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                                                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                                                                e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
                                                            }}
                                                        >
                                                            <Hash className="w-3 h-3 opacity-50" />
                                                            {term}
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Recent */}
                                            {recentSearches.length > 0 && (
                                                <div>
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <Clock className="w-3.5 h-3.5 text-white/25" />
                                                        <span className="text-[9px] font-black tracking-[0.3em] uppercase text-white/20">Recent Searches</span>
                                                    </div>
                                                    <div className="space-y-1">
                                                        {recentSearches.map((term, i) => (
                                                            <motion.button
                                                                key={term}
                                                                initial={{ opacity: 0, x: -8 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: i * 0.05 }}
                                                                onClick={() => handleTrending(term)}
                                                                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl group transition-all duration-200 hover:bg-white/[0.04] text-left"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <Clock className="w-3.5 h-3.5 text-white/20 group-hover:text-white/40 transition-colors" />
                                                                    <span className="text-sm font-medium text-white/40 group-hover:text-white/70 transition-colors">{term}</span>
                                                                </div>
                                                                <ChevronRight className="w-3.5 h-3.5 text-white/0 group-hover:text-white/20 transition-all -translate-x-1 group-hover:translate-x-0" />
                                                            </motion.button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Quick Nav */}
                                            <div>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="text-[9px] font-black tracking-[0.3em] uppercase text-white/20">Quick Navigation</span>
                                                    <div className="flex-1 h-px bg-white/[0.05]" />
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {QUICK_NAV.map((nav, i) => (
                                                        <motion.button
                                                            key={nav.name}
                                                            initial={{ opacity: 0, y: 8 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.1 + i * 0.05 }}
                                                            onClick={() => handleQuickNav(nav.href)}
                                                            className="group flex items-center gap-3 p-3.5 rounded-2xl transition-all duration-200 text-left"
                                                            style={{
                                                                background: 'rgba(255,255,255,0.025)',
                                                                border: '1px solid rgba(255,255,255,0.05)',
                                                            }}
                                                            onMouseEnter={e => {
                                                                e.currentTarget.style.background = nav.bg;
                                                                e.currentTarget.style.borderColor = nav.color + '30';
                                                            }}
                                                            onMouseLeave={e => {
                                                                e.currentTarget.style.background = 'rgba(255,255,255,0.025)';
                                                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                                                            }}
                                                        >
                                                            <div className="p-2 rounded-xl shrink-0 transition-colors" style={{ background: 'rgba(0,0,0,0.4)' }}>
                                                                <nav.icon className="w-4 h-4 transition-colors" style={{ color: nav.color }} />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="text-[12px] font-bold text-white/60 group-hover:text-white/90 transition-colors truncate">{nav.name}</div>
                                                            </div>
                                                            <ArrowRight className="w-3.5 h-3.5 text-white/0 group-hover:text-white/30 transition-all shrink-0 -translate-x-1 group-hover:translate-x-0" />
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Live query state */}
                                    {showResults && (
                                        <motion.div
                                            key="results"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="p-6 space-y-7"
                                        >
                                            {/* Primary Action */}
                                            <div>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="text-[9px] font-black tracking-[0.3em] uppercase text-white/20">Searching for</span>
                                                    <div className="flex-1 h-px bg-white/[0.05]" />
                                                </div>
                                                <button
                                                    onClick={handleSearch}
                                                    className="w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 group text-left"
                                                    style={{ background: 'rgba(207,255,106,0.06)', border: '1px solid rgba(207,255,106,0.12)' }}
                                                >
                                                    <div className="p-2.5 rounded-xl transition-all group-hover:scale-110" style={{ background: 'rgba(207,255,106,0.1)' }}>
                                                        <SearchIcon className="w-4 h-4" style={{ color: '#cfff6a' }} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-[14px] font-bold text-white/80 group-hover:text-white truncate">
                                                            Search for <span style={{ color: '#cfff6a' }}>"{query}"</span>
                                                        </div>
                                                        <div className="text-[10px] font-black tracking-widest uppercase text-white/25 mt-0.5 group-hover:text-white/40 transition-colors">Press Enter to view all results</div>
                                                    </div>
                                                    <ArrowRight className="w-4 h-4 text-white/10 group-hover:text-[#cfff6a] transition-all -translate-x-2 group-hover:translate-x-0" />
                                                </button>
                                            </div>

                                            {/* Live Article Matches */}
                                            {results.length > 0 && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                >
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <span className="text-[9px] font-black tracking-[0.3em] uppercase text-[#cfff6a]/40">Top Article Matches</span>
                                                        <div className="flex-1 h-px bg-[#cfff6a]/[0.1]" />
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-2">
                                                        {results.map((article, i) => (
                                                            <motion.button
                                                                key={article.id}
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: i * 0.05 }}
                                                                onClick={() => handleQuickNav(`/article/${article.slug}`)}
                                                                className="w-full flex items-center gap-4 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] hover:border-[#cfff6a]/20 transition-all group text-left"
                                                            >
                                                                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white/5 shrink-0">
                                                                    {article.image ? (
                                                                        <NextImage src={article.image} alt="" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                                                    ) : (
                                                                        <div className="relative w-full h-full flex items-center justify-center bg-white/5 p-2">
                                                                            <NextImage src={smallLogo} alt="SpotyFlex" className="opacity-20 grayscale brightness-200" />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="text-[13px] font-bold text-white/80 group-hover:text-white transition-colors truncate">{article.title}</div>
                                                                    <div className="flex items-center gap-2 mt-0.5">
                                                                        <span className="text-[9px] font-black uppercase tracking-wider text-[#cfff6a] opacity-50 group-hover:opacity-100 transition-opacity">{article.category}</span>
                                                                        <span className="text-[9px] text-white/10">•</span>
                                                                        <span className="text-[9px] text-white/30 font-bold uppercase tracking-tighter">{article.readTime}m read</span>
                                                                    </div>
                                                                </div>
                                                                <ArrowRight className="w-3.5 h-3.5 text-white/10 group-hover:text-[#cfff6a] transition-all -translate-x-1 group-hover:translate-x-0" />
                                                            </motion.button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* Topic Suggestions (filtered trending) */}
                                            {TRENDING.filter(t => t.toLowerCase().includes(query.toLowerCase())).length > 0 && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                >
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <span className="text-[9px] font-black tracking-[0.3em] uppercase text-white/15">Topic Suggestions</span>
                                                        <div className="flex-1 h-px bg-white/[0.03]" />
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {TRENDING.filter(t => t.toLowerCase().includes(query.toLowerCase())).map((term, i) => (
                                                            <button
                                                                key={term}
                                                                onClick={() => handleTrending(term)}
                                                                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] hover:bg-[#cfff6a]/10 hover:border-[#cfff6a]/20 transition-all text-[11px] font-semibold text-white/40 hover:text-[#cfff6a]"
                                                            >
                                                                <Hash className="w-3 h-3 opacity-50" />
                                                                {term}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* No Results Fallback */}
                                            {results.length === 0 && !isLoading && TRENDING.filter(t => t.toLowerCase().includes(query.toLowerCase())).length === 0 && (
                                                <div className="py-8 text-center bg-white/[0.02] border border-white/[0.05] rounded-3xl border-dashed">
                                                    <div className="inline-flex p-3 rounded-2xl bg-white/[0.05] mb-3 text-white/20">
                                                        <SearchIcon className="w-6 h-6" />
                                                    </div>
                                                    <p className="text-sm font-bold text-white/30 tracking-tight">No instant matches found</p>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/10 mt-1">Press enter to try a deep search</p>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}

                                </AnimatePresence>
                            </div>

                            {/* Footer */}
                            <div
                                className="px-6 py-3.5 flex items-center justify-between shrink-0"
                                style={{ borderTop: '1px solid rgba(255,255,255,0.04)', background: 'rgba(0,0,0,0.3)' }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="hidden sm:flex items-center gap-1.5">
                                        <kbd className="px-1.5 py-0.5 rounded-md text-[9px] font-black text-white/20" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
                                            ↵ Enter
                                        </kbd>
                                        <span className="text-[9px] font-bold text-white/15 tracking-wider uppercase">to search</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <kbd className="px-1.5 py-0.5 rounded-md text-[9px] font-black text-white/20" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
                                            Esc
                                        </kbd>
                                        <span className="text-[9px] font-bold text-white/15 tracking-wider uppercase">to close</span>
                                    </div>
                                </div>
                                <span
                                    className="text-[9px] font-black tracking-[0.25em] uppercase"
                                    style={{ color: 'rgba(207,255,106,0.3)' }}
                                >
                                    SpotyFlex
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
