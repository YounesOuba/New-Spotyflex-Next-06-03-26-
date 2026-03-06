'use client';

import { useState, useEffect, useCallback } from 'react';
import { Menu, X, ChevronDown, Home, Dumbbell, Apple, Info, Phone, Zap, Search as SearchIcon, BookOpen, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import WideLogo from '../assets/Logo/Spotyflex.png';
import SmallLogo from '../assets/Logo/Spoty.png';
import { useIsMobile } from '@/hooks/use-mobile';
import { CATEGORIES } from '@/lib/constants';
import Search from '@/components/Search';
import { useBookmarks } from '@/hooks/use-bookmarks';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

/* ─── Mobile collapsible section ─── */
const MobileDropdown = ({ title, children, icon: Icon, isActive }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`flex w-full items-center justify-between px-4 py-3.5 rounded-2xl text-[14px] font-semibold transition-all duration-200 focus:outline-none
          ${open || isActive ? 'text-white' : 'text-white/70'}`}
      >
        <span className="flex items-center gap-3">
          {Icon && <Icon className="h-4 w-4 opacity-50" />}
          {title}
        </span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 opacity-30 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="ml-2 mb-1 flex flex-col gap-0.5">
          {children}
        </div>
      )}
    </div>
  );
};

/* ─── Nav Link Component ─── */
const NavLink = ({ href, children, isActive }) => (
  <Link
    href={href}
    className={`group relative text-sm font-medium transition-colors duration-200 py-1 
      ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`}
  >
    {children}
    <span className={`absolute bottom-0 left-0 h-[1.5px] bg-[#cfff6a] transition-all duration-300 rounded-full 
      ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
  </Link>
);

/* ─── Main Header ─── */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const { count } = useBookmarks();

  useEffect(() => {
    setMounted(true);
  }, []);

  const onScroll = useCallback(() => {
    const isScrolled = window.scrollY > 8;
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled);
    }
  }, [scrolled]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Handle menu close on larger screens
  useEffect(() => {
    if (!isMobile && isMenuOpen) setIsMenuOpen(false);
  }, [isMobile, isMenuOpen]);

  // Helpers to check active state
  const isWorkoutsActive = CATEGORIES.workouts.some(cat => pathname === `/category/${cat.label}`);
  const isNutritionActive = CATEGORIES.nutrition.some(cat => pathname === `/category/${cat.label}`);
  const isGuidesActive = CATEGORIES.guides.some(cat => pathname === `/category/${cat.label}`);

  return (
    <header
      className={`sticky top-0 z-[100] transition-all duration-300 w-full
        ${scrolled
          ? 'bg-[#121212]/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-b border-white/10'
          : 'bg-[#181818] border-b border-white/5'
        }`}
    >
      {/* Top accent bar - Optimized GPU Shimmer */}
      <div className="absolute top-0 left-0 w-full h-[2px] overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-[#cfff6a] to-transparent animate-shimmer" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* ── Logo ── */}
          <Link href="/" className="shrink-0 flex items-center group relative z-10" aria-label="Spotyflex home">
            <div className="flex items-center transition-transform duration-300 group-hover:scale-105 h-12 w-auto min-w-[120px]">
              <Image
                src={isMobile ? SmallLogo : WideLogo}
                alt="Spotyflex Logo"
                width={isMobile ? 120 : 160}
                height={48}
                className="object-contain h-12 w-auto"
                priority
              />
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-5" aria-label="Main navigation">
            <NavLink href="/" isActive={pathname === '/'}>Home</NavLink>

            {mounted ? (
              <>
                {/* Workouts */}
                <DropdownMenu
                  open={openDropdown === 'workouts'}
                  onOpenChange={(o) => setOpenDropdown(o ? 'workouts' : null)}
                >
                  <DropdownMenuTrigger className="group relative text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 focus:outline-none">
                    <span className={openDropdown === 'workouts' || isWorkoutsActive ? 'text-white' : 'text-white/70 group-hover:text-white'}>
                      Workouts
                    </span>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${openDropdown === 'workouts' ? 'rotate-180' : ''} ${openDropdown === 'workouts' || isWorkoutsActive ? 'text-[#cfff6a]' : 'text-white/40'}`} />
                    <span className={`absolute bottom-0 left-0 h-[1.5px] bg-[#cfff6a] transition-all duration-300 rounded-full ${openDropdown === 'workouts' || isWorkoutsActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mt-2 min-w-[220px] rounded-2xl border border-white/10 bg-[#121212]/95 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] p-2 animate-in fade-in slide-in-from-top-3 duration-300 z-[1001]">
                    {CATEGORIES.workouts.map((cat) => (
                      <DropdownMenuItem key={cat.href} asChild>
                        <Link
                          href={`/category/${cat.label}`}
                          className={`flex items-center rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer
                            ${pathname === `/category/${cat.label}` ? 'bg-[#cfff6a] text-black' : 'text-white/80 hover:!text-black hover:!bg-[#cfff6a] focus:!bg-[#cfff6a] focus:!text-black'}`}
                        >
                          {cat.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Nutrition */}
                <DropdownMenu
                  open={openDropdown === 'nutrition'}
                  onOpenChange={(o) => setOpenDropdown(o ? 'nutrition' : null)}
                >
                  <DropdownMenuTrigger className="group relative text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 focus:outline-none">
                    <span className={openDropdown === 'nutrition' || isNutritionActive ? 'text-white' : 'text-white/70 group-hover:text-white'}>
                      Nutrition
                    </span>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${openDropdown === 'nutrition' ? 'rotate-180' : ''} ${openDropdown === 'nutrition' || isNutritionActive ? 'text-[#cfff6a]' : 'text-white/40'}`} />
                    <span className={`absolute bottom-0 left-0 h-[1.5px] bg-[#cfff6a] transition-all duration-300 rounded-full ${openDropdown === 'nutrition' || isNutritionActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mt-2 min-w-[220px] rounded-2xl border border-white/10 bg-[#121212]/95 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] p-2 animate-in fade-in slide-in-from-top-3 duration-300 z-[1001]">
                    {CATEGORIES.nutrition.map((cat) => (
                      <DropdownMenuItem key={cat.href} asChild>
                        <Link
                          href={`/category/${cat.label}`}
                          className={`flex items-center rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer
                            ${pathname === `/category/${cat.label}` ? 'bg-[#cfff6a] text-black' : 'text-white/80 hover:!text-black hover:!bg-[#cfff6a] focus:!bg-[#cfff6a] focus:!text-black'}`}
                        >
                          {cat.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Guides */}
                <DropdownMenu
                  open={openDropdown === 'guides'}
                  onOpenChange={(o) => setOpenDropdown(o ? 'guides' : null)}
                >
                  <DropdownMenuTrigger className="group relative text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 focus:outline-none">
                    <span className={openDropdown === 'guides' || isGuidesActive ? 'text-white' : 'text-white/70 group-hover:text-white'}>
                      Guides
                    </span>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${openDropdown === 'guides' ? 'rotate-180' : ''} ${openDropdown === 'guides' || isGuidesActive ? 'text-[#cfff6a]' : 'text-white/40'}`} />
                    <span className={`absolute bottom-0 left-0 h-[1.5px] bg-[#cfff6a] transition-all duration-300 rounded-full ${openDropdown === 'guides' || isGuidesActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mt-2 min-w-[220px] rounded-2xl border border-white/10 bg-[#121212]/95 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] p-2 animate-in fade-in slide-in-from-top-3 duration-300 z-[1001]">
                    {CATEGORIES.guides.map((cat) => (
                      <DropdownMenuItem key={cat.label} asChild>
                        <Link
                          href={`/category/${cat.label}`}
                          className={`flex items-center rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer
                            ${pathname === `/category/${cat.label}` ? 'bg-[#cfff6a] text-black' : 'text-white/80 hover:!text-black hover:!bg-[#cfff6a] focus:!bg-[#cfff6a] focus:!text-black'}`}
                        >
                          {cat.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              // Basic placeholders to avoid layout shift during hydration
              <>
                <button className="text-sm font-medium text-white/70 flex items-center gap-1.5">Workouts <ChevronDown className="h-3.5 w-3.5 text-white/40" /></button>
                <button className="text-sm font-medium text-white/70 flex items-center gap-1.5">Nutrition <ChevronDown className="h-3.5 w-3.5 text-white/40" /></button>
                <button className="text-sm font-medium text-white/70 flex items-center gap-1.5">Guides <ChevronDown className="h-3.5 w-3.5 text-white/40" /></button>
              </>
            )}

            <NavLink href="/articles" isActive={pathname === '/articles'}>Articles</NavLink>
            <NavLink href="/about" isActive={pathname === '/about'}>About</NavLink>
            <NavLink href="/contact" isActive={pathname === '/contact'}>Contact</NavLink>
          </nav>

          {/* ── Right side ── */}
          <div className="flex items-center gap-4">
            {mounted ? <Search /> : <div className="w-8 h-8 rounded-full bg-white/5" />}

            {/* Saved Articles */}
            <Link
              href="/saved"
              className="relative flex items-center justify-center w-9 h-9 rounded-full text-white/70 hover:text-[#cfff6a] hover:bg-white/5 transition-all duration-200"
              aria-label="Saved articles"
            >
              <Heart className="h-5 w-5" />
              {mounted && count > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#cfff6a] text-[10px] font-black text-black">
                  {count}
                </span>
              )}
            </Link>

            {/* CTA — desktop only */}
            <Link
              href="/articles"
              className="hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-black tracking-wider text-black bg-[#cfff6a] hover:bg-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-[#cfff6a]/20 shrink-0"
            >
              <Zap className="h-4 w-4" />
              START READING
            </Link>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0a0a0a]/98 backdrop-blur-2xl border-t border-white/[0.06] shadow-2xl overflow-hidden">
          <nav className="px-4 py-5 flex flex-col gap-1" aria-label="Mobile navigation">

            {/* Home */}
            <Link href="/"
              className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-[14px] font-semibold transition-all
                ${pathname === '/' ? 'bg-[#cfff6a]/8 text-[#cfff6a]' : 'text-white/70'}`}>
              <div className="flex items-center gap-3">
                <Home className="h-4 w-4 opacity-50" />
                Home
              </div>
              {pathname === '/' && <div className="w-1.5 h-1.5 rounded-full bg-[#cfff6a]" />}
            </Link>

            {/* Workouts dropdown */}
            <MobileDropdown title="Workouts" icon={Dumbbell} isActive={isWorkoutsActive}>
              {CATEGORIES.workouts.map((cat) => (
                <Link key={cat.href} href={`/category/${cat.label}`}
                  className={`flex items-center gap-2 px-4 py-2.5 text-[13px] rounded-xl transition-all
                    ${pathname === `/category/${cat.label}` ? 'text-[#60a5fa]' : 'text-white/45 hover:text-white/80'}`}>
                  <div className="w-1 h-1 rounded-full bg-[#60a5fa] opacity-60" />
                  {cat.name}
                </Link>
              ))}
            </MobileDropdown>

            {/* Nutrition dropdown */}
            <MobileDropdown title="Nutrition" icon={Apple} isActive={isNutritionActive}>
              {CATEGORIES.nutrition.map((cat) => (
                <Link key={cat.href} href={`/category/${cat.label}`}
                  className={`flex items-center gap-2 px-4 py-2.5 text-[13px] rounded-xl transition-all
                    ${pathname === `/category/${cat.label}` ? 'text-[#fb923c]' : 'text-white/45 hover:text-white/80'}`}>
                  <div className="w-1 h-1 rounded-full bg-[#fb923c] opacity-60" />
                  {cat.name}
                </Link>
              ))}
            </MobileDropdown>

            {/* Guides dropdown */}
            <MobileDropdown title="Guides" icon={BookOpen} isActive={isGuidesActive}>
              {CATEGORIES.guides.map((cat) => (
                <Link key={cat.label} href={`/category/${cat.label}`}
                  className={`flex items-center gap-2 px-4 py-2.5 text-[13px] rounded-xl transition-all
                    ${pathname === `/category/${cat.label}` ? 'text-[#c084fc]' : 'text-white/45 hover:text-white/80'}`}>
                  <div className="w-1 h-1 rounded-full bg-[#c084fc] opacity-60" />
                  {cat.name}
                </Link>
              ))}
            </MobileDropdown>

            <Link href="/articles"
              className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-[14px] font-semibold transition-all
                ${pathname === '/articles' ? 'bg-[#cfff6a]/8 text-[#cfff6a]' : 'text-white/70'}`}>
              <div className="flex items-center gap-3">
                <Zap className="h-4 w-4 opacity-50" />
                Articles
              </div>
              {pathname === '/articles' && <div className="w-1.5 h-1.5 rounded-full bg-[#cfff6a]" />}
            </Link>

            <Link href="/about"
              className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-[14px] font-semibold transition-all
                ${pathname === '/about' ? 'bg-[#cfff6a]/8 text-[#cfff6a]' : 'text-white/70'}`}>
              <div className="flex items-center gap-3">
                <Info className="h-4 w-4 opacity-50" />
                About
              </div>
              {pathname === '/about' && <div className="w-1.5 h-1.5 rounded-full bg-[#cfff6a]" />}
            </Link>

            <Link href="/contact"
              className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-[14px] font-semibold transition-all
                ${pathname === '/contact' ? 'bg-[#cfff6a]/8 text-[#cfff6a]' : 'text-white/70'}`}>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 opacity-50" />
                Contact
              </div>
              {pathname === '/contact' && <div className="w-1.5 h-1.5 rounded-full bg-[#cfff6a]" />}
            </Link>
          </nav>

          {/* Bottom CTA */}
          <div className="px-4 pb-8 pt-2 border-t border-white/[0.05]">
            <Link
              href="/articles"
              className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-[#0a0a0a] bg-[#cfff6a] transition-all active:scale-95"
            >
              <Zap className="h-4 w-4" />
              Start Reading
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;