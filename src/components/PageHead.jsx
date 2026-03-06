import { Helmet } from 'react-helmet-async';

/**
 * PageHead Component
 * Manages document head for SEO (title, meta tags, structured data)
 * Use this in every page component
 */
export function PageHead({
  title,
  description,
  keywords,
  ogImage = 'https://spotyflex.com/Logo.png',
  ogUrl,
  ogType = 'website',
  canonicalUrl,
  structured,
  author,
  publishedTime,
  modifiedTime,
}) {
  return (
    <Helmet>
      <html lang="en" />
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      <meta name="robots" content="max-image-preview:large" />
      
      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Article Specific Meta Tags */}
      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Canonical */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Structured Data */}
      {structured && (
        <script type="application/ld+json">
          {structured}
        </script>
      )}
    </Helmet>
  );
}

export default PageHead;
