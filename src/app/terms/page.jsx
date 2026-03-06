import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import SideNavScrollLink from '@/components/SideNavScrollLink';

export const metadata = {
    title: 'Terms of Service — Website Usage Rules',
    description: 'Our terms and conditions for using SpotyFlex. Read about user responsibilities, content licensing, and our health and fitness disclaimer.',
    alternates: { canonical: 'https://spotyflex.com/terms' },
    openGraph: {
        title: 'Terms of Service — SpotyFlex',
        description: 'Read the terms and conditions for using the SpotyFlex fitness platform.',
        url: 'https://spotyflex.com/terms',
        type: 'website',
    },
};

const SECTIONS = [
    {
        title: 'Acceptance of Terms',
        content: `By accessing and using SpotyFlex ("the Website"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use the Website. These terms apply to all visitors and users of this Website.`,
    },
    {
        title: 'Use License',
        content: `Permission is granted to temporarily view and download content from SpotyFlex for personal, non-commercial use only. This is a license, not a transfer of ownership. Under this license, you may not:`,
        list: [
            'Modify or copy the materials for commercial use',
            'Use the materials for any commercial purpose or public display',
            'Attempt to reverse engineer any software on the Website',
            'Remove any copyright or proprietary notations from the materials',
            'Transfer the materials to another person or mirror them on any other server',
        ],
        after: `This license terminates automatically if you violate any of these restrictions. Upon termination, you must destroy any downloaded materials in your possession.`,
    },
    {
        title: 'User Responsibilities',
        content: `By using our Website, you agree to:`,
        list: [
            'Use the Website in a lawful and respectful manner',
            'Not engage in any activity that could harm, disable, or impair the Website',
            'Not attempt to gain unauthorized access to any part of the Website',
            'Respect the intellectual property rights of SpotyFlex and third parties',
            'Not use the Website for any unlawful or prohibited purpose',
            'Not distribute spam, malware, or harmful content through any Website features',
        ],
    },
    {
        title: 'Content & Intellectual Property',
        content: `The Website and its original content, features, and functionality are and will remain the exclusive property of SpotyFlex and its licensors. The Website is protected by copyright, trademark, and other applicable laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent. You may not reproduce, distribute, modify, or create derivative works from any material on this Website except for personal, non-commercial use.`,
    },
    {
        title: 'Health & Fitness Disclaimer',
        content: `The content published on SpotyFlex is for informational and educational purposes only. It is not a substitute for professional medical, fitness, or nutritional advice. Always consult a qualified professional before starting any new workout or diet program. SpotyFlex is not responsible for any injuries, health complications, or adverse outcomes resulting from following content on this Website. Use all information at your own risk.`,
        highlight: true,
    },
    {
        title: 'Independent Platform',
        content: `SpotyFlex is independently created and managed as an informational platform. All content is based on personal research, learning, and experience, and is shared for educational and inspirational purposes only. SpotyFlex is not affiliated with any gym, supplement brand, or fitness organization unless explicitly stated.`,
    },
    {
        title: 'Cookies',
        content: `By using this website, you acknowledge our use of cookies as described in our Privacy Policy. You can accept or decline non-essential cookies via the banner displayed on your first visit. Necessary cookies are always active as they are required for the site to function correctly.`,
    },
    {
        title: 'Disclaimer of Warranties',
        content: `The information on this Website is provided on an "as is" basis. To the fullest extent permitted by law, SpotyFlex makes no representations or warranties of any kind — express or implied — about the completeness, accuracy, reliability, or availability of the Website or its content. We do not guarantee that the Website will be constantly available or error-free.`,
    },
    {
        title: 'Limitation of Liability',
        content: `SpotyFlex shall not be held liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the Website, including but not limited to injuries, data loss, or financial loss. Your use of the Website and reliance on any content is entirely at your own risk.`,
    },
    {
        title: 'Changes to Terms',
        content: `SpotyFlex reserves the right to modify these Terms at any time. Changes will be posted on this page with an updated date. Continued use of the Website after any changes constitutes your acceptance of the new terms. We encourage you to review this page periodically.`,
    },
];

export default function TermsPage() {
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
                            <FileText className="w-5 h-5" style={{ color: '#cfff6a' }} />
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
                                Terms of Service
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

                                {/* Highlighted section (health disclaimer) */}
                                {section.highlight ? (
                                    <div className="p-5 rounded-2xl border"
                                        style={{ background: 'rgba(251,146,60,0.05)', borderColor: 'rgba(251,146,60,0.15)' }}>
                                        <p className="text-[13.5px] leading-relaxed"
                                            style={{ color: 'rgba(255,255,255,0.5)' }}>
                                            {section.content}
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        {section.content && (
                                            <p className="text-[14px] leading-relaxed mb-4"
                                                style={{ color: 'rgba(255,255,255,0.45)' }}>
                                                {section.content}
                                            </p>
                                        )}

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
                                            <p className="text-[13.5px] leading-relaxed mt-2"
                                                style={{ color: 'rgba(255,255,255,0.35)' }}>
                                                {section.after}
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}

                        {/* Bottom links */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
                            <div className="p-5 rounded-2xl border flex-1"
                                style={{ background: 'rgba(207,255,106,0.04)', borderColor: 'rgba(207,255,106,0.12)' }}>
                                <p className="text-[13px] leading-relaxed"
                                    style={{ color: 'rgba(255,255,255,0.45)' }}>
                                    Questions about these terms?{' '}
                                    <a href="mailto:support@spotyflex.com"
                                        className="font-bold transition-colors"
                                        style={{ color: '#cfff6a' }}>
                                        support@spotyflex.com
                                    </a>
                                </p>
                            </div>
                            <Link href="/privacy"
                                className="text-[10px] font-black uppercase tracking-[0.25em] px-5 py-3 rounded-xl transition-all duration-200 whitespace-nowrap"
                                style={{ color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.07)' }}>
                                Privacy Policy →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
