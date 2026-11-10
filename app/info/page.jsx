'use client';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { useSite } from '@/context/SiteContext';
import SiteHeader from '@/components/SiteHeader';
import Pop from '@/components/Pop';

const translations = {
  nl: {
    lblApps: "APPS DIE IK GEBRUIK", lblContact: "Contact",
    contactPrompt: "Spreekt iets je aan of wil je van gedachten wisselen? Laat het horen:",
    popDirectTitle: "Directe Post", popDirectDesc: "Opent je mailclient om direct een bericht te sturen.",
    popBlender: "Open-source 3D software voor modelleren, animatie en visualisaties.",
    popUnity: "Real-time engine voor interactieve 3D ervaringen.",
    popFigma: "Interface design en interactieve prototypes voor digitale producten.",
    popVscode: "Lichtgewicht editor voor software-architectuur en code.",
    toastAudioOn: "Ambient geluid ingeschakeld", toastAudioOff: "Audio uitgeschakeld"
  },
  en: {
    lblApps: "APPS I USE", lblContact: "Contact",
    contactPrompt: "Like something I've said? Think I'm a heretic? Let me hear it:",
    popDirectTitle: "Direct Dispatch", popDirectDesc: "Opens your preferred email client to write directly.",
    popBlender: "Open-source 3D creation suite for modeling, animation, and visualization.",
    popUnity: "Real-time engine for interactive 3D virtual experiences.",
    popFigma: "Interface design and collaborative prototyping tool.",
    popVscode: "Lightweight source-code editor for software architecture.",
    toastAudioOn: "Ambient audio enabled", toastAudioOff: "Audio muted"
  }
};

export default function InfoPage() {
  const { lang, audioActive, toggleAudio, playHover } = useSite();
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
  const pp = { openId: openPopoverId, toggle: togglePopover, play: playHover };

  const apps = [
    { id: 'app-b', pitch: 349, name: 'Blender', title: 'Blender 3D', desc: dict.popBlender },
    { id: 'app-u', pitch: 392, name: 'UNITY', title: 'Unity Engine', desc: dict.popUnity },
    { id: 'app-f', pitch: 440, name: 'Figma', title: 'Figma', desc: dict.popFigma },
    { id: 'app-v', pitch: 523, name: 'VS Code', title: 'Visual Studio Code', desc: dict.popVscode },
  ];

  return (
    <div className="bg-white text-black min-h-screen pt-8 md:pt-10 px-5 sm:px-8 md:px-14 lg:px-16 selection:bg-black selection:text-white" onClick={() => setOpenPopoverId(null)}>
      <div className={`fixed bottom-6 right-6 z-[70] bg-black text-white text-xs px-4 py-2.5 rounded-lg shadow-xl transition-all duration-300 pointer-events-none flex items-center gap-2 ${toast.show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <Check className="w-3.5 h-3.5 text-emerald-400" />
        <span>{toast.text}</span>
      </div>

      <div className="w-full max-w-[1600px] mr-auto">
        <SiteHeader onToggleAudio={handleToggleAudio} />

        <div className="w-full max-w-[1240px] mr-auto lg:pr-10">
          <div className="mb-8 md:mb-14">
            <h1 className="inline-block text-5xl sm:text-7xl md:text-8xl font-serif-luxury weight-ultra-thin tracking-tight leading-none border-b-[4px] border-black pb-1">
              INFO
            </h1>
          </div>

          <main className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_390px] xl:grid-cols-[minmax(0,1fr)_420px] gap-10 lg:gap-16 items-start">
            <div className="text-base sm:text-lg md:text-2xl leading-[1.6] md:leading-[1.66] space-y-6 md:space-y-9">
              {lang === 'nl' ? (
                <>
                  <p>
                    Voormalig{' '}
                    <Pop {...pp} id="dev" pitch={392} title="softwareontwikkelaar" desc="Gespecialiseerd in doordachte software-architectuur, minimalistische systemen en heldere code.">softwareontwikkelaar</Pop>{' '}
                    momenteel op{' '}
                    <Pop {...pp} id="sab" pitch={440} title="sabbatical" desc="Een bewuste rustperiode voor verdieping, studie, filosofie en creatieve vernieuwing.">sabbatical</Pop>
                    . Geïnteresseerd in filosofie, spiritualiteit, technologie en samenleving. Ik schrijf over het menselijk bestaan via{' '}
                    <Pop {...pp} id="ted" pitch={523} title="TEDNET" desc="Een essay-publicatie en platform voor filosofische reflecties op het moderne leven.">The Existential Detective Network</Pop>
                    . Onlangs ben ik een{' '}
                    <Pop {...pp} id="newp" pitch={587} title="nieuw project" desc="Een initiatief rondom natuurbeleving, stilte en verstilling via beeld en tekst.">nieuw project</Pop>{' '}
                    gestart om mijn fascinatie voor de natuur vast te leggen.
                  </p>
                  <p>
                    Ik verzamel delen van mijn werkelijkheid door te{' '}
                    <Pop {...pp} id="schrijf" pitch={523} title="tekst & observatie" desc="Gedachten, essays en notities om vluchtige ideeën vast te houden en scherp te stellen.">schrijven</Pop>{' '}
                    terwijl ik inspiratie haal uit esthetische sferen op{' '}
                    <Pop {...pp} id="pin" pitch={587} title="visueel archief" desc="Een digitaal moodboard vol textuur, typografie, cinematografische stillevens en subculturen.">Pinterest</Pop>.
                  </p>
                  <p>Voor mij is persoonlijke stijl geen toeval, maar een constante dialoog tussen wat je voelt, ziet en hoort.</p>
                  <p>
                    Bekijk waar ik nu aan{' '}
                    <Pop {...pp} id="work" pitch={784} title="now page" desc="Een publieke statusupdate geïnspireerd door Derek Sivers over huidige doelen en lectuur.">werk</Pop>,{' '}
                    of lees hoe deze site is{' '}
                    <Pop {...pp} id="built" pitch={880} title="colofon" desc="Notities over de minimalistische tech stack, typografie en het audiodesign.">gebouwd</Pop>.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Former{' '}
                    <Pop {...pp} id="dev-en" pitch={392} title="software developer" desc="Professional focused on designing, writing, and optimizing code architectures and systems.">software developer</Pop>{' '}
                    currently on{' '}
                    <Pop {...pp} id="sab-en" pitch={440} title="sabbatical" desc="An extended leave of absence from standard employment for reflection, study, and creative renewal.">sabbatical</Pop>
                    . Interested in philosophy, spirituality, technology and society. I write about existing as a human in our current times over at{' '}
                    <Pop {...pp} id="ted-en" pitch={523} title="TEDNET" desc="An essay publication and platform exploring philosophical investigations into contemporary human living.">The Existential Detective Network</Pop>
                    . I recently started a{' '}
                    <Pop {...pp} id="newp-en" pitch={587} title="new project" desc="A creative initiative sharing deep appreciation for nature and wilderness through writing and imagery.">new project</Pop>{' '}
                    to share my love of nature through writing and photography.
                  </p>
                  <p>
                    I capture fragments of thought through{' '}
                    <Pop {...pp} id="write-en" pitch={523} title="writing & notes" desc="Distilling reflections, theories, and fleeting perceptions into concise language.">writing</Pop>{' '}
                    and collect ongoing visual research on{' '}
                    <Pop {...pp} id="pin-en" pitch={587} title="visual archives" desc="Curating moodboards of texture, editorial typography, cinematic frames, and quiet subcultures.">Pinterest</Pop>.
                  </p>
                  <p>To me, personal taste is an ongoing synthesis of what we hear, read, and observe.</p>
                  <p>
                    See what I'm up to{' '}
                    <Pop {...pp} id="work-en" pitch={784} title="now page" desc="A public status log inspired by Derek Sivers articulating current priorities, reading, and experiments.">now</Pop>,{' '}
                    or find out how I{' '}
                    <Pop {...pp} id="built-en" pitch={880} title="colophon / built" desc="Technical notes detailing the lightweight stack, typography, and minimalist design choices behind this site.">built</Pop>{' '}
                    this site.
                  </p>
                </>
              )}

              <div className="border-t border-neutral-200 pt-2 md:pt-6"></div>

              <section className="pt-2">
                <h2 className="text-base md:text-lg font-bold tracking-wider uppercase underline underline-offset-4 mb-3">{dict.lblApps}</h2>
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  {apps.map((a, i) => (
                    <span key={a.id}>
                      <Pop {...pp} id={a.id} pitch={a.pitch} title={a.title} desc={a.desc} plain>{a.name}</Pop>
                      {i < apps.length - 1 && ','}
                    </span>
                  ))}
                </div>
              </section>

              <section className="pt-2 md:pt-4">
                <h2 className="text-base md:text-lg font-bold tracking-wider uppercase underline underline-offset-4 mb-3">{dict.lblContact}</h2>
                <p className="mb-2">{dict.contactPrompt}</p>
                <span
                  className={`mac-trigger relative inline-block break-all text-sm sm:text-lg md:text-xl underline underline-offset-4 hover:opacity-75 transition cursor-pointer font-mono ${openPopoverId === 'mail' ? 'popover-open' : ''}`}
                  onMouseEnter={() => playHover(659)}
                  onClick={(e) => togglePopover(e, 'mail', 659)}
                >
                  Info@doxxangelstudios.nl
                  <span className="mac-popover">
                    <strong className="block text-xs font-bold text-neutral-900 mb-1 font-sans-clean">{dict.popDirectTitle}</strong>
                    <span className="block text-xs text-neutral-600 leading-relaxed font-sans-clean">{dict.popDirectDesc}</span>
                    <a href="mailto:Info@doxxangelstudios.nl" className="block text-[11px] font-bold text-black uppercase underline underline-offset-2 mt-2">Stuur e-mail ↗</a>
                  </span>
                </span>
              </section>
            </div>

            <aside className="w-full mt-2 lg:mt-0">
              <div className="w-full aspect-square overflow-hidden bg-neutral-100">
                <img
                  src="/images/fotoinfo.jpg"
                  alt="Portrait sitting outdoors"
                  className="w-full h-full object-cover contrast-110 brightness-95 block hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </aside>
          </main>

          <footer className="flex flex-wrap items-baseline gap-3 md:gap-36 text-sm md:text-xl font-normal mt-16 md:mt-24 text-neutral-900 border-t border-neutral-100 pt-8 pb-12 font-sans-clean">
            <div>Sep 23, 2026, 3:26:01 PM (e659175)</div>
            <div>&copy; 2009—2026 DOXXANGEL STUDIOS</div>
          </footer>
        </div>
      </div>
    </div>
  );
}