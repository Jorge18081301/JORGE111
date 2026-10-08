import React from 'react';
import { Presentation, Download, Globe2, BookOpen } from 'lucide-react';
import { downloadStandaloneIndex } from '../utils/standaloneDownloader';
import { soundEngine } from '../utils/soundEffects';

interface NavbarProps {
  onOpenPresentation: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPresentation }) => {
  const handleDownload = () => {
    soundEngine.playChime();
    downloadStandaloneIndex();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Subtle Dominican Flag 4-color strip */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-[#002D62]"></div>
        <div className="flex-1 bg-[#CE1126]"></div>
        <div className="flex-1 bg-[#002D62]"></div>
        <div className="flex-1 bg-[#CE1126]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand title (One single text element) */}
        <a href="#" className="flex items-center gap-2 group shrink-0">
          <span className="text-base sm:text-lg font-extrabold text-[#002D62] tracking-tight group-hover:text-blue-900 transition-colors">
            Reto 2 · Horacio Vásquez (1924–1930)
          </span>
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <a
            href="#jorge"
            onClick={() => soundEngine.playClick()}
            className="hover:text-[#002D62] transition-colors whitespace-nowrap"
          >
            Jorge (P5)
          </a>
          <a
            href="#briant"
            onClick={() => soundEngine.playClick()}
            className="hover:text-[#CE1126] transition-colors whitespace-nowrap"
          >
            Briant (P6)
          </a>
          <a
            href="#eduin"
            onClick={() => soundEngine.playClick()}
            className="hover:text-[#002D62] transition-colors whitespace-nowrap"
          >
            Eduin (P7)
          </a>
          <a
            href="#andrys"
            onClick={() => soundEngine.playClick()}
            className="hover:text-[#CE1126] transition-colors whitespace-nowrap"
          >
            Andrys (P8)
          </a>
          <a
            href="#mapa-3d"
            onClick={() => soundEngine.playClick()}
            className="hover:text-sky-600 transition-colors whitespace-nowrap"
          >
            Mapa 3D RD
          </a>
          <a
            href="#bolsa-3d"
            onClick={() => soundEngine.playClick()}
            className="hover:text-amber-600 transition-colors whitespace-nowrap"
          >
            Bolsa 3D
          </a>
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenPresentation();
            }}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold text-white bg-[#002D62] hover:bg-[#001D44] rounded-lg transition-colors shadow-sm whitespace-nowrap"
            title="Presentar en pantalla completa a la clase"
          >
            <Presentation className="w-4 h-4 text-sky-300" />
            <span className="hidden sm:inline">Modo</span> Exposición
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors whitespace-nowrap"
            title="Descargar index.html autónomo con toda la información y funciones offline"
          >
            <Download className="w-4 h-4 text-[#CE1126]" />
            <span className="hidden md:inline">Descargar</span> index.html
          </button>
        </div>
      </div>
    </header>
  );
};
