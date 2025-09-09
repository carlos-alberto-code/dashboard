import type { AppHealthData } from '../types/AppHealth';

export class AppHealthController {
  // servicio dummy para simular datos de salud de la app
  static getMockData(): AppHealthData {
    return {
      pieChart: { value: '90', meta: '95' }
    };
  }
}