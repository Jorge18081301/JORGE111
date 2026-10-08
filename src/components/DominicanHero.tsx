import React from 'react';
import { METADATA, PARTICIPANTS } from '../data/guideData';
import { REAL_IMAGES } from '../assets/images/realImages';
import { Presentation, Download, ExternalLink, Calendar, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';
import { downloadStandaloneIndex } from '../utils/standaloneDownloader';

interface DominicanHeroProps {
  onOpenPresentation: () => void;
  onSelectParticipant: (id: string) => void;
  activeParticipantId?: string;
}

export const DominicanHero: React.FC<DominicanHeroProps> = ({
  onOpenPresentation,
  onSelectParticipant,
  activeParticipantId,
}) => {
  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200">
      {/* Flag Top Border */}
      <div className="h-2 w-full flex shadow-sm">
        <div className="flex-1 bg-[#002D62]"></div>
        <div className="flex-1 bg-[#CE1126]"></div>
        <div className="flex-1 bg-[#002D62]"></div>
        <div className="flex-1 bg-[#CE1126]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Info */}
          <div className="lg:col-span-7 space-y-5">
            {/* National Crest Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 shadow-xs">
              <img
                src={REAL_IMAGES.dominicanCoatOfArms}
                alt="Escudo de la República Dominicana"
                className="w-5 h-5 object-contain"
              />
              <span className="text-xs font-bold text-[#002D62] tracking-wide">
                Ciencias Sociales 6to de Secundaria · República Dominicana
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Reto 2: Analizamos la Economía de{' '}
              <span className="text-[#002D62] underline decoration-[#CE1126] decoration-4 underline-offset-4">
                Horacio Vásquez
              </span>{' '}
              <span className="text-slate-600 font-bold text-2xl sm:text-3xl">(1924–1930)</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Guía interactiva completa con la participación individual de{' '}
              <strong className="text-slate-900">Jorge</strong>,{' '}
              <strong className="text-slate-900">Briant</strong>,{' '}
              <strong className="text-slate-900">Eduin</strong> y{' '}
              <strong className="text-slate-900">Andrys</strong>. Con fotografías históricas reales, mapa digital 3D y simulador de empréstitos de 1926.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => {
                  soundEngine.playChime();
                  onOpenPresentation();
                }}
                className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-[#002D62] hover:bg-[#001D44] active:scale-95 rounded-xl transition-all shadow-md shadow-blue-950/20"
              >
                <Presentation className="w-4 h-4 text-sky-300" />
                Iniciar Modo Exposición (Pantalla Completa)
              </button>

              <button
                onClick={() => {
                  soundEngine.playChime();
                  downloadStandaloneIndex();
                }}
                className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border-2 border-slate-300 hover:border-[#CE1126] active:scale-95 rounded-xl transition-all shadow-xs"
              >
                <Download className="w-4 h-4 text-[#CE1126]" />
                Descargar index.html (Idéntico y Offline)
              </button>
            </div>

            {/* Reference Source */}
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              <span>Fuente consultada:</span>
              <a
                href={METADATA.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#002D62] hover:text-[#CE1126] font-semibold inline-flex items-center gap-1 transition-colors"
              >
                {METADATA.sourceName} <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Real Historical Photograph Card (Horacio Vasquez 1924 Real Archive) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-900 shadow-xl group">
              {/* Flag Badge Accent */}
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs font-bold">
                <img src={REAL_IMAGES.dominicanFlag} alt="RD" className="w-4 h-3 object-cover rounded-xs" />
                <span>Foto Histórica Real (1924)</span>
              </div>

              <div className="aspect-[4/3] relative bg-slate-950">
                <img
                  src={REAL_IMAGES.horacioVasquez1924}
                  alt="Presidente Horacio Vásquez (Fotografía histórica real de 1924)"
                  className="w-full h-full object-cover object-top filter contrast-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = REAL_IMAGES.horacioVasquezLoc;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              </div>

              <div className="p-4 sm:p-5 relative bg-slate-950 text-white border-t border-slate-800">
                <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-1">
                  <span>Presidente de la República Dominicana</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> 12 de Julio de 1924
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  Gral. Horacio Vásquez Lajara
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Gobernó de 1924 a 1930. Gestionó el empréstito de $25,000,000 USD y emitió en 1926 los primeros $5,000,000 en bonos para obras públicas y saneamiento de deudas.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Participants Direct Stepper Navigation */}
        <div className="mt-10 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Equipo de 4 Integrantes · Haz clic en cualquiera para navegar:
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PARTICIPANTS.map((participant, index) => {
              const isSelected = activeParticipantId === participant.id;
              const isEven = index % 2 === 1;
              return (
                <button
                  key={participant.id}
                  onClick={() => {
                    soundEngine.playClick();
                    onSelectParticipant(participant.id);
                  }}
                  className={`p-4 rounded-xl border-2 text-left transition-all group ${
                    isSelected
                      ? isEven
                        ? 'border-[#CE1126] bg-red-50/50 shadow-sm ring-2 ring-[#CE1126]/30'
                        : 'border-[#002D62] bg-blue-50/50 shadow-sm ring-2 ring-[#002D62]/30'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-xs font-extrabold px-2 py-0.5 rounded ${
                        isEven ? 'bg-red-100 text-[#CE1126]' : 'bg-blue-100 text-[#002D62]'
                      }`}
                    >
                      Parte {index + 1} · Pregunta {participant.questionNumber}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-[#002D62]">
                    {participant.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{participant.role}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
