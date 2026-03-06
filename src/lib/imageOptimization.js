/**
 * Image SEO Utilities
 * Minimal, focused utilities for image optimization
 */

/**
 * Generate descriptive alt text from title
 * SEO best practice: alt text should be descriptive and natural
 */
export function generateAltText(title, context = '') {
  if (!title) return 'Image';

  // Remove common suffixes
  let alt = title
    .replace(/\s*\|\s*.*$/, '') // Remove pipe-separated metadata
    .replace(/\s*-\s*.*$/, '') // Remove dash-separated metadata
    .trim();

  // Add context if provided
  if (context) {
    alt = `${alt} - ${context}`;
  }

  // Truncate to reasonable length (around 125 characters)
  if (alt.length > 125) {
    alt = alt.substring(0, 122) + '...';
  }

  return alt;
}
