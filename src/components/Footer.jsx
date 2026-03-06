import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Logo from '@/assets/Logo/Spotyflex.png';

const PROGRAMS = [
  { name: 'Home Workouts', href: '/category/home-workouts' },
  { name: 'Gym Plans', href: '/category/gym-workouts' },
  { name: 'Fat Burning', href: '/category/fat-burning' },
  { name: 'Beginner Guides', href: '/category/beginner' },
  { name: 'Meal Plans', href: '/category/meal-plans' },
  { name: 'Supplements', href: '/category/supplements' },
];

const COMPANY = [
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
];

const SOCIAL = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
];

export default function Footer() {
  return (
    <footer className="border-t" style={{ background: '#080808', borderColor: 'rgba(255,255,255,0.05)', minHeight: '480px', contentVisibility: 'auto' }}>

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr_1fr] gap-16">

          {/* Brand column */}
          <div>
            <Link href="/" className="inline-block mb-8">
              <Image
                src={Logo}
                alt="SpotyFlex"
                width={140}
                height={40}
                className="object-contain"
                style={{ filter: 'brightness(1.05)' }}
              />
            </Link>

            <p className="text-[13.5px] leading-[1.85] mb-6 max-w-sm"
              style={{ color: 'rgba(255,255,255,0.38)' }}>
              SpotyFlex is an independent fitness blog created by a developer
              passionate about training and health. We share research-based
              workouts, nutrition insights, and practical tips to help you build
              healthier habits, all for educational and motivational purposes.
            </p>

            {/* Email */}
            <a
              href="mailto:support@spotyflex.com"
              className="inline-flex items-center gap-2.5 text-[12px] font-bold mb-8 transition-all duration-200 footer-email"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: '#cfff6a' }} />
              support@spotyflex.com
            </a>

            {/* Social */}
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ name, icon: Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className="footer-social w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.3)' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] mb-7"
              style={{ color: 'rgba(255,255,255,0.2)' }}>
              Programs
            </p>
            <ul className="space-y-3.5">
              {PROGRAMS.map(({ name, href }) => (
                <li key={name}>
                  <Link href={href}
                    className="footer-link group flex items-center gap-2 text-[13px] font-medium transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.38)' }}>
                    <span className="footer-dash w-3 h-px rounded-full transition-all duration-300"
                      style={{ background: '#cfff6a', opacity: 0.45 }} />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] mb-7"
              style={{ color: 'rgba(255,255,255,0.2)' }}>
              Company
            </p>
            <ul className="space-y-3.5">
              {COMPANY.map(({ name, href }) => (
                <li key={name}>
                  <Link href={href}
                    className="footer-link group flex items-center gap-2 text-[13px] font-medium transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.38)' }}>
                    <span className="footer-dash w-3 h-px rounded-full transition-all duration-300"
                      style={{ background: '#cfff6a', opacity: 0.45 }} />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter mini CTA — fixed to use /#newsletter */}
            <div className="mt-10 p-5 rounded-2xl border"
              style={{ background: 'rgba(207,255,106,0.04)', borderColor: 'rgba(207,255,106,0.12)' }}>
              <p className="text-[11px] font-bold mb-3 leading-snug"
                style={{ color: 'rgba(255,255,255,0.45)' }}>
                Get fresh content delivered to your inbox
              </p>
              <Link
                href="/#newsletter"
                className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-200"
                style={{ color: '#cfff6a' }}
              >
                Subscribe free
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: 'rgba(255,255,255,0.15)' }}>
              © {new Date().getFullYear()} SpotyFlex. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-white/40" style={{ color: 'rgba(255,255,255,0.1)' }}>
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-white/40" style={{ color: 'rgba(255,255,255,0.1)' }}>
                Terms of Service
              </Link>
            </div>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ color: 'rgba(255,255,255,0.1)' }}>
            For educational & motivational purposes only
          </p>
        </div>
      </div>

      <style>{`
        .footer-link:hover { color: rgba(255,255,255,0.85) !important; }
        .footer-link:hover .footer-dash { width: 20px !important; opacity: 0.8 !important; }
        .footer-email:hover { color: #cfff6a !important; }
        .footer-social:hover {
          background: rgba(207,255,106,0.08) !important;
          border-color: rgba(207,255,106,0.18) !important;
        }
        .footer-social:hover svg { color: #cfff6a !important; }
      `}</style>
    </footer>
  );
}