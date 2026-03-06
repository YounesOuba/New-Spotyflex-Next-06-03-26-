'use client';

import { useState } from 'react';

/**
 * OptimizedImage Component
 * Handles lazy loading, WebP format, alt text, and dimensions
 * SEO-friendly with proper attributes for search engines
 */
export function OptimizedImage({
  src,
  srcWebP,
  alt,
  width,
  height,
  lazy = true,
  className = '',
  fallback,
  priority = false,
  ...props
}) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    if (fallback) {
      setImageSrc(fallback);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <picture>
      {/* WebP format for modern browsers (better compression) */}
      {srcWebP && <source srcSet={srcWebP} type="image/webp" />}

      {/* Fallback to original format */}
      <img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : lazy ? 'lazy' : 'eager'}
        className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
        onLoad={handleLoad}
        onError={handleError}
        /* SEO attributes */
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        {...props}
      />
    </picture>
  );
}

export default OptimizedImage;
