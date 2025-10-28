import type { GamificationData } from '../types/Gamification';

export class GamificationController {
  static getMockData(): GamificationData {
    return {
      metrics: {
        completionRate: { label: 'Tasa de Finalización Global', value: 75, unit: '%', meta: '75%', deltaPct: 5, trend: 'up' },
        avgAttemptsPerGame: { label: 'Intentos Promedio por Juego', value: 2.5, meta: '3', deltaPct: 10, trend: 'up' },
      },
      funnel: {
        stages: ['Inicio','Tutorial','Nivel 1','Nivel 2','Nivel 3','Completado'],
        users: [950, 900, 780, 520, 350, 300],
        conversionPct: [15, 16, 14, 12, 10, 9],
      },
      successEvolution: {
        weeks: ['Semana 1','Semana 2','Semana 3','Semana 4'],
        successRate: [78, 80, 92, 88],
      },
      dropRate: {
        stages: ['Inicio','Tutorial','Nivel 1','Nivel 2','Nivel 3','Completado'],
        dropPct: [0, 15, 14, 22, 18, 23],
      },
      wordAccuracy: {
        rows: ['Nivel 1','Nivel 2','Nivel 3','Nivel 4','Nivel 5'],
        cols: ['Palabra 1','Palabra 2','Palabra 3','Palabra 4','Palabra 5'],
        values: [
          [85, 82, 79, 89, 80],
          [79, 77, 74, 83, 72],
          [65, 82, 60, 75, 62],
          [55, 70, 58, 68, 52],
          [45, 60, 40, 58, 42],
        ],
      },
    };
  }
}