import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Dumbbell, Salad, BookOpen, Users } from 'lucide-react';
import smallLogo from '@/assets/Logo/Spoty.png';

export const metadata = {
    title: 'About SpotyFlex — Move Better, Feel Stronger',
    description: 'Learn about the mission behind SpotyFlex. We provide structured training programs, nutrition guidance, and expert tips to help you build real strength and sustainable habits.',
    alternates: { canonical: 'https://spotyflex.com/about' },
    openGraph: {
        title: 'About SpotyFlex — Our Mission & Story',
        description: 'SpotyFlex is a modern fitness platform built to help you move better, feel stronger, and live healthier every single day.',
        url: 'https://spotyflex.com/about',
        type: 'website',
    },
    twitter: {
        title: 'About SpotyFlex — Fitness & Wellness',
        description: 'The mission behind SpotyFlex: making fitness clear, effective, and achievable for everyone.',
    },
};

const PILLARS = [
    {
        icon: Dumbbell,
        title: 'Comprehensive Workout Plans',
        desc: 'Structured training programs designed for real progress — from fat loss and muscle building to strength and endurance, adapted to every fitness level.',
        accent: '#60a5fa',
        bg: 'rgba(96,165,250,0.07)',
        border: 'rgba(96,165,250,0.15)',
    },
    {
        icon: Salad,
        title: 'Nutrition Guidance',
        desc: 'Simple, realistic nutrition strategies and meal guidance that help you fuel your body, improve your energy, and stay consistent without extreme diets.',
        accent: '#fb923c',
        bg: 'rgba(251,146,60,0.07)',
        border: 'rgba(251,146,60,0.15)',
    },
    {
        icon: BookOpen,
        title: 'Expert Articles & Tips',
        desc: 'Actionable fitness knowledge, training hacks, and lifestyle advice written to help you train smarter, recover better, and stay motivated long-term.',
        accent: '#c084fc',
        bg: 'rgba(192,132,252,0.07)',
        border: 'rgba(192,132,252,0.15)',
    },
    {
        icon: Users,
        title: 'Community Support',
        desc: 'A positive space where you can stay inspired, track your progress, share your journey, and grow alongside others pushing toward their goals.',
        accent: '#cfff6a',
        bg: 'rgba(207,255,106,0.07)',
        border: 'rgba(207,255,106,0.15)',
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen" style={{ background: '#080808' }}>

            {/* Grain */}
            <div
                className="pointer-events-none fixed inset-0 opacity-[0.035] z-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '200px',
                }}
            />

            {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
            <section className="relative overflow-hidden pt-28 pb-24 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                {/* Lime glow */}
                <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px]"
                    style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(207,255,106,0.06) 0%, transparent 70%)' }} />

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    {/* Label */}
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <div className="w-6 h-[2px] rounded-full bg-[#cfff6a]" />
                        <span className="text-[9px] font-black uppercase tracking-[0.45em]"
                            style={{ color: 'rgba(255,255,255,0.25)' }}>
                            About SpotyFlex
                        </span>
                        <div className="w-6 h-[2px] rounded-full bg-[#cfff6a]" />
                    </div>

                    <h1
                        className="text-white mb-8 leading-[1.06]"
                        style={{
                            fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
                            fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                            fontWeight: 900,
                            letterSpacing: '-0.03em',
                        }}
                    >
                        Move better. Feel stronger.{' '}
                        <span style={{ color: '#cfff6a' }}>Live healthier.</span>
                    </h1>

                    <p className="text-[16px] leading-relaxed max-w-2xl mx-auto"
                        style={{ color: 'rgba(255,255,255,0.45)' }}>
                        SpotyFlex is a modern fitness platform built to help you move better,
                        feel stronger, and live healthier every single day — created with one
                        simple goal: make fitness clear, motivating, and accessible for
                        everyone, no matter your starting point.
                    </p>
                </div>
            </section>

            {/* ══════════════════════════════
          MISSION
      ══════════════════════════════ */}
            <section className="py-24 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Left — label + headline */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-6 h-[2px] rounded-full bg-[#cfff6a]" />
                                <span className="text-[9px] font-black uppercase tracking-[0.4em]"
                                    style={{ color: 'rgba(255,255,255,0.2)' }}>
                                    Our Mission
                                </span>
                            </div>
                            <h2
                                className="text-white leading-[1.1] mb-6"
                                style={{
                                    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                                    fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                                    fontWeight: 900,
                                    letterSpacing: '-0.025em',
                                }}
                            >
                                Make fitness clear, effective, and achievable for{' '}
                                <span style={{ color: '#cfff6a' }}>everyone.</span>
                            </h2>
                        </div>

                        {/* Right — text */}
                        <div className="space-y-5">
                            <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                                We exist to remove confusion, break myths, and give you reliable
                                guidance you can trust. We help you build real strength, real
                                discipline, and real confidence through structured training,
                                balanced nutrition, and sustainable habits — not quick fixes or
                                unrealistic promises.
                            </p>
                            <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                                Everything we publish is designed to be practical, easy to follow,
                                and based on proven fitness science — so you can make steady
                                progress and feel proud of your journey.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════
          PILLARS
      ══════════════════════════════ */}
            <section className="py-24 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center gap-3 mb-14">
                        <div className="w-6 h-[2px] rounded-full bg-[#cfff6a]" />
                        <span className="text-[9px] font-black uppercase tracking-[0.4em]"
                            style={{ color: 'rgba(255,255,255,0.2)' }}>
                            What We Offer
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {PILLARS.map(({ icon: Icon, title, desc, accent, bg, border }) => (
                            <div
                                key={title}
                                className="pillar-card p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-1"
                                style={{ background: '#111111', borderColor: 'rgba(255,255,255,0.05)', '--pillar-border': border }}
                            >
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                                    style={{ background: bg, border: `1px solid ${border}` }}
                                >
                                    <Icon className="w-5 h-5" style={{ color: accent }} />
                                </div>
                                <h3 className="text-white font-bold mb-3 text-[1.05rem]"
                                    style={{ letterSpacing: '-0.015em' }}>
                                    {title}
                                </h3>
                                <p className="text-[13.5px] leading-relaxed"
                                    style={{ color: 'rgba(255,255,255,0.38)' }}>
                                    {desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════
          BUILDER CARD
      ══════════════════════════════ */}
            <section className="py-24 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center gap-3 mb-14">
                        <div className="w-6 h-[2px] rounded-full bg-[#cfff6a]" />
                        <span className="text-[9px] font-black uppercase tracking-[0.4em]"
                            style={{ color: 'rgba(255,255,255,0.2)' }}>
                            Who's Behind It
                        </span>
                    </div>

                    <div
                        className="relative overflow-hidden rounded-3xl p-10 lg:p-14 border"
                        style={{
                            background: 'linear-gradient(135deg, #141414 0%, #0f0f0f 100%)',
                            borderColor: 'rgba(255,255,255,0.07)',
                        }}
                    >
                        {/* Top accent line */}
                        <div className="absolute top-0 left-0 right-0 h-px"
                            style={{ background: 'linear-gradient(90deg, transparent, rgba(207,255,106,0.25), transparent)' }} />

                        {/* Glow */}
                        <div className="pointer-events-none absolute top-0 right-0 w-72 h-72"
                            style={{ background: 'radial-gradient(circle at top right, rgba(207,255,106,0.04) 0%, transparent 65%)' }} />

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 items-start">
                            {/* Avatar */}
                            <div
                                className="w-20 h-20 rounded-3xl flex items-center justify-center overflow-hidden shrink-0"
                                style={{ background: 'rgba(207,255,106,0.08)', border: '1px solid rgba(207,255,106,0.18)' }}
                            >
                                <Image src={smallLogo} alt="SpotyFlex" className="w-full h-full object-cover opacity-80" />
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-white font-bold text-[1.15rem]" style={{ letterSpacing: '-0.018em' }}>
                                        The SpotyFlex Developer
                                    </h3>
                                    <span
                                        className="text-[8px] font-black uppercase tracking-[0.25em] px-2.5 py-1 rounded-full"
                                        style={{ color: '#cfff6a', background: 'rgba(207,255,106,0.08)', border: '1px solid rgba(207,255,106,0.18)' }}
                                    >
                                        Founder
                                    </span>
                                </div>

                                <p className="text-[13px] font-black uppercase tracking-[0.2em] mb-6"
                                    style={{ color: 'rgba(255,255,255,0.2)' }}>
                                    Full-Stack Developer · Fitness Enthusiast
                                </p>

                                <div className="space-y-4">
                                    <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                                        SpotyFlex is built and maintained by a passionate full-stack
                                        developer who deeply believes in the power of fitness,
                                        discipline, and self-improvement. This platform started as a
                                        personal project and grew into a space to share real research,
                                        experiences, and practical knowledge with others.
                                    </p>
                                    <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                                        Every piece of content is carefully researched, simplified, and
                                        shared with honesty — without fake promises or unrealistic
                                        shortcuts. SpotyFlex is built for people who want real,
                                        sustainable progress, created by someone walking the same path
                                        as you.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════
          CTA
      ══════════════════════════════ */}
            <section className="py-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                    <h2
                        className="text-white mb-6 leading-[1.1]"
                        style={{
                            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                            fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                            fontWeight: 900,
                            letterSpacing: '-0.025em',
                        }}
                    >
                        Ready to start your{' '}
                        <span style={{ color: '#cfff6a' }}>journey?</span>
                    </h2>
                    <p className="text-[15px] leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        Explore our workouts, nutrition guides, and articles — everything
                        you need to build a healthier, stronger version of yourself.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/category/beginner"
                            className="flex items-center gap-2.5 px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(207,255,106,0.25)]"
                            style={{ background: '#cfff6a', color: '#0a0a0a' }}
                        >
                            Start Here
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/contact"
                            className="flex items-center gap-2.5 px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:border-white/20 hover:text-white"
                            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}
                        >
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section>
            <style>{`
        .pillar-card:hover { border-color: var(--pillar-border) !important; }
      `}</style>
        </div>
    );
}