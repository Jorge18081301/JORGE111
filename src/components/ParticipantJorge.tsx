import React, { useState } from 'react';
import { JORGE_CONTENT } from '../data/guideData';
import { REAL_IMAGES } from '../assets/images/realImages';
import { CheckCircle2, AlertTriangle, Briefcase, Scale, ArrowRight, UserCheck } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

interface ParticipantJorgeProps {
  onGoNext?: () => void;
}

export const ParticipantJorge: React.FC<ParticipantJorgeProps> = ({ onGoNext }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'obras' | 'economia' | 'social'>('all');

  const filteredAdvantages = JORGE_CONTENT.advantages.filter((item) =>
    activeFilter === 'all' ? true : item.category === activeFilter
  );

  const filteredRisks = JORGE_CONTENT.risks.filter((item) =>
    activeFilter === 'all' ? true : item.category === activeFilter
  );

  return (
    <div className="bg-white rounded-2xl border-2 border-blue-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Header with Dominican Blue and Participant Banner */}
      <div className="bg-gradient-to-r from-[#002D62] via-[#001D40] to-[#0A3D78] text-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-xl font-bold text-white shadow-inner">
              J
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-200 uppercase tracking-wider">
                <span>Participante 1 · Jorge</span>
                <span aria-hidden="true">·</span>
                <span>Pregunta 5 del Documento</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mt-0.5">
                Imagínate que eres asesor económico del presidente Vásquez
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/15 px-3 py-1.5 rounded-lg border border-white/20 text-xs font-semibold text-blue-100">
            <Briefcase className="w-4 h-4 text-amber-300" />
            <span>Rol: Asesor Económico Presidencial</span>
          </div>
        </div>

        {/* Situation / Scenario from PDF with Real Archive Photo */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-white/10 border border-white/15 rounded-xl p-4 sm:p-5">
          <div className="md:col-span-8 text-sm sm:text-base text-blue-50 leading-relaxed">
            <div className="text-xs uppercase font-bold text-amber-300 tracking-wider mb-1.5 flex items-center gap-1.5">
              <span>Planteamiento Histórico del Caso</span>
            </div>
            <p className="italic font-medium">
              "{JORGE_CONTENT.scenario}"
            </p>
          </div>
          <div className="md:col-span-4 rounded-lg overflow-hidden border border-white/20 bg-slate-900 aspect-[4/3] relative">
            <img
              src={REAL_IMAGES.horacioVasquezLoc}
              alt="Gral. Horacio Vásquez (Archivo real Biblioteca del Congreso 1924)"
              className="w-full h-full object-cover filter contrast-105"
            />
            <div className="absolute bottom-0 inset-x-0 bg-black/75 p-1.5 text-[10px] text-center text-slate-300">
              Foto Real: Horacio Vásquez (LOC 1924)
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Sub-pregunta 1: ¿Qué problema debe resolver el gobierno? */}
        <div className="border-l-4 border-[#002D62] pl-4 sm:pl-6 py-1">
          <div className="text-xs font-bold text-[#002D62] uppercase tracking-wider mb-1">
            1. Diagnóstico del Problema Fiscal
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
            {JORGE_CONTENT.problem.question}
          </h3>
          <div className="mt-2 text-base text-slate-800 leading-relaxed font-semibold bg-blue-50/60 p-4 rounded-xl border border-blue-200">
            {JORGE_CONTENT.problem.answer}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
            {JORGE_CONTENT.problem.keyPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="w-2 h-2 rounded-full bg-[#002D62] mt-1.5 shrink-0"></span>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sub-pregunta 2: ¿Qué decisión tomarías? */}
        <div className="border-l-4 border-[#CE1126] pl-4 sm:pl-6 py-1">
          <div className="text-xs font-bold text-[#CE1126] uppercase tracking-wider mb-1">
            2. Decisión Económica Estratégica
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
            {JORGE_CONTENT.decision.question}
          </h3>
          <div className="mt-2 bg-red-50/70 p-4 rounded-xl border border-red-200 text-slate-900 font-semibold leading-relaxed">
            <p className="text-base text-[#CE1126] font-bold mb-2">
              "{JORGE_CONTENT.decision.answer}"
            </p>
            <div className="pt-2 border-t border-red-200/80 space-y-1.5 text-xs sm:text-sm text-slate-700 font-normal">
              {JORGE_CONTENT.decision.criteria.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sub-pregunta 3: ¿Qué ventajas y riesgos tendría tu decisión? */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                3. Matriz Comparativa del Asesor
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                ¿Qué ventajas y riesgos tendría tu decisión?
              </h3>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200">
              {(
                [
                  { id: 'all', label: 'Todos' },
                  { id: 'obras', label: 'Obras' },
                  { id: 'economia', label: 'Economía' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveFilter(tab.id);
                    soundEngine.playClick();
                  }}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                    activeFilter === tab.id
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ventajas */}
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  <h4 className="font-extrabold text-emerald-950 text-base">VENTAJAS</h4>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-200/70 px-2.5 py-0.5 rounded">
                  {filteredAdvantages.length} Puntos Fieles
                </span>
              </div>
              <ul className="space-y-3">
                {filteredAdvantages.map((item) => (
                  <li key={item.id} className="flex items-start gap-2.5 text-sm text-emerald-950 font-medium">
                    <span className="text-emerald-600 font-bold mt-0.5">•</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Riesgos */}
            <div className="bg-rose-50 border-2 border-rose-300 rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-rose-200">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-rose-700" />
                  <h4 className="font-extrabold text-rose-950 text-base">RIESGOS</h4>
                </div>
                <span className="text-xs font-bold text-rose-800 bg-rose-200/70 px-2.5 py-0.5 rounded">
                  {filteredRisks.length} Puntos Fieles
                </span>
              </div>
              <ul className="space-y-3">
                {filteredRisks.map((item) => (
                  <li key={item.id} className="flex items-start gap-2.5 text-sm text-rose-950 font-medium">
                    <span className="text-rose-600 font-bold mt-0.5">•</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM NAVIGATION: NEXT STEP TO BRIANT */}
        <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-medium text-slate-500">
            Parte completada: <strong className="text-slate-800">Jorge (Pregunta 5)</strong>
          </div>

          {onGoNext && (
            <button
              onClick={() => {
                soundEngine.playTransition();
                onGoNext();
              }}
              className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#CE1126] hover:bg-[#A00D1D] active:scale-95 rounded-xl transition-all shadow-md shadow-red-950/20"
            >
              <span>Siguiente: Ir a Briant (Pregunta 6)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
