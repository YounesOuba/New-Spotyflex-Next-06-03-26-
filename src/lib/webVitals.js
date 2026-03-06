/**
 * Web Vitals monitoring and optimization
 * Helps track and improve Core Web Vitals metrics
 */

// Thresholds for Web Vitals
const THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 },      // Largest Contentful Paint
  FCP: { good: 1800, needsImprovement: 3000 },      // First Contentful Paint
  CLS: { good: 0.1, needsImprovement: 0.25 },       // Cumulative Layout Shift
  TTFB: { good: 600, needsImprovement: 1800 },      // Time to First Byte
  INP: { good: 200, needsImprovement: 500 },        // Interaction to Next Paint
};

/**
 * Get rating based on metric value and thresholds
 */
function getRating(metricName, value) {
  const threshold = THRESHOLDS[metricName];
  if (!threshold) return 'poor';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.needsImprovement) return 'needs-improvement';
  return 'poor';
}

/**
 * Monitor Largest Contentful Paint (LCP)
 * Target: < 2.5s for "Good"
 */
export function onLCP(callback) {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        if (!lastEntry) return;
        
        const vitalsMetric = {
          name: 'LCP',
          value: Math.round(lastEntry.renderTime || lastEntry.loadTime),
          rating: getRating('LCP', lastEntry.renderTime || lastEntry.loadTime),
          delta: lastEntry.duration,
          id: `lcp-${Date.now()}`,
          entries: entries,
        };
        
        callback(vitalsMetric);
      });
      
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
      
      return () => observer.disconnect();
    } catch {
      console.debug('LCP observer not supported');
    }
  }
}

/**
 * Monitor First Contentful Paint (FCP)
 * Target: < 1.8s for "Good"
 */
export function onFCP(callback) {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        if (!lastEntry) return;
        
        const vitalsMetric = {
          name: 'FCP',
          value: Math.round(lastEntry.startTime),
          rating: getRating('FCP', lastEntry.startTime),
          delta: lastEntry.startTime,
          id: `fcp-${Date.now()}`,
          entries: entries,
        };
        
        callback(vitalsMetric);
      });
      
      observer.observe({ type: 'paint', buffered: true });
      
      return () => observer.disconnect();
    } catch {
      console.debug('FCP observer not supported');
    }
  }
}

/**
 * Monitor Cumulative Layout Shift (CLS)
 * Target: < 0.1 for "Good"
 */
export function onCLS(callback) {
  if ('PerformanceObserver' in window) {
    try {
      let clsValue = 0;
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            const firstSessionEntry = clsValue;
            clsValue += entry.value;
            
            const vitalsMetric = {
              name: 'CLS',
              value: clsValue,
              rating: getRating('CLS', clsValue),
              delta: clsValue - firstSessionEntry,
              id: `cls-${Date.now()}`,
              entries: [entry],
            };
            
            callback(vitalsMetric);
          }
        }
      });
      
      observer.observe({ type: 'layout-shift', buffered: true });
      
      return () => observer.disconnect();
    } catch {
      console.debug('CLS observer not supported');
    }
  }
}

/**
 * Monitor Time to First Byte (TTFB)
 * Target: < 600ms for "Good"
 */
export function onTTFB(callback) {
  const vitalsMetric = {
    name: 'TTFB',
    value: 0,
    rating: 'good',
    delta: 0,
    id: `ttfb-${Date.now()}`,
  };
  
  if (performance.timing) {
    const navTiming = performance.timing;
    const ttfb = navTiming.responseStart - navTiming.fetchStart;
    vitalsMetric.value = Math.round(ttfb);
    vitalsMetric.rating = getRating('TTFB', ttfb);
    vitalsMetric.delta = ttfb;
  }
  
  callback(vitalsMetric);
}
