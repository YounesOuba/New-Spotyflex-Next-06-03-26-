import { Calendar, User, Clock } from 'lucide-react';
import { calculateReadTime } from '@/lib/seo';

/**
 * Article Metadata Component
 * Displays author, publication dates, and read time
 * SEO-friendly with proper semantics for E-E-A-T signals
 */
export function ArticleMetadata({
  title,
  author = 'SpotyFlex',
  authorCredentials = 'Certified Fitness & Wellness Expert',
  publishedDate,
  modifiedDate,
  readTimeMinutes,
  content,
}) {
  const published = new Date(publishedDate);
  const modified = modifiedDate ? new Date(modifiedDate) : null;
  const readTime = readTimeMinutes || (content ? calculateReadTime(content) : 0);

  const publishedFormatted = published.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const modifiedFormatted = modified?.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="space-y-4">
      {/* Author Section (E-E-A-T Signal) */}
      <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
        <div className="w-12 h-12 rounded-full bg-[#cfff6a] flex items-center justify-center">
          <User className="w-6 h-6 text-black" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-white">
            <span itemProp="author" itemType="https://schema.org/Person">
              <span itemProp="name">{author}</span>
            </span>
          </p>
          <p className="text-sm text-white/70" itemProp="description">
            {authorCredentials}
          </p>
        </div>
      </div>

      {/* Publication & Modification Dates */}
      <div className="flex flex-wrap gap-6 text-sm text-white/70">
        {/* Published Date */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#cfff6a]" />
          <time dateTime={published.toISOString()} itemProp="datePublished">
            Published: <strong className="text-white">{publishedFormatted}</strong>
          </time>
        </div>

        {/* Modified Date (if different) */}
        {modifiedFormatted && modifiedFormatted !== publishedFormatted && (
          <div className="flex items-center gap-2 text-white/60">
            <Clock className="w-4 h-4 text-[#cfff6a]" />
            <time dateTime={modified?.toISOString()} itemProp="dateModified">
              Updated: <strong className="text-white/80">{modifiedFormatted}</strong>
            </time>
          </div>
        )}

        {/* Read Time */}
        {readTime > 0 && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#cfff6a]" />
            <span>Read time: <strong className="text-white">{readTime} min</strong></span>
          </div>
        )}
      </div>

      {/* SEO-friendly hidden metadata */}
      <meta itemProp="headline" content={title} />
      <meta itemProp="datePublished" content={published.toISOString()} />
      {modified && <meta itemProp="dateModified" content={modified.toISOString()} />}
    </article>
  );
}

export default ArticleMetadata;
