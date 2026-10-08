import { ParticipantInfo, AdvantageRiskItem, SchemeStage, HistoricalSupportData, InfrastructureWork } from '../types/guide';

export const METADATA = {
  challengeTitle: 'RETO 2 — ANALIZAMOS LA ECONOMÍA',
  topic: 'El gobierno de Horacio Vásquez (1924–1930)',
  context: 'Actividad basada en la información del blog Ciencias Sociales de 6to de Secundaria, tema "El gobierno del presidente Horacio Vásquez Lajara (1924–1930)".',
  sourceName: 'Blog El Profe Yovanny',
  sourceUrl: 'https://elprofeyovanny.blogspot.com/p/blog-page_14.html',
};

export const PARTICIPANTS: ParticipantInfo[] = [
  {
    id: 'jorge',
    name: 'Jorge',
    role: 'Asesor Económico Presidencial',
    questionNumber: 5,
    questionTitle: 'Imagínate que eres asesor económico del presidente Vásquez',
    shortSummary: 'Evaluación del problema de liquidez, decisión del empréstito y análisis de ventajas frente a riesgos.',
    badgeColor: 'border-blue-600 text-blue-700 bg-blue-50',
    accentColor: '#002D62',
  },
  {
    id: 'briant',
    name: 'Briant',
    role: 'Analista de Prosperidad y Finanzas',
    questionNumber: 6,
    questionTitle: 'Relación entre los préstamos obtenidos y la prosperidad económica de 1927',
    shortSummary: 'Explicación del programa de obras, emisión de $5M en bonos (1926) y el auge de exportaciones.',
    badgeColor: 'border-red-600 text-red-700 bg-red-50',
    accentColor: '#CE1126',
  },
  {
    id: 'eduin',
    name: 'Eduin',
    role: 'Especialista en Esquemas y Procesos',
    questionNumber: 7,
    questionTitle: 'Esquema: causa → situación → consecuencia',
    shortSummary: 'Síntesis estructural del encadenamiento financiero: necesidades del Estado, empréstitos y prosperidad de 1927.',
    badgeColor: 'border-blue-600 text-blue-700 bg-blue-50',
    accentColor: '#002D62',
  },
  {
    id: 'andrys',
    name: 'Andrys',
    role: 'Evaluador de Políticas Públicas e Historia',
    questionNumber: 8,
    questionTitle: '¿Conviene que un gobierno use préstamos para obras? + Datos de apoyo',
    shortSummary: 'Argumentación reflexiva sobre la conveniencia del endeudamiento responsable y recopilación de los 5 datos del caso.',
    badgeColor: 'border-red-600 text-red-700 bg-red-50',
    accentColor: '#CE1126',
  },
];

// Contenido fiel de la Pregunta 5 (Jorge)
export const JORGE_CONTENT = {
  scenario:
    'El gobierno necesita dinero para continuar las obras públicas, pero dispone de pocos recursos. Según la información estudiada, el país tenía pocas entradas y esto hacía que las construcciones avanzaran lentamente. Además, el gobierno buscaba recursos para pagar y consolidar deudas anteriores y realizar nuevas inversiones públicas.',
  problem: {
    question: '¿Qué problema debe resolver el gobierno?',
    answer:
      'Debe resolver la falta de recursos financieros para continuar las obras públicas, atender las necesidades del Estado y afrontar las deudas existentes.',
    keyPoints: [
      'Falta de recursos financieros para continuar las obras públicas.',
      'Atender las necesidades del Estado.',
      'Afrontar las deudas existentes y consolidar compromisos anteriores.',
      'Superar el lento avance de las construcciones causado por los bajos ingresos fiscales.',
    ],
  },
  decision: {
    question: '¿Qué decisión tomarías?',
    answer:
      'Tomaría la decisión de gestionar un préstamo o empréstito, pero procurando que las condiciones fueran favorables para el país y que el dinero se destinara principalmente a obras productivas y necesarias.',
    criteria: [
      'Condiciones favorables de tasa, plazos y garantías para la República Dominicana.',
      'Destino riguroso y prioritario hacia obras productivas y necesarias.',
      'Transparencia en el manejo presupuestario para evitar endeudamiento improductivo.',
    ],
  },
  advantages: [
    {
      id: 'adv-1',
      text: 'Permitiría financiar obras públicas.',
      category: 'obras' as const,
    },
    {
      id: 'adv-2',
      text: 'Generaría empleo y movimiento de dinero.',
      category: 'economia' as const,
    },
    {
      id: 'adv-3',
      text: 'Mejoraría carreteras, puertos, agua, riego y escuelas.',
      category: 'obras' as const,
    },
    {
      id: 'adv-4',
      text: 'Podría impulsar la agricultura, el comercio y la producción.',
      category: 'economia' as const,
    },
  ],
  risks: [
    {
      id: 'risk-1',
      text: 'Aumentaría la deuda del país.',
      category: 'economia' as const,
    },
    {
      id: 'risk-2',
      text: 'Podría generar dependencia financiera frente a otros países.',
      category: 'social' as const,
    },
    {
      id: 'risk-3',
      text: 'Si el dinero se administra mal, el préstamo podría convertirse en una carga para el Estado.',
      category: 'economia' as const,
    },
    {
      id: 'risk-4',
      text: 'Los intereses y las condiciones del préstamo podrían limitar las finanzas futuras.',
      category: 'economia' as const,
    },
  ],
};

// Contenido fiel de la Pregunta 6 (Briant)
export const BRIANT_CONTENT = {
  question: 'Explica la relación entre los préstamos obtenidos y la prosperidad económica de 1927',
  fullExplanation:
    'Los préstamos permitieron al gobierno de Horacio Vásquez disponer de recursos para financiar un importante programa de obras públicas. A finales de 1926 se aprobaron nuevos empréstitos y se emitieron los primeros cinco millones de dólares en bonos. Ese dinero comenzó a circular y ayudó a financiar construcciones y otras inversiones. Al mismo tiempo, aumentó la producción de los artículos de exportación. La combinación de mayor circulación de dinero, obras públicas y mejores condiciones de producción contribuyó a la prosperidad económica de 1927.',
  flowSteps: [
    {
      step: '1',
      period: 'Fines de 1926',
      title: 'Aprobación de Empréstitos y Bonos',
      description: 'Se aprobaron nuevos empréstitos y se emitieron los primeros cinco millones de dólares ($5,000,000 USD) en bonos del Estado.',
      metric: '$5,000,000 USD',
      metricLabel: 'Emisión inicial en bonos',
    },
    {
      step: '2',
      period: 'Inicios de 1927',
      title: 'Circulación de Dinero e Inversiones',
      description: 'Ese dinero comenzó a circular activamente en la economía y ayudó a financiar construcciones, obras y otras inversiones estatales y privadas.',
      metric: 'Alto Flujo',
      metricLabel: 'Circulación monetaria',
    },
    {
      step: '3',
      period: '1927',
      title: 'Aumento en Artículos de Exportación',
      description: 'Al mismo tiempo, aumentó la producción y colocación de los artículos de exportación en los mercados exteriores.',
      metric: 'Crecimiento',
      metricLabel: 'Producción de exportación',
    },
    {
      step: '4',
      period: 'Año 1927',
      title: 'Prosperidad Económica Consolidada',
      description: 'La combinación de mayor circulación de dinero, obras públicas masivas y mejores condiciones de producción produjo el auge y la prosperidad de 1927.',
      metric: '1927',
      metricLabel: 'Año de auge económico',
    },
  ],
};

// Contenido fiel de la Pregunta 7 (Eduin)
export const EDUIN_CONTENT = {
  title: 'Esquema: causa → situación → consecuencia',
  subtitle: 'Representación secuencial de la dinámica económica y fiscal en el gobierno de Horacio Vásquez.',
  stages: [
    {
      step: 'causa' as const,
      title: 'CAUSA',
      content: 'El gobierno necesitaba recursos para continuar las obras públicas y atender sus compromisos financieros.',
      iconName: 'AlertCircle',
    },
    {
      step: 'situacion' as const,
      title: 'SITUACIÓN',
      content: 'Se obtuvieron préstamos y se emitieron bonos para financiar un programa de obras públicas.',
      iconName: 'Landmark',
    },
    {
      step: 'consecuencia' as const,
      title: 'CONSECUENCIA',
      content: 'Aumentó la circulación de dinero y se impulsaron las obras, el empleo, la producción y el comercio, contribuyendo a la prosperidad económica de 1927.',
      iconName: 'TrendingUp',
    },
  ],
};

// Contenido fiel de la Pregunta 8 y Datos de Apoyo (Andrys)
export const ANDRYS_CONTENT = {
  question: '¿Consideras conveniente que un gobierno utilice préstamos para financiar obras públicas?',
  responseHeader: 'Respuesta analítica fundamentada en el caso histórico:',
  fullResponse:
    'Sí, puede ser conveniente, siempre que el préstamo se utilice de manera responsable y para obras que realmente beneficien al país. El caso del gobierno de Horacio Vásquez muestra que el dinero obtenido mediante empréstitos ayudó a financiar carreteras, puertos, escuelas, acueductos y proyectos de riego, lo que favoreció la actividad económica de 1927. Sin embargo, el gobierno debe analizar las condiciones del préstamo, su capacidad de pago y el destino del dinero, porque un endeudamiento excesivo puede convertirse en un problema para las finanzas nacionales.',
  keyConditions: [
    {
      title: 'Uso Responsable y Productivo',
      description: 'Que el dinero se destine a obras que realmente beneficien al país y eleven la capacidad productiva nacional.',
    },
    {
      title: 'Análisis Riguroso de Condiciones',
      description: 'El gobierno debe revisar con lupa las tasas de interés, plazos y cláusulas contractuales.',
    },
    {
      title: 'Evaluación de Capacidad de Pago',
      description: 'Monitorear la solvencia del Estado para evitar que un endeudamiento excesivo ahogue las finanzas públicas a futuro.',
    },
  ],
  supportData: [
    {
      id: 'd-1',
      point: 'El gobierno de Horacio Vásquez comenzó el 12 de julio de 1924.',
      detail: 'Marca el restablecimiento democrático tras la ocupación militar estadounidense (1916-1924).',
      category: 'fecha' as const,
    },
    {
      id: 'd-2',
      point: 'El gobierno buscó un empréstito de 25,000,000 de dólares para consolidar y pagar la deuda dejada por el gobierno Militar y realizar nuevas inversiones públicas.',
      detail: 'Monto monumental para la época, orientado a sanear cuentas atrasadas y reanimar la infraestructura.',
      category: 'monto' as const,
    },
    {
      id: 'd-3',
      point: 'A finales de 1926 se aprobó un nuevo empréstito y se emitieron los primeros cinco millones de dólares en bonos.',
      detail: 'Inyección directa de liquidez que reactivó la construcción y dinamizó el mercado.',
      category: 'bonos' as const,
    },
    {
      id: 'd-4',
      point: 'Los recursos contribuyeron al programa de obras públicas y a la prosperidad económica de 1927.',
      detail: 'Auge sustentado en el empleo generado, la circulación de moneda y la elevación de las exportaciones.',
      category: 'impacto' as const,
    },
    {
      id: 'd-5',
      point: 'Entre las obras mencionadas están el acueducto de Santo Domingo, mejoras de puertos, proyectos de riego, escuelas y carreteras.',
      detail: 'Obras de infraestructura clave que sentaron bases para la conectividad y la salud pública.',
      category: 'obras' as const,
    },
  ],
};

// Obras públicas mencionadas en el caso para el Mapa 3D Digital de República Dominicana
export const DOMINICAN_WORKS: InfrastructureWork[] = [
  {
    id: 'acueducto',
    name: 'Acueducto de Santo Domingo',
    type: 'acueducto',
    location: 'Santo Domingo (Distrito Nacional)',
    coordinates: { x: 0.8, y: -0.2, z: 0.1 },
    description: 'Obra emblemática de agua potable y saneamiento para modernizar la capital dominicana.',
    impact: 'Mejoró la salud colectiva, redujo epidemias y aportó agua constante para el desarrollo urbano.',
  },
  {
    id: 'carreteras',
    name: 'Red de Carreteras Nacionales',
    type: 'carreteras',
    location: 'Eje Santo Domingo - Santiago / Duarte',
    coordinates: { x: 0.0, y: 0.3, z: 0.05 },
    description: 'Ampliación y pavimentación de tramos viales para articular el transporte entre regiones.',
    impact: 'Redujo tiempos de transporte terrestre y fomentó la integración del comercio interior.',
  },
  {
    id: 'puertos',
    name: 'Mejoras de Puertos Marítimos',
    type: 'puertos',
    location: 'Santo Domingo, Puerto Plata y San Pedro',
    coordinates: { x: 0.3, y: 0.8, z: 0.08 },
    description: 'Dragas, muelles y mejoras en las terminales marítimas comerciales del país.',
    impact: 'Facilitó el incremento de la producción y la salida de artículos de exportación hacia el exterior.',
  },
  {
    id: 'riego',
    name: 'Proyectos de Riego Agrícola',
    type: 'riego',
    location: 'Valle del Cibao y Yaque del Norte/Sur',
    coordinates: { x: -0.6, y: 0.4, z: 0.12 },
    description: 'Canales de riego y tomas de agua para dotar de abastecimiento hídrico los campos de cultivo.',
    impact: 'Multiplicó las cosechas agrícolas y consolidó la producción nacional para consumo y venta.',
  },
  {
    id: 'escuelas',
    name: 'Construcción de Escuelas Públicas',
    type: 'escuelas',
    location: 'Comunidades urbanas y rurales del país',
    coordinates: { x: -0.2, y: -0.1, z: 0.06 },
    description: 'Edificación de planteles escolares primarios y secundarios para expandir la cobertura educativa.',
    impact: 'Brindó acceso a la instrucción pública a cientos de niños y jóvenes de la época.',
  },
];
