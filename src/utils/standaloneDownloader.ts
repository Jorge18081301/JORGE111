import { REAL_IMAGES } from '../assets/images/realImages';
import { METADATA, PARTICIPANTS, JORGE_CONTENT, BRIANT_CONTENT, EDUIN_CONTENT, ANDRYS_CONTENT } from '../data/guideData';

/**
 * Generador de archivo index.html completamente autónomo e idéntico a la página principal.
 * Diseñado para funcionar 100% offline con fotos reales en base64, estilos completos,
 * mapa interactivo de RD, bolsa de dinero y modo de exposición en pantalla completa.
 */
export function downloadStandaloneIndex() {
  const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reto 2: Economía de Horacio Vásquez (1924–1930) | Ciencias Sociales</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    }
  </style>
</head>
<body class="bg-slate-50 text-slate-900 antialiased selection:bg-red-600 selection:text-white min-h-screen flex flex-col">

  <!-- TOP TRICOLOR DOMINICAN FLAG BANNER -->
  <div class="h-2 w-full flex">
    <div class="flex-1 bg-[#002D62]"></div>
    <div class="flex-1 bg-[#CE1126]"></div>
    <div class="flex-1 bg-[#002D62]"></div>
    <div class="flex-1 bg-[#CE1126]"></div>
  </div>

  <!-- HEADER -->
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <img src="${REAL_IMAGES.b64Coat}" alt="RD" class="w-6 h-6 object-contain" />
        <span class="text-base sm:text-lg font-extrabold text-[#002D62] tracking-tight">
          Reto 2 · Horacio Vásquez (1924–1930)
        </span>
      </div>
      <div class="flex items-center gap-2 sm:gap-3">
        <button onclick="openPresentation(0)" class="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-extrabold text-white bg-[#002D62] hover:bg-[#001D44] rounded-xl transition-all shadow-sm">
          <span>Modo Exposición</span>
        </button>
        <button onclick="window.print()" class="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-all">
          <span>🖨️ Imprimir PDF</span>
        </button>
      </div>
    </div>
  </header>

  <!-- HERO SECTION -->
  <section class="bg-white border-b border-slate-200 py-10 sm:py-14">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-7 space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-[#002D62]">
            <img src="${REAL_IMAGES.b64Coat}" alt="RD" class="w-4 h-4 object-contain" />
            <span>Ciencias Sociales 6to de Secundaria · República Dominicana</span>
          </div>

          <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Reto 2: Analizamos la Economía de <span class="text-[#002D62] underline decoration-[#CE1126] decoration-4">Horacio Vásquez</span> (1924–1930)
          </h1>

          <p class="text-base sm:text-lg text-slate-600 leading-relaxed">
            Guía interactiva completa con la participación de <strong>Jorge</strong>, <strong>Briant</strong>, <strong>Eduin</strong> y <strong>Andrys</strong>. Basada fielmente en la actividad del blog <em>El Profe Yovanny</em>.
          </p>

          <div class="flex flex-wrap gap-3 pt-2">
            <button onclick="openPresentation(0)" class="px-5 py-3 text-sm font-extrabold text-white bg-[#002D62] hover:bg-[#001D44] rounded-xl shadow-md transition-all">
              ▶ Iniciar Exposición en Vivo
            </button>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-950 shadow-xl text-white">
            <div class="aspect-[4/3] relative bg-slate-900">
              <img src="${REAL_IMAGES.b64Vasquez1924}" alt="Presidente Horacio Vásquez" class="w-full h-full object-cover object-top" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
            </div>
            <div class="p-5">
              <span class="text-xs font-bold text-amber-400 uppercase">Foto Histórica Real (1924)</span>
              <h3 class="text-xl font-extrabold text-white mt-0.5">Gral. Horacio Vásquez Lajara</h3>
              <p class="text-xs text-slate-300 mt-1">
                Gobernó el país del 12 de julio de 1924 a 1930. Gestionó empréstitos e impulsó obras públicas clave.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- PARTICIPANTS BAR -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-10 pt-6 border-t border-slate-200">
        <button onclick="showSection('jorge')" class="p-3.5 rounded-xl border-2 border-blue-200 bg-blue-50/50 hover:bg-blue-100/50 text-left transition-all">
          <span class="text-xs font-extrabold text-[#002D62] bg-blue-100 px-2 py-0.5 rounded">Parte 1 · P5</span>
          <div class="text-base font-extrabold text-slate-900 mt-1">Jorge</div>
          <div class="text-xs text-slate-500">Asesor Económico</div>
        </button>
        <button onclick="showSection('briant')" class="p-3.5 rounded-xl border-2 border-red-200 bg-red-50/50 hover:bg-red-100/50 text-left transition-all">
          <span class="text-xs font-extrabold text-[#CE1126] bg-red-100 px-2 py-0.5 rounded">Parte 2 · P6</span>
          <div class="text-base font-extrabold text-slate-900 mt-1">Briant</div>
          <div class="text-xs text-slate-500">Préstamos y Prosperidad 1927</div>
        </button>
        <button onclick="showSection('eduin')" class="p-3.5 rounded-xl border-2 border-blue-200 bg-blue-50/50 hover:bg-blue-100/50 text-left transition-all">
          <span class="text-xs font-extrabold text-[#002D62] bg-blue-100 px-2 py-0.5 rounded">Parte 3 · P7</span>
          <div class="text-base font-extrabold text-slate-900 mt-1">Eduin</div>
          <div class="text-xs text-slate-500">Causa → Situación → Consecuencia</div>
        </button>
        <button onclick="showSection('andrys')" class="p-3.5 rounded-xl border-2 border-red-200 bg-red-50/50 hover:bg-red-100/50 text-left transition-all">
          <span class="text-xs font-extrabold text-[#CE1126] bg-red-100 px-2 py-0.5 rounded">Parte 4 · P8</span>
          <div class="text-base font-extrabold text-slate-900 mt-1">Andrys</div>
          <div class="text-xs text-slate-500">Conveniencia y 5 Datos Oficiales</div>
        </button>
      </div>
    </div>
  </section>

  <!-- MAIN SECTIONS -->
  <main class="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 flex-1">

    <!-- JORGE -->
    <section id="sec-jorge" class="content-block bg-white rounded-2xl border-2 border-blue-200 overflow-hidden shadow-sm">
      <div class="bg-[#002D62] text-white p-6 sm:p-8">
        <span class="text-xs font-bold text-blue-200 uppercase">Participante 1 · Jorge · Pregunta 5</span>
        <h2 class="text-2xl font-extrabold mt-1">Imagínate que eres asesor económico del presidente Vásquez</h2>
        <div class="mt-4 p-4 rounded-xl bg-white/10 text-sm italic border border-white/20">
          "${JORGE_CONTENT.scenario}"
        </div>
      </div>
      <div class="p-6 sm:p-8 space-y-6">
        <div>
          <h3 class="text-lg font-extrabold text-slate-900">¿Qué problema debe resolver el gobierno?</h3>
          <p class="mt-2 p-4 rounded-xl bg-blue-50 border border-blue-200 text-slate-900 font-bold">
            ${JORGE_CONTENT.problem.answer}
          </p>
        </div>
        <div>
          <h3 class="text-lg font-extrabold text-slate-900">¿Qué decisión tomarías?</h3>
          <p class="mt-2 p-4 rounded-xl bg-red-50 border border-red-200 text-slate-900 font-bold">
            "${JORGE_CONTENT.decision.answer}"
          </p>
        </div>
        <div>
          <h3 class="text-lg font-extrabold text-slate-900 mb-3">¿Qué ventajas y riesgos tendría tu decisión?</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-5 rounded-xl bg-emerald-50 border-2 border-emerald-300">
              <h4 class="font-extrabold text-emerald-950 text-base mb-3">VENTAJAS</h4>
              <ul class="space-y-2 text-sm text-emerald-950 font-medium">
                <li>• Permitiría financiar obras públicas.</li>
                <li>• Generaría empleo y movimiento de dinero.</li>
                <li>• Mejoraría carreteras, puertos, agua, riego y escuelas.</li>
                <li>• Podría impulsar la agricultura, el comercio y la producción.</li>
              </ul>
            </div>
            <div class="p-5 rounded-xl bg-rose-50 border-2 border-rose-300">
              <h4 class="font-extrabold text-rose-950 text-base mb-3">RIESGOS</h4>
              <ul class="space-y-2 text-sm text-rose-950 font-medium">
                <li>• Aumentaría la deuda del país.</li>
                <li>• Podría generar dependencia financiera frente a otros países.</li>
                <li>• Si el dinero se administra mal, el préstamo podría convertirse en una carga para el Estado.</li>
                <li>• Los intereses y las condiciones del préstamo podrían limitar las finanzas futuras.</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="pt-4 border-t border-slate-200 flex justify-end">
          <button onclick="showSection('briant')" class="px-6 py-3 rounded-xl bg-[#CE1126] hover:bg-[#A00D1D] text-white font-extrabold text-sm transition-all shadow-md">
            Siguiente: Ir a Briant (Pregunta 6) →
          </button>
        </div>
      </div>
    </section>

    <!-- BRIANT -->
    <section id="sec-briant" class="content-block bg-white rounded-2xl border-2 border-red-200 overflow-hidden shadow-sm">
      <div class="bg-[#CE1126] text-white p-6 sm:p-8">
        <span class="text-xs font-bold text-rose-200 uppercase">Participante 2 · Briant · Pregunta 6</span>
        <h2 class="text-2xl font-extrabold mt-1">${BRIANT_CONTENT.question}</h2>
        <div class="mt-4 p-4 rounded-xl bg-white/10 text-sm sm:text-base font-semibold border border-white/20">
          "${BRIANT_CONTENT.fullExplanation}"
        </div>
      </div>
      <div class="p-6 sm:p-8 space-y-6">
        <h3 class="text-lg font-extrabold text-slate-900">Los 4 Pasos Hacia la Prosperidad Económica de 1927:</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div class="p-4 rounded-xl bg-slate-50 border-2 border-slate-200">
            <span class="text-xs font-extrabold text-[#CE1126]">Fines de 1926</span>
            <div class="font-extrabold text-slate-900 text-sm mt-1">1. Bonos $5,000,000 USD</div>
            <p class="text-xs text-slate-600 mt-1">Aprobación de nuevos empréstitos y emisión de los primeros 5 millones en bonos.</p>
          </div>
          <div class="p-4 rounded-xl bg-slate-50 border-2 border-slate-200">
            <span class="text-xs font-extrabold text-[#002D62]">Inicios de 1927</span>
            <div class="font-extrabold text-slate-900 text-sm mt-1">2. Circulación de Dinero</div>
            <p class="text-xs text-slate-600 mt-1">El dinero comenzó a circular activamente y ayudó a financiar construcciones e inversiones.</p>
          </div>
          <div class="p-4 rounded-xl bg-slate-50 border-2 border-slate-200">
            <span class="text-xs font-extrabold text-amber-600">Año 1927</span>
            <div class="font-extrabold text-slate-900 text-sm mt-1">3. Aumento en Exportación</div>
            <p class="text-xs text-slate-600 mt-1">Al mismo tiempo, aumentó notablemente la producción de los artículos de exportación.</p>
          </div>
          <div class="p-4 rounded-xl bg-slate-50 border-2 border-slate-200">
            <span class="text-xs font-extrabold text-emerald-600">Resultado 1927</span>
            <div class="font-extrabold text-slate-900 text-sm mt-1">4. Prosperidad de 1927</div>
            <p class="text-xs text-slate-600 mt-1">La combinación de dinero circulante, obras públicas y producción generó el auge de 1927.</p>
          </div>
        </div>
        <div class="pt-4 border-t border-slate-200 flex justify-between">
          <button onclick="showSection('jorge')" class="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm">
            ← Anterior: Jorge
          </button>
          <button onclick="showSection('eduin')" class="px-6 py-3 rounded-xl bg-[#002D62] hover:bg-[#001D44] text-white font-extrabold text-sm shadow-md">
            Siguiente: Ir a Eduin (Pregunta 7) →
          </button>
        </div>
      </div>
    </section>

    <!-- EDUIN -->
    <section id="sec-eduin" class="content-block bg-white rounded-2xl border-2 border-blue-200 overflow-hidden shadow-sm">
      <div class="bg-[#002D62] text-white p-6 sm:p-8">
        <span class="text-xs font-bold text-blue-200 uppercase">Participante 3 · Eduin · Pregunta 7</span>
        <h2 class="text-2xl font-extrabold mt-1">${EDUIN_CONTENT.title}</h2>
        <p class="text-sm text-blue-100 mt-1">${EDUIN_CONTENT.subtitle}</p>
      </div>
      <div class="p-6 sm:p-8 space-y-6">
        <div class="overflow-x-auto rounded-xl border-2 border-slate-200">
          <table class="w-full text-left text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 border-b-2 border-slate-200 font-extrabold text-xs text-slate-700 uppercase">
                <th class="p-4 border-r border-slate-200 text-[#002D62] w-1/3">1. CAUSA</th>
                <th class="p-4 border-r border-slate-200 text-amber-700 w-1/3">2. SITUACIÓN</th>
                <th class="p-4 text-emerald-700 w-1/3">3. CONSECUENCIA</th>
              </tr>
            </thead>
            <tbody>
              <tr class="align-top font-semibold text-slate-800">
                <td class="p-4 border-r border-slate-200 bg-blue-50/40">${EDUIN_CONTENT.stages[0].content}</td>
                <td class="p-4 border-r border-slate-200 bg-amber-50/40">${EDUIN_CONTENT.stages[1].content}</td>
                <td class="p-4 bg-emerald-50/40">${EDUIN_CONTENT.stages[2].content}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pt-4 border-t border-slate-200 flex justify-between">
          <button onclick="showSection('briant')" class="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm">
            ← Anterior: Briant
          </button>
          <button onclick="showSection('andrys')" class="px-6 py-3 rounded-xl bg-[#CE1126] hover:bg-[#A00D1D] text-white font-extrabold text-sm shadow-md">
            Siguiente: Ir a Andrys (Pregunta 8) →
          </button>
        </div>
      </div>
    </section>

    <!-- ANDRYS -->
    <section id="sec-andrys" class="content-block bg-white rounded-2xl border-2 border-red-200 overflow-hidden shadow-sm">
      <div class="bg-[#CE1126] text-white p-6 sm:p-8">
        <span class="text-xs font-bold text-rose-200 uppercase">Participante 4 · Andrys · Pregunta 8 y Datos</span>
        <h2 class="text-2xl font-extrabold mt-1">${ANDRYS_CONTENT.question}</h2>
        <div class="mt-4 p-4 rounded-xl bg-white/10 text-sm sm:text-base font-semibold border border-white/20">
          "${ANDRYS_CONTENT.fullResponse}"
        </div>
      </div>
      <div class="p-6 sm:p-8 space-y-6">
        <h3 class="text-lg font-extrabold text-slate-900">Datos de apoyo del caso estudiado:</h3>
        <div class="space-y-2.5">
          <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-sm text-slate-800 flex items-start gap-2">
            <span class="text-[#002D62]">•</span>
            <span>El gobierno de Horacio Vásquez comenzó el 12 de julio de 1924.</span>
          </div>
          <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-sm text-slate-800 flex items-start gap-2">
            <span class="text-[#002D62]">•</span>
            <span>El gobierno buscó un empréstito de 25,000,000 de dólares para consolidar y pagar la deuda dejada por el gobierno Militar y realizar nuevas inversiones públicas.</span>
          </div>
          <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-sm text-slate-800 flex items-start gap-2">
            <span class="text-[#002D62]">•</span>
            <span>A finales de 1926 se aprobó un nuevo empréstito y se emitieron los primeros cinco millones de dólares en bonos.</span>
          </div>
          <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-sm text-slate-800 flex items-start gap-2">
            <span class="text-[#002D62]">•</span>
            <span>Los recursos contribuyeron al programa de obras públicas y a la prosperidad económica de 1927.</span>
          </div>
          <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-sm text-slate-800 flex items-start gap-2">
            <span class="text-[#002D62]">•</span>
            <span>Entre las obras mencionadas están el acueducto de Santo Domingo, mejoras de puertos, proyectos de riego, escuelas y carreteras.</span>
          </div>
        </div>
        <div class="pt-4 border-t border-slate-200 flex justify-between">
          <button onclick="showSection('eduin')" class="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm">
            ← Anterior: Eduin
          </button>
          <button onclick="document.getElementById('mapa-canvas-box').scrollIntoView({behavior:'smooth'})" class="px-6 py-3 rounded-xl bg-[#002D62] hover:bg-[#001D44] text-white font-extrabold text-sm shadow-md">
            Siguiente: Explorar Mapa y Bolsa 3D ↓
          </button>
        </div>
      </div>
    </section>

    <!-- MAPA INTERACTIVO Y BOLSA CANVAS -->
    <section id="mapa-canvas-box" class="space-y-6 pt-6 border-t border-slate-200">
      <div>
        <span class="text-xs font-extrabold text-sky-700 uppercase">Modelos Interactivos</span>
        <h2 class="text-2xl font-extrabold text-slate-900 mt-0.5">Mapa de RD y Bolsa de Bonos de 1926</h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Canvas Mapa RD -->
        <div class="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 p-4 text-white">
          <div class="flex items-center justify-between mb-2">
            <h4 class="font-extrabold text-sm text-white">Mapa Digital 3D: Obras de Horacio Vásquez</h4>
            <span class="text-xs text-sky-400 font-bold">Animación Activa</span>
          </div>
          <canvas id="rdMapCanvas" class="w-full h-64 bg-slate-950 rounded-xl"></canvas>
          <div class="grid grid-cols-2 gap-2 mt-3 text-xs text-slate-300">
            <div class="p-2 bg-slate-800 rounded">📍 Acueducto Sto Dgo</div>
            <div class="p-2 bg-slate-800 rounded">🚢 Mejoras de Puertos</div>
            <div class="p-2 bg-slate-800 rounded">🌾 Proyectos de Riego</div>
            <div class="p-2 bg-slate-800 rounded">🛣️ Carreteras y Escuelas</div>
          </div>
        </div>

        <!-- Canvas Bolsa Dinero -->
        <div class="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 p-4 text-white">
          <div class="flex items-center justify-between mb-2">
            <h4 class="font-extrabold text-sm text-white">Bolsa de Dinero 3D: Bonos de $5,000,000 USD</h4>
            <span class="text-xs text-amber-400 font-bold">Empréstitos 1926</span>
          </div>
          <canvas id="moneyCanvas" class="w-full h-64 bg-slate-950 rounded-xl"></canvas>
          <div class="mt-3 p-3 bg-slate-800 rounded text-xs text-amber-300 font-bold">
            💰 Empréstito buscado: $25,000,000 USD | Bonos emitidos a fines de 1926: $5,000,000 USD
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- FOOTER -->
  <footer class="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500 space-y-2">
    <p><strong>Fuente consultada:</strong> El gobierno de Horacio Vásquez (1924–1930), Ciencias Sociales de 6to de Secundaria, blog El Profe Yovanny.</p>
    <p>Participantes del equipo: <strong>Jorge</strong> · <strong>Briant</strong> · <strong>Eduin</strong> · <strong>Andrys</strong></p>
  </footer>

  <!-- PRESENTATION MODAL -->
  <div id="presModal" class="fixed inset-0 z-50 bg-slate-950 hidden flex-col justify-between text-white p-6 sm:p-10 select-none">
    <div class="flex items-center justify-between border-b border-slate-800 pb-4">
      <div>
        <span id="presBadge" class="px-2.5 py-1 rounded bg-[#002D62] text-xs font-bold text-blue-200">Intro</span>
        <span class="text-sm text-slate-400 ml-2">Expositor: <strong id="presSpeaker" class="text-white">Equipo</strong></span>
      </div>
      <button onclick="closePresentation()" class="px-3 py-1.5 rounded-lg bg-rose-900 text-rose-100 font-bold text-sm">
        ✕ Cerrar
      </button>
    </div>

    <div class="flex-1 flex flex-col justify-center items-center py-6 text-center max-w-4xl mx-auto w-full">
      <div id="presBody"></div>
    </div>

    <div class="flex items-center justify-between border-t border-slate-800 pt-4">
      <button onclick="prevPresSlide()" class="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm">
        ← Anterior
      </button>
      <div id="presIndicators" class="flex gap-2"></div>
      <button onclick="nextPresSlide()" class="px-6 py-2.5 rounded-xl bg-[#CE1126] hover:bg-[#A00D1D] text-white font-extrabold text-sm shadow-lg">
        Siguiente →
      </button>
    </div>
  </div>

  <script>
    function showSection(id) {
      document.querySelectorAll('.content-block').forEach(b => b.scrollIntoView({ behavior: 'smooth' }));
      const target = document.getElementById('sec-' + id);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }

    // Modal Presentation Engine
    const slides = [
      {
        badge: 'Intro',
        speaker: 'Equipo Completo',
        html: '<h2 class="text-3xl font-extrabold text-white">RETO 2 — ANALIZAMOS LA ECONOMÍA</h2><p class="text-slate-400 mt-2">El gobierno de Horacio Vásquez (1924–1930)</p><p class="text-lg text-slate-200 mt-4">Presentación de 4 participantes: Jorge (P5), Briant (P6), Eduin (P7), Andrys (P8).</p>'
      },
      {
        badge: 'Pregunta 5',
        speaker: 'Jorge',
        html: '<h2 class="text-2xl font-extrabold text-sky-400">Jorge: Asesor Económico</h2><p class="mt-4 text-base text-slate-200 bg-slate-900 p-4 rounded-xl text-left"><strong>Problema:</strong> Falta de recursos para obras públicas, atender necesidades del Estado y afrontar deudas.</p><p class="mt-3 text-base text-slate-200 bg-slate-900 p-4 rounded-xl text-left"><strong>Decisión:</strong> Gestionar un préstamo procurando condiciones favorables y destinándolo a obras productivas.</p>'
      },
      {
        badge: 'Pregunta 6',
        speaker: 'Briant',
        html: '<h2 class="text-2xl font-extrabold text-rose-400">Briant: Préstamos y Prosperidad de 1927</h2><p class="mt-4 text-base text-slate-200 bg-slate-900 p-5 rounded-xl text-left leading-relaxed">"${BRIANT_CONTENT.fullExplanation}"</p>'
      },
      {
        badge: 'Pregunta 7',
        speaker: 'Eduin',
        html: '<h2 class="text-2xl font-extrabold text-sky-400">Eduin: Esquema Causa → Situación → Consecuencia</h2><div class="mt-4 space-y-2 text-left"><div class="p-3 bg-blue-950/80 rounded border-l-4 border-blue-500"><strong>CAUSA:</strong> ${EDUIN_CONTENT.stages[0].content}</div><div class="p-3 bg-amber-950/80 rounded border-l-4 border-amber-500"><strong>SITUACIÓN:</strong> ${EDUIN_CONTENT.stages[1].content}</div><div class="p-3 bg-emerald-950/80 rounded border-l-4 border-emerald-500"><strong>CONSECUENCIA:</strong> ${EDUIN_CONTENT.stages[2].content}</div></div>'
      },
      {
        badge: 'Pregunta 8 y Datos',
        speaker: 'Andrys',
        html: '<h2 class="text-2xl font-extrabold text-rose-400">Andrys: Conveniencia de los Préstamos</h2><p class="mt-3 text-sm text-slate-200 bg-slate-900 p-4 rounded-xl text-left font-medium">"${ANDRYS_CONTENT.fullResponse}"</p><p class="mt-2 text-xs text-amber-300">Incluye los 5 datos oficiales del caso (12 de julio 1924, $25M de empréstito, bonos de $5M en 1926, obras y prosperidad 1927).</p>'
      }
    ];

    let currentSlide = 0;
    function openPresentation(index) {
      currentSlide = index || 0;
      document.getElementById('presModal').classList.remove('hidden');
      document.getElementById('presModal').classList.add('flex');
      renderSlide();
    }
    function closePresentation() {
      document.getElementById('presModal').classList.add('hidden');
      document.getElementById('presModal').classList.remove('flex');
    }
    function renderSlide() {
      const s = slides[currentSlide];
      document.getElementById('presBadge').innerText = s.badge;
      document.getElementById('presSpeaker').innerText = s.speaker;
      document.getElementById('presBody').innerHTML = s.html;
      const ind = document.getElementById('presIndicators');
      ind.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'w-3 h-3 rounded-full ' + (i === currentSlide ? 'bg-[#CE1126]' : 'bg-slate-700');
        ind.appendChild(dot);
      });
    }
    function nextPresSlide() {
      if (currentSlide < slides.length - 1) {
        currentSlide++;
      } else {
        currentSlide = 0;
      }
      renderSlide();
    }
    function prevPresSlide() {
      if (currentSlide > 0) {
        currentSlide--;
      } else {
        currentSlide = slides.length - 1;
      }
      renderSlide();
    }

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextPresSlide();
      if (e.key === 'ArrowLeft') prevPresSlide();
      if (e.key === 'Escape') closePresentation();
    });

    // Canvas Animado RD
    const mapC = document.getElementById('rdMapCanvas');
    if (mapC) {
      const ctx = mapC.getContext('2d');
      let t = 0;
      function loopMap() {
        t += 0.03;
        mapC.width = mapC.clientWidth;
        mapC.height = mapC.clientHeight;
        const w = mapC.width, h = mapC.height;
        ctx.fillStyle = '#0a1128';
        ctx.fillRect(0, 0, w, h);

        // Silueta RD
        const cx = w/2, cy = h/2;
        ctx.beginPath();
        ctx.moveTo(cx - 120, cy);
        ctx.bezierCurveTo(cx - 80, cy - 60, cx + 60, cy - 70, cx + 130, cy - 10);
        ctx.bezierCurveTo(cx + 150, cy + 20, cx + 80, cy + 50, cx + 20, cy + 40);
        ctx.bezierCurveTo(cx - 40, cy + 60, cx - 90, cy + 50, cx - 120, cy);
        ctx.fillStyle = 'rgba(0, 45, 98, 0.5)';
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Obras
        const pts = [
          { name: 'Acueducto Sto Dgo', x: cx + 30, y: cy + 20, col: '#0284c7' },
          { name: 'Puertos', x: cx + 90, y: cy - 10, col: '#ce1126' },
          { name: 'Riego Cibao', x: cx - 40, y: cy - 20, col: '#10b981' },
          { name: 'Carreteras', x: cx, y: cy, col: '#f59e0b' }
        ];
        pts.forEach((p, i) => {
          const r = 5 + Math.sin(t * 3 + i) * 3;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fillStyle = p.col;
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.stroke();
          ctx.fillStyle = '#fff';
          ctx.font = '10px sans-serif';
          ctx.fillText(p.name, p.x + 8, p.y + 4);
        });
        requestAnimationFrame(loopMap);
      }
      loopMap();
    }

    // Canvas Animado Bolsa Dinero
    const moneyC = document.getElementById('moneyCanvas');
    if (moneyC) {
      const ctx = moneyC.getContext('2d');
      let angle = 0;
      function loopMoney() {
        angle += 0.02;
        moneyC.width = moneyC.clientWidth;
        moneyC.height = moneyC.clientHeight;
        const w = moneyC.width, h = moneyC.height;
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, w, h);

        const cx = w/2, cy = h/2;
        // Bolsa
        ctx.beginPath();
        ctx.arc(cx, cy + 10, 45, 0, Math.PI * 2);
        ctx.fillStyle = '#92400e';
        ctx.fill();
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Símbolo $
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 36px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('$', cx, cy + 12);

        // Monedas orbitando
        for (let i = 0; i < 6; i++) {
          const a = angle + (i * Math.PI / 3);
          const mx = cx + Math.cos(a) * 80;
          const my = cy + Math.sin(a) * 35;
          ctx.beginPath();
          ctx.arc(mx, my, 8, 0, Math.PI * 2);
          ctx.fillStyle = '#fbbf24';
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        requestAnimationFrame(loopMoney);
      }
      loopMoney();
    }
  </script>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Reto2_Economia_Horacio_Vasquez_Index.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
