import type { UsersData } from '../types/Users';

export class UsersController {
  static getMockData(): UsersData {
    return {
      metrics: {
        ratioDaumau: { label: 'Ratio DAU/MAU', value: 24.4, unit: '%', deltaPct: 5, trend: 'up', meta: '25' },
        churnRate:   { label: 'Churn Rate', value: 25, unit: '%', deltaPct: 2, trend: 'up', meta: '25' },
        d1Ret:       { label: 'D1 Ret.', value: 88, unit: '%', meta: '55' },
        w1Ret:       { label: 'W1 Ret.', value: 62, unit: '%', meta: '35' },
        m1Ret:       { label: 'M1 Ret.', value: 45, unit: '%', meta: '20' },
      },
      installVsRegister: { conversionPct: 80, installs: 1200, registers: 960, targetPct: 70 },
      activeUsers: { months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'], dau: [1000,1200,1400,1600,1800,2000], mau: [6000,6500,7000,7500,8000,8500] },
      retention: { d1: [75,78,80,82,85,88], w1: [45,48,50,55,58,62], m1: [30,32,35,38,40,45], months: ['Ene','Feb','Mar','Abr','May','Jun'] },
    };
  }
}