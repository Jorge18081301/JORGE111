import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { DominicanHero } from './components/DominicanHero';
import { ParticipantJorge } from './components/ParticipantJorge';
import { ParticipantBriant } from './components/ParticipantBriant';
import { ParticipantEduin } from './components/ParticipantEduin';
import { ParticipantAndrys } from './components/ParticipantAndrys';
import { DominicanMap3D } from './components/DominicanMap3D';
import { MoneyBag3D } from './components/MoneyBag3D';
import { PresentationModal } from './components/PresentationModal';
import { METADATA, PARTICIPANTS } from './data/guideData';
import { REAL_IMAGES } from './assets/images/realImages';
import { Download, Presentation, Sparkles, ExternalLink, ArrowRight, Shield } from 'lucide-react';
import { downloadStandaloneIndex } from './utils/standaloneDownloader';
import { soundEngine } from './utils/soundEffects';

export default function App() {
  const [isPresentationOpen, setIsPresentationOpen] = useState<boolean>(false);
  const [initialSlide, setInitialSlide] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'all' | 'jorge' | 'briant' | 'eduin' | 'andrys'>('all');

  const openPresentationFor = (participantIndex: number) => {
    setInitialSlide(participantIndex + 1); // +1 because slide 0 is intro
    setIsPresentationOpen(true);
    soundEngine.playChime();
  };

  const navigateTo = (tabId: 'jorge' | 'briant' | 'eduin' | 'andrys' | 'mapa-3d') => {
    if (tabId === 'mapa-3d') {
      const el = document.getElementById('mapa-3d');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setActiveTab(tabId);
    setTimeout(() => {
      const el = document.getElementById(tabId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        onOpenPresentation={() => {
          setInitialSlide(0);
          setIsPresentationOpen(true);
        }}
        activeSection={activeTab}
      />

      {/* Hero Section with authentic historical photo & national crest */}
      <DominicanHero
        onOpenPresentation={() => {
          setInitialSlide(0);
          setIsPresentationOpen(true);
        }}
        onSelectParticipant={(id) => navigateTo(id as 'jorge' | 'briant' | 'eduin' | 'andrys')}
        activeParticipantId={activeTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Navigation Tabs for Participants */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Contenido Oficial de Ciencias Sociales 6to
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Los 4 Puntos Desarrollados del Reto 2
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl">
            <button
              onClick={() => {
                setActiveTab('all');
                soundEngine.playClick();
              }}
              className={`px-3 py-1.5 text-xs font-extrabold rounded-lg transition-all ${
                activeTab === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos los Integrantes
            </button>
            {PARTICIPANTS.map((p) => {
              const isSelected = activeTab === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setActiveTab(p.id);
                    soundEngine.playClick();
                  }}
                  className={`px-3 py-1.5 text-xs font-extrabold rounded-lg transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? p.id === 'jorge' || p.id === 'eduin'
                        ? 'bg-[#002D62] text-white shadow-sm'
                        : 'bg-[#CE1126] text-white shadow-sm'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <span>{p.name}</span>
                  <span className="opacity-75">(P{p.questionNumber})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 1. SECCIÓN JORGE (Pregunta 5) */}
        {(activeTab === 'all' || activeTab === 'jorge') && (
          <section id="jorge" className="scroll-mt-24 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#002D62] uppercase tracking-wider">
                Exposición 1 · Parte de Jorge
              </span>
              <button
                onClick={() => openPresentationFor(0)}
                className="text-xs font-bold text-[#002D62] hover:underline flex items-center gap-1"
              >
                <Presentation className="w-3.5 h-3.5" /> Presentar esta parte
              </button>
            </div>
            <ParticipantJorge onGoNext={() => navigateTo('briant')} />
          </section>
        )}

        {/* 2. SECCIÓN BRIANT (Pregunta 6) */}
        {(activeTab === 'all' || activeTab === 'briant') && (
          <section id="briant" className="scroll-mt-24 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#CE1126] uppercase tracking-wider">
                Exposición 2 · Parte de Briant
              </span>
              <button
                onClick={() => openPresentationFor(1)}
                className="text-xs font-bold text-[#CE1126] hover:underline flex items-center gap-1"
              >
                <Presentation className="w-3.5 h-3.5" /> Presentar esta parte
              </button>
            </div>
            <ParticipantBriant
              onGoPrev={() => navigateTo('jorge')}
              onGoNext={() => navigateTo('eduin')}
            />
          </section>
        )}

        {/* 3. SECCIÓN EDUIN (Pregunta 7) */}
        {(activeTab === 'all' || activeTab === 'eduin') && (
          <section id="eduin" className="scroll-mt-24 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#002D62] uppercase tracking-wider">
                Exposición 3 · Parte de Eduin
              </span>
              <button
                onClick={() => openPresentationFor(2)}
                className="text-xs font-bold text-[#002D62] hover:underline flex items-center gap-1"
              >
                <Presentation className="w-3.5 h-3.5" /> Presentar esta parte
              </button>
            </div>
            <ParticipantEduin
              onGoPrev={() => navigateTo('briant')}
              onGoNext={() => navigateTo('andrys')}
            />
          </section>
        )}

        {/* 4. SECCIÓN ANDRYS (Pregunta 8 y Datos de Apoyo) */}
        {(activeTab === 'all' || activeTab === 'andrys') && (
          <section id="andrys" className="scroll-mt-24 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#CE1126] uppercase tracking-wider">
                Exposición 4 · Parte de Andrys
              </span>
              <button
                onClick={() => openPresentationFor(3)}
                className="text-xs font-bold text-[#CE1126] hover:underline flex items-center gap-1"
              >
                <Presentation className="w-3.5 h-3.5" /> Presentar esta parte
              </button>
            </div>
            <ParticipantAndrys
              onGoPrev={() => navigateTo('eduin')}
              onGoNext={() => navigateTo('mapa-3d')}
            />
          </section>
        )}

        {/* SECCIÓN VISUALIZADORES 3D: MAPA RD + BOLSA DE DINERO */}
        <section className="pt-6 space-y-8">
          <div className="border-t border-slate-200 pt-8">
            <div className="flex items-center gap-2 text-xs font-extrabold text-sky-700 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>Modelos Tridimensionales Interactivos</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Mapa Digital 3D de RD y Bolsa de Dinero Histórica
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-3xl">
              Explora en 3D interactivo las obras del gobierno de Horacio Vásquez (acueducto de Santo Domingo, red de carreteras, puertos marítimos, proyectos de riego, escuelas) y el impacto financiero de los bonos emitidos a fines de 1926.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div id="mapa-3d" className="scroll-mt-24">
              <DominicanMap3D />
            </div>
            <div id="bolsa-3d" className="scroll-mt-24">
              <MoneyBag3D />
            </div>
          </div>
        </section>

        {/* BANNER DE DESCARGA DIRECTA DE INDEX */}
        <section className="bg-gradient-to-r from-[#002D62] via-[#001D40] to-[#CE1126] rounded-2xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <img src={REAL_IMAGES.dominicanCoatOfArms} alt="Escudo RD" className="w-6 h-6 object-contain" />
              <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-extrabold uppercase tracking-wider text-amber-300">
                Archivo Autónomo 100% Idéntico
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              ¿Deseas descargar el archivo index.html para abrirlo sin internet?
            </h3>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
              Al hacer clic en el botón, se descargará un archivo <code className="bg-white/20 px-1.5 py-0.5 rounded text-amber-200 font-mono text-xs font-bold">index.html</code> completamente idéntico a esta página web, con el diseño de la bandera dominicana, los 4 participantes, las fotos reales de Horacio Vásquez, el mapa interactivo y el modo de presentación integrado.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  soundEngine.playChime();
                  downloadStandaloneIndex();
                }}
                className="flex items-center gap-2 px-6 py-3.5 text-sm font-extrabold bg-white text-[#002D62] hover:bg-slate-100 active:scale-95 rounded-xl transition-all shadow-md"
              >
                <Download className="w-4 h-4 text-[#CE1126]" />
                Descargar index.html Ahora
              </button>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setIsPresentationOpen(true);
                }}
                className="flex items-center gap-2 px-6 py-3.5 text-sm font-extrabold bg-white/10 text-white hover:bg-white/20 border border-white/20 active:scale-95 rounded-xl transition-all"
              >
                <Presentation className="w-4 h-4 text-amber-300" />
                Iniciar Modo Exposición
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <img src={REAL_IMAGES.dominicanCoatOfArms} alt="RD" className="w-5 h-5 object-contain" />
                <span className="text-sm font-extrabold text-slate-900 ml-1">
                  Reto 2 · Economía del Gobierno de Horacio Vásquez (1924–1930)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Ciencias Sociales de 6to de Secundaria · Blog El Profe Yovanny
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-600 font-bold">
              <button
                onClick={() => {
                  soundEngine.playChime();
                  downloadStandaloneIndex();
                }}
                className="hover:text-[#CE1126] transition-colors flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5 text-[#CE1126]" /> Descargar index.html
              </button>
              <span>·</span>
              <a
                href={METADATA.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#002D62] transition-colors flex items-center gap-1"
              >
                Blog El Profe Yovanny <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 font-medium">
            <div>
              Integrantes: <strong className="text-slate-800">Jorge</strong> · <strong className="text-slate-800">Briant</strong> · <strong className="text-slate-800">Eduin</strong> · <strong className="text-slate-800">Andrys</strong>
            </div>
            <div>
              Toda la información proviene fielmente del documento oficial de Ciencias Sociales.
            </div>
          </div>
        </div>
      </footer>

      {/* Fullscreen Presentation Modal */}
      <PresentationModal
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
        initialSlide={initialSlide}
      />
    </div>
  );
}
