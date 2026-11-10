"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Menu, X } from "lucide-react";
import { useSite } from "@/context/SiteContext";
import FlourishCursor from "./FlourishCursor";

const NAV = [
  { href: "/archive", label: "Archive" },
  { href: "/info", label: "Info" },
  { href: "/contact", label: "Contact" },
];

type GateState = "closed" | "peek" | "open";

export default function GateLanding() {
  const { lang, setLang, audioActive, toggleAudio, playHover } = useSite();
  const [gate, setGate] = useState<GateState>("closed");
  const [desktop, setDesktop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const root = useRef<HTMLElement>(null);
  const popover = useRef<HTMLDivElement>(null);

  // Audio standaard direct aanzetten bij laden + resume bij eerste interactie
  useEffect(() => {
    if (!audioActive && toggleAudio) {
      toggleAudio();
    }

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
  }, [audioActive, toggleAudio, playHover]);

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

  /* open: de poort blijft op dezelfde plek staan en zwaait open */
  const angle = gate === "open" ? (desktop ? 68 : 78) : gate === "peek" ? 7 : 0;

  const swing =
    "aspect-[813/1338] h-full shrink-0 origin-[var(--o)] transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none [backface-visibility:hidden]";

  return (
    <div className="bg-white text-black min-h-screen pt-8 md:pt-10 px-8 md:px-14 lg:px-16 selection:bg-black selection:text-white flex flex-col justify-between">
      
      {/* 1. HEADER: Identiek aan de archive-pagina met logo, navigatie, NL/ENG en geluidsknop */}
      <div className="w-full max-w-[1600px] mr-auto">
        <header className="w-full mb-4 select-none pr-2">
          <div className="flex items-center justify-between font-editorial-nav text-[13px] md:text-sm uppercase font-medium">
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
              <span className="nav-pipe hidden md:inline-block"></span>
              <Link href="/" className="tracking-[0.2em] font-semibold text-black hover:opacity-70 transition">
                DOXXANGEL STUDIOS
              </Link>
              <div className="hidden md:flex items-center gap-4 sm:gap-6">
                <span className="nav-pipe inline-block"></span>
                <Link href="/archive" className="tracking-[0.2em] text-black hover:opacity-60 transition">ARCHIVE</Link>
                <span className="nav-pipe inline-block"></span>
                <Link href="/info" className="tracking-[0.2em] text-black hover:opacity-60 transition">INFO</Link>
                <span className="nav-pipe inline-block"></span>
                <Link href="/contact" className="tracking-[0.2em] text-black hover:opacity-60 transition">CONTACT</Link>
                <span className="nav-pipe inline-block"></span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 tracking-[0.16em] text-[12px] md:text-xs font-semibold">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setLang("nl");
                    if (playHover) playHover(523.25);
                  }}
                  className={`transition-colors cursor-pointer ${
                    lang === "nl" ? "text-black font-bold" : "text-neutral-400 hover:text-black font-normal"
                  }`}
                >
                  NL
                </button>
                <span className="w-[1.5px] h-3.5 bg-neutral-300"></span>
                <button
                  type="button"
                  onClick={() => {
                    setLang("en");
                    if (playHover) playHover(587.33);
                  }}
                  className={`transition-colors cursor-pointer ${
                    lang === "en" ? "text-black font-bold" : "text-neutral-400 hover:text-black font-normal"
                  }`}
                >
                  ENG
                </button>
              </div>

              <button
                type="button"
                onClick={toggleAudio}
                className="hidden md:flex w-7 h-7 rounded-full items-center justify-center bg-neutral-900/80 hover:bg-neutral-900 text-white backdrop-blur-md border border-neutral-700 shadow-sm transition-all duration-200 cursor-pointer active:scale-90"
                title={audioActive ? "Mute ambient audio" : "Enable ambient audio"}
              >
                {audioActive ? <Volume2 className="w-3.5 h-3.5 text-white" /> : <VolumeX className="w-3.5 h-3.5 text-neutral-300" />}
              </button>

              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex flex-col justify-center items-center w-7 h-7 gap-[4px] focus:outline-none cursor-pointer ml-1"
              >
                {menuOpen ? <X className="w-5 h-5 text-black" /> : <Menu className="w-5 h-5 text-black" />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <nav className="md:hidden pt-4 pb-2 font-editorial-nav text-[12px] tracking-[0.2em] uppercase font-medium mt-2 border-t border-neutral-200 flex flex-col">
              <Link href="/archive" className="py-3.5 border-b border-neutral-200 text-black">ARCHIVE</Link>
              <Link href="/info" className="py-3.5 border-b border-neutral-200 text-black">INFO</Link>
              <Link href="/contact" className="py-3.5 text-black">CONTACT</Link>
            </nav>
          )}
        </header>
      </div>

      {/* 2. GATE WORKSPACE */}
      <main
        ref={root}
        onClick={onMainClick}
        className="relative grid flex-1 min-h-[520px] w-full place-items-center overflow-hidden !bg-white !text-black"
      >
        {/* TITEL + NAVIGATIE LINKS IN DE POORT */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
          <div
            data-center
            className={`flex max-w-[min(calc((100dvh-10rem)*0.84*0.9),60vw)] flex-col items-center gap-4 sm:gap-6 ${
              gate === "open" ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <h1
              className={`font-serif-luxury weight-thin relative z-30 text-[clamp(2.2rem,min(7.5vw,10vh),6.2rem)] uppercase tracking-tight leading-[0.95] !text-black transition-opacity duration-1000 ${
                gate === "open" ? "opacity-100 delay-500" : "opacity-0"
              }`}
            >
              Doxxangel
              <br />
              Studios
            </h1>

            <nav
              aria-label="Hoofdnavigatie"
              className={`relative z-30 flex items-center gap-3 !text-black transition-opacity duration-1000 sm:gap-5 [&_.nav-pipe]:!bg-black ${
                gate === "open" ? "opacity-100 delay-700" : "opacity-0"
              }`}
            >
              <span className="nav-pipe h-3 w-[1px] opacity-40" />
              {NAV.map((n) => (
                <span key={n.href} className="flex items-center gap-3 sm:gap-5">
                  <Link
                    href={n.href}
                    tabIndex={gate === "open" ? 0 : -1}
                    className="font-editorial-nav text-[11px] font-medium uppercase tracking-widest underline-offset-6 hover:underline focus-visible:underline sm:text-xs !text-black"
                  >
                    {n.label}
                  </Link>
                  <span className="nav-pipe h-3 w-[1px] opacity-40" />
                </span>
              ))}
            </nav>
          </div>
        </div>

        {/* HET HEKWERK */}
        <div
          className={`relative z-20 flex h-[min(calc((100dvh-10rem)*0.84),72vw)] items-stretch justify-center gap-[1.4vh] [perspective:1800px] ${
            gate === "open" ? "pointer-events-none" : ""
          }`}
          aria-hidden={gate === "open"}
        >
          <div
            className={swing}
            style={{ ["--o" as string]: "left", transform: `rotateY(${-angle}deg)` }}
          >
            <img
              src="/images/gate-left.png"
              alt=""
              width={813}
              height={1338}
              decoding="sync"
              draggable={false}
              className="block h-full w-full select-none"
            />
          </div>
          <div
            className={swing}
            style={{ ["--o" as string]: "right", transform: `rotateY(${angle}deg)` }}
          >
            <img
              src="/images/gate-right.png"
              alt=""
              width={813}
              height={1338}
              decoding="sync"
              draggable={false}
              className="block h-full w-full select-none"
            />
          </div>

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
          <div className="font-sans-clean text-[13px] font-semibold leading-tight text-black">
            Enter Doxxangel Studios
          </div>
          <div className="font-sans-clean mt-1 text-xs leading-snug text-neutral-500">
            Click to open the gates
          </div>
        </div>
      </main>

      <FlourishCursor />
    </div>
  );
}