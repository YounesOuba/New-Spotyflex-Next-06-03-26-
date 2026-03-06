import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import SideNavScrollLink from '@/components/SideNavScrollLink';

export const metadata = {
    title: 'Privacy Policy — How We Protect Your Data',
    description: 'At SpotyFlex, your privacy matters. Learn about how we collect, use, and protect your personal information in a transparent and secure way.',
    alternates: { canonical: 'https://spotyflex.com/privacy' },
    openGraph: {
        title: 'Privacy Policy — SpotyFlex',
        description: 'Transparency is our priority. Read the SpotyFlex privacy policy to understand how your data is handled.',
        url: 'https://spotyflex.com/privacy',
        type: 'website',
    },
};

const SECTIONS = [
    {
        title: 'Introduction',
        content: `At SpotyFlex, your privacy matters. This website is built to share fitness content, tips, and educational resources in a simple and transparent way. This Privacy Policy explains what information is collected when you use this website and how it is handled. By using SpotyFlex, you agree to the practices described here.`,
    },
    {
        title: 'Information We Collect',
        subsections: [
            {
                subtitle: 'Personal Information',
                content: `SpotyFlex does not require user accounts and does not collect passwords or login credentials. We only collect personal information that you voluntarily provide:`,
                list: [
                    'Email address — only when you choose to subscribe to our newsletter',
                    'Name — optional, only if you choose to provide it via the contact form',
                ],
            },
            {
                subtitle: 'Automatically Collected Information',
                content: `When you visit our website, certain technical information is automatically collected to help us maintain and improve the site:`,
                list: [
                    'IP address — for basic security and analytics',
                    'Browser type and device information',
                    'Pages visited and time spent on the site',
                    'General geographic location (country or region only)',
                ],
            },
        ],
    },
    {
        title: 'Cookies & Tracking',
        content: `We use cookies and similar tracking technologies to improve your experience on our website. Cookies are small text files stored on your device.`,
        subsections: [
            {
                subtitle: 'Necessary Cookies',
                content: `These cookies are required for the website to function and cannot be disabled. They include session management and basic security.`,
            },
            {
                subtitle: 'Analytics Cookies',
                content: `With your consent, we use Google Analytics to understand how visitors interact with the site — pages visited, time spent, and general geographic location. This data is anonymized and aggregated. No personally identifiable information is collected.`,
            },
            {
                subtitle: 'Marketing & Advertising Cookies',
                content: `With your consent, we use Google Ads cookies to serve relevant advertisements and measure ad performance. These cookies may track your browsing activity across other websites.`,
            },
        ],
        after: `You can change your cookie preferences at any time by clearing your browser's local storage or revisiting this page. Refusing cookies will not affect your ability to use the site.`,
    },
    {
        title: 'How We Use Your Information',
        content: `We use the information we collect solely to operate and improve SpotyFlex:`,
        list: [
            'To send newsletter emails to subscribers who opted in',
            'To improve website performance and content quality',
            'To respond to messages sent through the contact form',
            'To understand how visitors use the website',
            'To maintain the security of the website',
        ],
    },
    {
        title: 'Information Sharing',
        content: `SpotyFlex does not sell, rent, or trade your personal information. Your data is never shared except in the following limited circumstances:`,
        list: [
            'When required by law or legal process',
            'To protect the rights and security of the website and its users',
            'When using trusted third-party services such as email providers or analytics tools — only the minimum necessary data is shared',
        ],
    },
    {
        title: 'Data Security',
        content: `Reasonable security measures are in place to protect your information from unauthorized access, disclosure, or misuse. However, no website or internet transmission is completely secure — we cannot guarantee absolute protection. We recommend not sharing sensitive personal information beyond what is necessary.`,
    },
    {
        title: 'Your Rights',
        content: `You have the right to:`,
        list: [
            'Unsubscribe from our newsletter at any time via the link in any email',
            'Request that we delete any personal information we hold about you',
            'Ask what information we have collected about you',
        ],
        after: `To exercise any of these rights, contact us at support@spotyflex.com.`,
    },
    {
        title: 'Changes to This Policy',
        content: `We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. Continued use of SpotyFlex after changes are posted constitutes acceptance of the revised policy.`,
    },
];

export default function PrivacyPage() {
    return (
        <div className="min-h-screen" style={{ background: '#080808' }}>

            {/* Grain */}
            <div className="pointer-events-none fixed inset-0 opacity-[0.03] z-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '200px',
                }}
            />

            {/* ── Header ── */}
            <div className="relative border-b" style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'linear-gradient(to bottom, #0d0d0d, #080808)' }}>
                <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px]"
                    style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(207,255,106,0.05) 0%, transparent 70%)' }} />

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14">
                    <Link href="/"
                        className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] mb-10 group transition-colors"
                        style={{ color: 'rgba(255,255,255,0.18)' }}>
                        <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-0.5" />
                        <span className="group-hover:text-white/40 transition-colors">Back</span>
                    </Link>

                    <div className="flex items-start gap-5">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 mt-1"
                            style={{ background: 'rgba(207,255,106,0.08)', border: '1px solid rgba(207,255,106,0.18)' }}>
                            <Shield className="w-5 h-5" style={{ color: '#cfff6a' }} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-5 h-[2px] rounded-full bg-[#cfff6a]" />
                                <span className="text-[9px] font-black uppercase tracking-[0.4em]"
                                    style={{ color: 'rgba(255,255,255,0.2)' }}>
                                    Legal
                                </span>
                            </div>
                            <h1 className="text-white leading-tight mb-3"
                                style={{
                                    fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                                    fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                                    fontWeight: 900,
                                    letterSpacing: '-0.03em',
                                }}>
                                Privacy Policy
                            </h1>
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em]"
                                style={{ color: 'rgba(255,255,255,0.2)' }}>
                                Last updated: December 28, 2025
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Content ── */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-28">
                <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12 items-start">

                    {/* Sticky nav */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-28 space-y-1">
                            <p className="text-[8px] font-black uppercase tracking-[0.4em] mb-4"
                                style={{ color: 'rgba(255,255,255,0.15)' }}>
                                Contents
                            </p>
                            {SECTIONS.map((s, i) => (
                                <SideNavScrollLink key={i} id={`section-${i}`} title={s.title} />
                            ))}
                        </div>
                    </aside>

                    {/* Sections */}
                    <div className="space-y-12">
                        {SECTIONS.map((section, i) => (
                            <div key={i} id={`section-${i}`}
                                className="pb-12 border-b last:border-0"
                                style={{ borderColor: 'rgba(255,255,255,0.05)' }}>

                                <h2 className="text-white font-bold mb-4"
                                    style={{
                                        fontSize: '1.1rem',
                                        fontFamily: 'var(--font-playfair), serif',
                                        letterSpacing: '-0.015em',
                                    }}>
                                    {section.title}
                                </h2>

                                {section.content && (
                                    <p className="text-[14px] leading-relaxed mb-4"
                                        style={{ color: 'rgba(255,255,255,0.45)' }}>
                                        {section.content}
                                    </p>
                                )}

                                {section.subsections?.map((sub, j) => (
                                    <div key={j} className="mb-6">
                                        <h3 className="text-[12px] font-black uppercase tracking-[0.2em] mb-3"
                                            style={{ color: 'rgba(255,255,255,0.35)' }}>
                                            {sub.subtitle}
                                        </h3>
                                        {sub.content && (
                                            <p className="text-[14px] leading-relaxed mb-3"
                                                style={{ color: 'rgba(255,255,255,0.45)' }}>
                                                {sub.content}
                                            </p>
                                        )}
                                        {sub.list && (
                                            <ul className="space-y-2">
                                                {sub.list.map((item, k) => (
                                                    <li key={k} className="flex items-start gap-3 text-[13.5px] leading-relaxed"
                                                        style={{ color: 'rgba(255,255,255,0.38)' }}>
                                                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                                                            style={{ background: '#cfff6a', opacity: 0.5 }} />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}

                                {section.list && (
                                    <ul className="space-y-2 mb-4">
                                        {section.list.map((item, j) => (
                                            <li key={j} className="flex items-start gap-3 text-[13.5px] leading-relaxed"
                                                style={{ color: 'rgba(255,255,255,0.38)' }}>
                                                <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                                                    style={{ background: '#cfff6a', opacity: 0.5 }} />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {section.after && (
                                    <p className="text-[13.5px] leading-relaxed mt-4"
                                        style={{ color: 'rgba(255,255,255,0.38)' }}>
                                        {section.after}
                                    </p>
                                )}
                            </div>
                        ))}

                        {/* Contact callout */}
                        <div className="p-6 rounded-2xl border"
                            style={{ background: 'rgba(207,255,106,0.04)', borderColor: 'rgba(207,255,106,0.12)' }}>
                            <p className="text-[13px] leading-relaxed"
                                style={{ color: 'rgba(255,255,255,0.45)' }}>
                                Questions about your privacy?{' '}
                                <a href="mailto:support@spotyflex.com"
                                    className="font-bold transition-colors"
                                    style={{ color: '#cfff6a' }}>
                                    support@spotyflex.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
