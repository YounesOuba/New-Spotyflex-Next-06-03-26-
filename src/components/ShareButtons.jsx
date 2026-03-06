'use client';

import { Twitter, Facebook, Linkedin, Link2, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ShareButtons({ title, slug }) {
    const [copied, setCopied] = useState(false);

    const [url, setUrl] = useState('');

    useEffect(() => {
        setUrl(`${window.location.origin}/article/${slug}`);
    }, [slug]);

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = [
        {
            name: 'Twitter',
            icon: Twitter,
            href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            color: 'hover:text-[#1DA1F2]',
        },
        {
            name: 'Facebook',
            icon: Facebook,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            color: 'hover:text-[#4267B2]',
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            color: 'hover:text-[#0077b5]',
        },
    ];

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-white/10 relative z-20">
            <h3 className="text-xl font-bold text-white">Share this article</h3>

            <div className="flex items-center gap-3">
                {shareLinks.map((platform) => (
                    <a
                        key={platform.name}
                        href={platform.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-full bg-white/5 hover:bg-[#cfff6a] hover:text-[#212121] transition-all group ${platform.color}`}
                        aria-label={`Share on ${platform.name}`}
                    >
                        <platform.icon className="w-5 h-5" />
                    </a>
                ))}

                <button
                    onClick={handleCopy}
                    className="p-3 rounded-full bg-white/5 hover:bg-[#cfff6a] hover:text-[#212121] transition-all group relative"
                    aria-label="Copy link"
                >
                    {copied ? <Check className="w-5 h-5" /> : <Link2 className="w-5 h-5" />}

                    {copied && (
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#cfff6a] text-[#212121] text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap animate-in fade-in slide-in-from-bottom-2">
                            Copied!
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
}
