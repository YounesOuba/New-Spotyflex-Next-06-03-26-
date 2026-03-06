import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import CookieConsentBanner from "@/components/CookieConsentBanner.jsx";
import ScrollToTop from '@/components/ScrollToTop';
import Script from "next/script";

export const metadata = {
    metadataBase: new URL('https://spotyflex.com'),
    title: {
        default: 'SpotyFlex — Fitness, Workouts & Nutrition',
        template: '%s | SpotyFlex',
    },
    description: 'SpotyFlex is a modern fitness blog with expert workout plans, nutrition guides, and healthy lifestyle tips to help you move better, feel stronger, and live healthier.',
    keywords: ['fitness', 'workouts', 'nutrition', 'meal plans', 'fat burning', 'gym', 'home workouts', 'health'],
    authors: [{ name: 'SpotyFlex Team', url: 'https://spotyflex.com' }],
    creator: 'SpotyFlex',
    publisher: 'SpotyFlex',
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://spotyflex.com',
        siteName: 'SpotyFlex',
        title: 'SpotyFlex — Fitness, Workouts & Nutrition',
        description: 'Expert workout plans, nutrition guides, and practical fitness tips to help you build a healthier, stronger life.',
        images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'SpotyFlex — Fitness Blog' }],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@spotyflex',
        creator: '@spotyflex',
        title: 'SpotyFlex — Fitness, Workouts & Nutrition',
        description: 'Expert workout plans, nutrition guides, and practical fitness tips.',
        images: ['/og-default.png'],
    },
    alternates: {
        canonical: 'https://spotyflex.com',
    },
};

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
});

import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({
    children,
}) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <Script
                    id="gtm-base"
                    strategy="lazyOnload"
                    src="https://www.googletagmanager.com/gtm.js?id=GTM-TFV4X7ZM"
                />
                <Script id="gtm-init" strategy="lazyOnload">
                    {`window.dataLayer = window.dataLayer || [];`}
                </Script>
            </head>
            <body className="antialiased overflow-x-hidden" suppressHydrationWarning>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    <TooltipProvider>
                        <div className="flex min-h-screen flex-col">
                            <Header />
                            <main className="flex-1" id="main-content">
                                {children}
                            </main>
                            <Footer />
                            <ScrollToTop />
                        </div>
                        <Toaster />
                        <CookieConsentBanner />
                    </TooltipProvider>
                </ThemeProvider>
                <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || 'G-J87L706GGD'} />
            </body>
        </html>
    );
}
