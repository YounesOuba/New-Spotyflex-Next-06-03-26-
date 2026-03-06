import { useEffect } from 'react';
import { loadGoogleAnalytics, getCookieConsent } from '@/lib/cookieConsent';

/**
 * Hook to conditionally load Google Analytics based on cookie consent
 * Only loads analytics if user has accepted cookies
 *
 * Usage in your app:
 * useLoadAnalytics('G-XXXXXXXXXXXX');
 */
export function useLoadAnalytics(measurementId) {
  useEffect(() => {
    const consent = getCookieConsent();

    if (consent === 'accepted') {
      loadGoogleAnalytics(measurementId);
    }

    // Optional: Listen for storage changes (if user changes consent in another tab)
    const handleStorageChange = () => {
      const newConsent = getCookieConsent();
      if (newConsent === 'accepted') {
        loadGoogleAnalytics(measurementId);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [measurementId]);
}
