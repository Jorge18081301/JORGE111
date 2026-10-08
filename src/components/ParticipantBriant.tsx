import React, { useState } from 'react';
import { BRIANT_CONTENT } from '../data/guideData';
import { REAL_IMAGES } from '../assets/images/realImages';
import { TrendingUp, ArrowRight, ArrowLeft, DollarSign, PackageCheck, Building2, Calendar } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

interface ParticipantBriantProps {
  onGoPrev?: () => void;
  onGoNext?: () => void;
}

export const ParticipantBriant: React.FC<ParticipantBriantProps> = ({ onGoPrev, onGoNext }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div className="bg-white rounded-2xl border-2 border-red-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Header with Dominican Red and Participant Identity */}
      <div className="bg-gradient-to-r from-[#CE1126] via-[#B20E20] to-[#800A17] text-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-xl font-bold text-white shadow-inner">
              B
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-rose-200 uppercase tracking-wider">
                <span>Participante 2 · Briant</span>
                <span aria-hidden="true">·</span>
                <span>Pregunta 6 del Documento</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mt-0.5">
                {BRIANT_CONTENT.question}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/15 px-3 py-1.5 rounded-lg border border-white/20 text-xs font-semibold text-rose-100">
            <TrendingUp className="w-4 h-4 text-amber-300" />
            <span>Tema: Dinámica de la Prosperidad de 1927</span>
          </div>
        </div>

        {/* Full official explanation from PDF with real historical photo */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-white/10 border border-white/15 rounded-xl p-4 sm:p-5">
          <div className="md:col-span-8 text-sm sm:text-base text-rose-50 leading-relaxed">
            <div className="text-xs uppercase font-bold text-amber-300 tracking-wider mb-1 flex items-center gap-1.5">
              <span>Texto Fiel del Documento de Ciencias Sociales</span>
            </div>
            <p className="font-medium text-white/95">
              "{BRIANT_CONTENT.fullExplanation}"
            </p>
          </div>
          <div className="md:col-span-4 rounded-lg overflow-hidden border border-white/20 bg-slate-900 aspect-[4/3] relative">
            <img
              src={REAL_IMAGES.horacioVasquezOficial}
              alt="Retrato oficial de Horacio Vásquez por Emilio Gisbert"
              className="w-full h-full object-cover filter contrast-105"
            />
            <div className="absolute bottom-0 inset-x-0 bg-black/75 p-1.5 text-[10px] text-center text-slate-300">
              Retrato Oficial: Horacio Vásquez (AGN)
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Step-by-step interactive flow */}
        <div>
          <div className="text-xs font-bold text-[#CE1126] uppercase tracking-wider mb-1">
            Encadenamiento de la Prosperidad (1926 → 1927)
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2">
            ¿Cómo los préstamos generaron prosperidad económica en 1927?
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Haz clic en los 4 pasos para ver cómo se articuló la liquidez estatal, las construcciones y el auge:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {BRIANT_CONTENT.flowSteps.map((step, idx) => (
              <button
                key={step.step}
                onClick={() => {
                  setActiveStep(idx);
                  soundEngine.playClick();
                }}
                className={`p-3.5 rounded-xl border-2 text-left transition-all ${
                  activeStep === idx
                    ? 'border-[#CE1126] bg-red-50/80 shadow-xs ring-2 ring-red-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <span className="text-xs text-slate-500 font-bold">{step.period}</span>
                <div className="text-xs sm:text-sm font-extrabold text-slate-900 mt-1 line-clamp-1">
                  {step.title}
                </div>
              </button>
            ))}
          </div>

          {/* Active Step Highlight Card */}
          <div className="mt-4 p-5 rounded-xl bg-slate-50 border-2 border-slate-200">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#CE1126] text-white flex items-center justify-center text-xs font-extrabold">
                  {BRIANT_CONTENT.flowSteps[activeStep].step}
                </span>
                <h4 className="font-extrabold text-slate-900 text-base">
                  {BRIANT_CONTENT.flowSteps[activeStep].title}
                </h4>
              </div>
              <div className="text-xs font-extrabold text-[#CE1126] bg-red-100 px-2.5 py-1 rounded">
                {BRIANT_CONTENT.flowSteps[activeStep].metric}
              </div>
            </div>
            <p className="text-sm text-slate-800 leading-relaxed font-medium">
              {BRIANT_CONTENT.flowSteps[activeStep].description}
            </p>
          </div>
        </div>

        {/* 3 Pillars of 1927 Prosperity */}
        <div className="pt-6 border-t border-slate-200">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Sinergia Económica
          </div>
          <h4 className="text-base font-extrabold text-slate-900 mb-4">
            La Combinación de Factores Clave que Impulsó la Economía:
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="w-8 h-8 rounded-lg bg-[#002D62] text-white flex items-center justify-center mb-2.5 shadow-xs">
                <DollarSign className="w-4 h-4" />
              </div>
              <h5 className="font-extrabold text-slate-900 text-sm">1. Mayor Circulación de Dinero</h5>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                Los bonos de $5,000,000 emitidos a finales de 1926 inyectaron liquidez y dinamizaron salarios y compras.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center mb-2.5 shadow-xs">
                <Building2 className="w-4 h-4" />
              </div>
              <h5 className="font-extrabold text-slate-900 text-sm">2. Programa de Obras Públicas</h5>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                Financiamiento directo de construcciones, carreteras, acueducto y mejoras de puertos en todo el país.
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center mb-2.5 shadow-xs">
                <PackageCheck className="w-4 h-4" />
              </div>
              <h5 className="font-extrabold text-slate-900 text-sm">3. Artículos de Exportación</h5>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                Mejores condiciones productivas y portuarias que elevaron la comercialización y exportación nacional.
              </p>
            </div>
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
              <span>Anterior: Jorge (Pregunta 5)</span>
            </button>
          )}

          {onGoNext && (
            <button
              onClick={() => {
                soundEngine.playTransition();
                onGoNext();
              }}
              className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#002D62] hover:bg-[#001D44] active:scale-95 rounded-xl transition-all shadow-md shadow-blue-950/20"
            >
              <span>Siguiente: Ir a Eduin (Pregunta 7)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
