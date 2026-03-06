'use client';

import { useEffect } from 'react';
import { hasAnalyticsConsent } from '@/lib/cookieConsent';

const GA_ID = 'G-J87L706GGD';

export default function GoogleAnalytics() {
    useEffect(() => {
        if (!hasAnalyticsConsent()) return;

        // Inject gtag script only after consent
        const script1 = document.createElement('script');
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        script1.async = true;
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}', { anonymize_ip: true });
    `;
        document.head.appendChild(script2);
    }, []);

    return null;
}
