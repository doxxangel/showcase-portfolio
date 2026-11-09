"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const NAV = [
  { href: "/archive", label: "Archive" },
  { href: "/info", label: "Info" },
  { href: "/contact", label: "Contact" },
];

type GateState = "closed" | "peek" | "open";

export default function GateLanding() {
  const [gate, setGate] = useState<GateState>("closed");
  const root = useRef<HTMLElement>(null);
  const popover = useRef<HTMLDivElement>(null);

  const open = useCallback(() => {
    setGate("open");
    popover.current?.classList.remove("active");
  }, []);

  /* macOS-wolkje dat de muis volgt zodra je over de poort hovert */
  useEffect(() => {
    const el = root.current;
    const pop = popover.current;
    if (!el || !pop || !window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: PointerEvent) => {
      const onGate = (e.target as HTMLElement).closest("[data-popover]");
      pop.classList.toggle("active", Boolean(onGate));
      const x = Math.min(e.clientX + 18, window.innerWidth - 290);
      pop.style.transform = `translate3d(${x}px,${e.clientY + 22}px,0) scale(1)`;
    };
    const onLeave = () => pop.classList.remove("active");

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const angle = gate === "open" ? 78 : gate === "peek" ? 7 : 0;
  const swing =
    "h-full origin-[var(--o)] transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none [backface-visibility:hidden]";

  return (
    <main
      ref={root}
      className="relative grid h-[calc(100dvh-6rem)] min-h-[520px] w-full place-items-center overflow-hidden bg-white"
    >
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

      {/* de poort */}
      <div
        className={`relative z-20 flex h-[min(84%,72vw)] items-stretch justify-center gap-[1.4vh] [perspective:1800px] transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          gate === "open" ? "pointer-events-none scale-[1.06]" : ""
        }`}
        aria-hidden={gate === "open"}
      >
        {/* eslint-disable @next/next/no-img-element */}
        <div className={swing} style={{ ["--o" as string]: "left", transform: `rotateY(${-angle}deg)` }}>
          <img src="/images/gate-left.png" alt="" draggable={false} className="h-full w-auto select-none" />
        </div>
        <div className={swing} style={{ ["--o" as string]: "right", transform: `rotateY(${angle}deg)` }}>
          <img src="/images/gate-right.png" alt="" draggable={false} className="h-full w-auto select-none" />
        </div>
        {/* eslint-enable @next/next/no-img-element */}

        <button
          type="button"
          data-popover
          aria-label="Enter Doxxangel Studios"
          onClick={open}
          onMouseEnter={() => setGate((g) => (g === "closed" ? "peek" : g))}
          onMouseLeave={() => setGate((g) => (g === "peek" ? "closed" : g))}
          onFocus={() => setGate((g) => (g === "closed" ? "peek" : g))}
          onBlur={() => setGate((g) => (g === "peek" ? "closed" : g))}
          className="absolute inset-0 z-10 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-8"
        />
      </div>

      {/* macOS-wolkje: gebruikt #cursorPopover uit je globals.css */}
      <div id="cursorPopover" ref={popover} aria-hidden>
        <div className="font-sans-clean text-[13px] font-semibold leading-tight text-black">
          Enter Doxxangel Studios
        </div>
        <div className="font-sans-clean mt-1 text-xs leading-snug text-neutral-500">
          Click to open the gates
        </div>
      </div>
    </main>
  );
}