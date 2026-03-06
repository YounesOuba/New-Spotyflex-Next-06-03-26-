import { useEffect } from 'react';

/**
 * Hook to optimize performance by deferring non-critical tasks
 */
export function usePerformanceOptimization() {
  useEffect(() => {
    // Defer rendering of below-the-fold content
    const observerOptions = {
      threshold: 0,
      rootMargin: '50px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Element is near viewport, allow rendering
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all lazy-loaded elements
    const lazyElements = document.querySelectorAll('[data-lazy]');
    lazyElements.forEach((el) => observer.observe(el));

    return () => {
      lazyElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  // Prefetch DNS for known external domains
  useEffect(() => {
    const dnsPrefetch = (domain) => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = `//${domain}`;
      document.head.appendChild(link);
    };

    // Add any external domains you frequently use
    dnsPrefetch('cms.spotyflex.com');
    dnsPrefetch('fonts.googleapis.com');
    dnsPrefetch('fonts.gstatic.com');
  }, []);
}

/**
 * Hook for image lazy loading with intersection observer
 */
export function useImageLazyLoading() {
  useEffect(() => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.src;
          
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px',
    });

    images.forEach((img) => imageObserver.observe(img));

    return () => {
      images.forEach((img) => imageObserver.unobserve(img));
    };
  }, []);
}

/**
 * Hook to defer non-critical script loading
 */
export function useDeferNonCriticalScripts() {
  useEffect(() => {
    // Defer loading of non-critical scripts
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Scripts marked with data-defer will be loaded here
        const deferredScripts = document.querySelectorAll('script[data-defer]');
        deferredScripts.forEach((script) => {
          const newScript = document.createElement('script');
          if (script.textContent) {
            newScript.textContent = script.textContent;
          }
          const src = script.getAttribute('data-src');
          if (src) {
            newScript.src = src;
          }
          script.parentNode?.replaceChild(newScript, script);
        });
      });
    }
  }, []);
}
