'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Clock, Tag, Zap } from 'lucide-react';
import NextImage from 'next/image';
import { useRouter } from 'next/navigation';
import smallLogo from '../assets/Logo/Spoty.png';

/**
 * SearchResult Component
 * Displays a single search result with enhanced formatting and metadata
 *
 * Props:
 * - article: Article object with all data
 * - index: Index for animation delay
 * - onClick: Optional callback when clicked
 * - showScore: Whether to show relevance score (default: false)
 * - compact: Compact view for modal (default: false)
 */

const CATEGORY_COLORS = {
  workouts: '#60a5fa',
  nutrition: '#fb923c',
  guides: '#c084fc',
};

export default function SearchResult({
  article,
  index = 0,
  onClick,
  showScore = false,
  compact = false,
}) {
  const router = useRouter();
  const categoryColor = CATEGORY_COLORS[article.category] || '#9ca3af';

  const handleClick = () => {
    if (onClick) {
      onClick(article);
    } else {
      router.push(`/article/${article.slug}`);
    }
  };

  if (compact) {
    // Compact version for modal/dropdown
    return (
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        onClick={handleClick}
        className="w-full flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] hover:border-white/[#cfff6a]/20 transition-all group text-left"
      >
        {/* Thumbnail */}
        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white/5 shrink-0">
          {article.image ? (
            <NextImage
              src={article.image}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white/5 p-1">
              <NextImage src={smallLogo} alt="SpotyFlex" className="opacity-20 grayscale brightness-200" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-bold text-white/80 group-hover:text-white transition-colors line-clamp-1">
            {article.title}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span
              className="text-[9px] font-black uppercase tracking-wider opacity-50 group-hover:opacity-100 transition-opacity"
              style={{ color: categoryColor }}
            >
              {article.category}
            </span>
            <span className="text-[9px] text-white/10">•</span>
            <span className="text-[9px] text-white/30 font-bold uppercase tracking-tighter">
              {article.readTime}m
            </span>
          </div>
        </div>

        {/* Arrow */}
        <ArrowRight className="w-3.5 h-3.5 text-white/10 group-hover:text-white/30 transition-all shrink-0 -translate-x-1 group-hover:translate-x-0" />
      </motion.button>
    );
  }

  // Full version for search results page
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      onClick={handleClick}
      className="group cursor-pointer rounded-2xl border transition-all duration-300"
      style={{
        background: 'linear-gradient(160deg, #141414 0%, #0e0e0e 100%)',
        borderColor: 'rgba(255,255,255,0.05)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${categoryColor}30`;
        e.currentTarget.style.boxShadow = `0 0 24px ${categoryColor}10`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Image Container */}
      {article.image && (
        <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
          <NextImage
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <div
              className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider backdrop-blur-md"
              style={{
                background: `${categoryColor}20`,
                border: `1px solid ${categoryColor}40`,
                color: categoryColor,
              }}
            >
              {article.category}
            </div>
          </div>

          {/* Score Badge (if enabled) */}
          {showScore && article._score && (
            <div className="absolute bottom-4 left-4">
              <div
                className="px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-wider backdrop-blur-md flex items-center gap-1"
                style={{
                  background: 'rgba(207,255,106,0.15)',
                  border: '1px solid rgba(207,255,106,0.3)',
                  color: '#cfff6a',
                }}
              >
                <Zap className="w-3 h-3" />
                {Math.round(article._score)} pts
              </div>
            </div>
          )}
        </div>
      )}

      {/* Content Container */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-bold text-white/90 group-hover:text-white transition-colors mb-2 line-clamp-2 leading-snug">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-white/50 group-hover:text-white/60 transition-colors mb-4 line-clamp-2 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-tight px-2.5 py-1 rounded-full transition-all"
                style={{
                  background: `${categoryColor}15`,
                  color: categoryColor,
                  border: `1px solid ${categoryColor}25`,
                }}
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="text-[10px] font-semibold text-white/30 flex items-center">
                +{article.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-white/30" />
              <span className="text-[11px] font-bold text-white/50 uppercase tracking-tight">
                {article.readTime} min read
              </span>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100"
            style={{
              background: `${categoryColor}20`,
              color: categoryColor,
            }}
          >
            <span className="text-[10px] font-black uppercase tracking-wider">Read</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
