export type Trend = 'up' | 'down' | 'flat';

export interface Kpi {
  label: string;
  value: number;
  unit?: string;
  deltaPct?: number;
  trend?: Trend;
  meta?: string;
}

export interface GamificationMetrics {
  completionRate: Kpi;       // Tasa de Finalización Global
  avgAttemptsPerGame: Kpi;   // Intentos Promedio por Juego
}

export interface FunnelData {
  stages: string[];          // Inicio, Tutorial, Nivel 1, ...
  users: number[];           // Usuarios por etapa
  conversionPct: number[];   // % conversión por etapa
}

export interface SuccessEvolution {
  weeks: string[];           // Semana 1..N
  successRate: number[];     // %
}

export interface DropRateByLevel {
  stages: string[];
  dropPct: number[];         // %
}

export interface WordAccuracyHeatmap {
  rows: string[];            // Niveles (Nivel 1..N)
  cols: string[];            // Palabras 1..N
  values: number[][];        // porcentajes [row][col]
}

export interface GamificationData {
  metrics: GamificationMetrics;
  funnel: FunnelData;
  successEvolution: SuccessEvolution;
  dropRate: DropRateByLevel;
  wordAccuracy: WordAccuracyHeatmap;
}