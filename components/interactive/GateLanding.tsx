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

const LAYERS = 6; // aantal lagen per deur
const DEPTH = 1.6; // px tussen de lagen

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

  /* muis-kanteling (-1..1), alleen met een echte muis */
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() =>
        setTilt({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 })
      );
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const angle = gate === "open" ? (desktop ? 84 : 84) : gate === "peek" ? 7 : 0;

  const swing =
    "aspect-[813/1338] h-full shrink-0 origin-[var(--o)] transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none relative [transform-style:preserve-3d]";

  return (
    <div className="flex min-h-dvh flex-col bg-white px-5 pt-8 text-black selection:bg-black selection:text-white sm:px-8 md:px-14 md:pt-10 lg:px-16">
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
              className={`font-serif-luxury weight-thin relative z-30 text-[clamp(2.2rem,min(6.2vw,8.5vh),5.2rem)] uppercase leading-[0.95] tracking-tight !text-black transition-opacity duration-1000 ${
                gate === "open" ? "opacity-100 delay-500" : "opacity-0"
              }`}
            >
              Doxxangel
              <br />
              Studios
            </h1>

            {/* klein en zonder streepjes: meer contrast met de grote titel */}
            <nav
              aria-label="Hoofdnavigatie"
              className={`relative z-30 flex items-center gap-7 !text-black transition-opacity duration-1000 sm:gap-10 ${
                gate === "open" ? "opacity-100 delay-700" : "opacity-0"
              }`}
            >
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  tabIndex={gate === "open" ? 0 : -1}
                  className="type-label -mx-4 -my-4 px-4 py-4 underline-offset-[6px] hover:underline focus-visible:underline !text-black" /* grote klikzone, zelfde plek */
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* de poort */}
        <div
          className={`relative flex h-[min(calc((100dvh-8rem)*0.88),72vw)] items-stretch justify-center [perspective:1400px] ${
            gate === "open" ? "pointer-events-none z-0" : "z-20" /* open: titel ligt vóór de deuren */
          }`}
          aria-hidden={gate === "open"}
        >
          {/* echte 3D: elke deur is een stapel lagen (dikte van het smeedijzer),
              en de hele poort kantelt een beetje mee met de muis */}
          <div
            className="flex h-full items-stretch justify-center gap-[1.4vh] transition-transform duration-[900ms] ease-out [transform-style:preserve-3d] motion-reduce:transition-none"
            style={{ transform: `rotateX(${tilt.y * -5}deg) rotateY(${tilt.x * 9}deg)` }}
          >
            {(["left", "right"] as const).map((side) => (
              <div
                key={side}
                className={swing}
                style={{ ["--o" as string]: side, transform: `rotateY(${side === "left" ? angle : -angle}deg)` }}
              >
                {Array.from({ length: LAYERS }, (_, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={`/images/gate-${side}.png`}
                    alt=""
                    width={813}
                    height={1338}
                    decoding="sync"
                    draggable={false}
                    className="absolute inset-0 block h-full w-full select-none"
                    style={{
                      transform: `translateZ(${(i - (LAYERS - 1) / 2) * DEPTH}px)`,
                      // achterste lagen iets lichter grijs, zodat je de dikte ziet
                      opacity: i === LAYERS - 1 ? 1 : 0.55 + (0.35 * i) / (LAYERS - 1),
                    }}
                  />
                ))}
              </div>
            ))}
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
          <div className="type-label text-black">Enter Doxxangel Studios</div>
          <div className="type-small mt-1 text-neutral-500">Click to open the gates</div>
        </div>
      </main>

      {/* wat ik doe: altijd zichtbaar, ook als de poort nog dicht is (zelfde stijl als de links) */}
      <p className="type-label pb-6 pt-2 text-center !text-neutral-500 md:pb-8">
        Front-end developer &amp; UI/UX designer
      </p>

    </div>
  );
}