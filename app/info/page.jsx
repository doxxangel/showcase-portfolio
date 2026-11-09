'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Volume2, VolumeX, Check, Menu, X } from 'lucide-react';
import { useSite } from '@/context/SiteContext';

const translations = {
  nl: {
    pageTitle: "(Info)",
    navArchive: "ARCHIVE",
    navInfo: "INFO",
    navContact: "CONTACT",
    mainTitle: "INFO",
    lblApps: "APPS DIE IK GEBRUIK",
    lblContact: "Contact",
    contactPrompt: "Spreekt iets je aan of wil je van gedachten wisselen? Laat het horen:",
    popDirectTitle: "Directe Post",
    popDirectDesc: "Opent je mailclient om direct een bericht te sturen.",
    popBlender: "Open-source 3D software voor modelleren, animatie en visualisaties.",
    popUnity: "Real-time engine voor interactieve 3D ervaringen.",
    popFigma: "Interface design en interactieve prototypes voor digitale producten.",
    popVscode: "Lichtgewicht editor voor software-architectuur en code.",
    toastAudioOn: "Ambient geluid ingeschakeld",
    toastAudioOff: "Audio uitgeschakeld"
  },
  en: {
    pageTitle: "(Info)",
    navArchive: "ARCHIVE",
    navInfo: "INFO",
    navContact: "CONTACT",
    mainTitle: "INFO",
    lblApps: "APPS I USE",
    lblContact: "Contact",
    contactPrompt: "Like something I've said? Think I'm a heretic? Let me hear it:",
    popDirectTitle: "Direct Dispatch",
    popDirectDesc: "Opens your preferred email client to write directly.",
    popBlender: "Open-source 3D creation suite for modeling, animation, and visualization.",
    popUnity: "Real-time engine for interactive 3D virtual experiences.",
    popFigma: "Interface design and collaborative prototyping tool.",
    popVscode: "Lightweight source-code editor for software architecture.",
    toastAudioOn: "Ambient audio enabled",
    toastAudioOff: "Audio muted"
  }
};

export default function InfoPage() {
  const { lang, setLang, audioActive, toggleAudio, playHover } = useSite();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openPopoverId, setOpenPopoverId] = useState(null);
  const [toast, setToast] = useState({ show: false, text: '' });

  const dict = translations[lang];

  const showToastMsg = (msg) => {
    setToast({ show: true, text: msg });
    setTimeout(() => setToast({ show: false, text: '' }), 2600);
  };

  const handleToggleAudio = () => {
    toggleAudio();
    showToastMsg(!audioActive ? dict.toastAudioOn : dict.toastAudioOff);
  };

  const togglePopover = (e, id, pitch) => {
    e.stopPropagation();
    setOpenPopoverId(openPopoverId === id ? null : id);
    if (pitch) playHover(pitch);
  };

  return (
    <div className="bg-white text-black min-h-screen pt-8 md:pt-10 px-8 md:px-14 lg:px-16 selection:bg-black selection:text-white" onClick={() => setOpenPopoverId(null)}>
      {/* Toast */}
      <div className={`fixed bottom-6 right-6 z-50 bg-black text-white text-xs px-4 py-2.5 rounded-lg shadow-xl transition-all duration-300 pointer-events-none flex items-center gap-2 ${toast.show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <Check className="w-3.5 h-3.5 text-emerald-400" />
        <span>{toast.text}</span>
      </div>

      <div className="w-full max-w-[1600px] mr-auto">
        {/* Header */}
        <header className="w-full mb-16 select-none pr-2">
          <div className="flex items-center justify-between font-editorial-nav text-[13px] md:text-sm uppercase font-medium">
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
              <span className="nav-pipe hidden md:inline-block"></span>
              <Link href="/archive" className="tracking-[0.2em] font-semibold text-black hover:opacity-70 transition">
                DOXXANGEL STUDIOS
              </Link>
              <div className="hidden md:flex items-center gap-4 sm:gap-6">
                <span className="nav-pipe inline-block"></span>
                <Link href="/archive" className="tracking-[0.2em] text-black hover:opacity-60 transition">ARCHIVE</Link>
                <span className="nav-pipe inline-block"></span>
                <Link href="/info" className="tracking-[0.2em] text-black font-semibold hover:opacity-60 transition">INFO</Link>
                <span className="nav-pipe inline-block"></span>
                <Link href="/contact" className="tracking-[0.2em] text-black hover:opacity-60 transition">CONTACT</Link>
                <span className="nav-pipe inline-block"></span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 tracking-[0.16em] text-[12px] md:text-xs font-semibold">
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setLang('nl')} className={`cursor-pointer ${lang === 'nl' ? 'text-black font-bold' : 'text-neutral-400 hover:text-black font-normal'}`}>NL</button>
                <span className="w-[1.5px] h-3.5 bg-neutral-300"></span>
                <button type="button" onClick={() => setLang('en')} className={`cursor-pointer ${lang === 'en' ? 'text-black font-bold' : 'text-neutral-400 hover:text-black font-normal'}`}>ENG</button>
              </div>

              <button type="button" onClick={handleToggleAudio} className="hidden md:flex w-7 h-7 rounded-full items-center justify-center bg-neutral-900/80 hover:bg-neutral-900 text-white backdrop-blur-md border border-neutral-700 shadow-sm transition-all duration-200 cursor-pointer active:scale-90" title="Toggle ambient audio">
                {audioActive ? <Volume2 className="w-3.5 h-3.5 text-white" /> : <VolumeX className="w-3.5 h-3.5 text-neutral-300" />}
              </button>

              <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col justify-center items-center w-7 h-7 gap-[4px] focus:outline-none cursor-pointer ml-1">
                {menuOpen ? <X className="w-5 h-5 text-black" /> : <Menu className="w-5 h-5 text-black" />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <nav className="md:hidden pt-6 pb-2 font-editorial-nav text-[12px] tracking-[0.2em] uppercase font-medium border-t border-neutral-200 mt-5 flex flex-col">
              <Link href="/archive" className="py-3.5 border-b border-neutral-200 text-black">DOXXANGEL STUDIOS</Link>
              <Link href="/archive" className="py-3.5 border-b border-neutral-200 text-black">ARCHIVE</Link>
              <Link href="/info" className="py-3.5 border-b border-neutral-200 text-black font-semibold">INFO</Link>
              <Link href="/contact" className="py-3.5 text-black">CONTACT</Link>
            </nav>
          )}
        </header>

        {/* Main Content */}
        <div className="w-full max-w-[1240px] mr-auto lg:pr-10">
          <div className="mb-14">
            <h1 className="inline-block text-7xl md:text-8xl font-serif-luxury weight-ultra-thin tracking-tight leading-none border-b-[4px] border-black pb-1">
              INFO
            </h1>
          </div>

          <main className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_390px] xl:grid-cols-[minmax(0,1fr)_420px] gap-12 lg:gap-16 items-start">
            <div className="text-xl md:text-2xl leading-[1.66] space-y-9">
              {lang === 'nl' ? (
                <>
                  <p>
                    Voormalig{' '}
                    <span className={`mac-trigger relative inline-block cursor-pointer underline underline-offset-4 decoration-[1.5px] ${openPopoverId === 'dev' ? 'popover-open' : ''}`} onMouseEnter={() => playHover(392)} onClick={(e) => togglePopover(e, 'dev', 392)}>
                      softwareontwikkelaar
                      <span className="mac-popover">
                        <strong className="block text-xs font-bold text-neutral-900 mb-1 uppercase tracking-wider font-sans-clean">softwareontwikkelaar</strong>
                        <span className="block text-xs text-neutral-600 leading-relaxed font-sans-clean">Gespecialiseerd in doordachte software-architectuur, minimalistische systemen en heldere code.</span>
                      </span>
                    </span>{' '}
                    momenteel op{' '}
                    <span className={`mac-trigger relative inline-block cursor-pointer underline underline-offset-4 decoration-[1.5px] ${openPopoverId === 'sab' ? 'popover-open' : ''}`} onMouseEnter={() => playHover(440)} onClick={(e) => togglePopover(e, 'sab', 440)}>
                      sabbatical
                      <span className="mac-popover">
                        <strong className="block text-xs font-bold text-neutral-900 mb-1 uppercase tracking-wider font-sans-clean">sabbatical</strong>
                        <span className="block text-xs text-neutral-600 leading-relaxed font-sans-clean">Een bewuste rustperiode voor verdieping, studie, filosofie en creatieve vernieuwing.</span>
                      </span>
                    </span>. 
                    Geïnteresseerd in filosofie, spiritualiteit, technologie en samenleving. Ik schrijf over het menselijk bestaan via{' '}
                    <span className={`mac-trigger relative inline-block cursor-pointer underline underline-offset-4 decoration-[1.5px] ${openPopoverId === 'ted' ? 'popover-open' : ''}`} onMouseEnter={() => playHover(523)} onClick={(e) => togglePopover(e, 'ted', 523)}>
                      The Existential Detective Network
                      <span className="mac-popover">
                        <strong className="block text-xs font-bold text-neutral-900 mb-1 uppercase tracking-wider font-sans-clean">TEDNET</strong>
                        <span className="block text-xs text-neutral-600 leading-relaxed font-sans-clean">Een essay-publicatie en platform voor filosofische reflecties op het moderne leven.</span>
                      </span>
                    </span>. 
                    Onlangs ben ik een{' '}
                    <span className={`mac-trigger relative inline-block cursor-pointer underline underline-offset-4 decoration-[1.5px] ${openPopoverId === 'newp' ? 'popover-open' : ''}`} onMouseEnter={() => playHover(587)} onClick={(e) => togglePopover(e, 'newp', 587)}>
                      nieuw project
                      <span className="mac-popover">
                        <strong className="block text-xs font-bold text-neutral-900 mb-1 uppercase tracking-wider font-sans-clean">nieuw project</strong>
                        <span className="block text-xs text-neutral-600 leading-relaxed font-sans-clean">Een initiatief rondom natuurbeleving, stilte en verstilling via beeld en tekst.</span>
                      </span>
                    </span>{' '}
                    gestart om mijn fascinatie voor de natuur vast te leggen.
                  </p>

                  <p>
                    Ik verzamel delen van mijn werkelijkheid door te{' '}
                    <span className={`mac-trigger relative inline-block cursor-pointer underline underline-offset-4 decoration-[1.5px] ${openPopoverId === 'schrijf' ? 'popover-open' : ''}`} onMouseEnter={() => playHover(523)} onClick={(e) => togglePopover(e, 'schrijf', 523)}>
                      schrijven
                      <span className="mac-popover">
                        <strong className="block text-xs font-bold text-neutral-900 mb-1 uppercase tracking-wider font-sans-clean">tekst & observatie</strong>
                        <span className="block text-xs text-neutral-600 leading-relaxed font-sans-clean">Gedachten, essays en notities om vluchtige ideeën vast te houden en scherp te stellen.</span>
                      </span>
                    </span>{' '}
                    terwijl ik inspiratie haal uit esthetische sferen op{' '}
                    <span className={`mac-trigger relative inline-block cursor-pointer underline underline-offset-4 decoration-[1.5px] ${openPopoverId === 'pin' ? 'popover-open' : ''}`} onMouseEnter={() => playHover(587)} onClick={(e) => togglePopover(e, 'pin', 587)}>
                      Pinterest
                      <span className="mac-popover">
                        <strong className="block text-xs font-bold text-neutral-900 mb-1 uppercase tracking-wider font-sans-clean">visueel archief</strong>
                        <span className="block text-xs text-neutral-600 leading-relaxed font-sans-clean">Een digitaal moodboard vol textuur, typografie, cinematografische stillevens en subculturen.</span>
                      </span>
                    </span>.
                  </p>
                  <p>
                    Voor mij is persoonlijke stijl geen toeval, maar een constante dialoog tussen wat je voelt, ziet en hoort.
                  </p>

                  <p>
                    Bekijk waar ik nu aan{' '}
                    <span className={`mac-trigger relative inline-block cursor-pointer underline underline-offset-4 decoration-[1.5px] ${openPopoverId === 'work' ? 'popover-open' : ''}`} onMouseEnter={() => playHover(784)} onClick={(e) => togglePopover(e, 'work', 784)}>
                      werk
                      <span className="mac-popover">
                        <strong className="block text-xs font-bold text-neutral-900 mb-1 uppercase tracking-wider font-sans-clean">now page</strong>
                        <span className="block text-xs text-neutral-600 leading-relaxed font-sans-clean">Een publieke statusupdate geïnspireerd door Derek Sivers over huidige doelen en lectuur.</span>
                      </span>
                    </span>,{' '}
                    of lees hoe deze site is{' '}
                    <span className={`mac-trigger relative inline-block cursor-pointer underline underline-offset-4 decoration-[1.5px] ${openPopoverId === 'built' ? 'popover-open' : ''}`} onMouseEnter={() => playHover(880)} onClick={(e) => togglePopover(e, 'built', 880)}>
                      gebouwd
                      <span className="mac-popover">
                        <strong className="block text-xs font-bold text-neutral-900 mb-1 uppercase tracking-wider font-sans-clean">colofon</strong>
                        <span className="block text-xs text-neutral-600 leading-relaxed font-sans-clean">Notities over de minimalistische tech stack, typografie en het audiodesign.</span>
                      </span>
                    </span>.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Former{' '}
                    <span className={`mac-trigger relative inline-block cursor-pointer underline underline-offset-4 decoration-[1.5px] ${openPopoverId === 'dev-en' ? 'popover-open' : ''}`} onMouseEnter={() => playHover(392)} onClick={(e) => togglePopover(e, 'dev-en', 392)}>
                      software developer
                      <span className="mac-popover">
                        <strong className="block text-xs font-bold text-neutral-900 mb-1 uppercase tracking-wider font-sans-clean">software developer</strong>
                        <span className="block text-xs text-neutral-600 leading-relaxed font-sans-clean">Professional focused on designing, writing, and optimizing code architectures and systems.</span>
                      </span>
                    </span>{' '}
                    currently on{' '}
                    <span className={`mac-trigger relative inline-block cursor-pointer underline underline-offset-4 decoration-[1.5px] ${openPopoverId === 'sab-en' ? 'popover-open' : ''}`} onMouseEnter={() => playHover(440)} onClick={(e) => togglePopover(e, 'sab-en', 440)}>
                      sabbatical
                      <span className="mac-popover">
                        <strong className="block text-xs font-bold text-neutral-900 mb-1 uppercase tracking-wider font-sans-clean">sabbatical</strong>
                        <span className="block text-xs text-neutral-600 leading-relaxed font-sans-clean">An extended leave of absence from standard employment for reflection, study, and creative renewal.</span>
                      </span>
                    </span>. 
                    Interested in philosophy, spirituality, technology and society. I write about existing as a human in our current times over at{' '}
                    <span className={`mac-trigger relative inline-block cursor-pointer underline underline-offset-4 decoration-[1.5px] ${openPopoverId === 'ted-en' ? 'popover-open' : ''}`} onMouseEnter={() => playHover(523)} onClick={(e) => togglePopover(e, 'ted-en', 523)}>
                      The Existential Detective Network
                      <span className="mac-popover">
                        <strong className="block text-xs font-bold text-neutral-900 mb-1 uppercase tracking-wider font-sans-clean">TEDNET</strong>
                        <span className="block text-xs text-neutral-600 leading-relaxed font-sans-clean">An essay publication and platform exploring philosophical investigations into contemporary human living.</span>
                      </span>
                    </span>. 
                    I recently started a{' '}
                    <span className={`mac-trigger relative inline-block cursor-pointer underline underline-offset-4 decoration-[1.5px] ${openPopoverId === 'newp-en' ? 'popover-open' : ''}`} onMouseEnter={() => playHover(587)} onClick={(e) => togglePopover(e, 'newp-en', 587)}>
                      new project
                      <span className="mac-popover">
                        <strong className="block text-xs font-bold text-neutral-900 mb-1 uppercase tracking-wider font-sans-clean">new project</strong>
                        <span className="block text-xs text-neutral-600 leading-relaxed font-sans-clean">A creative initiative sharing deep appreciation for nature and wilderness through writing and imagery.</span>
                      </span>
                    </span>{' '}
                    to share my love of nature through writing and photography.
                  </p>

                  <p>
                    I capture fragments of thought through{' '}
                    <span className={`mac-trigger relative inline-block cursor-pointer underline underline-offset-4 decoration-[1.5px] ${openPopoverId === 'write-en' ? 'popover-open' : ''}`} onMouseEnter={() => playHover(523)} onClick={(e) => togglePopover(e, 'write-en', 523)}>
                      writing
                      <span className="mac-popover">
                        <strong className="block text-xs font-bold text-neutral-900 mb-1 uppercase tracking-wider font-sans-clean">writing & notes</strong>
                        <span className="block text-xs text-neutral-600 leading-relaxed font-sans-clean">Distilling reflections, theories, and fleeting perceptions into concise language.</span>
                      </span>
                    </span>{' '}
                    and collect ongoing visual research on{' '}
                    <span className={`mac-trigger relative inline-block cursor-pointer underline underline-offset-4 decoration-[1.5px] ${openPopoverId === 'pin-en' ? 'popover-open' : ''}`} onMouseEnter={() => playHover(587)} onClick={(e) => togglePopover(e, 'pin-en', 587)}>
                      Pinterest
                      <span className="mac-popover">
                        <strong className="block text-xs font-bold text-neutral-900 mb-1 uppercase tracking-wider font-sans-clean">visual archives</strong>
                        <span className="block text-xs text-neutral-600 leading-relaxed font-sans-clean">Curating moodboards of texture, editorial typography, cinematic frames, and quiet subcultures.</span>
                      </span>
                    </span>.
                  </p>
                  <p>
                    To me, personal taste is an ongoing synthesis of what we hear, read, and observe.
                  </p>

                  <p>
                    See what I'm up to{' '}
                    <span className={`mac-trigger relative inline-block cursor-pointer underline underline-offset-4 decoration-[1.5px] ${openPopoverId === 'work-en' ? 'popover-open' : ''}`} onMouseEnter={() => playHover(784)} onClick={(e) => togglePopover(e, 'work-en', 784)}>
                      now
                      <span className="mac-popover">
                        <strong className="block text-xs font-bold text-neutral-900 mb-1 uppercase tracking-wider font-sans-clean">now page</strong>
                        <span className="block text-xs text-neutral-600 leading-relaxed font-sans-clean">A public status log inspired by Derek Sivers articulating current priorities, reading, and experiments.</span>
                      </span>
                    </span>,{' '}
                    or find out how I{' '}
                    <span className={`mac-trigger relative inline-block cursor-pointer underline underline-offset-4 decoration-[1.5px] ${openPopoverId === 'built-en' ? 'popover-open' : ''}`} onMouseEnter={() => playHover(880)} onClick={(e) => togglePopover(e, 'built-en', 880)}>
                      built
                      <span className="mac-popover">
                        <strong className="block text-xs font-bold text-neutral-900 mb-1 uppercase tracking-wider font-sans-clean">colophon / built</strong>
                        <span className="block text-xs text-neutral-600 leading-relaxed font-sans-clean">Technical notes detailing the lightweight stack, typography, and minimalist design choices behind this site.</span>
                      </span>
                    </span>{' '}
                    this site.
                  </p>
                </>
              )}

              <div className="border-t border-neutral-200 pt-6"></div>

              {/* Apps */}
              <section className="pt-2">
                <h2 className="text-base md:text-lg font-bold tracking-wider uppercase underline underline-offset-4 mb-3">
                  {dict.lblApps}
                </h2>
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  <span className={`mac-trigger relative inline-block underline underline-offset-4 cursor-pointer ${openPopoverId === 'app-b' ? 'popover-open' : ''}`} onMouseEnter={() => playHover(349)} onClick={(e) => togglePopover(e, 'app-b', 349)}>
                    Blender
                    <span className="mac-popover">
                      <strong className="block text-xs font-bold text-neutral-900 mb-1 font-sans-clean">Blender 3D</strong>
                      <span className="block text-xs text-neutral-600 leading-relaxed font-sans-clean">{dict.popBlender}</span>
                    </span>
                  </span>,
                  <span className={`mac-trigger relative inline-block underline underline-offset-4 cursor-pointer ${openPopoverId === 'app-u' ? 'popover-open' : ''}`} onMouseEnter={() => playHover(392)} onClick={(e) => togglePopover(e, 'app-u', 392)}>
                    UNITY
                    <span className="mac-popover">
                      <strong className="block text-xs font-bold text-neutral-900 mb-1 font-sans-clean">Unity Engine</strong>
                      <span className="block text-xs text-neutral-600 leading-relaxed font-sans-clean">{dict.popUnity}</span>
                    </span>
                  </span>,
                  <span className={`mac-trigger relative inline-block underline underline-offset-4 cursor-pointer ${openPopoverId === 'app-f' ? 'popover-open' : ''}`} onMouseEnter={() => playHover(440)} onClick={(e) => togglePopover(e, 'app-f', 440)}>
                    Figma
                    <span className="mac-popover">
                      <strong className="block text-xs font-bold text-neutral-900 mb-1 font-sans-clean">Figma</strong>
                      <span className="block text-xs text-neutral-600 leading-relaxed font-sans-clean">{dict.popFigma}</span>
                    </span>
                  </span>,
                  <span className={`mac-trigger relative inline-block underline underline-offset-4 cursor-pointer ${openPopoverId === 'app-v' ? 'popover-open' : ''}`} onMouseEnter={() => playHover(523)} onClick={(e) => togglePopover(e, 'app-v', 523)}>
                    VS Code
                    <span className="mac-popover">
                      <strong className="block text-xs font-bold text-neutral-900 mb-1 font-sans-clean">Visual Studio Code</strong>
                      <span className="block text-xs text-neutral-600 leading-relaxed font-sans-clean">{dict.popVscode}</span>
                    </span>
                  </span>
                </div>
              </section>

              {/* Contact */}
              <section className="pt-4">
                <h2 className="text-base md:text-lg font-bold tracking-wider uppercase underline underline-offset-4 mb-3">
                  {dict.lblContact}
                </h2>
                <p className="mb-2 text-xl md:text-2xl">
                  {dict.contactPrompt}
                </p>
                <span className={`mac-trigger relative inline-block underline underline-offset-4 hover:opacity-75 transition cursor-pointer font-mono ${openPopoverId === 'mail' ? 'popover-open' : ''}`} onMouseEnter={() => playHover(659)} onClick={(e) => togglePopover(e, 'mail', 659)}>
                  Info@doxxangelstudios.nl
                  <span className="mac-popover">
                    <strong className="block text-xs font-bold text-neutral-900 mb-1 font-sans-clean">{dict.popDirectTitle}</strong>
                    <span className="block text-xs text-neutral-600 leading-relaxed font-sans-clean">{dict.popDirectDesc}</span>
                    <a href="mailto:Info@doxxangelstudios.nl" className="block text-[11px] font-bold text-black uppercase underline underline-offset-2 mt-2">Stuur e-mail ↗</a>
                  </span>
                </span>
              </section>
            </div>

            {/* Right Column: Photo */}
            <aside className="w-full mt-4 lg:mt-0">
              <div className="w-full aspect-square overflow-hidden bg-neutral-100">
                <img 
                  src="images/fotoinfo.jpg" 
                  alt="Portrait sitting outdoors" 
                  className="w-full h-full object-cover contrast-110 brightness-95 block hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </aside>
          </main>

          {/* Footer */}
          <footer className="flex flex-wrap items-baseline gap-12 md:gap-36 text-lg md:text-xl font-normal mt-24 text-neutral-900 border-t border-neutral-100 pt-8 pb-12 font-sans-clean">
            <div>Sep 23, 2026, 3:26:01 PM (e659175)</div>
            <div>&copy; 2009—2026 DOXXANGEL STUDIOS</div>
          </footer>
        </div>
      </div>
    </div>
  );
}