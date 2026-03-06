const CONSENT_KEY = 'spotyflex_cookie_consent';
const API_URL     = 'https://spotyflex.com/api/cookie-consent.php';

/**
 * Consent object shape:
 * {
 *   decision:  'accepted' | 'necessary' | null,
 *   necessary: true (always),
 *   analytics: boolean,
 *   marketing: boolean,
 *   timestamp: ISO string,
 * }
 */

export function getConsent() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function shouldShowCookieBanner() {
  return getConsent() === null;
}

export function hasAnalyticsConsent() {
  return getConsent()?.analytics === true;
}

export function hasMarketingConsent() {
  return getConsent()?.marketing === true;
}

export function setCookieConsent(decision) {
  if (typeof window === 'undefined') return;

  const consent = {
    decision,
    necessary: true,
    analytics: decision === 'accepted',
    marketing: decision === 'accepted',
    timestamp: new Date().toISOString(),
  };

  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));

  // Report to backend (fire-and-forget, non-blocking)
  fetch(API_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ consent: decision === 'accepted' ? 'accepted' : 'rejected' }),
  }).catch(() => {}); // silently ignore network errors

  return consent;
}

export function clearConsent() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CONSENT_KEY);
}