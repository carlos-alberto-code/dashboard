import api from '../api/api';
import type {GamificationData} from '../types/Gamification';

export class GamificationController {
    static async getGamificationData(): Promise<GamificationData> {
        try {
            const response = await api.get('/gamificacion/datos');
            return response.data;
        } catch (error) {
            console.error('Error fetching learning data:', error);
            throw error;
        }
    }
}