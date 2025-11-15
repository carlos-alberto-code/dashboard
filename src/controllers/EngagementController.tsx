import api from '../api/api';
import type { EngagementData } from '../types/Engagement';

export class EngagementController {
    static async getEngagementData(): Promise<EngagementData> {
      try {
        const response = await api.get('/engagement/datos');
        return response.data;
      } catch (error) {
        console.error('Error fetching learning data:', error);
        throw error;
      }
    
  }
}
        