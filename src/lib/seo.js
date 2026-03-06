/**
 * SEO & Meta Tags Utility
 * Handles dynamic page metadata, structured data, and SEO optimization
 */

// Default OG image
const DEFAULT_OG_IMAGE = 'https://spotyflex.com/og-image.png';
const DEFAULT_OG_IMAGE_WIDTH = 1200;
const DEFAULT_OG_IMAGE_HEIGHT = 630;

/**
 * Update page title and meta tags dynamically
 */
export function setPageMeta(meta) {
  // Use default OG image if none provided
  const ogImage = meta.image || DEFAULT_OG_IMAGE;

  // Update document title
  document.title = meta.title;

  // Update or create meta tags
  updateMetaTag('description', meta.description);
  if (meta.keywords) updateMetaTag('keywords', meta.keywords);
  if (meta.author) updateMetaTag('author', meta.author);

  // Open Graph tags
  updateMetaTag('og:title', meta.title, 'property');
  updateMetaTag('og:description', meta.description, 'property');
  updateMetaTag('og:type', meta.type || 'website', 'property');
  updateMetaTag('og:image', ogImage, 'property');
  updateMetaTag('og:image:width', String(meta.imageWidth || DEFAULT_OG_IMAGE_WIDTH), 'property');
  updateMetaTag('og:image:height', String(meta.imageHeight || DEFAULT_OG_IMAGE_HEIGHT), 'property');
  if (meta.imageAlt) updateMetaTag('og:image:alt', meta.imageAlt, 'property');
  if (meta.url) updateMetaTag('og:url', meta.url, 'property');

  // Twitter Card tags (Premium)
  updateMetaTag('twitter:card', 'summary_large_image', 'name');
  updateMetaTag('twitter:title', meta.title, 'name');
  updateMetaTag('twitter:description', meta.description, 'name');
  updateMetaTag('twitter:image', ogImage, 'name');
  updateMetaTag('twitter:image:alt', meta.imageAlt || meta.title, 'name');

  // Canonical URL
  if (meta.canonicalUrl) {
    updateCanonicalUrl(meta.canonicalUrl);
  }

  // Article-specific meta
  if (meta.type === 'article') {
    if (meta.publishedDate) updateMetaTag('article:published_time', meta.publishedDate, 'property');
    if (meta.modifiedDate) updateMetaTag('article:modified_time', meta.modifiedDate, 'property');
    if (meta.author) updateMetaTag('article:author', meta.author, 'property');
  }
}

/**
 * Helper to update or create meta tag
 */
function updateMetaTag(name, content, attribute = 'name') {
  let tag = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }
  
  tag.content = content;
}

/**
 * Update canonical URL
 */
function updateCanonicalUrl(url) {
  let canonical = document.querySelector('link[rel="canonical"]');
  
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  
  canonical.href = url;
}

/**
 * Add structured data (JSON-LD) to page
 */
export function addStructuredData(data, id) {
  if (id) {
    const existing = document.getElementById(id);
    if (existing) existing.remove();
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  if (id) script.id = id;
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

/**
 * Calculate read time based on content length
 */
export function calculateReadTime(content) {
  if (!content) return 0;
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>/g, '').match(/\w+/g);
  return Math.ceil((words ? words.length : 0) / wordsPerMinute);
}

/**
 * Generate Article schema with E-E-A-T signals
 * E-E-A-T = Experience, Expertise, Authoritativeness, Trustworthiness
 */
export function generateArticleSchema(
  title,
  description,
  image,
  publishedDate,
  modifiedDate,
  author = 'SpotyFlex',
  authorDescription = 'Certified fitness and wellness experts',
  url = ''
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': url,
    headline: title,
    description: description,
    image: {
      '@type': 'ImageObject',
      url: image,
      width: 1200,
      height: 630,
      name: title,
    },
    datePublished: publishedDate,
    dateModified: modifiedDate,
    author: {
      '@type': 'Person',
      name: author,
      description: authorDescription,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SpotyFlex',
      logo: {
        '@type': 'ImageObject',
        url: 'https://spotyflex.com/logo.png',
      },
    },
  };
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SpotyFlex',
    url: 'https://spotyflex.com',
    logo: 'https://spotyflex.com/logo.png',
    description: 'Your Ultimate Fitness & Nutrition Guide',
    sameAs: [
      'https://twitter.com/spotyflex',
      'https://instagram.com/spotyflex',
    ],
  };
}

/**
 * Generate Website schema
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SpotyFlex',
    url: 'https://spotyflex.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://spotyflex.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate Breadcrumb schema
 */
export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
