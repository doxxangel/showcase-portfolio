"use client";

import { useEffect, useRef } from "react";

/* Cursor: een fleur-de-lis uit je moodboard die zacht achter je muis aan zweeft.
   Hij draait niet; alleen een klein beetje groter boven links, knoppen en de poort.
   Staat in app/layout.jsx, dus hij werkt op elke pagina. */

// iets korter dan het origineel (392x587), zodat hij meer op een fleur-de-lis lijkt
const WIDTH = 28;
const HEIGHT = 33;
const HOT_SCALE = 1.35;
// de gewone muis blijft zichtbaar; de fleur-de-lis zweeft er rechtsonder achteraan
const OFFSET_X = 12;
const OFFSET_Y = 14;
const LERP = 0.1; // per 1/60 s, dus even traag op een 60 Hz- als op een 120 Hz-scherm

export default function FlourishCursor() {
  const el = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const root = document.documentElement;
    root.classList.add("flourish-cursor");

    const m = { x: -200, y: -200, px: -200, py: -200, scale: 1, hot: false, seen: false };
    let raf = 0;
    let last = performance.now();

    const onMove = (e: PointerEvent) => {
      m.x = e.clientX;
      m.y = e.clientY;
      if (!m.seen) {
        m.seen = true;
        m.px = m.x;
        m.py = m.y;
        if (el.current) el.current.style.opacity = "1";
      }
      m.hot = !!(e.target as HTMLElement).closest("a,button,[data-popover],[data-cell]");
    };
    const onLeave = () => el.current && (el.current.style.opacity = "0");
    const onEnter = () => m.seen && el.current && (el.current.style.opacity = "1");

    const tick = (now: number) => {
      // lerp: de fleur-de-lis zweeft zichtbaar achter de muis aan (lager = meer vertraging)
      // omgerekend naar de echte tijd tussen frames, anders is hij op een 120 Hz-scherm twee keer zo snel
      const frames = Math.min((now - last) / (1000 / 60), 4);
      last = now;
      const k = 1 - Math.pow(1 - LERP, frames);
      m.px += (m.x - m.px) * k;
      m.py += (m.y - m.py) * k;
      m.scale += ((m.hot ? HOT_SCALE : 1) - m.scale) * (1 - Math.pow(0.8, frames));
      if (el.current)
        el.current.style.transform = `translate3d(${m.px}px,${m.py}px,0) translate(${OFFSET_X}px,${OFFSET_Y}px) scale(${m.scale})`;
      raf = requestAnimationFrame(tick);
    };

    // bij een video op volledig scherm: gewone muis terug (onze cursor valt daar niet over heen)
    const onFullscreen = () => {
      const fs = !!(document.fullscreenElement || (document as any).webkitFullscreenElement);
      root.classList.toggle("flourish-cursor", !fs);
    };
    document.addEventListener("fullscreenchange", onFullscreen);
    document.addEventListener("webkitfullscreenchange", onFullscreen);
    document.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerenter", onEnter);
    raf = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreen);
      document.removeEventListener("webkitfullscreenchange", onFullscreen);
      document.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerenter", onEnter);
      cancelAnimationFrame(raf);
      root.classList.remove("flourish-cursor");
    };
  }, []);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={el}
        src="/images/cursor-fleur.png"
        alt=""
        aria-hidden
        draggable={false}
        className="pointer-events-none fixed left-0 top-0 z-[300] hidden select-none opacity-0 transition-opacity duration-200 will-change-transform [filter:drop-shadow(0_0_0.4px_#000)_drop-shadow(0_0_0.4px_#000)_drop-shadow(0_0_1.5px_#fff)] lg:block"
        style={{ width: WIDTH, height: HEIGHT, objectFit: "fill" }}
      />
    </>
  );
}