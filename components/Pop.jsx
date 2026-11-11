/* Klikbaar/hoverbaar woord met macOS-wolkje. Vervangt de herhaalde <span className="mac-trigger">-blokken. */
import { clampPopover } from '@/lib/clampPopover';

export default function Pop({ id, pitch, title, desc, openId, toggle, play, children }) {
  return (
    <span
      className={`mac-trigger relative inline-block cursor-pointer underline underline-offset-4 decoration-[1.5px] ${openId === id ? 'popover-open' : ''}`}
      onMouseEnter={(e) => { clampPopover(e.currentTarget); play(pitch); }}
      onClick={(e) => toggle(e, id, pitch)}
    >
      {children}
      <span className="mac-popover">
        <strong className="type-label block text-neutral-900 mb-1">{title}</strong>
        <span className="type-small block text-neutral-600">{desc}</span>
      </span>
    </span>
  );
}