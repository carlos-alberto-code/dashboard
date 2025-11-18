import api from '../api/api';
import type { UsersData } from '../types/Users';

export class UsersController {
  static async getUsersData(): Promise<UsersData> {
    try {
      const response = await api.get('/usuarios/datos');
      return response.data;
    } catch (error) {
      console.error('Error fetching learning data:', error);
      throw error;
    }
  }
      
  
}
