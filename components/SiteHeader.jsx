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
   Overal: geen losse links, altijd het hamburgermenu.
   <SiteHeader compact />                              met lichte lijn en zonder ruimte eronder (project modals)
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
        {/* zelfde hoogte (h-9) en tussenruimte als de gewone navbar, zodat NL/ENG en geluid op exact dezelfde plek staan */}
        <div className="type-label flex h-9 items-center justify-end gap-2 md:gap-4 max-sm:text-[10px] max-sm:tracking-[0.14em]">
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
      <header
        className={`relative z-[60] w-full select-none ${
          compact ? 'mb-0 border-b border-neutral-200 pb-3 md:pb-4' /* alleen in een project: lichte lijn */ : 'mb-10 md:mb-16'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* hamburgermenu links van de naam; -ml-2 zodat het icoon gelijk staat met de paginarand */}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Sluit menu' : 'Open menu'}
              aria-expanded={open}
              className="-ml-2 flex h-9 w-9 cursor-pointer items-center justify-center"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link
              href="/"
              className="type-heading whitespace-nowrap transition hover:opacity-70 max-sm:text-[11px] max-sm:tracking-[0.14em]"
            >
              DOXXANGEL STUDIOS
            </Link>
          </div>

          <div className="type-label flex items-center gap-2 md:gap-4 max-sm:text-[10px] max-sm:tracking-[0.14em]">
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
        </div>
      </header>

      {/* mobiel menu: schermvullend, in dezelfde editorial stijl */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-50 flex flex-col bg-white px-5 pb-8 pt-28 transition-opacity duration-300 sm:px-8 md:px-14 lg:px-16 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav className="flex flex-col">
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
                className={`type-display ${
                  pathname === l.href ? 'underline decoration-[2px] underline-offset-8' : ''
                }`}
              >
                {l.label}
              </span>
              <span className="type-label text-neutral-400">0{i + 1}</span>
            </Link>
          ))}
        </nav>

        <div className="type-label mt-auto flex items-center justify-between">
          {/* knoppen erven geen hoofdletters, dus 'uppercase' er expliciet bij (zelfde stijl als © DOXXANGEL) */}
          <button type="button" onClick={toggleSound} tabIndex={open ? 0 : -1} className="flex cursor-pointer items-center gap-2 py-2 uppercase transition hover:opacity-60">
            <SoundIcon className="h-4 w-4" />
            {lang === 'nl' ? (audioActive ? 'Geluid aan' : 'Geluid uit') : (audioActive ? 'Sound on' : 'Sound off')}
          </button>
          <span className="text-neutral-400">&copy; DOXXANGEL</span>
        </div>
      </div>
    </>
  );
}