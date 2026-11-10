'use client';

import { useEffect, useRef } from 'react';

const TEXT = 'doxxangel studios';
const VISIBLE = 0.2; // deel van de staartjes onder de lijn (de g) dat zichtbaar is onderaan
const FONT = 'Jeffrson';

/* Footer voor Archive, Info en Contact (niet voor de landing).
   Over de hele breedte van het scherm staat doxxangel studios in Jeffrson;
   helemaal onderaan zie je alleen het bovenste deel (VISIBLE) van de letters.
   Gebruik: <SiteFooter /> BUITEN de pagina-wrapper met padding, zodat hij de volle breedte pakt. */
export default function SiteFooter() {
  const box = useRef(null);
  const word = useRef(null);
  useEffect(() => {
    const el = box.current;
    const span = word.current;
    if (!el || !span) return;
    const ctx = document.createElement('canvas').getContext('2d');
    let alive = true;

    const fit = () => {
      if (!alive || !ctx) return;
      ctx.font = `100px ${FONT}`;
      const m = ctx.measureText(TEXT);
      const ink = m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
      if (!ink) return;
      const k = el.clientWidth / ink; // schaal van 100px naar de echte maat
      const size = 100 * k;
      const fontAsc = m.fontBoundingBoxAscent ?? m.actualBoundingBoxAscent;
      const fontDesc = m.fontBoundingBoxDescent ?? m.actualBoundingBoxDescent;
      // met line-height 1 ligt de baseline op: halve leading + ascent
      const baseline = (size - (fontAsc + fontDesc) * k) / 2 + fontAsc * k;
      const capTop = baseline - m.actualBoundingBoxAscent * k;

      span.style.fontSize = `${size}px`;
      span.style.left = `${m.actualBoundingBoxLeft * k}px`;
      span.style.top = `${-capTop}px`;
      // alle letters helemaal zichtbaar, alleen de staart van de g valt deels weg
      el.style.height = `${(m.actualBoundingBoxAscent + m.actualBoundingBoxDescent * VISIBLE) * k}px`;
      span.style.opacity = '1';
    };

    const ro = new ResizeObserver(fit);
    ro.observe(el);
    document.fonts.load(`100px ${FONT}`).then(fit, fit);

    return () => {
      alive = false;
      ro.disconnect();
    };
  }, []);

  return (
    <footer className="mt-10 w-full select-none md:mt-16" aria-label="Doxxangel Studios">
      <div ref={box} className="relative h-[11vw] w-full overflow-hidden">
        <span
          ref={word}
          aria-hidden
          className="font-jeffrson pointer-events-none absolute left-0 top-0 whitespace-nowrap leading-none text-black opacity-0 transition-opacity duration-500"
        >
          {TEXT}
        </span>
      </div>
    </footer>
  );
}
