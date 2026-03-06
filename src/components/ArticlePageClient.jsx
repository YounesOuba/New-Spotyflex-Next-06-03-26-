'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function CategoryBackLink({ category, accent }) {
    return (
        <Link
            href={`/category/${category}`}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] transition-colors"
            style={{ color: 'rgba(255,255,255,0.4)' }}
            onMouseEnter={e => e.currentTarget.style.color = accent.color}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
        >
            <ArrowLeft className="w-3.5 h-3.5" />
            {category}
        </Link>
    );
}

export function CategoryMoreLink({ category, accent }) {
    return (
        <Link
            href={`/category/${category}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300"
            style={{ background: accent.bg, border: `1px solid ${accent.border}`, color: accent.color }}
        >
            More in {category}
            <ArrowRight className="w-3.5 h-3.5" />
        </Link>
    );
}
