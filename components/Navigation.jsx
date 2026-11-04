'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';

export default function Navigation({ lang, setLang, audioActive, toggleAudio, currentRoute = 'archive' }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full mb-16 select-none pr-2">
      <div className="flex items-center justify-between font-editorial text-[13px] md:text-sm uppercase font-medium">
        
        {/* Left Side: Links */}
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
          <span className="nav-pipe hidden md:inline-block"></span>
          <Link href="/" className="tracking-[0.2em] font-semibold text-black hover:opacity-70 transition">
            DOXXANGEL STUDIOS
          </Link>
          
          <div className="hidden md:flex items-center gap-4 sm:gap-6">
            <span className="nav-pipe inline-block"></span>
            <Link 
              href="/archive" 
              className={`tracking-[0.2em] transition ${currentRoute === 'archive' ? 'font-semibold text-black' : 'text-neutral-500 hover:text-black'}`}
            >
              ARCHIVE
            </Link>
            
            <span className="nav-pipe inline-block"></span>
            <Link 
              href="/info" 
              className={`tracking-[0.2em] transition ${currentRoute === 'info' ? 'font-semibold text-black' : 'text-neutral-500 hover:text-black'}`}
            >
              INFO
            </Link>
            
            <span className="nav-pipe inline-block"></span>
            <Link 
              href="/contact" 
              className={`tracking-[0.2em] transition ${currentRoute === 'contact' ? 'font-semibold text-black' : 'text-neutral-500 hover:text-black'}`}
            >
              CONTACT
            </Link>
            <span className="nav-pipe inline-block"></span>
          </div>
        </div>

        {/* Right Side: Language & Controls */}
        <div className="flex items-center gap-3.5 tracking-[0.16em] text-[12px] md:text-xs font-semibold">
          <div className="flex items-center gap-2">
            <button 
              type="button"
              onClick={() => setLang('nl')} 
              className={lang === 'nl' ? 'text-black font-bold' : 'text-neutral-400 hover:text-black font-normal'}
            >
              NL
            </button>
            <span className="w-[1.5px] h-3.5 bg-neutral-300"></span>
            <button 
              type="button"
              onClick={() => setLang('en')} 
              className={lang === 'en' ? 'text-black font-bold' : 'text-neutral-400 hover:text-black font-normal'}
            >
              ENG
            </button>
          </div>

          <button 
            type="button"
            onClick={toggleAudio} 
            className="hidden md:flex w-7 h-7 rounded-full items-center justify-center bg-neutral-900/80 hover:bg-neutral-900 text-white transition active:scale-90"
            title="Toggle ambient audio"
          >
            {audioActive ? <Volume2 className="w-3.5 h-3.5 text-white" /> : <VolumeX className="w-3.5 h-3.5 text-neutral-300" />}
          </button>

          <button 
            type="button"
            onClick={() => setMenuOpen(!menuOpen)} 
            className="md:hidden flex items-center justify-center w-7 h-7"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X className="w-5 h-5 text-black" /> : <Menu className="w-5 h-5 text-black" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden pt-4 pb-2 border-t border-neutral-200 mt-4 flex flex-col font-editorial text-[12px] tracking-[0.2em] uppercase">
          <Link href="/" className="py-3 border-b border-neutral-100 text-black">DOXXANGEL STUDIOS</Link>
          <Link href="/archive" className="py-3 border-b border-neutral-100 text-black">ARCHIVE</Link>
          <Link href="/info" className="py-3 border-b border-neutral-100 text-black">INFO</Link>
          <Link href="/contact" className="py-3 text-black">CONTACT</Link>
        </nav>
      )}
    </header>
  );
}