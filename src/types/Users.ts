// src/types/Users.ts
export type Trend = 'up' | 'down' | 'flat';

export type UserMetric = {
  label: string;
  value: number;
  unit?: string;
  deltaPct?: number;
  trend?: Trend;
  meta?: number | string;
};

export type UsersData = {
  metrics: {
    ratioDaumau: UserMetric;
    churnRate: UserMetric;
    d1Ret: UserMetric;
    w1Ret: UserMetric;
    m1Ret: UserMetric;
  };
  installVsRegister: {
    conversionPct: number;
    installs: number;
    registers: number;
    targetPct: number;
  };
  activeUsers: {
    months: string[];
    dau: number[];
    mau: number[];
  };
  retention: {
    d1: number[];
    w1: number[];
    m1: number[];
    months: string[];
  };
};