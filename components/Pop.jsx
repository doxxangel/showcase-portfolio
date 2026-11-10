/* Klikbaar/hoverbaar woord met macOS-wolkje. Vervangt de herhaalde <span className="mac-trigger">-blokken. */
export default function Pop({ id, pitch, title, desc, openId, toggle, play, plain = false, children }) {
  return (
    <span
      className={`mac-trigger relative inline-block cursor-pointer underline underline-offset-4 decoration-[1.5px] ${openId === id ? 'popover-open' : ''}`}
      onMouseEnter={() => play(pitch)}
      onClick={(e) => toggle(e, id, pitch)}
    >
      {children}
      <span className="mac-popover">
        <strong className={`block text-xs font-bold text-neutral-900 mb-1 font-sans-clean ${plain ? '' : 'uppercase tracking-wider'}`}>{title}</strong>
        <span className="block text-xs text-neutral-600 leading-relaxed font-sans-clean">{desc}</span>
      </span>
    </span>
  );
}