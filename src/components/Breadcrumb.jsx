'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { generateBreadcrumbSchema, addStructuredData } from '@/lib/seo';
import { useEffect } from 'react';

/**
 * Responsive Breadcrumb Navigation
 * Mobile-friendly + SEO optimized
 */
export function Breadcrumb({ items }) {
  useEffect(() => {
    const schemaItems = items
      .filter((item) => item.path)
      .map((item) => ({
        name: item.label,
        url: `https://spotyflex.com${item.path}`,
      }));

    if (schemaItems.length > 0) {
      addStructuredData(generateBreadcrumbSchema(schemaItems));
    }
  }, [items]);

  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-[#0a0a0a] border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol
          className="
            flex items-center gap-2
            overflow-x-auto whitespace-nowrap
            py-3 text-sm
            scrollbar-hide
          "
        >
          {/* Home */}
          <li className="flex-shrink-0">
            <Link
              href="/"
              className="
                flex items-center gap-1
                text-white/70 hover:text-[#cfff6a]
                transition-colors
                min-h-[40px]
              "
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </li>

          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-2 flex-shrink-0"
            >
              <ChevronRight className="w-4 h-4 text-white/40" />

              {item.current ? (
                <span
                  aria-current="page"
                  className="
                    max-w-[160px] sm:max-w-none
                    truncate font-medium
                    text-[#cfff6a]
                  "
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.path || '/'}
                  className="
                    max-w-[140px] sm:max-w-none
                    truncate
                    text-white/70 hover:text-[#cfff6a]
                    transition-colors
                    min-h-[40px] flex items-center
                  "
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

export default Breadcrumb;
