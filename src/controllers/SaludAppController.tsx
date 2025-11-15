
import api from '../api/api';
import type { AppHealthData } from '../types/AppHealth';

export class AppHealthController {
  static async getSaludData(): Promise<AppHealthData> {
    try {
      const response = await api.get('/salud/datos');
      return response.data;
    } catch (error) {
      console.error('Error fetching learning data:', error);
      throw error;
    }
  }
}