'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Check, Play } from 'lucide-react';
import { useSite } from '@/context/SiteContext';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { clampPopover } from '@/lib/clampPopover';

const sharedMedia = {
  0: [
    {
      type: "split-1-2",
      left: { type: "image", url: "/images/Scherm\u00ADafbeelding 2026-10-08 om 13.45.56.jpg", caption: "3D Model van klasgenoot & Custom LP Houder" },
      right: { type: "image", url: "", caption: "Sanrio Schaakstukken // Kuromi Knight & Cinnamoroll King" }
    }
  ],
  1: [
    {
      type: "split-1-2",
      left: { type: "image", url: "/images/sounddog event screen.jpg", caption: "Sound Dog Breda // Gothic Magazine Homepage" },
      right: { type: "image", url: "/images/sounddog event screen 2.jpg", caption: "SMS Achtergrond // Filterbare Timetable" }
    },
    {
      type: "fullwidth",
      media: { type: "image", url: "", caption: "Concertzaal Sfeer & Live Fotogalerij" }
    },
    {
      type: "split-2-1",
      left: { type: "image", url: "", caption: "Programmering & Artist Lineup Detail" },
      right: { type: "image", url: "", caption: "Oefenruimtes & Tarieven Beheer" }
    }
  ],
  2: [
    {
      type: "split-2-1",
      left: { type: "video", url: "/images/Schermopname 2026-10-08 om 12.56.13.mov", poster: "/images/macos start.jpg", caption: "macOS Portfolio // Interactieve Opname & Audio" },
      right: { type: "image", url: "/images/macos index.jpg", caption: "Desktop Interface & Vintage Widgets" }
    },
    {
      type: "split-1-2",
      left: { type: "image", url: "/images/macos message.jpg", caption: "iPod Mini Player & Soundtrack Detail" },
      right: { type: "image", url: "/images/macos project.jpg", caption: "Berichtenvenster & Notities" }
    },
    {
      type: "fullwidth",
      media: { type: "image", url: "", caption: "Sfeervol Bureaublad Landschap & Typografie" }
    }
  ],
  3: [
    {
      type: "split-1-2",
      left: { type: "image", url: "", caption: "8-Bit Gothic Horror // Eigen Kamer als Map" },
      right: { type: "image", url: "", caption: "Custom Character Sprites & Atmosfeer" }
    }
  ],
  4: [
    {
      type: "split-2-1",
      left: { type: "image", url: "", caption: "Lunora Zen Garden // Paarse Sfeerverlichting & Kaarsen" },
      right: { type: "image", url: "", caption: "Klassieke Standbeelden & Virtuele Rust" }
    }
  ],
  5: [
    {
      type: "fullwidth",
      media: { type: "video", url: "/images/Schermopname 2026-10-08 om 13.09.49.mov", poster: "/images/powerpuff home screen .jpg", caption: "Powerpuff Game // Gameplay & Wandeling naar School" }
    },
    {
      type: "split-1-2",
      left: { type: "video", url: "/images/Schermopname 2026-10-08 om 13.09.49.mov", poster: "/images/powerpuff home screen .jpg", caption: "Boeken & Leeruitkomsten Showcase" },
      right: { type: "image", url: "/images/powerpuff home screen .jpg", caption: "2D Pixel Art Wereld & Karakterontwerp" }
    }
  ]
};

const sectionsData = {
  nl: [
    { id: 0, title: "SANRIO CHESS", category: "ARCHIEF 01: 3D MODELLING", indexStr: "01 / 06", services: "Blender 3D\nCharacter Design\nProduct Sculpting", description: ["Voor dit 3D-project heb ik een unieke set schaakstukken ontworpen gebaseerd op bekende Sanrio karakters. Zo werd onder andere een Kuromi Knight gemodelleerd en een Cinnamoroll King, waarbij schattige esthetiek gecombineerd werd met strakke 3D geometrie.", "Daarnaast heb ik binnen hetzelfde traject een 3D-model gemaakt van mijn klasgenoot, die een grote passie heeft voor vinyl en LP's. Speciaal voor hem ontwierp ik een custom 3D LP-houder die perfect aansluit bij zijn muzikale identiteit."], popoverSummary: "Kuromi Knight, Cinnamoroll King & een gepersonaliseerde 3D LP-houder gemodelleerd in Blender.", engineTag: "Blender 3D", tonePitch: "C4" },
    { id: 1, title: "SOUNDDOG BREDA", category: "ARCHIEF 02: WEB & CMS", indexStr: "02 / 06", services: "Web Design & Development\nCMS & SMS Integratie\nGothic Magazine Styling", description: ["Een op maat gemaakt webplatform ontworpen voor live muzieklocatie Sound Dog in Breda. De site heeft een uitgesproken gothic magazine stijl die perfect past bij het rauwe, authentieke karakter van de zaal.", "Het platform beschikt over een eenvoudig beheersysteem (CMS/SMS-achtergrond) waarmee de crew zelf gemakkelijk de concertplanning kan posten, optredens kan wijzigen, foto's kan uploaden en zaalhuur-tarieven kan aanpassen."], popoverSummary: "Gothic magazine stijl website voor Sound Dog Breda inclusief planning en beheerpaneel.", engineTag: "Web // CMS", tonePitch: "E4" },
    { id: 2, title: "MACOS PORTFOLIO", category: "ARCHIEF 03: INTERACTION", indexStr: "03 / 06", services: "HTML & JavaScript\nOperating System UI\nAmbient Audio Design", description: ["In plaats van een traditionele scrollende website is dit portfolio vormgegeven als een complete macOS desktop omgeving. Bezoekers hebben het gevoel dat ze rechtstreeks in mijn computer navigeren via vensters, iconen en mappen.", "De interactieve ervaring is verrijkt met een zelf gecomponeerde soundtrack die kan worden afgespeeld via een nostalgische iPod-widget op het bureaublad, wat zorgt voor een immersieve, tactiele sfeer."], popoverSummary: "Een portfolio vermomd als macOS desktop met interactieve vensters en zelfgemaakte muziek.", engineTag: "HTML // JS", tonePitch: "G4" },
    { id: 3, title: "ROOM // HORROR", category: "ARCHIEF 04: GAME DESIGN", indexStr: "04 / 06", services: "RPG Maker\n8-Bit Pixel Art\nNarratieve Gotische Horror", description: ["Een sfeervolle 8-bit gotische horror game ontwikkeld in RPG Maker. Het concept vertrekt vanuit een intieme setting: de levels en maps zijn direct gemodelleerd naar mijn eigen kamer en leefomgeving.", "Door herkenbare alledaagse ruimtes te combineren met gotische spanning, custom sprite-designs en donkere pixel-art ontstaat een beklemmende en persoonlijke spelervaring."], popoverSummary: "Gotische 8-bit horror game gemaakt in RPG Maker met levels gebaseerd op mijn eigen kamer.", engineTag: "RPG Maker", tonePitch: "A4" },
    { id: 4, title: "LUNORA GARDEN", category: "ARCHIEF 05: 3D WORLD", indexStr: "05 / 06", services: "Unity 3D Engine\nOmgevingsontwerp\nSelf-Care App Concept", description: ["Een kalmerende virtuele Zen Garden ontworpen voor Lunora, een hypothetische self-care en wellness applicatie. Het doel was om de gebruiker onder te dompelen in een rustgevende, dromerige 3D-wereld.", "De tuin heeft een kenmerkend paars kleurenpalet en is opgebouwd met klassieke marmeren standbeelden, zacht kaarslicht, kabbelend water en serene wandelpaden voor ontspanning en mindfulness."], popoverSummary: "Rustgevende paarse 3D Zen Garden in Unity voor de hypothetische self-care app Lunora.", engineTag: "Unity 3D", tonePitch: "B4" },
    { id: 5, title: "POWERPUFF RPG", category: "ARCHIEF 06: GAME PORTFOLIO", indexStr: "06 / 06", services: "HTML & JavaScript\n2D Game Development\nGamified Portfolio", description: ["Een speelbare portfolio-website vermomd als een retro 2D avonturengame in Powerpuff-stijl. De bezoeker bestuurt mijn gepixelde avatar die zich verplaatst tussen huis, de supermarkt en school.", "Onderweg ontdek je interactieve boeken waarin docenten en beoordelaars mijn officiële leeruitkomsten en projectdocumentatie op een speelse, memorabele manier konden lezen."], popoverSummary: "Gamified portfolio waarin je door een interactieve 2D-wereld loopt en leeruitkomsten leest via boeken.", engineTag: "HTML // JS", tonePitch: "C5" }
  ],
  en: [
    { id: 0, title: "SANRIO CHESS", category: "ARCHIVE 01: 3D MODELLING", indexStr: "01 / 06", services: "Blender 3D\nCharacter Design\nProduct Sculpting", description: ["For this 3D sculpting assignment, I designed a bespoke chess set utilizing iconic Sanrio characters. The project featured custom sculpts including a Kuromi Knight and a Cinnamoroll King, harmonizing cute aesthetics with clean 3D geometry.", "Additionally, I created a full 3D sculpt of my classmate who is deeply passionate about vinyl records. As a personalized piece, I designed and modeled a custom vinyl LP stand tailored to his style."], popoverSummary: "Kuromi Knight, Cinnamoroll King & a personalized 3D LP record stand created in Blender.", engineTag: "Blender 3D", tonePitch: "C4" },
    { id: 1, title: "SOUNDDOG BREDA", category: "ARCHIVE 02: WEB & CMS", indexStr: "02 / 06", services: "Web Design & Development\nCMS & Admin Architecture\nGothic Magazine Styling", description: ["A tailored web platform developed for live music venue Sound Dog in Breda. The visual identity embraces a gothic magazine editorial look that reflects the underground, authentic energy of the venue.", "The site includes a clean content management background allowing the crew to effortlessly post concert schedules, update show listings, upload live photographs, and modify rehearsal studio booking rates."], popoverSummary: "Gothic magazine style website for Sound Dog Breda with concert scheduling and admin CMS.", engineTag: "Web // CMS", tonePitch: "E4" },
    { id: 2, title: "MACOS PORTFOLIO", category: "ARCHIVE 03: INTERACTION", indexStr: "03 / 06", services: "HTML & JavaScript\nOperating System UI\nAmbient Audio Design", description: ["Rather than a standard scrolling page, this portfolio is built as a complete macOS desktop experience. Visitors interact directly with desktop folders, finder windows, and app icons as if operating inside a personal computer.", "The project includes an original self-composed soundtrack embedded inside a nostalgic desktop iPod widget, crafting a tactile and atmospheric digital environment."], popoverSummary: "An interactive portfolio structured like a macOS desktop with custom sound and an iPod player.", engineTag: "HTML // JS", tonePitch: "G4" },
    { id: 3, title: "ROOM // HORROR", category: "ARCHIVE 04: GAME DESIGN", indexStr: "04 / 06", services: "RPG Maker\n8-Bit Pixel Art\nNarrative Gothic Horror", description: ["An atmospheric 8-bit gothic horror game developed in RPG Maker. The environment was directly drafted from my own personal room and familiar everyday spaces to build an intimate sense of unease.", "By juxtaposing comforting surroundings with eerie gothic storytelling, custom pixel character sprites, and dark ambient sound, the game constructs an eerie and personal narrative."], popoverSummary: "Gothic 8-bit horror game developed in RPG Maker with maps designed after my personal room.", engineTag: "RPG Maker", tonePitch: "A4" },
    { id: 4, title: "LUNORA GARDEN", category: "ARCHIVE 05: 3D WORLD", indexStr: "05 / 06", services: "Unity 3D Engine\nEnvironment Design\nSelf-Care App Concept", description: ["A tranquil virtual Zen Garden created for Lunora, a conceptual self-care and mental wellness app. The environment invites users into an ethereal, calming 3D refuge.", "Bathed in a soothing violet light, the garden features classical statues, flickering candles, quiet water features, and classical architectural elements tailored for relaxation."], popoverSummary: "A calming violet 3D Zen Garden built in Unity for the hypothetical self-care app Lunora.", engineTag: "Unity 3D", tonePitch: "B4" },
    { id: 5, title: "POWERPUFF RPG", category: "ARCHIVE 06: GAME PORTFOLIO", indexStr: "06 / 06", services: "HTML & JavaScript\n2D Game Development\nGamified Portfolio", description: ["A gamified portfolio experience styled like a nostalgic 2D Powerpuff adventure. Players control my pixel avatar roaming through town between school, groceries, and home.", "Scattered across the map are interactive books where teachers and reviewers can examine my semester learning outcomes and design processes directly inside the game."], popoverSummary: "A playable 2D game portfolio where professors explore my learning outcomes through interactive books.", engineTag: "HTML // JS", tonePitch: "C5" }
  ]
};


/* Consistente tekstjes voor elk vak: index, tool, titel, categorie en één regel uitleg */
const descriptors = {
  nl: ["Kuromi Knight, Cinnamoroll King & LP-houder", "Gothic magazine, planning & beheer", "macOS-desktop, iPod & eigen soundtrack", "Eigen kamer, custom maps & karakters", "Zen garden, standbeelden & kaarslicht", "Door het dorp, leeruitkomsten in boeken"],
  en: ["Kuromi Knight, Cinnamoroll King & LP stand", "Gothic magazine, schedule & admin", "macOS desktop, iPod & custom soundtrack", "My own room, custom maps & characters", "Zen garden, statues & candlelight", "Through the town, learning outcomes in books"]
};

/* Per vak: kant waar de foto bij hover staat (right = rechts van de tekst, left = links),
   hoe ver de foto in rust over de rand hangt (ro), hoogte in het vak (ry), beeldverhouding en hoogte */
const CELLS = [
  { cls: 'lg-divider-r lg-divider-b border-b-[2px] lg:border-b-0', side: 'right', ro: '36px', ry: '55%', ar: '2 / 3', ph: '80%', img: 'https://i.pinimg.com/736x/75/13/27/7513276390ed3eeff2d9f25839318ace.jpg' },
  { cls: 'lg-divider-b border-b-[2px] lg:border-b-0', side: 'left', ro: '24px', ry: '60%', ar: '16 / 10', ph: '62%', img: 'https://i.pinimg.com/736x/b8/73/30/b873302595741b7ba9321f0d911ca72a.jpg' },
  { cls: 'lg-divider-r lg-divider-b border-b-[2px] lg:border-b-0', side: 'right', ro: '44px', ry: '30%', ar: '16 / 10', ph: '60%', img: 'https://i.pinimg.com/736x/5e/60/70/5e60702e8474cf20f7272203af620c0f.jpg' },
  { cls: 'lg-divider-b border-b-[2px] lg:border-b-0', side: 'left', ro: '30px', ry: '62%', ar: '4 / 3', ph: '66%', img: 'https://i.pinimg.com/736x/5f/56/ce/5f56ced15deb506f1ec69f26433bb61b.jpg' },
  { cls: 'lg-divider-r border-b-[2px] lg:border-b-0', side: 'right', ro: '40px', ry: '58%', ar: '3 / 4', ph: '78%', img: 'https://i.pinimg.com/736x/a4/05/72/a40572fca98801b5f639cd6fc9039d7b.jpg' },
  { cls: '', side: 'left', ro: '22px', ry: '38%', ar: '2 / 3', ph: '80%', img: 'https://i.pinimg.com/736x/02/74/1f/02741fd796a24c464d2da3febf11e004.jpg' }
];

/* rusthoogte van elke rij (zelfde als --row-1/2/3 in globals.css, totaal 3.2) */
const ROW_FR = [1.15, 0.95, 1.1];

/* vaste "willekeurige" verschuiving (zelfde op server en client), altijd naar binnen */
const rnd = (i, k) => { const x = Math.sin((i + 1) * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
const jit = (i, k, min, max) => `${Math.round(min + rnd(i, k) * (max - min))}px`;

function MediaViewer({ media, caption, className = "w-full h-full object-cover block" }) {
  const { lang } = useSite();
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const url = media && typeof media.url === 'string' ? media.url.trim() : '';
  const isVideo = !!media && (media.type === 'video' || /\.(mov|mp4|m4v|webm)$/i.test(url));
  const src = url ? encodeURI(url) : '';

  // niets geüpload, nog niet klaar of niet te laden: nette plek in plaats van een kapot beeld
  if (MEDIA_COMING_SOON || !url || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-neutral-100 px-4 text-center">
        <span className="font-sans-clean text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
          {isVideo ? 'Video coming soon' : 'Image coming soon'}
        </span>
      </div>
    );
  }

  if (isVideo) {
    const type = /\.webm$/i.test(url) ? 'video/webm' : 'video/mp4'; // .mov met H.264 speelt als mp4
    const start = () => {
      const v = videoRef.current;
      if (!v) return;
      setPlaying(true);
      const r = v.play();
      if (r && r.catch) r.catch(() => setFailed(true));
    };
    return (
      <div className="relative h-full w-full bg-black">
        <video
          ref={videoRef}
          poster={media.poster ? encodeURI(media.poster) : undefined}
          controls={playing}
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onEnded={() => setPlaying(false)}
          onError={() => setFailed(true)}
          className="h-full w-full bg-black object-contain block"
        >
          <source src={src} type={type} onError={() => setFailed(true)} />
        </video>
        {!playing && (
          <button
            type="button"
            onClick={start}
            aria-label={lang === 'nl' ? 'Video afspelen' : 'Play video'}
            className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/10 transition hover:bg-black/20"
          >
            <span className="mac-glass-play-btn flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16">
              <Play className="ml-0.5 h-6 w-6 fill-black text-black" />
            </span>
          </button>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={caption || ''}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

/* "ARCHIEF 03: INTERACTION" -> "INTERACTION" (nummers alleen op het hoofdraster) */
const stripNum = (cat) => (cat.includes(': ') ? cat.split(': ')[1] : cat);

/* true = ALLE projectbeelden op "coming soon"; lege url's ("") tonen altijd "coming soon" */
const MEDIA_COMING_SOON = false;

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
    handleCellLeave();
    setActiveModalIdx(idx);
    window.scrollTo(0, 0);
    if (playHover) playHover(sectionsData[lang][idx].tonePitch);
  };

  const closeProject = useCallback(() => {
    setActiveModalIdx(null);
    window.scrollTo(0, 0);
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
    window.scrollTo(0, 0);
    if (playHover) playHover(list[nxt].tonePitch);
  };

  const prevProject = () => {
    const list = sectionsData[lang];
    const prv = (activeModalIdx - 1 + list.length) % list.length;
    setActiveModalIdx(prv);
    window.scrollTo(0, 0);
    if (playHover) playHover(list[prv].tonePitch);
  };

  const toggleInlinePopover = (e, id, pitch) => {
    e.stopPropagation();
    clampPopover(e.currentTarget);
    setOpenPopoverId(openPopoverId === id ? null : id);
    if (pitch && playHover) playHover(pitch);
  };

  const currentProject = activeModalIdx !== null ? sectionsData[lang][activeModalIdx] : null;
  const currentMediaRows = activeModalIdx !== null ? (sharedMedia[activeModalIdx] || []) : [];

  return (
    <>
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

      <div className={`calm-haze-entry w-full max-w-[1500px] mx-auto ${activeModalIdx !== null ? 'hidden' : ''}`}>
        <main className={`editorial-grid grid grid-cols-1 lg:grid-cols-2 lg:h-[var(--grid-h)] border-[2px] sm:border-[3px] border-black bg-white ${hoverGridClass}`}>

          {sectionsData[lang].map((p, i) => {
            const c = CELLS[i];
            const cat = p.category.includes(': ') ? p.category.split(': ')[1] : p.category;
            return (
              <div
                key={p.id}
                className={`grid-cell cell ${c.cls} border-black ${hoveredCell === i ? 'is-hovered' : ''}`}
                data-cell={i}
                data-side={c.side}
                style={{ '--ro': c.ro, '--ry': c.ry, '--ar': c.ar, '--ph': c.ph, '--rf': ROW_FR[Math.floor(i / 2)], '--ph-n': parseFloat(c.ph) / 100 }}
                onClick={() => openProject(i)}
                onMouseEnter={(e) => handleCellEnter(i, i % 2, Math.floor(i / 2), e)}
                onMouseLeave={handleCellLeave}
              >
                <div className="cell-body">
                  <div className="cell-row">
                    <span className="cell-meta cell-index font-serif-luxury weight-ultra-thin" style={{ '--dx': jit(i, 1, 8, 40), '--dy': jit(i, 2, 2, 20) }}>
                      {p.indexStr}
                    </span>
                    <span className="cell-meta cell-tool font-sans-clean" style={{ '--dx': jit(i, 3, 8, 40), '--dy': jit(i, 4, 6, 28) }}>
                      {p.engineTag} ↗
                    </span>
                  </div>

                  <h2 className="cell-meta cell-title font-serif-luxury weight-thin" style={{ '--dx': jit(i, 5, 0, 50), '--dy': jit(i, 6, -8, 8) }}>
                    {p.title}
                  </h2>

                  <div className="cell-meta cell-foot font-sans-clean" style={{ '--dx': jit(i, 7, 10, 70), '--dy': `-${jit(i, 8, 2, 14)}` }}>
                    <span className="cell-cat">{cat}</span>
                    <span className="cell-desc">{descriptors[lang][i]}</span>
                  </div>
                </div>

                <div className="cell-photo">
                  <img src={c.img} alt={p.title} className="block h-full w-full object-cover" />
                </div>
              </div>
            );
          })}
        </main>

      </div>

      {/* Project modal */}
      {activeModalIdx !== null && currentProject && (
        <div key={activeModalIdx} className="calm-haze-entry w-full max-w-[1500px] mx-auto">
          <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md py-4 border-b border-neutral-100 flex items-center justify-between font-editorial-nav text-[12px] sm:text-xs uppercase font-medium select-none">
            <button onClick={closeProject} className="flex items-center gap-2 tracking-[0.2em] font-semibold text-black hover:opacity-60 transition cursor-pointer">
              <span className="text-sm">✕</span> <span>{lang === 'nl' ? 'SLUITEN' : 'CLOSE'}</span>
            </button>
            <div className="flex items-center gap-4">
              <button onClick={prevProject} className="hover:opacity-60 transition cursor-pointer">{lang === 'nl' ? '← VORIG' : '← PREV'}</button>
              <span>•</span>
              <button onClick={nextProject} className="hover:opacity-60 transition cursor-pointer">{lang === 'nl' ? 'VOLGEND →' : 'NEXT →'}</button>
            </div>
          </div>

          <div className="pt-8 pb-12">
            <section className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 pb-10 sm:pb-16 items-start">
              <div className="md:col-span-4">
                <h1 className="text-3xl sm:text-5xl lg:text-7xl font-serif-luxury weight-ultra-thin tracking-tight uppercase leading-none text-black m-0 p-0">
                  {currentProject.title}
                </h1>
              </div>

              <div className="md:col-span-3 space-y-4 sm:space-y-6 text-xs sm:text-[13px] leading-relaxed font-sans-clean">
                <div>
                  <span className="block font-editorial-nav uppercase tracking-widest text-[10px] text-neutral-400 font-semibold mb-1">Engine & Tools</span>
                  <div className="font-normal text-neutral-900 whitespace-pre-line leading-relaxed">{currentProject.services}</div>
                </div>
                <div>
                  <span className="block font-editorial-nav uppercase tracking-widest text-[10px] text-neutral-400 font-semibold mb-1">Discipline</span>
                  <div className="font-normal text-neutral-900">{stripNum(currentProject.category)}</div>
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

            {/* vorige / volgende onderaan, als je klaar bent met lezen */}
            <nav className="mt-16 grid grid-cols-2 border-t-[3px] border-black pt-6 font-editorial-nav uppercase sm:mt-24">
              <button onClick={prevProject} className="group flex cursor-pointer flex-col items-start gap-2 text-left transition hover:opacity-60">
                <span className="text-[11px] font-semibold tracking-[0.2em] text-neutral-500">{lang === 'nl' ? '← Vorig project' : '← Previous project'}</span>
                <span className="font-serif-luxury weight-thin text-xl normal-case tracking-tight text-black sm:text-3xl lg:text-4xl" style={{ letterSpacing: 0 }}>
                  {sectionsData[lang][(activeModalIdx - 1 + sectionsData[lang].length) % sectionsData[lang].length].title}
                </span>
              </button>
              <button onClick={nextProject} className="group flex cursor-pointer flex-col items-end gap-2 text-right transition hover:opacity-60">
                <span className="text-[11px] font-semibold tracking-[0.2em] text-neutral-500">{lang === 'nl' ? 'Volgend project →' : 'Next project →'}</span>
                <span className="font-serif-luxury weight-thin text-xl normal-case tracking-tight text-black sm:text-3xl lg:text-4xl" style={{ letterSpacing: 0 }}>
                  {sectionsData[lang][(activeModalIdx + 1) % sectionsData[lang].length].title}
                </span>
              </button>
            </nav>
          </div>
        </div>
      )}

    </div>
    <SiteFooter />
    </>
  );
}