'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Check } from 'lucide-react';
import { useSite } from '@/context/SiteContext';
import SiteHeader from '@/components/SiteHeader';

const sharedMedia = {
  0: [
    {
      type: "split-1-2",
      left: { type: "image", url: "/images/Scherm\u00ADafbeelding 2026-10-08 om 13.45.56.jpg", caption: "(01) 3D Model van klasgenoot & Custom LP Houder" },
      right: { type: "image", url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80", caption: "(02) Sanrio Schaakstukken // Kuromi Knight & Cinnamoroll King" }
    }
  ],
  1: [
    {
      type: "split-1-2",
      left: { type: "image", url: "/images/sounddog event screen.jpg", caption: "(01) Sound Dog Breda // Gothic Magazine Homepage" },
      right: { type: "image", url: "/images/sounddog event screen 2.jpg", caption: "(02) SMS Achtergrond // Filterbare Timetable" }
    },
    {
      type: "fullwidth",
      media: { type: "image", url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80", caption: "(03) Concertzaal Sfeer & Live Fotogalerij" }
    },
    {
      type: "split-2-1",
      left: { type: "image", url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80", caption: "(04) Programmering & Artist Lineup Detail" },
      right: { type: "image", url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80", caption: "(05) Oefenruimtes & Tarieven Beheer" }
    }
  ],
  2: [
    {
      type: "split-2-1",
      left: { type: "video", url: "/images/Schermopname 2026-10-08 om 12.56.13.mov", poster: "/images/macos start.jpg", caption: "(01) macOS Portfolio // Interactieve Opname & Audio" },
      right: { type: "image", url: "/images/macos index.jpg", caption: "(02) Desktop Interface & Vintage Widgets" }
    },
    {
      type: "split-1-2",
      left: { type: "image", url: "/images/macos message.jpg", caption: "(03) iPod Mini Player & Soundtrack Detail" },
      right: { type: "image", url: "/images/macos project.jpg", caption: "(04) Berichtenvenster & Notities" }
    },
    {
      type: "fullwidth",
      media: { type: "image", url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80", caption: "(05) Sfeervol Bureaublad Landschap & Typografie" }
    }
  ],
  3: [
    {
      type: "split-1-2",
      left: { type: "image", url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80", caption: "(01) 8-Bit Gothic Horror // Eigen Kamer als Map" },
      right: { type: "image", url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80", caption: "(02) Custom Character Sprites & Atmosfeer" }
    }
  ],
  4: [
    {
      type: "split-2-1",
      left: { type: "image", url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80", caption: "(01) Lunora Zen Garden // Paarse Sfeerverlichting & Kaarsen" },
      right: { type: "image", url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80", caption: "(02) Klassieke Standbeelden & Virtuele Rust" }
    }
  ],
  5: [
    {
      type: "fullwidth",
      media: { type: "video", url: "/images/Schermopname 2026-10-08 om 13.09.49.mov", poster: "/images/powerpuff home screen .jpg", caption: "(01) Powerpuff Game // Gameplay & Wandeling naar School" }
    },
    {
      type: "split-1-2",
      left: { type: "video", url: "/images/Schermopname 2026-10-08 om 13.09.49.mov", poster: "/images/powerpuff home screen .jpg", caption: "(02) Boeken & Leeruitkomsten Showcase" },
      right: { type: "image", url: "/images/powerpuff home screen .jpg", caption: "(03) 2D Pixel Art Wereld & Karakterontwerp" }
    }
  ]
};

const sectionsData = {
  nl: [
    { id: 0, title: "SANRIO CHESS", category: "ARCHIEF 01: 3D MODELLING", indexStr: "01 / 06", services: "Blender 3D\nCharacter Design\nProduct Sculpting", location: "Blender // Breda", description: ["Voor dit 3D-project heb ik een unieke set schaakstukken ontworpen gebaseerd op bekende Sanrio karakters. Zo werd onder andere een Kuromi Knight gemodelleerd en een Cinnamoroll King, waarbij schattige esthetiek gecombineerd werd met strakke 3D geometrie.", "Daarnaast heb ik binnen hetzelfde traject een 3D-model gemaakt van mijn klasgenoot, die een grote passie heeft voor vinyl en LP's. Speciaal voor hem ontwierp ik een custom 3D LP-houder die perfect aansluit bij zijn muzikale identiteit."], popoverSummary: "Kuromi Knight, Cinnamoroll King & een gepersonaliseerde 3D LP-houder gemodelleerd in Blender.", engineTag: "Blender 3D", tonePitch: "C4" },
    { id: 1, title: "SOUNDDOG BREDA", category: "ARCHIEF 02: WEB & CMS", indexStr: "02 / 06", services: "Web Design & Development\nCMS & SMS Integratie\nGothic Magazine Styling", location: "Live Web // Breda", description: ["Een op maat gemaakt webplatform ontworpen voor live muzieklocatie Sound Dog in Breda. De site heeft een uitgesproken gothic magazine stijl die perfect past bij het rauwe, authentieke karakter van de zaal.", "Het platform beschikt over een eenvoudig beheersysteem (CMS/SMS-achtergrond) waarmee de crew zelf gemakkelijk de concertplanning kan posten, optredens kan wijzigen, foto's kan uploaden en zaalhuur-tarieven kan aanpassen."], popoverSummary: "Gothic magazine stijl website voor Sound Dog Breda inclusief planning en beheerpaneel.", engineTag: "Web // CMS", tonePitch: "E4" },
    { id: 2, title: "MACOS PORTFOLIO", category: "ARCHIEF 03: INTERACTION", indexStr: "03 / 06", services: "Operating System UI\nAmbient Audio Design\nInteractief Prototyping", location: "Interactive Desktop", description: ["In plaats van een traditionele scrollende website is dit portfolio vormgegeven als een complete macOS desktop omgeving. Bezoekers hebben het gevoel dat ze rechtstreeks in mijn computer navigeren via vensters, iconen en mappen.", "De interactieve ervaring is verrijkt met een zelf gecomponeerde soundtrack die kan worden afgespeeld via een nostalgische iPod-widget op het bureaublad, wat zorgt voor een immersieve, tactiele sfeer."], popoverSummary: "Een portfolio vermomd als macOS desktop met interactieve vensters en zelfgemaakte muziek.", engineTag: "macOS Engine", tonePitch: "G4" },
    { id: 3, title: "ROOM // HORROR", category: "ARCHIEF 04: GAME DESIGN", indexStr: "04 / 06", services: "RPG Maker\n8-Bit Pixel Art\nNarratieve Gotische Horror", location: "RPG Maker", description: ["Een sfeervolle 8-bit gotische horror game ontwikkeld in RPG Maker. Het concept vertrekt vanuit een intieme setting: de levels en maps zijn direct gemodelleerd naar mijn eigen kamer en leefomgeving.", "Door herkenbare alledaagse ruimtes te combineren met gotische spanning, custom sprite-designs en donkere pixel-art ontstaat een beklemmende en persoonlijke spelervaring."], popoverSummary: "Gotische 8-bit horror game gemaakt in RPG Maker met levels gebaseerd op mijn eigen kamer.", engineTag: "RPG Maker", tonePitch: "A4" },
    { id: 4, title: "LUNORA GARDEN", category: "ARCHIEF 05: 3D WORLD", indexStr: "05 / 06", services: "Unity 3D Engine\nOmgevingsontwerp\nSelf-Care App Concept", location: "Unity 3D", description: ["Een kalmerende virtuele Zen Garden ontworpen voor Lunora, een hypothetische self-care en wellness applicatie. Het doel was om de gebruiker onder te dompelen in een rustgevende, dromerige 3D-wereld.", "De tuin heeft een kenmerkend paars kleurenpalet en is opgebouwd met klassieke marmeren standbeelden, zacht kaarslicht, kabbelend water en serene wandelpaden voor ontspanning en mindfulness."], popoverSummary: "Rustgevende paarse 3D Zen Garden in Unity voor de hypothetische self-care app Lunora.", engineTag: "Unity 3D", tonePitch: "B4" },
    { id: 5, title: "POWERPUFF RPG", category: "ARCHIEF 06: GAME PORTFOLIO", indexStr: "06 / 06", services: "2D Game Development\nGamified Portfolio\nKarakteranimatie", location: "Playable Web Game", description: ["Een speelbare portfolio-website vermomd als een retro 2D avonturengame in Powerpuff-stijl. De bezoeker bestuurt mijn gepixelde avatar die zich verplaatst tussen huis, de supermarkt en school.", "Onderweg ontdek je interactieve boeken waarin docenten en beoordelaars mijn officiële leeruitkomsten en projectdocumentatie op een speelse, memorabele manier konden lezen."], popoverSummary: "Gamified portfolio waarin je door een interactieve 2D-wereld loopt en leeruitkomsten leest via boeken.", engineTag: "2D Game Engine", tonePitch: "C5" }
  ],
  en: [
    { id: 0, title: "SANRIO CHESS", category: "ARCHIVE 01: 3D MODELLING", indexStr: "01 / 06", services: "Blender 3D\nCharacter Design\nProduct Sculpting", location: "Blender // Breda", description: ["For this 3D sculpting assignment, I designed a bespoke chess set utilizing iconic Sanrio characters. The project featured custom sculpts including a Kuromi Knight and a Cinnamoroll King, harmonizing cute aesthetics with clean 3D geometry.", "Additionally, I created a full 3D sculpt of my classmate who is deeply passionate about vinyl records. As a personalized piece, I designed and modeled a custom vinyl LP stand tailored to his style."], popoverSummary: "Kuromi Knight, Cinnamoroll King & a personalized 3D LP record stand created in Blender.", engineTag: "Blender 3D", tonePitch: "C4" },
    { id: 1, title: "SOUNDDOG BREDA", category: "ARCHIVE 02: WEB & CMS", indexStr: "02 / 06", services: "Web Design & Development\nCMS & Admin Architecture\nGothic Magazine Styling", location: "Live Web // Breda", description: ["A tailored web platform developed for live music venue Sound Dog in Breda. The visual identity embraces a gothic magazine editorial look that reflects the underground, authentic energy of the venue.", "The site includes a clean content management background allowing the crew to effortlessly post concert schedules, update show listings, upload live photographs, and modify rehearsal studio booking rates."], popoverSummary: "Gothic magazine style website for Sound Dog Breda with concert scheduling and admin CMS.", engineTag: "Web // CMS", tonePitch: "E4" },
    { id: 2, title: "MACOS PORTFOLIO", category: "ARCHIVE 03: INTERACTION", indexStr: "03 / 06", services: "Operating System UI\nAmbient Audio Design\nInteractive Prototyping", location: "Interactive Desktop", description: ["Rather than a standard scrolling page, this portfolio is built as a complete macOS desktop experience. Visitors interact directly with desktop folders, finder windows, and app icons as if operating inside a personal computer.", "The project includes an original self-composed soundtrack embedded inside a nostalgic desktop iPod widget, crafting a tactile and atmospheric digital environment."], popoverSummary: "An interactive portfolio structured like a macOS desktop with custom sound and an iPod player.", engineTag: "macOS Engine", tonePitch: "G4" },
    { id: 3, title: "ROOM // HORROR", category: "ARCHIVE 04: GAME DESIGN", indexStr: "04 / 06", services: "RPG Maker\n8-Bit Pixel Art\nNarrative Gothic Horror", location: "RPG Maker", description: ["An atmospheric 8-bit gothic horror game developed in RPG Maker. The environment was directly drafted from my own personal room and familiar everyday spaces to build an intimate sense of unease.", "By juxtaposing comforting surroundings with eerie gothic storytelling, custom pixel character sprites, and dark ambient sound, the game constructs an eerie and personal narrative."], popoverSummary: "Gothic 8-bit horror game developed in RPG Maker with maps designed after my personal room.", engineTag: "RPG Maker", tonePitch: "A4" },
    { id: 4, title: "LUNORA GARDEN", category: "ARCHIVE 05: 3D WORLD", indexStr: "05 / 06", services: "Unity 3D Engine\nEnvironment Design\nSelf-Care App Concept", location: "Unity 3D", description: ["A tranquil virtual Zen Garden created for Lunora, a conceptual self-care and mental wellness app. The environment invites users into an ethereal, calming 3D refuge.", "Bathed in a soothing violet light, the garden features classical statues, flickering candles, quiet water features, and classical architectural elements tailored for relaxation."], popoverSummary: "A calming violet 3D Zen Garden built in Unity for the hypothetical self-care app Lunora.", engineTag: "Unity 3D", tonePitch: "B4" },
    { id: 5, title: "POWERPUFF RPG", category: "ARCHIVE 06: GAME PORTFOLIO", indexStr: "06 / 06", services: "2D Game Development\nGamified Portfolio\nCharacter Animation", location: "Playable Web Game", description: ["A gamified portfolio experience styled like a nostalgic 2D Powerpuff adventure. Players control my pixel avatar roaming through town between school, groceries, and home.", "Scattered across the map are interactive books where teachers and reviewers can examine my semester learning outcomes and design processes directly inside the game."], popoverSummary: "A playable 2D game portfolio where professors explore my learning outcomes through interactive books.", engineTag: "2D Game Engine", tonePitch: "C5" }
  ]
};

function MediaViewer({ media, caption, className = "w-full h-full object-cover block" }) {
  if (!media) return null;
  const isVideo = media.type === 'video' || (typeof media.url === 'string' && media.url.endsWith('.mov'));
  if (isVideo) {
    return <video src={media.url} poster={media.poster} controls playsInline className={className} />;
  }
  return <img src={media.url} alt={caption || ''} loading="lazy" className={className} />;
}

const capClass = "text-[11px] font-sans-clean font-semibold uppercase tracking-widest text-neutral-500 mt-2";

export default function ArchivePage() {
  const { lang, audioActive, toggleAudio, playHover } = useSite();
  const [activeModalIdx, setActiveModalIdx] = useState(null);
  const [hoverGridClass, setHoverGridClass] = useState('');
  const [hoveredCell, setHoveredCell] = useState(null);
  const [activeCursorItem, setActiveCursorItem] = useState(null);
  const [toast, setToast] = useState({ show: false, text: '' });
  const [openPopoverId, setOpenPopoverId] = useState(null);

  const popoverRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!popoverRef.current || window.innerWidth < 1024) return;
    const padding = 16;
    let x = e.clientX + padding;
    let y = e.clientY + padding;
    if (x + 280 > window.innerWidth - padding) x = e.clientX - 280 - padding;
    if (y + 140 > window.innerHeight - padding) y = e.clientY - 140 - padding;
    popoverRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }, []);

  const showToast = (text) => {
    setToast({ show: true, text });
    setTimeout(() => setToast({ show: false, text: '' }), 2600);
  };

  const handleToggleAudio = () => {
    toggleAudio();
    showToast(!audioActive ? (lang === 'nl' ? 'Ambient geluid ingeschakeld' : 'Ambient audio enabled') : (lang === 'nl' ? 'Audio uitgeschakeld' : 'Audio muted'));
  };

  const handleCellEnter = (idx, col, row, e) => {
    if (window.innerWidth < 1024) return;
    const item = sectionsData[lang][idx];
    setHoverGridClass(`has-hover hover-c${col}-r${row}`);
    setHoveredCell(idx);
    setActiveCursorItem({ item, index: item.indexStr });
    if (popoverRef.current) {
      popoverRef.current.classList.add('active');
      popoverRef.current.style.transform = `translate3d(${e.clientX + 16}px, ${e.clientY + 16}px, 0)`;
    }
    if (playHover) playHover(item.tonePitch);
  };

  const handleCellLeave = () => {
    setHoverGridClass('');
    setHoveredCell(null);
    setActiveCursorItem(null);
    if (popoverRef.current) popoverRef.current.classList.remove('active');
  };

  const openProject = (idx) => {
    setActiveModalIdx(idx);
    document.body.style.overflow = 'hidden';
    if (playHover) playHover(sectionsData[lang][idx].tonePitch);
  };

  const closeProject = useCallback(() => {
    setActiveModalIdx(null);
    document.body.style.overflow = '';
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeProject(); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [closeProject]);

  const nextProject = () => {
    const list = sectionsData[lang];
    const nxt = (activeModalIdx + 1) % list.length;
    setActiveModalIdx(nxt);
    if (playHover) playHover(list[nxt].tonePitch);
  };

  const prevProject = () => {
    const list = sectionsData[lang];
    const prv = (activeModalIdx - 1 + list.length) % list.length;
    setActiveModalIdx(prv);
    if (playHover) playHover(list[prv].tonePitch);
  };

  const toggleInlinePopover = (e, id, pitch) => {
    e.stopPropagation();
    setOpenPopoverId(openPopoverId === id ? null : id);
    if (pitch && playHover) playHover(pitch);
  };

  const currentProject = activeModalIdx !== null ? sectionsData[lang][activeModalIdx] : null;
  const currentMediaRows = activeModalIdx !== null ? (sharedMedia[activeModalIdx] || []) : [];

  return (
    <div
      className="bg-white text-black min-h-screen pt-8 md:pt-10 px-5 sm:px-8 md:px-14 lg:px-16 selection:bg-black selection:text-white"
      onMouseMove={handleMouseMove}
      onClick={() => setOpenPopoverId(null)}
    >
      <div className={`fixed bottom-6 right-6 z-[90] bg-black text-white text-xs px-4 py-2.5 rounded-lg shadow-xl transition-all duration-300 pointer-events-none flex items-center gap-2 ${toast.show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <Check className="w-3.5 h-3.5 text-emerald-400" />
        <span>{toast.text}</span>
      </div>

      {/* Mouse-following definition popover */}
      <div ref={popoverRef} id="cursorPopover" className={activeCursorItem ? 'active' : ''}>
        {activeCursorItem && activeCursorItem.item && (
          <div>
            <div className="flex items-center justify-between mb-1.5 font-sans-clean">
              <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-500">{activeCursorItem.item.category}</span>
              <span className="text-[10px] text-neutral-400 font-semibold">{activeCursorItem.index}</span>
            </div>
            <strong className="block text-sm font-bold text-neutral-900 mb-1 uppercase tracking-wide font-sans-clean">{activeCursorItem.item.title}</strong>
            <p className="text-xs text-neutral-600 leading-relaxed font-sans-clean">{activeCursorItem.item.popoverSummary}</p>
            <div className="mt-2.5 pt-2 border-t border-black/10 flex items-center justify-between font-sans-clean">
              <span className="text-[10px] font-bold tracking-wider text-black uppercase underline underline-offset-2">{lang === 'nl' ? 'Klik om te openen ↗' : 'Click to open ↗'}</span>
              <span className="text-[10px] text-neutral-500 font-medium">{activeCursorItem.item.engineTag}</span>
            </div>
          </div>
        )}
      </div>

      <div className="w-full max-w-[1600px] mr-auto">
        <SiteHeader onToggleAudio={handleToggleAudio} />
      </div>

      <div className="w-full max-w-[1500px] mx-auto">
        <main className={`editorial-grid grid grid-cols-1 lg:grid-cols-2 border-[2px] sm:border-[3px] border-black bg-white ${hoverGridClass}`}>

          {/* CELL 0: SANRIO CHESS */}
          <div
            className={`grid-cell lg-divider-r lg-divider-b border-b-[2px] lg:border-b-0 border-black p-5 sm:p-7 lg:p-10 flex flex-col justify-between cursor-pointer ${hoveredCell === 0 ? 'is-hovered' : ''}`}
            data-cell="0"
            onClick={() => openProject(0)}
            onMouseEnter={(e) => handleCellEnter(0, 0, 0, e)}
            onMouseLeave={handleCellLeave}
          >
            <div className="layer-typography">
              <div className="flex items-center justify-between">
                <span className="displaced-word w-date font-serif-luxury text-2xl sm:text-4xl lg:text-6xl weight-ultra-thin text-black">01.16.2026</span>
                <span className="text-[10px] sm:text-xs font-sans-clean tracking-widest text-neutral-800 uppercase font-semibold underline underline-offset-4">BLENDER // 01 ↗</span>
              </div>
              <div className="mt-4 lg:mt-auto lg:pt-6">
                <h2 className="displaced-word w-stealer font-serif-luxury text-3xl sm:text-5xl lg:text-7xl uppercase weight-thin text-black leading-none">SANRIO CHESS</h2>
                <span className="block text-[10px] sm:text-xs font-sans-clean uppercase tracking-widest text-neutral-600 font-semibold mt-1.5">Kuromi Knight, Cinnamoroll & LP Stand</span>
              </div>
            </div>
            <div className="layer-photo">
              <div className="displaced-photo p-arch w-full lg:w-56 aspect-[16/9] lg:aspect-[3/4.5] overflow-hidden bg-neutral-100">
                <img src="https://i.pinimg.com/736x/75/13/27/7513276390ed3eeff2d9f25839318ace.jpg" alt="Sanrio Chess" className="w-full h-full object-cover block" />
              </div>
            </div>
          </div>

          {/* CELL 1: SOUNDDOG BREDA */}
          <div
            className={`grid-cell lg-divider-b border-b-[2px] lg:border-b-0 border-black p-5 sm:p-7 lg:p-10 flex flex-col justify-between cursor-pointer ${hoveredCell === 1 ? 'is-hovered' : ''}`}
            data-cell="1"
            onClick={() => openProject(1)}
            onMouseEnter={(e) => handleCellEnter(1, 1, 0, e)}
            onMouseLeave={handleCellLeave}
          >
            <div className="layer-typography">
              <div className="flex justify-between items-start">
                <h2 className="displaced-word w-biggirls font-serif-luxury text-2xl sm:text-4xl lg:text-5xl leading-tight weight-thin text-black">
                  SOUNDDOG<br /><span className="text-xl sm:text-2xl lg:text-3xl weight-ultra-thin">[BREDA]</span>
                </h2>
                <div className="displaced-word w-badge7 shrink-0">
                  <div className="circle-badge-7"><span>CMS</span></div>
                </div>
              </div>
              <div className="flex justify-end mt-4 lg:mt-auto">
                <span className="font-sans-clean text-[10px] sm:text-xs text-neutral-800 font-semibold tracking-widest uppercase">Gothic Magazine // Timetable</span>
              </div>
            </div>
            <div className="layer-photo">
              <div className="displaced-photo p-runner w-full lg:w-72 aspect-[16/9] lg:aspect-[16/10] overflow-hidden bg-neutral-100">
                <img src="https://i.pinimg.com/736x/b8/73/30/b873302595741b7ba9321f0d911ca72a.jpg" alt="Sound Dog" className="w-full h-full object-cover block" />
              </div>
            </div>
          </div>

          {/* CELL 2: MACOS PORTFOLIO */}
          <div
            className={`grid-cell lg-divider-r lg-divider-b border-b-[2px] lg:border-b-0 border-black p-5 sm:p-7 lg:p-10 flex flex-col justify-between cursor-pointer ${hoveredCell === 2 ? 'is-hovered' : ''}`}
            data-cell="2"
            onClick={() => openProject(2)}
            onMouseEnter={(e) => handleCellEnter(2, 0, 1, e)}
            onMouseLeave={handleCellLeave}
          >
            <div className="layer-typography">
              <div>
                <div className="text-[10px] sm:text-xs font-sans-clean uppercase tracking-widest text-neutral-800 font-semibold mb-1">macOS Desktop // Audio</div>
                <span className="text-[9px] sm:text-[11px] font-sans-clean uppercase tracking-wider text-neutral-500">Inclusief iPod & Custom Soundtrack</span>
              </div>
              <div className="mt-4 lg:mt-auto">
                <span className="displaced-word w-scene3 font-serif-luxury text-xl sm:text-2xl lg:text-3xl tracking-widest text-black uppercase block weight-thin">SYSTEM DESKTOP</span>
              </div>
            </div>
            <div className="layer-photo">
              <div className="displaced-photo p-cobble w-full lg:w-64 aspect-[16/9] overflow-hidden bg-neutral-100">
                <img src="https://i.pinimg.com/736x/5e/60/70/5e60702e8474cf20f7272203af620c0f.jpg" alt="macOS" className="w-full h-full object-cover block" />
              </div>
            </div>
          </div>

          {/* CELL 3: ROOM // HORROR */}
          <div
            className={`grid-cell lg-divider-b border-b-[2px] lg:border-b-0 border-black p-5 sm:p-7 lg:p-10 flex flex-col justify-between cursor-pointer ${hoveredCell === 3 ? 'is-hovered' : ''}`}
            data-cell="3"
            onClick={() => openProject(3)}
            onMouseEnter={(e) => handleCellEnter(3, 1, 1, e)}
            onMouseLeave={handleCellLeave}
          >
            <div className="layer-typography text-left lg:text-right">
              <span className="text-[10px] sm:text-xs font-sans-clean uppercase tracking-widest text-neutral-700 font-semibold block mb-1">RPG Maker // Horror</span>
              <div className="my-3 lg:my-auto">
                <h2 className="displaced-word w-noway font-serif-luxury text-3xl sm:text-5xl lg:text-8xl uppercase text-black weight-ultra-thin leading-none">
                  ROOM // HORROR<br /><span className="text-2xl sm:text-4xl lg:text-5xl font-light weight-ultra-thin">[8-BIT]</span>
                </h2>
              </div>
              <div className="text-[10px] sm:text-xs font-sans-clean text-neutral-800 tracking-wider uppercase font-semibold">04 // Custom Maps & Characters</div>
            </div>
            <div className="layer-photo">
              <div className="displaced-photo p-statue w-full lg:w-56 aspect-[16/9] lg:aspect-[4/3] overflow-hidden bg-neutral-100">
                <img src="https://i.pinimg.com/736x/5f/56/ce/5f56ced15deb506f1ec69f26433bb61b.jpg" alt="Room Horror" className="w-full h-full object-cover block" />
              </div>
            </div>
          </div>

          {/* CELL 4: LUNORA */}
          <div
            className={`grid-cell lg-divider-r border-b-[2px] lg:border-b-0 border-black p-5 sm:p-7 lg:p-10 flex flex-col justify-between cursor-pointer ${hoveredCell === 4 ? 'is-hovered' : ''}`}
            data-cell="4"
            onClick={() => openProject(4)}
            onMouseEnter={(e) => handleCellEnter(4, 0, 2, e)}
            onMouseLeave={handleCellLeave}
          >
            <div className="layer-typography">
              <div>
                <h2 className="displaced-word w-knife font-serif-luxury text-3xl sm:text-5xl lg:text-7xl uppercase text-black weight-ultra-thin">LUNORA</h2>
                <span className="text-[10px] sm:text-xs font-sans-clean uppercase tracking-widest text-neutral-700 font-semibold block mt-1.5">Unity 3D // Zen Garden & Standbeelden</span>
              </div>
            </div>
            <div className="layer-photo">
              <div className="displaced-photo p-knife w-full lg:w-52 aspect-[16/9] lg:aspect-[3/4] overflow-hidden bg-neutral-100">
                <img src="https://i.pinimg.com/736x/a4/05/72/a40572fca98801b5f639cd6fc9039d7b.jpg" alt="Lunora" className="w-full h-full object-cover block" />
              </div>
            </div>
          </div>

          {/* CELL 5: POWERPUFF */}
          <div
            className={`grid-cell p-5 sm:p-7 lg:p-10 flex flex-col justify-between cursor-pointer ${hoveredCell === 5 ? 'is-hovered' : ''}`}
            data-cell="5"
            onClick={() => openProject(5)}
            onMouseEnter={(e) => handleCellEnter(5, 1, 2, e)}
            onMouseLeave={handleCellLeave}
          >
            <div className="layer-typography">
              <div className="flex items-start justify-between">
                <h2 className="displaced-word w-enhypen font-serif-luxury text-3xl sm:text-5xl lg:text-6xl uppercase text-black weight-thin">POWERPUFF</h2>
                <span className="text-xs font-sans-clean text-neutral-900 font-bold">2D ENGINE</span>
              </div>
              <div className="flex justify-start lg:justify-end items-center mt-3 lg:mt-auto">
                <span
                  className={`mac-trigger relative inline-block cursor-pointer ${openPopoverId === 'c5-pop' ? 'popover-open' : ''}`}
                  onClick={(e) => toggleInlinePopover(e, 'c5-pop', 440)}
                >
                  <span className="displaced-word w-author font-sans-clean text-xs sm:text-base text-black font-semibold tracking-widest lowercase underline underline-offset-4">leeruitkomsten & boeken</span>
                  <span className={`mac-popover ${openPopoverId === 'c5-pop' ? 'active' : ''}`}>
                    <strong className="block text-[11px] font-bold text-neutral-900 mb-0.5 uppercase tracking-wider font-sans-clean">Interactieve Wereld</strong>
                    <span className="block text-[11px] text-neutral-600 leading-snug font-sans-clean">Wandel door het dorp naar school en ontdek de interactieve boeken.</span>
                  </span>
                </span>
              </div>
            </div>
            <div className="layer-photo">
              <div className="displaced-photo p-roof w-full lg:w-56 aspect-[16/9] lg:aspect-[3/4.5] overflow-hidden bg-neutral-100">
                <img src="https://i.pinimg.com/736x/02/74/1f/02741fd796a24c464d2da3febf11e004.jpg" alt="Powerpuff" className="w-full h-full object-cover block" />
              </div>
            </div>
          </div>
        </main>

        <footer className="flex flex-wrap items-baseline gap-3 md:gap-36 text-sm md:text-xl font-normal mt-16 md:mt-24 mb-12 text-neutral-900 border-t border-neutral-100 pt-8 font-sans-clean">
          <div>Sep 23, 2026, 3:26:01 PM (e659175)</div>
          <div>&copy; 2009—2026 DOXXANGEL STUDIOS</div>
        </footer>
      </div>

      {/* Project modal */}
      {activeModalIdx !== null && currentProject && (
        <div data-lenis-prevent className="fixed inset-0 z-[80] overflow-y-auto bg-white">
          <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md pt-6 sm:pt-8 md:pt-10 px-5 sm:px-8 md:px-14 lg:px-16 pb-4 border-b border-neutral-100 flex items-center justify-between font-editorial-nav text-[12px] sm:text-xs uppercase font-medium select-none">
            <button onClick={closeProject} className="flex items-center gap-2 tracking-[0.2em] font-semibold text-black hover:opacity-60 transition cursor-pointer">
              <span className="text-sm">✕</span> <span>{lang === 'nl' ? 'SLUITEN' : 'CLOSE'}</span>
            </button>
            <div className="flex items-center gap-4">
              <button onClick={prevProject} className="hover:opacity-60 transition cursor-pointer">{lang === 'nl' ? '← VORIG' : '← PREV'}</button>
              <span>•</span>
              <button onClick={nextProject} className="hover:opacity-60 transition cursor-pointer">{lang === 'nl' ? 'VOLGEND →' : 'NEXT →'}</button>
            </div>
          </div>

          <div className="max-w-[1500px] mx-auto px-5 sm:px-8 md:px-14 lg:px-16 pt-8 pb-28">
            <section className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 pb-10 sm:pb-16 items-start">
              <div className="md:col-span-4">
                <h1 className="text-3xl sm:text-5xl lg:text-7xl font-serif-luxury weight-ultra-thin tracking-tight uppercase leading-none text-black m-0 p-0">
                  {currentProject.title}
                </h1>
                <span className="block text-[11px] sm:text-xs font-editorial-nav uppercase tracking-[0.2em] text-neutral-500 font-semibold mt-3 sm:mt-4">
                  {currentProject.category} // {currentProject.indexStr}
                </span>
              </div>

              <div className="md:col-span-3 space-y-4 sm:space-y-6 text-xs sm:text-[13px] leading-relaxed font-sans-clean">
                <div>
                  <span className="block font-editorial-nav uppercase tracking-widest text-[10px] text-neutral-400 font-semibold mb-1">Engine & Tools</span>
                  <div className="font-normal text-neutral-900 whitespace-pre-line leading-relaxed">{currentProject.services}</div>
                </div>
                <div>
                  <span className="block font-editorial-nav uppercase tracking-widest text-[10px] text-neutral-400 font-semibold mb-1">Discipline</span>
                  <div className="font-normal text-neutral-900">{currentProject.location}</div>
                </div>
              </div>

              <div className="md:col-span-5 text-sm sm:text-base md:text-lg leading-[1.6] md:leading-[1.66] text-neutral-800 space-y-4 font-sans-clean font-normal">
                {currentProject.description.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </section>

            <section className="space-y-10 sm:space-y-20 md:space-y-24 pt-4">
              {currentMediaRows.map((row, rIdx) => {
                if (row.type === 'split-1-2') {
                  return (
                    <div key={rIdx} className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
                      <div className="md:col-span-4 flex flex-col">
                        <div className="w-full aspect-[4/5] bg-neutral-100 overflow-hidden"><MediaViewer media={row.left} caption={row.left.caption} /></div>
                        <span className={capClass}>{row.left.caption}</span>
                      </div>
                      <div className="md:col-span-8 flex flex-col">
                        <div className="w-full aspect-[16/10] bg-neutral-100 overflow-hidden"><MediaViewer media={row.right} caption={row.right.caption} /></div>
                        <span className={capClass}>{row.right.caption}</span>
                      </div>
                    </div>
                  );
                } else if (row.type === 'split-2-1') {
                  return (
                    <div key={rIdx} className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
                      <div className="md:col-span-8 flex flex-col">
                        <div className="w-full aspect-[16/10] bg-neutral-100 overflow-hidden"><MediaViewer media={row.left} caption={row.left.caption} /></div>
                        <span className={capClass}>{row.left.caption}</span>
                      </div>
                      <div className="md:col-span-4 flex flex-col">
                        <div className="w-full aspect-[4/5] bg-neutral-100 overflow-hidden"><MediaViewer media={row.right} caption={row.right.caption} /></div>
                        <span className={capClass}>{row.right.caption}</span>
                      </div>
                    </div>
                  );
                } else if (row.type === 'fullwidth') {
                  return (
                    <div key={rIdx} className="w-full flex flex-col">
                      <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-neutral-100 overflow-hidden"><MediaViewer media={row.media} caption={row.media.caption} /></div>
                      <span className={capClass}>{row.media.caption}</span>
                    </div>
                  );
                }
                return null;
              })}
            </section>
          </div>
        </div>
      )}
    </div>
  );
}