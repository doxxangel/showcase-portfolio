'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { useSite } from '@/context/SiteContext';

const LINKS = [
  { href: '/archive', label: 'ARCHIVE' },
  { href: '/info', label: 'INFO' },
  { href: '/contact', label: 'CONTACT' },
];

/* Eén header voor alle pagina's.
   <SiteHeader onToggleAudio={handleToggleAudio} />   (prop is optioneel)
   <SiteHeader minimal />                              alleen NL/ENG + geluidsknop (landing)
   <SiteHeader compact />                              geen losse links, altijd het hamburgermenu (project modals)
   onSamePage: wordt aangeroepen als je in het menu op de pagina klikt waar je al bent */
export default function SiteHeader({ onToggleAudio = undefined, minimal = false, compact = false, onSamePage = undefined }) {
  const { lang, setLang, audioActive, toggleAudio } = useSite();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleSound = onToggleAudio || toggleAudio;

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const SoundIcon = audioActive ? Volume2 : VolumeX;

  if (minimal) {
    return (
      <header className="relative z-[60] mb-2 w-full select-none md:mb-4">
        <div className="flex items-center justify-end gap-3 font-editorial-nav text-[12px] font-semibold uppercase tracking-[0.16em] md:text-xs">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setLang('nl')}
              className={`cursor-pointer px-1.5 py-2 transition-colors ${lang === 'nl' ? 'font-bold text-black' : 'font-normal text-neutral-400 hover:text-black'}`}
            >
              NL
            </button>
            <span className="h-3.5 w-[1.5px] bg-neutral-300" />
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`cursor-pointer px-1.5 py-2 transition-colors ${lang === 'en' ? 'font-bold text-black' : 'font-normal text-neutral-400 hover:text-black'}`}
            >
              ENG
            </button>
          </div>
          <button
            type="button"
            onClick={toggleSound}
            title="Toggle ambient audio"
            aria-label="Toggle ambient audio"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-neutral-700 bg-neutral-900/80 text-white shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-neutral-900 active:scale-90"
          >
            <SoundIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="relative z-[60] mb-10 w-full select-none md:mb-16">
        <div className="flex items-center justify-between font-editorial-nav font-medium uppercase">
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
            <span className="nav-pipe hidden md:inline-block" />
            <Link
              href="/"
              className="whitespace-nowrap text-[11px] font-semibold tracking-[0.16em] transition hover:opacity-70 sm:text-[13px] sm:tracking-[0.2em] md:text-sm"
            >
              DOXXANGEL STUDIOS
            </Link>
            <nav aria-label="Hoofdnavigatie" className={`hidden items-center gap-4 text-sm lg:gap-6 ${compact ? '' : 'md:flex'}`}>
              {LINKS.map((l) => (
                <span key={l.href} className="flex items-center gap-4 lg:gap-6">
                  <span className="nav-pipe" />
                  <Link
                    href={l.href}
                    aria-current={pathname === l.href ? 'page' : undefined}
                    className={`tracking-[0.2em] transition hover:opacity-60 ${
                      pathname === l.href ? 'font-semibold underline decoration-[1.5px] underline-offset-[10px]' : ''
                    }`}
                  >
                    {l.label}
                  </Link>
                </span>
              ))}
              <span className="nav-pipe" />
            </nav>
          </div>

          <div className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.16em] md:gap-4 md:text-xs">
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setLang('nl')}
                className={`cursor-pointer px-1.5 py-2 transition-colors ${lang === 'nl' ? 'font-bold text-black' : 'font-normal text-neutral-400 hover:text-black'}`}
              >
                NL
              </button>
              <span className="h-3.5 w-[1.5px] bg-neutral-300" />
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`cursor-pointer px-1.5 py-2 transition-colors ${lang === 'en' ? 'font-bold text-black' : 'font-normal text-neutral-400 hover:text-black'}`}
              >
                ENG
              </button>
            </div>

            <button
              type="button"
              onClick={toggleSound}
              title="Toggle ambient audio"
              aria-label="Toggle ambient audio"
              className="hidden h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-neutral-700 bg-neutral-900/80 text-white shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-neutral-900 active:scale-90 md:flex"
            >
              <SoundIcon className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Sluit menu' : 'Open menu'}
              aria-expanded={open}
              className={`flex h-9 w-9 cursor-pointer items-center justify-center ${compact ? '' : 'md:hidden'}`}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* mobiel menu: schermvullend, in dezelfde editorial stijl */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-50 flex flex-col bg-white px-5 pb-8 pt-28 transition-opacity duration-300 sm:px-8 md:px-14 lg:px-16 ${compact ? '' : 'md:hidden'} ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav className="flex flex-col border-t border-black/10">
          {LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              tabIndex={open ? 0 : -1}
              onClick={() => {
                if (l.href === pathname) {
                  setOpen(false);
                  if (onSamePage) onSamePage();
                }
              }}
              className="flex items-baseline justify-between border-b border-black/10 py-4"
            >
              <span
                className={`font-serif-luxury weight-ultra-thin text-5xl uppercase leading-none ${
                  pathname === l.href ? 'underline decoration-[2px] underline-offset-8' : ''
                }`}
              >
                {l.label}
              </span>
              <span className="font-editorial-nav text-[10px] tracking-[0.2em] text-neutral-400">0{i + 1}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex items-center justify-between font-editorial-nav text-xs font-semibold uppercase tracking-[0.16em]">
          <button type="button" onClick={toggleSound} tabIndex={open ? 0 : -1} className="flex items-center gap-2 py-2">
            <SoundIcon className="h-4 w-4" />
            {lang === 'nl' ? 'Geluid' : 'Sound'} {audioActive ? 'on' : 'off'}
          </button>
          <span className="text-neutral-400">&copy; DOXXANGEL</span>
        </div>
      </div>
    </>
  );
}