"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

/* Fragmenten uit je eigen Info-tekst, gezet als gespreid gedicht (zoals je moodboard).
   Elke regel heeft een inspringing in ch. */
type Fragment = {
  lines: [string, number][];
  style: React.CSSProperties;
  align?: "right";
};

const FRAGMENTS: Fragment[] = [
  {
    style: { left: "4%", top: "14%" },
    lines: [["philosophy,", 0], ["spirituality,", 4], ["technology", 1], ["and society", 7]],
  },
  {
    style: { right: "4%", top: "20%" },
    align: "right",
    lines: [["fragments", 0], ["of thought", 5]],
  },
  {
    style: { left: "5%", top: "50%" },
    lines: [["existing", 0], ["as a human", 6], ["in our", 2], ["current times", 8]],
  },
  {
    style: { right: "5%", top: "56%" },
    align: "right",
    lines: [["visual", 6], ["research", 0], ["ongoing", 4]],
  },
  {
    style: { left: "4%", bottom: "9%" },
    lines: [["personal taste is", 0], ["an ongoing synthesis", 5], ["of what we hear,", 1], ["read, and observe", 9]],
  },
  {
    style: { right: "4%", bottom: "8%" },
    align: "right",
    lines: [["capture", 7], ["what remains", 0]],
  },
];

const NAV = [
  { href: "/archive", label: "Archive" },
  { href: "/info", label: "Info" },
  { href: "/contact", label: "Contact" },
];

type GateState = "closed" | "peek" | "open";

export default function GateLanding() {
  const [gate, setGate] = useState<GateState>("closed");
  const root = useRef<HTMLElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const fragRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouse = useRef({ x: -100, y: -100, rx: -100, ry: -100, scale: 1 });

  const open = useCallback(() => setGate("open"), []);

  /* eigen muis + tekstwolk die oplicht bij de cursor */
  useEffect(() => {
    const el = root.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const m = mouse.current;
      m.x = e.clientX;
      m.y = e.clientY;
      if (dot.current)
        dot.current.style.transform = `translate3d(${m.x}px,${m.y}px,0) translate(-50%,-50%)`;

      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      m.scale = target ? 3.4 : 1;
      if (label.current) label.current.textContent = target?.dataset.cursor ?? "";

      fragRefs.current.forEach((f) => {
        if (!f) return;
        const r = f.getBoundingClientRect();
        const d = Math.hypot(m.x - (r.left + r.width / 2), m.y - (r.top + r.height / 2));
        const k = Math.max(0, 1 - d / 340);
        f.style.opacity = String(0.12 + k * 0.88);
      });
    };

    const tick = () => {
      const m = mouse.current;
      m.rx += (m.x - m.rx) * 0.16;
      m.ry += (m.y - m.ry) * 0.16;
      if (ring.current)
        ring.current.style.transform = `translate3d(${m.rx}px,${m.ry}px,0) translate(-50%,-50%) scale(${m.scale})`;
      raf = requestAnimationFrame(tick);
    };

    el.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      el.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const angle = gate === "open" ? 78 : gate === "peek" ? 7 : 0;
  const swing =
    "h-full origin-[var(--o)] transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none [backface-visibility:hidden]";

  return (
    <main
      ref={root}
      className="relative grid h-[calc(100dvh-6rem)] min-h-[520px] w-full place-items-center overflow-hidden bg-white lg:cursor-none"
    >
      {/* tekstwolk (alleen desktop) */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
        {FRAGMENTS.map((f, i) => (
          <div
            key={i}
            ref={(n) => {
              fragRefs.current[i] = n;
            }}
            className={`font-sans-clean absolute text-sm leading-[2] tracking-[0.04em] opacity-[0.12] ${
              f.align === "right" ? "text-right" : ""
            }`}
            style={f.style}
          >
            {f.lines.map(([text, indent]) => (
              <div
                key={text}
                style={f.align === "right" ? { paddingRight: `${indent}ch` } : { paddingLeft: `${indent}ch` }}
              >
                {text}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* inhoud achter de poort */}
      <div
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-8 px-4 text-center transition-opacity duration-1000 ${
          gate === "open" ? "opacity-100 delay-500" : "pointer-events-none opacity-0"
        }`}
      >
        <h1 className="font-serif-luxury weight-thin text-[clamp(2.25rem,min(8vw,11vh),7rem)] uppercase leading-[0.95]">
          Doxxangel
          <br />
          Studios
        </h1>
        <nav aria-label="Hoofdnavigatie" className="flex items-center gap-4 sm:gap-7">
          <span className="nav-pipe" />
          {NAV.map((n) => (
            <span key={n.href} className="flex items-center gap-4 sm:gap-7">
              <Link
                href={n.href}
                data-cursor="Ga"
                tabIndex={gate === "open" ? 0 : -1}
                className="font-editorial-nav text-xs font-medium uppercase underline-offset-8 hover:underline focus-visible:underline sm:text-sm"
              >
                {n.label}
              </Link>
              <span className="nav-pipe" />
            </span>
          ))}
        </nav>
      </div>

      {/* de poort: jouw Pinterest-ontwerp, in twee helften */}
      <div
        className={`relative z-20 flex h-[min(84%,72vw)] items-stretch justify-center gap-[1.4vh] [perspective:1800px] transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          gate === "open" ? "pointer-events-none scale-[1.06]" : ""
        }`}
        aria-hidden={gate === "open"}
      >
        {/* eslint-disable @next/next/no-img-element */}
        <div className={swing} style={{ ["--o" as string]: "left", transform: `rotateY(${-angle}deg)` }}>
<img src="/images/gate-left.png" alt="" draggable={false} className="h-full w-auto select-none" />        </div>
        <div className={swing} style={{ ["--o" as string]: "right", transform: `rotateY(${angle}deg)` }}>
<img src="/images/gate-right.png" alt="" draggable={false} className="h-full w-auto select-none" />        </div>
        {/* eslint-enable @next/next/no-img-element */}

        <button
          type="button"
          data-cursor="Open"
          aria-label="Open de poort"
          onClick={open}
          onMouseEnter={() => setGate((g) => (g === "closed" ? "peek" : g))}
          onMouseLeave={() => setGate((g) => (g === "peek" ? "closed" : g))}
          onFocus={() => setGate((g) => (g === "closed" ? "peek" : g))}
          onBlur={() => setGate((g) => (g === "peek" ? "closed" : g))}
          className="absolute inset-0 z-10 outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-8"
        >
          <span
            className={`circle-badge-7 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${
              gate === "open" ? "opacity-0" : "opacity-100"
            }`}
          >
            ENTER
          </span>
        </button>
      </div>

      {/* muis (alleen desktop) */}
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden h-2 w-2 rounded-full bg-black mix-blend-difference lg:block"
      />
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[190] hidden h-9 w-9 items-center justify-center rounded-full border border-black bg-white/60 backdrop-blur-sm lg:flex"
      >
        <span ref={label} className="font-editorial-nav text-[0.2rem] font-semibold uppercase" />
      </div>
    </main>
  );
}