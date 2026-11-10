'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { getAudioContext, playNote, playChord } from '@/lib/audio';

const SiteContext = createContext();
const AUDIO_KEY = 'site_audio_v2';

export function SiteProvider({ children }) {
  const [lang, setLangState] = useState('nl');
  const [audioActive, setAudioActive] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('site_lang');
    if (saved === 'nl' || saved === 'en') {
      setLangState(saved);
      document.documentElement.lang = saved;
    }

    // geluid staat standaard aan, behalve als je het zelf hebt uitgezet
    // (nieuwe sleutel: een oude 'uit' van het testen telt niet meer mee)
    let pref = null;
    try { pref = localStorage.getItem(AUDIO_KEY); } catch {}
    if (pref !== 'off') setAudioActive(true);

    // De browser laat pas geluid toe na een klik/toets. Blijf het proberen bij elke
    // interactie tot de AudioContext echt draait (Safari telt niet elk event mee).
    const events = ['pointerdown', 'pointerup', 'click', 'touchend', 'keydown'];
    const unlock = () => {
      const ctx = getAudioContext();
      if (ctx && ctx.state === 'running') events.forEach((ev) => window.removeEventListener(ev, unlock, true));
    };
    events.forEach((ev) => window.addEventListener(ev, unlock, true));
    return () => events.forEach((ev) => window.removeEventListener(ev, unlock, true));
  }, []);

  const setLang = (newLang) => {
    setLangState(newLang);
    try { localStorage.setItem('site_lang', newLang); } catch {}
    document.documentElement.lang = newLang;
    if (audioActive) playNote(587);
  };

  const toggleAudio = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }

    const next = !audioActive;
    setAudioActive(next);
    // onthoud de keuze, zodat de landing hem niet zomaar weer aanzet
    try { localStorage.setItem(AUDIO_KEY, next ? 'on' : 'off'); } catch {}
    if (next) playChord(['C5', 'G5']);
  };

  const playHover = (pitch) => {
    if (audioActive) {
      playNote(pitch);
    }
  };

  return (
    <SiteContext.Provider value={{ lang, setLang, audioActive, toggleAudio, playHover }}>
      {children}
    </SiteContext.Provider>
  );
}

export const useSite = () => useContext(SiteContext);