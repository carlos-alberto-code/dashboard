export type Trend = 'up' | 'down' | 'flat';

export interface Kpi {
    label: string;
    value: number;
    unit?: string;
    deltaPct?: number;
    trend?: Trend;
    meta?: string;     // “Meta” mostrada en las cards
}

export interface LearningMetrics {
    scoreImprovement: Kpi;   // Mejora de Puntaje
    quizAvg: Kpi;            // Promedio en Cuestionarios
    egelAttemptRate: Kpi;    // Tasa de Intento EGEL
}

export interface SimulatorsProgress {
    weeks: string[];         // Semanas
    avg: number[];           // Promedio
    min: number[];           // Mínimo
    max: number[];           // Máximo
}

export interface BenchmarkPrep {
    topics: string[];        // Tema 1..N
    percent: number[];       // % preparados
}

export interface TimesToPass {
    weeks: string[];         // Semanas
    max: number[];           // “Máximo” intentos
    min: number[];           // “Mínimo” intentos
    q3: number[];            // Q3 (para las barritas azules en tu mock)
    q1: number[];            // Q1
    median: number[];        // Mediana (línea)
}

export interface LearningData {
    metrics: LearningMetrics;
    simulatorsProgress: SimulatorsProgress;
    benchmarkPrep: BenchmarkPrep;
    timesToPass: TimesToPass;
}