/* Pagina vastzetten (menu, grote foto). Werkt samen met Lenis (smooth scroll):
   alleen overflow: hidden is niet genoeg, want Lenis scrollt anders gewoon door. */
let locks = 0;

export function lockScroll() {
  if (typeof window === 'undefined') return;
  locks += 1;
  if (locks > 1) return;
  window.__lenis?.stop();
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
}

export function unlockScroll() {
  if (typeof window === 'undefined' || locks === 0) return;
  locks -= 1;
  if (locks > 0) return;
  window.__lenis?.start();
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
}
