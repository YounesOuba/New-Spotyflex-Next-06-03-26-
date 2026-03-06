'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'spotyflex_bookmarks';

function getBookmarks() {
    if (typeof window === 'undefined') return [];
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
        return [];
    }
}

function setBookmarks(bookmarks) {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch { }
}

export function useBookmarks() {
    const [bookmarks, setBookmarksState] = useState([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setBookmarksState(getBookmarks());
        setMounted(true);

        // Sync across tabs
        function onStorage(e) {
            if (e.key === STORAGE_KEY) {
                setBookmarksState(getBookmarks());
            }
        }
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    const isBookmarked = useCallback((slug) => {
        return bookmarks.some(b => b.slug === slug);
    }, [bookmarks]);

    const toggle = useCallback((article) => {
        const current = getBookmarks();
        const exists = current.some(b => b.slug === article.slug);
        const updated = exists
            ? current.filter(b => b.slug !== article.slug)
            : [...current, {
                slug: article.slug,
                title: article.title,
                excerpt: article.excerpt,
                image: article.image,
                category: article.category,
                readTime: article.readTime,
                publishedDate: article.publishedDate,
                savedAt: new Date().toISOString(),
            }];
        setBookmarks(updated);
        setBookmarksState(updated);
        return !exists; // returns true if newly saved
    }, []);

    const remove = useCallback((slug) => {
        const updated = getBookmarks().filter(b => b.slug !== slug);
        setBookmarks(updated);
        setBookmarksState(updated);
    }, []);

    const clear = useCallback(() => {
        setBookmarks([]);
        setBookmarksState([]);
    }, []);

    return { bookmarks, isBookmarked, toggle, remove, clear, mounted, count: bookmarks.length };
}
