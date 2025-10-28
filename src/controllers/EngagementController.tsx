import type { EngagementData } from '../types/Engagement';

export class EngagementController {
    static getMockData(): EngagementData {
    return {
      metrics: {
        sessionsPerUser: { label: 'Sesiones por Usuario al Día', value: 2.8, unit: 'sesiones', deltaPct: 12, trend: 'up', meta: '2' },
        avgSessionTime: { label: 'Tiempo Medio por Sesión', value: 9.2, unit: 'min', deltaPct: 5, trend: 'up', meta: '8' },
        contentDepth: { label: 'Profundidad de Contenido', value: 4.5, unit: 'pantallas/sesión', deltaPct: 4, trend: 'up', meta: '4' },
      },
      interactionRatio: {
        value: 17.8,
        meta: 10,
      },
      videoMetrics: [
        { video: 'Video 1', vistas: 1132, likeRatio: 95.1, commentRate: 7.8 },
        { video: 'Video 2', vistas: 924, likeRatio: 96.2, commentRate: 4.5 },
        { video: 'Video 3', vistas: 681, likeRatio: 94.2, commentRate: 9.2 },
        { video: 'Video 4', vistas: 879, likeRatio: 94.2, commentRate: 3.5 },
        { video: 'Video 5', vistas: 1105, likeRatio: 95.1, commentRate: 8.5 },
      ],
      avgSessionDuration: {
        categories: ['0-1 min', '1-3 min', '3-5 min', '5-10 min', '10-15 min', '15+ min'],
        series: [{ data: [240, 380, 340, 480, 300, 180] }],
      },
      videoInteractions: {
        categories: ['Video 1', 'Video 2', 'Video 3', 'Video 4', 'Video 5'],
        series: [
          { data: [450, 300, 480, 200, 320], label: 'Likes', color: '#2ECC71' },
          { data: [80, 20, 30, 20, 15], label: 'Dislikes', color: '#E74C3C' },
          { data: [60, 40, 70, 30, 80], label: 'Comentarios', color: '#F39C12' },
        ],
      },
    };
  }
}
        