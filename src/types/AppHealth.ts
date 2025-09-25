
export type Trend = 'up' | 'down' | 'flat';

export type Metric = {
  label: string;
  value: number;
  unit?: string;           // "ms" o "★"
  meta: number | string;   // 300 o "4.2★"
  deltaPct?: number;       // 5 es +5%
  trend?: Trend;           // 'up' o 'down' o 'flat'
};

export interface AppHealthData {
  pieChart: { value: number; meta: number };
  metrics: {
    latencyP50: Metric;
    latencyP95: Metric;
    appStoreRating: Metric;
    playStoreRating: Metric;
  };
   timeseries: {
    months: string[];        // ['Ene','Feb']
    sessionsOK: number[];    // [%]   
    p50: number[];           // [ms]  
    p95: number[];           // [ms] 
  };
}