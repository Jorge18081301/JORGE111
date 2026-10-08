import React, { useState } from 'react';
import { EDUIN_CONTENT } from '../data/guideData';
import { GitCommit, ArrowRight, ArrowLeft, ChevronRight, FileText, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

interface ParticipantEduinProps {
  onGoPrev?: () => void;
  onGoNext?: () => void;
}

export const ParticipantEduin: React.FC<ParticipantEduinProps> = ({ onGoPrev, onGoNext }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const colors = [
    { border: 'border-blue-500', bg: 'bg-blue-50/80', badge: 'bg-[#002D62] text-white', accent: '#002D62' },
    { border: 'border-amber-500', bg: 'bg-amber-50/80', badge: 'bg-amber-600 text-white', accent: '#D97706' },
    { border: 'border-emerald-500', bg: 'bg-emerald-50/80', badge: 'bg-emerald-600 text-white', accent: '#059669' },
  ];

  return (
    <div className="bg-white rounded-2xl border-2 border-blue-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Header with Dominican Blue and Participant Banner */}
      <div className="bg-gradient-to-r from-[#002D62] via-[#0A3D78] to-[#1E3A8A] text-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-xl font-bold text-white shadow-inner">
              E
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-200 uppercase tracking-wider">
                <span>Participante 3 · Eduin</span>
                <span aria-hidden="true">·</span>
                <span>Pregunta 7 del Documento</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mt-0.5">
                {EDUIN_CONTENT.title}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/15 px-3 py-1.5 rounded-lg border border-white/20 text-xs font-semibold text-blue-100">
            <GitCommit className="w-4 h-4 text-emerald-300" />
            <span>Tema: Secuencia Causa-Efecto del Caso</span>
          </div>
        </div>

        <p className="mt-4 text-sm sm:text-base text-blue-100 max-w-2xl leading-relaxed font-medium">
          {EDUIN_CONTENT.subtitle}
        </p>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Tabla Estructurada Fiel al PDF */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <FileText className="w-4 h-4 text-[#002D62]" />
              <span>Tabla Estructurada Original del PDF</span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border-2 border-slate-200 shadow-xs">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100/90 border-b-2 border-slate-200 text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                  <th className="p-4 sm:p-5 w-1/3 border-r border-slate-200 text-[#002D62]">
                    1. CAUSA
                  </th>
                  <th className="p-4 sm:p-5 w-1/3 border-r border-slate-200 text-amber-700">
                    2. SITUACIÓN
                  </th>
                  <th className="p-4 sm:p-5 w-1/3 text-emerald-700">
                    3. CONSECUENCIA
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="align-top font-semibold text-slate-800">
                  <td className="p-4 sm:p-5 bg-blue-50/30 border-r border-slate-200 leading-relaxed">
                    {EDUIN_CONTENT.stages[0].content}
                  </td>
                  <td className="p-4 sm:p-5 bg-amber-50/30 border-r border-slate-200 leading-relaxed">
                    {EDUIN_CONTENT.stages[1].content}
                  </td>
                  <td className="p-4 sm:p-5 bg-emerald-50/30 leading-relaxed">
                    {EDUIN_CONTENT.stages[2].content}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Diagrama Interactivo de Flujo Animado */}
        <div>
          <div className="text-xs font-bold text-[#002D62] uppercase tracking-wider mb-2">
            Diagrama Secuencial Interactivo
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-4">
            Flujo de Consecuencias en la Economía:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
            {EDUIN_CONTENT.stages.map((stage, idx) => {
              const isSelected = activeStep === idx;
              const col = colors[idx];
              return (
                <div
                  key={stage.step}
                  onClick={() => {
                    setActiveStep(idx);
                    soundEngine.playClick();
                  }}
                  className={`cursor-pointer rounded-2xl border-2 p-5 transition-all relative ${
                    isSelected
                      ? `${col.border} ${col.bg} shadow-md scale-[1.02] ring-2 ring-blue-500/20`
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-extrabold tracking-wider ${col.badge}`}>
                      PASO {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-500 uppercase">
                      {stage.title}
                    </span>
                  </div>

                  <h4 className="text-base font-extrabold text-slate-900 mb-2">
                    {stage.title}
                  </h4>
                  <p className="text-sm text-slate-800 leading-relaxed font-semibold">
                    {stage.content}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>{isSelected ? '✓ Seleccionado' : 'Clic para enfocar'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM NAVIGATION: PREV & NEXT BUTTONS */}
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
              <span>Anterior: Briant (Pregunta 6)</span>
            </button>
          )}

          {onGoNext && (
            <button
              onClick={() => {
                soundEngine.playTransition();
                onGoNext();
              }}
              className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#CE1126] hover:bg-[#A00D1D] active:scale-95 rounded-xl transition-all shadow-md shadow-red-950/20"
            >
              <span>Siguiente: Ir a Andrys (Pregunta 8)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
