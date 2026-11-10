"use client";

import { useEffect, useRef } from "react";

/* Cursor: een fleur-de-lis uit je moodboard die zacht achter je muis aan zweeft.
   Hij draait niet; alleen een klein beetje groter boven links, knoppen en de poort.
   Zet <FlourishCursor /> in layout.jsx om hem op de hele site te gebruiken. */

const HEIGHT = 40; // px, breedte volgt vanzelf (2:3)
const HOT_SCALE = 1.35;

export default function FlourishCursor() {
  const el = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const root = document.documentElement;
    root.classList.add("flourish-cursor");

    const m = { x: -200, y: -200, px: -200, py: -200, scale: 1, hot: false, seen: false };
    let raf = 0;

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

    const tick = () => {
      m.px += (m.x - m.px) * 0.4;
      m.py += (m.y - m.py) * 0.4;
      m.scale += ((m.hot ? HOT_SCALE : 1) - m.scale) * 0.2;
      if (el.current)
        el.current.style.transform = `translate3d(${m.px}px,${m.py}px,0) translate(-50%,-50%) scale(${m.scale})`;
      raf = requestAnimationFrame(tick);
    };

    document.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerenter", onEnter);
    raf = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerenter", onEnter);
      cancelAnimationFrame(raf);
      root.classList.remove("flourish-cursor");
    };
  }, []);

  return (
    <>
      <style>{`html.flourish-cursor, html.flourish-cursor * { cursor: none !important; }
html.flourish-cursor input, html.flourish-cursor textarea { cursor: text !important; }`}</style>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={el}
        src="/images/cursor-fleur.png"
        alt=""
        aria-hidden
        draggable={false}
        className="pointer-events-none fixed left-0 top-0 z-[300] hidden select-none opacity-0 transition-opacity duration-200 will-change-transform [filter:drop-shadow(0_0_1.5px_#fff)] lg:block"
        style={{ height: HEIGHT, width: "auto" }}
      />
    </>
  );
}