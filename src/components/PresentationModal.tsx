import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Volume2, VolumeX, CheckCircle, RotateCw } from 'lucide-react';
import { PARTICIPANTS, JORGE_CONTENT, BRIANT_CONTENT, EDUIN_CONTENT, ANDRYS_CONTENT } from '../data/guideData';
import { REAL_IMAGES } from '../assets/images/realImages';
import { soundEngine } from '../utils/soundEffects';

interface PresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSlide?: number;
}

export const PresentationModal: React.FC<PresentationModalProps> = ({
  isOpen,
  onClose,
  initialSlide = 0,
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(initialSlide);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Sync initial slide when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentSlide(initialSlide);
      setTimerSeconds(0);
      setIsTimerRunning(true);
    }
  }, [isOpen, initialSlide]);

  const slides = [
    {
      id: 'intro',
      speaker: 'Equipo Completo · 6to Secundaria',
      badge: 'Introducción General',
      title: 'RETO 2 — ANALIZAMOS LA ECONOMÍA',
      subtitle: 'El gobierno de Horacio Vásquez (1924–1930) · Ciencias Sociales',
      content: (
        <div className="space-y-6 text-center max-w-4xl mx-auto">
          {/* Flag & Crest */}
          <div className="flex justify-center items-center gap-3">
            <img src={REAL_IMAGES.dominicanCoatOfArms} alt="Escudo RD" className="w-8 h-8 object-contain" />
            <div className="flex gap-1.5">
              <span className="w-10 h-2 bg-[#002D62] rounded-full"></span>
              <span className="w-10 h-2 bg-[#CE1126] rounded-full"></span>
              <span className="w-10 h-2 bg-white rounded-full"></span>
            </div>
            <img src={REAL_IMAGES.dominicanFlag} alt="Bandera RD" className="w-7 h-5 object-cover rounded-xs" />
          </div>

          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/30 shadow-lg">
              <img
                src={REAL_IMAGES.horacioVasquez1924}
                alt="Horacio Vásquez"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          <p className="text-base sm:text-xl text-slate-200 leading-relaxed font-semibold max-w-2xl mx-auto">
            Exposición interactiva de Ciencias Sociales dividida en 4 partes individuales:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-left">
            {PARTICIPANTS.map((p, idx) => (
              <div
                key={p.id}
                onClick={() => {
                  soundEngine.playTransition();
                  setCurrentSlide(idx + 1);
                }}
                className="p-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 cursor-pointer transition-all hover:scale-105"
              >
                <div className="text-xs font-extrabold text-amber-400">Parte {idx + 1}</div>
                <div className="text-base font-extrabold text-white mt-0.5">{p.name}</div>
                <div className="text-xs text-slate-400 mt-1 line-clamp-1">Pregunta {p.questionNumber}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'jorge',
      speaker: 'Jorge',
      badge: 'Pregunta 5',
      title: 'Jorge: Asesor Económico del Presidente Vásquez',
      subtitle: '¿Qué problema resolver? · ¿Qué decisión tomar? · Ventajas y Riesgos',
      content: (
        <div className="space-y-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-xl bg-blue-950/80 border border-blue-700 text-blue-100 text-sm italic">
            "{JORGE_CONTENT.scenario}"
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-700">
              <span className="text-xs font-extrabold text-sky-400 uppercase tracking-wider">
                1. ¿Qué problema debe resolver?
              </span>
              <p className="text-sm font-bold text-white mt-1.5 leading-relaxed">
                {JORGE_CONTENT.problem.answer}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-700">
              <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">
                2. ¿Qué decisión tomarías?
              </span>
              <p className="text-sm font-bold text-white mt-1.5 leading-relaxed">
                {JORGE_CONTENT.decision.answer}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
            <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-700">
              <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">
                Ventajas de la Decisión
              </span>
              <ul className="text-xs sm:text-sm text-slate-200 mt-2 space-y-1.5">
                {JORGE_CONTENT.advantages.map((a) => (
                  <li key={a.id} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{a.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-700">
              <span className="text-xs font-extrabold text-rose-400 uppercase tracking-wider">
                Riesgos de la Decisión
              </span>
              <ul className="text-xs sm:text-sm text-slate-200 mt-2 space-y-1.5">
                {JORGE_CONTENT.risks.map((r) => (
                  <li key={r.id} className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{r.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'briant',
      speaker: 'Briant',
      badge: 'Pregunta 6',
      title: 'Briant: Préstamos y Prosperidad de 1927',
      subtitle: 'Empréstitos · Bonos de $5,000,000 · Dinero en Circulación y Obras',
      content: (
        <div className="space-y-4 max-w-4xl mx-auto text-left">
          <div className="p-5 rounded-xl bg-red-950/80 border border-red-700 text-rose-100 text-sm sm:text-base font-semibold leading-relaxed">
            "{BRIANT_CONTENT.fullExplanation}"
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            {BRIANT_CONTENT.flowSteps.map((st) => (
              <div key={st.step} className="p-4 rounded-xl bg-slate-900 border border-slate-700">
                <span className="text-xs font-extrabold text-amber-400">{st.period}</span>
                <div className="text-sm font-extrabold text-white mt-1">{st.title}</div>
                <div className="text-xs text-slate-300 mt-1 leading-relaxed">{st.description}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'eduin',
      speaker: 'Eduin',
      badge: 'Pregunta 7',
      title: 'Eduin: Esquema Causa → Situación → Consecuencia',
      subtitle: 'La secuencia exacta del proceso económico de Horacio Vásquez',
      content: (
        <div className="space-y-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-xl bg-blue-950/70 border-l-4 border-blue-500">
            <span className="text-xs font-extrabold text-sky-400 uppercase tracking-wider">1. CAUSA</span>
            <p className="text-base font-bold text-white mt-1">
              {EDUIN_CONTENT.stages[0].content}
            </p>
          </div>

          <div className="text-center font-bold text-amber-400 text-xl leading-none">↓</div>

          <div className="p-4 rounded-xl bg-amber-950/70 border-l-4 border-amber-500">
            <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">2. SITUACIÓN</span>
            <p className="text-base font-bold text-white mt-1">
              {EDUIN_CONTENT.stages[1].content}
            </p>
          </div>

          <div className="text-center font-bold text-emerald-400 text-xl leading-none">↓</div>

          <div className="p-4 rounded-xl bg-emerald-950/70 border-l-4 border-emerald-500">
            <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">3. CONSECUENCIA</span>
            <p className="text-base font-bold text-white mt-1">
              {EDUIN_CONTENT.stages[2].content}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'andrys',
      speaker: 'Andrys',
      badge: 'Pregunta 8 y Datos',
      title: 'Andrys: Conveniencia de los Préstamos y Datos de Apoyo',
      subtitle: 'Uso responsable para obras públicas + 5 Datos Históricos Oficiales',
      content: (
        <div className="space-y-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-xl bg-red-950/70 border border-red-700 text-rose-100 text-sm sm:text-base font-semibold leading-relaxed">
            "{ANDRYS_CONTENT.fullResponse}"
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-700">
            <span className="text-xs font-extrabold text-sky-400 uppercase tracking-wider">
              Los 5 Datos de Apoyo del Caso Estudiado:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2.5">
              {ANDRYS_CONTENT.supportData.map((d, i) => (
                <div key={d.id} className="text-xs sm:text-sm text-slate-200 flex items-start gap-2 bg-slate-800/80 p-2.5 rounded-lg">
                  <span className="text-amber-400 font-extrabold">{i + 1}.</span>
                  <span>{d.point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  // Advance to next slide - ALWAYS WORKS, loops back if at end
  const nextSlide = () => {
    soundEngine.playTransition();
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      // Loop back or close
      setCurrentSlide(0);
    }
  };

  const prevSlide = () => {
    soundEngine.playTransition();
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    } else {
      setCurrentSlide(slides.length - 1);
    }
  };

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isOpen && isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen, isTimerRunning]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSlide]);

  if (!isOpen) return null;

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const active = slides[currentSlide];
  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col justify-between overflow-hidden text-white select-none">
      {/* Top Bar of Presentation */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded bg-[#002D62] border border-blue-400 text-xs font-extrabold text-blue-200">
            {active.badge}
          </span>
          <span className="text-xs sm:text-sm font-semibold text-slate-300">
            Expositor: <strong className="text-white">{active.speaker}</strong>
          </span>
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
            <span className="text-slate-400">Tiempo:</span>
            <span className="font-mono font-bold text-amber-400 tabular-nums">
              {formatTimer(timerSeconds)}
            </span>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-1 hover:text-white text-slate-400"
              title={isTimerRunning ? 'Pausar' : 'Reanudar'}
            >
              {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setTimerSeconds(0)}
              className="p-1 hover:text-white text-slate-400"
              title="Reiniciar"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => {
              const nextState = !soundEnabled;
              setSoundEnabled(nextState);
              soundEngine.setEnabled(nextState);
            }}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            title="Sonido"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-rose-900/50 hover:bg-rose-900 border border-rose-600 text-rose-200"
            title="Cerrar presentación"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Body */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-12 py-6 max-w-6xl mx-auto w-full text-center overflow-y-auto">
        <div className="mb-4">
          <div className="text-xs sm:text-sm font-extrabold text-sky-400 uppercase tracking-widest">
            Diapositiva {currentSlide + 1} de {slides.length}
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
            {active.title}
          </h1>
          <p className="text-xs sm:text-base text-slate-400 mt-1">{active.subtitle}</p>
        </div>

        <div className="w-full">{active.content}</div>
      </div>

      {/* Bottom Deck & Navigation Buttons - ALWAYS CLICKABLE & WORKING */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-t border-slate-800 bg-slate-900/95 backdrop-blur-md">
        {/* Slide Indicators */}
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                soundEngine.playTransition();
                setCurrentSlide(i);
              }}
              className={`h-2.5 rounded-full transition-all ${
                currentSlide === i ? 'w-8 bg-[#CE1126]' : 'w-2.5 bg-slate-700 hover:bg-slate-500'
              }`}
              title={`Ir a diapositiva ${i + 1}`}
            />
          ))}
        </div>

        {/* Big Navigation Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white transition-all active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <button
            onClick={nextSlide}
            className={`flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold rounded-xl text-white transition-all shadow-lg active:scale-95 ${
              isLastSlide
                ? 'bg-[#002D62] hover:bg-[#001D40] ring-2 ring-blue-400/50'
                : 'bg-[#CE1126] hover:bg-[#A00D1D] ring-2 ring-red-400/50'
            }`}
          >
            <span>{isLastSlide ? 'Volver al Inicio (Intro)' : 'Siguiente Diapositiva'}</span>
            {isLastSlide ? <RotateCw className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
