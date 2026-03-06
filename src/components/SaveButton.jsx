'use client';

import { Heart } from 'lucide-react';
import { useBookmarks } from '@/hooks/use-bookmarks';
import { useState } from 'react';

export default function SaveButton({ article, variant = 'default' }) {
    const { isBookmarked, toggle, mounted } = useBookmarks();
    const [pulse, setPulse] = useState(false);

    if (!mounted) return null;

    const saved = isBookmarked(article.slug);

    function handleClick(e) {
        e.preventDefault();
        e.stopPropagation();
        const didSave = toggle(article);
        if (didSave) {
            setPulse(true);
            setTimeout(() => setPulse(false), 600);
        }
    }

    // ── Hero variant — text button ──
    if (variant === 'hero') {
        return (
            <button
                onClick={handleClick}
                className="hidden sm:flex items-center gap-2 text-[11px] font-bold tracking-[0.12em] uppercase transition-all whitespace-nowrap"
                style={{ color: saved ? '#cfff6a' : 'rgba(255,255,255,0.35)' }}
            >
                <Heart
                    size={14}
                    fill={saved ? '#cfff6a' : 'none'}
                    className="transition-all duration-300"
                    style={pulse ? { transform: 'scale(1.4)' } : {}}
                />
                {saved ? 'Saved' : 'Save for later'}
            </button>
        );
    }

    // ── Card variant — icon button ──
    return (
        <button
            onClick={handleClick}
            aria-label={saved ? 'Remove bookmark' : 'Save article'}
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200"
            style={saved
                ? { background: 'rgba(207,255,106,0.15)', border: '1px solid rgba(207,255,106,0.3)' }
                : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }
            }
        >
            <Heart
                size={12}
                fill={saved ? '#cfff6a' : 'none'}
                style={{
                    color: saved ? '#cfff6a' : 'rgba(255,255,255,0.3)',
                    transform: pulse ? 'scale(1.5)' : 'scale(1)',
                    transition: 'transform 0.3s, color 0.2s',
                }}
            />
        </button>
    );
}
