'use client';
import { useState, useRef } from 'react';
import Navigation from '@/components/Navigation';
import { playNote, playChord } from '@/lib/audio';
import { X, Play, Maximize } from 'lucide-react';

const projects = [
  {
    id: 0,
    title: "SANRIO CHESS",
    category: "3D SCULPTING // 01",
    subtitle: "Kuromi Knight, Cinnamoroll & LP Stand",
    engine: "Blender 3D",
    date: "01.16.2026",
    pitch: "C4",
    image: "https://i.pinimg.com/736x/75/13/27/7513276390ed3eeff2d9f25839318ace.jpg",
    desc: [
      "Voor dit 3D-project heb ik een unieke set schaakstukken ontworpen gebaseerd op bekende Sanrio karakters. Kuromi Knight gemodelleerd en Cinnamoroll King, waarbij schattige esthetiek gecombineerd werd met strakke 3D geometrie.",
      "Daarnaast heb ik binnen hetzelfde traject een 3D-model gemaakt van mijn klasgenoot, met een op maat gemaakte LP-houder."
    ]
  },
  {
    id: 1,
    title: "SOUNDDOG [BREDA]",
    category: "WEB // CMS 02",
    subtitle: "Gothic Magazine // Timetable",
    engine: "Web CMS",
    date: "02.10.2026",
    pitch: "E4",
    image: "https://i.pinimg.com/736x/b8/73/30/b873302595741b7ba9321f0d911ca72a.jpg",
    desc: [
      "Een op maat gemaakt webplatform ontworpen voor live muzieklocatie Sound Dog in Breda met magazine stijl en concertplanning beheer."
    ]
  },
  {
    id: 2,
    title: "SYSTEM DESKTOP",
    category: "MACOS // AUDIO 03",
    subtitle: "Inclusief iPod & Custom Soundtrack",
    engine: "macOS Prototype",
    date: "03.04.2026",
    pitch: "G4",
    image: "https://i.pinimg.com/736x/5e/60/70/5e60702e8474cf20f7272203af620c0f.jpg",
    desc: [
      "Een interactieve macOS desktopomgeving inclusief functionerende widgets en een custom audiotrack."
    ]
  },
  {
    id: 3,
    title: "ROOM // HORROR",
    category: "RPG MAKER 04",
    subtitle: "8-Bit Gothic Horror Game",
    engine: "RPG Maker",
    date: "04.20.2026",
    pitch: "A4",
    image: "https://i.pinimg.com/736x/5f/56/ce/5f56ced15deb506f1ec69f26433bb61b.jpg",
    desc: [
      "Een gotische 8-bit horror game met kaarten gemodelleerd naar mijn eigen kamer."
    ]
  },
  {
    id: 4,
    title: "LUNORA",
    category: "UNITY 3D 05",
    subtitle: "Zen Garden & Standbeelden",
    engine: "Unity 3D",
    date: "05.15.2026",
    pitch: "B4",
    image: "https://i.pinimg.com/736x/a4/05/72/a40572fca98801b5f639cd6fc9039d7b.jpg",
    desc: [
      "Een meditatieve 3D Zen Garden met kalmerende lila verlichting en marmeren beelden."
    ]
  },
  {
    id: 5,
    title: "POWERPUFF",
    category: "2D ENGINE 06",
    subtitle: "Interactive World Game",
    engine: "2D Game Engine",
    date: "06.01.2026",
    pitch: "C5",
    image: "https://i.pinimg.com/736x/02/74/1f/02741fd796a24c464d2da3febf11e004.jpg",
    desc: [
      "Een gamified 2D school- en dorpomgeving waarin leeruitkomsten interactief ontdekt kunnen worden."
    ]
  }
];

export default function ArchivePage() {
  const [lang, setLang] = useState('nl');
  const [audioActive, setAudioActive] = useState(false);
  const [hoverGridClass, setHoverGridClass] = useState('');
  const [activeProject, setActiveProject] = useState(null);

  const toggleAudio = () => {
    setAudioActive(!audioActive);
    if (!audioActive) playChord(['C5', 'G5']);
  };

  const handleCellHover = (col, row, pitch) => {
    setHoverGridClass(`hover-c${col}-r${row}`);
    if (audioActive) playNote(pitch);
  };

  return (
    <div className="min-h-screen pt-8 md:pt-10 px-8 md:px-14 lg:px-16 pb-20">
      <div className="max-w-[1600px] mx-auto">
        <Navigation 
          lang={lang} 
          setLang={setLang} 
          audioActive={audioActive} 
          toggleAudio={toggleAudio} 
          currentRoute="archive" 
        />

        <main className={`editorial-grid grid grid-cols-1 lg:grid-cols-2 border-[2px] sm:border-[3px] border-black bg-white ${hoverGridClass}`}>
          {projects.map((item, idx) => {
            const col = idx % 2;
            const row = Math.floor(idx / 2);
            return (
              <div
                key={item.id}
                onClick={() => setActiveProject(item)}
                onMouseEnter={() => handleCellHover(col, row, item.pitch)}
                onMouseLeave={() => setHoverGridClass('')}
                className="grid-cell lg-divider-r lg-divider-b border-b-[2px] lg:border-b-0 border-black p-5 sm:p-7 lg:p-10 flex flex-col justify-between min-h-[280px] cursor-pointer hover:bg-neutral-50/50"
              >
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light">{item.date}</span>
                    <span className="text-xs font-mono font-bold uppercase underline underline-offset-4">{item.engine} ↗</span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl uppercase font-light mt-4 leading-none">{item.title}</h2>
                  <p className="text-xs font-mono uppercase text-neutral-500 mt-2">{item.subtitle}</p>
                </div>

                <div className="w-full aspect-video bg-neutral-100 overflow-hidden mt-6">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
              </div>
            );
          })}
        </main>
      </div>

      {/* Expanded Project Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-white p-6 sm:p-14">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex justify-between items-center border-b pb-4 mb-8">
              <span className="font-mono text-xs uppercase">{activeProject.category}</span>
              <button 
                onClick={() => setActiveProject(null)} 
                className="flex items-center gap-1.5 font-mono text-xs uppercase font-bold hover:opacity-60"
              >
                <X className="w-4 h-4" /> CLOSE
              </button>
            </div>

            <h1 className="font-serif text-5xl sm:text-7xl font-light uppercase mb-6 leading-none">{activeProject.title}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
              <div className="md:col-span-8 space-y-4 text-lg leading-relaxed text-neutral-800">
                {activeProject.desc.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <div className="md:col-span-4 border-l pl-6 font-mono text-xs space-y-2 text-neutral-500">
                <div>ENGINE: {activeProject.engine}</div>
                <div>DISCIPLINE: Interactive Media</div>
              </div>
            </div>

            <div className="w-full aspect-video overflow-hidden bg-neutral-100">
              <img src={activeProject.image} alt={activeProject.title} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}