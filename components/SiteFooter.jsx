'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
import { useSite } from '@/context/SiteContext';

const LINKS = [
  { href: '/archive', label: 'ARCHIVE' },
  { href: '/info', label: 'INFO' },
  { href: '/contact', label: 'CONTACT' },
];

/* Footer voor Archive, Info en Contact (niet voor de landing).
   Gebruik: <SiteFooter /> onderaan de pagina. */
export default function SiteFooter() {
  const { lang } = useSite();
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('nl-NL', {
          timeZone: 'Europe/Amsterdam',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const t =
    lang === 'nl'
      ? { top: 'NAAR BOVEN', made: 'Gemaakt in Breda', mail: 'Schrijf me' }
      : { top: 'BACK TO TOP', made: 'Made in Breda', mail: 'Write to me' };

  return (
    <footer className="mt-20 w-full select-none md:mt-32">
      {/* dikke lijn, zoals de rasterranden op Archive */}
      <div className="border-t-[3px] border-black" />

      {/* rij 1: navigatie met dezelfde strepen als de header */}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-6 font-editorial-nav text-[12px] font-medium uppercase md:text-sm">
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-3 sm:gap-5">
          <span className="nav-pipe" />
          {LINKS.map((l) => (
            <span key={l.href} className="flex items-center gap-3 sm:gap-5">
              <Link href={l.href} className="tracking-[0.2em] transition hover:opacity-60">
                {l.label}
              </Link>
              <span className="nav-pipe" />
            </span>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex cursor-pointer items-center gap-2 tracking-[0.2em] transition hover:opacity-60"
        >
          {t.top}
          <ArrowUp className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-1" />
        </button>
      </div>

      {/* rij 2: groot woordmerk met de fleur-de-lis */}
      <div className="relative overflow-hidden border-t border-neutral-200 py-8 md:py-12">
        <div className="font-serif-luxury weight-ultra-thin text-[clamp(2.75rem,11vw,9.5rem)] uppercase leading-[0.9] text-black">
          <div>Doxxangel</div>
          <div>Studios</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/cursor-fleur.png"
          alt=""
          aria-hidden
          draggable={false}
          className="pointer-events-none absolute right-2 top-1/2 hidden h-[78%] w-auto -translate-y-1/2 opacity-90 sm:block"
        />
      </div>

      {/* rij 3: kleine regel */}
      <div className="flex flex-col gap-3 border-t-[3px] border-black py-5 font-sans-clean text-xs text-neutral-700 sm:flex-row sm:items-center sm:justify-between md:text-sm">
        <a
          href="mailto:Info@doxxangelstudios.nl"
          className="font-mono underline underline-offset-4 transition hover:opacity-60"
        >
          {t.mail}: Info@doxxangelstudios.nl
        </a>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <span className="font-mono tabular-nums">Amsterdam {time || '--:--:--'}</span>
          <span>{t.made}</span>
          <span>&copy; 2009&mdash;2026 DOXXANGEL STUDIOS</span>
        </div>
      </div>
      <div className="pb-8" />
    </footer>
  );
}