'use client';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { useSite } from '@/context/SiteContext';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { clampPopover } from '@/lib/clampPopover';
import Pop from '@/components/Pop';

const translations = {
  nl: { lblApps: "APPS DIE IK GEBRUIK", lblStack: "TECHSTACK", toastAudioOn: "Ambient geluid ingeschakeld", toastAudioOff: "Audio uitgeschakeld" },
  en: { lblApps: "APPS I USE", lblStack: "TECH STACK", toastAudioOn: "Ambient audio enabled", toastAudioOff: "Audio muted" }
};

const APPS = [
  { name: 'VSCode', title: 'Visual Studio Code', pitch: 523, nl: 'Mijn code-editor voor alles wat ik bouw, van sites tot scripts.', en: 'My code editor for everything I build, from sites to scripts.' },
  { name: 'Figma', pitch: 440, nl: 'Interfaces ontwerpen en klikbare prototypes maken.', en: 'Designing interfaces and building clickable prototypes.' },
  { name: 'Pinterest', pitch: 587, nl: 'Mijn visuele archief vol textuur, typografie en sfeer.', en: 'My visual archive of texture, typography and mood.' },
  { name: 'Trello', pitch: 392, nl: 'Projecten plannen en taken bijhouden op borden.', en: 'Planning projects and keeping track of tasks on boards.' },
  { name: 'Blender', pitch: 349, nl: '3D modelleren, texturen en renders maken.', en: '3D modelling, texturing and rendering.' },
  { name: 'RPG Maker', pitch: 659, nl: 'Kleine games bouwen met eigen maps en karakters.', en: 'Building small games with custom maps and characters.' },
  { name: 'Polycam', pitch: 698, nl: 'Echte objecten en ruimtes 3D scannen met mijn telefoon.', en: 'Scanning real objects and spaces into 3D with my phone.' },
  { name: 'Unity', pitch: 784, nl: 'Real-time engine voor interactieve 3D-ervaringen.', en: 'Real-time engine for interactive 3D experiences.' },
];

const STACK = [
  { name: 'Next.js', pitch: 523, nl: 'React-framework waar deze site op draait.', en: 'The React framework this site runs on.' },
  { name: 'TS', title: 'TypeScript', pitch: 587, nl: 'TypeScript: JavaScript met types, voor minder fouten.', en: 'TypeScript: JavaScript with types, for fewer bugs.' },
  { name: 'JS', title: 'JavaScript', pitch: 659, nl: 'JavaScript voor interactie, animatie en geluid.', en: 'JavaScript for interaction, animation and sound.' },
  { name: 'CMS', title: 'Content Management System', pitch: 698, nl: 'Beheersystemen zodat klanten zelf content kunnen aanpassen.', en: 'Content systems so clients can edit their own content.' },
  { name: 'Tailwind', title: 'Tailwind CSS', pitch: 740, nl: 'CSS-framework voor snelle, consistente styling direct in de code.', en: 'CSS framework for fast, consistent styling right in the markup.' },
  { name: 'GitHub', pitch: 784, nl: 'Versiebeheer en opslag van al mijn code.', en: 'Version control and a home for all my code.' },
  { name: 'Vercel', pitch: 880, nl: 'Hosting en automatische deploys bij elke push.', en: 'Hosting with automatic deploys on every push.' },
];

/* Rijtje woorden met macOS-wolkje dat uitlegt wat het is */
function ToolList({ title, items, lang, pp, prefix }) {
  return (
    <section className="pb-2 pt-2">
      <h2 className="type-heading underline underline-offset-[6px] mb-4">{title}</h2>
      <div className="flex flex-wrap gap-x-2 gap-y-1">
        {items.map((t, i) => (
          <span key={t.name}>
            <Pop {...pp} id={`${prefix}-${i}`} pitch={t.pitch} title={t.title || t.name} desc={t[lang]}>{t.name}</Pop>
            {i < items.length - 1 && ','}
          </span>
        ))}
      </div>
    </section>
  );
}

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
    clampPopover(e.currentTarget);
    setOpenPopoverId(openPopoverId === id ? null : id);
    if (pitch) playHover(pitch);
  };
  const pp = { openId: openPopoverId, toggle: togglePopover, play: playHover };

  return (
    <>
    <div className="bg-white text-black min-h-screen pt-8 md:pt-10 px-5 sm:px-8 md:px-14 lg:px-16 selection:bg-black selection:text-white" onClick={() => setOpenPopoverId(null)}>
      <div className={`fixed bottom-6 right-6 z-[70] bg-black text-white text-xs px-4 py-2.5 rounded-lg shadow-xl transition-all duration-300 pointer-events-none flex items-center gap-2 ${toast.show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <Check className="w-3.5 h-3.5 text-emerald-400" />
        <span>{toast.text}</span>
      </div>

      <div className="w-full max-w-[1600px] mr-auto">
        <SiteHeader onToggleAudio={handleToggleAudio} />

        <div className="w-full max-w-[1240px] mr-auto lg:pr-10">
          <div className="mb-8 md:mb-14">
            <h1 className="type-display inline-block border-b-[3px] border-black pb-1">
              INFO
            </h1>
          </div>

          <main className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_390px] xl:grid-cols-[minmax(0,1fr)_420px] gap-10 lg:gap-16 items-start">
            <div className="type-lead space-y-6 md:space-y-9">
              {lang === 'nl' ? (
                <>
                  <p>
                    Ik ontwerp en ontwikkel op het snijvlak van{' '}
                    <Pop {...pp} id="fe" pitch={392} title="front-end engineering" desc="Het bouwen van alles wat je in de browser ziet en aanraakt: structuur, stijl en interactie, met aandacht voor snelheid en toegankelijkheid.">front-end engineering</Pop>,{' '}
                    <Pop {...pp} id="iwd" pitch={440} title="interactief webdesign" desc="Websites ontwerpen die reageren op wat de bezoeker doet, met beweging, geluid en feedback in plaats van alleen statische pagina's.">interactief webdesign</Pop>{' '}
                    en{' '}
                    <Pop {...pp} id="gam" pitch={523} title="gamification" desc="Spelelementen zoals uitdagingen, beloningen en verhaal inzetten buiten een game, om iets boeiender of begrijpelijker te maken.">gamification</Pop>.
                  </p>
                  <p>
                    Door moderne webarchitectuur te combineren met speelse mechanics, zoals 3D-elementen, responsieve audio-feedback en intuïtieve verhaallijnen, help ik merken en agencies om bezoekers te boeien op een integere manier. Geen trucjes om aandacht af te dwingen, maar{' '}
                    <Pop {...pp} id="egam" pitch={587} title="ethische gamification" desc="Spelelementen die de gebruiker helpen in plaats van manipuleren: geen verslavende loops of nepdruk, wel plezier, duidelijkheid en echte keuzes.">ethische gamification</Pop>
                    : ervaringen die gebruikers{' '}
                    <Pop {...pp} id="auto" pitch={659} title="autonomie" desc="Het gevoel dat je zelf de regie hebt: je kiest je eigen pad door de ervaring, in je eigen tempo.">autonomie</Pop>{' '}
                    geven, het merkverhaal tastbaar maken en van elk websitebezoek een memorabele interactie maken.
                  </p>
                  <p>
                    Ik verzamel delen van mijn werkelijkheid door te{' '}
                    <Pop {...pp} id="schrijf" pitch={523} title="tekst & observatie" desc="Gedachten, essays en notities om vluchtige ideeën vast te houden en scherp te stellen.">schrijven</Pop>{' '}
                    terwijl ik inspiratie haal uit esthetische sferen op{' '}
                    <Pop {...pp} id="pin" pitch={587} title="visueel archief" desc="Een digitaal moodboard vol textuur, typografie, cinematografische stillevens en subculturen.">Pinterest</Pop>.
                  </p>
                  <p>Voor mij is persoonlijke stijl geen toeval, maar een constante dialoog tussen wat je voelt, ziet en hoort.</p>
                </>
              ) : (
                <>
                  <p>
                    I design and build at the intersection of{' '}
                    <Pop {...pp} id="fe-en" pitch={392} title="front-end engineering" desc="Building everything you see and touch in the browser: structure, style and interaction, with care for speed and accessibility.">front-end engineering</Pop>,{' '}
                    <Pop {...pp} id="iwd-en" pitch={440} title="interactive web design" desc="Designing websites that respond to what the visitor does, with motion, sound and feedback instead of static pages alone.">interactive web design</Pop>{' '}
                    and{' '}
                    <Pop {...pp} id="gam-en" pitch={523} title="gamification" desc="Using game elements such as challenges, rewards and story outside of games, to make something more engaging or easier to understand.">gamification</Pop>.
                  </p>
                  <p>
                    By combining modern web architecture with playful mechanics, such as 3D elements, responsive audio feedback and intuitive storylines, I help brands and agencies engage visitors with integrity. No tricks to force attention, but{' '}
                    <Pop {...pp} id="egam-en" pitch={587} title="ethical gamification" desc="Game elements that help the user instead of manipulating them: no addictive loops or fake pressure, but enjoyment, clarity and real choices.">ethical gamification</Pop>
                    : experiences that give users{' '}
                    <Pop {...pp} id="auto-en" pitch={659} title="autonomy" desc="The feeling that you are in control: you choose your own path through the experience, at your own pace.">autonomy</Pop>
                    , make the brand story tangible and turn every website visit into a memorable interaction.
                  </p>
                  <p>
                    I capture fragments of thought through{' '}
                    <Pop {...pp} id="write-en" pitch={523} title="writing & notes" desc="Distilling reflections, theories, and fleeting perceptions into concise language.">writing</Pop>{' '}
                    and collect ongoing visual research on{' '}
                    <Pop {...pp} id="pin-en" pitch={587} title="visual archives" desc="Curating moodboards of texture, editorial typography, cinematic frames, and quiet subcultures.">Pinterest</Pop>.
                  </p>
                  <p>To me, personal taste is an ongoing synthesis of what we hear, read, and observe.</p>
                </>
              )}

              <div className="border-t border-neutral-200 pt-2 md:pt-6"></div>

              <ToolList title={dict.lblApps} items={APPS} lang={lang} pp={pp} prefix="app" />
              <ToolList title={dict.lblStack} items={STACK} lang={lang} pp={pp} prefix="stack" />
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
        </div>
      </div>
    </div>
    <SiteFooter />
    </>
  );
}