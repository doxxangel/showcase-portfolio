"use client";

import { useEffect, useRef } from "react";

/* Sierlijke cursor: een bloem-ornament uit je moodboard dat soepel meebeweegt
   en meedraait met de snelheid van je muis. Zet <FlourishCursor /> in
   layout.jsx om hem op de hele site te gebruiken. */

const HEAD_SIZE = 34; // px

export default function FlourishCursor() {
  const head = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    root.classList.add("flourish-cursor");

    const m = { x: -200, y: -200, hx: -200, hy: -200, rot: 0, scale: 1, hot: false, seen: false };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      m.x = e.clientX;
      m.y = e.clientY;
      if (!m.seen) {
        m.seen = true;
        m.hx = m.x;
        m.hy = m.y;
        if (head.current) head.current.style.opacity = "1";
      }
      m.hot = !!(e.target as HTMLElement).closest("a,button,[data-popover]");
    };
    const onLeave = () => head.current && (head.current.style.opacity = "0");
    const onEnter = () => m.seen && head.current && (head.current.style.opacity = "1");

    const tick = () => {
      const px = m.hx;
      const py = m.hy;
      m.hx += (m.x - m.hx) * 0.35;
      m.hy += (m.y - m.hy) * 0.35;
      const speed = Math.hypot(m.hx - px, m.hy - py);
      if (!reduce) m.rot += 0.35 + Math.min(speed, 30) * 0.5;
      m.scale += ((m.hot ? 1.6 : 1) - m.scale) * 0.18;
      if (head.current)
        head.current.style.transform = `translate3d(${m.hx}px,${m.hy}px,0) translate(-50%,-50%) rotate(${m.rot}deg) scale(${m.scale})`;
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
        ref={head}
        src="/images/cursor-flourish.png"
        alt=""
        aria-hidden
        draggable={false}
        className="pointer-events-none fixed left-0 top-0 z-[300] hidden select-none opacity-0 transition-opacity duration-200 will-change-transform lg:block"
        style={{ width: HEAD_SIZE, height: "auto" }}
      />
    </>
  );
}