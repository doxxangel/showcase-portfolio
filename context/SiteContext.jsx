'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { getAudioContext, playNote, playChord } from '@/lib/audio';

const SiteContext = createContext();

export function SiteProvider({ children }) {
  const [lang, setLangState] = useState('nl');
  const [audioActive, setAudioActive] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('site_lang');
    if (saved === 'nl' || saved === 'en') {
      setLangState(saved);
      document.documentElement.lang = saved;
    }

    // Luister naar de eerste gebruikersinteractie om de context te initialiseren
    const unlock = () => {
      getAudioContext();
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
    window.addEventListener('pointerdown', unlock);
    window.addEventListener('keydown', unlock);

    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, []);

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem('site_lang', newLang);
    document.documentElement.lang = newLang;
    if (audioActive) playNote(587);
  };

  const toggleAudio = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }

    if (!audioActive) {
      setAudioActive(true);
      playChord(['C5', 'G5']);
    } else {
      setAudioActive(false);
    }
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