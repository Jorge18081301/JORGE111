import React, { useState } from 'react';
import { ANDRYS_CONTENT, METADATA } from '../data/guideData';
import { REAL_IMAGES } from '../assets/images/realImages';
import { ShieldCheck, ArrowRight, ArrowLeft, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

interface ParticipantAndrysProps {
  onGoPrev?: () => void;
  onGoNext?: () => void;
}

export const ParticipantAndrys: React.FC<ParticipantAndrysProps> = ({ onGoPrev, onGoNext }) => {
  const [selectedDataIndex, setSelectedDataIndex] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-2xl border-2 border-red-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Header with Dominican Red and Participant Banner */}
      <div className="bg-gradient-to-r from-[#CE1126] via-[#B20E20] to-[#800A17] text-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-xl font-bold text-white shadow-inner">
              A
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-rose-200 uppercase tracking-wider">
                <span>Participante 4 · Andrys</span>
                <span aria-hidden="true">·</span>
                <span>Pregunta 8 y Datos de Apoyo</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mt-0.5">
                {ANDRYS_CONTENT.question}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/15 px-3 py-1.5 rounded-lg border border-white/20 text-xs font-semibold text-rose-100">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>Tema: Evaluación Crítica & Datos Oficiales</span>
          </div>
        </div>

        {/* Respuesta Textual Fiel al PDF */}
        <div className="mt-6 bg-white/10 border border-white/15 rounded-xl p-5 text-sm sm:text-base text-rose-50 leading-relaxed">
          <div className="text-xs uppercase font-bold text-amber-300 tracking-wider mb-1.5 flex items-center gap-1.5">
            <span>Respuesta Concluyente del Documento</span>
          </div>
          <p className="font-medium text-white/95">
            "{ANDRYS_CONTENT.fullResponse}"
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Las 3 Condiciones Extraídas */}
        <div>
          <div className="text-xs font-bold text-[#CE1126] uppercase tracking-wider mb-1">
            Principios Extraídos de la Respuesta
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-4">
            ¿Cuándo es conveniente el endeudamiento público?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ANDRYS_CONTENT.keyConditions.map((cond, idx) => (
              <div key={idx} className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4">
                <div className="w-7 h-7 rounded-full bg-[#CE1126] text-white flex items-center justify-center text-xs font-extrabold mb-2.5 shadow-xs">
                  {idx + 1}
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm">{cond.title}</h4>
                <p className="text-xs text-slate-700 mt-1.5 leading-relaxed font-medium">
                  {cond.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Los 5 Datos de Apoyo del Caso Estudiado */}
        <div className="pt-6 border-t border-slate-200">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Evidencia Histórica del Documento
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                Datos de apoyo del caso estudiado
              </h3>
            </div>
            <span className="text-xs font-extrabold text-[#002D62] bg-blue-100 px-3 py-1 rounded-full">
              5 Datos Oficiales
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* 5 datos lista interactiva */}
            <div className="lg:col-span-7 space-y-3">
              {ANDRYS_CONTENT.supportData.map((data, index) => {
                const isHovered = selectedDataIndex === index;
                return (
                  <div
                    key={data.id}
                    onMouseEnter={() => setSelectedDataIndex(index)}
                    onClick={() => {
                      setSelectedDataIndex(index);
                      soundEngine.playClick();
                    }}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      isHovered
                        ? 'border-[#002D62] bg-blue-50/70 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#002D62] text-white flex items-center justify-center text-xs font-extrabold mt-0.5 shrink-0 shadow-xs">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-slate-900 leading-snug">
                          {data.point}
                        </p>
                        {data.detail && (
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                            {data.detail}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Archivo Histórico Real y Fuente */}
            <div className="lg:col-span-5 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 p-2 shadow-md">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-950">
                <img
                  src={REAL_IMAGES.horacioVasquezFormal}
                  alt="General Horacio Vásquez República Dominicana 1924"
                  className="w-full h-full object-cover filter contrast-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = REAL_IMAGES.horacioVasquez1924;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-4">
                  <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">
                    Archivo Histórico (1924)
                  </span>
                  <h4 className="text-white font-bold text-sm">
                    Gral. Horacio Vásquez y su Gabinete
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Acueducto, carreteras, puertos, riego y escuelas.
                  </p>
                </div>
              </div>

              {/* Source Box */}
              <div className="p-3 bg-slate-950 rounded-lg mt-2 text-xs text-slate-400 border border-slate-800 flex items-start justify-between gap-2">
                <div>
                  <span className="text-slate-200 font-bold">Fuente consultada:</span>
                  <p className="text-slate-400 mt-0.5 leading-snug">
                    El gobierno de Horacio Vásquez (1924–1930), Ciencias Sociales de 6to de Secundaria, blog El Profe Yovanny.
                  </p>
                </div>
                <a
                  href={METADATA.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:text-sky-300 shrink-0 p-1.5 rounded hover:bg-slate-800 transition-colors"
                  title="Abrir fuente original en blog"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM NAVIGATION: PREV & NEXT TO 3D MODELS */}
        <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          {onGoPrev && (
            <button
              onClick={() => {
                soundEngine.playTransition();
                onGoPrev();
              }}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 rounded-xl transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior: Eduin (Pregunta 7)</span>
            </button>
          )}

          {onGoNext && (
            <button
              onClick={() => {
                soundEngine.playChime();
                onGoNext();
              }}
              className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#002D62] hover:bg-[#001D44] active:scale-95 rounded-xl transition-all shadow-md shadow-blue-950/20"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Siguiente: Explorar Mapa 3D RD y Bolsa 3D</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
