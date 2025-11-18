import api from '../api/api';
import type { LearningData } from '../types/Learning';

export class LearningController {
  static async getLearningData(): Promise<LearningData> {
    try {
      const response = await api.get('/aprendizaje/datos');
      return response.data;
    } catch (error) {
      console.error('Error fetching learning data:', error);
      throw error;
    }
  }
}