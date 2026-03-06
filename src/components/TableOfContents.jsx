'use client';

import { useEffect, useState } from 'react';
import { List } from 'lucide-react';

export default function TableOfContents() {
    const [headings, setHeadings] = useState([]);
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        // Select all H2 and H3 elements from the article content
        const articleContent = document.querySelector('.article-content');
        if (!articleContent) return;

        const elements = articleContent.querySelectorAll('h2, h3');
        const headingData = Array.from(elements).map((element) => {
            if (!element.id) {
                element.id = element.innerText
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-');
            }

            return {
                id: element.id,
                text: element.innerText,
                level: Number(element.tagName.charAt(1)),
            };
        });

        setHeadings(headingData);
    }, []);

    useEffect(() => {
        if (headings.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0px -66%' }
        );

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length < 2) return null;

    return (
        <div className="bg-[#141414] border border-white/[0.07] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5 text-[#cfff6a]">
                <List className="w-4 h-4" />
                <h4 className="font-black uppercase tracking-[0.2em] text-[10px]">On this page</h4>
            </div>
            <nav>
                <ul className="space-y-1">
                    {headings.map((heading) => (
                        <li key={heading.id} style={{ paddingLeft: (heading.level - 2) * 12 }}>
                            <a
                                href={`#${heading.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    const element = document.getElementById(heading.id);
                                    if (element) {
                                        const headerOffset = 75;
                                        const elementPosition = element.getBoundingClientRect().top;
                                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                                        window.scrollTo({
                                            top: offsetPosition,
                                            behavior: 'smooth'
                                        });
                                    }
                                }}
                                className={`block text-[12px] py-1.5 transition-colors border-l-2 pl-3 ${activeId === heading.id
                                    ? 'border-[#cfff6a] text-[#cfff6a] font-bold'
                                    : 'border-transparent text-white/40 hover:text-white/70 hover:border-white/15'
                                    }`}
                            >
                                {heading.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
