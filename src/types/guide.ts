export type ParticipantId = 'jorge' | 'briant' | 'eduin' | 'andrys';

export interface ParticipantInfo {
  id: ParticipantId;
  name: string;
  role: string;
  questionNumber: number;
  questionTitle: string;
  shortSummary: string;
  badgeColor: string;
  accentColor: string;
}

export interface AdvantageRiskItem {
  id: string;
  text: string;
  category: 'obras' | 'economia' | 'social';
}

export interface SchemeStage {
  step: 'causa' | 'situacion' | 'consecuencia';
  title: string;
  content: string;
  iconName: string;
}

export interface HistoricalSupportData {
  id: string;
  point: string;
  detail?: string;
  category: 'fecha' | 'monto' | 'bonos' | 'impacto' | 'obras';
}

export interface InfrastructureWork {
  id: string;
  name: string;
  type: 'acueducto' | 'puertos' | 'riego' | 'escuelas' | 'carreteras';
  location: string;
  coordinates: { x: number; y: number; z: number };
  description: string;
  impact: string;
}
