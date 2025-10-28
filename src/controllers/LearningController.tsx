import type { LearningData } from '../types/Learning';

export class LearningController {
  static getMockData(): LearningData {
    return {
      metrics: {
        scoreImprovement: { label: 'Mejora de Puntaje', value: 22, unit: '%', deltaPct: 8, trend: 'up',  meta: '15' },
        quizAvg:          { label: 'Promedio en Cuestionarios', value: 7.8, meta: '7', deltaPct: 5, trend: 'up' },
        egelAttemptRate:  { label: 'Tasa de Intento EGEL', value: 45, unit: '%', meta: '40', deltaPct: 12, trend: 'up' },
      },

      simulatorsProgress: {
        weeks: ['Semana 1','Semana 2','Semana 3','Semana 4','Semana 5','Semana 6'],
        avg:  [70,72,75,78,82,85],
        min:  [45,47,48,50,52,55],
        max:  [88,89,90,92,93,95],
      },

      benchmarkPrep: {
        topics: ['Tema 1','Tema 2','Tema 3','Tema 4','Tema 5'],
        percent: [72,80,65,90,85],
      },

      timesToPass: {
        weeks:  ['Semana 1','Semana 2','Semana 3','Semana 4'],
        max:    [8,5,5,4],
        min:    [1,1,1,1],
        q3:     [4,4,4,3],
        q1:     [2,2,2,1],
        median: [3,2.8,2.6,2.2],
      },
    };
  }
}