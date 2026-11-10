/* Houdt een macOS-wolkje binnen het scherm. Het wolkje blijft bij het woord openen;
   alleen als het anders uit beeld zou vallen, schuift het zijwaarts op (of klapt onder het woord). */
export function clampPopover(trigger) {
  if (!trigger) return;
  const pop = trigger.querySelector(':scope > .mac-popover');
  if (!pop) return;

  const margin = 12;
  const vw = document.documentElement.clientWidth;
  const w = pop.offsetWidth;
  const r = trigger.getBoundingClientRect();

  // horizontaal: binnen [margin, vw - margin]
  const wanted = r.left + r.width / 2 - w / 2;
  const clamped = Math.min(Math.max(wanted, margin), Math.max(margin, vw - margin - w));
  const shift = clamped - wanted;
  pop.style.left = `calc(50% + ${shift}px)`;
  pop.style.setProperty('--shift', `${shift}px`);

  // verticaal: past hij niet boven het woord, klap hem dan eronder
  const h = pop.offsetHeight;
  const noRoomAbove = r.top - h - 24 < 0;
  const roomBelow = window.innerHeight - r.bottom > h + 24;
  if (noRoomAbove && roomBelow) pop.setAttribute('data-flip', '');
  else pop.removeAttribute('data-flip');
}