"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSite } from "@/context/SiteContext";
import SiteHeader from "../SiteHeader";

const NAV = [
  { href: "/archive", label: "Archive" },
  { href: "/info", label: "Info" },
  { href: "/contact", label: "Contact" },
];

type GateState = "closed" | "peek" | "open";

export default function GateLanding() {
  const { playHover } = useSite();
  const [gate, setGate] = useState<GateState>("closed");
  const [desktop, setDesktop] = useState(false);
  const root = useRef<HTMLElement>(null);
  const popover = useRef<HTMLDivElement>(null);

  // Audio-voorkeur wordt in SiteContext onthouden; hier alleen ontgrendelen bij de eerste interactie
  useEffect(() => {

    const unlockAudio = () => {
      if (playHover) playHover(330);
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const open = useCallback(() => {
    setGate("open");
    popover.current?.classList.remove("active");
    if (playHover) playHover(440);
  }, [playHover]);

  /* klik buiten het midden (titel + links), of Esc: poort weer dicht */
  const onMainClick = (e: React.MouseEvent) => {
    if (gate !== "open") return;
    if ((e.target as HTMLElement).closest("[data-center]")) return;
    setGate("closed");
  };

  /* scrollen: naar beneden = poort open, naar boven = poort dicht (muiswiel, trackpad, swipe en pijltjes) */
  const gateRef = useRef<GateState>(gate);
  gateRef.current = gate;
  useEffect(() => {
    let acc = 0; // opgetelde scroll, zodat een klein tikje op de trackpad niet meteen telt
    let resetT = 0;
    const go = (dir: 1 | -1) => {
      if (dir > 0 && gateRef.current !== "open") open();
      if (dir < 0 && gateRef.current === "open") setGate("closed");
    };
    const push = (dy: number) => {
      acc += dy;
      window.clearTimeout(resetT);
      resetT = window.setTimeout(() => (acc = 0), 200);
      if (Math.abs(acc) > 40) {
        go(acc > 0 ? 1 : -1);
        acc = 0;
      }
    };
    const onWheel = (e: WheelEvent) => push(e.deltaY);
    let touchY: number | null = null;
    const onTouchStart = (e: TouchEvent) => (touchY = e.touches[0]?.clientY ?? null);
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY;
      if (touchY === null || y === undefined) return;
      push((touchY - y) * 1.5); // vinger omhoog = naar beneden scrollen
      touchY = y;
    };
    const onKeyScroll = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) go(1);
      if (["ArrowUp", "PageUp"].includes(e.key)) go(-1);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyScroll);
    return () => {
      window.clearTimeout(resetT);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyScroll);
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setGate("closed");
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* macOS-wolkje dat de muis volgt zodra je over de poort hovert */
  useEffect(() => {
    const el = root.current;
    const pop = popover.current;
    if (!el || !pop || !window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: PointerEvent) => {
      const onGate = (e.target as HTMLElement).closest("[data-popover]");
      pop.classList.toggle("active", Boolean(onGate));
      const x = Math.min(e.clientX + 22, window.innerWidth - 290);
      pop.style.transform = `translate3d(${x}px,${e.clientY + 26}px,0) scale(1)`;
    };
    const onLeave = () => pop.classList.remove("active");

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const angle = gate === "open" ? (desktop ? 68 : 78) : gate === "peek" ? 7 : 0;

  const swing =
    "aspect-[813/1338] h-full shrink-0 origin-[var(--o)] transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none [backface-visibility:hidden]";

  return (
    <div className="flex min-h-dvh flex-col bg-white px-5 pt-6 text-black selection:bg-black selection:text-white sm:px-8 md:px-14 md:pt-8 lg:px-16">
      {/* alleen taal + geluid */}
      <div className="mr-auto w-full max-w-[1600px]">
        <SiteHeader minimal />
      </div>

      <main
        ref={root}
        onClick={onMainClick}
        className="relative grid min-h-[520px] w-full flex-1 place-items-center overflow-hidden !bg-white !text-black"
      >
        {/* titel + links achter de poort */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
          <div
            data-center
            className={`flex max-w-[min(calc((100dvh-10rem)*0.84*0.9),60vw)] flex-col items-center gap-5 sm:gap-7 ${
              gate === "open" ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <h1
              className={`font-serif-luxury weight-thin relative z-30 text-[clamp(2.2rem,min(7.5vw,10vh),6.2rem)] uppercase leading-[0.95] tracking-tight !text-black transition-opacity duration-1000 ${
                gate === "open" ? "opacity-100 delay-500" : "opacity-0"
              }`}
            >
              Doxxangel
              <br />
              Studios
            </h1>

            {/* zelfde dikke streepjes als de header */}
            <nav
              aria-label="Hoofdnavigatie"
              className={`relative z-30 flex items-center gap-3 !text-black transition-opacity duration-1000 sm:gap-5 ${
                gate === "open" ? "opacity-100 delay-700" : "opacity-0"
              }`}
            >
              <span className="nav-pipe" />
              {NAV.map((n) => (
                <span key={n.href} className="flex items-center gap-3 sm:gap-5">
                  <Link
                    href={n.href}
                    tabIndex={gate === "open" ? 0 : -1}
                    className="font-editorial-nav text-[11px] font-medium uppercase tracking-[0.2em] underline-offset-8 hover:underline focus-visible:underline sm:text-sm !text-black"
                  >
                    {n.label}
                  </Link>
                  <span className="nav-pipe" />
                </span>
              ))}
            </nav>
          </div>
        </div>

        {/* de poort */}
        <div
          className={`relative z-20 flex h-[min(calc((100dvh-8rem)*0.88),72vw)] items-stretch justify-center gap-[1.4vh] [perspective:1800px] ${
            gate === "open" ? "pointer-events-none" : ""
          }`}
          aria-hidden={gate === "open"}
        >
          {/* eslint-disable @next/next/no-img-element */}
          <div className={swing} style={{ ["--o" as string]: "left", transform: `rotateY(${-angle}deg)` }}>
            <img src="/images/gate-left.png" alt="" width={813} height={1338} decoding="sync" draggable={false} className="block h-full w-full select-none" />
          </div>
          <div className={swing} style={{ ["--o" as string]: "right", transform: `rotateY(${angle}deg)` }}>
            <img src="/images/gate-right.png" alt="" width={813} height={1338} decoding="sync" draggable={false} className="block h-full w-full select-none" />
          </div>
          {/* eslint-enable @next/next/no-img-element */}

          <button
            type="button"
            data-popover
            aria-label="Enter Doxxangel Studios"
            onClick={open}
            onMouseEnter={() => {
              setGate((g) => (g === "closed" ? "peek" : g));
              if (playHover) playHover(392);
            }}
            onMouseLeave={() => setGate((g) => (g === "peek" ? "closed" : g))}
            onFocus={() => setGate((g) => (g === "closed" ? "peek" : g))}
            onBlur={() => setGate((g) => (g === "peek" ? "closed" : g))}
            className="absolute inset-0 z-10 outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-8"
          />
        </div>

        {/* macOS-wolkje */}
        <div id="cursorPopover" ref={popover} aria-hidden>
          <div className="font-sans-clean text-[13px] font-semibold leading-tight text-black">Enter Doxxangel Studios</div>
          <div className="font-sans-clean mt-1 text-xs leading-snug text-neutral-500">Click to open the gates</div>
        </div>
      </main>

    </div>
  );
}